import { Metadata } from 'next';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema';
import FAQSchema from '@/components/ui/FAQSchema';
import { CheckCircle, AlertTriangle, Star, Shield, Clock, Award, Phone, Eye } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Как выбрать клининговую компанию в Москве: полный гид 2025 | K-lining',
  description: 'Полное руководство по выбору надежной клининговой компании в Москве. Критерии отбора, на что обратить внимание, как избежать мошенников. Профессиональные советы от K-lining.',
  keywords: 'клининг москва, клининговые услуги, клининговая компания, профессиональная уборка, как выбрать клининговую компанию, надежная уборка москва',
  authors: [{ name: 'K-lining' }],
  creator: 'K-lining',
  publisher: 'K-lining',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Как выбрать надежную клининговую компанию в Москве',
    description: 'Полное руководство по выбору надежной клининговой компании. Критерии отбора, советы от профессионалов.',
    url: 'https://k-lining.ru/blog/how-to-choose-reliable-cleaning-company-moscow',
    siteName: 'K-lining',
    images: [
      {
        url: 'https://k-lining.ru/blog/choose-cleaning-company.jpg',
        width: 1200,
        height: 630,
        alt: 'Как выбрать клининговую компанию K-lining',
      },
    ],
    locale: 'ru_RU',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Как выбрать надежную клининговую компанию в Москве',
    description: 'Полное руководство от профессионалов клининга K-lining',
    images: ['https://k-lining.ru/blog/choose-cleaning-company.jpg'],
  },
};

export default function ChooseCleaningCompanyPage() {
  const selectionCriteria = [
    {
      icon: Shield,
      title: 'Лицензии и документы',
      description: 'Проверьте наличие официальной регистрации, лицензий и страховки ответственности',
      checkPoints: [
        'ОГРН и ИНН компании',
        'Лицензия на клининговые услуги',
        'Страхование ответственности',
        'Санитарные книжки сотрудников'
      ]
    },
    {
      icon: Star,
      title: 'Репутация и отзывы',
      description: 'Изучите отзывы на независимых платформах и в социальных сетях',
      checkPoints: [
        'Отзывы на Яндекс.Картах',
        'Рейтинг на 2ГИС',
        'Отзывы в Google',
        'Упоминания в соцсетях'
      ]
    },
    {
      icon: Award,
      title: 'Опыт и профессионализм',
      description: 'Узнайте, как долго компания работает и какой у неё опыт в клининге',
      checkPoints: [
        'Срок работы на рынке',
        'Квалификация персонала',
        'Обучение сотрудников',
        'Портфолио выполненных работ'
      ]
    },
    {
      icon: Eye,
      title: 'Прозрачность услуг',
      description: 'Компания должна четко объяснять, что входит в услугу и сколько это стоит',
      checkPoints: [
        'Подробный прайс-лист',
        'Описание услуг',
        'Договор с гарантиями',
        'Чек-лист работ'
      ]
    }
  ];

  const redFlags = [
    {
      warning: 'Требуют 100% предоплату',
      description: 'Серьезные компании берут предоплату не более 50% или работают по факту'
    },
    {
      warning: 'Нет официального сайта',
      description: 'Работают только через соцсети или объявления — повод насторожиться'
    },
    {
      warning: 'Слишком низкие цены',
      description: 'Демпинг часто означает низкое качество или скрытые доплаты'
    },
    {
      warning: 'Отказываются показать документы',
      description: 'Надежная компания всегда готова предоставить лицензии и сертификаты'
    },
    {
      warning: 'Нет договора или гарантий',
      description: 'Работа "на словах" — это всегда риск для заказчика'
    },
    {
      warning: 'Плохие отзывы о качестве',
      description: 'Много жалоб на некачественную уборку или порчу имущества'
    }
  ];

  const questionsList = [
    'Сколько лет вы работаете на рынке клининга?',
    'Есть ли у компании официальная регистрация и лицензии?',
    'Предоставляете ли вы страхование ответственности?',
    'Какие средства и оборудование используете?',
    'Можете ли показать примеры выполненных работ?',
    'Что входит в стоимость услуги?',
    'Предоставляете ли гарантию на работы?',
    'Как происходит оплата?',
    'Можно ли изменить время или перенести уборку?',
    'Что будет, если результат не устроит?'
  ];

  const companyTypes = [
    {
      type: 'Крупные сетевые компании',
      pros: ['Стабильность', 'Отработанные процессы', 'Множество отзывов'],
      cons: ['Высокие цены', 'Формальный подход', 'Долгое ожидание'],
      bestFor: 'Регулярная уборка офисов'
    },
    {
      type: 'Средние локальные компании',
      pros: ['Гибкость', 'Персональный подход', 'Адекватные цены'],
      cons: ['Ограниченная география', 'Меньше ресурсов'],
      bestFor: 'Уборка квартир и домов'
    },
    {
      type: 'Малые команды и ИП',
      pros: ['Низкие цены', 'Быстрое реагирование', 'Личная ответственность'],
      cons: ['Риски качества', 'Нет страховки', 'Ограниченные возможности'],
      bestFor: 'Разовые несложные работы'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Хлебные крошки */}
      <div className="container-custom pt-6">
        <BreadcrumbSchema
          items={[
            { name: 'Главная', url: '/' },
            { name: 'Блог', url: '/blog' },
            { name: 'Как выбрать клининговую компанию', url: '/blog/how-to-choose-reliable-cleaning-company-moscow' }
          ]}
        />
      </div>

      {/* Основной контент */}
      <article className="container-custom py-12">
        {/* Заголовок */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Как выбрать надежную клининговую компанию в Москве
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Полное руководство от профессионалов K-lining: на что обратить внимание при выборе 
            клининговой компании, как избежать мошенников и получить качественную услугу.
          </p>
          <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>15 мин чтения</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              <span>Обновлено: 16 января 2025</span>
            </div>
          </div>
        </header>

        {/* Введение */}
        <section className="mb-12">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Почему выбор клининговой компании так важен?</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Рынок клининговых услуг в Москве растет каждый год, но вместе с ним растет и количество 
              недобросовестных исполнителей. <strong>Неправильный выбор</strong> может обернуться:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-red-800 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6" />
                  Риски неправильного выбора
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Некачественная уборка</li>
                  <li>• Порча имущества</li>
                  <li>• Кража вещей</li>
                  <li>• Скрытые доплаты</li>
                  <li>• Отсутствие гарантий</li>
                </ul>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-green-800 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6" />
                  Преимущества правильного выбора
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Идеальная чистота</li>
                  <li>• Экономия времени</li>
                  <li>• Безопасность имущества</li>
                  <li>• Прозрачные условия</li>
                  <li>• Долгосрочное сотрудничество</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Критерии выбора */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ключевые критерии выбора клининговой компании</h2>
          <p className="text-lg text-gray-600 mb-8">
            При выборе клининговой компании в <strong>Москве</strong> обращайте внимание на эти 4 ключевых аспекта:
          </p>
          
          <div className="grid gap-8">
            {selectionCriteria.map((criterion, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <criterion.icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">{criterion.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{criterion.description}</p>
                    
                    <div className="grid md:grid-cols-2 gap-3">
                      {criterion.checkPoints.map((point, pointIndex) => (
                        <div key={pointIndex} className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Красные флаги */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Красные флаги: когда стоит отказаться</h2>
          <p className="text-lg text-gray-600 mb-8">
            Эти признаки должны вас насторожить и стать поводом поискать другую компанию:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {redFlags.map((flag, index) => (
              <div key={index} className="bg-white border-l-4 border-red-500 rounded-lg p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-red-700 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  {flag.warning}
                </h3>
                <p className="text-gray-600">{flag.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Типы компаний */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Типы клининговых компаний: плюсы и минусы</h2>
          
          <div className="grid lg:grid-cols-3 gap-6">
            {companyTypes.map((companyType, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{companyType.type}</h3>
                
                <div className="mb-4">
                  <h4 className="text-green-700 font-medium mb-2">Плюсы:</h4>
                  <ul className="space-y-1">
                    {companyType.pros.map((pro, proIndex) => (
                      <li key={proIndex} className="text-gray-600 text-sm flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-red-700 font-medium mb-2">Минусы:</h4>
                  <ul className="space-y-1">
                    {companyType.cons.map((con, conIndex) => (
                      <li key={conIndex} className="text-gray-600 text-sm flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-3">
                  <span className="text-blue-800 font-medium text-sm">Лучше для: </span>
                  <span className="text-blue-700 text-sm">{companyType.bestFor}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Вопросы для компании */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">10 вопросов, которые нужно задать компании</h2>
          <p className="text-lg text-gray-600 mb-8">
            Перед заказом услуги обязательно задайте эти вопросы. Ответы помогут понять, 
            стоит ли доверять компании:
          </p>
          
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="grid gap-4">
              {questionsList.map((question, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-600 font-bold text-sm">{index + 1}</span>
                  </div>
                  <p className="text-gray-700 font-medium">{question}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Почему K-lining */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-6 text-center">Почему клиенты выбирают K-lining?</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Честность</h3>
                <p className="text-blue-100 text-sm">
                  Мы новая компания, но работаем открыто и честно
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Качество</h3>
                <p className="text-blue-100 text-sm">
                  Используем профессиональные средства и оборудование
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Скорость</h3>
                <p className="text-blue-100 text-sm">
                  Приедем в любой район Москвы в течение 2 часов
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Гарантия</h3>
                <p className="text-blue-100 text-sm">
                  Переделаем бесплатно или вернем деньги
                </p>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <p className="text-xl text-blue-100 mb-6">
                Обслуживаем <strong>Басманный, Тверской, Таганский</strong> и другие районы Москвы
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/calculator" 
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Рассчитать стоимость
                </Link>
                <Link 
                  href="tel:+79255551833" 
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  +7 (925) 555-18-33
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Связанные статьи */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Читайте также</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/blog/general-apartment-cleaning-checklist-prices" className="group">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-br from-green-400 to-green-600"></div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                    Генеральная уборка: чек-лист и цены
                  </h3>
                  <p className="text-gray-600 text-sm mt-2">
                    Полный гид по генеральной уборке квартиры
                  </p>
                </div>
              </div>
            </Link>
            
            <Link href="/blog/apartment-cleaning-price-moscow" className="group">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600"></div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                    Цены на уборку квартир в Москве
                  </h3>
                  <p className="text-gray-600 text-sm mt-2">
                    Актуальные тарифы и способы экономии
                  </p>
                </div>
              </div>
            </Link>
            
            <Link href="/services/apartment-cleaning" className="group">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-br from-purple-400 to-purple-600"></div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                    Уборка квартир в Москве
                  </h3>
                  <p className="text-gray-600 text-sm mt-2">
                    Профессиональная уборка от K-lining
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </section>
      </article>

      {/* FAQ Schema */}
      <FAQSchema
        faqs={[
          {
            question: 'Как проверить надежность клининговой компании?',
            answer: 'Проверьте официальную регистрацию компании, наличие лицензий, страхования ответственности. Изучите отзывы на независимых платформах: Яндекс.Карты, 2ГИС, Google. Убедитесь в прозрачности услуг и наличии договора.'
          },
          {
            question: 'Какие документы должна предоставить клининговая компания?',
            answer: 'Надежная компания должна предоставить: ОГРН и ИНН, лицензию на клининговые услуги, полис страхования ответственности, санитарные книжки сотрудников, договор на оказание услуг с гарантиями.'
          },
          {
            question: 'Сколько должна стоить качественная уборка в Москве?',
            answer: 'Средние цены на уборку 2-комнатной квартиры: поддерживающая — 3,000-4,000₽, генеральная — 6,000-8,000₽. Слишком низкие цены (ниже рынка на 30%+) часто означают низкое качество или скрытые доплаты.'
          },
          {
            question: 'Что делать, если результат уборки не устроил?',
            answer: 'Серьезная компания должна предоставить гарантию качества. Если результат не устроил — компания обязана переделать работу бесплатно в течение 24-48 часов или вернуть деньги согласно договору.'
          },
          {
            question: 'Безопасно ли пускать чужих людей в квартиру для уборки?',
            answer: 'При работе с надежной компанией — да. Проверьте наличие страховки, официального трудоустройства сотрудников, договора. Во время первой уборки можете присутствовать дома для контроля.'
          }
        ]}
      />
    </div>
  );
}