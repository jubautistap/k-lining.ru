import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema';
import FAQSchema from '@/components/ui/FAQSchema';
import RelatedServicesSection from '@/components/sections/RelatedServicesSection';
import MiniCalculator from '@/components/calculators/MiniCalculator';

export const metadata: Metadata = {
  title: 'Уборка шоурумов и розничных пространств в Москве | K-lining',
  description: 'Чистота зала, витрин, зеркал и примерочных. Поддерживающая и генеральная уборка. Гибкий график, расчёт цены онлайн.',
  alternates: { canonical: 'https://k-lining.ru/services/commercial/showrooms' },
};

export default function ShowroomsCleaningPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 pt-6">
        <BreadcrumbSchema items={[
          { name: 'Услуги', url: '/services' },
          { name: 'Коммерческие помещения', url: '/services/office-cleaning' },
          { name: 'Шоурумы', url: '/services/commercial/showrooms' },
        ]} />
      </div>
      <section className="bg-gradient-to-r from-emerald-600 to-emerald-800 text-white py-16">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Уборка шоурумов</h1>
            <p className="text-lg opacity-90 mb-6">Витрины, полы без следов, зеркала без разводов, примерочные в идеале. Чистота, которая продаёт.</p>
            <div className="flex gap-3">
              <Link href="/contacts" className="btn-primary px-6 py-3">Оставить заявку</Link>
              <Link href="/services/office-cleaning" className="btn-secondary px-6 py-3">К коммерческим тарифам</Link>
            </div>
          </div>
          <MiniCalculator defaultArea={120} propertyType="commercial" cleaningType="maintenance" />
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-5xl prose prose-lg">
          <h2>Состав работ</h2>
          <p>Пыль/полы/витрины/зеркала, примерочные, санузлы, зона касс. Возможна уборка в нерабочие часы.</p>
        </div>
      </section>
      <FAQSchema items={[
        { question: 'Можно ночью?', answer: 'Да, подстроимся под график шоурума.' },
      ]} />
      <RelatedServicesSection currentService="/services/office-cleaning" />
    </div>
  );
}


