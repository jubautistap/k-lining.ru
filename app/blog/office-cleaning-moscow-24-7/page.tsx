import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Building2, Clock, CheckCircle, Phone, ArrowRight, Users, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Уборка офисов в Москве 24/7 - клининг офисных помещений | KliningPro',
  description: 'Профессиональная уборка офисов в Москве 24/7 ⭐ Клининг офисных помещений любой сложности ⭐ Поддерживающая и генеральная уборка ⭐ Работаем в удобное время ⭐ Договор, гарантия качества',
  keywords: 'уборка офисов москва, клининг офисов москва, уборка офисных помещений, генеральная уборка офиса москва, профессиональная уборка офисов, клининговые услуги для офисов',
  openGraph: {
    title: 'Уборка офисов в Москве 24/7 - клининг офисных помещений',
    description: 'Профессиональная уборка офисов в Москве 24/7. Поддерживающая и генеральная уборка офисных помещений.',
    type: 'article',
    publishedTime: '2025-01-16T00:00:00.000Z',
    authors: ['KliningPro'],
    section: 'Офисная уборка',
    tags: ['уборка офисов', 'клининг', 'москва', '24/7'],
    url: 'https://k-lining.ru/blog/office-cleaning-moscow-24-7',
    images: [
      {
        url: 'https://k-lining.ru/blog/office-cleaning.jpg',
        width: 1200,
        height: 630,
        alt: 'Уборка офисов в Москве 24/7'
      }
    ]
  },
  alternates: {
    canonical: 'https://k-lining.ru/blog/office-cleaning-moscow-24-7',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
};

export default function OfficeCleaningMoscow247Page() {
  const officeCleaningServices = [
    {
      name: 'Поддерживающая уборка',
      description: 'Ежедневная или еженедельная уборка рабочих мест',
      price: 'от 150₽/м²',
      includes: ['Вынос мусора', 'Протирка столов', 'Мытье полов', 'Уборка санузлов']
    },
    {
      name: 'Генеральная уборка',
      description: 'Глубокая уборка всех офисных помещений',
      price: 'от 250₽/м²',
      includes: ['Мытье окон', 'Чистка мебели', 'Дезинфекция', 'Уборка труднодоступных мест']
    },
    {
      name: 'Уборка после ремонта',
      description: 'Специализированная уборка строительной пыли',
      price: 'от 350₽/м²',
      includes: ['Удаление пыли', 'Мытье всех поверхностей', 'Полировка', 'Подготовка к работе']
    }
  ];

  const advantages = [
    'Работаем в любое время суток',
    'Не мешаем рабочему процессу',
    'Профессиональное оборудование',
    'Безопасные моющие средства',
    'Договор и страхование',
    'Контроль качества'
  ];

  return (
    <>
      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Уборка офисов в Москве 24/7 - клининг офисных помещений",
            "description": "Профессиональная уборка офисов в Москве круглосуточно. Поддерживающая и генеральная уборка офисных помещений.",
            "image": "https://k-lining.ru/blog/office-cleaning.jpg",
            "author": {
              "@type": "Organization",
              "name": "KliningPro",
              "url": "https://k-lining.ru"
            },
            "publisher": {
              "@type": "Organization",
              "name": "KliningPro",
              "logo": {
                "@type": "ImageObject",
                "url": "https://k-lining.ru/logo.png"
              }
            },
            "datePublished": "2025-01-16",
            "dateModified": "2025-01-16",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://k-lining.ru/blog/office-cleaning-moscow-24-7"
            },
            "articleSection": "Офисная уборка",
            "keywords": "уборка офисов москва, клининг офисов",
            "wordCount": "1800",
            "timeRequired": "PT9M",
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
            <span className="text-gray-900">Уборка офисов в Москве</span>
          </nav>

          {/* Header */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="mb-6">
              <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                🏢 Офисная уборка
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Уборка офисов в Москве 24/7 — профессиональный клининг офисных помещений
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Нужна <strong>профессиональная уборка офиса в Москве</strong>? KliningPro предоставляет 
              услуги <strong>клининга офисных помещений</strong> круглосуточно. Работаем в удобное 
              для вас время, не нарушая рабочий процесс.
            </p>

            <div className="flex items-center space-x-6 text-sm text-gray-500 mb-8">
              <span>📅 16 января 2025</span>
              <span>⏱ 9 минут чтения</span>
              <span>🏢 Для бизнеса</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              
              <h2>Профессиональная уборка офисов в Москве</h2>
              
              <p>
                Чистота офисного пространства напрямую влияет на продуктивность сотрудников, 
                имидж компании и здоровье коллектива. <strong>Уборка офисов в Москве</strong> 
                от KliningPro - это гарантия поддержания идеального порядка в вашем офисе.
              </p>

              <p>
                Мы понимаем специфику офисной работы, поэтому предлагаем <strong>уборку офисных помещений</strong> 
                в удобное для вас время - рано утром, поздно вечером или в выходные дни. 
                Наша команда работает <strong>24 часа в сутки, 7 дней в неделю</strong>.
              </p>

              <h2>Виды офисного клининга</h2>
              
              <div className="space-y-6 mb-8">
                {officeCleaningServices.map((service, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 shadow-md">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {service.name}
                        </h3>
                        <p className="text-gray-600 mb-3">{service.description}</p>
                        <div className="text-primary-600 font-bold text-lg">{service.price}</div>
                      </div>
                      <Building2 className="w-8 h-8 text-primary-600 flex-shrink-0" />
                    </div>
                    
                    <div className="border-t pt-4">
                      <h4 className="font-semibold mb-2">Что включено:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {service.includes.map((item, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span className="text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <h2>Почему выбирают наш клининг офисов?</h2>
              
              <div className="bg-blue-50 p-6 rounded-lg mb-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Star className="w-5 h-5 text-yellow-500 mr-2" />
                  Преимущества KliningPro для офисов:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {advantages.map((advantage, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span>{advantage}</span>
                    </div>
                  ))}
                </div>
              </div>

              <h2>Особенности уборки офисных помещений</h2>
              
              <h3>Рабочие зоны</h3>
              <p>
                <strong>Клининг офисов</strong> требует особого подхода к рабочим местам. 
                Мы аккуратно убираем вокруг документов и оборудования, не нарушая порядок на столах.
              </p>

              <h3>Переговорные и конференц-залы</h3>
              <p>
                Эти помещения требуют безупречной чистоты для создания положительного впечатления 
                на клиентов и партнеров. Особое внимание уделяем мебели, технике и презентационному экрану.
              </p>

              <h3>Кухни и зоны отдыха</h3>
              <p>
                Места общего пользования нуждаются в ежедневной уборке и дезинфекции. 
                Поддерживаем чистоту холодильников, микроволновых печей, кофе-машин.
              </p>

              <h3>Санузлы</h3>
              <p>
                Офисные туалеты требуют особого внимания к гигиене. Используем профессиональные 
                дезинфицирующие средства и поддерживаем постоянное наличие расходных материалов.
              </p>

              <h2>График работы и расписание уборки</h2>
              
              <p>
                Мы адаптируем график <strong>уборки офиса</strong> под ваш рабочий режим:
              </p>

              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h4 className="font-semibold mb-4">Варианты расписания:</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-primary-600" />
                    <div>
                      <strong>Раннее утро (6:00-9:00)</strong> - до прихода сотрудников
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-primary-600" />
                    <div>
                      <strong>Вечером (19:00-22:00)</strong> - после окончания рабочего дня
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-primary-600" />
                    <div>
                      <strong>Ночью (22:00-6:00)</strong> - для крупных офисов
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-primary-600" />
                    <div>
                      <strong>Выходные дни</strong> - генеральная уборка и специальные работы
                    </div>
                  </div>
                </div>
              </div>

              <h2>Стоимость уборки офисов в Москве</h2>
              
              <p>
                Цена на <strong>клининг офисных помещений</strong> зависит от площади, 
                периодичности уборки и объема работ:
              </p>

              <div className="overflow-x-auto mb-8">
                <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-md">
                  <thead className="bg-primary-100">
                    <tr>
                      <th className="border border-gray-300 px-4 py-3 text-left">Площадь офиса</th>
                      <th className="border border-gray-300 px-4 py-3 text-center">Ежедневно</th>
                      <th className="border border-gray-300 px-4 py-3 text-center">2-3 раза в неделю</th>
                      <th className="border border-gray-300 px-4 py-3 text-center">1 раз в неделю</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">До 100 м²</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">8,000-12,000₽</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">12,000-18,000₽</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">6,000-9,000₽</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3">100-300 м²</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">15,000-25,000₽</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">25,000-35,000₽</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">12,000-18,000₽</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">300-500 м²</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">30,000-45,000₽</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">45,000-60,000₽</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">20,000-30,000₽</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2>Как заказать уборку офиса?</h2>
              
              <div className="bg-green-50 p-6 rounded-lg mb-8">
                <h3 className="text-lg font-semibold mb-4">Простой процесс заказа:</h3>
                <ol className="space-y-2">
                  <li className="flex items-start space-x-3">
                    <span className="bg-primary-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</span>
                    <span>Звоните по телефону +7 (925) 555-18-33 или оставляйте заявку на сайте</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="bg-primary-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</span>
                    <span>Бесплатный выезд менеджера для оценки объема работ</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="bg-primary-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">3</span>
                    <span>Составление индивидуального предложения и договора</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="bg-primary-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">4</span>
                    <span>Начало работы в удобное для вас время</span>
                  </li>
                </ol>
              </div>

              <h2>Часто задаваемые вопросы</h2>
              
              <div className="space-y-4 mb-8">
                <div className="bg-white p-4 rounded-lg border">
                  <h4 className="font-semibold mb-2">Можете ли работать в нерабочее время?</h4>
                  <p className="text-sm text-gray-700">
                    Да, мы работаем круглосуточно и можем проводить уборку в любое удобное время - 
                    рано утром, поздно вечером или в выходные дни.
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <h4 className="font-semibold mb-2">Предоставляете ли расходные материалы?</h4>
                  <p className="text-sm text-gray-700">
                    Да, мы можем обеспечить ваш офис туалетной бумагой, мылом, полотенцами 
                    и другими расходными материалами.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <h4 className="font-semibold mb-2">Есть ли скидки при долгосрочном сотрудничестве?</h4>
                  <p className="text-sm text-gray-700">
                    Да, при заключении долгосрочного договора предоставляем скидки до 15% 
                    в зависимости от объема и периодичности работ.
                  </p>
                </div>
              </div>

              <div className="bg-primary-50 p-6 rounded-lg mt-8">
                <div className="flex items-start space-x-4">
                  <Building2 className="w-8 h-8 text-primary-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Нужна уборка офиса в Москве?</h3>
                    <p className="mb-4">
                      KliningPro - профессиональный клининг офисных помещений круглосуточно. 
                      Работаем по договору, предоставляем гарантию качества.
                    </p>
                    <div className="text-lg font-semibold text-primary-600 mb-4">
                      🏢 Уборка офисов от 150₽/м² 🏢
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link href="/services/office-cleaning" className="btn-primary inline-flex items-center">
                        Подробнее об услуге
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                      <a href="tel:+79255551833" className="btn-secondary inline-flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        Бесплатная консультация
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