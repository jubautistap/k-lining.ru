import React from 'react';
import Link from 'next/link';
import { CheckCircle, Shield, Clock, Users, Star, Zap, Building, Briefcase } from 'lucide-react';

export const metadata = {
  title: 'Клининг для бизнеса: корпоративные услуги в Москве | KliningPro',
  description: 'Профессиональные клининговые услуги для бизнеса в Москве. Уборка офисов, торговых центров, производственных помещений. Корпоративные скидки.',
  keywords: 'клининг для бизнеса, уборка офисов, корпоративные услуги, уборка торговых центров, клининг Москва',
};

export default function CorporatePage() {
  const corporateServices = [
    {
      title: 'Уборка офисов',
      description: 'Комплексная уборка офисных помещений',
      icon: <Building className="w-8 h-8" />,
      services: [
        'Генеральная уборка',
        'После ремонта',
        'Поддерживающая',
        'Ежедневная',
        'На постоянной основе',
        'Разовая',
        'Вечерняя',
        'Утренняя',
        'Влажная',
        'Мытье окон в офисе',
        'Дезинфекция офисов',
        'Химчистка мебели'
      ]
    },
    {
      title: 'Уборка помещений',
      description: 'Специализированная уборка коммерческих объектов',
      icon: <Briefcase className="w-8 h-8" />,
      services: [
        'Торговых центров',
        'Дезинфекция',
        'Школ',
        'Нежилых помещений',
        'Складских помещений',
        'Бани и сауны',
        'Бизнес-центров',
        'Фитнес клубов',
        'Производственных помещений',
        'Магазинов',
        'Ресторанов и кафе'
      ]
    },
    {
      title: 'Специализированные услуги',
      description: 'Уборка специфических объектов',
      icon: <Star className="w-8 h-8" />,
      services: [
        'Салонов красоты',
        'На мероприятиях',
        'Паркинга',
        'Подъездов домов',
        'Медицинских учреждений',
        'Автосалонов',
        'Служебных помещений',
        'Учебных заведений',
        'Гостиниц и отелей',
        'Влажная уборка',
        'Детских садов и ДОУ'
      ]
    },
    {
      title: 'Дополнительные услуги',
      description: 'Специальные клининговые услуги',
      icon: <Zap className="w-8 h-8" />,
      services: [
        'Мойка витрин',
        'Мойка фасадов',
        'Промышленный альпинизм',
        'Мойка вывесок',
        'Механизированная уборка',
        'Покос травы',
        'Уборка территории',
        'Уборка бассейнов',
        'Уборка снега',
        'Химчистка автомобилей'
      ]
    }
  ];

  const advantages = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Гибкий график',
      description: 'Работаем в удобное для вас время'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Страхование',
      description: 'Полная ответственность за имущество'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Опытная команда',
      description: 'Сертифицированные специалисты'
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: 'Корпоративные скидки',
      description: 'Специальные условия для бизнеса'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Современное оборудование',
      description: 'Профессиональная техника'
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Договорные отношения',
      description: 'Официальные документы и отчетность'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Клининг для бизнеса
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8">
              Профессиональные клининговые услуги для корпоративных клиентов в Москве и МО
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contacts" 
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Получить коммерческое предложение
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

      {/* Services Grid */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Корпоративные услуги
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Полный спектр клининговых услуг для бизнеса любого масштаба
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {corporateServices.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="text-primary-600 mr-4">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </div>
                
                <ul className="space-y-2 mb-6">
                  {service.services.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center text-gray-700">
                      <CheckCircle className="w-5 h-5 text-primary-600 mr-3 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <Link 
                  href="/prices"
                  className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  Узнать цены
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
              Преимущества для бизнеса
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Почему корпоративные клиенты выбирают KliningPro
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
              Готовы сотрудничать?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Получите персональное коммерческое предложение для вашего бизнеса
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contacts" 
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Получить КП
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