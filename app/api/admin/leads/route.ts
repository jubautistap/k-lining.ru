import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireManager } from '@/lib/auth/middleware';
import { prisma } from '@/lib/prisma';
import { apiRateLimit } from '@/lib/rate-limit';
import { leads as memoryLeads, addLead as addMemoryLead } from './data';

// UI <-> DB статус маппинг
const uiToDbStatus: Record<string, string> = {
  new: 'NEW',
  contacted: 'CONTACTED',
  confirmed: 'QUALIFIED',
  completed: 'WON',
  cancelled: 'LOST',
};

const dbToUiStatus: Record<string, string> = {
  NEW: 'new',
  CONTACTED: 'contacted',
  QUALIFIED: 'confirmed',
  QUOTED: 'confirmed',
  WON: 'completed',
  LOST: 'cancelled',
};

// Разрешаем создание лида без телефона для внешних переходов (WA/TG clicks)
const leadSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  service: z.string().optional(),
  message: z.string().optional(),
  utm: z.record(z.string()).optional(),
  referrer: z.string().optional(),
  page: z.string().optional(),
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
    if (status) {
      // принимаем UI-статусы и маппим в enum Prisma
      const dbStatus = uiToDbStatus[status] ?? status.toUpperCase();
      where.status = dbStatus;
    }
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    try {
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

      const leads = rows.map((l: any) => ({
        id: l.id,
        name: l.name ?? '',
        phone: l.phone,
        email: l.email ?? '',
        service: l.service ?? '',
        message: l.message ?? '',
        status: dbToUiStatus[String(l.status)] ?? String(l.status).toLowerCase(),
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
    } catch (dbError) {
      console.error('DB error fetching leads, fallback to memory:', dbError);
      const rows = memoryLeads;
      const total = rows.length;
      const sliced = rows.slice(skip, skip + limit);
      const leads = sliced.map((l: any) => ({
        id: l.id,
        name: l.name ?? '',
        phone: l.phone,
        email: l.email ?? '',
        service: l.service ?? '',
        message: l.message ?? '',
        status: (l.status || 'new').toLowerCase(),
        createdAt: l.createdAt || l.created_at || new Date().toISOString(),
        contactedAt: l.updatedAt || l.updated_at || null,
        assigned_to: null,
      }));
      return NextResponse.json({
        leads,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        },
        fallback: true
      });
    }

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
    const parsed = leadSchema.parse(body);
    // Санитизация и дефолты для кликов без телефона
    const safeName = (parsed.name && parsed.name.trim()) ? parsed.name.trim() : 'Клиент (внешний канал)';
    const digits = (parsed.phone || '').replace(/\D/g, '');
    const safePhone = digits.length >= 10 ? digits : 'unknown';
    const email = parsed.email;
    const service = parsed.service;
    const message = parsed.message;
    const utm = parsed.utm;
    const referrer = parsed.referrer;
    const page = parsed.page;

    let newLead: any;
    try {
      const utmObj = utm || {};
      newLead = await prisma.lead.create({
        data: {
          name: safeName,
          phone: safePhone,
          email: email || null,
          service: service || '',
          message: message || null,
          source: 'website',
          utm_source: utmObj.utm_source || null,
          utm_medium: utmObj.utm_medium || null,
          utm_campaign: utmObj.utm_campaign || null,
          utm_content: utmObj.utm_content || null,
          utm_term: utmObj.utm_term || null,
          gclid: utmObj.gclid || null,
          yclid: utmObj.yclid || null,
          ymclid: utmObj.ymclid || null,
          fbclid: utmObj.fbclid || null,
          openstat: utmObj._openstat || null,
          referrer: referrer || null,
          page_url: page || null,
        },
        include: {
          assigned_to: {
            select: { id: true, name: true, email: true }
          }
        }
      });
    } catch (dbError) {
      console.error('DB error creating lead, fallback to memory:', dbError);
      newLead = {
        id: Date.now().toString(),
        name: safeName,
        phone: safePhone,
        email: email || '',
        service: service || '',
        message: message || '',
        status: 'new',
        created_at: new Date(),
        updated_at: new Date(),
        source: 'website'
      };
      addMemoryLead(newLead);
    }

    // Отправляем уведомление в Telegram (если настроено)
    try {
      const origin = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;

      // Собираем кандидаты из ENV и из настроек админки
      const candidates: Array<{ token: string; chat: string }> = [];
      if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
        candidates.push({ token: String(process.env.TELEGRAM_BOT_TOKEN), chat: String(process.env.TELEGRAM_CHAT_ID) });
      }
      // Читаем токены напрямую из БД (без публичного эндпойнта)
      try {
        const rows = await prisma.settings.findMany({
          where: { key: { in: ['telegramBotToken', 'telegramChatId'] } },
        });
        const t = rows.find((r: any) => r.key === 'telegramBotToken')?.value as string | undefined;
        const c = rows.find((r: any) => r.key === 'telegramChatId')?.value as string | undefined;
        if (t && c) candidates.push({ token: t, chat: c });
      } catch (e) {
        console.warn('Settings read failed (telegram):', e);
      }

      // Уникализируем пары, чтобы не слать дубль
      const unique = new Map<string, { token: string; chat: string }>();
      for (const pair of candidates) unique.set(`${pair.token}:${pair.chat}`, pair);
      const list = Array.from(unique.values());

      if (list.length > 0) {
        const utmText = utm ? Object.entries(utm).map(([k,v]) => `${k}: ${v}`).join('\n') : '';
        const url = page || origin;
        const adminLink = `${origin}/admin/leads#${newLead.id}`;
        const text = `🆕 Новая заявка!\n\n👤 ${newLead.name}\n📞 ${newLead.phone}\n${newLead.email ? `📧 ${newLead.email}\n` : ''}${newLead.service ? `🔧 ${newLead.service}\n` : ''}${newLead.message ? `💬 ${newLead.message}\n` : ''}${utmText ? `\n🧭 UTM:\n${utmText}\n` : ''}${referrer ? `\n↩️ Referrer: ${referrer}\n` : ''}${url ? `\n🔗 Страница: ${url}\n` : ''}⏰ ${new Date().toLocaleString('ru-RU')}\n\n➡️ Админка: ${adminLink}`;

        // Пытаемся отправить хотя бы по одной паре; ошибки не валят ответ
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);
        await Promise.all(list.map(async ({ token, chat }) => {
          try {
            const resp = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ chat_id: chat, text, parse_mode: 'HTML' }),
              signal: controller.signal
            });
            if (!resp.ok) {
              const errTxt = await resp.text().catch(() => '');
              console.warn('Telegram send failed:', resp.status, errTxt);
            }
          } catch (e) {
            console.warn('Telegram send error:', e);
          }
        }));
        clearTimeout(timeout);
      } else {
        console.warn('Telegram not configured: no candidates for sending');
      }
    } catch (error) {
      console.error('Telegram notification error:', error);
    }

    return NextResponse.json({ 
      success: true, 
      lead: newLead 
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      console.warn('Lead validation failed:', error.flatten());
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