#!/usr/bin/env node

/**
 * 🔧 Простая SEO проверка без API лимитов
 * Базовая диагностика сайта k-lining.ru
 */

const https = require('https');
const fs = require('fs');

const SITE_URL = 'https://k-lining.ru';

// Страницы для проверки
const pages = [
  { name: 'Главная', path: '' },
  { name: 'Услуги', path: '/services/apartment-cleaning' },
  { name: 'Блог', path: '/blog' },
  { name: 'Калькулятор', path: '/calculator' },
  { name: 'Контакты', path: '/contacts' }
];

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    
    const req = https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          responseTime,
          html: data,
          contentLength: Buffer.byteLength(data, 'utf8')
        });
      });
    });
    
    req.on('error', (err) => {
      reject(err);
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Timeout'));
    });
  });
}

function analyzePage(html) {
  const analysis = {
    title: null,
    description: null,
    h1Count: 0,
    imgWithoutAlt: 0,
    totalImages: 0,
    hasStructuredData: false,
    hasFAQSchema: false,
    hasServiceSchema: false,
    hasRobotsMeta: false,
    hasCanonical: false,
    contentLength: html.length
  };
  
  // Title
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (titleMatch) {
    analysis.title = titleMatch[1].trim();
  }
  
  // Meta description
  const descMatch = html.match(/<meta[^>]*name=["\']description["\'][^>]*content=["\']([^"']+)["\'][^>]*>/i);
  if (descMatch) {
    analysis.description = descMatch[1].trim();
  }
  
  // H1 tags
  const h1Matches = html.match(/<h1[^>]*>/gi);
  analysis.h1Count = h1Matches ? h1Matches.length : 0;
  
  // Images
  const imgMatches = html.match(/<img[^>]*>/gi);
  if (imgMatches) {
    analysis.totalImages = imgMatches.length;
    analysis.imgWithoutAlt = imgMatches.filter(img => !img.includes('alt=')).length;
  }
  
  // Structured Data
  analysis.hasStructuredData = html.includes('application/ld+json');
  analysis.hasFAQSchema = html.includes('"@type":"FAQPage"') || html.includes('"@type": "FAQPage"');
  analysis.hasServiceSchema = html.includes('"@type":"Service"') || html.includes('"@type": "Service"');
  
  // Meta robots
  analysis.hasRobotsMeta = html.includes('name="robots"');
  
  // Canonical
  analysis.hasCanonical = html.includes('rel="canonical"');
  
  return analysis;
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function getScoreEmoji(value, good, bad) {
  if (value <= good) return '🟢';
  if (value <= bad) return '🟡';
  return '🔴';
}

async function runSeoCheck() {
  console.log('🔍 Простая SEO проверка k-lining.ru\n');
  console.log('📋 Проверяем базовые SEO элементы:\n');
  
  const results = [];
  
  for (const page of pages) {
    const url = SITE_URL + page.path;
    console.log(`🌐 Проверяю: ${page.name}`);
    console.log(`📄 URL: ${url}`);
    
    try {
      const response = await makeRequest(url);
      const analysis = analyzePage(response.html);
      
      results.push({
        page: page.name,
        url,
        response,
        analysis
      });
      
      console.log(`✅ Статус: ${response.statusCode}`);
      console.log(`⚡ Время ответа: ${response.responseTime}ms ${getScoreEmoji(response.responseTime, 500, 1000)}`);
      console.log(`📊 Размер: ${formatBytes(response.contentLength)}`);
      console.log(`📝 Title: ${analysis.title ? '✅ ' + analysis.title.substring(0, 60) + '...' : '❌ Отсутствует'}`);
      console.log(`📄 Description: ${analysis.description ? '✅ ' + analysis.description.substring(0, 60) + '...' : '❌ Отсутствует'}`);
      console.log(`🔍 H1: ${analysis.h1Count === 1 ? '✅' : analysis.h1Count === 0 ? '❌' : '⚠️'} ${analysis.h1Count} шт`);
      console.log(`🖼️  Изображения: ${analysis.totalImages} (без alt: ${analysis.imgWithoutAlt} ${analysis.imgWithoutAlt === 0 ? '✅' : '⚠️'})`);
      console.log(`🔧 Structured Data: ${analysis.hasStructuredData ? '✅' : '❌'}`);
      console.log(`💬 FAQ Schema: ${analysis.hasFAQSchema ? '✅' : '❌'}`);
      console.log(`🏢 Service Schema: ${analysis.hasServiceSchema ? '✅' : '❌'}`);
      console.log(`🤖 Robots Meta: ${analysis.hasRobotsMeta ? '✅' : '❌'}`);
      console.log(`🔗 Canonical: ${analysis.hasCanonical ? '✅' : '❌'}\n`);
      
    } catch (error) {
      console.log(`❌ Ошибка: ${error.message}\n`);
      results.push({
        page: page.name,
        url,
        error: error.message
      });
    }
    
    // Небольшая пауза между запросами
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  // Итоговый отчет
  console.log('=' .repeat(60));
  console.log('📊 ИТОГОВЫЙ SEO ОТЧЕТ');
  console.log('=' .repeat(60));
  
  const successfulResults = results.filter(r => !r.error);
  
  if (successfulResults.length > 0) {
    const avgResponseTime = successfulResults.reduce((sum, r) => sum + r.response.responseTime, 0) / successfulResults.length;
    const totalSize = successfulResults.reduce((sum, r) => sum + r.response.contentLength, 0);
    
    console.log(`⚡ Средн. время ответа: ${Math.round(avgResponseTime)}ms ${getScoreEmoji(avgResponseTime, 500, 1000)}`);
    console.log(`📊 Общий размер: ${formatBytes(totalSize)}`);
    
    const pagesWithTitle = successfulResults.filter(r => r.analysis.title).length;
    const pagesWithDesc = successfulResults.filter(r => r.analysis.description).length;
    const pagesWithH1 = successfulResults.filter(r => r.analysis.h1Count === 1).length;
    const pagesWithSchema = successfulResults.filter(r => r.analysis.hasStructuredData).length;
    const pagesWithFAQ = successfulResults.filter(r => r.analysis.hasFAQSchema).length;
    
    console.log(`\n📝 SEO элементы:`);
    console.log(`   • Title теги: ${pagesWithTitle}/${successfulResults.length} ${pagesWithTitle === successfulResults.length ? '✅' : '⚠️'}`);
    console.log(`   • Meta descriptions: ${pagesWithDesc}/${successfulResults.length} ${pagesWithDesc === successfulResults.length ? '✅' : '⚠️'}`);
    console.log(`   • H1 теги: ${pagesWithH1}/${successfulResults.length} ${pagesWithH1 === successfulResults.length ? '✅' : '⚠️'}`);
    console.log(`   • Structured Data: ${pagesWithSchema}/${successfulResults.length} ${pagesWithSchema === successfulResults.length ? '✅' : '⚠️'}`);
    console.log(`   • FAQ Schema: ${pagesWithFAQ}/${successfulResults.length} ${pagesWithFAQ > 0 ? '✅' : '❌'}`);
  }
  
  console.log(`\n💡 Рекомендации:`);
  console.log(`   • Получите PageSpeed API ключ для детального анализа`);
  console.log(`   • Запускайте: npm run seo:vitals (с API ключом)`);
  console.log(`   • Мониторьте Core Web Vitals в Search Console`);
  
  const timestamp = new Date().toLocaleString('ru-RU');
  console.log(`\n⏰ Проверка завершена: ${timestamp}`);
}

// Запуск
runSeoCheck().catch(console.error);