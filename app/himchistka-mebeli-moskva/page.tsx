import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Химчистка мебели в Москве — цены и заказ | K-lining 24/7',
  description: 'Профессиональная химчистка мебели в Москве: диваны, кресла, стулья, матрасы. Удаление пятен и запахов. Быстро и безопасно.',
  keywords: 'химчистка мебели москва, химчистка дивана москва, чистка ковров москва',
  alternates: { canonical: 'https://k-lining.ru/himchistka-mebeli-moskva' },
  openGraph: {
    title: 'Химчистка мебели — K-lining',
    description: 'Глубокая чистка обивки, удаление пятен и запахов. Профоборудование и безопасные составы.',
    url: 'https://k-lining.ru/himchistka-mebeli-moskva',
    type: 'article',
    images: [{ url: '/og-image.webp', width: 1200, height: 630, alt: 'Химчистка мебели' }],
  },
};

export default function FurnitureDryCleaningMoscowPage() {
  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
      <div className="container-custom space-y-8">
        <nav className="text-sm text-gray-500">
          <ol className="flex items-center space-x-2">
            <li><Link href="/" className="hover:text-primary-600">Главная</Link></li>
            <li>/</li>
            <li><Link href="/services" className="hover:text-primary-600">Услуги</Link></li>
            <li>/</li>
            <li className="text-gray-900">Химчистка мебели</li>
          </ol>
        </nav>

        <header className="space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">Химчистка мебели в Москве</h1>
          <p className="text-xl text-gray-600">Диваны, кресла, стулья, матрасы. Удаляем пятна и запахи. Быстро и безопасно, с гарантией результата.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/calculator" className="btn-primary px-8 py-4 text-lg">Рассчитать стоимость</Link>
            <Link href="/contacts" className="btn-secondary px-8 py-4 text-lg">Заказать чистку</Link>
          </div>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Объекты</h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>Диваны и кресла</li>
              <li>Матрасы и пуфы</li>
              <li>Стулья, офисная мебель</li>
              <li>Ковролин и ковры</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Технология</h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>Эко-безопасные составы</li>
              <li>Экстракционная чистка</li>
              <li>Локальная обработка пятен</li>
              <li>Ускоренная сушка</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-700">Подробнее об услуге: <Link href="/services/furniture-dry-cleaning" className="text-primary-600 underline">Химчистка мебели</Link>.</p>
        </div>
      </div>
    </section>
  );
}


