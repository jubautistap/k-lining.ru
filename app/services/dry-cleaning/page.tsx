import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, Clock, Shield, Users, Star, Zap, Phone, Calculator } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Химчистка в Москве: мебель, ковры, диваны, матрасы | KliningPro',
  description: 'Профессиональная химчистка мебели, ковров, диванов, матрасов в Москве и МО. Химчистка на дому, выезд специалиста. Гарантия качества, цены от 1000₽.',
  keywords: 'химчистка Москва, химчистка мебели, химчистка ковров, химчистка диванов, химчистка матрасов, химчистка на дому, химчистка штор, химчистка стульев',
  openGraph: {
    title: 'Химчистка в Москве: мебель, ковры, диваны, матрасы',
    description: 'Профессиональная химчистка мебели, ковров, диванов, матрасов в Москве и МО.',
    url: 'https://k-lining.ru/services/dry-cleaning',
    siteName: 'KliningPro',
    images: [{ url: '/images/dry-cleaning.jpg', width: 1200, height: 630, alt: 'Химчистка в Москве' }],
    locale: 'ru_RU',
    type: 'website',
  },
  alternates: {
    canonical: 'https://k-lining.ru/services/dry-cleaning',
  },
};

export default function DryCleaningPage() {
  const services = [
    {
      title: 'Химчистка диванов',
      description: 'Профессиональная химчистка мягкой мебели',
      price: 'от 1500₽',
      features: [
        'Очистка от пятен',
        'Удаление запахов',
        'Очистка обивки',
        'Обработка антистатиком',
        'Защита от загрязнений',
        'Сушка на месте'
      ]
    },
    {
      title: 'Химчистка ковров',
      description: 'Глубокая очистка ковров и ковровых покрытий',
      price: 'от 1000₽',
      features: [
        'Удаление пятен',
        'Очистка от пыли',
        'Антибактериальная обработка',
        'Защита от моли',
        'Обработка антистатиком',
        'Сушка на месте'
      ]
    },
    {
      title: 'Химчистка матрасов',
      description: 'Профессиональная очистка матрасов',
      price: 'от 2000₽',
      features: [
        'Удаление пятен',
        'Очистка от пыли',
        'Антибактериальная обработка',
        'Удаление запахов',
        'Защита от клещей',
        'Сушка на месте'
      ]
    },
    {
      title: 'Химчистка штор',
      description: 'Профессиональная очистка штор и гардин',
      price: 'от 800₽',
      features: [
        'Удаление пятен',
        'Очистка от пыли',
        'Антибактериальная обработка',
        'Защита от выцветания',
        'Обработка антистатиком',
        'Сушка на месте'
      ]
    },
    {
      title: 'Химчистка стульев',
      description: 'Очистка мягких стульев и кресел',
      price: 'от 500₽',
      features: [
        'Очистка обивки',
        'Удаление пятен',
        'Обработка антистатиком',
        'Защита от загрязнений',
        'Удаление запахов',
        'Сушка на месте'
      ]
    },
    {
      title: 'Химчистка мебели',
      description: 'Комплексная очистка всей мягкой мебели',
      price: 'от 3000₽',
      features: [
        'Химчистка диванов',
        'Химчистка кресел',
        'Химчистка стульев',
        'Очистка подушек',
        'Обработка антистатиком',
        'Защита от загрязнений'
      ]
    }
  ];

  const advantages = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Выезд на дом',
      description: 'Приедем в удобное время и проведем химчистку на месте'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Гарантия качества',
      description: '100% результат или переделаем бесплатно'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Опытные мастера',
      description: 'Профессиональная команда с опытом от 5 лет'
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
      title: 'Безопасные средства',
      description: 'Экологически безопасные моющие средства'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Химчистка в Москве
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8">
              Профессиональная химчистка мебели, ковров, диванов, матрасов. Выезд на дом, гарантия качества.
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
                Заказать химчистку
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
              Виды химчистки
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Предлагаем полный спектр услуг по химчистке в Москве и Московской области
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
              Почему выбирают KliningPro для химчистки?
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
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Сколько стоит химчистка?</h3>
              <p className="text-gray-600">Стоимость зависит от размера изделия и сложности загрязнений. Химчистка дивана от 1500₽, ковра от 1000₽, матраса от 2000₽.</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Как быстро приедет мастер?</h3>
              <p className="text-gray-600">Мы приезжаем в день заказа или в удобное для вас время. При срочном заказе - в течение 2 часов.</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Сколько сохнет после химчистки?</h3>
              <p className="text-gray-600">Время сушки зависит от материала и толщины. Обычно 2-4 часа. Используем профессиональные сушильные установки.</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Есть ли гарантия на химчистку?</h3>
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
              Готовы заказать химчистку?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Наши мастера готовы приехать в любое удобное время и привести вашу мебель в идеальное состояние
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contacts" 
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Заказать химчистку
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
    </div>
  );
} 