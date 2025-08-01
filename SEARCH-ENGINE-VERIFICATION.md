# Верификация в поисковых системах

## 🔥 Критично (сделать в первую очередь)

### Google Search Console
1. Перейти на https://search.google.com/search-console
2. Добавить сайт: https://klining.pro
3. Выбрать метод верификации: HTML-тег
4. Скопировать код верификации
5. Обновить `app/layout.tsx`:
   ```typescript
   verification: {
     google: 'ВАШ_КОД_ВЕРИФИКАЦИИ',
     yandex: 'your-yandex-verification-code',
   },
   ```

### Yandex Webmaster
1. Перейти на https://webmaster.yandex.ru
2. Добавить сайт: https://klining.pro
3. Выбрать метод верификации: HTML-тег
4. Скопировать код верификации
5. Обновить `app/layout.tsx`:
   ```typescript
   verification: {
     google: 'your-google-verification-code',
     yandex: 'ВАШ_КОД_ВЕРИФИКАЦИИ',
   },
   ```

## 📊 Настройка аналитики

### Google Analytics 4
1. Создать аккаунт на https://analytics.google.com
2. Создать ресурс для сайта
3. Получить код отслеживания
4. Добавить в `app/layout.tsx`:
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'GA_MEASUREMENT_ID');
   </script>
   ```

### Yandex.Metrica
1. Создать счетчик на https://metrika.yandex.ru
2. Получить код отслеживания
3. Добавить в `app/layout.tsx`:
   ```html
   <script type="text/javascript">
     (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
     m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
     (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
     ym(COUNTER_ID, "init", {clickmap:true, trackLinks:true, accurateTrackBounce:true});
   </script>
   ```

## 🎯 Дополнительные настройки

### Google Search Console
- Отправить sitemap.xml
- Настроить уведомления
- Проверить покрытие индекса
- Настроить международное таргетирование (если планируется)

### Yandex Webmaster
- Отправить sitemap.xml
- Настроить регион сайта: Москва
- Проверить индексацию
- Настроить уведомления

## 📈 Мониторинг

### Ключевые метрики для отслеживания
- Позиции в поиске по ключевым словам
- Органический трафик
- Скорость загрузки (Core Web Vitals)
- Конверсии из поиска
- Время на сайте
- Показатель отказов

### Ключевые слова для мониторинга
- уборка квартир москва
- клининговая компания
- уборка офисов
- химчистка мебели
- мытье окон
- уборка после ремонта
- генеральная уборка квартиры
- профессиональная уборка офиса
- химчистка дивана на дому
- расчет стоимости уборки 