import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Клининг цена в Москве — прайс и калькулятор | K-lining',
  description: 'Цены на клининг в Москве: прайс-лист уборки, онлайн-калькулятор. Честная стоимость без доплат, бесплатный расчёт. Узнать цены ✓',
  keywords: 'клининг цена москва, клининг стоимость москва, цены на уборку',
  alternates: { canonical: 'https://k-lining.ru/klining-cena-moskva' },
  openGraph: {
    title: 'Цены на клининг — K-lining',
    description: 'Прайс и калькулятор стоимости клининга. Без скрытых платежей.',
    url: 'https://k-lining.ru/klining-cena-moskva',
    type: 'article',
    images: [{ url: '/og-image.webp', width: 1200, height: 630, alt: 'Цены на клининг' }],
  },
};

export default function CleaningPriceMoscowPage() {
  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
      <div className="container-custom space-y-8">
        <header className="space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">Клининг — цены в Москве</h1>
          <p className="text-xl text-gray-600">Ознакомьтесь с прайсом и рассчитайте стоимость уборки онлайн.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/prices" className="btn-primary px-8 py-4 text-lg">Открыть прайс</Link>
            <Link href="/calculator" className="btn-secondary px-8 py-4 text-lg">Калькулятор</Link>
          </div>
        </header>
      </div>
    </section>
  );
}


