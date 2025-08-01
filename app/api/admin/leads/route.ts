import { NextRequest, NextResponse } from 'next/server';
import { leads, addLead } from './data';

export async function GET() {
  return NextResponse.json({ leads });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Валидация
    if (!body.name || !body.phone) {
      return NextResponse.json(
        { error: 'Имя и телефон обязательны' },
        { status: 400 }
      );
    }

    const newLead = {
      id: Date.now().toString(),
      name: body.name,
      phone: body.phone,
      email: body.email || '',
      service: body.service || '',
      message: body.message || '',
      status: 'new',
      createdAt: new Date().toISOString()
    };

    leads.unshift(newLead); // Добавляем в начало списка

    // Отправляем уведомление в Telegram (если настроено)
    if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      try {
        const message = `🆕 Новая заявка!\n\n👤 ${newLead.name}\n📞 ${newLead.phone}\n${newLead.email ? `📧 ${newLead.email}\n` : ''}${newLead.service ? `🔧 ${newLead.service}\n` : ''}${newLead.message ? `💬 ${newLead.message}\n` : ''}\n⏰ ${new Date().toLocaleString('ru-RU')}`;
        
        await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: process.env.TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'HTML'
          })
        });
      } catch (error) {
        console.error('Telegram notification error:', error);
      }
    }

    return NextResponse.json({ 
      success: true, 
      lead: newLead 
    });

  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
} 