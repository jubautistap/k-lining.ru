'use client';

import React, { useMemo } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Вставляет минимально необходимые JSON-LD схемы по типу страницы.
 * - /services/* → Service
 * - /blog/* → BlogPosting
 * - /prices → OfferCatalog
 * - хлебные крошки для всех, кроме /admin
 */
export default function DynamicSchemas() {
  const pathname = usePathname() || '/';
  const isAdmin = pathname.startsWith('/admin');

  const { breadcrumbs, specific } = useMemo(() => {
    const origin = 'https://k-lining.ru';
    const parts = pathname.split('/').filter(Boolean);

    const breadcrumbList = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Главная',
          item: origin,
        },
        ...parts.map((segment, index) => ({
          '@type': 'ListItem',
          position: index + 2,
          name: decodeURIComponent(segment.replace(/-/g, ' ')),
          item: `${origin}/${parts.slice(0, index + 1).join('/')}`,
        })),
      ],
    } as const;

    let specificSchema: Record<string, any> | null = null;

    if (pathname.startsWith('/services')) {
      specificSchema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Клининговые услуги',
        provider: {
          '@type': 'Organization',
          name: 'K-lining',
          url: origin,
          logo: `${origin}/logo.png`,
        },
        areaServed: { '@type': 'City', name: 'Москва' },
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'RUB',
          lowPrice: '2500',
          highPrice: '15000',
          url: `${origin}${pathname}`,
          availability: 'https://schema.org/InStock',
        },
      };
    } else if (pathname.startsWith('/blog/')) {
      specificSchema = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        mainEntityOfPage: `${origin}${pathname}`,
        headline: 'Блог о клининге',
        publisher: {
          '@type': 'Organization',
          name: 'K-lining',
          logo: { '@type': 'ImageObject', url: `${origin}/logo.png` },
        },
        image: [`${origin}/og-image.webp`],
        author: { '@type': 'Organization', name: 'K-lining' },
        datePublished: new Date().toISOString().split('T')[0],
        dateModified: new Date().toISOString().split('T')[0],
      };
    } else if (pathname === '/prices') {
      specificSchema = {
        '@context': 'https://schema.org',
        '@type': 'OfferCatalog',
        name: 'Цены на клининг',
        url: `${origin}/prices`,
      };
    }

    return {
      breadcrumbs: breadcrumbList,
      specific: specificSchema,
    };
  }, [pathname]);

  if (isAdmin) return null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      {specific ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(specific) }}
        />
      ) : null}
    </>
  );
}


