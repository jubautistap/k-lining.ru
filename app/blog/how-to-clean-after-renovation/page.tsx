import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Уборка после ремонта: пошаговое руководство | Блог K-lining',
  description: 'Пошаговое руководство по уборке строительной пыли и мусора после ремонта. Секреты профессионалов. Уборка квартиры после ремонта, очистка от строительной пыли, финальная уборка.',
  keywords: 'уборка после ремонта, уборка квартиры после ремонта, строительная пыль, уборка строительного мусора, финальная уборка, очистка после ремонта, уборка пыли после ремонта, клининг после ремонта',
  openGraph: {
    title: 'Уборка после ремонта: пошаговое руководство',
    description: 'Пошаговое руководство по уборке строительной пыли и мусора после ремонта. Секреты профессионалов.',
    url: 'https://k-lining.ru/blog/how-to-clean-after-renovation',
    siteName: 'K-lining',
    images: [{ url: '/blog/after-renovation.jpg', width: 1200, height: 630, alt: 'Уборка после ремонта' }],
    locale: 'ru_RU',
    type: 'article',
    publishedTime: '2025-01-15T10:00:00Z',
    modifiedTime: '2025-01-15T10:00:00Z',
    authors: ['K-lining'],
    tags: ['уборка после ремонта', 'строительная пыль', 'финальная уборка', 'клининг после ремонта']
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Уборка после ремонта: пошаговое руководство',
    description: 'Пошаговое руководство по уборке строительной пыли и мусора после ремонта',
    images: ['/blog/after-renovation.jpg'],
  },
  alternates: {
    canonical: 'https://k-lining.ru/blog/how-to-clean-after-renovation',
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

export default function BlogPostPage() {
  return (
    <div className="section-padding bg-gradient-to-br from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "Уборка после ремонта: пошаговое руководство",
            "description": "Пошаговый план уборки строительной пыли и мусора после ремонта.",
            "image": ["https://k-lining.ru/blog/after-renovation.jpg"],
            "author": { "@type": "Organization", "name": "K-lining", "url": "https://k-lining.ru" },
            "publisher": { "@type": "Organization", "name": "K-lining", "logo": { "@type": "ImageObject", "url": "https://k-lining.ru/logo.png" } },
            "datePublished": new Date().toISOString().split('T')[0],
            "dateModified": new Date().toISOString().split('T')[0],
            "mainEntityOfPage": { "@type": "WebPage", "@id": "https://k-lining.ru/blog/how-to-clean-after-renovation" },
            "inLanguage": "ru-RU"
          })
        }}
      />
      <div className="container-custom">
        {/* Breadcrumbs */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-primary-600">Главная</Link></li>
            <li>/</li>
            <li><Link href="/blog" className="hover:text-primary-600">Блог</Link></li>
            <li>/</li>
            <li className="text-gray-900">Уборка после ремонта</li>
          </ol>
        </nav>

        {/* Article Header */}
        <div className="mb-12">
          <div className="mb-6">
            <span className="inline-block bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              Уборка после ремонта
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Как правильно убирать после ремонта
            </h1>
            <div className="flex items-center space-x-4 text-gray-500 mb-6">
              <span>15 января 2025</span>
              <span>5 мин чтения</span>
              <span>1,247 просмотров</span>
            </div>
            <p className="text-xl text-gray-600 leading-relaxed">
              Ремонт завершен, но помещение выглядит как после бомбардировки? 
              Не переживайте! Мы расскажем, как правильно убрать строительную пыль и мусор, 
              чтобы ваше жилье засияло чистотой.
            </p>
          </div>

          {/* Featured Image Placeholder */}
          <div className="bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl p-12 text-center mb-8">
            <div className="w-32 h-32 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-white text-4xl"></span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Уборка после ремонта
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Пошаговое руководство от профессионалов клининга
            </p>
          </div>
        </div>

        {/* Article Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <article className="prose prose-lg max-w-none">
              <h2>Почему уборка после ремонта так важна?</h2>
              <p>
                Строительная пыль содержит множество вредных веществ: цемент, гипс, 
                краску, клей и другие материалы. Эта пыль может вызывать аллергию, 
                раздражение дыхательных путей и даже отравления. Поэтому правильная 
                уборка после ремонта — это не просто эстетика, а забота о здоровье.
              </p>

              <h2>Этапы уборки после ремонта</h2>
              
              <h3>1. Подготовка и защита</h3>
              <p>
                Перед началом уборки убедитесь, что все строительные работы завершены. 
                Наденьте защитную одежду, респиратор и перчатки. Откройте окна для 
                проветривания, но закройте двери в другие комнаты.
              </p>

              <h3>2. Удаление крупного мусора</h3>
              <p>
                Сначала соберите крупные обрезки, куски гипсокартона, остатки 
                строительных материалов. Используйте совок и веник для сбора 
                мусора в мешки.
              </p>

              <h3>3. Влажная уборка поверхностей</h3>
              <p>
                Протрите все поверхности влажной тряпкой с моющим средством. 
                Начните с потолка, затем стены, и в последнюю очередь пол. 
                Не забудьте про подоконники и радиаторы.
              </p>

              <h3>4. Мытье окон и дверей</h3>
              <p>
                Окна и двери требуют особого внимания. Используйте специальные 
                средства для стекла и пластика. Не забудьте про фурнитуру и 
                уплотнители.
              </p>

              <h3>5. Финальная полировка</h3>
              <p>
                После основной уборки протрите все поверхности сухой тряпкой 
                для удаления разводов и придания блеска.
              </p>

              <h2>Необходимые инструменты и средства</h2>
              <ul>
                <li><strong>Защитные средства:</strong> респиратор, перчатки, очки</li>
                <li><strong>Инструменты:</strong> веник, совок, швабра, тряпки</li>
                <li><strong>Моющие средства:</strong> универсальный очиститель, средство для стекла</li>
                <li><strong>Мешки для мусора:</strong> прочные, объемные</li>
              </ul>

              <h2>Секреты профессионалов</h2>
              <p>
                <strong>Совет 1:</strong> Используйте пылесос с HEPA-фильтром для 
                удаления мелкой пыли из воздуха.
              </p>
              <p>
                <strong>Совет 2:</strong> Для удаления краски с пола используйте 
                специальные растворители, но сначала протестируйте на незаметном участке.
              </p>
              <p>
                <strong>Совет 3:</strong> Не забудьте про вентиляцию — очистите 
                вентиляционные решетки от пыли.
              </p>

              <h2>Когда лучше обратиться к профессионалам?</h2>
              <p>
                Если площадь ремонта большая, у вас нет времени или опыта, 
                лучше доверить уборку профессионалам. Мы используем специальное 
                оборудование и профессиональные средства, которые справятся с 
                любыми загрязнениями.
              </p>

              <div className="bg-primary-50 rounded-xl p-6 my-8">
                <h3 className="text-xl font-bold text-primary-900 mb-4">
                  Важно помнить
                </h3>
                <ul className="space-y-2 text-primary-800">
                  <li>• Не торопитесь — качественная уборка требует времени</li>
                  <li>• Используйте правильные средства для разных поверхностей</li>
                  <li>• Проветривайте помещение во время и после уборки</li>
                  <li>• При необходимости повторите уборку через несколько дней</li>
                </ul>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Author */}
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

            {/* Related Articles */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Похожие статьи</h3>
              <div className="space-y-4">
                {[
                  { title: 'Топ-10 профессиональных средств для уборки', href: '/blog/best-cleaning-products' },
                  { title: 'Химчистка мебели: полное руководство', href: '/blog/dry-cleaning-guide' },
                  { title: 'Мытье окон: секреты профессионалов', href: '/blog/window-cleaning-tips' }
                ].map((article, index) => (
                  <Link key={index} href={article.href} className="block group">
                    <div className="p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
                        {article.title}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Нужна помощь?</h3>
              <p className="text-gray-600 mb-4">
                Закажите профессиональную уборку после ремонта у нас
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