import { NextRequest, NextResponse } from 'next/server';
import { requireManager } from '@/lib/auth/middleware';

export async function POST(request: NextRequest) {
  try {
    // Только менеджеры/админы
    const auth = await requireManager(request);
    if (auth) return auth;

    let body: any = {};
    try {
      body = await request.json();
    } catch {}

    const botToken = body?.botToken || process.env.TELEGRAM_BOT_TOKEN;
    const chatId = body?.chatId || process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      return NextResponse.json(
        { error: 'botToken и chatId обязательны (или задайте TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID в окружении)' },
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
      let errorData: any = {};
      try { errorData = await response.json(); } catch {}
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