/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://k-lining.ru',
  generateRobotsTxt: true, // Генерим robots из конфига (оставим кастомный файл как fallback)
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/*', '/api/*', '/_next/*', '/static/*'],
      },
      {
        userAgent: 'Yandex',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://k-lining.ru/sitemap.xml',
      'https://k-lining.ru/sitemap-images.xml',
      'https://k-lining.ru/yandex-sitemap.xml',
    ],
    host: 'https://k-lining.ru',
  },
  exclude: ['/admin', '/admin/*', '/api/*', '/_next/*', '/static/*'],
  changefreq: 'weekly',
  priority: 0.7,
  autoLastmod: true,
  // предпочтительные расширения locales уже в путях, поэтому alternateRefs не нужен
  sitemapSize: 5000,
  transform: async (config, path) => {
    // Настройка приоритетов для разных страниц
    let priority = 0.7;
    let changefreq = 'weekly';

    // Главная страница
    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    }
    
    // Страницы услуг
    if (path.includes('/services') || path.includes('/prices')) {
      priority = 0.9;
      changefreq = 'weekly';
    }
    
    // Блог
    if (path.includes('/blog')) {
      priority = 0.8;
      changefreq = 'monthly';
    }
    
    // Районы
    if (path.includes('/districts')) {
      priority = 0.7;
      changefreq = 'monthly';
    }
    
    // Контакты и о нас
    if (path.includes('/contacts') || path.includes('/about')) {
      priority = 0.8;
      changefreq = 'monthly';
    }
    
    // FAQ
    if (path.includes('/faq')) {
      priority = 0.8;
      changefreq = 'monthly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(), // Актуальная дата
    };
  },
}; 