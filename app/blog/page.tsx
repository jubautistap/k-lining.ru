import { Metadata } from 'next';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema';
import blogIndex from '@/data/blog-index';

export const metadata: Metadata = {
  title: 'Блог о клининге и уборке | Полезные советы от профессионалов K-lining',
    description: 'Полезные статьи о клининге, уборке, химчистке. Советы профессионалов, обзоры средств, секреты чистоты. Уборка квартир, офисов, химчистка мебели, мытьё окон.',
  keywords: 'блог клининга, статьи уборка, советы чистоты, химчистка советы, уборка квартиры, уборка офисов, химчистка мебели, мытье окон, уборка после ремонта, профессиональная уборка',
  openGraph: {
    title: 'Блог о клининге - Полезные статьи о уборке | K-lining',
    description: 'Полезные статьи о профессиональной уборке квартир и офисов. Советы по клинингу, химчистке мебели, мытью окон. Экспертные рекомендации от K-lining.',
    url: 'https://k-lining.ru/blog',
    siteName: 'K-lining',
    images: [
      {
        url: '/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Блог о клининге K-lining',
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Блог о клининге - Полезные статьи о уборке | K-lining',
    description: 'Полезные статьи о профессиональной уборке квартир и офисов. Советы по клинингу от экспертов K-lining.',
          images: ['/og-image.webp'],
  },
  alternates: {
    canonical: 'https://k-lining.ru/blog',
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

const blogPosts = blogIndex;

export default function BlogPage() {
  return (
    <div className="section-padding bg-gradient-to-br from-gray-50 to-white">
      {/* FAQ Schema для rich snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Как часто выходят новые статьи в блоге?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Мы публикуем новые полезные статьи о клининге 2-3 раза в неделю. Подпишитесь на обновления, чтобы не пропустить свежие материалы от наших экспертов."
                }
              },
              {
                "@type": "Question",
                "name": "Можно ли задать вопрос авторам статей?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Да, вы можете задать любой вопрос по уборке через форму обратной связи или по телефону +7-925-555-18-33. Наши эксперты ответят в течение 24 часов."
                }
              },
              {
                "@type": "Question",
                "name": "Все советы из блога проверены на практике?",
                "acceptedAnswer": {
                  "@type": "Answer",
            "text": "Статьи готовят практикующие специалисты. Советы проверяем на реальных объектах."
                }
              },
              {
                "@type": "Question",
                "name": "Можно ли использовать ваши советы для коммерческой уборки?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Да, многие наши советы универсальны и подходят как для домашней, так и для коммерческой уборки офисов, магазинов и других помещений."
                }
              }
            ]
          })
        }}
      />
      
      {/* Хлебные крошки для быстрых ссылок */}
      <div className="container-custom pt-6">
        <BreadcrumbSchema 
          items={[
            { name: 'Блог', url: '/blog' }
          ]} 
        />
      </div>
      
      <div className="container-custom">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Блог о клининге
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Полезные статьи от профессионалов клининга. Советы, секреты и лайфхаки для идеальной чистоты.
          </p>
        </div>

        {/* Featured Post */}
        {blogPosts.filter(post => post.featured).map(post => (
          <div key={post.id} className="mb-16">
            <Link href={`/blog/${post.id}`} className="block group">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="bg-gradient-to-br from-primary-100 to-secondary-100 p-8 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-white text-2xl font-bold">📝</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                        <span>{post.category}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                        <span>•</span>
                        <span>{new Date(post.date).toLocaleDateString('ru-RU')}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-8 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">⭐</span>
                      </div>
                      <p className="text-primary-600 font-semibold mb-2">Рекомендуем</p>
                      <p className="text-gray-600 text-sm">
                        Самая популярная статья месяца
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}

        {/* All Posts */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Все статьи
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.filter(post => !post.featured).map(post => (
              <Link key={post.id} href={`/blog/${post.id}`} className="block group">
                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 h-full">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-xl">📄</span>
                  </div>
                  <div className="mb-4">
                    <span className="inline-block bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-xs font-medium mb-3">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{post.readTime}</span>
                    <span>{new Date(post.date).toLocaleDateString('ru-RU')}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Категории статей
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Советы', icon: '💡', count: 8 },
              { name: 'Химчистка', icon: '🧽', count: 5 },
              { name: 'Уборка после ремонта', icon: '🏗️', count: 3 },
              { name: 'Мытье окон', icon: '🪟', count: 4 },
              { name: 'Офисная уборка', icon: '🏢', count: 6 },
              { name: 'Эко-уборка', icon: '🌱', count: 4 },
              { name: 'Инструменты', icon: '🛠️', count: 7 },
              { name: 'Средства', icon: '🧴', count: 9 }
            ].map(category => (
              <div key={category.name} className="text-center p-4 bg-gray-50 rounded-lg hover:bg-primary-50 transition-colors cursor-pointer">
                <div className="text-2xl mb-2">{category.icon}</div>
                <div className="font-medium text-gray-900 mb-1">{category.name}</div>
                <div className="text-sm text-gray-500">{category.count} статей</div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-16 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Подпишитесь на обновления
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Получайте новые статьи о клининге и уборке прямо на почту. 
            Только полезный контент, никакого спама.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Ваш email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <button className="btn-primary px-6 py-3">
              Подписаться
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 