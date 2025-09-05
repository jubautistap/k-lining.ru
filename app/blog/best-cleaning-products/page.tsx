import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Топ-10 профессиональных средств для уборки 2025 года | Блог K-lining',
  description: 'Лучшие средства для уборки 2025: профессиональная и экологичная химия для дома и офиса. Обзор брендов и рекомендации от K-lining ✓',
  keywords: 'средства для уборки, профессиональная химия, чистящие средства, уборка квартиры, клининг средства, лучшие средства уборки, профессиональная химия клининг, средства для химчистки, уборка офисов средства',
  openGraph: {
    title: 'Топ-10 профессиональных средств для уборки 2025 года',
    description: 'Обзор лучших чистящих средств от профессионалов клининга. Что действительно работает, а что нет.',
    url: 'https://k-lining.ru/blog/best-cleaning-products',
    siteName: 'K-lining',
    images: [{ url: '/blog/cleaning-tools.jpg', width: 1200, height: 630, alt: 'Средства для уборки' }],
    locale: 'ru_RU',
    type: 'article',
    publishedTime: '2025-01-10T10:00:00Z',
    modifiedTime: '2025-01-10T10:00:00Z',
    authors: ['K-lining'],
    tags: ['средства для уборки', 'профессиональная химия', 'клининг', 'уборка квартир']
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Топ-10 профессиональных средств для уборки 2025 года',
    description: 'Обзор лучших чистящих средств от профессионалов клининга',
    images: ['/blog/cleaning-tools.jpg'],
  },
  alternates: {
    canonical: 'https://k-lining.ru/blog/best-cleaning-products',
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

export default function BestCleaningProductsPage() {
  return (
    <>
      {/* BlogPosting Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
      __html: JSON.stringify({
            "@context": "https://schema.org",
        "@type": "BlogPosting",
            "headline": "Топ-10 профессиональных средств для уборки",
            "description": "Обзор лучших чистящих средств от профессионалов клининга. Что действительно работает, а что нет.",
            "image": "https://k-lining.ru/blog/cleaning-products.jpg",
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
            "datePublished": "2025-01-10",
            "dateModified": "2025-01-10",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://k-lining.ru/blog/best-cleaning-products"
            },
            "articleSection": "Советы",
            "keywords": "средства для уборки, профессиональная химия, чистящие средства",
            "wordCount": "1500",
            "timeRequired": "PT7M",
            "inLanguage": "ru-RU"
          })
        }}
      />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Главная",
                "item": "https://k-lining.ru"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Блог",
                "item": "https://k-lining.ru/blog"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Средства для уборки",
                "item": "https://k-lining.ru/blog/best-cleaning-products"
              }
            ]
          })
        }}
      />

      <div className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="container-custom">
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
              <li><Link href="/" className="hover:text-primary-600">Главная</Link></li>
              <li>/</li>
              <li><Link href="/blog" className="hover:text-primary-600">Блог</Link></li>
              <li>/</li>
              <li className="text-gray-900">Средства для уборки</li>
            </ol>
          </nav>

          <div className="mb-12">
            <span className="inline-block bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              Советы
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Топ-10 профессиональных средств для уборки
            </h1>
            <div className="flex items-center space-x-4 text-gray-500 mb-6">
              <span>10 января 2025</span>
              <span>7 мин чтения</span>
              <span>2,156 просмотров</span>
            </div>
            <p className="text-xl text-gray-600 leading-relaxed">
              Какие средства действительно работают, а какие — пустая трата денег? 
              Мы протестировали десятки продуктов и отобрали лучшие для разных задач.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <article className="prose prose-lg max-w-none">
                <h2>Как мы выбирали лучшие средства</h2>
                <p>
                  Наша команда протестировала более 50 различных чистящих средств 
                  на реальных объектах. Мы оценивали эффективность, безопасность, 
                  экономичность и удобство использования.
                </p>

                <h2>1. Универсальный очиститель Cif Power & Shine</h2>
                <p>
                  <strong>Лучший выбор для:</strong> кухонных поверхностей, ванной, кафеля<br/>
                  <strong>Цена:</strong> 150-200 ₽ за 750 мл<br/>
                  <strong>Почему в топе:</strong> Отлично справляется с жиром, не оставляет разводов, 
                  экономично расходуется. Подходит для большинства поверхностей.
                </p>

                <h2>2. Средство для стекла Clin</h2>
                <p>
                  <strong>Лучший выбор для:</strong> окон, зеркал, стеклянных поверхностей<br/>
                  <strong>Цена:</strong> 120-150 ₽ за 500 мл<br/>
                  <strong>Почему в топе:</strong> Не оставляет разводов, быстро сохнет, 
                  эффективно удаляет отпечатки пальцев и брызги.
                </p>

                <h2>3. Порошок для полов Vanish</h2>
                <p>
                  <strong>Лучший выбор для:</strong> линолеума, ламината, паркета<br/>
                  <strong>Цена:</strong> 80-120 ₽ за 1 кг<br/>
                  <strong>Почему в топе:</strong> Безопасен для всех типов полов, 
                  не оставляет белых следов, придает блеск.
                </p>

                <h2>4. Средство для сантехники Domestos</h2>
                <p>
                  <strong>Лучший выбор для:</strong> унитаза, раковины, ванны<br/>
                  <strong>Цена:</strong> 200-250 ₽ за 1 л<br/>
                  <strong>Почему в топе:</strong> Убивает 99.9% бактерий, 
                  удаляет известковый налет, дезинфицирует поверхности.
                </p>

                <h2>5. Очиститель для духовки Amway</h2>
                <p>
                  <strong>Лучший выбор для:</strong> духовки, микроволновки, гриля<br/>
                  <strong>Цена:</strong> 800-1200 ₽ за 500 мл<br/>
                  <strong>Почему в топе:</strong> Справляется с застарелым жиром, 
                  безопасен для металлических поверхностей.
                </p>

                <h2>6. Средство для ковров Vanish</h2>
                <p>
                  <strong>Лучший выбор для:</strong> ковров, диванов, мягкой мебели<br/>
                  <strong>Цена:</strong> 300-400 ₽ за 500 мл<br/>
                  <strong>Почему в топе:</strong> Удаляет пятна, освежает ткань, 
                  не оставляет следов после высыхания.
                </p>

                <h2>7. Очиститель для мебели Pledge</h2>
                <p>
                  <strong>Лучший выбор для:</strong> деревянной мебели, ламината<br/>
                  <strong>Цена:</strong> 200-250 ₽ за 500 мл<br/>
                  <strong>Почему в топе:</strong> Очищает и полирует одновременно, 
                  защищает от пыли, придает блеск.
                </p>

                <h2>8. Средство для посуды Fairy</h2>
                <p>
                  <strong>Лучший выбор для:</strong> посуды, кастрюль, сковородок<br/>
                  <strong>Цена:</strong> 100-150 ₽ за 650 мл<br/>
                  <strong>Почему в топе:</strong> Экономично расходуется, 
                  хорошо пенится, безопасно для рук.
                </p>

                <h2>9. Очиститель для металла Brasso</h2>
                <p>
                  <strong>Лучший выбор для:</strong> нержавеющей стали, хрома, меди<br/>
                  <strong>Цена:</strong> 300-400 ₽ за 200 мл<br/>
                  <strong>Почему в топе:</strong> Восстанавливает блеск металла, 
                  удаляет окисление, защищает от коррозии.
                </p>

                <h2>10. Эко-средство BioMio</h2>
                <p>
                  <strong>Лучший выбор для:</strong> аллергиков, детских комнат<br/>
                  <strong>Цена:</strong> 200-300 ₽ за 500 мл<br/>
                  <strong>Почему в топе:</strong> Безопасно для детей и животных, 
                  биоразлагаемое, эффективно очищает.
                </p>

                <h2>Советы по использованию</h2>
                <ul>
                  <li>Всегда читайте инструкцию на упаковке</li>
                  <li>Тестируйте новые средства на незаметном участке</li>
                  <li>Не смешивайте разные средства</li>
                  <li>Храните в недоступном для детей месте</li>
                  <li>Используйте защитные перчатки при работе с агрессивными средствами</li>
                </ul>

                <div className="bg-primary-50 rounded-xl p-6 my-8">
                  <h3 className="text-xl font-bold text-primary-900 mb-4">
                    Профессиональный совет
                  </h3>
                  <p className="text-primary-800">
                    Лучше купить одно качественное средство, чем пять дешевых. 
                    Профессиональная химия окупается экономией времени и лучшим результатом.
                  </p>
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
                  Закажите профессиональную уборку с качественными средствами
                </p>
                <Link href="/calculator" className="btn-primary w-full text-center">
                  Рассчитать стоимость
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 