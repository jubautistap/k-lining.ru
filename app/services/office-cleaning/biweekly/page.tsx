import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema';
import FAQSchema from '@/components/ui/FAQSchema';
import RelatedServicesSection from '@/components/sections/RelatedServicesSection';
import MiniCalculator from '@/components/calculators/MiniCalculator';

export const metadata: Metadata = {
  title: 'Уборка офисов два раза в неделю — регулярный клининг | K-lining',
  description: 'Регулярная уборка 2р/нед: рабочие зоны, санузлы, кухня, ресепшен. Гибкий график, договор, расчёт online.',
  alternates: { canonical: 'https://k-lining.ru/services/office-cleaning/biweekly' },
};

export default function OfficeBiWeeklyCleaningPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 pt-6">
        <BreadcrumbSchema items={[
          { name: 'Услуги', url: '/services' },
          { name: 'Уборка офиса', url: '/services/office-cleaning' },
          { name: 'Два раза в неделю', url: '/services/office-cleaning/biweekly' },
        ]} />
      </div>
      <section className="bg-gradient-to-r from-indigo-700 to-indigo-900 text-white py-16">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Уборка офисов 2 раза в неделю</h1>
            <p className="text-lg opacity-90 mb-6">Подходит для активных офисов. Чистота без простоев. Смета по м² и набору зон.</p>
            <div className="flex gap-3">
              <Link href="/contacts" className="btn-primary px-6 py-3">Оставить заявку</Link>
              <Link href="/services/office-cleaning" className="btn-secondary px-6 py-3">Ко всем офисным тарифам</Link>
            </div>
          </div>
          <MiniCalculator defaultArea={200} propertyType="office" cleaningType="maintenance" />
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-5xl prose prose-lg">
          <h2>План работ</h2>
          <p>Дублирует еженедельный, но с большим вниманием к кухне и зонам общего пользования. По запросу — дезинфекция.</p>
        </div>
      </section>
      <FAQSchema items={[
        { question: 'Можно ли менять дни?', answer: 'Да, график гибкий, фиксируем в договоре.' },
      ]} />
      <RelatedServicesSection currentService="/services/office-cleaning" />
    </div>
  );
}


