// Генерация public/yandex-sitemap.xml с учётом CSV-лендингов
// Запуск: node scripts/generate-yandex-sitemap.js

const fs = require('fs');
const path = require('path');

const JSON_PATH = path.resolve(process.cwd(), 'data', 'seo-landings.json');
const OUT_PATH = path.resolve(process.cwd(), 'public', 'yandex-sitemap.xml');

function isoLocal(date = new Date()) {
  // Достаточно ISO8601 в UTC для Yandex; от локального смещения можно отказаться
  return date.toISOString();
}

function uniq(arr) {
  return Array.from(new Set(arr));
}

function buildUrl(loc, changefreq = 'weekly', priority = '0.8') {
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${isoLocal()}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

function main() {
  const base = [
    '/',
    '/services/',
    '/services/apartment-cleaning/',
    '/services/house-cleaning/',
    '/services/office-cleaning/',
    '/services/dry-cleaning/',
    '/services/post-renovation-cleaning/',
    '/services/window-cleaning/',
    '/prices/',
    '/calculator/',
    '/blog/',
    '/contacts/',
    '/about/',
    '/districts/',
    '/districts/basmannyy/',
    '/corporate/',
  ].map((p) => `https://k-lining.ru${p}`);

  let dynamic = [];
  try {
    const raw = fs.readFileSync(JSON_PATH, 'utf8');
    const landings = JSON.parse(raw);
    dynamic = Object.keys(landings || {}).map((slug) => `https://k-lining.ru/${slug}`);
  } catch (e) {
    // если JSON ещё не сгенерен — пропускаем динамику
    dynamic = [];
  }

  const all = uniq([...base, ...dynamic]);

  const entries = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:yandex="http://www.yandex.ru/schemas/sitemap-turbo/1.0">',
    // главная — daily / 1.0
    buildUrl('https://k-lining.ru/', 'daily', '1.0'),
    // остальные
    ...all
      .filter((loc) => loc !== 'https://k-lining.ru/')
      .map((loc) => buildUrl(loc, loc.includes('/services') ? 'weekly' : 'monthly', loc.includes('/services') ? '0.9' : '0.8')),
    '</urlset>',
  ].join('\n');

  fs.writeFileSync(OUT_PATH, entries, 'utf8');
  console.log('Generated Yandex sitemap at', OUT_PATH, 'urls:', all.length);
}

main();


