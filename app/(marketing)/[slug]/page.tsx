import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import landings from '@/data/seo-landings.json';

interface LandingConfig {
  title: string;
  description: string;
  h1: string;
  primaryHref: string;
  primaryText: string;
  secondaryHref?: string;
  secondaryText?: string;
  breadcrumb: string;
  detailsLink?: string;
  cluster?: string;
  metro?: string;
  okrug?: string;
}

const STATIC_LANDINGS: Record<string, LandingConfig> = {
  'klining-nedorogo-moskva': {
    title: 'Клининг недорого в Москве — цены | K-lining',
    description: 'Недорогие клининговые услуги в Москве: квартиры, дома, офисы. Прозрачные цены, быстрый выезд.',
    h1: 'Клининг недорого в Москве',
    primaryHref: '/calculator',
    primaryText: 'Рассчитать стоимость',
    secondaryHref: '/contacts',
    secondaryText: 'Заказать клининг',
    breadcrumb: 'Клининг недорого',
    detailsLink: '/prices',
  },
  'klining-srochno-moskva': {
    title: 'Срочный клининг в Москве 24/7 — быстро | K-lining',
    description: 'Срочная уборка квартир и офисов в Москве. Выезд в течение нескольких часов. Работаем 24/7.',
    h1: 'Срочный клининг в Москве',
    primaryHref: '/contacts',
    primaryText: 'Вызвать бригаду',
    breadcrumb: 'Срочный клининг',
    detailsLink: '/services',
  },
  'klining-24-7-moskva': {
    title: 'Клининг 24/7 в Москве — круглосуточно | K-lining',
    description: 'Круглосуточная уборка квартир и офисов в Москве. Ночные смены, выезд без выходных.',
    h1: 'Клининг 24/7 в Москве',
    primaryHref: '/contacts',
    primaryText: 'Заказать сейчас',
    breadcrumb: 'Клининг 24/7',
    detailsLink: '/services',
  },
  'uborka-doma-moskva': {
    title: 'Уборка дома в Москве — цены и заказ | K-lining',
    description: 'Профессиональная уборка частных домов и коттеджей. Регулярно, генеральная, после ремонта.',
    h1: 'Уборка дома в Москве',
    primaryHref: '/contacts',
    primaryText: 'Заказать уборку',
    secondaryHref: '/calculator',
    secondaryText: 'Рассчитать',
    breadcrumb: 'Уборка дома',
    detailsLink: '/services/house-cleaning',
  },
  'uborka-kottedzha-moskva': {
    title: 'Уборка коттеджа в Москве — профессионально | K-lining',
    description: 'Полный спектр клининга коттеджей и таунхаусов: поддерживающая, генеральная, после ремонта.',
    h1: 'Уборка коттеджа в Москве',
    primaryHref: '/contacts',
    primaryText: 'Заказать уборку',
    breadcrumb: 'Уборка коттеджа',
    detailsLink: '/services/house-cleaning',
  },
  'uborka-sanuzla-moskva': {
    title: 'Уборка санузла в Москве — душ, ванна, туалет | K-lining',
    description: 'Глубокая уборка санузлов: известковый налёт, грибок, швы. Безопасные составы.',
    h1: 'Уборка санузла в Москве',
    primaryHref: '/contacts',
    primaryText: 'Заказать уборку',
    breadcrumb: 'Уборка санузла',
    detailsLink: '/services/apartment-cleaning',
  },
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const dynamic = (landings as Record<string, any>)[params.slug];
  const config = dynamic
    ? {
        title: dynamic.title || 'K-lining',
        description: dynamic.description || 'Профессиональная уборка в Москве',
        h1: dynamic.h1 || dynamic.title || 'Услуги клининга',
        primaryHref: '/contacts',
        primaryText: 'Заказать',
        secondaryHref: '/calculator',
        secondaryText: 'Рассчитать',
        breadcrumb: dynamic.h1 || 'Клининг',
        detailsLink: '/services',
        cluster: dynamic.cluster,
        metro: dynamic.metro,
        okrug: dynamic.okrug,
      }
    : STATIC_LANDINGS[params.slug];
  if (!config) {
    return {
      title: 'Услуги клининга в Москве — K-lining',
      description: 'Профессиональная уборка квартир, домов и офисов в Москве и МО. Работаем 24/7.',
    };
  }
  return {
    title: config.title,
    description: config.description,
    alternates: { canonical: `https://k-lining.ru/${params.slug}` },
    openGraph: {
      title: config.title,
      description: config.description,
      url: `https://k-lining.ru/${params.slug}`,
      images: [{ url: '/og-image.webp', width: 1200, height: 630 }],
      type: 'article',
    },
  };
}

export default function MarketingLandingPage({ params }: { params: { slug: string } }) {
  const dynamic = (landings as Record<string, any>)[params.slug];
  const config = dynamic
    ? {
        title: dynamic.title || 'K-lining',
        description: dynamic.description || 'Профессиональная уборка в Москве',
        h1: dynamic.h1 || dynamic.title || 'Услуги клининга',
        primaryHref: '/contacts',
        primaryText: 'Заказать',
        secondaryHref: '/calculator',
        secondaryText: 'Рассчитать',
        breadcrumb: dynamic.h1 || 'Клининг',
        detailsLink: '/services',
      }
    : STATIC_LANDINGS[params.slug];
  if (!config) return notFound();

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
      <div className="container-custom space-y-8">
        <nav className="text-sm text-gray-500">
          <ol className="flex items-center space-x-2">
            <li><Link href="/" className="hover:text-primary-600">Главная</Link></li>
            <li>/</li>
            <li><Link href="/services" className="hover:text-primary-600">Услуги</Link></li>
            <li>/</li>
            <li className="text-gray-900">{config.breadcrumb}</li>
          </ol>
        </nav>

        <header className="space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">{config.h1}</h1>
          <p className="text-xl text-gray-600">{config.description}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href={config.primaryHref} className="btn-primary px-8 py-4 text-lg">{config.primaryText}</Link>
            {config.secondaryHref && config.secondaryText && (
              <Link href={config.secondaryHref} className="btn-secondary px-8 py-4 text-lg">{config.secondaryText}</Link>
            )}
          </div>
        </header>

        {/* Уличный микро‑контент для конверсии и уникальности */}
        {config.cluster === 'улицы' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Быстрый выезд</h3>
              <p className="text-sm text-gray-700">Работаем рядом{config.metro ? `, метро ${config.metro}` : ''}{config.okrug ? `, ${config.okrug}` : ''}. Выезд за 60–120 минут.</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Ориентиры по ценам</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>1‑к квартира: от 3 000 ₽</li>
                <li>2‑к квартира: от 4 500 ₽</li>
                <li>Генеральная: от 5 000 ₽</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="font-semibold text-gray-900 mb-2">FAQ</h3>
              <ul className="text-sm text-gray-700 space-y-1 list-disc pl-4">
                <li>Можно сегодня? — Да, работаем 24/7</li>
                <li>Оплата? — После выполнения работ</li>
                <li>Смета? — За 10–15 минут</li>
              </ul>
            </div>
          </div>
        )}

        {config.detailsLink && (
          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-700">Подробнее: <Link href={config.detailsLink} className="text-primary-600 underline">перейти к услуге</Link>.</p>
          </div>
        )}
      </div>
    </section>
  );
}


