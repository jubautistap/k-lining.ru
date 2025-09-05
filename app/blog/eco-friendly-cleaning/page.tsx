import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Экологичная уборка: натуральные средства без химии | Блог K-lining',
  description: 'Экологичная уборка без химии: натуральные средства, безопасные рецепты для дома. Эко-клининг для детей и аллергиков. Полезные советы ✓',
  keywords: 'экологичная уборка, натуральные средства, уборка без химии, эко клининг, безопасная уборка, уборка для аллергиков, натуральные чистящие средства, уборка с содой, уборка с уксусом',
  openGraph: {
    title: 'Экологичная уборка: натуральные средства без химии',
    description: 'Как убирать дом без химии и вреда для здоровья. Натуральные средства для чистоты.',
    url: 'https://k-lining.ru/blog/eco-friendly-cleaning',
    siteName: 'K-lining',
    images: [{ url: '/blog/eco-cleaning.jpg', width: 1200, height: 630, alt: 'Экологичная уборка' }],
    locale: 'ru_RU',
    type: 'article',
    publishedTime: '2024-12-20T10:00:00Z',
    modifiedTime: '2024-12-20T10:00:00Z',
    authors: ['K-lining'],
    tags: ['экологичная уборка', 'натуральные средства', 'эко клининг', 'безопасная уборка']
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Экологичная уборка: натуральные средства без химии',
    description: 'Как убирать дом без химии и вреда для здоровья',
    images: ['/blog/eco-cleaning.jpg'],
  },
  alternates: {
    canonical: 'https://k-lining.ru/blog/eco-friendly-cleaning',
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

export default function EcoFriendlyCleaningPage() {
  return (
    <div className="section-padding bg-gradient-to-br from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "Экологичная уборка: натуральные средства без химии",
            "description": "Как убирать дом без химии и вреда для здоровья. Натуральные средства для чистоты.",
            "image": ["https://k-lining.ru/blog/eco-cleaning.jpg"],
            "author": { "@type": "Organization", "name": "K-lining", "url": "https://k-lining.ru" },
            "publisher": { "@type": "Organization", "name": "K-lining", "logo": { "@type": "ImageObject", "url": "https://k-lining.ru/logo.png" } },
            "datePublished": new Date().toISOString().split('T')[0],
            "dateModified": new Date().toISOString().split('T')[0],
            "mainEntityOfPage": { "@type": "WebPage", "@id": "https://k-lining.ru/blog/eco-friendly-cleaning" },
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
            <li className="text-gray-900">Эко-уборка</li>
          </ol>
        </nav>

        <div className="mb-12">
          <span className="inline-block bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            Эко-уборка
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Экологичная уборка: безопасно и эффективно
          </h1>
          <div className="flex items-center space-x-4 text-gray-500 mb-6">
            <span>20 декабря 2024</span>
            <span>8 мин чтения</span>
            <span>1,856 просмотров</span>
          </div>
          <p className="text-xl text-gray-600 leading-relaxed">
            Химические средства могут быть эффективными, но они вредны для здоровья и окружающей среды. 
            Мы расскажем, как убирать экологично, используя натуральные ингредиенты.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <article className="prose prose-lg max-w-none">
              <h2>Почему стоит перейти на экологичную уборку?</h2>
              <p>
                Современные химические средства содержат множество вредных веществ: фосфаты, 
                хлор, аммиак, формальдегид. Эти вещества могут вызывать аллергию, 
                раздражение дыхательных путей и даже серьезные заболевания.
              </p>

              <h2>Натуральные средства для уборки</h2>
              
              <h3>1. Пищевая сода</h3>
              <p>
                <strong>Применение:</strong> чистка раковин, ванн, духовок, удаление запахов<br/>
                <strong>Как использовать:</strong> смешайте с водой до пастообразного состояния<br/>
                <strong>Эффективность:</strong> отлично удаляет жир и налет
              </p>

              <h3>2. Уксус</h3>
              <p>
                <strong>Применение:</strong> дезинфекция, удаление накипи, чистка стекол<br/>
                <strong>Как использовать:</strong> разведите 1:1 с водой<br/>
                <strong>Эффективность:</strong> убивает 99% бактерий
              </p>

              <h3>3. Лимонная кислота</h3>
              <p>
                <strong>Применение:</strong> удаление накипи, чистка металлических поверхностей<br/>
                <strong>Как использовать:</strong> 1 чайная ложка на стакан воды<br/>
                <strong>Эффективность:</strong> растворяет известковые отложения
              </p>

              <h3>4. Хозяйственное мыло</h3>
              <p>
                <strong>Применение:</strong> стирка, мытье полов, чистка тканей<br/>
                <strong>Как использовать:</strong> натереть на терке и растворить в воде<br/>
                <strong>Эффективность:</strong> безопасно для всех поверхностей
              </p>

              <h2>Рецепты экологичных чистящих средств</h2>

              <h3>Универсальный очиститель</h3>
              <ul>
                <li>1 стакан уксуса</li>
                <li>1 стакан воды</li>
                <li>10 капель эфирного масла (лимон, лаванда)</li>
                <li>1 столовая ложка соды</li>
              </ul>

              <h3>Средство для стекол</h3>
              <ul>
                <li>1/4 стакана уксуса</li>
                <li>1/4 стакана медицинского спирта</li>
                <li>1 стакан воды</li>
                <li>1 столовая ложка кукурузного крахмала</li>
              </ul>

              <h3>Дезинфицирующее средство</h3>
              <ul>
                <li>1 стакан перекиси водорода (3%)</li>
                <li>1 стакан воды</li>
                <li>10 капель эфирного масла чайного дерева</li>
              </ul>

              <h2>Экологичная уборка по комнатам</h2>

              <h3>Кухня</h3>
              <p>
                <strong>Раковина:</strong> сода + уксус<br/>
                <strong>Духовка:</strong> сода + перекись водорода<br/>
                <strong>Холодильник:</strong> уксус + вода<br/>
                <strong>Микроволновка:</strong> лимон + вода
              </p>

              <h3>Ванная комната</h3>
              <p>
                <strong>Унитаз:</strong> сода + уксус<br/>
                <strong>Ванна:</strong> сода + перекись водорода<br/>
                <strong>Зеркала:</strong> уксус + вода<br/>
                <strong>Плитка:</strong> сода + хозяйственное мыло
              </p>

              <h3>Гостиная</h3>
              <p>
                <strong>Полы:</strong> уксус + вода + эфирное масло<br/>
                <strong>Мебель:</strong> оливковое масло + лимонный сок<br/>
                <strong>Ковры:</strong> сода + эфирное масло
              </p>

              <h2>Преимущества экологичной уборки</h2>
              <ul>
                <li><strong>Безопасность:</strong> нет вредных испарений</li>
                <li><strong>Экономия:</strong> натуральные средства дешевле</li>
                <li><strong>Эффективность:</strong> не уступают химическим</li>
                <li><strong>Экология:</strong> не загрязняют окружающую среду</li>
                <li><strong>Гипоаллергенность:</strong> подходят для аллергиков</li>
              </ul>

              <h2>Советы профессионалов</h2>
              <p>
                <strong>Совет 1:</strong> Всегда тестируйте новые средства на незаметном участке<br/>
                <strong>Совет 2:</strong> Не смешивайте уксус с отбеливателем<br/>
                <strong>Совет 3:</strong> Используйте эфирные масла для приятного аромата<br/>
                <strong>Совет 4:</strong> Храните средства в недоступном для детей месте
              </p>

              <div className="bg-primary-50 rounded-xl p-6 my-8">
                <h3 className="text-xl font-bold text-primary-900 mb-4">
                  Важно помнить
                </h3>
                <ul className="space-y-2 text-primary-800">
                  <li>• Натуральные средства могут быть менее эффективными на сильных загрязнениях</li>
                  <li>• Регулярная уборка снижает необходимость в агрессивных средствах</li>
                  <li>• Комбинируйте разные методы для лучшего результата</li>
                  <li>• Приучайте детей к экологичной уборке с раннего возраста</li>
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
                Закажите профессиональную экологичную уборку
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