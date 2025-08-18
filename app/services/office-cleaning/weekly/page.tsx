import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema';
import FAQSchema from '@/components/ui/FAQSchema';
import RelatedServicesSection from '@/components/sections/RelatedServicesSection';
import MiniCalculator from '@/components/calculators/MiniCalculator';

export const metadata: Metadata = {
  title: 'Еженедельная уборка офисов в Москве — регулярный клининг | K-lining',
  description: 'Регулярная уборка офисов 1–2 раза в неделю: рабочие места, санузлы, зона кухни. Договор, график, без срывов. Расчёт цены онлайн.',
  alternates: { canonical: 'https://k-lining.ru/services/office-cleaning/weekly' },
};

export default function OfficeWeeklyCleaningPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 pt-6">
        <BreadcrumbSchema items={[
          { name: 'Услуги', url: '/services' },
          { name: 'Уборка офиса', url: '/services/office-cleaning' },
          { name: 'Еженедельно', url: '/services/office-cleaning/weekly' },
        ]} />
      </div>
      <section className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-16">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Еженедельная уборка офисов</h1>
            <p className="text-lg opacity-90 mb-6">Поддерживаем чистоту рабочих пространств, санузлов и кухни. Гибкий график, ключевая метрика — м² офиса.</p>
            <div className="flex gap-3">
              <Link href="/contacts" className="btn-primary px-6 py-3">Оставить заявку</Link>
              <Link href="/services/office-cleaning" className="btn-secondary px-6 py-3">Ко всем офисным тарифам</Link>
            </div>
          </div>
          <MiniCalculator defaultArea={100} propertyType="office" cleaningType="maintenance" />
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-5xl prose prose-lg">
          <h2>Что делаем каждую неделю</h2>
          <ul>
            <li>Рабочие места: протирка поверхностей, пылесос, влажная уборка полов;</li>
            <li>Санузлы: дезинфекция и пополнение расходников;</li>
            <li>Кухня: мойка раковины, поверхностей, техники снаружи;</li>
            <li>Зона ресепшен: порядок, стекло, зеркала;</li>
            <li>Вынос мусора, замена пакетов.</li>
          </ul>
        </div>
      </section>
      <FAQSchema items={[
        { question: 'Заключаете договор?', answer: 'Да, работаем по договору, с закрывающими документами.' },
        { question: 'Можно утром/вечером?', answer: 'Да, подстроим график под ваш офис, в том числе до/после рабочего дня.' },
      ]} />
      <RelatedServicesSection currentService="/services/office-cleaning" />
    </div>
  );
}


