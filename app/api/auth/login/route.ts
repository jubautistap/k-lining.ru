import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { AuthService } from '@/lib/auth/jwt';
import { prisma } from '@/lib/prisma';
import { authRateLimit } from '@/lib/rate-limit';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting (пер-эндпойнт + нормализация IP)
    const fwd = request.headers.get('x-forwarded-for') || '';
    const xRealIp = request.headers.get('x-real-ip') || '';
    const clientIp = (fwd.split(',')[0] || xRealIp || request.ip || 'unknown').trim();
    await authRateLimit.check(5, `${request.nextUrl.pathname}|${clientIp}`); // 5 попыток/15м

    const body = await request.json();
    const { email, password } = loginSchema.parse(body);

    // Ищем пользователя
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password_hash: true,
        role: true,
        status: true,
        name: true,
      },
    });

    if (!user || user.status !== 'ACTIVE') {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Проверяем пароль
    const isValidPassword = await AuthService.verifyPassword(
      password,
      user.password_hash
    );

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Генерируем токены
    const tokens = AuthService.generateTokens({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Обновляем время последнего входа
    await prisma.user.update({
      where: { id: user.id },
      data: { last_login: new Date() },
    });

    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      // backward compatibility: оставляем accessToken в теле, но клиент может его не использовать
      accessToken: tokens.accessToken,
    });

    // Устанавливаем оба токена в httpOnly cookie
    response.cookies.set('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 дней
    });
    response.cookies.set('accessToken', tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60, // 15 минут
      path: '/',
    });

    return response;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    if (error instanceof Error && error.message === 'Rate limit exceeded') {
      const res = NextResponse.json(
        { error: 'Too many login attempts. Try again later.' },
        { status: 429 }
      );
      res.headers.set('Retry-After', (15 * 60).toString());
      return res;
    }

    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 