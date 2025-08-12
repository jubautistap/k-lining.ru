'use client';

import React from 'react';

type QA = { question: string; answer: string };

// Backward-compat: accept both props names
type Props = { items?: QA[]; faqs?: QA[] } & Record<string, unknown>;

export default function FAQSchema(props: Props) {
  const items = (props.items as QA[] | undefined) ?? (props.faqs as QA[] | undefined) ?? [];
  const list = items;
  if (!list.length) return null;
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: list.map((it) => ({
      '@type': 'Question',
      name: it.question,
      acceptedAnswer: { '@type': 'Answer', text: it.answer },
    })),
  } as const;
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}