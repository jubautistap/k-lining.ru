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
  title: 'KliningPro - Профессиональная уборка в Москве | Быстро, качественно, честно',
  description: 'Профессиональная клининговая компания в Москве. Уборка квартир, домов, офисов. Быстро, качественно, честно. Работаем 24/7. Бесплатная консультация. Химчистка, мытье окон, генеральная уборка, уборка после ремонта.',
  keywords: 'уборка квартир москва, клининговая компания, уборка офисов, химчистка, мытье окон, генеральная уборка, уборка после ремонта, химчистка мебели, профессиональная уборка, клининг москва, уборка квартиры цена, химчистка дивана',
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