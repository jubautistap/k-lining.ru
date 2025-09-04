import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Clock, Phone, CheckCircle, ArrowRight, Home, Building2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Уборка в Басманном районе — офис рядом, выезд 30 минут | K-lining',
  description: 'Клининг в Басманном районе Москвы: наш офис на Бакунинской 69. Выезд за 30 минут, работаем 24/7, все виды уборки. Заказать ⭐',
  keywords: 'уборка басманный район, клининг басманный, уборка квартир басманный район москва, бакунинская уборка, уборка офисов басманный',
  openGraph: {
    title: 'Уборка квартир и офисов в Басманном районе Москвы',
    description: 'Профессиональная уборка в Басманном районе. Офис на Бакунинской 69 стр 1. Работаем 24/7, цены от 2,500₽',
    url: 'https://k-lining.ru/districts/basmannyy',
    type: 'website',
    images: [
      {
        url: 'https://k-lining.ru/districts/basmannyy-cleaning.jpg',
        width: 1200,
        height: 630,
        alt: 'Уборка в Басманном районе'
      }
    ]
  },
  alternates: {
    canonical: 'https://k-lining.ru/districts/basmannyy',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
};

export default function BasmannyDistrictPage() {
  const services = [
    {
      icon: Home,
      name: 'Уборка квартир',
      price: 'от 6,000₽',
      description: 'Поддерживающая и генеральная уборка квартир в Басманном районе'
    },
    {
      icon: Building2,
      name: 'Уборка офисов',
      price: '80–110 ₽/м²',
      description: 'Профессиональный клининг офисных помещений'
    },
    {
      icon: CheckCircle,
      name: 'Химчистка мебели',
      price: 'от 2,000₽',
      description: 'Химчистка диванов, кресел и ковров на дому'
    }
  ];

  const landmarks = [
    'Красные ворота',
    'Чистые пруды',
    'Курский вокзал',
    'Покровский бульвар',
    'Бауманская улица',
    'Старая Басманная',
    'Новая Басманная'
  ];

  return (
    <>
      {/* LocalBusiness Schema for Basmannyy District */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "K-lining - Уборка в Басманном районе",
            "description": "Профессиональная уборка квартир и офисов в Басманном районе Москвы",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "ул. Бакунинская, 69, стр. 1",
              "addressLocality": "Москва",
              "addressRegion": "Басманный район",
              "postalCode": "105082",
              "addressCountry": "RU"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "55.7649472",
              "longitude": "37.6715833"
            },
            "telephone": "+7-925-555-18-33",
            "openingHours": "Mo-Su 00:00-23:59",
            "serviceArea": {
              "@type": "Place",
              "name": "Басманный район, Москва"
            },
            "areaServed": "Басманный район",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Услуги клининга",
              "itemListElement": [
                {
                  "@type": "OfferCatalog",
                  "name": "Уборка квартир",
                  "itemListElement": {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Уборка квартир в Басманном районе"
                    }
                  }
                }
              ]
            }
          })
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="container-custom section-padding">
          {/* Breadcrumbs */}
          <nav className="flex text-sm text-gray-600 mb-8">
            <Link href="/" className="hover:text-primary-600">Главная</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Басманный район</span>
          </nav>

          {/* Header */}
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <div className="mb-6">
              <span className="inline-block bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-sm font-medium">
                📍 Басманный район
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Уборка квартир и офисов в Басманном районе Москвы
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              <strong>Профессиональный клининг в Басманном районе</strong> от компании K-lining.
              Наш офис находится прямо в районе по адресу <strong>ул. Бакунинская, 69, стр. 1</strong>, 
              что позволяет нам быстро выезжать к клиентам.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a href="tel:+79255551833" className="btn-primary inline-flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                +7 (925) 555-18-33
              </a>
              <Link href="/calculator" className="btn-secondary inline-flex items-center">
                Рассчитать стоимость
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="prose prose-lg max-w-none">
                  <h2>Клининговые услуги в Басманном районе</h2>
                  
                  <p>
                    Басманный район - один из центральных районов Москвы, где сосредоточено множество 
                    жилых домов, офисных центров и коммерческих объектов. <strong>K-lining</strong> 
                    предоставляет полный спектр клининговых услуг для жителей и организаций района.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 not-prose">
                    {services.map((service, index) => (
                      <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                        <service.icon className="w-12 h-12 text-primary-600 mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {service.name}
                        </h3>
                        <div className="text-primary-600 font-bold text-lg mb-2">
                          {service.price}
                        </div>
                        <p className="text-gray-600 text-sm">
                          {service.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  <h2>Почему выбирают нас в Басманном районе?</h2>
                  
                  <div className="bg-blue-50 p-6 rounded-lg mb-8 not-prose">
                    <h3 className="text-lg font-semibold mb-4">Наши преимущества:</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                        <span><strong>Офис в районе</strong> - быстрый выезд к клиенту (ул. Бакунинская, 69, стр. 1)</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                        <span><strong>Работаем 24/7</strong> - принимаем заявки круглосуточно</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                        <span><strong>Знаем район</strong> - работаем в Басманном уже более 2 лет</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                        <span><strong>Честные цены</strong> - без скрытых доплат и накруток</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                        <span><strong>Гарантия качества</strong> - переделаем бесплатно при недовольстве</span>
                      </li>
                    </ul>
                  </div>

                  <h2>Особенности уборки в Басманном районе</h2>
                  
                  <p>
                    Басманный район отличается разнообразием архитектуры - от исторических зданий 
                    до современных жилых комплексов. Мы учитываем особенности каждого типа помещения:
                  </p>

                  <h3>Старый жилой фонд</h3>
                  <p>
                    Многие дома в районе построены в начале XX века и требуют деликатного подхода. 
                    Используем щадящие средства для паркета, лепнины и других исторических элементов.
                  </p>

                  <h3>Современные ЖК</h3>
                  <p>
                    Новые жилые комплексы оснащены современными материалами и технологиями. 
                    Применяем соответствующие методы ухода за керамогранитом, стеклянными поверхностями.
                  </p>

                  <h3>Офисные центры</h3>
                  <p>
                    В районе много бизнес-центров. Предоставляем услуги клининга в удобное время, 
                    не нарушая рабочий процесс компаний.
                  </p>

                  <h2>Районы обслуживания</h2>
                  
                  <p>
                    Мы выезжаем во все части Басманного района, включая знаковые места:
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8 not-prose">
                    {landmarks.map((landmark, index) => (
                      <div key={index} className="bg-primary-50 text-primary-800 px-3 py-2 rounded-lg text-sm text-center">
                        {landmark}
                      </div>
                    ))}
                  </div>

                  <h2>Цены на уборку в Басманном районе</h2>
                  
                  <p>
                    Стоимость наших услуг в Басманном районе соответствует средним рыночным ценам. 
                    Благодаря близкому расположению офиса, мы не берем доплату за выезд.
                  </p>

                  <div className="bg-green-50 p-6 rounded-lg mb-8 not-prose">
                    <h3 className="text-lg font-semibold mb-4">Актуальные цены:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">Уборка квартир:</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• 1-комнатная: от 2,500₽</li>
                          <li>• 2-комнатная: от 3,500₽</li>
                          <li>• 3-комнатная: от 4,500₽</li>
                          <li>• Генеральная: +40%</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Дополнительные услуги:</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• Химчистка дивана: от 2,000₽</li>
                          <li>• Мытье окон: от 200₽/м²</li>
                          <li>• Уборка балкона: от 800₽</li>
                          <li>• Чистка ковра: от 300₽/м²</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h2>Как заказать уборку в Басманном районе?</h2>
                  
                  <p>
                    Заказать уборку очень просто - звоните по телефону или оставляйте заявку на сайте. 
                    Менеджер рассчитает стоимость и согласует удобное время.
                  </p>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 sticky top-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Контакты в Басманном районе
                  </h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-semibold">Наш офис</div>
                        <div className="text-sm text-gray-600">
                          ул. Бакунинская, 69, стр. 1<br />
                          Басманный район, Москва
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Phone className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-semibold">Телефон</div>
                        <div className="text-sm text-gray-600">
                          +7 (925) 555-18-33
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Clock className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-semibold">Время работы</div>
                        <div className="text-sm text-gray-600">
                          Круглосуточно, без выходных
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-3">Быстрый заказ</h4>
                    <div className="space-y-3">
                      <a 
                        href="tel:+79255551833" 
                        className="block w-full bg-primary-600 text-white px-4 py-3 rounded-lg hover:bg-primary-700 transition-colors text-center font-medium"
                      >
                        Позвонить сейчас
                      </a>
                      <Link 
                        href="/calculator" 
                        className="block w-full bg-gray-100 text-gray-900 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors text-center font-medium"
                      >
                        Рассчитать онлайн
                      </Link>
                    </div>
                  </div>

                  <div className="border-t pt-4 mt-4">
                    <div className="text-sm text-gray-600 text-center">
                      ⚡ Выезд в течение 30 минут ⚡
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}