import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Calculator, Clock, CheckCircle, Phone, ArrowRight, Home } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Уборка квартир в Москве недорого — цены 2025, рейтинг компаний | K-lining',
  description: 'Уборка квартир в Москве недорого ⭐ Актуальные цены 2025 года ⭐ Услуги от 2,500₽; минимальный заказ — 6,000₽ ⭐ Сравнение тарифов ⭐ K-lining — честные цены, работаем 24/7',
  keywords: 'уборка квартир москва недорого, уборка квартир москва цена, клининг москва цены, уборка квартиры недорого, генеральная уборка цена москва, стоимость уборки квартиры',
  openGraph: {
    title: 'Уборка квартир в Москве недорого - цены 2025, рейтинг компаний',
    description: 'Уборка квартир в Москве недорого. Актуальные цены 2025 года от 2,500₽. Сравнение тарифов клининговых компаний.',
    type: 'article',
    publishedTime: '2025-01-16T00:00:00.000Z',
    authors: ['K-lining'],
    section: 'Цены и тарифы',
    tags: ['уборка квартир', 'цены', 'москва', 'недорого'],
    url: 'https://k-lining.ru/blog/apartment-cleaning-price-moscow',
    images: [
      {
        url: 'https://k-lining.ru/blog/office-cleaning.jpg',
        width: 1200,
        height: 630,
        alt: 'Уборка квартир в Москве - цены'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Уборка квартир в Москве недорого - цены 2025',
    description: 'Актуальные цены на уборку квартир в Москве. От 2,500₽ за 1-комнатную.',
    images: ['https://k-lining.ru/blog/office-cleaning.jpg']
  },
  alternates: {
    canonical: 'https://k-lining.ru/blog/apartment-cleaning-price-moscow',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
};

export default function ApartmentCleaningPriceMoscowPage() {
  const priceTable = [
    {
      type: '1-комнатная квартира',
      standard: '2,500-3,500₽',
      general: '3,500-4,500₽',
      time: '2-3 часа'
    },
    {
      type: '2-комнатная квартира', 
      standard: '3,500-4,500₽',
      general: '4,500-6,000₽',
      time: '3-4 часа'
    },
    {
      type: '3-комнатная квартира',
      standard: '4,500-6,000₽',
      general: '6,000-8,000₽',
      time: '4-5 часов'
    },
    {
      type: '4-комнатная квартира',
      standard: '6,000-8,000₽',
      general: '8,000-11,000₽',
      time: '5-6 часов'
    }
  ];

  const additionalServices = [
    { service: 'Химчистка дивана', price: '2,000-4,000₽' },
    { service: 'Химчистка кресла', price: '1,500-2,500₽' },
    { service: 'Мытье окон', price: '150-300₽/м²' },
    { service: 'Уборка балкона', price: '800-1,500₽' },
    { service: 'Чистка ковра', price: '200-400₽/м²' },
    { service: 'Мытье холодильника', price: '800-1,200₽' },
    { service: 'Уборка после ремонта', price: 'от 35₽/м²' },
    { service: 'Генеральная уборка кухни', price: '1,500-2,500₽' }
  ];

  return (
    <>
      {/* Article/BlogPosting Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "Уборка квартир в Москве недорого - цены 2025, рейтинг компаний",
            "description": "Полный гид по ценам на уборку квартир в Москве. Актуальные тарифы, как сэкономить, сравнение компаний.",
            "image": "https://k-lining.ru/blog/office-cleaning.jpg",
            "author": {
              "@type": "Organization",
              "name": "K-lining",
              "url": "https://k-lining.ru"
            },
            "publisher": {
              "@type": "Organization",
              "name": "K-lining",
              "logo": {
                "@type": "ImageObject",
                "url": "https://k-lining.ru/logo.png"
              }
            },
            "datePublished": "2025-01-16",
            "dateModified": "2025-01-16",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://k-lining.ru/blog/apartment-cleaning-price-moscow"
            },
            "articleSection": "Цены",
            "keywords": "уборка квартир москва недорого, цены на уборку квартиры",
            "wordCount": "2200",
            "timeRequired": "PT11M",
            "inLanguage": "ru-RU"
          })
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="container-custom section-padding">
          {/* Breadcrumbs */}
          <nav className="flex text-sm text-gray-600 mb-8">
            <Link href="/" className="hover:text-primary-600">Главная</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-primary-600">Блог</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Цены на уборку квартир</span>
          </nav>

          {/* Header */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="mb-6">
              <span className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                💰 Цены и тарифы
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Уборка квартир в Москве недорого — цены 2025
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Ищете <strong>недорогую уборку квартиры в Москве</strong>? Разбираем актуальные цены, 
              способы экономии и рассказываем, как не попасться на уловки недобросовестных компаний.
            </p>

            <div className="flex items-center space-x-6 text-sm text-gray-500 mb-8">
              <span>📅 16 января 2025</span>
              <span>⏱ 11 минут чтения</span>
              <span>💰 Обновлено сегодня</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              
              <h2>Сколько стоит уборка квартиры в Москве в 2025 году?</h2>
              
              <p>
                Стоимость <strong>уборки квартир в Москве</strong> зависит от множества факторов: 
                размера помещения, типа уборки, загрязненности, района города и репутации компании. 
                По нашим исследованиям, средние цены выросли на 15-20% по сравнению с 2024 годом.
              </p>

              <div className="bg-blue-50 p-6 rounded-lg mb-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Calculator className="w-5 h-5 mr-2" />
                  Таблица цен на уборку квартир в Москве
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-primary-100">
                        <th className="border border-gray-300 px-4 py-2 text-left">Тип квартиры</th>
                        <th className="border border-gray-300 px-4 py-2">Обычная уборка</th>
                        <th className="border border-gray-300 px-4 py-2">Генеральная уборка</th>
                        <th className="border border-gray-300 px-4 py-2">Время</th>
                      </tr>
                    </thead>
                    <tbody>
                      {priceTable.map((row, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="border border-gray-300 px-4 py-2 font-medium">{row.type}</td>
                          <td className="border border-gray-300 px-4 py-2 text-center text-green-600 font-semibold">
                            {row.standard}
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-center text-blue-600 font-semibold">
                            {row.general}
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-center">{row.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <h2>Что влияет на стоимость уборки квартиры?</h2>
              
              <h3>1. Площадь и планировка</h3>
              <p>
                Основной фактор ценообразования - количество комнат и общая площадь. 
                <strong>Уборка однокомнатной квартиры</strong> обойдется от 2,500₽, 
                трехкомнатной - от 4,500₽.
              </p>

              <h3>2. Тип уборки</h3>
              <ul>
                <li><strong>Поддерживающая уборка</strong> - базовая очистка, выполняется регулярно</li>
                <li><strong>Генеральная уборка</strong> - глубокая очистка всех поверхностей</li>
                <li><strong>Уборка после ремонта</strong> - удаление строительной пыли и мусора</li>
                <li><strong>Уборка после праздников</strong> - восстановление порядка после мероприятий</li>
              </ul>

              <h3>3. Степень загрязнения</h3>
              <p>
                Если квартира не убиралась долгое время или требует особого внимания, 
                стоимость может увеличиться на 30-50%.
              </p>

              <h3>4. Дополнительные услуги</h3>
              
              <div className="bg-yellow-50 p-6 rounded-lg mb-8">
                <h4 className="font-semibold mb-4">Цены на дополнительные услуги:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {additionalServices.map((service, index) => (
                    <div key={index} className="flex justify-between items-center bg-white p-3 rounded border">
                      <span className="text-sm">{service.service}</span>
                      <span className="font-semibold text-primary-600">{service.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              <h2>Как найти недорогую уборку квартиры в Москве?</h2>
              
              <h3>Способы экономии</h3>
              
              <div className="bg-green-50 p-6 rounded-lg mb-8">
                <h4 className="font-semibold mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  Проверенные способы сэкономить:
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <span><strong>Регулярные заказы</strong> - скидка до 20% при постоянном сотрудничестве</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <span><strong>Будние дни</strong> - цены ниже на 10-15% чем в выходные</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <span><strong>Предварительная подготовка</strong> - уберите личные вещи и мусор</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <span><strong>Пакетные предложения</strong> - комбинируйте несколько услуг</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <span><strong>Акции и скидки</strong> - следите за сезонными предложениями</span>
                  </li>
                </ul>
              </div>

              <h3>На чем не стоит экономить</h3>
              <p>
                Выбирая <strong>недорогую уборку квартиры</strong>, помните, что качество услуг 
                напрямую зависит от цены. Остерегайтесь предложений значительно ниже рыночных:
              </p>
              <ul>
                <li>Слишком низкие цены часто означают плохое качество работы</li>
                <li>Непрофессиональные средства могут повредить поверхности</li>
                <li>Отсутствие страховки грозит проблемами при порче имущества</li>
                <li>Скрытые доплаты в итоге делают услугу дороже</li>
              </ul>

              <h2>Районы Москвы: влияние на цену</h2>
              
              <p>
                Стоимость <strong>уборки квартир в Москве</strong> может отличаться в зависимости от района:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-800 mb-2">Премиум районы (+20-30%)</h4>
                  <p className="text-sm text-red-700">
                    Центр, Остоженка, Патриаршие пруды, Покровка
                  </p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">Средние цены</h4>
                  <p className="text-sm text-yellow-700">
                    Басманный, Таганский, Замоскворечье, Сокольники  
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Эконом районы (-10-15%)</h4>
                  <p className="text-sm text-green-700">
                    Отдаленные районы, спальные микрорайоны
                  </p>
                </div>
              </div>

              <h2>Сравнение клининговых компаний по ценам</h2>
              
              <p>
                Мы проанализировали цены ведущих <strong>клининговых компаний Москвы</strong> 
                на уборку 2-комнатной квартиры:
              </p>

              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-8">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left">Компания</th>
                      <th className="px-4 py-3 text-center">Обычная уборка</th>
                      <th className="px-4 py-3 text-center">Генеральная</th>
                      <th className="px-4 py-3 text-center">Особенности</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t bg-primary-50">
                      <td className="px-4 py-3 font-semibold">K-lining</td>
                      <td className="px-4 py-3 text-center text-green-600 font-bold">3,500₽</td>
                      <td className="px-4 py-3 text-center text-blue-600 font-bold">4,500₽</td>
                      <td className="px-4 py-3 text-center text-sm">24/7, гарантия</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-3">Компания А</td>
                      <td className="px-4 py-3 text-center">4,000₽</td>
                      <td className="px-4 py-3 text-center">5,200₽</td>
                      <td className="px-4 py-3 text-center text-sm">9-18</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-3">Компания Б</td>
                      <td className="px-4 py-3 text-center">3,800₽</td>
                      <td className="px-4 py-3 text-center">5,000₽</td>
                      <td className="px-4 py-3 text-center text-sm">Без страховки</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2>Часто задаваемые вопросы о ценах</h2>
              
              <div className="space-y-4 mb-8">
                <div className="bg-white p-4 rounded-lg border">
                  <h4 className="font-semibold mb-2">Можно ли договориться о скидке?</h4>
                  <p className="text-sm text-gray-700">
                    Да, при постоянном сотрудничестве большинство компаний предоставляют скидки 
                    от 10 до 20%. Также часто действуют акции для новых клиентов.
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <h4 className="font-semibold mb-2">Что включено в базовую стоимость?</h4>
                  <p className="text-sm text-gray-700">
                    Уборка пыли, мытье полов, чистка сантехники, зеркал, вынос мусора. 
                    Мытье окон, химчистка и глубокая чистка кухни обычно оплачиваются отдельно.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <h4 className="font-semibold mb-2">Как оплачивать - до или после уборки?</h4>
                  <p className="text-sm text-gray-700">
                    Надежные компании принимают оплату после выполнения работ. 
                    Остерегайтесь требований 100% предоплаты.
                  </p>
                </div>
              </div>

              <h2>Заключение</h2>
              
              <p>
                <strong>Уборка квартиры в Москве недорого</strong> - это реально, если знать, 
                где искать и как правильно выбирать исполнителя. Главное - найти баланс 
                между ценой и качеством услуг.
              </p>

              <div className="bg-primary-50 p-6 rounded-lg mt-8">
                <div className="flex items-start space-x-4">
                  <Home className="w-8 h-8 text-primary-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Нужна недорогая уборка квартиры?</h3>
                    <p className="mb-4">
                      K-lining предлагает честные цены без скрытых доплат. 
                      Работаем круглосуточно, даём гарантию качества.
                    </p>
                    <div className="text-lg font-semibold text-primary-600 mb-4">
                      ⚡ Уборка 1-комнатной от 2,500₽ ⚡
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link href="/calculator" className="btn-primary inline-flex items-center">
                        <Calculator className="w-4 h-4 mr-2" />
                        Рассчитать точную стоимость
                      </Link>
                      <a href="tel:+79255551833" className="btn-secondary inline-flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        Получить скидку по телефону
                      </a>
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