import { Metadata } from 'next';
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema';
import PricingSection from '@/components/sections/PricingSection';

export const metadata: Metadata = {
  title: 'Цены на уборку квартир и офисов в Москве 2025 | K-lining',
  description: 'Прозрачные цены на клининговые услуги в Москве. Уборка квартир, домов, офисов, химчистка, мытье окон. Никаких скрытых доплат. Актуальные цены 2025 года.',
  keywords: 'цены уборка, стоимость уборки, цены клининга, уборка квартир цена, химчистка цена, мытье окон цена, уборка офисов цена, генеральная уборка цена, уборка после ремонта цена',
  openGraph: {
    title: 'Цены на уборку квартир и офисов в Москве | K-lining',
    description: 'Актуальные цены на профессиональную уборку квартир и офисов в Москве. Прозрачное ценообразование, без скрытых доплат. Уборка от 2,500₽.',
    url: 'https://k-lining.ru/prices',
    siteName: 'K-lining',
    images: [
      {
        url: '/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Цены на уборку K-lining - Актуальные тарифы',
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Цены на уборку K-lining - Актуальные тарифы',
    description: 'Актуальные цены на уборку квартир и офисов в Москве. Прозрачные тарифы клининговых услуг.',
          images: ['/og-image.webp'],
  },
  alternates: {
    canonical: 'https://k-lining.ru/prices',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function PricesPage() {
  return (
    <div className="section-padding bg-gradient-to-br from-gray-50 to-white">
      {/* Хлебные крошки для быстрых ссылок */}
      <div className="container-custom pt-6">
        <BreadcrumbSchema 
          items={[
            { name: 'Цены на уборку', url: '/prices' }
          ]} 
        />
      </div>
      
      <div className="container-custom">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Цены на уборку
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Мы честно показываем реальные цены. Никаких скрытых доплат — только <strong>прозрачность и качество</strong>.
          </p>
        </div>

        <PricingSection />

        {/* Дополнительная информация */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💳</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Оплата после уборки
            </h3>
            <p className="text-gray-600 text-sm">
              Никаких предоплат
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📋</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Работаем по договору
            </h3>
            <p className="text-gray-600 text-sm">
              Все условия прописаны
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Индивидуальный подход
            </h3>
            <p className="text-gray-600 text-sm">
              Учитываем особенности помещения
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 