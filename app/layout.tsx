import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import AmoCRMProvider from '@/components/providers/AmoCRMProvider';
import { AuthProvider } from '@/components/providers/AuthProvider';
import AmoCRMModal from '@/components/modals/AmoCRMModal';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true, // Включаем preload для критического шрифта
  fallback: ['system-ui', 'arial'],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: {
    default: 'Профессиональная уборка квартир и офисов в Москве - K-lining 24/7 | Цены от 2,500₽',
    template: '%s | K-lining'
  },
  description: 'Профессиональная уборка квартир и офисов в Москве 24/7 ⭐ Клининговая компания K-lining ⭐ Химчистка мебели, мытье окон, генеральная уборка, уборка после ремонта ⭐ Работаем круглосуточно без выходных ⭐ Честные цены от 2,500₽ ⭐ Выезд в любой район Москвы и МО',
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
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Уборка квартир и офисов в Москве - K-lining | Цены от 3000₽',
    description: 'Профессиональная уборка квартир и офисов в Москве ⭐ Клининговая компания K-lining ⭐ Химчистка мебели, мытье окон, генеральная уборка ⭐ Работаем 24/7 ⭐ Гарантия качества',
    url: 'https://k-lining.ru',
    siteName: 'K-lining',
    images: [
      {
        url: '/og-image.jpg',
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
    images: ['/og-image.jpg'],
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
    'DC.title': 'KliningPro - Профессиональная уборка в Москве',
    'DC.description': 'Профессиональная клининговая компания в Москве',
    'DC.subject': 'уборка квартир, клининг, химчистка',
    'DC.creator': 'KliningPro',
    'DC.publisher': 'KliningPro',
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
  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no" />
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
        <style>{`
          *{box-sizing:border-box}
          body{font-family:'Inter',system-ui,sans-serif;line-height:1.6;color:#1e293b;margin:0;padding:0;background-color:#ffffff}
          .fixed{position:fixed}.top-0{top:0}.left-0{left:0}.right-0{right:0}.z-50{z-index:50}
          .bg-white{background-color:#ffffff}.bg-white\\/95{background-color:rgba(255,255,255,0.95)}
          .backdrop-blur-md{backdrop-filter:blur(12px)}.shadow-lg{box-shadow:0 10px 15px -3px rgba(0,0,0,0.1),0 4px 6px -2px rgba(0,0,0,0.05)}
          .transition-colors{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke}
          .duration-200{transition-duration:200ms}.max-w-7xl{max-width:80rem}.mx-auto{margin-left:auto;margin-right:auto}
          .px-4{padding-left:1rem;padding-right:1rem}.flex{display:flex}.items-center{align-items:center}
          .justify-between{justify-content:space-between}.h-16{height:4rem}.text-primary-600{color:#2563eb}
          .font-bold{font-weight:700}.text-lg{font-size:1.125rem;line-height:1.75rem}
          .text-xl{font-size:1.25rem;line-height:1.75rem}.btn-primary{background-color:#2563eb;color:#ffffff;font-weight:500;padding:0.75rem 1.5rem;border-radius:0.5rem;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-duration:200ms;box-shadow:0 10px 15px -3px rgba(0,0,0,0.1),0 4px 6px -2px rgba(0,0,0,0.05)}
          .btn-primary:hover{background-color:#1d4ed8;box-shadow:0 20px 25px -5px rgba(0,0,0,0.1),0 10px 10px -5px rgba(0,0,0,0.04)}
          .min-h-screen{min-height:100vh}.flex-grow{flex-grow:1}.w-10{width:2.5rem}.h-10{height:2.5rem}
          .bg-primary-600{background-color:#2563eb}.rounded-lg{border-radius:0.5rem}.hidden{display:none}
          .md\\:hidden{display:block}@media (min-width:768px){.md\\:hidden{display:none!important}.md\\:flex{display:flex}.md\\:h-20{height:5rem}.md\\:text-2xl{font-size:1.5rem;line-height:2rem}}
          .container-custom{max-width:80rem;margin-left:auto;margin-right:auto;padding-left:1rem;padding-right:1rem}
          @media (min-width:640px){.container-custom{padding-left:1.5rem;padding-right:1.5rem}}
          @media (min-width:1024px){.container-custom{padding-left:2rem;padding-right:2rem}}
        `}</style>
        
        
        {/* Оптимизированные preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://mc.yandex.ru" />
        <link rel="preconnect" href="https://mc.yandex.com" />
        
        {/* Resource hints согласно web.dev рекомендациям */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//mc.yandex.ru" />
        <link rel="dns-prefetch" href="//mc.yandex.com" />
        
        {/* LCP изображение будет загружено по требованию для лучшей производительности */}
        
        {/* Structured Data - загружаем асинхронно */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "K-lining - Клининговая компания",
              "alternateName": "К-лининг", 
              "description": "Профессиональная уборка квартир, домов и офисов в Москве и МО. Работаем 24/7 без выходных. Химчистка мебели, мытье окон, генеральная уборка, уборка после ремонта. Быстро, качественно, честно.",
              "url": "https://k-lining.ru",
              "telephone": ["+7-925-555-18-33", "+7-495-123-45-67"],
              "email": "info@k-lining.ru",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "ул. Бакунинская, 69, стр. 1",
                "addressLocality": "Москва",
                "addressRegion": "Московская область", 
                "postalCode": "105082",
                "addressCountry": "RU"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "55.7649472",
                "longitude": "37.6715833"
              },
              "openingHours": ["Mo-Su 00:00-23:59"],
              "priceRange": "₽₽",
              "paymentAccepted": ["наличные", "банковские карты", "безналичный расчет"],
              "currenciesAccepted": "RUB",
              "areaServed": [
                "Москва",
                "Московская область",
                "Зеленоград", 
                "Балашиха",
                "Химки",
                "Королев",
                "Одинцово"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Услуги клининга",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Уборка квартир"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Уборка офисов"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Химчистка мебели"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Мытье окон"
                    }
                  },
                  {
                    "@type": "Offer", 
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Генеральная уборка"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service", 
                      "name": "Уборка после ремонта"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Дезинфекция помещений"
                    }
                  }
                ]
              }
            })
          }}
        />

        {/* SiteNavigationElement Schema для быстрых ссылок Яндекса */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "SiteNavigationElement",
                  "name": "Уборка квартир",
                  "url": "https://k-lining.ru/services/apartment-cleaning",
                  "description": "Профессиональная уборка квартир в Москве"
                },
                {
                  "@type": "SiteNavigationElement", 
                  "name": "Цены на уборку",
                  "url": "https://k-lining.ru/prices",
                  "description": "Актуальные цены на клининговые услуги"
                },
                {
                  "@type": "SiteNavigationElement",
                  "name": "Калькулятор стоимости",
                  "url": "https://k-lining.ru/calculator", 
                  "description": "Рассчитать стоимость уборки онлайн"
                },
                {
                  "@type": "SiteNavigationElement",
                  "name": "Уборка офисов",
                  "url": "https://k-lining.ru/services/office-cleaning",
                  "description": "Регулярная уборка коммерческих помещений"
                },
                {
                  "@type": "SiteNavigationElement",
                  "name": "Химчистка мебели", 
                  "url": "https://k-lining.ru/services/furniture-dry-cleaning",
                  "description": "Химчистка диванов и кресел на дому"
                },
                {
                  "@type": "SiteNavigationElement",
                  "name": "Контакты",
                  "url": "https://k-lining.ru/contacts",
                  "description": "Связаться с клининговой компанией K-lining"
                }
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.className} ${inter.variable} overflow-x-hidden`}>
        <AuthProvider>
          <AmoCRMProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow pt-20 md:pt-24">
                {children}
              </main>
              <Footer />
            </div>
            <AmoCRMModal />
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
              }}
            />
          </AmoCRMProvider>
        </AuthProvider>
        
        {/* Yandex.Metrika counter */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){
                  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                  m[i].l=1*new Date();
                  for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
              })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=103567092', 'ym');

              // Инициализация метрики после загрузки DOM
              document.addEventListener('DOMContentLoaded', function() {
                if (typeof ym !== 'undefined') {
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
                }
              });
            `
          }}
        />
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/103567092" style={{position:'absolute', left:'-9999px'}} alt="" />
          </div>
        </noscript>
        
        {/* Google Analytics 4 */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-64S5B5HBCR"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-64S5B5HBCR', {
                page_title: document.title,
                page_location: window.location.href
              });
            `
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "K-lining",
              "url": "https://k-lining.ru",
              "logo": "https://k-lining.ru/logo.png",
              "description": "Профессиональная клининговая компания в Москве и МО. Работаем в ЦАО, ЮЗАО, САО и других округах",
              "foundingDate": "2024",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Москва",
                "addressCountry": "RU",
                "addressRegion": "Москва"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+7-925-555-18-33",
                "contactType": "customer service",
                "availableLanguage": "Russian",
                "hoursAvailable": {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                  "opens": "00:00",
                  "closes": "23:59"
                }
              },
              "sameAs": [
                "https://t.me/kliningpro",
                "https://wa.me/79255551833"
              ],
              "serviceArea": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": "55.7649472",
                  "longitude": "37.6715833"
                },
                "geoRadius": "50000"
              },
              "knowsAbout": [
                "Уборка квартир",
                "Уборка офисов", 
                "Химчистка мебели",
                "Мытье окон",
                "Генеральная уборка",
                "Уборка после ремонта"
              ]
            })
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "K-lining",
              "url": "https://k-lining.ru",
              "description": "Профессиональная клининговая компания в Москве и МО. Работаем в ЦАО, ЮЗАО, САО и других округах",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://k-lining.ru/search?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </body>
    </html>
  );
} 