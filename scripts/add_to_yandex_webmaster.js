#!/usr/bin/env node

/**
 * Скрипт для добавления URL в Яндекс.Вебмастер
 * Использование: node scripts/add_to_yandex_webmaster.js [день]
 * Пример: node scripts/add_to_yandex_webmaster.js 1
 */

const fs = require('fs');
const path = require('path');

// Конфигурация
const SITE_URL = 'https://k-lining.ru';
const DAY_FILES = {
  1: 'tmp/yandex_recrawl_day_1.txt',
  2: 'tmp/yandex_recrawl_day_2.txt',
  3: 'tmp/yandex_recrawl_day_3.txt'
};

function readDayFile(day) {
  const filePath = path.join(process.cwd(), DAY_FILES[day]);
  
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Файл для дня ${day} не найден: ${filePath}`);
    process.exit(1);
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const urls = content
    .split('\n')
    .filter(line => line.startsWith('https://'))
    .map(line => line.trim());
  
  return urls;
}

function generateYandexWebmasterInstructions(day, urls) {
  console.log(`\n📋 ДЕНЬ ${day} - Инструкции для Яндекс.Вебмастера`);
  console.log('=' .repeat(60));
  console.log(`📊 Всего URL: ${urls.length}`);
  console.log(`⏰ Рекомендуемое время: ${getRecommendedTime(day)}`);
  console.log(`🎯 Приоритет: ${getPriority(day)}`);
  
  console.log('\n🔗 URL для добавления:');
  urls.forEach((url, index) => {
    console.log(`${index + 1}. ${url}`);
  });
  
  console.log('\n📝 Пошаговая инструкция:');
  console.log('1. Откройте Яндекс.Вебмастер: https://webmaster.yandex.ru/');
  console.log('2. Выберите сайт k-lining.ru');
  console.log('3. Перейдите в раздел "Индексирование" → "Переобход страниц"');
  console.log('4. Нажмите "Добавить URL"');
  console.log('5. Скопируйте и вставьте каждый URL из списка выше');
  console.log('6. Установите приоритет:', getPriority(day));
  console.log('7. Нажмите "Добавить"');
  
  console.log('\n💡 Советы:');
  console.log('- Добавляйте URL по одному для лучшего контроля');
  console.log('- Проверяйте статус индексации через 2-3 дня');
  console.log('- Отслеживайте позиции по ключевым запросам');
  
  console.log('\n📊 Статистика по дням:');
  console.log('День 1: Основные страницы (высокий приоритет)');
  console.log('День 2: Блог и SEO лендинги (средний приоритет)');
  console.log('День 3: Дополнительные страницы (низкий приоритет)');
}

function getRecommendedTime(day) {
  const times = {
    1: '9:00 - 12:00 (утренний трафик)',
    2: '14:00 - 17:00 (дневной трафик)',
    3: '19:00 - 22:00 (вечерний трафик)'
  };
  return times[day] || 'не определено';
}

function getPriority(day) {
  const priorities = {
    1: 'Высокий (основные страницы)',
    2: 'Средний (контентные страницы)',
    3: 'Низкий (вспомогательные страницы)'
  };
  return priorities[day] || 'не определено';
}

function main() {
  const day = process.argv[2];
  
  if (!day || !['1', '2', '3'].includes(day)) {
    console.log('🚀 Скрипт для добавления URL в Яндекс.Вебмастер');
    console.log('=' .repeat(50));
    console.log('Использование: node scripts/add_to_yandex_webmaster.js [день]');
    console.log('Доступные дни: 1, 2, 3');
    console.log('\nПримеры:');
    console.log('  node scripts/add_to_yandex_webmaster.js 1  # День 1');
    console.log('  node scripts/add_to_yandex_webmaster.js 2  # День 2');
    console.log('  node scripts/add_to_yandex_webmaster.js 3  # День 3');
    console.log('\n📁 Файлы созданы в папке tmp/');
    console.log('📋 Общий план: tmp/yandex_recrawl_plan.md');
    process.exit(0);
  }
  
  try {
    const urls = readDayFile(day);
    generateYandexWebmasterInstructions(day, urls);
    
    // Сохраняем URL в отдельный файл для копирования
    const outputFile = `tmp/yandex_day_${day}_urls_only.txt`;
    fs.writeFileSync(outputFile, urls.join('\n'));
    console.log(`\n💾 URL сохранены в файл: ${outputFile}`);
    console.log('📋 Можете скопировать все URL сразу из этого файла');
    
  } catch (error) {
    console.error('❌ Ошибка:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { readDayFile, generateYandexWebmasterInstructions };
