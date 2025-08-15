import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import WhyChooseUsSection from '@/components/sections/WhyChooseUsSection';
import CaseStudiesSection from '@/components/sections/CaseStudiesSection';
import LoftCentersCaseSection from '@/components/sections/LoftCentersCaseSection';

// Динамические импорты для ленивой загрузки
// (убрали ProcessSection с главной)

const PricingSection = dynamic(() => import('@/components/sections/PricingSection'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />,
  ssr: true,
});

const CleaningCalculator = dynamic(() => import('@/components/calculators/CleaningCalculator'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />,
  ssr: false,
});

const ContactSection = dynamic(() => import('@/components/sections/ContactSection'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />,
  ssr: true,
});

const SEOContentSection = dynamic(() => import('@/components/sections/SEOContentSection'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />,
  ssr: true,
});

const PopularServicesSection = dynamic(() => import('@/components/sections/PopularServicesSection'), {
  loading: () => <div className="h-80 bg-gray-100 animate-pulse" />,
  ssr: true,
});

const AmoCRMModal = dynamic(() => import('@/components/modals/AmoCRMModal'), {
  ssr: false, // Отключаем SSR для модального окна
});
const StickyPromo = dynamic(() => import('@/components/ui/StickyPromo'), { ssr: false });

export const metadata: Metadata = {
  title: 'Уборка квартир и офисов в Москве 24/7 — мин. заказ 6 000 ₽ | K-lining',
  description: 'Уборка квартир Москва, уборка офисов, генеральная уборка, уборка после ремонта, химчистка мебели, мытьё окон. Профессиональная клининговая компания в Москве и МО. Работаем 24/7. Бесплатная консультация. Прозрачные цены.',
  keywords: 'уборка квартир москва, уборка квартиры москва цена, клининговая компания москва, уборка офисов москва, генеральная уборка москва, уборка после ремонта москва, химчистка мебели москва, мытьё окон москва, клининг 24/7 москва, профессиональная уборка, химчистка дивана на дому',
  openGraph: {
    title: 'Профессиональная уборка квартир и офисов в Москве - K-lining 24/7',
    description: 'Профессиональная уборка квартир и офисов в Москве ⭐ Клининговая компания K-lining ⭐ Химчистка мебели, мытьё окон, генеральная уборка ⭐ Работаем 24/7 ⭐ Минимальный заказ — 6,000₽ ⭐ Выезд в любой район Москвы и МО',
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
  alternates: {
    canonical: 'https://k-lining.ru',
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
};

export default function HomePage() {
  return (
    <>
      {/* FAQ Schema для rich snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Сколько стоит уборка квартиры в Москве?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Стоимость уборки зависит от площади, типа и дополнительных услуг. Минимальная стоимость заказа — 6,000₽. Точную цену рассчитайте в калькуляторе на сайте."
                }
              },
              {
                "@type": "Question", 
                "name": "Работаете ли вы в выходные и праздники?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Да, наша клининговая компания работает 24/7 без выходных и праздников. Мы принимаем заявки круглосуточно и можем выполнить срочную уборку в любое время."
                }
              },
              {
                "@type": "Question",
                "name": "Какие районы Москвы вы обслуживаете?",
                "acceptedAnswer": {
                  "@type": "Answer", 
                  "text": "Мы работаем во всех районах Москвы и Московской области, включая Басманный район, где расположен наш офис. Выезжаем в любую точку в пределах МКАД и за его пределами."
                }
              },
              {
                "@type": "Question",
                "name": "Предоставляете ли вы гарантию на услуги?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Да, мы даем гарантию качества на все виды клининговых услуг. Если результат работы вас не устроит, мы бесплатно исправим недочеты или вернем деньги."
                }
              },
              {
                "@type": "Question",
                "name": "Нужно ли покупать моющие средства?", 
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Нет, все профессиональные моющие средства и оборудование входят в стоимость услуг. Мы используем только сертифицированные и безопасные средства для уборки."
                }
              }
            ]
          })
        }}
      />

      <HeroSection />
      <PopularServicesSection />
      {/* Quick internal links to boost crawl/indexation */}
      <section className="py-8">
        <div className="container-custom">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-sm">
            {[
              { href: '/uborka-kvartiry-moskva', text: 'Уборка квартиры' },
              { href: '/uborka-posle-remonta-moskva', text: 'После ремонта' },
              { href: '/myte-okon-moskva', text: 'Мытьё окон' },
              { href: '/himchistka-mebeli-moskva', text: 'Химчистка мебели' },
              { href: '/uborka-ofisa-moskva', text: 'Уборка офиса' },
              { href: '/klining-cena-moskva', text: 'Цены на клининг' },
            ].map((l) => (
              <a key={l.href} href={l.href} className="rounded-md border border-gray-200 px-3 py-2 hover:border-primary-300 hover:bg-primary-50 text-gray-700">
                {l.text}
              </a>
            ))}
          </div>
        </div>
      </section>
      <WhyChooseUsSection />
      <CaseStudiesSection />
      <LoftCentersCaseSection />
      <CleaningCalculator />
      <ContactSection />
      <StickyPromo enabled={true} />
      <AmoCRMModal />
    </>
  );
} 