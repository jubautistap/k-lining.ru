import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Мытьё окон в Москве — цены и заказ | K-lining 24/7',
  description: 'Профессиональная мойка окон в Москве: без разводов, снаружи и внутри, балконы и витражи. Высотные работы. Гарантия качества.',
  keywords: 'мытье окон москва, мойка окон москва, высотное мытье окон',
  alternates: { canonical: 'https://k-lining.ru/myte-okon-moskva' },
  openGraph: {
    title: 'Мытьё окон — K-lining',
    description: 'Профессиональная мойка окон и витражей. Высотные работы, безопасно и чисто.',
    url: 'https://k-lining.ru/myte-okon-moskva',
    type: 'article',
    images: [{ url: '/og-image.webp', width: 1200, height: 630, alt: 'Мытьё окон в Москве' }],
  },
};

export default function WindowCleaningMoscowPage() {
  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
      <div className="container-custom space-y-8">
        <nav className="text-sm text-gray-500">
          <ol className="flex items-center space-x-2">
            <li><Link href="/" className="hover:text-primary-600">Главная</Link></li>
            <li>/</li>
            <li><Link href="/services" className="hover:text-primary-600">Услуги</Link></li>
            <li>/</li>
            <li className="text-gray-900">Мытьё окон</li>
          </ol>
        </nav>

        <header className="space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">Мытьё окон в Москве</h1>
          <p className="text-xl text-gray-600">Чистые окна без разводов. Внутри/снаружи, балконы, панорамные окна, витрины. Высотные работы.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/calculator" className="btn-primary px-8 py-4 text-lg">Рассчитать стоимость</Link>
            <Link href="/contacts" className="btn-secondary px-8 py-4 text-lg">Заказать мойку</Link>
          </div>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Что входит</h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>Стёкла, рамы, подоконники</li>
              <li>Снятие налёта и загрязнений</li>
              <li>Безопасные средства и инструменты</li>
              <li>Работа на высоте по ТБ</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Преимущества</h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>Опытные клинеры</li>
              <li>Страховка работ</li>
              <li>Честная смета</li>
              <li>Гарантия результата</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-700">Детали услуги: <Link href="/services/window-cleaning" className="text-primary-600 underline">Мытьё окон</Link>.</p>
        </div>
      </div>
    </section>
  );
}


