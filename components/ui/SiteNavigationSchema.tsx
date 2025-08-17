'use client';

import React from 'react';

export default function SiteNavigationSchema() {
  const origin = 'https://k-lining.ru';
  const items = [
    { name: 'Главная', href: '/' },
    { name: 'Услуги', href: '/services' },
    { name: 'Цены', href: '/prices' },
    { name: 'Калькулятор', href: '/calculator' },
    { name: 'Блог', href: '/blog' },
    { name: 'Контакты', href: '/contacts' },
  ];

  const data = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((it, index) => ({
      '@type': 'SiteNavigationElement',
      position: index + 1,
      name: it.name,
      url: `${origin}${it.href}`,
    })),
  } as const;

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}


