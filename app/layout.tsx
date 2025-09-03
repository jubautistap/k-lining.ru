import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import LazyProviders from '@/components/providers/LazyProviders';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import SiteChrome from '@/components/providers/SiteChrome';
import GlobalErrorHandlers from '@/components/providers/GlobalErrorHandlers';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: {
    default: 'Уборка в Москве — мин. заказ 6 000 ₽ | K-lining 24/7',
    template: '%s | K-lining'
  },
  description: 'Профессиональная уборка квартир и офисов в Москве 24/7 ⭐ Клининговая компания K-lining ⭐ Химчистка мебели, мытьё окон, генеральная уборка, уборка после ремонта ⭐ Минимальный заказ — 6,000₽ ⭐ Выезд в любой район Москвы и МО',
  keywords: 'уборка квартир москва, клининговая компания москва, уборка офисов москва, генеральная уборка москва, химчистка мебели москва, мытье окон москва, уборка после ремонта москва, профессиональная уборка, клининг москва цена, химчистка дивана на дому, клининг 24 часа, уборка квартир недорого москва, k-lining, басманный район, бакунинская',
  authors: [{ name: 'K-lining' }],
  creator: 'K-lining',
  publisher: 'K-lining',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://k-lining.ru'),
  // Каноникал выставляем динамически клиентом, чтобы не форсить '/' для всех страниц
  openGraph: {
    title: 'Уборка квартир и офисов в Москве - K-lining | Мин. заказ 6 000 ₽',
    description: 'Профессиональная уборка квартир и офисов в Москве ⭐ Клининговая компания K-lining ⭐ Химчистка мебели, мытьё окон, генеральная уборка ⭐ Работаем 24/7 ⭐ Гарантия качества',
    url: 'https://k-lining.ru',
    siteName: 'K-lining',
    images: [
      {
        url: '/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'K-lining - Профессиональная уборка в Москве',
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'K-lining - Профессиональная уборка в Москве',
    description: 'Профессиональная клининговая компания в Москве и МО. Уборка квартир, домов, офисов в Басманном, Тверском и других районах. Химчистка, мытье окон.',
          images: ['/og-image.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'dXCtdaCXgjXxv80y2KG6vqVXQCV2UEYC543YxAXFeB4',
    yandex: '2d079be8c95113d8',
  },
  category: 'business',
  classification: 'cleaning services',
  other: {
    'geo.region': 'RU-MOW',
    'geo.placename': 'Москва',
    'geo.position': '55.7558;37.6176',
    'ICBM': '55.7558, 37.6176',
    'DC.title': 'K-lining - Профессиональная уборка в Москве',
    'DC.description': 'Профессиональная клининговая компания в Москве',
    'DC.subject': 'уборка квартир, клининг, химчистка',
    'DC.creator': 'K-lining',
    'DC.publisher': 'K-lining',
    'DC.date.created': '2024-01-01',
    'DC.date.modified': '2025-01-15',
    'DC.language': 'ru',
    'DC.coverage': 'Москва',
    'DC.type': 'Service',
    'DC.format': 'text/html',
    'DC.identifier': 'https://k-lining.ru',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const YandexMetrika = dynamic(() => import('@/components/providers/YandexMetrika'), { ssr: false });
  const YM_ID = Number(process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID) || 103567092;
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        
        {/* Критичные resource hints для максимальной скорости */}
        <link rel="preload" as="image" href="/og-image.webp" fetchPriority="high" />
        
        {/* Preconnect для критичных внешних ресурсов */}
        <link rel="preconnect" href="https://mc.yandex.ru" crossOrigin="" />
        <link rel="preconnect" href="https://mc.webvisor.org" crossOrigin="" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="" />
        <link rel="preconnect" href="https://metrika.yandex.ru" crossOrigin="" />
        <link rel="preconnect" href="https://analytics.google.com" crossOrigin="" />
        
        {/* DNS prefetch для быстрого разрешения доменов */}
        <link rel="dns-prefetch" href="//mc.yandex.ru" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="shortcut icon" href="/favicon.ico?v=2" />
        <link rel="icon" href="/favicon.ico?v=2" sizes="any" />
        <link rel="icon" type="image/png" href="/favicon-32x32.png?v=2" sizes="32x32" />
        <link rel="icon" type="image/png" href="/favicon-16x16.png?v=2" sizes="16x16" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="application-name" content="K-lining" />
        <meta name="apple-mobile-web-app-title" content="K-lining" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-touch-fullscreen" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        
        
        {/* Критический CSS для максимальной скорости загрузки */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              /* Критический CSS - только самое необходимое */
              body { margin: 0; font-family: Inter, system-ui, sans-serif; line-height: 1.6; }
              .hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; }
              
              /* Оптимизированный loading skeleton */
              .loading { 
                background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                background-size: 200% 100%;
                animation: loading 1.5s infinite;
              }
              @keyframes loading { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
              
              /* Предотвращение CLS - критично */
              img { max-width: 100%; height: auto; display: block; }
              
              /* Критический CSS для LCP оптимизации */
              .hero-title { 
                font-size: clamp(1.75rem, 5vw, 3.5rem);
                font-weight: 700; 
                line-height: 1.15; 
                color: #111827; 
                margin: 0;
                font-display: swap;
              }
              
              /* Быстрый градиент без дорогих calc */
              .hero-visual {
                background: linear-gradient(135deg, #dbeafe 0%, #bbf7d0 100%);
                aspect-ratio: 3/2;
                border-radius: 12px;
              }
              
              /* Container для быстрой отрисовки */
              .container-custom { max-width: 1280px; margin: 0 auto; padding: 0 1rem; }
              @media (min-width: 640px) { .container-custom { padding: 0 1.5rem; } }
            `
          }}
        />

        {/* Убрали preload шрифтов, чтобы избежать 404 на проде */}

        
        {/* Убираем preload для аналитики - загружаем асинхронно */}
        
        {/* Schema.org разметка: точный тип бизнеса */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CleaningService",
              "name": "K-lining",
              "url": "https://k-lining.ru",
              "logo": "https://k-lining.ru/logo.png",
              "image": "https://k-lining.ru/og-image.webp",
              "description": "Профессиональная клининговая компания в Москве и МО. Квартиры, дома, офисы. 24/7.",
              "telephone": "+7-925-555-18-33",
              "priceRange": "₽₽",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Москва",
                "addressRegion": "Москва",
                "addressCountry": "RU"
              },
              "areaServed": {
                "@type": "City",
                "name": "Москва"
              },
              "openingHoursSpecification": [{
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
                "opens": "00:00",
                "closes": "23:59"
              }],
              "sameAs": [
                "https://t.me/k_liningru",
                "https://wa.me/79255551833"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Услуги клининга",
                "itemListElement": [
                  {"@type":"Offer","itemOffered":{"@type":"Service","name":"Уборка квартир"}},
                  {"@type":"Offer","itemOffered":{"@type":"Service","name":"Уборка офисов"}},
                  {"@type":"Offer","itemOffered":{"@type":"Service","name":"Химчистка мебели"}}
                ]
              }
            })
          }}
        />

        {/* WebSite + Sitelinks Search Box */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'K-lining',
              url: 'https://k-lining.ru',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://k-lining.ru/services?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        {/* Яндекс.Метрика через next/script */}
        <Script src="https://mc.yandex.ru/metrika/tag.js" strategy="afterInteractive" />
        <Script id="ym-init" strategy="afterInteractive">{`
          try { window.ym && ym(${YM_ID}, 'init', { webvisor:true, clickmap:true, accurateTrackBounce:true, trackLinks:true, trackHash:true }); } catch(e) {}
        `}</Script>
      </head>
      <body className={`${inter.className} ${inter.variable} overflow-x-hidden`} suppressHydrationWarning>
        <GlobalErrorHandlers />
        <LazyProviders>
          <SiteChrome>
            {children}
          </SiteChrome>
        </LazyProviders>

        {/* SPA-hit для роутинга */}
        <YandexMetrika />
        
        
        {/* Noscript fallback */}
        <noscript>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://mc.yandex.ru/watch/${YM_ID}`} style={{position:'absolute', left:'-9999px'}} alt="" />
          </div>
        </noscript>
        
        {/* Google Analytics 4 через next/script */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-64S5B5HBCR" strategy="afterInteractive" />
        <Script id="ga-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);} gtag('js', new Date());
          gtag('config', 'G-64S5B5HBCR', {
            anonymize_ip: true,
            allow_google_signals: false,
            allow_ad_personalization_signals: false
          });
        `}</Script>

        {/* Service Worker для агрессивного кэширования */}
        <Script id="sw-register" strategy="afterInteractive">{`
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
              navigator.serviceWorker.register('/sw.js')
                .then((reg) => {
                  // Очистка кэша раз в день
                  setInterval(() => {
                    reg.active?.postMessage('CLEAN_CACHE');
                  }, 24 * 60 * 60 * 1000);
                })
                .catch(() => {
                  // Service worker registration failed, continue without it
                });
            });
          }
        `}</Script>

        {/* LocalBusiness / Organization с полным адресом и контактами */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'K-lining',
              url: 'https://k-lining.ru',
              logo: 'https://k-lining.ru/logo.png',
              image: 'https://k-lining.ru/og-image.webp',
              telephone: '+7-925-555-18-33',
              priceRange: '₽₽',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'ул. Докукина, 8с2, этаж 6, офис 412',
                addressLocality: 'Москва',
                addressRegion: 'Москва',
                addressCountry: 'RU',
              },
              openingHoursSpecification: [{
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: [
                  'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'
                ],
                opens: '00:00',
                closes: '23:59',
              }],
              areaServed: [
                { '@type': 'City', name: 'Москва' },
                { '@type': 'AdministrativeArea', name: 'Московская область' }
              ],
              contactPoint: [{
                '@type': 'ContactPoint',
                telephone: '+7-925-555-18-33',
                contactType: 'customer service',
                areaServed: 'RU',
                availableLanguage: ['ru']
              }],
              sameAs: [
                'https://t.me/k_liningru',
                'https://wa.me/79255551833'
              ]
            })
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "K-lining - Профессиональная клининговая компания в Москве",
              "description": "Профессиональная клининговая компания в Москве и МО. Уборка квартир, офисов, химчистка мебели. Работаем в ЦАО, ЮЗАО, САО и других округах",
              "url": "https://k-lining.ru",
              "mainEntity": {
                "@type": "Organization",
                "name": "K-lining",
                "url": "https://k-lining.ru",
                "logo": "https://k-lining.ru/logo.png",
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+7-925-555-18-33",
                  "contactType": "customer service"
                }
              },
              "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Главная",
                    "item": "https://k-lining.ru"
                  }
                ]
              }
            })
          }}
        />
      </body>
    </html>
  );
} 