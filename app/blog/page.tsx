import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Блог о клининге и уборке | Полезные советы от профессионалов KliningPro',
  description: 'Полезные статьи о клининге, уборке, химчистке. Советы профессионалов, обзоры средств, секреты чистоты. Уборка квартир, офисов, химчистка мебели, мытье окон.',
  keywords: 'блог клининга, статьи уборка, советы чистоты, химчистка советы, уборка квартиры, уборка офисов, химчистка мебели, мытье окон, уборка после ремонта, профессиональная уборка',
  openGraph: {
    title: 'Блог о клининге и уборке | Полезные советы от профессионалов',
    description: 'Полезные статьи о клининге, уборке, химчистке. Советы профессионалов, обзоры средств, секреты чистоты.',
    url: 'https://k-lining.ru/blog',
    siteName: 'KliningPro',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Блог о клининге KliningPro',
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Блог о клининге и уборке | KliningPro',
    description: 'Полезные статьи о клининге, уборке, химчистке. Советы профессионалов.',
    images: ['/og-image.jpg'],
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

const blogPosts = [
  {
    id: 'cleaning-company-moscow',
    title: 'Клининговая компания в Москве: рейтинг лучших, цены 2025',
    excerpt: 'Полный гид по выбору клининговой компании в Москве. Рейтинг лучших, сравнение цен и критерии выбора.',
    category: 'Рейтинг компаний',
    date: '2025-01-16',
    readTime: '10 мин',
    image: '/blog/cleaning-company.jpg',
    featured: true
  },
  {
    id: 'apartment-cleaning-price-moscow',
    title: 'Уборка квартир в Москве недорого - цены 2025',
    excerpt: 'Актуальные цены на уборку квартир в Москве. Способы экономии и сравнение тарифов клининговых компаний.',
    category: 'Цены и тарифы',
    date: '2025-01-16',
    readTime: '11 мин',
    image: '/blog/apartment-cleaning-price.jpg',
    featured: false
  },
  {
    id: 'office-cleaning-moscow-24-7',
    title: 'Уборка офисов в Москве 24/7 - клининг офисных помещений',
    excerpt: 'Профессиональная уборка офисов в Москве круглосуточно. Поддерживающая и генеральная уборка офисных помещений.',
    category: 'Офисная уборка',
    date: '2025-01-16',
    readTime: '9 мин',
    image: '/blog/office-cleaning.jpg',
    featured: false
  },
  {
    id: 'how-to-clean-after-renovation',
    title: 'Как правильно убирать после ремонта',
    excerpt: 'Пошаговое руководство по уборке строительной пыли и мусора. Секреты профессионалов.',
    category: 'Уборка после ремонта',
    date: '2025-01-15',
    readTime: '5 мин',
    image: '/blog/after-renovation.jpg',
    featured: false
  },
  {
    id: 'best-cleaning-products',
    title: 'Топ-10 профессиональных средств для уборки',
    excerpt: 'Обзор лучших чистящих средств от профессионалов. Что действительно работает, а что нет.',
    category: 'Советы',
    date: '2025-01-10',
    readTime: '7 мин',
    image: '/blog/cleaning-products.jpg'
  },
  {
    id: 'dry-cleaning-guide',
    title: 'Химчистка мебели: полное руководство',
    excerpt: 'Все о химчистке диванов, ковров и мебели. Как выбрать правильную услугу.',
    category: 'Химчистка',
    date: '2025-01-05',
    readTime: '6 мин',
    image: '/blog/dry-cleaning.jpg'
  },
  {
    id: 'window-cleaning-tips',
    title: 'Мытье окон: секреты профессионалов',
    excerpt: 'Как правильно мыть окна без разводов. Инструменты и техники от опытных клинеров.',
    category: 'Мытье окон',
    date: '2024-12-28',
    readTime: '4 мин',
    image: '/blog/window-cleaning.jpg'
  },
  {
    id: 'eco-friendly-cleaning',
    title: 'Экологичная уборка: безопасно и эффективно',
    excerpt: 'Как убирать без химии и вреда для здоровья. Натуральные средства для чистоты.',
    category: 'Эко-уборка',
    date: '2024-12-20',
    readTime: '8 мин',
    image: '/blog/eco-cleaning.jpg'
  },
  {
    id: 'office-cleaning-schedule',
    title: 'График уборки офиса: что и когда чистить',
    excerpt: 'Оптимальный план уборки для офисных помещений. Ежедневные и еженедельные задачи.',
    category: 'Офисная уборка',
    date: '2024-12-15',
    readTime: '6 мин',
    image: '/blog/office-cleaning.jpg'
  }
];

export default function BlogPage() {
  return (
    <div className="section-padding bg-gradient-to-br from-gray-50 to-white">
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