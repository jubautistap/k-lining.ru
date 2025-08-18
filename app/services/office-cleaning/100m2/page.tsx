import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema';
import FAQSchema from '@/components/ui/FAQSchema';
import RelatedServicesSection from '@/components/sections/RelatedServicesSection';
import MiniCalculator from '@/components/calculators/MiniCalculator';

export const metadata: Metadata = {
  title: 'Уборка офиса 100 м² в Москве — регулярная и генеральная | K-lining',
  description: 'Клининг офиса 100 м²: регулярная поддерживающая или генеральная уборка. Прозрачные тарифы, расчёт online, выезд 24/7.',
  alternates: { canonical: 'https://k-lining.ru/services/office-cleaning/100m2' },
};

export default function Office100m2CleaningPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 pt-6">
        <BreadcrumbSchema items={[
          { name: 'Услуги', url: '/services' },
          { name: 'Уборка офиса', url: '/services/office-cleaning' },
          { name: '100 м²', url: '/services/office-cleaning/100m2' },
        ]} />
      </div>
      <section className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-16">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Уборка офиса 100 м²</h1>
            <p className="text-lg opacity-90 mb-6">Поддерживающая или генеральная уборка. Гибкий график, договор, закрывающие.</p>
            <div className="flex gap-3">
              <Link href="/contacts" className="btn-primary px-6 py-3">Оставить заявку</Link>
              <Link href="/services/office-cleaning" className="btn-secondary px-6 py-3">Другие метражи</Link>
            </div>
          </div>
          <MiniCalculator defaultArea={100} propertyType="office" cleaningType="maintenance" />
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-5xl prose prose-lg">
          <h2>Состав работ</h2>
          <p>Рабочие зоны, переговорные, санузлы, кухня/кофепоинт, ресепшен. По запросу — дезинфекция.</p>
        </div>
      </section>
      <FAQSchema items={[
        { question: 'Можно убрать ночью?', answer: 'Да, есть ночной тариф, согласуем заранее.' },
      ]} />
      <RelatedServicesSection currentService="/services/office-cleaning" />
    </div>
  );
}


