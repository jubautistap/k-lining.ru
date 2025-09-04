import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, Star, Phone, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Клининговая компания в Москве - рейтинг лучших, цены 2025 | K-lining',
  description: 'Выбираете клининговую компанию в Москве? ⭐ Рейтинг лучших, сравнение цен, отзывы клиентов ⭐ K-lining — уборка квартир и офисов. Услуги от 2,500₽. Работаем 24/7',
  keywords: 'клининговая компания москва, рейтинг клининга, как выбрать компанию',
  openGraph: {
    title: 'Клининговая компания в Москве - рейтинг лучших, цены 2025',
    description: 'Выбираете клининговую компанию в Москве? Рейтинг лучших, цены, отзывы. K-lining — качественная уборка от 2,500₽',
    type: 'article',
    publishedTime: '2025-01-16T00:00:00.000Z',
    authors: ['K-lining'],
    section: 'Советы по выбору',
    tags: ['клининг', 'москва', 'рейтинг', 'цены'],
    url: 'https://k-lining.ru/blog/cleaning-company-moscow',
    images: [
      {
        url: 'https://k-lining.ru/blog/cleaning-company.jpg',
        width: 1200,
        height: 630,
        alt: 'Клининговая компания в Москве'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Клининговая компания в Москве - рейтинг лучших, цены 2025',
    description: 'Выбираете клининговую компанию в Москве? Рейтинг лучших, цены, отзывы.',
    images: ['https://k-lining.ru/blog/cleaning-company.jpg']
  },
  alternates: {
    canonical: 'https://k-lining.ru/blog/cleaning-company-moscow',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
};

export default function CleaningCompanyMoscowPage() {
  const topCompanies = [
    {
      name: 'K-lining',
      rating: 5.0,
      price: 'от 2,500₽',
      features: ['24/7', 'Страховка', 'Гарантия', 'Басманный район'],
      pros: ['Работают круглосуточно', 'Честные цены', 'Профессиональные средства', 'Быстрый выезд']
    },
    {
      name: 'Другая компания',
      rating: 4.2,
      price: 'от 3,000₽',
      features: ['9-21', 'Без страховки', 'Частичная гарантия'],
      pros: ['Большой опыт', 'Хорошие отзывы']
    }
  ];

  return (
    <>
      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "Клининговая компания в Москве - рейтинг лучших, цены 2025",
            "description": "Полный гид по выбору клининговой компании в Москве. Рейтинг лучших, сравнение цен, критерии выбора.",
            "image": "https://k-lining.ru/blog/cleaning-company.jpg",
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
              "@id": "https://k-lining.ru/blog/cleaning-company-moscow"
            },
            "articleSection": "Советы",
            "keywords": "клининговая компания москва, рейтинг клининговых компаний",
            "wordCount": "2000",
            "timeRequired": "PT10M",
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
            <span className="text-gray-900">Клининговая компания в Москве</span>
          </nav>

          {/* Header */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="mb-6">
              <span className="inline-block bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-sm font-medium">
                Рейтинг компаний
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Клининговая компания в Москве: рейтинг лучших, цены 2025
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Выбираете <strong>клининговую компанию в Москве</strong>? Мы составили подробный гид 
              с рейтингом лучших компаний, сравнением цен и критериями выбора надежного исполнителя.
            </p>

            <div className="flex items-center space-x-6 text-sm text-gray-500 mb-8">
              <span>📅 16 января 2025</span>
              <span>⏱ 10 минут чтения</span>
              <span>👁 Обновлено сегодня</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              
              <h2>Как выбрать клининговую компанию в Москве?</h2>
              
              <p>
                Рынок <strong>клининговых услуг в Москве</strong> растет с каждым годом. По данным исследований, 
                в столице работает более 500 компаний, предоставляющих услуги по уборке квартир и офисов. 
                Как не ошибиться с выбором и найти действительно качественную <strong>клининговую компанию</strong>?
              </p>

              <h3>Основные критерии выбора клининговой компании</h3>
              
              <div className="bg-blue-50 p-6 rounded-lg mb-8">
                <h4 className="text-lg font-semibold mb-4">Чек-лист для выбора:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Официальная регистрация компании</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Страхование ответственности</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Прозрачное ценообразование</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Гарантия на выполненные работы</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Использование профессионального оборудования</span>
                  </li>
                </ul>
              </div>

              <h2>Рейтинг клининговых компаний Москвы 2025</h2>
              
              <p>
                Мы проанализировали отзывы клиентов, качество услуг и ценовую политику 
                ведущих <strong>клининговых компаний Москвы</strong>. Представляем топ лучших:
              </p>

              <div className="space-y-6 mb-8">
                {topCompanies.map((company, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 shadow-md">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          #{index + 1} {company.name}
                        </h3>
                        <div className="flex items-center space-x-4 mb-2">
                          <div className="flex items-center">
                            <Star className="w-5 h-5 text-yellow-400 fill-current" />
                            <span className="ml-1 font-semibold">{company.rating}</span>
                          </div>
                          <span className="text-primary-600 font-bold">{company.price}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-semibold mb-2">Особенности:</h4>
                        <div className="flex flex-wrap gap-2">
                          {company.features.map((feature, idx) => (
                            <span key={idx} className="bg-primary-100 text-primary-800 px-2 py-1 rounded text-sm">
                              {feature}
                            </span>
                          ))}    
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Преимущества:</h4>
                        <ul className="text-sm space-y-1">
                          {company.pros.map((pro, idx) => (
                            <li key={idx} className="flex items-center space-x-1">
                              <CheckCircle className="w-3 h-3 text-green-600" />
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <h2>Средние цены на клининг в Москве</h2>
              
              <p>
                Стоимость услуг <strong>клининговой компании</strong> зависит от многих факторов: 
                площади помещения, типа уборки, сложности работ и репутации компании.
              </p>

              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h4 className="font-semibold mb-4">Средние цены по Москве:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium mb-2">Уборка квартир:</h5>
                    <ul className="space-y-1 text-sm">
                      <li>• 1-комнатная: 2,500-4,000₽</li>
                      <li>• 2-комнатная: 3,500-5,500₽</li>
                      <li>• 3-комнатная: 4,500-7,000₽</li>
                      <li>• Генеральная: +50-70%</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2">Дополнительные услуги:</h5>
                    <ul className="space-y-1 text-sm">
                      <li>• Химчистка дивана: 2,000-4,000₽</li>
                      <li>• Мытье окон: 150-300₽/м²</li>
                      <li>• Уборка после ремонта: от 35₽/м²</li>
                      <li>• Мытье холодильника: 800-1,200₽</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h2>На что обратить внимание при выборе</h2>
              
              <h3>1. Лицензии и сертификаты</h3>
              <p>
                Серьезная <strong>клининговая компания в Москве</strong> обязательно имеет:
              </p>
              <ul>
                <li>Официальную регистрацию в качестве ИП или ООО</li>
                <li>Страховой полис ответственности</li>
                <li>Сертификаты на используемые средства</li>
                <li>Договор с четко прописанными условиями</li>
              </ul>

              <h3>2. Отзывы и репутация</h3>
              <p>
                Изучайте отзывы на независимых платформах: Яндекс.Картах, Google, 2ГИС, 
                Отзовик. Обращайте внимание не только на общий рейтинг, но и на содержание отзывов.
              </p>

              <h3>3. Прозрачность цен</h3>
              <p>
                Надежная компания всегда предоставляет четкий прайс-лист и не скрывает 
                дополнительные расходы. Остерегайтесь компаний с неоправданно низкими ценами.
              </p>

              <h2>Часто задаваемые вопросы</h2>
              
              <div className="space-y-4 mb-8">
                <div className="bg-white p-4 rounded-lg border">
                  <h4 className="font-semibold mb-2">Как часто нужна профессиональная уборка?</h4>
                  <p className="text-sm text-gray-700">
                    Для квартир рекомендуется 1-2 раза в месяц, для офисов - еженедельно. 
                    Генеральную уборку лучше делать раз в 3-4 месяца.
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <h4 className="font-semibold mb-2">Что входит в стандартную уборку?</h4>
                  <p className="text-sm text-gray-700">
                    Уборка пыли, мытье полов, сантехники, зеркал, вынос мусора. 
                    Химчистка мебели и мытье окон обычно оплачиваются отдельно.
                  </p>
                </div>
              </div>

              <h2>Заключение</h2>
              
              <p>
                Выбор <strong>клининговой компании в Москве</strong> - это инвестиция в ваш комфорт 
                и здоровье. Не стоит экономить на качестве услуг, лучше выбрать проверенную 
                компанию с хорошей репутацией и прозрачными ценами.
              </p>

              <div className="bg-primary-50 p-6 rounded-lg mt-8">
                <h3 className="text-xl font-bold mb-4">Нужна качественная уборка?</h3>
                <p className="mb-4">
                  K-lining — надёжная клининговая компания в Москве. Работаем 24/7, 
                  предоставляем гарантию качества и используем только профессиональные средства.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/calculator" className="btn-primary inline-flex items-center">
                    Рассчитать стоимость
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                  <a href="tel:+79255551833" className="btn-secondary inline-flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    +7 (925) 555-18-33
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}