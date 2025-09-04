import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface RelatedService {
  title: string;
  href: string;
  description: string;
  price: string;
  isPopular?: boolean;
}

interface RelatedServicesProps {
  currentService?: string;
  services?: RelatedService[];
}

// Матрица связанных услуг для внутренней перелинковки
export const RELATED_SERVICES_MATRIX: Record<string, RelatedService[]> = {
  'apartment-cleaning': [
    {
      title: 'Генеральная уборка',
      href: '/services/apartment-cleaning',
      description: 'Комплексная уборка всех помещений с выносом мусора',
      price: 'от 5000₽',
      isPopular: true
    },
    {
      title: 'Уборка после ремонта',
      href: '/services/post-renovation-cleaning',
      description: 'Удаление строительной пыли и финишная очистка',
      price: 'от 8000₽'
    },
    {
      title: 'Химчистка мебели',
      href: '/services/furniture-dry-cleaning',
      description: 'Чистка диванов, кресел и матрасов на дому',
      price: 'от 1000₽'
    },
    {
      title: 'Мытье окон',
      href: '/services/window-cleaning',
      description: 'Профессиональное мытье окон без разводов',
      price: 'от 600₽'
    }
  ],

  'office-cleaning': [
    {
      title: 'Уборка квартир',
      href: '/services/apartment-cleaning',
      description: 'Поддерживающая и генеральная уборка жилых помещений',
      price: 'от 3500₽'
    },
    {
      title: 'Дезинфекция помещений',
      href: '/services/disinfection',
      description: 'Профессиональная дезинфекция офисов и медучреждений',
      price: 'от 3500₽',
      isPopular: true
    },
    {
      title: 'Мытье окон в офисе',
      href: '/services/window-cleaning',
      description: 'Очистка окон и витражей в бизнес-центрах',
      price: 'от 600₽'
    },
    {
      title: 'Химчистка офисной мебели',
      href: '/services/furniture-dry-cleaning',
      description: 'Чистка кресел, диванов в переговорных',
      price: 'от 1000₽'
    }
  ],

  'window-cleaning': [
    {
      title: 'Уборка квартир',
      href: '/services/apartment-cleaning',
      description: 'Комплексная уборка с мытьем всех окон',
      price: 'от 3500₽',
      isPopular: true
    },
    {
      title: 'Уборка коттеджей',
      href: '/services/house-cleaning',
      description: 'Уборка загородных домов с панорамными окнами',
      price: 'от 5000₽'
    },
    {
      title: 'Уборка офисов',
      href: '/services/office-cleaning',
      description: 'Клининг офисов с мытьем окон в бизнес-центрах',
      price: 'от 5000₽'
    },
    {
      title: 'Уборка после ремонта',
      href: '/services/post-renovation-cleaning',
      description: 'Финишная очистка окон от строительной пыли',
      price: 'от 8000₽'
    }
  ],

  'furniture-dry-cleaning': [
    {
      title: 'Уборка квартир',
      href: '/services/apartment-cleaning',
      description: 'Генеральная уборка с химчисткой всей мебели',
      price: 'от 3500₽',
      isPopular: true
    },
    {
      title: 'Уборка после ремонта',
      href: '/services/post-renovation-cleaning',
      description: 'Очистка мебели от строительной пыли и мусора',
      price: 'от 8000₽'
    },
    {
      title: 'Химчистка ковров',
      href: '/services/dry-cleaning',
      description: 'Профессиональная чистка ковров и ковровых покрытий',
      price: 'от 500₽'
    },
    {
      title: 'Дезинфекция мебели',
      href: '/services/disinfection',
      description: 'Антибактериальная обработка мягкой мебели',
      price: 'от 3500₽'
    }
  ],

  'post-renovation-cleaning': [
    {
      title: 'Генеральная уборка',
      href: '/services/apartment-cleaning',
      description: 'Поддержание чистоты после строительной уборки',
      price: 'от 5000₽',
      isPopular: true
    },
    {
      title: 'Мытье окон после ремонта',
      href: '/services/window-cleaning',
      description: 'Удаление строительной пыли и пятен с окон',
      price: 'от 600₽'
    },
    {
      title: 'Химчистка мебели',
      href: '/services/furniture-dry-cleaning',
      description: 'Очистка мебели от строительной пыли',
      price: 'от 1000₽'
    },
    {
      title: 'Дезинфекция помещений',
      href: '/services/disinfection',
      description: 'Антибактериальная обработка после ремонта',
      price: 'от 3500₽'
    }
  ],

  'house-cleaning': [
    {
      title: 'Уборка квартир',
      href: '/services/apartment-cleaning',
      description: 'Опыт уборки городских квартир любой сложности',
      price: 'от 3500₽'
    },
    {
      title: 'Мытье больших окон',
      href: '/services/window-cleaning',
      description: 'Панорамные окна и витражи в коттеджах',
      price: 'от 600₽',
      isPopular: true
    },
    {
      title: 'Химчистка мебели',
      href: '/services/furniture-dry-cleaning',
      description: 'Чистка дорогой мебели в загородных домах',
      price: 'от 1000₽'
    },
    {
      title: 'Уборка после ремонта',
      href: '/services/post-renovation-cleaning',
      description: 'Послестроительная уборка коттеджей',
      price: 'от 8000₽'
    }
  ]
};

// Компонент для отображения связанных услуг
export default function RelatedServices({ 
  currentService = 'apartment-cleaning',
  services
}: RelatedServicesProps) {
  const relatedServices = services || RELATED_SERVICES_MATRIX[currentService] || RELATED_SERVICES_MATRIX['apartment-cleaning'];

  return (
    <section className="bg-gray-50 py-16">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Связанные услуги
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Дополните основную услугу или выберите комплексное решение для максимального результата
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {relatedServices.map((service, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg border-2 p-6 hover:shadow-lg transition-all duration-300 relative ${
                service.isPopular 
                  ? 'border-primary-200 shadow-md' 
                  : 'border-gray-100 hover:border-primary-100'
              }`}
            >
              {service.isPopular && (
                <div className="absolute -top-3 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Популярно
                </div>
              )}
              
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  {service.description}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-bold text-primary-600">
                    {service.price}
                  </span>
                </div>
              </div>

              <Link
                href={service.href}
                className="inline-flex items-center justify-center w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                Подробнее
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            Посмотреть все услуги
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// Функция для получения связанных услуг
export function getRelatedServices(serviceId: string): RelatedService[] {
  return RELATED_SERVICES_MATRIX[serviceId] || RELATED_SERVICES_MATRIX['apartment-cleaning'];
}

// Компонент для компактного отображения связанных услуг (для сайдбара)
export function RelatedServicesCompact({ currentService = 'apartment-cleaning' }: { currentService?: string }) {
  const relatedServices = RELATED_SERVICES_MATRIX[currentService]?.slice(0, 3) || [];

  if (!relatedServices.length) return null;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Дополнительные услуги
      </h3>
      <div className="space-y-4">
        {relatedServices.map((service, index) => (
          <Link
            key={index}
            href={service.href}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-primary-50 hover:border-primary-200 transition-colors border border-transparent"
          >
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 truncate">
                {service.title}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {service.price}
              </div>
            </div>
            <ArrowRight className="ml-2 w-4 h-4 text-gray-400 flex-shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
}