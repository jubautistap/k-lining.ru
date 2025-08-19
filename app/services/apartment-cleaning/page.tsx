import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema';
import { CheckCircle, Clock, Shield, Users, Star, Zap, Phone, Calculator } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Уборка квартир в Москве — мин. заказ 6 000 ₽ | K-lining',
  description: 'Профессиональная уборка квартир в Москве и МО. Генеральная уборка, уборка после ремонта, поддерживающая уборка. Гарантия качества, выезд в день заказа. Минимальная стоимость заказа — 6 000 ₽.',
  keywords: 'уборка квартир Москва, генеральная уборка квартиры, уборка после ремонта, поддерживающая уборка, клининг квартир, уборка квартиры цена, эко уборка квартиры, VIP уборка квартиры',
  openGraph: {
    title: 'Уборка квартир в Москве: генеральная, после ремонта, поддерживающая',
    description: 'Профессиональная уборка квартир в Москве и МО. Генеральная уборка, уборка после ремонта, поддерживающая уборка.',
    url: 'https://k-lining.ru/services/apartment-cleaning',
    siteName: 'K-lining',
    images: [{ url: '/images/apartment-cleaning.jpg', width: 1200, height: 630, alt: 'Уборка квартир в Москве' }],
    locale: 'ru_RU',
    type: 'website',
  },
  alternates: {
    canonical: 'https://k-lining.ru/services/apartment-cleaning',
  },
};

export default function ApartmentCleaningPage() {
  return (
    <>
      {/* Service Schema для локального SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Уборка квартир в Москве",
            "description": "Профессиональная уборка квартир в Москве и МО. Генеральная уборка, уборка после ремонта, поддерживающая уборка. Гарантия качества, выезд в день заказа.",
            "provider": {
              "@type": "LocalBusiness",
              "name": "K-lining",
              "url": "https://k-lining.ru",
              "telephone": "+7-925-555-18-33",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "ул. Бакунинская, 69, стр. 1",
                "addressLocality": "Москва",
                "postalCode": "105082",
                "addressCountry": "RU"
              }
            },
            "areaServed": {
              "@type": "City",
              "name": "Москва"
            },
            "offers": [
              {
                "@type": "Offer",
                "name": "Генеральная уборка квартиры",
                "description": "Комплексная уборка всех помещений с тщательной очисткой труднодоступных мест",
                "priceRange": "от 6000₽",
                "priceCurrency": "RUB"
              },
              {
                "@type": "Offer", 
                "name": "Уборка после ремонта",
                "description": "Специализированная уборка после строительных и ремонтных работ",
                "priceRange": "от 7000₽",
                "priceCurrency": "RUB"
              },
              {
                "@type": "Offer",
                "name": "Поддерживающая уборка",
                "description": "Регулярная уборка для поддержания чистоты в квартире",
                "priceRange": "от 6000₽", 
                "priceCurrency": "RUB"
              }
            ],
            "category": "Клининговые услуги",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Услуги по уборке квартир",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Генеральная уборка квартиры"
                  }
                },
                {
                  "@type": "Offer", 
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Уборка после ремонта"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service", 
                    "name": "Поддерживающая уборка"
                  }
                }
              ]
            }
          })
        }}
      />

      <ApartmentCleaningContent />
    </>
  );
}

function ApartmentCleaningContent() {
  const services = [
    {
      title: 'Генеральная уборка квартиры',
      description: 'Комплексная уборка всех помещений с тщательной очисткой труднодоступных мест',
      price: 'от 6000₽',
      features: [
        'Мытье всех поверхностей',
        'Очистка сантехники',
        'Мытье окон и зеркал',
        'Уборка кухни и ванной',
        'Очистка мебели',
        'Мытье полов и плинтусов'
      ]
    },
    {
      title: 'Уборка после ремонта',
      description: 'Специализированная уборка после строительных и ремонтных работ',
      price: 'от 7000₽',
      features: [
        'Удаление строительной пыли',
        'Очистка от краски и клея',
        'Мытье всех поверхностей',
        'Очистка сантехники',
        'Уборка строительного мусора',
        'Финишная уборка'
      ]
    },
    {
      title: 'Поддерживающая уборка',
      description: 'Регулярная уборка для поддержания чистоты в квартире',
      price: 'от 6000₽',
      features: [
        'Мытье полов',
        'Очистка сантехники',
        'Протирка пыли',
        'Мытье зеркал',
        'Уборка кухни',
        'Вынос мусора'
      ]
    },
    {
      title: 'Эко уборка квартиры',
      description: 'Уборка с использованием экологически безопасных средств',
      price: 'от 6000₽',
      features: [
        'Безопасные моющие средства',
        'Гипоаллергенные составы',
        'Безопасно для детей и животных',
        'Приятный аромат',
        'Эффективная очистка',
        'Забота об экологии'
      ]
    },
    {
      title: 'VIP уборка квартиры',
      description: 'Премиум сервис с повышенным вниманием к деталям',
      price: 'от 10000₽',
      features: [
        'Особое внимание к деталям',
        'Премиум моющие средства',
        'Дополнительная дезинфекция',
        'Ароматизация помещений',
        'Складка белья',
        'Персональный менеджер'
      ]
    },
    {
      title: 'Срочная уборка квартиры',
      description: 'Быстрая уборка в день заказа',
      price: 'от 6000₽',
      features: [
        'Выезд в течение 2 часов',
        'Быстрая уборка',
        'Гарантия качества',
        'Удобное время',
        'Оплата после уборки',
        'Без предоплаты'
      ]
    }
  ];

  const advantages = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Быстрый выезд',
      description: 'Приедем в день заказа или в удобное время'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Гарантия качества',
      description: '100% результат или переделаем бесплатно'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Опытные мастера',
      description: 'Профессиональная команда с опытом от 3 лет'
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: 'Премиум сервис',
      description: 'Внимание к каждой детали и пожеланиям'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Современное оборудование',
      description: 'Профессиональная техника и моющие средства'
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Договор и сертификат',
      description: 'Официальные документы и отчетность'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Хлебные крошки для быстрых ссылок */}
      <div className="container-custom pt-6">
        <BreadcrumbSchema 
          items={[
            { name: 'Услуги', url: '/services' },
            { name: 'Уборка квартир', url: '/services/apartment-cleaning' }
          ]} 
        />
      </div>
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Уборка квартир в Москве
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8">
              Профессиональная уборка квартир любой сложности. Генеральная уборка, уборка после ремонта, поддерживающая уборка.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/calculator" 
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Рассчитать стоимость
              </Link>
              <Link 
                href="/contacts" 
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
              >
                Заказать уборку
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Виды уборки квартир
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Предлагаем полный спектр услуг по уборке квартир в Москве и Московской области
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                  <span className="text-primary-600 font-bold">{service.price}</span>
                </div>
                <p className="text-gray-600 mb-6">{service.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-700">
                      <CheckCircle className="w-5 h-5 text-primary-600 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link 
                  href="/contacts"
                  className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors w-full text-center"
                >
                  Заказать
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Почему выбирают K-lining для уборки квартир?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Мы гарантируем качество и соблюдаем все обещания
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-primary-600">
                    {advantage.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{advantage.title}</h3>
                <p className="text-gray-600">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Часто задаваемые вопросы
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Сколько стоит уборка квартиры?</h3>
              <p className="text-gray-600">Стоимость зависит от площади квартиры, вида уборки и количества комнат. Поддерживающая уборка от 60–110 ₽/м²; генеральная от 160–220 ₽/м². Минимальный заказ — 6 000 ₽.</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Как быстро приедет мастер?</h3>
              <p className="text-gray-600">Мы приезжаем в день заказа или в удобное для вас время. При срочном заказе - в течение 2 часов.</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Какие моющие средства используются?</h3>
              <p className="text-gray-600">Используем профессиональные моющие средства ведущих брендов. При заказе эко-уборки - экологически безопасные средства.</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Есть ли гарантия на уборку?</h3>
              <p className="text-gray-600">Да, мы предоставляем 100% гарантию качества. Если что-то не понравилось - переделаем бесплатно.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Готовы заказать уборку квартиры?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Наши мастера готовы приехать в любое удобное время и привести вашу квартиру в идеальное состояние
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contacts" 
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Заказать уборку
              </Link>
              <Link 
                href="/calculator" 
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
              >
                Рассчитать стоимость
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Автоперелинковка будет добавлена глобально через SiteChrome */}
    </div>
  );
} 