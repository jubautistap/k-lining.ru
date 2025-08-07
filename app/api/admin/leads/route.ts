import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireManager } from '@/lib/auth/middleware';
import { prisma } from '@/lib/prisma';
import { apiRateLimit } from '@/lib/rate-limit';

const leadSchema = z.object({
  name: z.string().min(1, 'Имя обязательно'),
  phone: z.string().min(10, 'Телефон обязателен'),
  email: z.string().email().optional(),
  service: z.string().optional(),
  message: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    // Проверяем авторизацию
    const authResult = await requireManager(request);
    if (authResult) return authResult;

    // Rate limiting
    const ip = request.ip || 'unknown';
    await apiRateLimit.check(100, ip);

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const skip = (page - 1) * limit;

    // Строим фильтры
    const where: any = {};
    if (status) where.status = status;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [rows, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        orderBy: { created_at: 'desc' },
        skip,
        take: limit,
        include: {
          assigned_to: {
            select: { id: true, name: true, email: true }
          }
        }
      }),
      prisma.lead.count({ where })
    ]);

    // Нормализуем под UI (camelCase и lowercase статус)
    const leads = rows.map((l: any) => ({
      id: l.id,
      name: l.name ?? '',
      phone: l.phone,
      email: l.email ?? '',
      service: l.service ?? '',
      message: l.message ?? '',
      status: String(l.status).toLowerCase(),
      createdAt: l.created_at,
      contactedAt: l.updated_at,
      assigned_to: l.assigned_to ?? null,
    }));

    return NextResponse.json({
      leads,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    if (error instanceof Error && error.message === 'Rate limit exceeded') {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      );
    }

    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.ip || 'unknown';
    await apiRateLimit.check(10, ip);

    const body = await request.json();
    const { name, phone, email, service, message } = leadSchema.parse(body);

    const newLead = await prisma.lead.create({
      data: {
        name,
        phone,
        email: email || null,
        service: service || '',
        message: message || null,
        source: 'website'
      },
      include: {
        assigned_to: {
          select: { id: true, name: true, email: true }
        }
      }
    });

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
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    if (error instanceof Error && error.message === 'Rate limit exceeded') {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      );
    }

    console.error('Error creating lead:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 