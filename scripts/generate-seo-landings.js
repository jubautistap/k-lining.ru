// Создаёт data/seo-landings.json из SEo/______________SEO__________________.csv
// Запуск: node scripts/generate-seo-landings.js

const fs = require('fs');
const path = require('path');

const CSV_PATH = path.resolve(__dirname, '..', 'SEo', '______________SEO__________________.csv');
const STREETS_DIR = path.resolve(__dirname, '..', 'SEo');
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
  const bySlug = {};

  function ingestCsv(filePath) {
    if (!fs.existsSync(filePath)) return 0;
    const csv = fs.readFileSync(filePath, 'utf8');
    const { header, rows } = parseCSV(csv);
    const idx = {
      slug: header.findIndex((h) => /URL\s*\(slug\)/i.test(h)),
      title: header.findIndex((h) => /Title/i.test(h)),
      h1: header.findIndex((h) => /^H1$/i.test(h)),
      desc: header.findIndex((h) => /Meta\s*Description/i.test(h)),
      cluster: header.findIndex((h) => /Кластер/i.test(h)),
    };
    let added = 0;
    for (const row of rows) {
      const slugCell = row[idx.slug] || '';
      const slug = toSlug(slugCell);
      if (!slug) continue;
      const title = (row[idx.title] || '').trim();
      const h1 = (row[idx.h1] || '').trim() || title;
      const description = (row[idx.desc] || '').trim();
      const cluster = (row[idx.cluster] || '').trim();
      bySlug[slug] = { slug, title, h1, description, cluster };
      added++;
    }
    return added;
  }

  let total = 0;
  total += ingestCsv(CSV_PATH);
  // Подхватываем все файлы вида streets*.csv
  try {
    if (fs.existsSync(STREETS_DIR)) {
      const files = fs.readdirSync(STREETS_DIR)
        .filter((f) => /^streets.*\.csv$/i.test(f))
        .map((f) => path.join(STREETS_DIR, f));
      for (const f of files) total += ingestCsv(f);
    }
  } catch (e) {
    console.warn('[seo-landings] Failed to scan streets CSVs:', e);
  }

  if (total === 0) {
    console.warn('[seo-landings] No CSV rows found → generating empty landings JSON');
  }

  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, JSON.stringify(bySlug, null, 2), 'utf8');
  console.log('Generated', OUT_PATH, 'items:', Object.keys(bySlug).length);
}

main();


