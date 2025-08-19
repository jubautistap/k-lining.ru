import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import nextDynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import landings from '@/data/seo-landings.json';
import FAQSchema from '@/components/ui/FAQSchema';
import OpenWizardButton from '@/components/ui/OpenWizardButton';

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

// Пререндерим все маркетинговые лендинги, чтобы исключить случайные 500 на SSR
export const dynamic = 'force-static';
export const revalidate = 86400; // 24h ISR

export async function generateStaticParams() {
  const jsonSlugs = Object.keys(landings as Record<string, unknown>);
  const staticSlugs = Object.keys(STATIC_LANDINGS);
  const unique = Array.from(new Set([...jsonSlugs, ...staticSlugs]));
  return unique.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const landing = (landings as Record<string, any>)[params.slug];
  const config = landing
    ? {
        title: landing.title || 'K-lining',
        description: landing.description || 'Профессиональная уборка в Москве',
        h1: landing.h1 || landing.title || 'Услуги клининга',
        primaryHref: '/contacts',
        primaryText: 'Заказать',
        secondaryHref: '/calculator',
        secondaryText: 'Рассчитать',
        breadcrumb: landing.h1 || 'Клининг',
        detailsLink: '/services',
        cluster: landing.cluster,
        metro: landing.metro,
        okrug: landing.okrug,
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
  const landing = (landings as Record<string, any>)[params.slug];
  const config: LandingConfig | undefined = landing
    ? {
        title: landing.title || 'K-lining',
        description: landing.description || 'Профессиональная уборка в Москве',
        h1: landing.h1 || landing.title || 'Услуги клининга',
        primaryHref: '/contacts',
        primaryText: 'Заказать',
        secondaryHref: '/calculator',
        secondaryText: 'Рассчитать',
        breadcrumb: landing.h1 || 'Клининг',
        detailsLink: '/services',
        cluster: landing.cluster,
        metro: landing.metro,
        okrug: landing.okrug,
      }
    : STATIC_LANDINGS[params.slug];
  if (!config) return notFound();

  // Деривация уникального контента исходя из slug/кластера
  function deriveProfile(slug: string, cluster?: string) {
    const s = slug.toLowerCase();
    const price: Array<{ label: string; price: string }> = [];
    const features: string[] = [];
    let serviceType = 'Клининговые услуги';
    const faq: Array<{ question: string; answer: string }> = [];

    if (/trehkomnatn|трехкомнат/i.test(s)) {
      serviceType = 'Уборка 3‑комнатной квартиры';
      price.push(
        { label: 'Базовая (до 80 м²)', price: 'от 7 000 ₽' },
        { label: 'Генеральная', price: 'от 12 000 ₽' },
        { label: 'После ремонта', price: 'от 16 000 ₽' },
      );
      features.push('Кухня, 2 санузла, стекла и зеркала', 'Пыль/полы/плинтусы', 'Внутренние фасады мебели');
      faq.push(
        { question: 'Сколько клинеров приедет?', answer: 'Обычно 2–3 клинера, в зависимости от площади и состояния.' },
        { question: 'Сколько времени займёт?', answer: 'Поддерживающая — 3–5 часов, генеральная — 5–8 часов.' }
      );
    } else if (/dvushk/i.test(s)) {
      serviceType = 'Уборка 2‑комнатной квартиры';
      price.push(
        { label: 'Поддерживающая (до 60 м²)', price: 'от 6 000 ₽' },
        { label: 'Генеральная', price: 'от 10 000 ₽' }
      );
      features.push('Кухня, санузел, стекла', 'Удаление пыли и жира', 'Мытьё полов');
    } else if (/odnushk/i.test(s)) {
      serviceType = 'Уборка 1‑комнатной квартиры';
      price.push(
        { label: 'Поддерживающая (до 40 м²)', price: 'от 6 000 ₽' },
        { label: 'Генеральная', price: 'от 9 000 ₽' }
      );
      features.push('Комната, кухня, санузел', 'Пыль/полы', 'Зеркала и стекла');
    } else if (/pered-sdach|перед-сдач/i.test(s)) {
      serviceType = 'Предзаездная/перед сдачей уборка';
      price.push(
        { label: 'Студия/1к', price: 'от 7 000 ₽' },
        { label: '2к', price: 'от 10 000 ₽' },
        { label: '3к+', price: 'от 12 000 ₽' }
      );
      features.push('Детейлинг кухни/санузлов', 'Удаление запахов', 'Проверка труднодоступных мест');
    } else if (/posle-remonta|после-ремон/i.test(s)) {
      serviceType = 'Уборка после ремонта';
      price.push(
        { label: 'Студия (до 30 м²)', price: 'от 8 000 ₽' },
        { label: '1к (до 50 м²)', price: 'от 12 000 ₽' },
        { label: '2к (до 70 м²)', price: 'от 16 000 ₽' }
      );
      features.push('Удаление строительной пыли', 'Очистка следов краски/клея', 'Финишная протирка');
      faq.push(
        { question: 'Что с мусором?', answer: 'Выносим мелкий мусор. Крупный и вывоз — по договорённости.' },
        { question: 'Окна включены?', answer: 'Да, можем помыть окна/створки, доплата зависит от количества.' }
      );
    } else if (/ofis|офис/i.test(s)) {
      serviceType = 'Уборка офиса';
      price.push(
        { label: 'Поддерживающая (за м²)', price: '80–110 ₽/м²' },
        { label: 'Генеральная', price: '120–180 ₽/м²' }
      );
      features.push('Зоны open‑space/переговорные', 'Кухни/санузлы', 'Стеклянные перегородки');
    } else if (/bez-himii|без-хими/i.test(s)) {
      serviceType = 'Эко‑уборка';
      price.push(
        { label: 'Квартира', price: 'от 6 000 ₽' },
        { label: 'Дом', price: 'от 8 000 ₽' }
      );
      features.push('Гипоаллергенные составы', 'Безопасно для детей/питомцев', 'Парогенератор по запросу');
    } else if (/s-parogenerator|парогенератор/i.test(s)) {
      serviceType = 'Уборка с парогенератором';
      price.push(
        { label: 'Квартира', price: 'от 7 000 ₽' },
        { label: 'Дом', price: 'от 9 000 ₽' }
      );
      features.push('Глубокая дезинфекция паром', 'Сложные загрязнения/швы', 'Меньше химии');
    } else if (/kottedzh|коттедж|doma|дом/i.test(s)) {
      serviceType = 'Уборка дома/коттеджа';
      price.push(
        { label: 'До 120 м²', price: 'от 8 000 ₽' },
        { label: '120–200 м²', price: 'от 12 000 ₽' }
      );
      features.push('Многоуровневые пространства', 'Лестницы/второй свет', 'Мытьё окон/высота');
    } else if (/kvartir|квартир/i.test(s)) {
      serviceType = 'Уборка квартиры';
      price.push(
        { label: 'Поддерживающая', price: '60–110 ₽/м²' },
        { label: 'Генеральная', price: '160–220 ₽/м²' }
      );
      features.push('Кухня/санузлы', 'Пыль/полы', 'Зеркала/стекла');
    }

    if (cluster === 'улицы') {
      // усиливаем локальность
      faq.push(
        { question: 'Сколько ждать выезда?', answer: 'Обычно 60–120 минут в пределах МКАД, без предоплаты.' }
      );
    }

    // дефолтный FAQ
    if (faq.length === 0) {
      faq.push(
        { question: 'Как рассчитывается стоимость?', answer: 'Смотрим на метраж, состояние и тип уборки. Точный расчёт выдаём за 10–15 минут.' },
        { question: 'Чем убираете?', answer: 'Профессиональная химия, по запросу — гипоаллергенные составы и парогенератор.' },
        { question: 'Оплата и гарантия?', answer: 'Оплата после выполнения работ, даём гарантию качества.' }
      );
    }

    return { serviceType, price, features, faq };
  }

  const profile = deriveProfile(params.slug, config?.cluster);

  // Похожие улицы (тот же кластер/округ)
  const similar: Array<{ slug: string; h1: string }> = Object.entries(landings as Record<string, any>)
    .filter(([slug, v]) => slug !== params.slug && v?.cluster === 'улицы' && (!config?.okrug || v?.okrug === config?.okrug))
    .slice(0, 6)
    .map(([slug, v]) => ({ slug, h1: v.h1 || v.title || 'Страница' }));

  // Универсальные внутренние ссылки для всех кластеров (6–12 шт.)
  function buildRelatedLinks(): Array<{ href: string; label: string }> {
    const result: Array<{ href: string; label: string }> = [];
    const entries = Object.entries(landings as Record<string, any>);

    // 1) Сначала — из того же кластера
    if (config?.cluster) {
      const sameCluster = entries
        .filter(([slug, v]) => slug !== params.slug && v?.cluster === config?.cluster)
        .slice(0, 8)
        .map(([slug, v]) => ({ href: `/${slug}`, label: v.h1 || v.title || slug }));
      result.push(...sameCluster);
    }

    // 2) Дополняем ценовыми/калькуляторными лендингами
    const priceClusters = ['Цены и калькулятор'];
    const priceLinks = entries
      .filter(([slug, v]) => slug !== params.slug && priceClusters.includes(v?.cluster))
      .slice(0, 4)
      .map(([slug, v]) => ({ href: `/${slug}`, label: v.h1 || v.title || slug }));
    result.push(...priceLinks);

    // 3) Добавляем основные сервисные страницы
    const serviceLinks = [
      { href: '/services/apartment-cleaning', label: 'Уборка квартир' },
      { href: '/services/post-renovation-cleaning', label: 'Уборка после ремонта' },
      { href: '/services/window-cleaning', label: 'Мытьё окон' },
      { href: '/services/house-cleaning', label: 'Уборка домов' },
      { href: '/prices', label: 'Цены на клининг' },
      { href: '/calculator', label: 'Калькулятор уборки' },
    ];
    result.push(...serviceLinks);

    // Уникализируем и ограничиваем
    const seen = new Set<string>();
    const unique = result.filter((r) => {
      if (seen.has(r.href) || r.href === `/${params.slug}`) return false;
      seen.add(r.href);
      return true;
    });
    return unique.slice(0, 12);
  }
  const relatedLinks = buildRelatedLinks();

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: config.h1,
    serviceType: profile.serviceType || 'Клининговые услуги',
    areaServed: { '@type': 'City', name: 'Москва' },
    provider: { '@type': 'Organization', name: 'K-lining', url: 'https://k-lining.ru' },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'RUB',
      lowPrice: '2500',
      highPrice: '30000',
      url: `https://k-lining.ru/${params.slug}`
    }
  };

  const StickyPromo = nextDynamic(() => import('@/components/ui/StickyPromo'), { ssr: false });

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
            <OpenWizardButton className="btn-primary px-8 py-4 text-lg" ctaId={`landing_primary_${params.slug}`}>{config.primaryText}</OpenWizardButton>
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
                <li>Поддерживающая: 60–110 ₽/м²</li>
                <li>Генеральная: 160–220 ₽/м²</li>
                <li>После ремонта: 220–300 ₽/м²</li>
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

        {/* Уникальные блоки под запрос */}
        {profile.features.length > 0 && (
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Что входит</h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              {profile.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        )}

        {profile.price.length > 0 && (
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Ориентиры по цене</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {profile.price.map((p) => (
                <div key={p.label} className="flex items-center justify-between rounded-lg border border-gray-200 px-3 py-2">
                  <span className="text-gray-700">{p.label}</span>
                  <span className="font-semibold text-gray-900">{p.price}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">Итог зависит от площади, состояния и сложности. Точный расчёт — за 10–15 минут.</p>
          </div>
        )}

        {/* Похожие улицы */}
        {config.cluster === 'улицы' && similar.length > 0 && (
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Рядом с вами</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {similar.map((s) => (
                <Link
                  key={s.slug}
                  href={`/${s.slug}`}
                  className="block rounded-lg border border-gray-200 p-3 text-sm text-gray-700 hover:border-primary-300 hover:text-primary-700"
                >
                  {s.h1}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Похожие услуги и страницы — для всех кластеров */}
        {relatedLinks.length > 0 && (
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Смотрите также</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {relatedLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="block rounded-lg border border-gray-200 p-3 text-sm text-gray-700 hover:border-primary-300 hover:text-primary-700"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      {/* FAQ JSON-LD — для всех лендингов */}
      <FAQSchema items={profile.faq} />
      {/* Sticky CTA для конверсии */}
      <StickyPromo enabled={true} />
    </section>
  );
}


