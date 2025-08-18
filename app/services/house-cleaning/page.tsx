import React from 'react';
import { Metadata } from 'next';
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema';
import RelatedServicesSection from '@/components/sections/RelatedServicesSection';
import FAQSchema from '@/components/ui/FAQSchema';
import Link from 'next/link';
import { CheckCircle, Clock, Shield, Users, Star, Zap, Phone, Calculator } from 'lucide-react';
import MiniCalculator from '@/components/calculators/MiniCalculator';

export const metadata: Metadata = {
  title: 'Уборка домов и коттеджей в Москве — от 5 000 ₽, гарантия | K-lining',
  description: 'Профессиональная уборка частных домов, коттеджей и таунхаусов в Москве и МО. Уборка после ремонта, поддерживающая уборка. Гарантия качества, выезд в день заказа. Цены от 5000₽.',
  keywords: 'уборка домов Москва, уборка коттеджей, уборка таунхаусов, уборка дач, клининг домов, уборка частного дома, уборка после ремонта дома, поддерживающая уборка дома',
  openGraph: {
    title: 'Уборка домов в Москве: коттеджи, таунхаусы, дачи',
    description: 'Профессиональная уборка частных домов, коттеджей и таунхаусов в Москве и МО.',
    url: 'https://k-lining.ru/services/house-cleaning',
    siteName: 'K-lining',
    images: [{ url: '/images/house-cleaning.jpg', width: 1200, height: 630, alt: 'Уборка домов в Москве' }],
    locale: 'ru_RU',
    type: 'website',
  },
  alternates: {
    canonical: 'https://k-lining.ru/services/house-cleaning',
  },
};

export default function HouseCleaningPage() {
  const services = [
    {
      title: 'Уборка коттеджей',
      description: 'Комплексная уборка коттеджей любой площади и сложности',
      price: 'от 8000₽',
      features: [
        'Уборка всех этажей',
        'Мытье лестниц',
        'Очистка сантехники',
        'Мытье окон и зеркал',
        'Уборка кухни и ванных',
        'Мытье полов и плинтусов'
      ]
    },
    {
      title: 'Уборка таунхаусов',
      description: 'Профессиональная уборка таунхаусов с учетом специфики',
      price: 'от 6000₽',
      features: [
        'Уборка всех комнат',
        'Мытье лестниц',
        'Очистка сантехники',
        'Мытье окон',
        'Уборка кухни',
        'Мытье полов'
      ]
    },
    {
      title: 'Уборка дач',
      description: 'Сезонная и поддерживающая уборка дачных домов',
      price: 'от 5000₽',
      features: [
        'Сезонная уборка',
        'Подготовка к сезону',
        'Мытье всех поверхностей',
        'Очистка сантехники',
        'Мытье окон',
        'Уборка территории'
      ]
    },
    {
      title: 'Уборка после ремонта дома',
      description: 'Специализированная уборка после строительных работ',
      price: 'от 12000₽',
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
      title: 'Поддерживающая уборка дома',
      description: 'Регулярная уборка для поддержания чистоты',
      price: 'от 5000₽',
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
      title: 'VIP уборка домов',
      description: 'Премиум сервис для элитных домов',
      price: 'от 15000₽',
      features: [
        'Особое внимание к деталям',
        'Премиум моющие средства',
        'Дополнительная дезинфекция',
        'Ароматизация помещений',
        'Складка белья',
        'Персональный менеджер'
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
      description: 'Профессиональная команда с релевантным опытом'
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: 'Премиум сервис',
      description: 'Внимание к каждой детали и пожеланиям'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Современное оборудование',
      description: 'Профессиональная техника для больших площадей'
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
          items={[{ name: 'Услуги', url: '/services' }, { name: 'Уборка домов', url: '/services/house-cleaning' }]} 
        />
      </div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white py-20">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Уборка домов в Москве
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8">
              Профессиональная уборка частных домов, коттеджей и таунхаусов. Уборка после ремонта, поддерживающая уборка.
            </p>
            <div className="hidden md:block"></div>
            <MiniCalculator defaultArea={120} propertyType="house" cleaningType="general" className="md:justify-self-end" />
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Виды уборки домов
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Предлагаем полный спектр услуг по уборке частных домов в Москве и Московской области
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
              Почему выбирают K-lining для уборки домов?
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
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Сколько стоит уборка дома?</h3>
              <p className="text-gray-600">Стоимость зависит от площади дома, количества этажей и вида уборки. Поддерживающая уборка от 5000₽, генеральная от 8000₽.</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Как быстро приедет команда?</h3>
              <p className="text-gray-600">Мы приезжаем в день заказа или в удобное для вас время. Для больших домов может потребоваться команда из нескольких человек.</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Убираете ли вы территорию вокруг дома?</h3>
              <p className="text-gray-600">Да, мы можем убрать территорию вокруг дома, включая мытье дорожек, очистку от листвы и мусора.</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Есть ли гарантия на уборку дома?</h3>
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
              Готовы заказать уборку дома?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Наши мастера готовы приехать в любое удобное время и привести ваш дом в идеальное состояние
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

      {/* FAQ JSON-LD */}
      <FAQSchema
        items={[
          { question: 'Сколько стоит уборка дома?', answer: 'Поддерживающая уборка — от 5000₽, генеральная — от 8000₽. Итог зависит от площади и этажности.' },
          { question: 'Убираете ли коттеджи после ремонта?', answer: 'Да, специализируемся на послеремонтной уборке домов — от 12 000 ₽.' },
          { question: 'Выезжаете в область?', answer: 'Да, работаем по Москве и МО. Возможна доплата за дальность выезда.' },
        ]}
      />

      {/* Перелинковка на смежные услуги */}
      <RelatedServicesSection currentService="/services/house-cleaning" />
    </div>
  );
} 