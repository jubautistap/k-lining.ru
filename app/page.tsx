import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import WhyChooseUsSection from '@/components/sections/WhyChooseUsSection';

// Динамические импорты для ленивой загрузки
const ProcessSection = dynamic(() => import('@/components/sections/ProcessSection'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />,
  ssr: true,
});

const PricingSection = dynamic(() => import('@/components/sections/PricingSection'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />,
  ssr: true,
});

const CleaningCalculator = dynamic(() => import('@/components/calculators/CleaningCalculator'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />,
  ssr: false, // Отключаем SSR для калькулятора
});

const ContactSection = dynamic(() => import('@/components/sections/ContactSection'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />,
  ssr: true,
});

const SEOContentSection = dynamic(() => import('@/components/sections/SEOContentSection'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />,
  ssr: true,
});

const AmoCRMModal = dynamic(() => import('@/components/modals/AmoCRMModal'), {
  ssr: false, // Отключаем SSR для модального окна
});

export const metadata: Metadata = {
  title: 'K-lining - Профессиональная уборка в Москве | Быстро, качественно, честно',
  description: 'Профессиональная клининговая компания в Москве. Уборка квартир, домов, офисов. Быстро, качественно, честно. Работаем 24/7. Бесплатная консультация. Химчистка, мытье окон, генеральная уборка, уборка после ремонта.',
  keywords: 'уборка квартир москва, клининговая компания, уборка офисов, химчистка, мытье окон, генеральная уборка, уборка после ремонта, химчистка мебели, профессиональная уборка, клининг москва, уборка квартиры цена, химчистка дивана',
  openGraph: {
    title: 'K-lining - Профессиональная уборка в Москве',
    description: 'Профессиональная клининговая компания в Москве. Уборка квартир, домов, офисов. Быстро, качественно, честно. Химчистка, мытье окон, генеральная уборка.',
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
    description: 'Профессиональная клининговая компания в Москве. Уборка квартир, домов, офисов. Химчистка, мытье окон.',
    images: ['/og-image.jpg'],
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
                  "text": "Стоимость уборки квартиры зависит от площади, типа уборки и дополнительных услуг. Базовая уборка 1-комнатной квартиры от 2,500₽, генеральная уборка от 3,500₽. Точную стоимость можно рассчитать в калькуляторе на сайте."
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
      <ServicesSection />
      <WhyChooseUsSection />
      <ProcessSection />
      <PricingSection />
      <CleaningCalculator />
      <SEOContentSection />
      <ContactSection />
      <AmoCRMModal />
    </>
  );
} 