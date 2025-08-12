import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from './jwt';
import { prisma } from '../prisma';

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export async function authMiddleware(request: NextRequest): Promise<NextResponse | null> {
  try {
    // Предпочитаем httpOnly cookie accessToken, затем Authorization: Bearer
    const cookieToken = request.cookies.get('accessToken')?.value;
    let token = cookieToken;
    if (!token) {
      const authHeader = request.headers.get('authorization');
      if (!authHeader?.startsWith('Bearer ')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      token = authHeader.substring(7);
    }
    const payload = AuthService.verifyAccessToken(token);
    
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Проверяем что пользователь существует и активен
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, email: true, role: true, status: true }
    });

    if (!user || user.status !== 'ACTIVE') {
      return NextResponse.json({ error: 'User not found or inactive' }, { status: 401 });
    }

    // Добавляем пользователя в request
    (request as AuthenticatedRequest).user = {
      id: user.id,
      email: user.email,
      role: user.role
    };

    return null; // Продолжаем выполнение
  } catch (error) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 401 });
  }
}

export function requireRole(roles: string[]) {
  return async (request: NextRequest): Promise<NextResponse | null> => {
    const authResult = await authMiddleware(request);
    if (authResult) return authResult;

    const user = (request as AuthenticatedRequest).user;
    if (!user || !roles.includes(user.role)) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    return null;
  };
}

export const requireAdmin = requireRole(['ADMIN']);
export const requireManager = requireRole(['ADMIN', 'MANAGER']);
export const requireEditor = requireRole(['ADMIN', 'MANAGER', 'EDITOR']); 