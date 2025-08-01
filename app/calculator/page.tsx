import { Metadata } from 'next';
import CleaningCalculator from '@/components/calculators/CleaningCalculator';

export const metadata: Metadata = {
  title: 'Калькулятор стоимости уборки квартир и офисов | Рассчитать цену KliningPro',
  description: 'Рассчитайте примерную стоимость уборки онлайн. Выберите тип помещения, площадь и услуги. Реалистичный расчет с учетом сложности. Уборка квартир, офисов, химчистка.',
  keywords: 'расчет стоимости уборки, калькулятор уборки, стоимость уборки, расчет цены уборки, онлайн калькулятор, уборка квартир цена, уборка офисов цена, химчистка цена',
  openGraph: {
    title: 'Калькулятор стоимости уборки квартир и офисов | Рассчитать цену',
    description: 'Рассчитайте примерную стоимость уборки онлайн. Выберите тип помещения, площадь и услуги. Реалистичный расчет с учетом сложности.',
    url: 'https://k-lining.ru/calculator',
    siteName: 'KliningPro',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Калькулятор стоимости уборки KliningPro',
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