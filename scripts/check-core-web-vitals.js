#!/usr/bin/env node

/**
 * 🎯 Core Web Vitals Checker согласно Google SEO Starter Guide
 * Автоматическая проверка производительности сайта k-lining.ru
 */

const API_URL = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";

// Страницы для проверки
const pages = [
  { name: "Главная", url: "https://k-lining.ru" },
  { name: "Услуги - Уборка квартир", url: "https://k-lining.ru/services/apartment-cleaning" },
  { name: "Блог", url: "https://k-lining.ru/blog" },
  { name: "Калькулятор", url: "https://k-lining.ru/calculator" },
  { name: "Контакты", url: "https://k-lining.ru/contacts" }
];

const strategies = ["mobile", "desktop"];

function formatScore(score) {
  if (score >= 90) return `🟢 ${score} (Отлично)`;
  if (score >= 50) return `🟡 ${score} (Хорошо)`;
  return `🔴 ${score} (Плохо)`;
}

function formatMetric(metric) {
  if (!metric) return "❓ Нет данных";
  
  switch (metric.category) {
    case "FAST": return `🟢 ${metric.category}`;
    case "AVERAGE": return `🟡 ${metric.category}`;
    case "SLOW": return `🔴 ${metric.category}`;
    default: return `❓ ${metric.category}`;
  }
}

async function checkPageSpeed(url, strategy) {
  const params = new URLSearchParams({
    url: url,
    strategy: strategy,
    category: 'performance'
  });
  
  // Добавляем API ключ если доступен
  const apiKey = process.env.PAGESPEED_API_KEY;
  if (apiKey) {
    params.set('key', apiKey);
    console.log(`🔑 Использую API ключ для ${strategy}`);
  } else {
    console.log(`⚠️  API ключ не найден. Используем лимитированный доступ`);
  }
  
  const fullUrl = `${API_URL}?${params}`;
  
  try {
    console.log(`📊 Проверяю ${strategy}: ${url}`);
    const response = await fetch(fullUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Lighthouse Performance Score
    const performanceScore = Math.round(data.lighthouseResult.categories.performance.score * 100);
    
    // Core Web Vitals from Lighthouse (Lab Data)
    const lighthouse = data.lighthouseResult.audits;
    const lcp = lighthouse['largest-contentful-paint']?.displayValue || 'N/A';
    const fid = lighthouse['first-input-delay']?.displayValue || lighthouse['total-blocking-time']?.displayValue || 'N/A';
    const cls = lighthouse['cumulative-layout-shift']?.displayValue || 'N/A';
    
    // Core Web Vitals from CrUX (Field Data)
    const fieldData = data.loadingExperience?.metrics || {};
    const lcpField = fieldData.LARGEST_CONTENTFUL_PAINT_MS;
    const fidField = fieldData.FIRST_INPUT_DELAY_MS || fieldData.INTERACTION_TO_NEXT_PAINT;
    const clsField = fieldData.CUMULATIVE_LAYOUT_SHIFT_SCORE;
    
    return {
      url,
      strategy,
      performanceScore,
      lab: { lcp, fid, cls },
      field: {
        lcp: lcpField,
        fid: fidField, 
        cls: clsField
      }
    };
    
  } catch (error) {
    if (error.message.includes('429')) {
      console.error(`⏱️  Лимит API запросов. Получите API ключ: https://developers.google.com/speed/docs/insights/v5/get-started`);
      console.error(`💡 Добавьте PAGESPEED_API_KEY в .env.local для увеличения лимитов`);
    } else {
      console.error(`❌ Ошибка проверки ${url} (${strategy}):`, error.message);
    }
    return null;
  }
}

async function generateReport() {
  console.log('🚀 Запуск проверки Core Web Vitals для k-lining.ru\n');
  console.log('📋 Согласно Google SEO Starter Guide:\n');
  console.log('   • LCP (Largest Contentful Paint) < 2.5s');
  console.log('   • FID (First Input Delay) < 100ms'); 
  console.log('   • CLS (Cumulative Layout Shift) < 0.1\n');
  
  const results = [];
  
  for (const page of pages) {
    console.log(`\n🌐 Проверяю: ${page.name}`);
    console.log(`📄 URL: ${page.url}`);
    
    for (const strategy of strategies) {
      const result = await checkPageSpeed(page.url, strategy);
      if (result) {
        results.push(result);
        
        console.log(`\n📱 ${strategy.toUpperCase()}:`);
        console.log(`   Performance Score: ${formatScore(result.performanceScore)}`);
        console.log(`   
   LAB DATA (Lighthouse):`);
        console.log(`   • LCP: ${result.lab.lcp}`);
        console.log(`   • FID/TBT: ${result.lab.fid}`);
        console.log(`   • CLS: ${result.lab.cls}`);
        
        if (Object.keys(result.field).some(key => result.field[key])) {
          console.log(`   
   FIELD DATA (CrUX - реальные пользователи):`);
          console.log(`   • LCP: ${formatMetric(result.field.lcp)}`);
          console.log(`   • FID/INP: ${formatMetric(result.field.fid)}`);
          console.log(`   • CLS: ${formatMetric(result.field.cls)}`);
        } else {
          console.log(`   🔍 Field Data: Недостаточно данных (нужно больше трафика)`);
        }
      }
      
      // Пауза между запросами (дольше без API ключа)
      const delay = process.env.PAGESPEED_API_KEY ? 1000 : 2000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  // Итоговый отчет
  console.log('\n' + '='.repeat(60));
  console.log('📊 ИТОГОВЫЙ ОТЧЕТ CORE WEB VITALS');
  console.log('='.repeat(60));
  
  const averageScores = {
    mobile: results.filter(r => r.strategy === 'mobile').reduce((sum, r) => sum + r.performanceScore, 0) / results.filter(r => r.strategy === 'mobile').length,
    desktop: results.filter(r => r.strategy === 'desktop').reduce((sum, r) => sum + r.performanceScore, 0) / results.filter(r => r.strategy === 'desktop').length
  };
  
  console.log(`📱 Средний Performance Score (Mobile): ${formatScore(Math.round(averageScores.mobile))}`);
  console.log(`💻 Средний Performance Score (Desktop): ${formatScore(Math.round(averageScores.desktop))}`);
  
  // Рекомендации
  console.log('\n💡 РЕКОМЕНДАЦИИ ПО ОПТИМИЗАЦИИ:');
  
  if (averageScores.mobile < 90 || averageScores.desktop < 90) {
    console.log('🔧 Нужна оптимизация производительности:');
    console.log('   • Оптимизировать изображения (WebP, сжатие)');
    console.log('   • Минифицировать CSS/JS');
    console.log('   • Использовать CDN');
    console.log('   • Lazy loading для изображений');
    console.log('   • Оптимизировать шрифты (preload)');
  } else {
    console.log('✅ Отличная производительность! Продолжайте мониторинг.');
  }
  
  console.log('\n📈 ДАЛЬНЕЙШИЕ ДЕЙСТВИЯ:');
  console.log('   • Регулярно запускать этот скрипт');
  console.log('   • Мониторить в Google Search Console');
  console.log('   • Отслеживать CrUX данные');
  console.log('   • Тестировать после каждого деплоя');
  
  const timestamp = new Date().toLocaleString('ru-RU');
  console.log(`\n⏰ Отчет сгенерирован: ${timestamp}`);
}

// Запуск
generateReport().catch(console.error);