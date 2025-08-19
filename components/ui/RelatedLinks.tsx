'use client';

import React from 'react';

type LinkItem = { name: string; href: string };

export default function RelatedLinks({ links }: { links: LinkItem[] }) {
  if (!links || !links.length) return null;
  return (
    <section className="mt-10 border-t pt-6">
      <h3 className="text-lg font-semibold mb-3">Смотрите также</h3>
      <ul className="grid sm:grid-cols-2 gap-2">
        {links.map((l) => (
          <li key={l.href}>
            <a className="text-blue-600 hover:underline" href={l.href}>
              {l.name}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}


