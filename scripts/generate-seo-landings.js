// Создаёт data/seo-landings.json из SEo/______________SEO__________________.csv
// Запуск: node scripts/generate-seo-landings.js

const fs = require('fs');
const path = require('path');

const CSV_PATH = path.resolve(__dirname, '..', 'SEo', '______________SEO__________________.csv');
const OUT_PATH = path.resolve(__dirname, '..', 'data', 'seo-landings.json');

function parseCSV(content) {
  // Простой CSV-парсер с поддержкой кавычек
  const lines = content.split(/\r?\n/).filter(Boolean);
  const header = splitCSVLine(lines[0]);
  const rows = lines.slice(1).map((line) => splitCSVLine(line));
  return { header, rows };
}

function splitCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++; // skip escaped quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current.trim());
  return result;
}

function toSlug(raw) {
  if (!raw) return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;
  return trimmed.replace(/^\/*/, '') // убираем ведущие слэши
                .replace(/\/$/, '');  // убираем хвостовой слэш
}

function main() {
  if (!fs.existsSync(CSV_PATH)) {
    console.error('CSV not found at', CSV_PATH);
    process.exit(1);
  }

  const csv = fs.readFileSync(CSV_PATH, 'utf8');
  const { header, rows } = parseCSV(csv);

  const idx = {
    slug: header.findIndex((h) => /URL\s*\(slug\)/i.test(h)),
    title: header.findIndex((h) => /Title/i.test(h)),
    h1: header.findIndex((h) => /^H1$/i.test(h)),
    desc: header.findIndex((h) => /Meta\s*Description/i.test(h)),
    cluster: header.findIndex((h) => /Кластер/i.test(h)),
  };

  const items = [];
  for (const row of rows) {
    const slugCell = row[idx.slug] || '';
    const slug = toSlug(slugCell);
    if (!slug) continue;

    const title = (row[idx.title] || '').trim();
    const h1 = (row[idx.h1] || '').trim() || title;
    const description = (row[idx.desc] || '').trim();
    const cluster = (row[idx.cluster] || '').trim();

    items.push({ slug, title, h1, description, cluster });
  }

  const bySlug = {};
  for (const it of items) {
    bySlug[it.slug] = it;
  }

  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, JSON.stringify(bySlug, null, 2), 'utf8');
  console.log('Generated', OUT_PATH, 'items:', Object.keys(bySlug).length);
}

main();


