import { NextRequest, NextResponse } from 'next/server';
import { requireManager } from '@/lib/auth/middleware';
import { prisma } from '@/lib/prisma';

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
    const createLead = body?.createLead ?? false;

    if (!botToken || !chatId) {
      return NextResponse.json(
        { error: 'botToken и chatId обязательны (или задайте TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID в окружении)' },
        { status: 400 }
      );
    }

    let createdLead: any = null;
    if (createLead) {
      try {
        createdLead = await prisma.lead.create({
          data: {
            name: body?.testName || 'Тест уведомлений',
            phone: body?.testPhone || '+7-000-000-00-00',
            email: body?.testEmail || null,
            service: 'Тестовая заявка',
            message: 'Создано из админки (кнопка Тест сообщения)',
            source: 'admin-test',
          },
        });
      } catch (e) {
        // если БД недоступна — игнорируем, тест по телеге не должен падать
        
      }
    }

    const adminBase = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://k-lining.ru';
    const adminLink = createdLead ? `${adminBase}/admin/leads#${createdLead.id}` : undefined;
    const message = `🧪 Тестовое сообщение!\n\n✅ Telegram интеграция работает корректно\n⏰ ${new Date().toLocaleString('ru-RU')}\n\n${createdLead ? `Создана тестовая заявка: ${createdLead.name}\nID: ${createdLead.id}\n➡️ Админка: ${adminLink}` : 'Это тестовое сообщение для проверки настроек уведомлений.'}`;

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
      message: 'Тестовое сообщение отправлено успешно',
      lead: createdLead || null
    });

  } catch (error) {
    
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
} 