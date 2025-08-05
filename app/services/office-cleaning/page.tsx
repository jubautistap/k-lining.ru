import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema';
import { CheckCircle, Clock, Shield, Users, Star, Zap, Phone, Calculator } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Уборка офисов в Москве: коммерческие помещения, ежедневная уборка | K-lining',
  description: 'Профессиональная уборка офисов и коммерческих помещений в Москве. Ежедневная уборка, генеральная уборка, уборка после ремонта. Дезинфекция, мытье окон. Цены от 3000₽.',
  keywords: 'уборка офисов Москва, клининг офисов, уборка коммерческих помещений, ежедневная уборка офиса, генеральная уборка офиса, дезинфекция офиса, мытье окон в офисе',
  openGraph: {
    title: 'Уборка офисов в Москве: коммерческие помещения, ежедневная уборка',
    description: 'Профессиональная уборка офисов и коммерческих помещений в Москве.',
    url: 'https://k-lining.ru/services/office-cleaning',
    siteName: 'K-lining',
    images: [{ url: '/images/office-cleaning.jpg', width: 1200, height: 630, alt: 'Уборка офисов в Москве' }],
    locale: 'ru_RU',
    type: 'website',
  },
  alternates: {
    canonical: 'https://k-lining.ru/services/office-cleaning',
  },
};

export default function OfficeCleaningPage() {
  const services = [
    {
      title: 'Ежедневная уборка офиса',
      description: 'Регулярная уборка офисных помещений для поддержания чистоты',
      price: 'от 3000₽',
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
      title: 'Генеральная уборка офиса',
      description: 'Комплексная уборка всех офисных помещений',
      price: 'от 8000₽',
      features: [
        'Мытье всех поверхностей',
        'Очистка сантехники',
        'Мытье окон и зеркал',
        'Уборка кухни и санузлов',
        'Очистка мебели',
        'Мытье полов и плинтусов'
      ]
    },
    {
      title: 'Уборка после ремонта офиса',
      description: 'Специализированная уборка после строительных работ',
      price: 'от 15000₽',
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
      title: 'Дезинфекция офиса',
      description: 'Профессиональная дезинфекция офисных помещений',
      price: 'от 5000₽',
      features: [
        'Обработка всех поверхностей',
        'Дезинфекция санузлов',
        'Обработка дверных ручек',
        'Дезинфекция кухни',
        'Обработка оргтехники',
        'Сертификат о дезинфекции'
      ]
    },
    {
      title: 'Мытье окон в офисе',
      description: 'Профессиональное мытье окон и витражей',
      price: 'от 2000₽',
      features: [
        'Мытье окон',
        'Мытье витражей',
        'Очистка подоконников',
        'Мытье жалюзи',
        'Очистка рам',
        'Полировка стекла'
      ]
    },
    {
      title: 'VIP уборка офиса',
      description: 'Премиум сервис для элитных офисов',
      price: 'от 20000₽',
      features: [
        'Особое внимание к деталям',
        'Премиум моющие средства',
        'Дополнительная дезинфекция',
        'Ароматизация помещений',
        'Персональный менеджер',
        'Отчет о проделанной работе'
      ]
    }
  ];

  const advantages = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Гибкий график',
      description: 'Работаем в удобное для вас время, включая выходные'
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
      title: 'Договор и отчетность',
      description: 'Официальные документы и ежемесячные отчеты'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Хлебные крошки для быстрых ссылок */}
      <div className="container-custom pt-6">
        <BreadcrumbSchema 
          items={[
            { name: 'Услуги', url: '/services' },
            { name: 'Уборка офисов', url: '/services/office-cleaning' }
          ]} 
        />
      </div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Уборка офисов в Москве
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8">
              Профессиональная уборка офисов и коммерческих помещений. Ежедневная уборка, генеральная уборка, дезинфекция.
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
              Виды уборки офисов
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Предлагаем полный спектр услуг по уборке офисов и коммерческих помещений в Москве
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
              Почему выбирают KliningPro для уборки офисов?
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
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Сколько стоит уборка офиса?</h3>
              <p className="text-gray-600">Стоимость зависит от площади офиса, количества сотрудников и вида уборки. Ежедневная уборка от 3000₽, генеральная от 8000₽.</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">В какое время можно заказать уборку?</h3>
              <p className="text-gray-600">Работаем в удобное для вас время: утром, днем, вечером, в выходные. Можем работать до и после рабочего дня.</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Предоставляете ли вы отчеты о проделанной работе?</h3>
              <p className="text-gray-600">Да, мы предоставляем ежемесячные отчеты о проделанной работе с фотографиями и описанием выполненных работ.</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Есть ли гарантия на уборку офиса?</h3>
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
              Готовы заказать уборку офиса?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Наши мастера готовы приехать в любое удобное время и привести ваш офис в идеальное состояние
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
    </div>
  );
} 