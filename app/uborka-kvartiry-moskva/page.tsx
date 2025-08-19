import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import OpenWizardButton from '@/components/ui/OpenWizardButton';

export const metadata: Metadata = {
  title: 'Уборка квартиры в Москве — цены и заказ | K-lining 24/7',
  description: 'Профессиональная уборка квартир в Москве и МО. Поддерживающая, генеральная, после ремонта. Работаем 24/7. Честные цены, выезд в день обращения.',
  keywords: 'уборка квартиры москва, клининг квартиры москва, поддерживающая уборка, генеральная уборка, уборка после ремонта',
  alternates: { canonical: 'https://k-lining.ru/uborka-kvartiry-moskva' },
  openGraph: {
    title: 'Уборка квартиры в Москве — K-lining',
    description: 'Профессиональная уборка квартир 24/7: поддерживающая, генеральная, после ремонта.',
    url: 'https://k-lining.ru/uborka-kvartiry-moskva',
    type: 'article',
    images: [{ url: '/og-image.webp', width: 1200, height: 630, alt: 'Уборка квартиры в Москве' }],
  },
};

export default function ApartmentCleaningMoscowPage() {
  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
      <div className="container-custom space-y-8">
        <nav className="text-sm text-gray-500">
          <ol className="flex items-center space-x-2">
            <li><Link href="/" className="hover:text-primary-600">Главная</Link></li>
            <li>/</li>
            <li><Link href="/services" className="hover:text-primary-600">Услуги</Link></li>
            <li>/</li>
            <li className="text-gray-900">Уборка квартиры Москва</li>
          </ol>
        </nav>

        <header className="space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">Уборка квартиры в Москве</h1>
          <p className="text-xl text-gray-600">Поддерживающая, генеральная и уборка после ремонта. Работаем 24/7. Быстрый расчёт стоимости и выезд в день обращения.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/calculator" className="btn-secondary px-8 py-4 text-lg">Рассчитать стоимость</Link>
            <OpenWizardButton className="btn-primary px-8 py-4 text-lg" ctaId="uborka_kvartiry_msk_cta">Заказать уборку</OpenWizardButton>
          </div>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Что входит</h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>Пыль, полы, влажная уборка</li>
              <li>Кухня и техника снаружи</li>
              <li>Санузел: раковина, унитаз, душ</li>
              <li>Зеркала и стеклянные поверхности</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Почему K-lining</h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>Собственные материалы и оборудование</li>
              <li>Гарантия качества и контроль</li>
              <li>Честные цены, без скрытых доплат</li>
              <li>Онлайн-оплата и закрывающие документы</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-700">Ищете полный перечень работ? Смотрите подробную услугу: <Link href="/services/apartment-cleaning" className="text-primary-600 underline">Уборка квартиры</Link>.</p>
        </div>
      </div>
    </section>
  );
}


