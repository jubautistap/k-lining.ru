'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle, Shield, Clock, Users, Star, Zap } from 'lucide-react';

export default function ServicesPage() {
  const services = [
    {
      title: 'Уборка квартир',
      description: 'Комплексная уборка квартир любой сложности',
      icon: '🏠',
      features: [
        'Генеральная уборка',
        'После ремонта',
        'Поддерживающая',
        'Эко уборка',
        'VIP уборка',
        'Срочная уборка'
      ],
      href: '/services/apartment-cleaning'
    },
    {
      title: 'Уборка домов',
      description: 'Профессиональная уборка частных домов и коттеджей',
      icon: '🏡',
      features: [
        'Коттеджи',
        'Таунхаусы',
        'Дачи',
        'После ремонта',
        'Поддерживающая уборка'
      ],
      href: '/services/house-cleaning'
    },
    {
      title: 'Уборка офисов',
      description: 'Клининг коммерческих помещений и офисов',
      icon: '🏢',
      features: [
        'Генеральная уборка',
        'Ежедневная уборка',
        'После ремонта',
        'Дезинфекция',
        'Мытье окон в офисе'
      ],
      href: '/services/office-cleaning'
    },
    {
      title: 'Мытье окон',
      description: 'Профессиональное мытье окон и витражей',
      icon: '🪟',
      features: [
        'Мытье окон в квартире',
        'Мытье балконов',
        'Мытье фасадов',
        'Промышленный альпинизм',
        'Мытье витрин'
      ],
      href: '/services/window-cleaning'
    },
    {
      title: 'Химчистка',
      description: 'Профессиональная химчистка мебели и текстиля',
      icon: '🧽',
      features: [
        'Диванов',
        'Мягкой мебели',
        'Ковров',
        'Матрасов',
        'Штор',
        'Стульев'
      ],
      href: '/services/dry-cleaning'
    },
    {
      title: 'Дополнительные услуги',
      description: 'Специализированные услуги клининга',
      icon: '✨',
      features: [
        'Уборка санузлов',
        'Уборка кухни',
        'Уборка шерсти',
        'Уборка балконов',
        'Механизированная уборка',
        'Уборка территории'
      ],
      href: '/services/additional-services'
    }
  ];

  const advantages = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Быстрый выезд',
      description: 'Приедем в день заказа'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Гарантия качества',
      description: '100% результат или переделаем бесплатно'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Опытные мастера',
      description: 'Профессиональная команда'
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: 'Премиум сервис',
      description: 'Внимание к каждой детали'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Современное оборудование',
      description: 'Профессиональная техника'
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Договор и сертификат',
      description: 'Официальные документы'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Услуги клининга в Москве
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8">
              Профессиональная уборка квартир, домов, офисов и коммерческих помещений
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

      {/* Services Grid */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Наши услуги
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Предлагаем полный спектр клининговых услуг для частных лиц и организаций в Москве и Московской области
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
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
                  href={service.href}
                  className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  Подробнее
                </Link>
                <Link 
                  href="/contacts"
                  className="inline-block bg-white text-primary-600 border-2 border-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors mt-3"
                >
                  Заказать
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal SEO Links to Landing Pages */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Популярные направления клининга в Москве
          </h2>
          <p className="text-gray-600 mb-6 max-w-3xl">
            Быстрые ссылки на часто заказываемые услуги и лендинги. Это поможет быстрее найти нужную услугу и улучшит навигацию.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { href: '/uborka-kvartiry-moskva', text: 'Уборка квартиры Москва' },
              { href: '/uborka-posle-remonta-moskva', text: 'Уборка после ремонта Москва' },
              { href: '/myte-okon-moskva', text: 'Мытьё окон Москва' },
              { href: '/himchistka-mebeli-moskva', text: 'Химчистка мебели Москва' },
              { href: '/uborka-ofisa-moskva', text: 'Уборка офиса Москва' },
              { href: '/klining-cena-moskva', text: 'Клининг цена Москва' },
              { href: '/uborka-odnushki-moskva', text: 'Уборка однушки Москва' },
              { href: '/uborka-dvushki-moskva', text: 'Уборка двушки Москва' },
              { href: '/uborka-pered-sdachey-kvartiry-moskva', text: 'Уборка перед сдачей квартиры' },
              { href: '/klining-24-7-moskva', text: 'Клининг 24/7' },
              { href: '/klining-nedorogo-moskva', text: 'Клининг недорого' },
              { href: '/uborka-doma-moskva', text: 'Уборка дома Москва' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-800 hover:border-primary-300 hover:bg-primary-50 transition-colors"
              >
                <span>{link.text}</span>
                <span className="text-primary-600">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Почему выбирают K-lining?
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Готовы заказать уборку?
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
    </div>
  );
} 