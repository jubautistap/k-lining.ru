'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Canonical() {
  const pathname = usePathname() || '';

  useEffect(() => {
    try {
      const href = `https://k-lining.ru${pathname}` || 'https://k-lining.ru/';
      const existing = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
      if (!existing) {
        const link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        link.setAttribute('href', href);
        document.head.appendChild(link);
      }
    } catch (_) {
      // noop
    }
  }, [pathname]);

  return null;
}


