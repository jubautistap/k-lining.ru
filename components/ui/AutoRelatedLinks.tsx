'use client';

import React, { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import landings from '@/data/seo-landings.json';

type LinkItem = { name: string; href: string };

function pickLinks(pathname: string): LinkItem[] {
  const links: LinkItem[] = [];
  const isService = pathname.startsWith('/services');
  const isDistrict = pathname.startsWith('/districts');

  if (isService) {
    links.push(
      { name: 'Цены на уборку', href: '/prices' },
      { name: 'Калькулятор стоимости', href: '/calculator' },
      { name: 'Мытьё окон', href: '/services/window-cleaning' },
      { name: 'Химчистка мебели', href: '/services/furniture-dry-cleaning' },
    );
  }

  if (isDistrict) {
    links.push(
      { name: 'Уборка квартир в Москве', href: '/services/apartment-cleaning' },
      { name: 'Уборка после ремонта', href: '/services/post-renovation-cleaning' },
      { name: 'Уборка офиса', href: '/services/office-cleaning' },
      { name: 'Мытьё окон', href: '/services/window-cleaning' },
    );
  }

  // добираем 3-4 НЧ-лендинга из seo-landings по релевантным кластерам
  const clustersPriority = isService
    ? ['Цены и калькулятор', 'Квартиры: генеральная', 'Квартиры: после ремонта']
    : isDistrict
      ? ['Квартиры: общая', 'Спецуборка: события']
      : ['Главная/Общее: клининг Москва'];

  const candidates: LinkItem[] = [];
  try {
    Object.values(landings as Record<string, any>).forEach((v: any) => {
      if (clustersPriority.includes(v.cluster)) {
        candidates.push({ name: v.h1 || v.title || v.slug, href: `/${v.slug}` });
      }
    });
  } catch {}

  // уникализируем и ограничиваем
  const seen = new Set<string>();
  for (const c of candidates) {
    if (seen.has(c.href) || c.href === pathname) continue;
    seen.add(c.href);
    links.push(c);
    if (links.length >= 8) break;
  }

  return links;
}

export default function AutoRelatedLinks() {
  const pathname = usePathname() || '/';
  const links = useMemo(() => pickLinks(pathname), [pathname]);
  if (!links.length) return null;
  return (
    <section className="mt-16 border-t pt-8">
      <h3 className="text-xl font-semibold mb-4">Смотрите также</h3>
      <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {links.map((l) => (
          <li key={l.href}>
            <a className="text-blue-600 hover:underline" href={l.href}>{l.name}</a>
          </li>
        ))}
      </ul>
    </section>
  );
}


