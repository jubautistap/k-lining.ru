import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const pathname = request.nextUrl.pathname;
  const search = request.nextUrl.searchParams;
  const referer = request.headers.get('referer') || '';

  // Определяем просмотр Яндексом: либо по Referer, либо по спец-параметру _ym_status-check
  const isYandexRef = /https?:\/\/([^\/]+\.)?(metrika\.yandex\.(ru|by)|metrica\.yandex\.(com|com\.tr)|webvisor\.com)/i.test(referer);
  const isYmStatusCheck = search.has('_ym_status-check');
  const isYandexViewer = isYandexRef || isYmStatusCheck;

  // КРИТИЧНО: Запрет индексации админских страниц
  if (pathname.startsWith('/admin')) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet, noimageindex');
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
  }

  // Кеширование статических ресурсов
  if (pathname.match(/\.(ico|png|jpg|jpeg|gif|svg|webp|avif|woff|woff2|ttf|eot|css|js)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  } else {
    // Для HTML и прочего — отключаем кэш
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  }

  // Кеширование API ответов (кроме динамических)
  if (pathname.startsWith('/api/') && !pathname.includes('dynamic')) {
    const hasAuthHeader = !!request.headers.get('authorization');
    const isAuthApi = pathname.startsWith('/api/auth');
    const isAdminApi = pathname.startsWith('/api/admin');
    const isGet = request.method === 'GET';

    if (!isGet || hasAuthHeader || isAuthApi || isAdminApi) {
      // Для приватных/мутирующих запросов кэш полностью отключаем
      response.headers.set('Cache-Control', 'no-store');
      response.headers.set('Pragma', 'no-cache');
      response.headers.set('Expires', '0');
    } else {
      // Публичные GET API можно кэшировать
      response.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=86400');
    }
  }

  // Безопасность
  response.headers.set('X-Content-Type-Options', 'nosniff');
  if (!isYandexViewer) {
    response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  }
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // CSP: ужесточенная; без nonce пока, но без лишних источников
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://mc.yandex.ru https://metrika.yandex.ru https://www.googletagmanager.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' https://mc.yandex.ru https://metrika.yandex.ru https://metrica.yandex.com https://metrica.yandex.com.tr https://mc.webvisor.org https://mc.webvisor.com https://www.google-analytics.com https://analytics.google.com wss:",
    isYandexViewer
      ? "frame-ancestors 'self' https://metrika.yandex.ru https://metrika.yandex.by https://metrica.yandex.com https://metrica.yandex.com.tr https://webvisor.com https://*.webvisor.com"
      : "frame-ancestors 'self'",
    "frame-src 'self' https://mc.yandex.ru",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    'upgrade-insecure-requests',
  ]
    .filter(Boolean)
    .join('; ');
  response.headers.set('Content-Security-Policy', csp);

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};