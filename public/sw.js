// Service Worker для кеширования ресурсов
const CACHE_NAME = 'kliningpro-v1';
const STATIC_CACHE = [
  '/',
  '/manifest.json',
  '/logo.png',
  '/favicon.ico'
];

// Установка Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(STATIC_CACHE);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// Активация Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Обработка запросов
self.addEventListener('fetch', (event) => {
  // Кешируем только GET запросы
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Возвращаем из кеша если есть
        if (response) {
          return response;
        }

        // Иначе делаем запрос
        return fetch(event.request).then((response) => {
          // Кешируем только успешные ответы
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Кешируем статические ресурсы
          if (event.request.url.match(/\.(css|js|png|jpg|jpeg|gif|svg|webp|avif|woff|woff2)$/)) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
          }

          return response;
        });
      })
  );
});