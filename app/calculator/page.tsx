import { Metadata } from 'next';
import { Zap, DollarSign, CheckCircle } from 'lucide-react';
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema';
import CleaningCalculator from '@/components/calculators/CleaningCalculator';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Калькулятор уборки — рассчитать стоимость онлайн за 30 сек | K-lining',
  description: 'Калькулятор уборки Москва: рассчитать стоимость клининга за 30 сек. Точные цены на уборку квартир, офисов, химчистку. Попробовать ⭐',
  keywords: 'калькулятор уборки, стоимость клининга, цена уборки',
  openGraph: {
    title: 'Калькулятор уборки — рассчитать стоимость за 30 сек',
    description: 'Рассчитайте стоимость уборки квартиры или офиса онлайн. Калькулятор цен на клининговые услуги в Москве. Быстрый расчет от K-lining.',
    url: 'https://k-lining.ru/calculator',
    siteName: 'K-lining',
    images: [
      {
        url: '/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Калькулятор уборки K-lining - Рассчитать стоимость',
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Калькулятор уборки K-lining - Рассчитать стоимость',
    description: 'Онлайн калькулятор стоимости уборки квартир и офисов. Быстрый расчет цены клининговых услуг.',
          images: ['/og-image.webp'],
  },
  alternates: {
    canonical: 'https://k-lining.ru/calculator',
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

export default function CalculatorPage() {
  return (
    <div className="section-padding bg-gradient-to-br from-gray-50 to-white">
      {/* FAQ Schema для rich snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Насколько точна стоимость в калькуляторе?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Калькулятор показывает примерную стоимость с точностью 90-95%. Финальная цена может незначительно отличаться в зависимости от состояния помещения и дополнительных пожеланий."
                }
              },
              {
                "@type": "Question",
                "name": "Можно ли изменить параметры после расчета?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Да, вы можете в любое время изменить площадь, тип уборки или дополнительные услуги. Стоимость пересчитается автоматически."
                }
              },
              {
                "@type": "Question",
                "name": "Включены ли в стоимость моющие средства?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Да, все профессиональные моющие средства и оборудование уже включены в расчетную стоимость. Доплачивать ничего не нужно."
                }
              },
              {
                "@type": "Question",
                "name": "Есть ли скидки для больших площадей?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Да, для площадей свыше 200 м² действуют прогрессивные скидки до 15%. Калькулятор автоматически их учитывает в расчете."
                }
              }
            ]
          })
        }}
      />
      
      {/* Хлебные крошки для быстрых ссылок */}
      <div className="container-custom pt-6">
        <BreadcrumbSchema 
          items={[
            { name: 'Калькулятор стоимости', url: '/calculator' }
          ]} 
        />
      </div>
      
      <div className="container-custom">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Расчет стоимости услуг
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Рассчитайте примерную стоимость уборки онлайн. Выберите тип помещения, площадь и дополнительные услуги. 
            <strong>Реалистичный расчет с учетом сложности работ.</strong>
          </p>
        </div>

        {/* Оборачиваем клиентский калькулятор и даем SEO/доступности фолбэк без JS */}
        <noscript>
          <div className="mb-6 p-4 border rounded-lg bg-white">
            <h2 className="text-lg font-semibold mb-2">Быстрый запрос расчета (без JavaScript)</h2>
            <form method="POST" action="/api/contact" className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input name="name" placeholder="Имя" className="border p-2 rounded" required />
              <input name="phone" placeholder="Телефон" className="border p-2 rounded" required />
              <input name="service" placeholder="Тип: поддерживающая/генеральная/после ремонта" className="border p-2 rounded md:col-span-2" />
              <input name="message" placeholder="Площадь (м²), кол-во створок, пожелания" className="border p-2 rounded md:col-span-2" />
              <button type="submit" className="btn-primary md:col-span-2">Отправить запрос</button>
            </form>
          </div>
        </noscript>
        <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse rounded-xl" />}> 
          <CleaningCalculator />
        </Suspense>

        {/* Дополнительная информация */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Реалистичный расчет
            </h3>
            <p className="text-gray-600 text-sm">
              Учитываем сложность работ
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Прозрачные цены
            </h3>
            <p className="text-gray-600 text-sm">
              Никаких скрытых доплат
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Гибкие площади
            </h3>
            <p className="text-gray-600 text-sm">
              До 5,000 м² включительно
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 