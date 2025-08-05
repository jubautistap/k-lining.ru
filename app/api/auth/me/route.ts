import { NextRequest, NextResponse } from 'next/server';
import { authMiddleware } from '@/lib/auth/middleware';

export async function GET(request: NextRequest) {
  try {
    const authResult = await authMiddleware(request);
    if (authResult) return authResult;

    const user = (request as any).user;
    
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      }
    });
  } catch (error) {
    console.error('Auth me error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 