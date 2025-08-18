import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema';
import FAQSchema from '@/components/ui/FAQSchema';
import RelatedServicesSection from '@/components/sections/RelatedServicesSection';
import MiniCalculator from '@/components/calculators/MiniCalculator';

export const metadata: Metadata = {
  title: 'Уборка кафе и небольших ресторанов в Москве | K-lining',
  description: 'Зал, кухня снаружи, санузлы, витрины. Чистота по СанПиН. Регулярно и после закрытия. Расчёт цены онлайн.',
  alternates: { canonical: 'https://k-lining.ru/services/commercial/cafes' },
};

export default function CafesCleaningPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 pt-6">
        <BreadcrumbSchema items={[
          { name: 'Услуги', url: '/services' },
          { name: 'Коммерческие помещения', url: '/services/office-cleaning' },
          { name: 'Кафе', url: '/services/commercial/cafes' },
        ]} />
      </div>
      <section className="bg-gradient-to-r from-orange-600 to-orange-800 text-white py-16">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Уборка кафе</h1>
            <p className="text-lg opacity-90 mb-6">Поддерживающая и генеральная уборка залов. Кухню чистим снаружи, без демонтажа оборудования.</p>
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
          <h2>Что входит</h2>
          <ul>
            <li>Зал: столы, стулья, витрины, полы, стекло;</li>
            <li>Санузлы: дезинфекция, пополнение расходников;</li>
            <li>Кухня снаружи: поверхности, полы, фасады техники;</li>
            <li>Вывоз мусора, замена пакетов.</li>
          </ul>
        </div>
      </section>
      <FAQSchema items={[
        { question: 'Можно после закрытия?', answer: 'Да, работаем ночью/рано утром без препятствий работе персонала.' },
      ]} />
      <RelatedServicesSection currentService="/services/office-cleaning" />
    </div>
  );
}


