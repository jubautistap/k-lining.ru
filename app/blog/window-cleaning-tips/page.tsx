import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Мытье окон: секреты профессионалов без разводов | Блог K-lining',
  description: 'Секреты мытья окон без разводов: профессиональные техники, инструменты, средства. Как мыть окна в квартире и на высоте. Советы от K-lining ✓',
  keywords: 'мытье окон, мытье окон без разводов, мытье окон в квартире, профессиональное мытье окон, мытье окон на высоте, чистка окон, уборка окон, мытье окон в офисе',
  openGraph: {
    title: 'Мытье окон: секреты профессионалов без разводов',
    description: 'Как правильно мыть окна без разводов. Инструменты и техники от опытных клинеров.',
    url: 'https://k-lining.ru/blog/window-cleaning-tips',
    siteName: 'K-lining',
    images: [{ url: '/blog/window-cleaning.jpg', width: 1200, height: 630, alt: 'Мытье окон' }],
    locale: 'ru_RU',
    type: 'article',
    publishedTime: '2024-12-28T10:00:00Z',
    modifiedTime: '2024-12-28T10:00:00Z',
    authors: ['K-lining'],
    tags: ['мытье окон', 'чистка окон', 'профессиональное мытье', 'уборка окон']
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Мытье окон: секреты профессионалов без разводов',
    description: 'Как правильно мыть окна без разводов',
    images: ['/blog/window-cleaning.jpg'],
  },
  alternates: {
    canonical: 'https://k-lining.ru/blog/window-cleaning-tips',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function WindowCleaningTipsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "Профессиональное мытье окон в квартире: секреты идеальной чистоты",
            "description": "Как правильно мыть окна без разводов. Инструменты и техники от опытных клинеров.",
            "image": ["https://k-lining.ru/blog/window-cleaning.jpg"],
            "author": { "@type": "Organization", "name": "K-lining", "url": "https://k-lining.ru" },
            "publisher": { "@type": "Organization", "name": "K-lining", "logo": { "@type": "ImageObject", "url": "https://k-lining.ru/logo.png" } },
            "datePublished": "2024-12-28",
            "dateModified": "2024-12-28",
            "mainEntityOfPage": { "@type": "WebPage", "@id": "https://k-lining.ru/blog/window-cleaning-tips" },
            "inLanguage": "ru-RU"
          })
        }}
      />
      <div className="container-custom py-8">
        {/* Breadcrumbs */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-primary-600">Главная</Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/blog" className="hover:text-primary-600">Блог</Link>
            </li>
            <li>/</li>
            <li className="text-gray-900">Мытье окон</li>
          </ol>
        </nav>

        {/* Article Header */}
        <article className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <div className="max-w-4xl mx-auto">
            <Link 
              href="/blog" 
              className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад к блогу
            </Link>

            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Профессиональное мытье окон в квартире: секреты идеальной чистоты
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>15 января 2025</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>10 мин чтения</span>
                </div>
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  <span>Эксперты K-lining</span>
                </div>
              </div>

              <p className="text-xl text-gray-600 leading-relaxed">
              Чистые окна — это не только эстетика, но и здоровье. В Москве ежедневно оседает тонны пыли, которые снижают прозрачность стекла. Узнайте профессиональные секреты мытья окон от экспертов K-lining.
              </p>
            </header>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <h2>Почему важно профессиональное мытье окон?</h2>
              <p>
                Несмотря на всю красоту Москвы, столица ежедневно наполняется тоннами пыли, которые оседают на окнах квартир, домов, офисов и торговых центров. Для одних окна и балконы — это просто комфорт, а для бизнеса — это вопрос рекламы и репутации.
              </p>

              <h2>Когда нужна профессиональная помощь?</h2>
              <ul>
                <li>Высокие этажи (опасно мыть самостоятельно)</li>
                <li>Труднодоступные окна и балконы</li>
                <li>Застарелые загрязнения</li>
                <li>Окна после ремонта</li>
                <li>Зимний период (в сильные морозы внешние работы исключаются)</li>
              </ul>

              <h2>Профессиональные методы мытья окон</h2>
              
              <h3>1. Подготовка к мытью</h3>
              <p>
                Перед началом работы наши мастера тщательно подготавливают рабочую зону и проверяют безопасность.
              </p>

              <h3>2. Выбор правильных средств</h3>
              <p>
                Мы используем профессиональную химию Grass, Pro-Brite, Effect, которая:
              </p>
              <ul>
                <li>Не оставляет разводов</li>
                <li>Безопасна для здоровья</li>
                <li>Эффективно удаляет загрязнения</li>
                <li>Защищает стекло от повторного загрязнения</li>
              </ul>

              <h3>3. Техника мытья</h3>
              <p>
                Наши мастера используют специальную технику:
              </p>
              <ol>
                <li>Очистка рамы и подоконника</li>
                <li>Мытье стекла специальными средствами</li>
                <li>Удаление разводов микрофиброй</li>
                <li>Полировка до блеска</li>
              </ol>

              <h2>Особенности мытья окон в разных условиях</h2>

              <h3>Мытье окон в квартире</h3>
              <p>
                Для квартир мы используем щадящие методы, которые не повредят интерьер и мебель.
              </p>

              <h3>Мытье окон в офисе</h3>
              <p>
                В офисах важна скорость и качество, особенно для витрин и фасадного остекления.
              </p>

              <h3>Мытье окон в торговых центрах</h3>
              <p>
                Витрина — это &quot;лицо&quot; магазина, поэтому требуется особое внимание к деталям.
              </p>

              <h2>Безопасность при мытье окон</h2>
              <p>
                Наши мастера проходят специальное обучение и используют:
              </p>
              <ul>
                <li>Страховочное оборудование</li>
                <li>Специальные лестницы и подмости</li>
                <li>Защитные средства</li>
                <li>Промышленный альпинизм для высотных работ</li>
              </ul>

              <h2>Сезонные особенности</h2>
              
              <h3>Летний период</h3>
              <p>
                Летом можно мыть окна как изнутри, так и снаружи. Идеальное время для генеральной очистки.
              </p>

              <h3>Зимний период</h3>
              <p>
                В сильные морозы внешние работы исключаются из списка услуг, мытье окон проводится только изнутри.
              </p>

              <h2>Дополнительные услуги</h2>
              <p>
                Помимо мытья окон мы предлагаем:
              </p>
              <ul>
                <li>Мытье балконов и лоджий</li>
                <li>Очистка оконных рам</li>
                <li>Мытье витражей</li>
                <li>Очистка жалюзи</li>
                <li>Мытье фасадов зданий</li>
              </ul>

              <div className="bg-primary-50 rounded-xl p-6 mt-8">
                <h3 className="text-xl font-semibold text-primary-900 mb-4">
                  Профессиональный совет
                </h3>
                <p className="text-primary-800">
                  Регулярное мытье окон (2-3 раза в год) не только улучшает освещенность помещения, но и продлевает срок службы оконных конструкций. Наши мастера используют профессиональное оборудование и качественную химию.
                </p>
              </div>

              <h2>Почему выбирают K-lining?</h2>
              <ul>
                <li>Приедем на уборку без опозданий</li>
                <li>Выполним работы качественно и в срок</li>
                <li>Менеджер будет на связи с вами 24/7</li>
                <li>Заключаем договор</li>
                <li>Дарим сертификат на последующие уборки</li>
                <li>Используем профессиональное оборудование</li>
                <li>Качественная химия Grass, Pro-Brite, Effect</li>
              </ul>

              <h2>Заключение</h2>
              <p>
                Профессиональное мытьё окон — это не только красота, но и здоровье. Чистые окна пропускают больше света, улучшают настроение и создают приятную атмосферу в доме. Доверьте эту работу профессионалам K-lining!
              </p>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-8 mt-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">
                Нужно помыть окна?
              </h3>
              <p className="text-primary-100 mb-6">
                Наши мастера быстро и качественно приведут ваши окна в идеальное состояние
              </p>
              <Link 
                href="/contacts" 
                className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Заказать мытье окон
              </Link>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        <section className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Похожие статьи</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/blog/best-cleaning-products" className="group">
              <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 mb-2">
                  Лучшие средства для уборки 2025 года
                </h3>
                <p className="text-sm text-gray-600">
                  Обзор эффективных и безопасных средств для дома
                </p>
              </div>
            </Link>
            
            <Link href="/blog/eco-friendly-cleaning" className="group">
              <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 mb-2">
                  Экологичная уборка: натуральные средства
                </h3>
                <p className="text-sm text-gray-600">
                  Как убирать дом без химии и вреда для здоровья
                </p>
              </div>
            </Link>
            
            <Link href="/blog/kitchen-cleaning-secrets" className="group">
              <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 mb-2">
                  Секреты идеальной уборки кухни
                </h3>
                <p className="text-sm text-gray-600">
                  Профессиональные советы по уборке кухни
                </p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
} 