import Link from 'next/link';

// Небольшой тизер блога для главной страницы
// Используем реальные слаги и изображения, имеющиеся в /public/blog
const posts = [
  {
    href: '/blog/cleaning-tools-guide',
    title: 'Инструменты для уборки: что реально нужно',
    excerpt: 'Топ-инструменты и расходники, которые ускоряют уборку и улучшают результат.',
    image: '/blog/cleaning-tools.jpg',
    category: 'Советы'
  },
  {
    href: '/blog/dry-cleaning-guide',
    title: 'Химчистка мебели: полное руководство',
    excerpt: 'Как безопасно чистить диваны и ковры дома. Профессиональные лайфхаки.',
    image: '/blog/dry-cleaning.jpg',
    category: 'Химчистка'
  },
  {
    href: '/blog/office-cleaning-moscow-24-7',
    title: 'Уборка офисов 24/7: как навести порядок без остановки работы',
    excerpt: 'Схемы графиков и контроль качества. На что смотреть при выборе подрядчика.',
    image: '/blog/office-cleaning.jpg',
    category: 'Офисы'
  },
  {
    href: '/blog/window-cleaning-tips',
    title: 'Мытьё окон без разводов',
    excerpt: 'Рабочие техники, насадки и средства, которые действительно помогают.',
    image: '/blog/window-cleaning.jpg',
    category: 'Окна'
  }
];

export default function BlogTeaserSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Свежие статьи из блога</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Практичные советы по клинингу, обзоры средств и техники, кейсы из работы.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <Link key={post.href} href={post.href} className="group block bg-gray-50 rounded-xl p-5 border border-gray-100 hover:border-primary-200 hover:bg-primary-50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center mb-4">
                <span className="text-sm font-semibold text-primary-800">{post.category}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-700">{post.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-3">{post.excerpt}</p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/blog" className="inline-block btn-secondary px-6 py-3">Все статьи</Link>
        </div>
      </div>
    </section>
  );
}


