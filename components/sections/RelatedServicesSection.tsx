'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

/**
 * 🔗 Компонент похожих услуг для внутренней перелинковки
 * Повышает шансы формирования быстрых ссылок в Яндексе
 */

interface RelatedService {
  title: string;
  description: string;
  href: string;
  price: string;
}

interface RelatedServicesSectionProps {
  currentService?: string;
  title?: string;
}

export default function RelatedServicesSection({ 
  currentService,
  title = "Похожие услуги"
}: RelatedServicesSectionProps) {
  
  const allServices: RelatedService[] = [
    {
      title: 'Уборка квартир',
      description: 'Генеральная и поддерживающая уборка жилых помещений',
      href: '/services/apartment-cleaning',
      price: 'от 6,000₽'
    },
    {
      title: 'Уборка офисов',
      description: 'Регулярная уборка коммерческих помещений',
      href: '/services/office-cleaning',
      price: 'от 5,000₽'
    },
    {
      title: 'Химчистка мебели',
      description: 'Профессиональная химчистка диванов и кресел',
      href: '/services/furniture-dry-cleaning',
      price: 'от 2,500₽'
    },
    {
      title: 'Мытье окон',
      description: 'Качественное мытье окон в квартирах и офисах',
      href: '/services/window-cleaning',
      price: 'от 600 ₽ за створку'
    },
    {
      title: 'Уборка после ремонта',
      description: 'Специализированная уборка после строительных работ',
      href: '/services/post-renovation-cleaning',
      price: 'от 7,000₽'
    },
    {
      title: 'Дезинфекция помещений',
      description: 'Профессиональная дезинфекция и санитизация',
      href: '/services/disinfection',
      price: 'от 1,500₽'
    }
  ];

  // Исключаем текущую услугу и показываем 4 похожие
  const relatedServices = allServices
    .filter(service => service.href !== currentService)
    .slice(0, 4);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Другие популярные клининговые услуги от K-lining в Москве
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedServices.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-primary-200"
            >
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="text-lg font-bold text-primary-600 mb-4">
                  {service.price}
                </div>
                
                <div className="flex items-center justify-center text-primary-600 text-sm font-medium group-hover:text-primary-700">
                  <span>Подробнее</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Дополнительные быстрые ссылки */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600 mb-4">
            Нужна консультация? 
            <Link href="/contacts" className="text-primary-600 hover:text-primary-700 font-medium mx-2">
              Свяжитесь с нами
            </Link>
            или
            <Link href="/calculator" className="text-primary-600 hover:text-primary-700 font-medium mx-2">
              рассчитайте стоимость
            </Link>
            онлайн
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <Link href="/prices" className="text-primary-600 hover:text-primary-700">
              Актуальные цены
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/blog" className="text-primary-600 hover:text-primary-700">
              Полезные советы
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/about" className="text-primary-600 hover:text-primary-700">
              О компании K-lining
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}