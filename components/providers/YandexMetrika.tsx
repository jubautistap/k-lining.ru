'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    ym?: (...args: any[]) => void;
  }
}

const COUNTER_ID = 103567092;

export default function YandexMetrika() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = `${window.location.origin}${pathname}${searchParams?.toString() ? `?${searchParams.toString()}` : ''}`;
    if (typeof window !== 'undefined' && typeof window.ym === 'function') {
      try {
        window.ym(COUNTER_ID, 'hit', url, {
          title: document.title,
          referer: document.referrer || undefined,
        });
      } catch {
        // noop
      }
    }
  }, [pathname, searchParams]);

  return null;
}


