import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // КРИТИЧНО: Запрет индексации админских страниц
  if (request.nextUrl.pathname.startsWith('/admin')) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet, noimageindex');
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
  }

  // Кеширование статических ресурсов
  if (request.nextUrl.pathname.match(/\.(ico|png|jpg|jpeg|gif|svg|webp|avif|woff|woff2|ttf|eot|css|js)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }

  // Кеширование API ответов (кроме динамических)
  if (request.nextUrl.pathname.startsWith('/api/') && !request.nextUrl.pathname.includes('dynamic')) {
    response.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=86400');
  }

  // Безопасность
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Обновленный CSP для лучшей совместимости с трекерами
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://mc.yandex.ru https://yandex.st https://yastatic.net https://www.googletagmanager.com https://www.google-analytics.com https://www.google.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob: https://mc.yandex.ru https://www.google-analytics.com https://www.google.com; connect-src 'self' https://mc.yandex.ru https://mc.yandex.com https://mc.yandex.md https://www.google-analytics.com https://analytics.google.com https://www.google.com; frame-src 'self' https://mc.yandex.ru https://mc.yandex.md; object-src 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests;"
  );

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