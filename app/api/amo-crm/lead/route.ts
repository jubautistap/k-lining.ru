import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, service, message, utm, referrer, page } = body;

    // Валидация данных
    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Имя и телефон обязательны' },
        { status: 400 }
      );
    }

    // Создаем заявку для админки
    const newLead = {
      id: Date.now().toString(),
      name: name,
      phone: phone,
      email: email || '',
      service: service || '',
      message: message || '',
      status: 'new' as const,
      createdAt: new Date().toISOString()
    };

    // Добавляем заявку в админку через API (единообразный ввод, Telegram отправит админ-роут)
    try {
      const origin = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;
      const res = await fetch(`${origin}/api/admin/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, service, message, utm, referrer, page })
      });
      if (!res.ok) {
        const errTxt = await res.text().catch(() => '');
        console.error('Admin leads POST failed:', res.status, errTxt);
        // Не возвращаем 502, а продолжаем выполнение для отправки в TG
      }
    } catch (error) {
      console.error('Error adding lead to admin:', error);
      // Не возвращаем 502, а продолжаем выполнение для отправки в TG
    }

    // Здесь будет интеграция с amoCRM API
    console.log('Lead data for amoCRM:', {
      name,
      phone,
      email,
      service,
      message,
      timestamp: new Date().toISOString(),
      source: 'website'
    });

    // Пример интеграции с amoCRM (замените на реальные данные)
    const amoCRMData = {
      name: name,
      phone: phone,
      email: email || '',
      custom_fields: {
        service: service || '',
        message: message || '',
        source: 'website',
        timestamp: new Date().toISOString()
      }
    };

    // Здесь должен быть реальный запрос к amoCRM API
    // const response = await fetch('https://your-domain.amocrm.ru/api/v4/leads', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${process.env.AMOCRM_ACCESS_TOKEN}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(amoCRMData)
    // });

    // Пока что возвращаем успешный ответ
    return NextResponse.json(
      { 
        success: true, 
        message: 'Заявка успешно отправлена',
        leadId: newLead.id
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing lead:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
} 