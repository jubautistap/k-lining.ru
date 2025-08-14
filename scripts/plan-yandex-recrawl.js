#!/usr/bin/env node
/*
  План на переобход Яндекс по 30 URL/день с приоритизацией по кластерам.

  Источники:
    - CSV Яндекса (url,httpCode,lastAccess)
    - data/seo-landings.json (для кластера и важности)

  Запуск:
    node scripts/plan-yandex-recrawl.js ./k-lining.ru_*.csv

  Выход:
    tmp/recrawl_plan_day_1.txt, day_2.txt, ... (по 30 URL)
*/

const fs = require('fs');
const path = require('path');

function parseCsv(file) {
  const raw = fs.readFileSync(file, 'utf8');
  const lines = raw.split(/\r?\n/).filter(Boolean);
  const out = [];
  for (let i = 1; i < lines.length; i++) {
    const m = lines[i].match(/^"?(.*?)"?,"?(\d{3})"?,"?(.*?)"?$/);
    if (!m) continue;
    out.push({ url: m[1], code: m[2], lastAccess: m[3] });
  }
  return out;
}

function normalizeSlug(url) {
  const u = url.split('?')[0].split('#')[0];
  return u.replace(/\/$/, '') || '/';
}

function parseRuDate(d) {
  // dd.mm.yyyy
  const m = d.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  if (!m) return 0;
  return new Date(`${m[3]}-${m[2]}-${m[1]}T00:00:00Z`).getTime();
}

function loadLandings() {
  const jsonPath = path.resolve(process.cwd(), 'data/seo-landings.json');
  if (!fs.existsSync(jsonPath)) return {};
  return JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
}

function weightFor(slug, landing) {
  // Бусты по точным слагам
  const exactBoost = new Map([
    ['klining-zakazat-moskva', 100],
    ['klining-srochno-moskva', 95],
    ['klining-24-7-moskva', 95],
    ['klining-nedorogo-moskva', 90],
    ['uborka-kvartiry-moskva', 90],
    ['uborka-posle-remonta-moskva', 88],
    ['myte-okon-moskva', 85],
    ['himchistka-mebeli-moskva', 85],
    ['uborka-ofisa-moskva', 85],
  ]);
  const base = exactBoost.get(slug) || 0;

  // Вес по кластеру
  const cluster = (landing?.cluster || '').toLowerCase();
  let c = 40;
  if (/цены|калькулятор/.test(cluster)) c = 95;
  else if (/главная|общее/.test(cluster)) c = 90;
  else if (/квартир/.test(cluster)) c = 85;
  else if (/b2b|офис/.test(cluster)) c = 80;
  else if (/мыть[её]\s*окон|высот/.test(cluster)) c = 78;
  else if (/химчистка|мягкая мебель/.test(cluster)) c = 75;
  else if (/тверд|полы|мрамор|шлиф/.test(cluster)) c = 60;
  else if (/спецуборка|события/.test(cluster)) c = 55;
  else if (/улиц/.test(cluster)) c = 30; // уличные — в конец

  return Math.max(base, c);
}

function main() {
  const inputs = process.argv.slice(2);
  if (inputs.length === 0) {
    console.error('Укажите CSV: node scripts/plan-yandex-recrawl.js ./k-lining.ru_*.csv');
    process.exit(2);
  }

  // Собираем строки 500 из всех CSV
  const rows = [];
  for (const f of inputs) {
    if (!fs.existsSync(f)) continue;
    rows.push(...parseCsv(f).filter((r) => r.code === '500'));
  }
  if (rows.length === 0) {
    console.log('В CSV нет 500 — план не требуется');
    return;
  }

  const landings = loadLandings();
  const scored = rows.map((r) => {
    const slug = normalizeSlug(r.url).replace(/^\//, '');
    const landing = landings[slug];
    const score = weightFor(slug, landing) + Math.min(10, Math.floor((parseRuDate(r.lastAccess) || 0) / 8.64e7) % 10);
    return { url: `https://k-lining.ru/${slug}`, slug, score, lastAccess: r.lastAccess, cluster: landing?.cluster || '' };
  });

  scored.sort((a, b) => b.score - a.score || (parseRuDate(b.lastAccess) - parseRuDate(a.lastAccess)));

  // Разбиваем по 30 в файл
  const outDir = path.resolve(process.cwd(), 'tmp');
  fs.mkdirSync(outDir, { recursive: true });
  const chunkSize = 30;
  let day = 1;
  for (let i = 0; i < scored.length; i += chunkSize) {
    const chunk = scored.slice(i, i + chunkSize);
    const outPath = path.join(outDir, `recrawl_plan_day_${day}.txt`);
    fs.writeFileSync(outPath, chunk.map((x) => x.url).join('\n') + '\n', 'utf8');
    console.log(`День ${day}: ${chunk.length} URL → ${outPath}`);
    day++;
  }

  // Выведем топ-30 в консоль
  console.log('\nТоп-30 для отправки сегодня:');
  for (const x of scored.slice(0, 30)) {
    console.log(`  ${x.url}  [${x.cluster || '—'}]`);
  }
}

main();




