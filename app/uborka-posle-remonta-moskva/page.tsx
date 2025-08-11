import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Уборка квартиры после ремонта — Москва | K-lining 24/7',
  description: 'Глубокая уборка после ремонта в Москве: удаление строительной пыли, мойка окон, чистка поверхностей. Быстро, безопасно, с гарантией.',
  keywords: 'уборка после ремонта москва, послестроительная уборка, клининг после ремонта',
  alternates: { canonical: 'https://k-lining.ru/uborka-posle-remonta-moskva' },
  openGraph: {
    title: 'Уборка после ремонта — K-lining',
    description: 'Профессиональная послестроительная уборка с гарантией качества.',
    url: 'https://k-lining.ru/uborka-posle-remonta-moskva',
    type: 'article',
    images: [{ url: '/og-image.webp', width: 1200, height: 630, alt: 'Уборка после ремонта' }],
  },
};

export default function PostRenovationCleaningMoscowPage() {
  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
      <div className="container-custom space-y-8">
        <nav className="text-sm text-gray-500">
          <ol className="flex items-center space-x-2">
            <li><Link href="/" className="hover:text-primary-600">Главная</Link></li>
            <li>/</li>
            <li><Link href="/services" className="hover:text-primary-600">Услуги</Link></li>
            <li>/</li>
            <li className="text-gray-900">После ремонта</li>
          </ol>
        </nav>

        <header className="space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">Уборка после ремонта в Москве</h1>
          <p className="text-xl text-gray-600">Удалим строительную пыль, следы краски и цемента. Промоем окна и тщательно очистим все поверхности.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/calculator" className="btn-primary px-8 py-4 text-lg">Рассчитать стоимость</Link>
            <Link href="/contacts" className="btn-secondary px-8 py-4 text-lg">Заказать уборку</Link>
          </div>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Что делаем</h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>Сухая и влажная уборка всех поверхностей</li>
              <li>Мойка окон, рам, подоконников</li>
              <li>Удаление следов строительных смесей</li>
              <li>Обезпылевание с профессиональными фильтрами</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Почему мы</h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>Опытные бригады и проф. оборудование</li>
              <li>Безопасные средства для разных поверхностей</li>
              <li>Фиксированная смета и гарантия качества</li>
              <li>Начинаем в день обращения</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-700">Подробная информация в основной услуге: <Link href="/services/post-renovation-cleaning" className="text-primary-600 underline">Уборка после ремонта</Link>.</p>
        </div>
      </div>
    </section>
  );
}


