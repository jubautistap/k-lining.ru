import { Metadata } from 'next';
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema';
import CleaningCalculator from '@/components/calculators/CleaningCalculator';

export const metadata: Metadata = {
  title: 'Калькулятор стоимости уборки квартир и офисов | Рассчитать цену K-lining',
  description: 'Рассчитайте примерную стоимость уборки онлайн. Выберите тип помещения, площадь и услуги. Реалистичный расчет с учетом сложности. Уборка квартир, офисов, химчистка.',
  keywords: 'расчет стоимости уборки, калькулятор уборки, стоимость уборки, расчет цены уборки, онлайн калькулятор, уборка квартир цена, уборка офисов цена, химчистка цена',
  openGraph: {
    title: 'Калькулятор стоимости уборки квартир и офисов | Рассчитать цену',
    description: 'Рассчитайте примерную стоимость уборки онлайн. Выберите тип помещения, площадь и услуги. Реалистичный расчет с учетом сложности.',
    url: 'https://k-lining.ru/calculator',
    siteName: 'K-lining',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Калькулятор стоимости уборки K-lining',
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Калькулятор стоимости уборки квартир и офисов | Рассчитать цену',
    description: 'Рассчитайте примерную стоимость уборки онлайн',
    images: ['/og-image.jpg'],
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

        <CleaningCalculator />

        {/* Дополнительная информация */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚡</span>
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
              <span className="text-2xl">💰</span>
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
              <span className="text-2xl">✅</span>
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