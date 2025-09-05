import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Химчистка мебели: полное руководство 2025 года | Блог K-lining',
  description: 'Все о химчистке диванов, ковров и мебели. Как выбрать правильную услугу. Химчистка мебели на дому, химчистка дивана, ковров, штор. Профессиональная химчистка.',
  keywords: 'химчистка мебели, химчистка дивана, химчистка ковров, химчистка на дому, профессиональная химчистка, химчистка штор, химчистка мягкой мебели, химчистка ковролина',
  openGraph: {
    title: 'Химчистка мебели: полное руководство 2025 года',
    description: 'Все о химчистке диванов, ковров и мебели. Как выбрать правильную услугу.',
    url: 'https://k-lining.ru/blog/dry-cleaning-guide',
    siteName: 'K-lining',
    images: [{ url: '/blog/dry-cleaning.jpg', width: 1200, height: 630, alt: 'Химчистка мебели' }],
    locale: 'ru_RU',
    type: 'article',
    publishedTime: '2025-01-05T10:00:00Z',
    modifiedTime: '2025-01-05T10:00:00Z',
    authors: ['K-lining'],
    tags: ['химчистка мебели', 'химчистка дивана', 'химчистка ковров', 'профессиональная химчистка']
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Химчистка мебели: полное руководство 2025 года',
    description: 'Все о химчистке диванов, ковров и мебели',
    images: ['/blog/dry-cleaning.jpg'],
  },
  alternates: {
    canonical: 'https://k-lining.ru/blog/dry-cleaning-guide',
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

export default function DryCleaningGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "Химчистка мебели и текстиля: профессиональные услуги",
            "description": "Все о химчистке диванов, ковров и мебели. Как выбрать правильную услугу.",
            "image": ["https://k-lining.ru/blog/dry-cleaning.jpg"],
            "author": { "@type": "Organization", "name": "K-lining", "url": "https://k-lining.ru" },
            "publisher": { "@type": "Organization", "name": "K-lining", "logo": { "@type": "ImageObject", "url": "https://k-lining.ru/logo.png" } },
            "datePublished": "2025-01-05",
            "dateModified": "2025-01-05",
            "mainEntityOfPage": { "@type": "WebPage", "@id": "https://k-lining.ru/blog/dry-cleaning-guide" },
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
            <li className="text-gray-900">Химчистка</li>
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
                Химчистка мебели и текстиля: профессиональные услуги
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>15 января 2025</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>12 мин чтения</span>
                </div>
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  <span>Эксперты K-lining</span>
                </div>
              </div>

              <p className="text-xl text-gray-600 leading-relaxed">
                Профессиональная химчистка — это не просто очистка, а восстановление внешнего вида и продление срока службы вашей мебели и текстиля. Узнайте о современных методах химчистки от экспертов K-lining.
              </p>
            </header>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <h2>Что такое профессиональная химчистка?</h2>
              <p>
                Химчистка — это специальный метод очистки текстильных изделий и мягкой мебели с использованием профессиональных химических средств и оборудования. В отличие от обычной стирки, химчистка позволяет:
              </p>
              <ul>
                <li>Удалить глубокие загрязнения</li>
                <li>Сохранить структуру и цвет материала</li>
                <li>Устранить неприятные запахи</li>
                <li>Продлить срок службы изделий</li>
                <li>Очистить труднодоступные места</li>
              </ul>

              <h2>Виды химчистки</h2>

              <h3>Химчистка диванов</h3>
              <p>
                Диван — это центральный элемент гостиной, который требует особого ухода. Наши мастера используют:
              </p>
              <ul>
                <li>Профессиональные экстракторы</li>
                <li>Специальные средства для разных типов ткани</li>
                <li>Технологию глубокой очистки</li>
                <li>Защитные пропитки</li>
              </ul>

              <h3>Химчистка мягкой мебели</h3>
              <p>
                Кресла, пуфики, кровати с мягким изголовьем — все это требует профессиональной очистки:
              </p>
              <ul>
                <li>Очистка от пыли и клещей</li>
                <li>Удаление пятен и загрязнений</li>
                <li>Обработка антибактериальными средствами</li>
                <li>Восстановление цвета и текстуры</li>
              </ul>

              <h3>Химчистка ковров</h3>
              <p>
                Ковры накапливают пыль, аллергены и бактерии. Профессиональная химчистка включает:
              </p>
              <ul>
                <li>Глубокую очистку ворса</li>
                <li>Удаление застарелых пятен</li>
                <li>Антибактериальную обработку</li>
                <li>Защиту от повторного загрязнения</li>
              </ul>

              <h3>Химчистка матрасов</h3>
              <p>
                Матрас — это место, где мы проводим треть жизни. Регулярная химчистка матраса:
              </p>
              <ul>
                <li>Удаляет пылевых клещей</li>
                <li>Устраняет неприятные запахи</li>
                <li>Продлевает срок службы</li>
                <li>Улучшает качество сна</li>
              </ul>

              <h3>Химчистка стульев</h3>
              <p>
                Обивка стульев требует особого внимания, особенно в ресторанах и офисах:
              </p>
              <ul>
                <li>Очистка от жирных пятен</li>
                <li>Удаление следов от кофе и чая</li>
                <li>Восстановление цвета</li>
                <li>Защитная пропитка</li>
              </ul>

              <h3>Химчистка штор</h3>
              <p>
                Шторы собирают пыль и могут потерять цвет. Профессиональная химчистка:
              </p>
              <ul>
                <li>Восстанавливает яркость цветов</li>
                <li>Удаляет пыль и аллергены</li>
                <li>Сохраняет форму и структуру</li>
                <li>Добавляет защитные свойства</li>
              </ul>

              <h2>Процесс химчистки</h2>

              <h3>1. Диагностика</h3>
              <p>
                Наши мастера сначала оценивают состояние изделия, определяют тип ткани и загрязнений.
              </p>

              <h3>2. Подготовка</h3>
              <p>
                Изделие подготавливается к очистке: удаляется поверхностная пыль, определяются проблемные зоны.
              </p>

              <h3>3. Очистка</h3>
              <p>
                Используется профессиональное оборудование и специальные средства для глубокой очистки.
              </p>

              <h3>4. Сушка</h3>
              <p>
                Правильная сушка предотвращает появление плесени и неприятных запахов.
              </p>

              <h3>5. Защита</h3>
              <p>
                Наносится защитная пропитка для продления эффекта очистки.
              </p>

              <h2>Преимущества профессиональной химчистки</h2>
              <ul>
                <li><strong>Глубокое очищение:</strong> удаление загрязнений из глубины волокон</li>
                <li><strong>Безопасность:</strong> использование экологичных средств</li>
                <li><strong>Сохранение качества:</strong> изделия не теряют форму и цвет</li>
                <li><strong>Антибактериальный эффект:</strong> уничтожение микробов и клещей</li>
                <li><strong>Долговечность:</strong> продление срока службы изделий</li>
              </ul>

              <h2>Когда нужна химчистка?</h2>
              <ul>
                <li>Регулярное обслуживание (2-3 раза в год)</li>
                <li>После ремонта или переезда</li>
                <li>При появлении пятен и загрязнений</li>
                <li>Для устранения неприятных запахов</li>
                <li>При аллергии на пыль и клещей</li>
                <li>Перед продажей недвижимости</li>
              </ul>

              <h2>Оборудование и средства</h2>
              <p>
                Мы используем современное профессиональное оборудование:
              </p>
              <ul>
                <li>Экстракторы для глубокой очистки</li>
                <li>Парогенераторы для дезинфекции</li>
                <li>Специальные щетки и насадки</li>
                <li>Профессиональные химические средства</li>
                <li>Оборудование для сушки</li>
              </ul>

              <div className="bg-primary-50 rounded-xl p-6 mt-8">
                <h3 className="text-xl font-semibold text-primary-900 mb-4">
                  Профессиональный совет
                </h3>
                <p className="text-primary-800">
                  Регулярная химчистка мягкой мебели не только улучшает внешний вид, но и создает здоровую среду в доме. Особенно важно для семей с детьми и аллергиков.
                </p>
              </div>

              <h2>Почему выбирают K-lining для химчистки?</h2>
              <ul>
                <li>Опытные мастера с сертификатами</li>
                <li>Современное профессиональное оборудование</li>
                <li>Качественные химические средства</li>
                <li>Гарантия на все виды работ</li>
                <li>Выезд в день заказа</li>
                <li>Конкурентные цены</li>
              </ul>

              <h2>Заключение</h2>
              <p>
                Профессиональная химчистка — это инвестиция в комфорт и здоровье вашей семьи. Доверьте эту работу экспертам K-lining и наслаждайтесь чистотой и свежестью в вашем доме!
              </p>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-8 mt-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">
                Нужна химчистка?
              </h3>
              <p className="text-primary-100 mb-6">
                Наши мастера профессионально очистят вашу мебель и текстиль
              </p>
              <Link 
                href="/contacts" 
                className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Заказать химчистку
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