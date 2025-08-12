'use client';

import React from 'react';

type QA = { question: string; answer: string };

export default function FAQSchema({ items }: { items: QA[] }) {
  if (!items?.length) return null;
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.question,
      acceptedAnswer: { '@type': 'Answer', text: it.answer },
    })),
  } as const;
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}