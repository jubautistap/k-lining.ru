'use client';

import React from 'react';
import { COMPANY_DATA } from '@/lib/seo/company-data';

export default function StructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: COMPANY_DATA.name,
    url: COMPANY_DATA.url,
    logo: COMPANY_DATA.logo,
    telephone: COMPANY_DATA.telephone,
    address: COMPANY_DATA.address,
    sameAs: COMPANY_DATA.sameAs,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
