import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import LazyProviders from '@/components/providers/LazyProviders';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import SiteChrome from '@/components/providers/SiteChrome';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: {
    default: 'Профессиональная уборка квартир и офисов в Москве - K-lining 24/7 | Цены от 6,000₽',
    template: '%s | K-lining'
  },
  description: 'Профессиональная уборка квартир и офисов в Москве 24/7 ⭐ Клининговая компания K-lining ⭐ Химчистка мебели, мытье окон, генеральная уборка, уборка после ремонта ⭐ Работаем круглосуточно без выходных ⭐ Честные цены от 6,000₽ ⭐ Выезд в любой район Москвы и МО',
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
    title: 'Уборка квартир и офисов в Москве - K-lining | Цены от 6,000₽',
    description: 'Профессиональная уборка квартир и офисов в Москве ⭐ Клининговая компания K-lining ⭐ Химчистка мебели, мытье окон, генеральная уборка ⭐ Работаем 24/7 ⭐ Гарантия качества',
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
        
        <link rel="preconnect" href="https://mc.yandex.ru" />
        <link rel="preconnect" href="https://mc.webvisor.org" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//mc.yandex.ru" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
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
        
        
        
        {/* Критический CSS инлайн для устранения блокирующих запросов (web.dev optimized) */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              /* Критический CSS для первого экрана */
              body { margin: 0; font-family: system-ui, -apple-system, sans-serif; }
              .header { position: fixed; top: 0; left: 0; right: 0; z-index: 50; background: white; }
              .hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; }
              .loading { background: #f3f4f6; animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
              @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
              
              /* Предотвращение CLS */
              img { max-width: 100%; height: auto; }
              .image-container { position: relative; overflow: hidden; }
              
              /* Критический CSS для LCP */
              .hero-title { 
                font-size: 2rem; /* меньше на мобильных */
                font-weight: 700; 
                line-height: 1.15; 
                color: #111827; 
                margin: 0; 
                word-break: normal;
                overflow-wrap: anywhere; /* безопасный перенос длинных слов */
              }
              @media (min-width: 640px) { .hero-title { font-size: 2.25rem; } }
              @media (min-width: 768px) { .hero-title { font-size: 2.75rem; } }
              @media (min-width: 1024px) { .hero-title { font-size: 3.25rem; } }
              
              /* CSS градиент для быстрого отображения */
              .hero-gradient {
                background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 50%, #1e40af 100%);
                opacity: 0.8;
              }
              
              /* Красивый градиент для hero секции */
              .hero-visual {
                background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 25%, #1e40af 50%, #1e3a8a 75%, #1e293b 100%);
                position: relative;
                overflow: hidden;
              }
              .hero-visual::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: radial-gradient(circle at 30% 70%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
                            radial-gradient(circle at 70% 30%, rgba(30, 64, 175, 0.3) 0%, transparent 50%);
                animation: pulse 4s ease-in-out infinite;
              }
              @keyframes pulse {
                0%, 100% { opacity: 0.7; }
                50% { opacity: 1; }
              }
              
              /* Убраны кастомные @font-face: используем next/font Inter */
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