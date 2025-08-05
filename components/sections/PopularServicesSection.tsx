'use client';

import Link from 'next/link';
import { ArrowRight, Home, Building2, Sofa, Droplets, Calculator, Phone } from 'lucide-react';

/**
 * 🔗 Компонент популярных услуг для быстрых ссылок Яндекса
 * Оптимизирован согласно требованиям формирования сайтлинков
 */
export default function PopularServicesSection() {
  const popularServices = [
    {
      icon: Home,
      title: 'Уборка квартир',
      description: 'Генеральная и поддерживающая уборка',
      href: '/services/apartment-cleaning',
      color: 'bg-blue-500',
      price: 'от 3,000₽'
    },
    {
      icon: Building2,
      title: 'Уборка офисов',
      description: 'Регулярная уборка коммерческих помещений',
      href: '/services/office-cleaning',
      color: 'bg-green-500',
      price: 'от 5,000₽'
    },
    {
      icon: Sofa,
      title: 'Химчистка мебели',
      description: 'Профессиональная химчистка диванов и кресел',
      href: '/services/furniture-dry-cleaning',
      color: 'bg-purple-500',
      price: 'от 2,500₽'
    },
    {
      icon: Droplets,
      title: 'Мытье окон',
      description: 'Мытье окон в квартирах и офисах',
      href: '/services/window-cleaning',
      color: 'bg-sky-500',
      price: 'от 150₽/м²'
    }
  ];

  const quickActions = [
    {
      icon: Calculator,
      title: 'Рассчитать стоимость',
      description: 'Онлайн калькулятор уборки',
      href: '/calculator',
      color: 'bg-orange-500'
    },
    {
      icon: Phone,
      title: 'Заказать уборку',
      description: 'Быстрый заказ по телефону',
      href: '/contacts',
      color: 'bg-red-500'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        {/* Заголовок оптимизирован для быстрых ссылок */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Популярные услуги K-lining
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Самые востребованные клининговые услуги в Москве. Быстрый заказ и гарантия качества.
          </p>
        </div>

        {/* Популярные услуги */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {popularServices.map((service) => {
            const IconComponent = service.icon;
            return (
              <Link
                key={service.title}
                href={service.href}
                className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-primary-200"
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`w-16 h-16 ${service.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="text-lg font-bold text-primary-600 mb-3">
                    {service.price}
                  </div>
                  
                  <div className="flex items-center text-primary-600 text-sm font-medium group-hover:text-primary-700">
                    <span>Заказать услугу</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Быстрые действия */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quickActions.map((action) => {
            const IconComponent = action.icon;
            return (
              <Link
                key={action.title}
                href={action.href}
                className="group bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-primary-200"
              >
                <div className="flex items-center">
                  <div className={`w-14 h-14 ${action.color} rounded-lg flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-gray-600 mb-3">
                      {action.description}
                    </p>
                    <div className="flex items-center text-primary-600 font-medium group-hover:text-primary-700">
                      <span>Перейти</span>
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        
        {/* Дополнительные внутренние ссылки для Яндекса */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Также доступны: 
              <Link href="/services/post-renovation-cleaning" className="text-primary-600 hover:text-primary-700 mx-2">
                уборка после ремонта
              </Link>
              •
              <Link href="/services/disinfection" className="text-primary-600 hover:text-primary-700 mx-2">
                дезинфекция помещений
              </Link>
              •
              <Link href="/prices" className="text-primary-600 hover:text-primary-700 mx-2">
                актуальные цены
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}