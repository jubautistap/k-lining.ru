import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth/middleware';
import { z } from 'zod';

// Временное хранилище настроек (в реальном проекте - база данных)
let siteSettings = {
  // Контактная информация
  phone: '+7-925-555-18-33',
        email: 'info@k-lining.ru',
  address: 'Москва, ул. Бакунинская, 69, стр. 1',
  
  // SEO настройки
  siteTitle: 'K-lining - Профессиональная уборка в Москве',
  siteDescription: 'Профессиональная клининговая компания в Москве',
  googleAnalyticsId: '',
  yandexMetrikaId: '',
  
  // Интеграции
  telegramBotToken: '',
  telegramChatId: '',
  amocrmDomain: '',
  amocrmClientId: '',
  amocrmClientSecret: '',
  
  // Настройки форм
  showContactForm: true,
  showCalculator: true,
  showModal: true,
  
  // Социальные сети
  telegram: 'https://t.me/k_liningru',
      whatsapp: 'https://wa.me/79255551833',
  vk: 'https://vk.com/kliningpro'
};

const settingsSchema = z.object({
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  address: z.string().optional(),
  siteTitle: z.string().optional(),
  siteDescription: z.string().optional(),
  googleAnalyticsId: z.string().optional(),
  yandexMetrikaId: z.string().optional(),
  telegramBotToken: z.string().optional(),
  telegramChatId: z.string().optional(),
  amocrmDomain: z.string().optional(),
  amocrmClientId: z.string().optional(),
  amocrmClientSecret: z.string().optional(),
  showContactForm: z.boolean().optional(),
  showCalculator: z.boolean().optional(),
  showModal: z.boolean().optional(),
  telegram: z.string().optional(),
  whatsapp: z.string().optional(),
  vk: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const auth = await requireAdmin(request);
    if (auth) return auth;
    // Читаем настройки из БД и перекрываем дефолты
    const rows = await prisma.settings.findMany();
    const fromDb: Record<string, string> = {};
    for (const row of rows) {
      fromDb[row.key] = row.value;
    }

    const merged = {
      ...siteSettings,
      ...fromDb,
    } as typeof siteSettings;

    // Кешируем в памяти для скорости между запросами
    siteSettings = merged;

    return NextResponse.json({ settings: merged });
  } catch (error) {
    
    return NextResponse.json({ settings: siteSettings });
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAdmin(request);
    if (auth) return auth;
    const body = await request.json();
    
    const parsed = settingsSchema.parse(body);

    // Обновляем настройки
    siteSettings = {
      ...siteSettings,
      ...parsed
    };

    // Сохраняем каждую настройку по ключу в БД (upsert)
    const entries = Object.entries(parsed) as Array<[string, string | number | boolean]>;
    await Promise.all(
      entries.map(async ([key, val]) => {
        const value = String(val);
        await prisma.settings.upsert({
          where: { key },
          create: { key, value },
          update: { value },
        });
      })
    );

    return NextResponse.json({ 
      success: true, 
      settings: siteSettings 
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Ошибка валидации данных', errors: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
} 