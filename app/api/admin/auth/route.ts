import { NextRequest, NextResponse } from 'next/server';
import { sign, verify } from 'jsonwebtoken';

// В реальном проекте используйте базу данных
const ADMIN_CREDENTIALS = {
        email: 'admin@k-lining.ru',
  password: 'admin123', // Измените на безопасный пароль
  name: 'Администратор',
  role: 'admin'
};

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Проверка учетных данных
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      // Создаем JWT токен
      const token = sign(
        { 
          email: ADMIN_CREDENTIALS.email,
          name: ADMIN_CREDENTIALS.name,
          role: 'admin'
        },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      return NextResponse.json({
        success: true,
        token,
        user: {
          email: ADMIN_CREDENTIALS.email,
          name: ADMIN_CREDENTIALS.name,
          role: 'admin'
        }
      });
    } else {
      return NextResponse.json(
        { error: 'Неверный email или пароль' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: 'Ошибка авторизации' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Токен не предоставлен' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    
    // Проверка токена
    const decoded = verify(token, JWT_SECRET) as any;
    
    if (!decoded || decoded.email !== ADMIN_CREDENTIALS.email) {
      return NextResponse.json(
        { error: 'Недействительный токен' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      user: {
        id: '1',
        email: ADMIN_CREDENTIALS.email,
        role: ADMIN_CREDENTIALS.role,
        name: ADMIN_CREDENTIALS.name
      }
    });

  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json(
      { error: 'Недействительный токен' },
      { status: 401 }
    );
  }
} 