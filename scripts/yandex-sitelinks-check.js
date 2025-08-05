#!/usr/bin/env node

/**
 * 🔗 Проверка оптимизации для быстрых ссылок Яндекса
 * Анализ структуры навигации и внутренней перелинковки k-lining.ru
 */

const https = require('https');

const SITE_URL = 'https://k-lining.ru';

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          html: data
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

function analyzeForSitelinks(html) {
  const analysis = {
    // Навигационные ссылки
    navLinks: [],
    
    // Внутренние ссылки
    internalLinks: [],
    
    // Популярные разделы
    popularSections: [],
    
    // Хлебные крошки
    hasBreadcrumbs: false,
    breadcrumbSchema: false,
    
    // Структурированные данные для навигации
    hasNavigationSchema: false,
    hasSiteNavigationElement: false,
    
    // Анкорные тексты (для анализа качества)
    anchorTexts: [],
    
    // Счетчики
    totalInternalLinks: 0,
    uniqueInternalLinks: 0
  };
  
  // Ищем навигационные ссылки в меню
  const navMatches = html.match(/<nav[^>]*>[\s\S]*?<\/nav>/gi);
  if (navMatches) {
    navMatches.forEach(nav => {
      const linkMatches = nav.match(/<a[^>]*href=["']([^"']+)["'][^>]*>([^<]+)<\/a>/gi);
      if (linkMatches) {
        linkMatches.forEach(link => {
          const hrefMatch = link.match(/href=["']([^"']+)["']/);
          const textMatch = link.match(/>([^<]+)</);
          if (hrefMatch && textMatch && hrefMatch[1].startsWith('/')) {
            analysis.navLinks.push({
              href: hrefMatch[1],
              text: textMatch[1].trim()
            });
          }
        });
      }
    });
  }
  
  // Ищем все внутренние ссылки
  const allLinkMatches = html.match(/<a[^>]*href=["']\/[^"']*["'][^>]*>([^<]+)<\/a>/gi);
  if (allLinkMatches) {
    const linkSet = new Set();
    allLinkMatches.forEach(link => {
      const hrefMatch = link.match(/href=["']([^"']+)["']/);
      const textMatch = link.match(/>([^<]+)</);
      if (hrefMatch && textMatch) {
        const href = hrefMatch[1];
        const text = textMatch[1].trim();
        
        analysis.internalLinks.push({ href, text });
        analysis.anchorTexts.push(text);
        linkSet.add(href);
      }
    });
    
    analysis.totalInternalLinks = allLinkMatches.length;
    analysis.uniqueInternalLinks = linkSet.size;
  }
  
  // Проверяем хлебные крошки
  analysis.hasBreadcrumbs = html.includes('breadcrumb') || html.includes('Навигация по сайту');
  analysis.breadcrumbSchema = html.includes('"@type":"BreadcrumbList"') || html.includes('"@type": "BreadcrumbList"');
  
  // Проверяем схемы навигации
  analysis.hasNavigationSchema = html.includes('SiteNavigationElement');
  analysis.hasSiteNavigationElement = html.includes('"@type":"SiteNavigationElement"');
  
  // Анализируем популярные разделы
  const serviceLinks = analysis.internalLinks.filter(link => 
    link.href.includes('/services/') || 
    link.text.toLowerCase().includes('уборка') ||
    link.text.toLowerCase().includes('химчистка') ||
    link.text.toLowerCase().includes('мытье')
  );
  
  analysis.popularSections = serviceLinks.slice(0, 6);
  
  return analysis;
}

function scoreOptimization(analysis) {
  let score = 0;
  const maxScore = 100;
  const issues = [];
  const recommendations = [];
  
  // Навигационные ссылки (20 баллов)
  if (analysis.navLinks.length >= 4) {
    score += 20;
  } else {
    issues.push(`Мало навигационных ссылок: ${analysis.navLinks.length}/4`);
    recommendations.push('Добавить больше разделов в главное меню');
  }
  
  // Качество анкорных текстов (20 баллов) 
  const goodAnchors = analysis.anchorTexts.filter(text => 
    text.length > 3 && 
    text.length < 50 && 
    !text.includes('Подробнее') &&
    !text.includes('Читать далее')
  );
  
  if (goodAnchors.length >= analysis.totalInternalLinks * 0.7) {
    score += 20;
  } else {
    issues.push(`Качество анкорных текстов низкое: ${goodAnchors.length}/${analysis.totalInternalLinks}`);
    recommendations.push('Использовать более описательные анкорные тексты');
  }
  
  // Внутренняя перелинковка (20 баллов)
  if (analysis.totalInternalLinks >= 20) {
    score += 20;
  } else {
    issues.push(`Мало внутренних ссылок: ${analysis.totalInternalLinks}/20`);
    recommendations.push('Увеличить количество внутренних ссылок');
  }
  
  // Разнообразие ссылок (15 баллов)
  if (analysis.uniqueInternalLinks >= 10) {
    score += 15;
  } else {
    issues.push(`Мало уникальных ссылок: ${analysis.uniqueInternalLinks}/10`);
    recommendations.push('Добавить ссылки на больше уникальных страниц');
  }
  
  // Хлебные крошки (10 баллов)
  if (analysis.hasBreadcrumbs) {
    score += 5;
  } else {
    issues.push('Отсутствуют хлебные крошки');
    recommendations.push('Добавить хлебные крошки на внутренние страницы');
  }
  
  if (analysis.breadcrumbSchema) {
    score += 5;
  } else {
    issues.push('Отсутствует BreadcrumbList schema');
    recommendations.push('Добавить разметку хлебных крошек');
  }
  
  // Популярные разделы (10 баллов)
  if (analysis.popularSections.length >= 4) {
    score += 10;
  } else {
    issues.push(`Мало популярных разделов: ${analysis.popularSections.length}/4`);
    recommendations.push('Выделить больше популярных услуг в навигации');
  }
  
  // Навигационные схемы (5 баллов)
  if (analysis.hasNavigationSchema) {
    score += 5;
  } else {
    issues.push('Отсутствует навигационная схема');
    recommendations.push('Добавить SiteNavigationElement schema');
  }
  
  return { score, maxScore, issues, recommendations };
}

function getScoreEmoji(score, maxScore) {
  const percentage = (score / maxScore) * 100;
  if (percentage >= 90) return '🟢 Отлично';
  if (percentage >= 70) return '🟡 Хорошо';
  if (percentage >= 50) return '🟠 Удовлетворительно';
  return '🔴 Требует улучшения';
}

async function checkSitelinksOptimization() {
  console.log('🔗 Проверка оптимизации для быстрых ссылок Яндекса\n');
  console.log('📋 Анализируем k-lining.ru согласно требованиям Яндекса:\n');
  
  try {
    console.log('🌐 Загружаю главную страницу...');
    const response = await makeRequest(SITE_URL);
    
    if (response.statusCode !== 200) {
      throw new Error(`HTTP ${response.statusCode}`);
    }
    
    console.log('✅ Страница загружена, анализирую структуру...\n');
    
    const analysis = analyzeForSitelinks(response.html);
    const scoring = scoreOptimization(analysis);
    
    // Результаты анализа
    console.log('=' .repeat(60));
    console.log('📊 РЕЗУЛЬТАТЫ АНАЛИЗА');
    console.log('=' .repeat(60));
    
    console.log(`🎯 Общая оценка: ${scoring.score}/${scoring.maxScore} ${getScoreEmoji(scoring.score, scoring.maxScore)}`);
    console.log(`📈 Готовность к быстрым ссылкам: ${Math.round((scoring.score / scoring.maxScore) * 100)}%\n`);
    
    // Детальный анализ
    console.log('🔍 Детальный анализ:');
    console.log(`   • Навигационных ссылок: ${analysis.navLinks.length}`);
    console.log(`   • Внутренних ссылок: ${analysis.totalInternalLinks}`);
    console.log(`   • Уникальных страниц: ${analysis.uniqueInternalLinks}`);
    console.log(`   • Хлебные крошки: ${analysis.hasBreadcrumbs ? '✅' : '❌'}`);
    console.log(`   • BreadcrumbList schema: ${analysis.breadcrumbSchema ? '✅' : '❌'}`);
    console.log(`   • Популярных разделов: ${analysis.popularSections.length}\n`);
    
    // Навигационные ссылки
    if (analysis.navLinks.length > 0) {
      console.log('🧭 Главная навигация:');
      analysis.navLinks.forEach(link => {
        console.log(`   • "${link.text}" → ${link.href}`);
      });
      console.log();
    }
    
    // Популярные разделы
    if (analysis.popularSections.length > 0) {
      console.log('🔥 Популярные разделы (для быстрых ссылок):');
      analysis.popularSections.forEach(section => {
        console.log(`   • "${section.text}" → ${section.href}`);
      });
      console.log();
    }
    
    // Проблемы
    if (scoring.issues.length > 0) {
      console.log('⚠️  Обнаруженные проблемы:');
      scoring.issues.forEach(issue => {
        console.log(`   • ${issue}`);
      });
      console.log();
    }
    
    // Рекомендации
    if (scoring.recommendations.length > 0) {
      console.log('💡 Рекомендации по улучшению:');
      scoring.recommendations.forEach((rec, index) => {
        console.log(`   ${index + 1}. ${rec}`);
      });
      console.log();
    }
    
    // Прогноз
    console.log('🔮 Прогноз формирования быстрых ссылок:');
    const percentage = (scoring.score / scoring.maxScore) * 100;
    
    if (percentage >= 90) {
      console.log('   🟢 Очень высокая вероятность появления быстрых ссылок');
      console.log('   ⏰ Ожидаемый срок: 2-4 недели после попадания в ТОП-5');
    } else if (percentage >= 70) {
      console.log('   🟡 Высокая вероятность появления быстрых ссылок');
      console.log('   ⏰ Ожидаемый срок: 1-2 месяца после попадания в ТОП-5');
    } else if (percentage >= 50) {
      console.log('   🟠 Средняя вероятность появления быстрых ссылок');
      console.log('   ⏰ Требуется дополнительная оптимизация');
    } else {
      console.log('   🔴 Низкая вероятность появления быстрых ссылок');
      console.log('   ⚠️  Необходима серьезная доработка структуры');
    }
    
    console.log('\n📋 Следующие шаги:');
    console.log('   1. Исправить обнаруженные проблемы');
    console.log('   2. Работать над попаданием в ТОП-5 Яндекса');
    console.log('   3. Мониторить в Яндекс.Вебмастере');
    console.log('   4. Повторять проверку еженедельно');
    
    const timestamp = new Date().toLocaleString('ru-RU');
    console.log(`\n⏰ Анализ завершен: ${timestamp}`);
    
  } catch (error) {
    console.error(`❌ Ошибка анализа: ${error.message}`);
  }
}

// Запуск
checkSitelinksOptimization().catch(console.error);