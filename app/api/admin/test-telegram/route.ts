import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { botToken, chatId } = await request.json();

    if (!botToken || !chatId) {
      return NextResponse.json(
        { error: 'Токен бота и ID чата обязательны' },
        { status: 400 }
      );
    }

    const message = `🧪 Тестовое сообщение!\n\n✅ Telegram интеграция работает корректно\n⏰ ${new Date().toLocaleString('ru-RU')}\n\nЭто тестовое сообщение для проверки настроек уведомлений.`;

    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML'
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: `Ошибка Telegram API: ${errorData.description || 'Неизвестная ошибка'}` },
        { status: 400 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Тестовое сообщение отправлено успешно' 
    });

  } catch (error) {
    console.error('Telegram test error:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
} 