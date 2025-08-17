#!/usr/bin/env node
/**
 * Генерация XML-фида услуг для Яндекс (исполнители/услуги)
 * Спецификация у Яндекса закрытая и варьируется, поэтому генерим безопасный каталог услуг
 * с названием, ценой "от", ссылкой и контактами.
 */
const fs = require('fs');
const path = require('path');

const OUT = path.resolve(process.cwd(), 'public', 'yandex-services.xml');

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function main() {
  // Базовый набор услуг
  const services = [
    { name: 'Уборка квартиры', url: 'https://k-lining.ru/services/apartment-cleaning', priceFrom: 2500 },
    { name: 'Генеральная уборка', url: 'https://k-lining.ru/services/apartment-cleaning', priceFrom: 6000 },
    { name: 'Уборка после ремонта', url: 'https://k-lining.ru/services/post-renovation-cleaning', priceFrom: 8000 },
    { name: 'Мытьё окон', url: 'https://k-lining.ru/services/window-cleaning', priceFrom: 500 },
    { name: 'Химчистка мебели', url: 'https://k-lining.ru/services/furniture-dry-cleaning', priceFrom: 1000 },
    { name: 'Уборка офиса', url: 'https://k-lining.ru/services/office-cleaning', priceFrom: 10000 },
  ];

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<yandex-services>',
    '  <company>',
    '    <name>K-lining</name>',
    '    <url>https://k-lining.ru</url>',
    '    <phone>+7-925-555-18-33</phone>',
    '    <city>Москва</city>',
    '  </company>',
    '  <offers>',
    ...services.map((s, idx) => [
      '    <offer>',
      `      <id>${idx + 1}</id>`,
      `      <name>${esc(s.name)}</name>`,
      `      <url>${esc(s.url)}</url>`,
      `      <price>${s.priceFrom}</price>`,
      '      <currency>RUB</currency>',
      '      <category>Клининговые услуги</category>',
      '      <availability>in_stock</availability>',
      '    </offer>'
    ].join('\n')),
    '  </offers>',
    '</yandex-services>'
  ].join('\n');

  fs.writeFileSync(OUT, xml, 'utf8');
  console.log('Generated Yandex services feed at', OUT, 'offers:', services.length);
}

if (require.main === module) {
  try { main(); } catch (e) { console.error(e); process.exit(1); }
}


