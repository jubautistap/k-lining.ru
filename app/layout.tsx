import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import AmoCRMProvider from '@/components/providers/AmoCRMProvider';
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
    default: 'KliningPro - Профессиональная уборка в Москве | Быстро, качественно, честно',
    template: '%s | KliningPro'
  },
  description: 'Профессиональная клининговая компания в Москве. Уборка квартир, домов, офисов. Быстро, качественно, честно. Работаем 24/7. Бесплатная консультация. Химчистка, мытье окон, генеральная уборка.',
  keywords: 'уборка квартир москва, клининговая компания, уборка офисов, химчистка, мытье окон, генеральная уборка, уборка после ремонта, химчистка мебели, профессиональная уборка, клининг москва',
  authors: [{ name: 'KliningPro' }],
  creator: 'KliningPro',
  publisher: 'KliningPro',
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
    title: 'KliningPro - Профессиональная уборка в Москве',
    description: 'Профессиональная клининговая компания в Москве. Уборка квартир, домов, офисов. Быстро, качественно, честно. Химчистка, мытье окон, генеральная уборка.',
    url: 'https://k-lining.ru',
    siteName: 'KliningPro',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'KliningPro - Профессиональная уборка в Москве',
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KliningPro - Профессиональная уборка в Москве',
    description: 'Профессиональная клининговая компания в Москве. Уборка квартир, домов, офисов. Химчистка, мытье окон.',
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
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="application-name" content="KliningPro" />
        <meta name="apple-mobile-web-app-title" content="KliningPro" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
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
        
        {/* Preload критически важного LCP изображения */}
        <link rel="preload" href="/logo.png" as="image" type="image/png" />
        
        {/* Structured Data - загружаем асинхронно */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "KliningPro",
              "description": "Профессиональная клининговая компания в Москве. Уборка квартир, домов, офисов, химчистка, мытье окон.",
              "url": "https://k-lining.ru",
              "telephone": "+7-925-555-18-33",
              "email": "info@k-lining.ru",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Москва",
                "addressCountry": "RU",
                "addressRegion": "Москва"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "55.7558",
                "longitude": "37.6176"
              },
              "openingHours": "Mo-Su 00:00-23:59",
              "priceRange": "₽₽",
              "serviceType": "Клининговые услуги",
              "areaServed": "Москва и Московская область",
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
                  }
                ]
              }
            })
          }}
        />
      </head>
      <body className={`${inter.className} ${inter.variable}`}>
        <AmoCRMProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
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
        
        {/* Yandex.Metrika counter - диагностическая версия */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              console.log('🔄 Начинаю загрузку Яндекс.Метрики...');
              
              // Проверка блокировщиков
              if (window.navigator && window.navigator.userAgent && window.navigator.userAgent.indexOf('AdBlock') !== -1) {
                console.warn('⚠️ Обнаружен AdBlock - может блокировать метрику');
              }
              
              (function(m,e,t,r,i,k,a){
                  console.log('📊 Инициализирую функцию ym...');
                  m[i]=m[i]||function(){
                    console.log('📈 ym функция вызвана с аргументами:', arguments);
                    (m[i].a=m[i].a||[]).push(arguments)
                  };
                  m[i].l=1*new Date();
                  
                  // Проверяем что скрипт не загружен уже
                  for (var j = 0; j < document.scripts.length; j++) {
                    if (document.scripts[j].src === r) { 
                      console.log('⚠️ Скрипт метрики уже загружен');
                      return; 
                    }
                  }
                  
                  console.log('📥 Загружаю скрипт:', r);
                  k=e.createElement(t);
                  a=e.getElementsByTagName(t)[0];
                  k.async=1;
                  k.src=r;
                  
                  k.onload = function() {
                    console.log('✅ Скрипт метрики загружен успешно');
                  };
                  
                  k.onerror = function() {
                    console.error('❌ Ошибка загрузки скрипта метрики');
                  };
                  
                  a.parentNode.insertBefore(k,a);
              })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=103567092', 'ym');

              // Ждем немного и инициализируем
              setTimeout(function() {
                console.log('🚀 Инициализирую счетчик 103567092...');
                if (typeof ym !== 'undefined') {
                  ym(103567092, 'init', {
                    ssr: true,
                    webvisor: true,
                    clickmap: true,
                    ecommerce: "dataLayer",
                    accurateTrackBounce: true,
                    trackLinks: true
                  });
                  console.log('✅ Метрика инициализирована');
                  
                  // Тестовый хит
                  setTimeout(function() {
                    ym(103567092, 'hit', window.location.href);
                    console.log('📤 Отправлен тестовый хит на:', window.location.href);
                  }, 1000);
                } else {
                  console.error('❌ Функция ym не определена после загрузки');
                }
              }, 100);
            `
          }}
        />
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/103567092" style={{position:'absolute', left:'-9999px'}} alt="" />
          </div>
        </noscript>
        
        {/* Загружаем остальные схемы асинхронно */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "KliningPro",
              "url": "https://k-lining.ru",
              "logo": "https://k-lining.ru/logo.png",
              "description": "Профессиональная клининговая компания в Москве",
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
                  "latitude": "55.7558",
                  "longitude": "37.6176"
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
              "name": "KliningPro",
              "url": "https://k-lining.ru",
              "description": "Профессиональная клининговая компания в Москве",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://k-lining.ru/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </body>
    </html>
  );
} 