#!/usr/bin/env node
/*
  Быстрый аудит CSV Яндекса:
  - Находит 500‑страницы
  - Проверяет, есть ли слуг в data/seo-landings.json
  - Предлагает редиректы для неизвестных адресов

  Запуск:
    node scripts/audit-yandex-csv.js ./k-lining.ru_*.csv
*/

const fs = require('fs');
const path = require('path');

function parseCsv(raw) {
  const lines = raw.split(/\r?\n/).filter(Boolean);
  const out = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    // Простейший CSV без запятых внутри колонок
    const m = line.match(/^"?(.*?)"?,"?(\d{3})"?,"?(.*?)"?$/);
    if (!m) continue;
    const url = m[1];
    const code = m[2];
    const lastAccess = m[3];
    out.push({ url, code, lastAccess });
  }
  return out;
}

function normalizeSlug(url) {
  try {
    const u = url.split('?')[0].split('#')[0];
    return u.replace(/\/$/, '');
  } catch {
    return url;
  }
}

function suggestRedirect(slug) {
  const s = slug.toLowerCase();
  if (s.includes('okon') || s.includes('okn') || s.includes('vitrin')) return '/services/window-cleaning';
  if (s.includes('himchist') || s.includes('divan') || s.includes('mebel')) return '/services/furniture-dry-cleaning';
  if (s.includes('ofis')) return '/services/office-cleaning';
  if (s.includes('kvartir')) return '/services/apartment-cleaning';
  if (s.includes('remont')) return '/services/post-renovation-cleaning';
  if (s.includes('cena') || s.includes('stoimost') || s.includes('raschet')) return '/prices';
  return '/services';
}

function main() {
  const csvPath = process.argv[2] || path.resolve(process.cwd(), 'k-lining.ru_627afbe3c5381513fce8bc1d.csv');
  const jsonPath = path.resolve(process.cwd(), 'data/seo-landings.json');
  if (!fs.existsSync(csvPath)) {
    console.error('CSV не найден:', csvPath);
    process.exit(2);
  }
  if (!fs.existsSync(jsonPath)) {
    console.error('data/seo-landings.json не найден');
    process.exit(2);
  }

  const csvRaw = fs.readFileSync(csvPath, 'utf8');
  const rows = parseCsv(csvRaw);
  const landings = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  const knownSlugs = new Set(Object.keys(landings).map((k) => `/${k}`));

  const byCode = rows.reduce((acc, r) => {
    const key = r.code;
    (acc[key] = acc[key] || []).push(r);
    return acc;
  }, {});

  const errors500 = (byCode['500'] || []).map((r) => ({ ...r, slug: normalizeSlug(r.url) }));

  const known500 = [];
  const unknown500 = [];
  for (const r of errors500) {
    if (knownSlugs.has(r.slug)) known500.push(r); else unknown500.push(r);
  }

  console.log('=== Яндекс CSV аудит ===');
  console.log(`Всего записей: ${rows.length}`);
  console.log(`200: ${(byCode['200'] || []).length}, 308: ${(byCode['308'] || []).length}, 500: ${(byCode['500'] || []).length}`);
  console.log('');

  if (errors500.length === 0) {
    console.log('Нет 500 — всё ок');
    process.exit(0);
  }

  if (known500.length) {
    console.log('500 на известных слугах (возможна ошибка рантайма; уже проверяйте логи):');
    for (const r of known500.slice(0, 20)) {
      console.log(`  ${r.slug}  (${r.lastAccess})`);
    }
    if (known500.length > 20) console.log(`  ... и ещё ${known500.length - 20}`);
    console.log('');
  }

  if (unknown500.length) {
    console.log('500 на неизвестных слугах (страницы нет в seo-landings.json):');
    for (const r of unknown500.slice(0, 50)) {
      const dest = suggestRedirect(r.slug);
      console.log(`  ${r.slug}  → предложить 301 на ${dest}`);
    }
    if (unknown500.length > 50) console.log(`  ... и ещё ${unknown500.length - 50}`);
    console.log('');

    console.log('Сниппеты для next.config.js (redirects):');
    console.log('[');
    for (const r of unknown500.slice(0, 200)) {
      const dest = suggestRedirect(r.slug);
      console.log(`  { source: '${r.slug}', destination: '${dest}', permanent: true },`);
    }
    console.log(']');
  }
}

main();


