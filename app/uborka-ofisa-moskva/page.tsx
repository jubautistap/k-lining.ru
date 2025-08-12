import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Уборка офиса в Москве — ежедневная, генеральная | K-lining',
  description: 'Клининг офисов в Москве: ежедневная и генеральная уборка, профессиональные бригады, документы и договор. Гибкий график.',
  keywords: 'уборка офиса москва, клининг офисов москва, ежедневная уборка офиса',
  alternates: { canonical: 'https://k-lining.ru/uborka-ofisa-moskva' },
  openGraph: {
    title: 'Уборка офиса — K-lining',
    description: 'Ежедневная и генеральная уборка офисов. Гибкий график, контроль качества, документы.',
    url: 'https://k-lining.ru/uborka-ofisa-moskva',
    type: 'article',
    images: [{ url: '/og-image.webp', width: 1200, height: 630, alt: 'Уборка офиса в Москве' }],
  },
};

export default function OfficeCleaningMoscowPage() {
  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
      <div className="container-custom space-y-8">
        <nav className="text-sm text-gray-500">
          <ol className="flex items-center space-x-2">
            <li><Link href="/" className="hover:text-primary-600">Главная</Link></li>
            <li>/</li>
            <li><Link href="/services" className="hover:text-primary-600">Услуги</Link></li>
            <li>/</li>
            <li className="text-gray-900">Уборка офиса</li>
          </ol>
        </nav>

        <header className="space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">Уборка офиса в Москве</h1>
          <p className="text-xl text-gray-600">Ежедневная, генеральная, после переезда. Договор, отчётность, ответственный менеджер.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/contacts" className="btn-primary px-8 py-4 text-lg">Запросить коммерческое</Link>
            <Link href="/services/office-cleaning" className="btn-secondary px-8 py-4 text-lg">Подробнее</Link>
          </div>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Форматы</h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>Ежедневная уборка</li>
              <li>Генеральная уборка</li>
              <li>После переезда/мероприятий</li>
              <li>Ночная уборка</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Для бизнеса</h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>Гибкие графики и SLA</li>
              <li>Договор, счета, закрывающие</li>
              <li>Контроль качества и аудит</li>
              <li>Быстрый старт</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}


