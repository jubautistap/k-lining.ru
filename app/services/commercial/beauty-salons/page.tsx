import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema';
import FAQSchema from '@/components/ui/FAQSchema';
import RelatedServicesSection from '@/components/sections/RelatedServicesSection';
import MiniCalculator from '@/components/calculators/MiniCalculator';

export const metadata: Metadata = {
  title: 'Уборка салонов красоты и барбершопов в Москве | K-lining',
  description: 'Профессиональная уборка салонов красоты: зоны мастеров, санузлы, ресепшен. Санитарные требования, дезинфекция. Расчёт цены онлайн.',
  alternates: { canonical: 'https://k-lining.ru/services/commercial/beauty-salons' },
};

export default function BeautySalonsCleaningPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 pt-6">
        <BreadcrumbSchema items={[
          { name: 'Услуги', url: '/services' },
          { name: 'Коммерческие помещения', url: '/services/office-cleaning' },
          { name: 'Салоны красоты', url: '/services/commercial/beauty-salons' },
        ]} />
      </div>
      <section className="bg-gradient-to-r from-fuchsia-600 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Уборка салонов красоты</h1>
            <p className="text-lg opacity-90 mb-6">Гигиена и презентабельность: рабочие места, зоны ожидания, санузлы, зеркала. Дезинфекция по регламенту.</p>
            <div className="flex gap-3">
              <Link href="/contacts" className="btn-primary px-6 py-3">Оставить заявку</Link>
              <Link href="/services/office-cleaning" className="btn-secondary px-6 py-3">К коммерческим тарифам</Link>
            </div>
          </div>
          <MiniCalculator defaultArea={80} propertyType="commercial" cleaningType="maintenance" />
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-5xl prose prose-lg">
          <h2>Что делаем</h2>
          <ul>
            <li>Зоны мастеров: рабочие поверхности, кресла, полы;</li>
            <li>Ресепшен: порядок, стекло, зеркала;</li>
            <li>Санузлы: дезинфекция и расходники;</li>
            <li>Кухня/комната персонала: порядок и чистота.</li>
          </ul>
        </div>
      </section>
      <FAQSchema items={[
        { question: 'Работаете вне часов?', answer: 'Да, убираем до/после смен, ночью — по договорённости.' },
      ]} />
      <RelatedServicesSection currentService="/services/office-cleaning" />
    </div>
  );
}


