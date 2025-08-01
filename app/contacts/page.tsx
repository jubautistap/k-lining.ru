import { Metadata } from 'next';
import ContactSection from '@/components/sections/ContactSection';

export const metadata: Metadata = {
  title: 'Контакты клининговой компании в Москве | Заказать уборку KliningPro',
  description: 'Свяжитесь с нами для заказа уборки в Москве. Телефон, email, адрес. Работаем 24/7. Бесплатная консультация. Уборка квартир, офисов, химчистка, мытье окон.',
  keywords: 'контакты клининга, уборка москва контакты, заказать уборку, телефон клининга, контакты уборки квартир, заказать уборку офиса, контакты химчистки',
  openGraph: {
    title: 'Контакты клининговой компании в Москве | Заказать уборку',
    description: 'Свяжитесь с нами для заказа уборки в Москве. Телефон, email, адрес. Работаем 24/7.',
    url: 'https://k-lining.ru/contacts',
    siteName: 'KliningPro',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Контакты KliningPro',
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Контакты клининговой компании в Москве | Заказать уборку',
    description: 'Свяжитесь с нами для заказа уборки в Москве',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://k-lining.ru/contacts',
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

export default function ContactsPage() {
  return (
    <div className="section-padding bg-gradient-to-br from-gray-50 to-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Контакты
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Готовы ответить на все ваши вопросы и помочь с выбором услуг. 
            <strong>Звоните или пишите — мы всегда на связи!</strong>
          </p>
        </div>

        <ContactSection />

        {/* Дополнительная информация */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📞</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Быстрый ответ
            </h3>
            <p className="text-gray-600 text-sm">
              Ответим в течение 10 минут
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💬</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Бесплатная консультация
            </h3>
            <p className="text-gray-600 text-sm">
              Поможем выбрать услуги
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🕐</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Работаем 24/7
            </h3>
            <p className="text-gray-600 text-sm">
              В любое время дня и ночи
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 