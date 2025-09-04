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
  additionalPaths: async (config) => {
    try {
      const fs = require('fs');
      const path = require('path');
      const jsonPath = path.resolve(process.cwd(), 'data', 'seo-landings.json');
      if (!fs.existsSync(jsonPath)) return [];
      const raw = fs.readFileSync(jsonPath, 'utf8');
      const landings = JSON.parse(raw);
      const urls = Object.keys(landings || {}).map((slug) => ({
        loc: `/${slug}`,
        changefreq: 'weekly',
        priority: 0.85,
        lastmod: new Date().toISOString(),
      }));
      return urls;
    } catch (_) {
      return [];
    }
  },
  transform: async (config, path) => {
    // Настройка приоритетов для разных типов страниц
    let priority = 0.7;
    let changefreq = 'weekly';

    // Главная страница - максимальный приоритет
    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    }
    
    // Основные страницы услуг - очень высокий приоритет
    else if (
      path.startsWith('/services/') ||
      path === '/uborka-kvartiry-moskva' ||
      path === '/uborka-ofisa-moskva' ||
      path === '/uborka-posle-remonta-moskva' ||
      path === '/himchistka-mebeli-moskva' ||
      path === '/myte-okon-moskva'
    ) {
      priority = 0.9;
      changefreq = 'weekly';
    }
    
    // Важные статические страницы
    else if (['/services', '/prices', '/contacts', '/about', '/calculator'].includes(path)) {
      priority = 0.8;
      changefreq = 'weekly';
    }
    
    // SEO лендинги и региональные страницы
    else if (path === '/klining-cena-moskva' || path.startsWith('/districts/')) {
      priority = 0.8;
      changefreq = 'monthly';
    }
    
    // Блог - средний приоритет, периодические обновления
    else if (path.startsWith('/blog/') || path === '/blog') {
      priority = 0.6;
      changefreq = 'monthly';
    }
    
    // FAQ, политики, прочие служебные страницы
    else if (['/faq', '/privacy', '/terms', '/careers'].includes(path)) {
      priority = 0.5;
      changefreq = 'monthly';
    }
    
    // Остальные страницы - базовый приоритет
    else {
      priority = 0.5;
      changefreq = 'monthly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
      
      // Альтернативные языки для международной SEO (готовность к масштабированию)
      alternateRefs: [
        {
          href: `https://k-lining.ru${path}`,
          hreflang: 'ru-RU',
        },
      ],
    };
  },
}; 