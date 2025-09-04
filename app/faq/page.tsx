import { Metadata } from 'next';
import FAQSchema from '@/components/ui/FAQSchema';
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'FAQ - Часто задаваемые вопросы о клининге | K-lining',
  description: 'Вопросы и ответы о клининге в Москве: цены, качество, гарантии уборки. Часто задаваемые вопросы о K-lining. Получить ответ ⭐',
  keywords: 'FAQ клининг, вопросы уборка, цены клининг москва, гарантии уборка, сроки клининг, качество уборка, отзывы клининг',
  openGraph: {
    title: 'FAQ - Часто задаваемые вопросы о клининге | K-lining',
    description: 'Ответы на популярные вопросы о клининговых услугах в Москве. Цены, качество, гарантии. Минимальный заказ — 6 000 ₽.',
    type: 'website',
    siteName: 'K-lining',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ - Часто задаваемые вопросы о клининге | K-lining',
    description: 'Ответы на популярные вопросы о клининговых услугах в Москве.',
  },
  alternates: {
    canonical: 'https://k-lining.ru/faq',
  },
};

const faqData = [
  {
    question: 'Сколько стоит уборка квартиры в Москве?',
    answer: 'Минимальная стоимость заказа — 6,000₽. Ориентиры по площади: поддерживающая 60–110 ₽/м², генеральная 160–220 ₽/м², после ремонта 220–300 ₽/м². Точную стоимость покажет калькулятор на сайте или смета после осмотра.'
  },
  {
    question: 'Какие гарантии качества предоставляете?',
    answer: 'Мы предоставляем 100% гарантию качества на все виды работ. Если вас что-то не устроит, мы бесплатно переделаем работу в течение 24 часов. Также даем гарантию на используемые материалы и оборудование.'
  },
  {
    question: 'Сколько времени занимает уборка квартиры?',
    answer: 'Время уборки зависит от площади и типа работ. Базовая уборка 1-комнатной квартиры занимает 2-3 часа, генеральная уборка 3-4 часа. Для больших квартир и домов время рассчитывается индивидуально.'
  },
  {
    question: 'Работаете ли вы в выходные и праздники?',
    answer: 'Да, мы работаем 24/7, включая выходные и праздничные дни. Вы можете заказать уборку в любое удобное для вас время. Срочные заказы выполняем в течение 2-4 часов.'
  },
  {
    question: 'Какие средства для уборки используете?',
    answer: 'Используем профессиональные экологичные средства ведущих брендов: Vileda Professional, Bagi, Cif. Все средства безопасны для людей и домашних животных, не оставляют разводов и запахов.'
  },
  {
    question: 'Нужно ли присутствовать во время уборки?',
    answer: 'Не обязательно. Вы можете оставить ключи или код от домофона. Наши специалисты работают аккуратно и бережно относятся к вашим вещам. После завершения работ высылаем фотоотчет.'
  },
  {
    question: 'Есть ли у вас страховка?',
    answer: 'Да, у нас есть страховка ответственности на сумму 1,000,000₽. Это покрывает возможные повреждения имущества во время уборки.'
  },
  {
    question: 'Можете ли убрать после ремонта?',
    answer: 'Да, специализируемся на уборке после ремонта. Убираем строительную пыль, мусор, следы краски и клея. Используем специальное оборудование для удаления пыли и профессиональные средства.'
  },
  {
    question: 'Работаете ли с офисами и коммерческими помещениями?',
    answer: 'Да, обслуживаем офисы, магазины, салоны красоты, медицинские центры и другие коммерческие объекты. Предлагаем разовые и регулярные услуги уборки с гибким графиком.'
  },
  {
    question: 'Как происходит оплата услуг?',
    answer: 'Принимаем оплату наличными, картой или банковским переводом. Оплата производится после выполнения работ. Для постоянных клиентов возможна оплата по факту или предоплата со скидкой.'
  },
  {
    question: 'Есть ли скидки для постоянных клиентов?',
    answer: 'Да, предоставляем скидки до 20% для постоянных клиентов. Также действуют акции для новых клиентов и сезонные скидки. Подписывайтесь на наши соцсети, чтобы не пропустить выгодные предложения.'
  },
  {
    question: 'Можете ли убрать химчистку мебели и ковров?',
    answer: 'Да, выполняем профессиональную химчистку диванов, кресел, ковров и штор. Используем экологичные средства и современное оборудование. Гарантируем качество и безопасность для аллергиков.'
  },
  {
    question: 'В каких районах Москвы работаете?',
    answer: 'Работаем по всей Москве и Московской области. Основные районы: Басманный, Тверской, Таганский, Красносельский, Арбат, Хамовники, Пресненский и другие районы ЦАО. Выезжаем в любую точку МО.'
  },
  {
    question: 'Как заказать уборку?',
    answer: 'Заказать уборку можно по телефону +7 (925) 555-18-33, через WhatsApp, Telegram @k_liningru или оставив заявку на сайте. Менеджер свяжется с вами в течение 5 минут для уточнения деталей.'
  },
  {
    question: 'Есть ли у вас отзывы клиентов?',
    answer: 'Да, мы собираем отзывы на внешних площадках (Яндекс/2ГИС/Google). Ссылки и примеры работ добавим на сайт в ближайшее время. По запросу пришлём кейсы и фото «до/после».'
  }
];

export default function FAQPage() {
  const breadcrumbItems = [
    { name: 'Часто задаваемые вопросы' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <BreadcrumbSchema items={breadcrumbItems} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Часто задаваемые вопросы
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Ответы на популярные вопросы о клининговых услугах в Москве
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-blue-500 px-4 py-2 rounded-full">Цены и оплата</span>
              <span className="bg-blue-500 px-4 py-2 rounded-full">Гарантии качества</span>
              <span className="bg-blue-500 px-4 py-2 rounded-full">Сроки выполнения</span>
              <span className="bg-blue-500 px-4 py-2 rounded-full">Безопасность</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {faqData.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <details className="group">
                    <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                      <h3 className="text-lg font-semibold text-gray-900 pr-4">
                        {faq.question}
                      </h3>
                      <div className="flex-shrink-0">
                        <svg 
                          className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </summary>
                    <div className="px-6 pb-6">
                      <p className="text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </details>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="mt-16 bg-blue-600 rounded-2xl p-8 text-center text-white">
              <h2 className="text-2xl font-bold mb-4">
                Не нашли ответ на свой вопрос?
              </h2>
              <p className="text-blue-100 mb-6">
                Свяжитесь с нами любым удобным способом, и мы ответим на все ваши вопросы
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="tel:+79255551833"
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Позвонить +7 (925) 555-18-33
                </a>
                <a 
                  href="https://wa.me/79255551833"
                  className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                >
                  Написать в WhatsApp
                </a>
                <a 
                  href="https://t.me/k_liningru"
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Написать в Telegram
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Schema для rich snippets */}
      <FAQSchema faqs={faqData} />
    </div>
  );
} 