import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Временное хранилище настроек (в реальном проекте - база данных)
let siteSettings = {
  // Контактная информация
  phone: '+7-925-555-18-33',
        email: 'info@k-lining.ru',
  address: 'Москва, ул. Бакунинская, 69, стр. 1',
  
  // SEO настройки
  siteTitle: 'KliningPro - Профессиональная уборка в Москве',
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

export async function GET() {
  try {
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
    console.error('Settings GET error, fallback to memory:', error);
    return NextResponse.json({ settings: siteSettings });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Обновляем настройки
    siteSettings = {
      ...siteSettings,
      ...body
    };

    // Сохраняем каждую настройку по ключу в БД (upsert)
    const entries = Object.entries(body) as Array<[string, string | number | boolean]>;
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
    console.error('Error saving settings:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
} 