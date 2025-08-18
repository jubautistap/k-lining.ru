import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema';
import FAQSchema from '@/components/ui/FAQSchema';
import RelatedServicesSection from '@/components/sections/RelatedServicesSection';
import MiniCalculator from '@/components/calculators/MiniCalculator';

export const metadata: Metadata = {
  title: 'Мытьё панорамных окон и витражей в Москве — безопасно | K-lining',
  description: 'Панорамные окна, витражи, фасады. Без разводов и царапин, со страховкой и допуском. Индивидуальная оценка. Базовая метрика — за створку/секции.',
  alternates: { canonical: 'https://k-lining.ru/services/window-cleaning/panoramic' },
};

export default function PanoramicWindowCleaningPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 pt-6">
        <BreadcrumbSchema items={[
          { name: 'Услуги', url: '/services' },
          { name: 'Мытьё окон', url: '/services/window-cleaning' },
          { name: 'Панорамные/витражи', url: '/services/window-cleaning/panoramic' },
        ]} />
      </div>

      <section className="bg-gradient-to-r from-cyan-700 to-cyan-900 text-white py-16">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Панорамные окна и витражи</h1>
            <p className="text-lg opacity-90 mb-6">Работаем с крупноформатным остеклением и сложным доступом. Используем профессиональные системы и страховку.</p>
            <div className="flex gap-3">
              <Link href="/contacts" className="btn-primary px-6 py-3">Оставить заявку</Link>
              <Link href="/services/window-cleaning" className="btn-secondary px-6 py-3">Тарифы на мытьё окон</Link>
            </div>
          </div>
          <MiniCalculator defaultArea={80} propertyType="apartment" cleaningType="general" windowsCount={8} />
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-5xl prose prose-lg">
          <h2>Безопасность и качество</h2>
          <p>Мы используем мягкие щётки, сквиджи и безопасную химию, исключая риск царапин на стекле. Для высоты привлекаем промышленный альпинизм.</p>
          <h2>Как формируется цена</h2>
          <p>Базовая метрика — количество секций/створок. Доплаты при высоте, сложных фасадах и сильных загрязнениях (бетон, герметик).</p>
        </div>
      </section>

      <FAQSchema items={[
        { question: 'Что такое секция/створка для панорам?', answer: 'Счёт идёт по отдельным сегментам остекления; смета согласовывается перед работой.' },
        { question: 'Нужен ли пропуск/доступ?', answer: 'Если здание режимное — предупредите менеджера, мы подготовим документы.' },
      ]} />

      <RelatedServicesSection currentService="/services/window-cleaning" />
    </div>
  );
}


