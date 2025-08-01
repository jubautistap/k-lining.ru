import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'График уборки офиса: что и когда чистить | Блог KliningPro',
  description: 'Оптимальный план уборки для офисных помещений. Ежедневные и еженедельные задачи. Уборка офисов, график уборки, профессиональная уборка офисов, клининг офисов.',
  keywords: 'уборка офисов, график уборки офиса, профессиональная уборка офисов, клининг офисов, уборка офисных помещений, ежедневная уборка офиса, еженедельная уборка офиса',
  openGraph: {
    title: 'График уборки офиса: что и когда чистить',
    description: 'Оптимальный план уборки для офисных помещений. Ежедневные и еженедельные задачи.',
    url: 'https://k-lining.ru/blog/office-cleaning-schedule',
    siteName: 'KliningPro',
    images: [{ url: '/blog/office-cleaning.jpg', width: 1200, height: 630, alt: 'Уборка офисов' }],
    locale: 'ru_RU',
    type: 'article',
    publishedTime: '2024-12-15T10:00:00Z',
    modifiedTime: '2024-12-15T10:00:00Z',
    authors: ['KliningPro'],
    tags: ['уборка офисов', 'график уборки', 'клининг офисов', 'профессиональная уборка']
  },
  twitter: {
    card: 'summary_large_image',
    title: 'График уборки офиса: что и когда чистить',
    description: 'Оптимальный план уборки для офисных помещений',
    images: ['/blog/office-cleaning.jpg'],
  },
  alternates: {
    canonical: 'https://k-lining.ru/blog/office-cleaning-schedule',
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

export default function OfficeCleaningSchedulePage() {
  return (
    <div className="section-padding bg-gradient-to-br from-gray-50 to-white">
      <div className="container-custom">
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-primary-600">Главная</Link></li>
            <li>/</li>
            <li><Link href="/blog" className="hover:text-primary-600">Блог</Link></li>
            <li>/</li>
            <li className="text-gray-900">Офисная уборка</li>
          </ol>
        </nav>

        <div className="mb-12">
          <span className="inline-block bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            Офисная уборка
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            График уборки офиса: что и когда чистить
          </h1>
          <div className="flex items-center space-x-4 text-gray-500 mb-6">
            <span>📅 15 декабря 2024</span>
            <span>⏱️ 6 мин чтения</span>
            <span>👁️ 2,341 просмотров</span>
          </div>
          <p className="text-xl text-gray-600 leading-relaxed">
            Правильно организованная уборка офиса повышает продуктивность сотрудников и создает 
            приятную рабочую атмосферу. Мы составили оптимальный график уборки для офисных помещений.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <article className="prose prose-lg max-w-none">
              <h2>Почему важен график уборки?</h2>
              <p>
                Регулярная уборка офиса не только поддерживает чистоту, но и влияет на:
              </p>
              <ul>
                <li>Здоровье сотрудников</li>
                <li>Продуктивность работы</li>
                <li>Имидж компании</li>
                <li>Срок службы мебели и оборудования</li>
              </ul>

              <h2>Ежедневные задачи</h2>
              
              <h3>Утренняя уборка (7:00-9:00)</h3>
              <ul>
                <li><strong>Влажная уборка полов</strong> во всех помещениях</li>
                <li><strong>Протирка рабочих столов</strong> и оргтехники</li>
                <li><strong>Очистка мусорных корзин</strong> и замена пакетов</li>
                <li><strong>Проветривание помещений</strong></li>
                <li><strong>Проверка туалетных комнат</strong> и пополнение расходников</li>
              </ul>

              <h3>Дневная уборка (13:00-14:00)</h3>
              <ul>
                <li><strong>Быстрая протирка</strong> кухонных поверхностей</li>
                <li><strong>Очистка обеденных зон</strong></li>
                <li><strong>Проверка туалетов</strong></li>
                <li><strong>Уборка мусора</strong> из корзин</li>
              </ul>

              <h3>Вечерняя уборка (18:00-20:00)</h3>
              <ul>
                <li><strong>Генеральная уборка</strong> всех помещений</li>
                <li><strong>Дезинфекция</strong> дверных ручек и выключателей</li>
                <li><strong>Очистка ковров</strong> пылесосом</li>
                <li><strong>Проветривание</strong> всех кабинетов</li>
                <li><strong>Проверка освещения</strong> и кондиционеров</li>
              </ul>

              <h2>Еженедельные задачи</h2>

              <h3>Понедельник</h3>
              <ul>
                <li><strong>Глубокая уборка</strong> кухонной зоны</li>
                <li><strong>Мытье окон</strong> в переговорных</li>
                <li><strong>Очистка оргтехники</strong> от пыли</li>
              </ul>

              <h3>Вторник</h3>
              <ul>
                <li><strong>Уборка ресепшена</strong> и зоны ожидания</li>
                <li><strong>Очистка растений</strong> и полив</li>
                <li><strong>Проверка запасов</strong> моющих средств</li>
              </ul>

              <h3>Среда</h3>
              <ul>
                <li><strong>Уборка кабинетов руководства</strong></li>
                <li><strong>Очистка конференц-залов</strong></li>
                <li><strong>Дезинфекция</strong> общих зон</li>
              </ul>

              <h3>Четверг</h3>
              <ul>
                <li><strong>Уборка технических помещений</strong></li>
                <li><strong>Очистка систем вентиляции</strong></li>
                <li><strong>Проверка пожарной безопасности</strong></li>
              </ul>

              <h3>Пятница</h3>
              <ul>
                <li><strong>Генеральная уборка</strong> всего офиса</li>
                <li><strong>Химчистка ковров</strong> (при необходимости)</li>
                <li><strong>Замена фильтров</strong> кондиционеров</li>
              </ul>

              <h2>Ежемесячные задачи</h2>
              <ul>
                <li><strong>Мытье всех окон</strong> в офисе</li>
                <li><strong>Глубокая очистка</strong> систем вентиляции</li>
                <li><strong>Химчистка мебели</strong> и ковров</li>
                <li><strong>Дезинсекция</strong> (при необходимости)</li>
                <li><strong>Проверка и обслуживание</strong> клинингового оборудования</li>
              </ul>

              <h2>Специальные зоны офиса</h2>

              <h3>Кухонная зона</h3>
              <p>
                <strong>Ежедневно:</strong> мытье посуды, протирка столов, очистка микроволновки<br/>
                <strong>Еженедельно:</strong> мытье холодильника, очистка кофемашины<br/>
                <strong>Ежемесячно:</strong> дезинфекция всех поверхностей
              </p>

              <h3>Туалетные комнаты</h3>
              <p>
                <strong>Ежедневно:</strong> дезинфекция, пополнение расходников<br/>
                <strong>Еженедельно:</strong> глубокая очистка сантехники<br/>
                <strong>Ежемесячно:</strong> замена освежителей воздуха
              </p>

              <h3>Рабочие места</h3>
              <p>
                <strong>Ежедневно:</strong> протирка столов, очистка оргтехники<br/>
                <strong>Еженедельно:</strong> дезинфекция клавиатур и мышей<br/>
                <strong>Ежемесячно:</strong> очистка мониторов и экранов
              </p>

              <h2>Контроль качества</h2>
              <ul>
                <li><strong>Ежедневный осмотр</strong> всех помещений</li>
                <li><strong>Проверка запахов</strong> и свежести воздуха</li>
                <li><strong>Контроль расходников</strong> (мыло, бумага)</li>
                <li><strong>Отчеты о выполненных работах</strong></li>
                <li><strong>Обратная связь</strong> от сотрудников</li>
              </ul>

              <h2>Советы по организации</h2>
              <p>
                <strong>Совет 1:</strong> Составьте чек-листы для каждого типа уборки<br/>
                <strong>Совет 2:</strong> Используйте цветовое кодирование для разных зон<br/>
                <strong>Совет 3:</strong> Обучите персонал правилам уборки<br/>
                <strong>Совет 4:</strong> Ведите журнал уборки с подписями<br/>
                <strong>Совет 5:</strong> Регулярно обновляйте график по необходимости
              </p>

              <div className="bg-primary-50 rounded-xl p-6 my-8">
                <h3 className="text-xl font-bold text-primary-900 mb-4">
                  📋 Важно помнить
                </h3>
                <ul className="space-y-2 text-primary-800">
                  <li>• Адаптируйте график под специфику вашего офиса</li>
                  <li>• Учитывайте количество сотрудников и площадь помещений</li>
                  <li>• Используйте профессиональные моющие средства</li>
                  <li>• Обеспечьте безопасность клинеров</li>
                  <li>• Регулярно обновляйте оборудование для уборки</li>
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
                  <div className="font-semibold text-gray-900">Команда KliningPro</div>
                  <div className="text-sm text-gray-500">Профессиональные клинеры</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Нужна помощь?</h3>
              <p className="text-gray-600 mb-4">
                Закажите профессиональную уборку офиса
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