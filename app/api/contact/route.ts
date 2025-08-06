import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  phone: z.string().min(10, 'Введите корректный номер телефона'),
  email: z.string().email('Введите корректный email').optional().or(z.literal('')),
  message: z.string().min(10, 'Сообщение должно содержать минимум 10 символов'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Валидация данных
    const validatedData = contactSchema.parse(body);
    
    // Здесь можно добавить логику отправки в AmoCRM или сохранения в БД
    console.log('Получена заявка:', validatedData);
    
    // Имитация обработки
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return NextResponse.json({ 
      success: true, 
      message: 'Заявка успешно отправлена' 
    });
    
  } catch (error) {
    console.error('Ошибка обработки заявки:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Ошибка валидации данных',
          errors: error.errors 
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Внутренняя ошибка сервера' 
      },
      { status: 500 }
    );
  }
} 