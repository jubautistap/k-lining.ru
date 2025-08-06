import { NextRequest, NextResponse } from 'next/server';

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
  return NextResponse.json({ settings: siteSettings });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Обновляем настройки
    siteSettings = {
      ...siteSettings,
      ...body
    };

    // В реальном проекте здесь будет сохранение в базу данных
    console.log('Settings updated:', siteSettings);

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