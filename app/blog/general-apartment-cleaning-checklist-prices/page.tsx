import { Metadata } from 'next';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema';
import FAQSchema from '@/components/ui/FAQSchema';
import { CheckCircle, Clock, Star, Euro, Shield, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Генеральная уборка квартиры в Москве: чек-лист, цены 2025 | K-lining',
  description: 'Полный гид по генеральной уборке квартиры. Подробный чек-лист, актуальные цены 2025, что входит в услугу. Профессиональная генеральная уборка в Москве от K-lining.',
  keywords: 'генеральная уборка квартиры, генеральная уборка москва, глубокая уборка, комплексная уборка, влажная уборка, чек-лист уборки, цены генеральная уборка',
  authors: [{ name: 'K-lining' }],
  creator: 'K-lining',
  publisher: 'K-lining',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Генеральная уборка квартиры: чек-лист и цены 2025',
    description: 'Полный гид по генеральной уборке квартиры. Подробный чек-лист, актуальные цены, что входит в услугу.',
    url: 'https://k-lining.ru/blog/general-apartment-cleaning-checklist-prices',
    siteName: 'K-lining',
    images: [
      {
        url: 'https://k-lining.ru/blog/general-cleaning-checklist.jpg',
        width: 1200,
        height: 630,
        alt: 'Генеральная уборка квартиры K-lining',
      },
    ],
    locale: 'ru_RU',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Генеральная уборка квартиры: чек-лист и цены 2025',
    description: 'Полный гид по генеральной уборке квартиры от профессионалов K-lining',
    images: ['https://k-lining.ru/blog/general-cleaning-checklist.jpg'],
  },
};

export default function GeneralCleaningChecklistPage() {
  const cleaningChecklist = [
    {
      room: 'Кухня',
      tasks: [
        'Мытье всех поверхностей и столешниц',
        'Глубокая чистка плиты, духовки, вытяжки',
        'Размораживание и мытье холодильника',
        'Чистка микроволновой печи внутри и снаружи',
        'Мытье всех шкафов внутри и снаружи',
        'Чистка раковины и смесителя до блеска',
        'Мытье окон и подоконников',
        'Уборка и мытье пола под мебелью'
      ]
    },
    {
      room: 'Ванная и туалет',
      tasks: [
        'Глубокая чистка ванны/душевой кабины',
        'Удаление известкового налета и плесени',
        'Чистка унитаза внутри и снаружи',
        'Мытье зеркал без разводов',
        'Чистка всех хромированных поверхностей',
        'Мытье кафеля и межплиточных швов',
        'Чистка вентиляционных решеток',
        'Дезинфекция всех поверхностей'
      ]
    },
    {
      room: 'Жилые комнаты',
      tasks: [
        'Влажная уборка всех поверхностей',
        'Пылесос мягкой мебели',
        'Мытье окон внутри и снаружи',
        'Чистка подоконников и радиаторов',
        'Протирка всех светильников',
        'Уборка под кроватями и диванами',
        'Мытье плинтусов и дверей',
        'Влажная уборка пола'
      ]
    },
    {
      room: 'Прихожая и балкон',
      tasks: [
        'Мытье входной двери внутри и снаружи',
        'Чистка зеркал и полок',
        'Уборка шкафов для обуви',
        'Мытье пола и плинтусов',
        'Уборка балкона/лоджии',
        'Мытье балконных окон',
        'Протирка перил и ограждений'
      ]
    }
  ];

  const pricingTiers = [
    {
      type: '1-комнатная квартира',
      area: 'до 40 м²',
      price: '4,500₽',
      duration: '3-4 часа',
      features: ['Кухня', 'Ванная', 'Комната', 'Прихожая']
    },
    {
      type: '2-комнатная квартира', 
      area: '40-60 м²',
      price: '6,500₽',
      duration: '4-5 часов',
      features: ['Кухня', 'Ванная', '2 комнаты', 'Прихожая', 'Балкон']
    },
    {
      type: '3-комнатная квартира',
      area: '60-80 м²', 
      price: '8,500₽',
      duration: '5-6 часов',
      features: ['Кухня', 'Ванная', '3 комнаты', 'Прихожая', 'Балкон']
    },
    {
      type: '4+ комнатная квартира',
      area: 'от 80 м²',
      price: 'от 10,500₽',
      duration: '6-8 часов',
      features: ['Все помещения', 'Дополнительные санузлы', 'Гардеробные']
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
            { name: 'Генеральная уборка квартиры', url: '/blog/general-apartment-cleaning-checklist-prices' }
          ]}
        />
      </div>

      {/* Основной контент */}
      <article className="container-custom py-12">
        {/* Заголовок и введение */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Генеральная уборка квартиры: полный чек-лист и цены 2025
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Подробный гид по генеральной уборке квартиры от профессионалов K-lining. 
            Узнайте, что входит в услугу, сколько это стоит и как сэкономить время и деньги.
          </p>
          <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>12 мин чтения</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              <span>Обновлено: 16 января 2025</span>
            </div>
          </div>
        </header>

        {/* Что такое генеральная уборка */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Что такое генеральная уборка квартиры?</h2>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              <strong>Генеральная уборка квартиры</strong> — это комплексная глубокая уборка всех помещений, 
              которая включает в себя не только стандартную поддерживающую уборку, но и чистку труднодоступных мест, 
              удаление застарелых загрязнений и дезинфекцию всех поверхностей.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-primary-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-primary-800 mb-4">Отличия от поддерживающей уборки:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                    <span>Чистка внутри бытовой техники</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                    <span>Мытье шкафов внутри и снаружи</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                    <span>Уборка под мебелью</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                    <span>Чистка межплиточных швов</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-secondary-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-secondary-800 mb-4">Когда нужна генеральная уборка:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-secondary-600 mt-0.5 flex-shrink-0" />
                    <span>После ремонта или переезда</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-secondary-600 mt-0.5 flex-shrink-0" />
                    <span>Смена сезонов (весна/осень)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-secondary-600 mt-0.5 flex-shrink-0" />
                    <span>Перед важными событиями</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-secondary-600 mt-0.5 flex-shrink-0" />
                    <span>Раз в 3-6 месяцев для поддержания</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Подробный чек-лист */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Подробный чек-лист генеральной уборки</h2>
          <p className="text-lg text-gray-600 mb-8">
            Наши клинеры в <strong>Басманном, Тверском, Таганском и других районах Москвы</strong> используют 
            этот проверенный чек-лист для достижения идеального результата.
          </p>
          
          <div className="grid gap-6">
            {cleaningChecklist.map((section, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-bold">{index + 1}</span>
                  </div>
                  {section.room}
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {section.tasks.map((task, taskIndex) => (
                    <div key={taskIndex} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{task}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Цены */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Цены на генеральную уборку квартир в Москве 2025</h2>
          <p className="text-lg text-gray-600 mb-8">
            Актуальные цены на генеральную уборку от <strong>K-lining</strong>. 
            Все расходные материалы и профессиональное оборудование включены в стоимость.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingTiers.map((tier, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{tier.type}</h3>
                  <p className="text-gray-600 text-sm mb-4">{tier.area}</p>
                  <div className="text-3xl font-bold text-primary-600 mb-2">{tier.price}</div>
                  <p className="text-gray-500 text-sm">{tier.duration}</p>
                </div>
                
                <div className="space-y-2">
                  {tier.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-blue-900 mb-4 flex items-center gap-2">
              <Euro className="w-6 h-6" />
              Дополнительные услуги
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-gray-700">
              <div>• Мытье окон снаружи: +150₽/м²</div>
              <div>• Химчистка дивана: +3,000₽</div>
              <div>• Чистка ковра: +200₽/м²</div>
              <div>• Уборка балкона: +1,200₽</div>
              <div>• Мытье холодильника: +1,000₽</div>
              <div>• Глажка белья: +50₽/вещь</div>
            </div>
          </div>
        </section>

        {/* Преимущества профессиональной уборки */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Преимущества заказа генеральной уборки в K-lining</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Экономия времени</h3>
              <p className="text-gray-600">
                Генеральная уборка 2-комнатной квартиры займет у вас целые выходные. 
                Наша команда справится за 4-5 часов.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Профессиональные средства</h3>
              <p className="text-gray-600">
                Используем сертифицированную химию и оборудование, 
                которое недоступно в обычных магазинах.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Гарантия качества</h3>
              <p className="text-gray-600">
                Если результат вас не устроит — переделаем бесплатно или вернем деньги. 
                Работаем честно.
              </p>
            </div>
          </div>
        </section>

        {/* CTA секция */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Закажите генеральную уборку прямо сейчас</h2>
            <p className="text-xl text-primary-100 mb-6">
              Приедем в любой район Москвы в течение 2 часов. Работаем 24/7 без выходных.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/calculator" 
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Рассчитать стоимость
              </Link>
              <Link 
                href="tel:+79255551833" 
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
              >
                Позвонить: +7 (925) 555-18-33
              </Link>
            </div>
          </div>
        </section>

        {/* Связанные статьи */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Полезные статьи по теме</h2>
          <div className="grid md:grid-cols-3 gap-6">
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
                <div className="h-48 bg-gradient-to-br from-green-400 to-green-600"></div>
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
            
            <Link href="/blog/how-to-clean-after-renovation" className="group">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-br from-purple-400 to-purple-600"></div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                    Уборка после ремонта
                  </h3>
                  <p className="text-gray-600 text-sm mt-2">
                    Как правильно убирать строительную пыль
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
            question: 'Сколько времени занимает генеральная уборка квартиры?',
            answer: 'Время зависит от площади: 1-комнатная квартира — 3-4 часа, 2-комнатная — 4-5 часов, 3-комнатная — 5-6 часов. Наша команда работает быстро и качественно.'
          },
          {
            question: 'Что входит в стоимость генеральной уборки?',
            answer: 'В стоимость включены все профессиональные моющие средства, оборудование, уборка всех помещений по чек-листу и вывоз мусора. Доплачивать ничего не нужно.'
          },
          {
            question: 'Как часто нужно делать генеральную уборку?',
            answer: 'Рекомендуем проводить генеральную уборку раз в 3-6 месяцев в зависимости от загрязненности квартиры. После ремонта или переезда — обязательно.'
          },
          {
            question: 'Можно ли заказать только уборку определенных комнат?',
            answer: 'Да, мы можем убрать только нужные вам помещения. Стоимость рассчитывается индивидуально в зависимости от объема работ.'
          },
          {
            question: 'Предоставляете ли вы гарантию на генеральную уборку?',
            answer: 'Да, мы даем гарантию качества. Если что-то вас не устроит — переделаем бесплатно в течение 24 часов или вернем деньги.'
          }
        ]}
      />
    </div>
  );
}