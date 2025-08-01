# Оптимизация производительности для SEO

## 🔥 Критично (сделать в первую очередь)

### Core Web Vitals
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms  
- **CLS (Cumulative Layout Shift)**: < 0.1

### Оптимизация изображений
1. Использовать `next/image` для всех изображений
2. Добавить `priority` для изображений выше сгиба
3. Использовать WebP формат где возможно
4. Оптимизировать размеры изображений

### Оптимизация шрифтов
1. Предзагружать критические шрифты
2. Использовать `font-display: swap`
3. Подключать только нужные начертания

## ⚡ Важно (сделать во вторую очередь)

### Оптимизация CSS
1. Удалить неиспользуемые стили
2. Минифицировать CSS
3. Критический CSS inline
4. Остальные стили загружать асинхронно

### Оптимизация JavaScript
1. Разделить код на чанки
2. Ленивая загрузка компонентов
3. Минифицировать JS
4. Использовать `React.lazy()` для компонентов

### Кэширование
1. Настроить кэширование статических ресурсов
2. Использовать CDN для изображений
3. Настроить Service Worker для PWA

## 📊 Мониторинг производительности

### Инструменты для проверки
- Google PageSpeed Insights
- GTmetrix
- WebPageTest
- Lighthouse

### Метрики для отслеживания
- Время загрузки страницы
- Размер страницы
- Количество запросов
- Core Web Vitals

## 🎯 Рекомендации по оптимизации

### Для изображений
```jsx
import Image from 'next/image'

// Критическое изображение
<Image
  src="/hero.jpg"
  alt="KliningPro - Профессиональная уборка"
  width={1200}
  height={630}
  priority
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>

// Обычное изображение
<Image
  src="/blog/article.jpg"
  alt="Статья о клининге"
  width={800}
  height={400}
  loading="lazy"
/>
```

### Для шрифтов
```css
/* В globals.css */
@font-face {
  font-family: 'Inter';
  font-display: swap;
  src: url('/fonts/Inter-Regular.woff2') format('woff2');
}
```

### Для кэширования
```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}
```

## 📈 Цели по производительности

### Целевые метрики
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **First Input Delay**: < 100ms
- **Cumulative Layout Shift**: < 0.1
- **Speed Index**: < 3.4s

### Размер страницы
- Главная страница: < 2MB
- Страницы блога: < 1.5MB
- Остальные страницы: < 1MB

### Количество запросов
- Главная страница: < 50 запросов
- Остальные страницы: < 30 запросов 