#!/usr/bin/env node
/*
  Экспортирует список URL со статусом 500 из CSV Яндекса в txt, чтобы загрузить в Вебмастер → Переобход страниц

  Запуск:
    node scripts/export-yandex-recrawl-list.js ./k-lining.ru_*.csv

  Выход:
    tmp/yandex_recrawl_YYYYMMDD.txt — по одному URL на строку
*/

const fs = require('fs');
const path = require('path');

function parseCsvFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const lines = raw.split(/\r?\n/).filter(Boolean);
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const m = line.match(/^"?(.*?)"?,"?(\d{3})"?,"?(.*?)"?$/);
    if (!m) continue;
    const url = m[1];
    const code = m[2];
    rows.push({ url, code });
  }
  return rows;
}

function normalizeUrl(url) {
  const slug = url.split('?')[0].replace(/\/$/, '');
  if (slug.startsWith('http://') || slug.startsWith('https://')) return slug;
  return `https://k-lining.ru${slug || '/'}`;
}

function main() {
  const inputs = process.argv.slice(2);
  if (inputs.length === 0) {
    console.error('Укажите путь(и) к CSV, например: node scripts/export-yandex-recrawl-list.js ./k-lining.ru_*.csv');
    process.exit(2);
  }

  const files = [];
  for (const arg of inputs) {
    if (fs.existsSync(arg) && fs.statSync(arg).isFile()) files.push(arg);
  }
  if (files.length === 0) {
    console.error('CSV файлы не найдены');
    process.exit(2);
  }

  const urls = new Set();
  for (const f of files) {
    const rows = parseCsvFile(f);
    rows.filter((r) => r.code === '500').forEach((r) => urls.add(normalizeUrl(r.url)));
  }

  if (urls.size === 0) {
    console.log('500 в CSV не обнаружено — экспорт не требуется');
    return;
  }

  const outDir = path.resolve(process.cwd(), 'tmp');
  fs.mkdirSync(outDir, { recursive: true });
  const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const outPath = path.join(outDir, `yandex_recrawl_${stamp}.txt`);
  fs.writeFileSync(outPath, Array.from(urls).join('\n') + '\n', 'utf8');
  console.log('Экспортировано URL для переобхода:', urls.size);
  console.log('Файл:', outPath);
}

main();


