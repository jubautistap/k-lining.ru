/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://k-lining.ru',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/*', '/api/*', '/_next/*', '/static/*'],
      },
    ],
    additionalSitemaps: [
      'https://k-lining.ru/sitemap.xml',
    ],
          host: 'https://k-lining.ru',
  },
  exclude: ['/admin/*', '/api/*', '/_next/*', '/static/*'],
  changefreq: 'weekly',
  priority: 0.7,
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
    
    // Контакты и о нас
    if (path.includes('/contacts') || path.includes('/about')) {
      priority = 0.8;
      changefreq = 'monthly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
}; 