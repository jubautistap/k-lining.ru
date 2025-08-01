import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import AmoCRMProvider from '@/components/providers/AmoCRMProvider';
import AmoCRMModal from '@/components/modals/AmoCRMModal';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

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
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="application-name" content="KliningPro" />
        <meta name="apple-mobile-web-app-title" content="KliningPro" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Preconnect для ускорения загрузки */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "KliningPro",
              "description": "Профессиональная клининговая компания в Москве. Уборка квартир, домов, офисов, химчистка, мытье окон.",
              "url": "https://k-lining.ru",
              "telephone": "+7-495-123-45-67",
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
        
        {/* Organization Schema */}
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
                "telephone": "+7-495-123-45-67",
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
                "https://wa.me/74951234567"
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

        {/* WebSite Schema */}
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
      </head>
      <body className={inter.className}>
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
      </body>
    </html>
  );
} 