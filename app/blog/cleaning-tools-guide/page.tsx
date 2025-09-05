import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Инструменты для уборки: полный гид профессионала | Блог K-lining',
  description: 'Полный гид по инструментам для профессиональной уборки. Лучшие инструменты для уборки квартир, офисов. Инструменты для клининга, профессиональное оборудование для уборки.',
  keywords: 'инструменты для уборки, профессиональные инструменты уборки, оборудование для клининга, инструменты клининга, профессиональная уборка инструменты, пылесосы для уборки, швабры, губки',
  openGraph: {
    title: 'Инструменты для уборки: полный гид профессионала',
    description: 'Полный гид по инструментам для профессиональной уборки. Лучшие инструменты для уборки квартир, офисов.',
    url: 'https://k-lining.ru/blog/cleaning-tools-guide',
    siteName: 'K-lining',
    images: [{ url: '/blog/cleaning-tools.jpg', width: 1200, height: 630, alt: 'Инструменты для уборки' }],
    locale: 'ru_RU',
    type: 'article',
    publishedTime: '2024-12-10T10:00:00Z',
    modifiedTime: '2024-12-10T10:00:00Z',
    authors: ['K-lining'],
    tags: ['инструменты для уборки', 'профессиональные инструменты', 'оборудование клининга', 'инструменты клининга']
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Инструменты для уборки: полный гид профессионала',
    description: 'Полный гид по инструментам для профессиональной уборки',
    images: ['/blog/cleaning-tools.jpg'],
  },
  alternates: {
    canonical: 'https://k-lining.ru/blog/cleaning-tools-guide',
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

export default function CleaningToolsGuidePage() {
  return (
    <div className="section-padding bg-gradient-to-br from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "Инструменты для уборки: полный гид профессионала",
            "description": "Полный гид по инструментам для профессиональной уборки: пылесосы, швабры, пароочистители и другое оборудование.",
            "image": ["https://k-lining.ru/blog/cleaning-tools.jpg"],
            "author": { "@type": "Organization", "name": "K-lining", "url": "https://k-lining.ru" },
            "publisher": { "@type": "Organization", "name": "K-lining", "logo": { "@type": "ImageObject", "url": "https://k-lining.ru/logo.png" } },
            "datePublished": new Date().toISOString().split('T')[0],
            "dateModified": new Date().toISOString().split('T')[0],
            "mainEntityOfPage": { "@type": "WebPage", "@id": "https://k-lining.ru/blog/cleaning-tools-guide" },
            "inLanguage": "ru-RU"
          })
        }}
      />
      <div className="container-custom">
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-primary-600">Главная</Link></li>
            <li>/</li>
            <li><Link href="/blog" className="hover:text-primary-600">Блог</Link></li>
            <li>/</li>
            <li className="text-gray-900">Инструменты</li>
          </ol>
        </nav>

        <div className="mb-12">
          <span className="inline-block bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            Инструменты
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Профессиональные инструменты для уборки
          </h1>
          <div className="flex items-center space-x-4 text-gray-500 mb-6">
            <span>12 января 2025</span>
            <span>7 мин чтения</span>
            <span>1,567 просмотров</span>
          </div>
          <p className="text-xl text-gray-600 leading-relaxed">
            Качественные инструменты — залог эффективной уборки. Мы расскажем о лучшем 
            оборудовании, которое используют профессионалы клининга.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <article className="prose prose-lg max-w-none">
              <h2>Почему важны качественные инструменты?</h2>
              <p>
                Профессиональные инструменты для уборки обеспечивают:
              </p>
              <ul>
                <li>Высокую эффективность работы</li>
                <li>Экономию времени и сил</li>
                <li>Лучшее качество результата</li>
                <li>Долговечность и надежность</li>
                <li>Безопасность для поверхностей</li>
              </ul>

              <h2>Основные категории инструментов</h2>
              
              <h3>1. Пылесосы</h3>
              <p>
                <strong>Мощные пылесосы:</strong> для больших площадей<br/>
                <strong>Пылесосы с HEPA-фильтром:</strong> для аллергиков<br/>
                <strong>Водные пылесосы:</strong> для влажной уборки<br/>
                <strong>Роботы-пылесосы:</strong> для поддержания чистоты
              </p>

              <h3>2. Швабры и мопы</h3>
              <p>
                <strong>Микрофибра:</strong> для деликатных поверхностей<br/>
                <strong>Хлопковые:</strong> для влажной уборки<br/>
                <strong>Спиннеры:</strong> для быстрого отжима<br/>
                <strong>Телескопические:</strong> для высоких помещений
              </p>

              <h3>3. Щетки и скребки</h3>
              <p>
                <strong>Универсальные щетки:</strong> для разных поверхностей<br/>
                <strong>Скребки для окон:</strong> без разводов<br/>
                <strong>Щетки для сантехники:</strong> специальные формы<br/>
                <strong>Щетки для ковров:</strong> глубокой очистки
              </p>

              <h2>Профессиональное оборудование</h2>

              <h3>Поломоечные машины</h3>
              <ul>
                <li><strong>Ручные:</strong> для небольших помещений</li>
                <li><strong>Самоходные:</strong> для больших площадей</li>
                <li><strong>Комбинированные:</strong> мытье и сушка</li>
                <li><strong>Роботы:</strong> автоматическая уборка</li>
              </ul>

              <h3>Пароочистители</h3>
              <ul>
                <li><strong>Бытовые:</strong> для домашнего использования</li>
                <li><strong>Профессиональные:</strong> для коммерческих объектов</li>
                <li><strong>Многофункциональные:</strong> с насадками</li>
                <li><strong>Портативные:</strong> для труднодоступных мест</li>
              </ul>

              <h3>Экстракторы</h3>
              <ul>
                <li><strong>Для ковров:</strong> глубокая очистка</li>
                <li><strong>Для мебели:</strong> химчистка</li>
                <li><strong>Портативные:</strong> для небольших объектов</li>
                <li><strong>Промышленные:</strong> для больших объемов</li>
              </ul>

              <h2>Специализированные инструменты</h2>

              <h3>Для мытья окон</h3>
              <ul>
                <li><strong>Стеклоочистители:</strong> профессиональные</li>
                <li><strong>Телескопические штанги:</strong> для высоты</li>
                <li><strong>Скребки:</strong> для засохших загрязнений</li>
                <li><strong>Микрофибра:</strong> без разводов</li>
              </ul>

              <h3>Для сантехники</h3>
              <ul>
                <li><strong>Щетки для унитазов:</strong> специальные формы</li>
                <li><strong>Скребки для накипи:</strong> металлические</li>
                <li><strong>Ершики:</strong> для труб</li>
                <li><strong>Губки:</strong> абразивные и мягкие</li>
              </ul>

              <h3>Для кухни</h3>
              <ul>
                <li><strong>Щетки для духовки:</strong> термостойкие</li>
                <li><strong>Скребки для жира:</strong> металлические</li>
                <li><strong>Губки для посуды:</strong> многослойные</li>
                <li><strong>Ершики:</strong> для бутылок</li>
              </ul>

              <h2>Выбор инструментов по типу поверхности</h2>

              <h3>Паркет и ламинат</h3>
              <p>
                <strong>Инструменты:</strong> мягкие швабры, микрофибра<br/>
                <strong>Средства:</strong> специальные для дерева<br/>
                <strong>Техника:</strong> без избытка воды
              </p>

              <h3>Плитка и кафель</h3>
              <p>
                <strong>Инструменты:</strong> жесткие щетки, скребки<br/>
                <strong>Средства:</strong> щелочные растворы<br/>
                <strong>Техника:</strong> механическая очистка
              </p>

              <h3>Ковры и паласы</h3>
              <p>
                <strong>Инструменты:</strong> пылесосы, экстракторы<br/>
                <strong>Средства:</strong> пенные очистители<br/>
                <strong>Техника:</strong> глубокая очистка
              </p>

              <h2>Уход за инструментами</h2>

              <h3>Ежедневный уход</h3>
              <ul>
                <li>Промывка после использования</li>
                <li>Просушка в проветриваемом месте</li>
                <li>Проверка целостности</li>
                <li>Замена изношенных частей</li>
              </ul>

              <h3>Еженедельный уход</h3>
              <ul>
                <li>Дезинфекция инструментов</li>
                <li>Проверка работоспособности</li>
                <li>Заточка режущих кромок</li>
                <li>Смазка подвижных частей</li>
              </ul>

              <h2>Безопасность при работе</h2>
              <ul>
                <li><strong>Защитные перчатки:</strong> от химикатов</li>
                <li><strong>Респираторы:</strong> от пыли</li>
                <li><strong>Очки:</strong> от брызг</li>
                <li><strong>Обувь:</strong> нескользящая</li>
                <li><strong>Одежда:</strong> рабочая униформа</li>
              </ul>

              <h2>Экономия на инструментах</h2>

              <h3>Что можно сэкономить</h3>
              <ul>
                <li>Покупка оптом</li>
                <li>Выбор универсальных инструментов</li>
                <li>Правильный уход продлевает срок службы</li>
                <li>Ремонт вместо замены</li>
              </ul>

              <h3>На чем не стоит экономить</h3>
              <ul>
                <li>Качество основных инструментов</li>
                <li>Безопасность оборудования</li>
                <li>Сертифицированные средства</li>
                <li>Профессиональное обучение</li>
              </ul>

              <h2>Топ-10 обязательных инструментов</h2>
              <ol>
                <li><strong>Мощный пылесос</strong> с HEPA-фильтром</li>
                <li><strong>Швабра из микрофибры</strong> с телескопической ручкой</li>
                <li><strong>Стеклоочиститель</strong> профессиональный</li>
                <li><strong>Набор щеток</strong> разной жесткости</li>
                <li><strong>Пароочиститель</strong> для дезинфекции</li>
                <li><strong>Скребки</strong> для разных поверхностей</li>
                <li><strong>Ведро с отжимом</strong> для швабры</li>
                <li><strong>Лестница-стремянка</strong> складная</li>
                <li><strong>Фонарь</strong> для темных углов</li>
                <li><strong>Аптечка</strong> для первой помощи</li>
              </ol>

              <div className="bg-primary-50 rounded-xl p-6 my-8">
                <h3 className="text-xl font-bold text-primary-900 mb-4">
                  Важно помнить
                </h3>
                <ul className="space-y-2 text-primary-800">
                  <li>• Качественные инструменты окупаются эффективностью</li>
                  <li>• Правильный уход продлевает срок службы</li>
                  <li>• Безопасность превыше экономии</li>
                  <li>• Универсальные инструменты экономят место</li>
                  <li>• Профессиональное оборудование требует обучения</li>
                </ul>
              </div>
            </article>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Автор статьи</h3>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">K</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Команда K-lining</div>
                  <div className="text-sm text-gray-500">Профессиональные клинеры</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Нужна помощь?</h3>
              <p className="text-gray-600 mb-4">
                Закажите профессиональную уборку с качественным оборудованием
              </p>
              <Link href="/calculator" className="btn-primary w-full text-center">
                Рассчитать стоимость
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 