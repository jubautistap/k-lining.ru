# 📊 ID АНАЛИТИКИ

## 🎯 Google Analytics 4
- **Measurement ID**: `G-64S5B5HBCR`
- **Stream ID**: `11856975982`
- **Stream Name**: `K-lining`
- **Stream URL**: `https://k-lining.ru`

## 📈 Яндекс.Метрика
- **Counter ID**: `103567092`
- **URL**: `https://metrika.yandex.ru/103567092`

## 🔧 Настройки в коде

### Google Analytics
```javascript
// В app/layout.tsx
gtag('config', 'G-64S5B5HBCR', {
  page_title: document.title,
  page_location: window.location.href
});
```

### Яндекс.Метрика
```javascript
// В app/layout.tsx
ym(103567092, 'init', {
  ssr: true,
  webvisor: true,
  clickmap: true,
  ecommerce: "dataLayer",
  accurateTrackBounce: true,
  trackLinks: true,
  defer: true,
  trackHash: true,
  ut: 'noindex'
});
```

## 📊 Отслеживаемые события

### Google Analytics
- `order_button_click` - клики по кнопкам заказа
- `form_submit` - отправка форм
- `phone_call` - клики по телефонным ссылкам

### Яндекс.Метрика
- `order_button_click` - клики по кнопкам заказа
- `form_submit` - отправка форм
- `phone_call` - клики по телефонным ссылкам

## 🧪 Тестирование
- **Страница тестирования**: `https://k-lining.ru/analytics-test.html`
- **Проверка GA**: `https://analytics.google.com/`
- **Проверка YM**: `https://metrika.yandex.ru/103567092`

## 📋 Чек-лист настройки

### Google Analytics 4
- [ ] Счетчик загружается без ошибок
- [ ] События отправляются в реальном времени
- [ ] Настроены цели для конверсий
- [ ] Настроена воронка продаж

### Яндекс.Метрика
- [ ] Счетчик загружается без ошибок
- [ ] События отправляются в реальном времени
- [ ] Настроены цели для конверсий
- [ ] Настроен вебвизор

## 🚀 Следующие шаги

1. **Настроить цели в GA4**:
   - Создать событие `order_button_click` как цель
   - Создать событие `form_submit` как цель
   - Создать событие `phone_call` как цель

2. **Настроить цели в Яндекс.Метрике**:
   - Создать цель "Заявка" → событие `order_button_click`
   - Создать цель "Форма" → событие `form_submit`
   - Создать цель "Звонок" → событие `phone_call`

3. **Настроить уведомления**:
   - Email уведомления о новых заявках
   - Уведомления о достижении целей
   - Отчеты по конверсиям 