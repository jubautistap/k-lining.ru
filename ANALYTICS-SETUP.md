# 📊 НАСТРОЙКА АНАЛИТИКИ И УВЕДОМЛЕНИЙ

## 🔧 Проблема
Счетчики аналитики не отправляют уведомления о событиях (клики по кнопкам, отправка форм, звонки).

## ✅ Решение

### 1. Яндекс.Метрика (ID: 103567092)

#### Настройки в `app/layout.tsx`:
```javascript
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

#### Отслеживаемые события:
- **Клики по кнопкам заказа**: `order_button_click`
- **Отправка форм**: `form_submit`
- **Звонки**: `phone_call`

### 2. Google Analytics 4

#### ID: `G-64S5B5HBCR` (Stream ID: 11856975982)

#### Отслеживаемые события:
- **Клики по кнопкам заказа**: `order_button_click`
- **Отправка форм**: `form_submit`
- **Звонки**: `phone_call`

### 3. Компоненты с отслеживанием

#### OrderButton (`components/ui/OrderButton.tsx`)
```typescript
// Добавлены атрибуты для отслеживания
data-order-button="true"
data-service={service}

// Отслеживание событий при клике
if (typeof window !== 'undefined' && (window as any).ym) {
  (window as any).ym(103567092, 'reachGoal', 'order_button_click', {
    service: service
  });
}
```

#### ContactSection (`components/sections/ContactSection.tsx`)
```typescript
// Форма с атрибутом
<form data-form-type="contact">

// Отслеживание отправки формы
ym(103567092, 'reachGoal', 'form_submit', {
  form_type: 'contact',
  has_email: !!data.email
});
```

#### AmoCRMModal (`components/modals/AmoCRMModal.tsx`)
```typescript
// Форма с атрибутом
<form data-form-type="callback">

// Отслеживание отправки формы
ym(103567092, 'reachGoal', 'form_submit', {
  form_type: 'callback',
  service: 'callback'
});
```

## 🧪 Тестирование

### Страница тестирования: `/public/analytics-test.html`

#### Функции тестирования:
1. **Проверка Яндекс.Метрики**: `checkYandexMetrika()`
2. **Проверка Google Analytics**: `checkGoogleAnalytics()`
3. **Тестовые события**: `testOrderButton()`, `testPhoneCall()`, `testFormSubmit()`

#### Как использовать:
1. Откройте `https://k-lining.ru/analytics-test.html`
2. Нажмите кнопки тестирования
3. Проверьте логи в консоли браузера
4. Убедитесь, что события отправляются в аналитику

## 🔍 Диагностика проблем

### Проверка загрузки счетчиков:
```javascript
// Проверка Яндекс.Метрики
if (typeof ym !== 'undefined') {
  console.log('✅ Яндекс.Метрика загружена');
} else {
  console.log('❌ Яндекс.Метрика НЕ загружена');
}

// Проверка Google Analytics
if (typeof gtag !== 'undefined') {
  console.log('✅ Google Analytics загружен');
} else {
  console.log('❌ Google Analytics НЕ загружен');
}
```

### Проверка сетевых запросов:
1. Откройте DevTools → Network
2. Отфильтруйте по `mc.yandex.ru` и `googletagmanager.com`
3. Убедитесь, что запросы отправляются

## 📋 Чек-лист

- [ ] Яндекс.Метрика загружается без ошибок
- [ ] Google Analytics загружается без ошибок
- [ ] События отправляются при клике по кнопкам заказа
- [ ] События отправляются при отправке форм
- [ ] События отправляются при клике по телефонным ссылкам
- [ ] Уведомления появляются в панели Яндекс.Метрики
- [ ] События отображаются в Google Analytics

## 🚀 Следующие шаги

1. **Заменить тестовый GA ID** на реальный
2. **Настроить цели в Яндекс.Метрике**:
   - Цель "Заявка" → событие `order_button_click`
   - Цель "Форма" → событие `form_submit`
   - Цель "Звонок" → событие `phone_call`

3. **Настроить цели в Google Analytics**:
   - Создать события для отслеживания конверсий
   - Настроить воронку продаж

4. **Мониторинг**:
   - Ежедневно проверять поступление данных
   - Настроить уведомления о сбоях
   - Отслеживать конверсии по источникам трафика

## 📞 Поддержка

При проблемах с аналитикой:
1. Проверьте консоль браузера на ошибки
2. Используйте страницу `/analytics-test.html` для диагностики
3. Убедитесь, что блокировщики рекламы отключены
4. Проверьте настройки приватности браузера 