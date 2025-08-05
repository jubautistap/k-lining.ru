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
    // Rate limiting
    const ip = request.ip || 'unknown';
    await authRateLimit.check(5, ip); // 5 попыток за 15 минут

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
      accessToken: tokens.accessToken,
    });

    // Устанавливаем refresh token в httpOnly cookie
    response.cookies.set('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 дней
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
      return NextResponse.json(
        { error: 'Too many login attempts. Try again later.' },
        { status: 429 }
      );
    }

    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 