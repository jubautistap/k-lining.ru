import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, ArrowRight, Home, Building2, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Уборка по районам Москвы — быстрый выезд, 24/7 | K-lining',
  description: 'Уборка квартир и офисов по всем районам Москвы ⭐ Профессиональный клининг с выездом ⭐ Быстрая подача, работаем 24/7 ⭐ Цены от 2,500₽ ⭐ Обслуживаем все округа столицы',
  keywords: 'уборка по районам москвы, клининг районы москва, уборка округа москвы, клининговая компания выезд',
  openGraph: {
    title: 'Уборка по районам Москвы - выезд клининговой службы',
    description: 'Профессиональная уборка по всем районам Москвы. Быстрая подача, работаем 24/7, цены от 2,500₽',
    url: 'https://k-lining.ru/districts',
    type: 'website'
  }
};

export default function DistrictsPage() {
  const districts = [
    {
      name: 'Басманный район',
      slug: 'basmannyy',
      description: 'Наш офис на ул. Бакунинская, 69, стр. 1. Быстрый выезд в пределах района.',
      landmarks: ['Красные ворота', 'Чистые пруды', 'Курский вокзал'],
      featured: true
    },
    {
      name: 'Таганский район',
      slug: 'taganskiy',
      description: 'Уборка в историческом центре Москвы. Работаем с жилыми и коммерческими объектами.',
      landmarks: ['Таганская площадь', 'Марксистская', 'Библиотека им. Ленина']
    },
    {
      name: 'Красносельский район', 
      slug: 'krasnoselskiy',
      description: 'Клининг в одном из старейших районов столицы. Бережный подход к историческим зданиям.',
      landmarks: ['Красносельская', 'Сокольники', 'Комсомольская площадь']
    },
    {
      name: 'Мещанский район',
      slug: 'meshchanskiy', 
      description: 'Профессиональная уборка в центральном районе. Обслуживаем жилые дома и офисы.',
      landmarks: ['Проспект Мира', 'Цветной бульвар', 'Трубная площадь']
    },
    {
      name: 'Тверской район',
      slug: 'tverskoy',
      description: 'Элитный клининг в самом престижном районе Москвы. Высокие стандарты качества.',
      landmarks: ['Тверская улица', 'Красная площадь', 'Театральная площадь']
    },
    {
      name: 'Арбат',
      slug: 'arbat',
      description: 'Деликатная уборка в историческом районе. Специальные средства для старинных зданий.',
      landmarks: ['Старый Арбат', 'Новый Арбат', 'Смоленская площадь']
    }
  ];

  const services = [
    {
      icon: Home,
      title: 'Уборка квартир',
      description: 'Поддерживающая и генеральная уборка жилых помещений'
    },
    {
      icon: Building2,
      title: 'Уборка офисов',
      description: 'Клининг коммерческих помещений и бизнес-центров'
    },
    {
      icon: Users,
      title: 'Химчистка мебели',
      description: 'Профессиональная чистка мягкой мебели и ковров'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container-custom section-padding">
        {/* Breadcrumbs */}
        <nav className="flex text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-primary-600">Главная</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Районы обслуживания</span>
        </nav>

        {/* Header */}
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <div className="mb-6">
            <span className="inline-block bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-sm font-medium">
              🗺️ География услуг
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Уборка по районам Москвы
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            <strong>K-lining</strong> предоставляет услуги профессионального клининга 
            во всех районах Москвы. Быстрый выезд, работаем круглосуточно, 
            знаем особенности каждого района.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="bg-primary-50 px-4 py-2 rounded-lg flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-primary-600" />
              <span className="text-primary-800">Все округа Москвы</span>
            </div>
            <div className="bg-green-50 px-4 py-2 rounded-lg text-green-800">
              🚗 Быстрая подача
            </div>
            <div className="bg-blue-50 px-4 py-2 rounded-lg text-blue-800">
              ⏰ Работаем 24/7
            </div>
          </div>
        </div>

        {/* Services Overview */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Наши услуги во всех районах
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg text-center">
                <service.icon className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Districts Grid */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Районы обслуживания
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {districts.map((district, index) => (
              <div key={index} className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow ${district.featured ? 'ring-2 ring-primary-200' : ''}`}>
                {district.featured && (
                  <div className="bg-primary-600 text-white px-4 py-2 text-sm font-medium text-center">
                    ⭐ Наш офис в районе
                  </div>
                )}
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {district.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {district.description}
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-sm text-gray-900 mb-2">Ключевые точки:</h4>
                    <div className="flex flex-wrap gap-2">
                      {district.landmarks.map((landmark, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          {landmark}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <Link 
                    href={`/districts/${district.slug}`}
                    className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Подробнее о районе
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coverage Map */}
        <div className="max-w-4xl mx-auto mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Полное покрытие Москвы
          </h2>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-center text-gray-600 mb-8">
              Мы обслуживаем все административные округа Москвы и ближайшее Подмосковье. 
              География наших услуг постоянно расширяется.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Центральные районы:</h3>
                <ul className="space-y-1 text-sm">
                  <li>• Басманный (наш офис)</li>
                  <li>• Таганский</li>
                  <li>• Тверской</li>
                  <li>• Арбат</li>
                  <li>• Мещанский</li>
                  <li>• Красносельский</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Другие округа:</h3>
                <ul className="space-y-1 text-sm">
                  <li>• Северный АО</li>
                  <li>• Восточный АО</li>
                  <li>• Южный АО</li>
                  <li>• Западный АО</li>
                  <li>• Юго-Западный АО</li>
                  <li>• И другие...</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-primary-50 rounded-lg text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Нужна уборка в вашем районе?
            </h3>
            <p className="text-gray-700 mb-4">
              Звоните или оставляйте заявку - мы выезжаем во все районы Москвы
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+79255551833" className="btn-primary">
                Позвонить сейчас
              </a>
              <Link href="/calculator" className="btn-secondary">
                Рассчитать стоимость
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}