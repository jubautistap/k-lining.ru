import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  phone: z.string().min(10, 'Введите корректный номер телефона'),
  email: z.string().email('Введите корректный email').optional().or(z.literal('')),
  message: z.string().min(5, 'Сообщение должно содержать минимум 5 символов').optional(),
  service: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, message, service } = contactSchema.parse(body);

    // Проксируем в админский endpoint для единой логики (включая Telegram)
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://k-lining.ru'}/api/admin/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, email, message, service })
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      return NextResponse.json({ success: false, message: data.error || 'Не удалось создать заявку' }, { status: 400 });
    }

    const data = await response.json();
    return NextResponse.json({ success: true, lead: data.lead });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Ошибка валидации данных', errors: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json({ success: false, message: 'Внутренняя ошибка сервера' }, { status: 500 });
  }
}