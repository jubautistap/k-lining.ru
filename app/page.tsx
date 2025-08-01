import { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import WhyChooseUsSection from '@/components/sections/WhyChooseUsSection';
import ProcessSection from '@/components/sections/ProcessSection';
import PricingSection from '@/components/sections/PricingSection';
import ContactSection from '@/components/sections/ContactSection';
import CleaningCalculator from '@/components/calculators/CleaningCalculator';
import AmoCRMModal from '@/components/modals/AmoCRMModal';

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
      <ContactSection />
      <AmoCRMModal />
    </>
  );
} 