// Service Worker для агрессивного кэширования статических ресурсов
// Версия кэша - обновлять при изменениях
const CACHE_VERSION = 'v1.2.0';
const STATIC_CACHE = `klining-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `klining-dynamic-${CACHE_VERSION}`;

// Ресурсы для кэширования при установке
const STATIC_ASSETS = [
  '/',
  '/og-image.webp',
  '/logo.png',
  '/favicon.ico',
  '/manifest.json'
];

// Паттерны для кэширования
const CACHE_PATTERNS = {
  static: /\.(js|css|png|jpg|jpeg|gif|ico|svg|woff2?|ttf|eot)$/,
  images: /\.(png|jpg|jpeg|gif|webp|avif)$/,
  api: /^\/api\//
};

// Установка Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Активация и очистка старых кэшей
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter(name => name.includes('klining') && name !== STATIC_CACHE && name !== DYNAMIC_CACHE)
            .map(name => caches.delete(name))
        );
      })
      .then(() => self.clients.claim())
  );
});

// Обработка fetch запросов
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const { url, method } = request;

  // Только GET запросы
  if (method !== 'GET') return;

  // Исключаем админские URL
  if (url.includes('/admin') || url.includes('/_next/webpack-hmr')) {
    return;
  }

  event.respondWith(handleFetch(request));
});

async function handleFetch(request) {
  const url = new URL(request.url);
  
  try {
    // Стратегия Cache First для статических ресурсов
    if (CACHE_PATTERNS.static.test(url.pathname) || CACHE_PATTERNS.images.test(url.pathname)) {
      return await cacheFirst(request);
    }

    // Стратегия Network First для HTML страниц
    if (url.pathname.endsWith('/') || url.pathname.includes('.html') || !url.pathname.includes('.')) {
      return await networkFirst(request);
    }

    // API запросы - только сеть
    if (CACHE_PATTERNS.api.test(url.pathname)) {
      return await fetch(request);
    }

    // По умолчанию - сначала сеть
    return await networkFirst(request);

  } catch (error) {
    // Service worker fetch failed, fallback to network
    return fetch(request);
  }
}

// Cache First стратегия
async function cacheFirst(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    // Обновляем в фоне
    fetch(request)
      .then(response => {
        if (response.ok) {
          cache.put(request, response.clone());
        }
      })
      .catch(() => {}); // Тихо игнорируем ошибки фоновых обновлений
    
    return cachedResponse;
  }

  const response = await fetch(request);
  if (response.ok) {
    cache.put(request, response.clone());
  }
  return response;
}

// Network First стратегия
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    
    if (response.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    // Fallback к кэшу при отсутствии сети
    const cache = await caches.open(DYNAMIC_CACHE);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    throw error;
  }
}

// Очистка кэша по расписанию (каждые 24 часа)
self.addEventListener('message', (event) => {
  if (event.data === 'CLEAN_CACHE') {
    cleanOldCache();
  }
});

async function cleanOldCache() {
  const cache = await caches.open(DYNAMIC_CACHE);
  const requests = await cache.keys();
  
  // Удаляем записи старше 7 дней
  const weekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
  
  for (const request of requests) {
    const response = await cache.match(request);
    const dateHeader = response?.headers.get('date');
    
    if (dateHeader && new Date(dateHeader).getTime() < weekAgo) {
      await cache.delete(request);
    }
  }
}