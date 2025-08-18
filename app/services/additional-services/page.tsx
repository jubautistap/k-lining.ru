import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema';
import { CheckCircle, Clock, Shield, Users, Star, Zap, Phone, Calculator } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Дополнительные услуги клининга в Москве — кухни, санузлы, балконы | K-lining',
  description: 'Специализированные услуги клининга в Москве. Уборка санузлов, кухонь, балконов, механизированная уборка, уборка территории. Цены от 500₽.',
  keywords: 'дополнительные услуги клининга, уборка санузлов, уборка кухни, уборка балконов, механизированная уборка, уборка территории, клининг услуги Москва',
  openGraph: {
    title: 'Дополнительные услуги клининга — кухни, санузлы, балконы',
    description: 'Специализированные услуги клининга в Москве. Уборка санузлов, кухонь, балконов.',
    url: 'https://k-lining.ru/services/additional-services',
    siteName: 'K-lining',
    images: [{ url: '/images/additional-services.jpg', width: 1200, height: 630, alt: 'Дополнительные услуги клининга' }],
    locale: 'ru_RU',
    type: 'website',
  },
  alternates: {
    canonical: 'https://k-lining.ru/services/additional-services',
  },
};

export default function AdditionalServicesPage() {
  const services = [
    {
      title: 'Уборка санузлов',
      description: 'Профессиональная уборка ванных комнат и туалетов',
      price: 'от 500₽',
      features: [
        'Мытье сантехники',
        'Очистка кафеля',
        'Мытье зеркал',
        'Очистка пола',
        'Дезинфекция',
        'Удаление налета'
      ]
    },
    {
      title: 'Уборка кухни',
      description: 'Комплексная уборка кухонных помещений',
      price: 'от 800₽',
      features: [
        'Мытье кухонной мебели',
        'Очистка плиты',
        'Мытье вытяжки',
        'Очистка холодильника',
        'Мытье посуды',
        'Уборка мусора'
      ]
    },
    {
      title: 'Уборка балконов',
      description: 'Комплексная очистка балконов и лоджий',
      price: 'от 1000₽',
      features: [
        'Мытье остекления',
        'Очистка перил',
        'Мытье пола балкона',
        'Очистка стен',
        'Мытье дверей',
        'Уборка мусора'
      ]
    },
    {
      title: 'Механизированная уборка',
      description: 'Уборка с использованием профессиональной техники',
      price: 'от 2000₽',
      features: [
        'Поломоечные машины',
        'Пылесосы для влажной уборки',
        'Пароочистители',
        'Полировщики полов',
        'Мойки высокого давления',
        'Профессиональная техника'
      ]
    },
    {
      title: 'Уборка территории',
      description: 'Уборка придомовой территории и участков',
      price: 'от 1500₽',
      features: [
        'Подметание дорожек',
        'Уборка листвы',
        'Мытье тротуаров',
        'Очистка от мусора',
        'Уборка снега',
        'Мытье входных групп'
      ]
    },
    {
      title: 'Уборка шерсти',
      description: 'Специализированная уборка шерсти животных',
      price: 'от 300₽',
      features: [
        'Удаление шерсти с мебели',
        'Очистка ковров',
        'Уборка с одежды',
        'Очистка обивки',
        'Удаление запахов',
        'Антибактериальная обработка'
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
      title: 'Гибкие условия',
      description: 'Индивидуальный подход к каждому клиенту'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Хлебные крошки */}
      <div className="container-custom pt-6">
        <BreadcrumbSchema 
          items={[{ name: 'Услуги', url: '/services' }, { name: 'Дополнительные услуги', url: '/services/additional-services' }]} 
        />
      </div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Дополнительные услуги клининга
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8">
              Специализированные услуги клининга в Москве. Уборка санузлов, кухонь, балконов, механизированная уборка.
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
                Заказать услугу
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
              Виды дополнительных услуг
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Предлагаем полный спектр специализированных услуг клининга в Москве и Московской области
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
              Почему выбирают K-lining для дополнительных услуг?
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
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Сколько стоят дополнительные услуги?</h3>
              <p className="text-gray-600">Стоимость зависит от объема работ и сложности. Уборка санузла от 500₽, кухни от 800₽, балкона от 1000₽.</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Как быстро приедет мастер?</h3>
              <p className="text-gray-600">Мы приезжаем в день заказа или в удобное для вас время. При срочном заказе - в течение 2 часов.</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Какое оборудование используется?</h3>
              <p className="text-gray-600">Используем профессиональную технику: поломоечные машины, пароочистители, пылесосы для влажной уборки, мойки высокого давления.</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Есть ли гарантия на дополнительные услуги?</h3>
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
              Готовы заказать дополнительную услугу?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Наши мастера готовы приехать в любое удобное время и выполнить любую специализированную работу
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contacts" 
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Заказать услугу
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