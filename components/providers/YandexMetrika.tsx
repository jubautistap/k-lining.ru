'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    ym?: (...args: any[]) => void;
  }
}

const YM_ID = Number(process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID) || 103567092;

export default function YandexMetrika() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = `${window.location.origin}${pathname}${searchParams?.toString() ? `?${searchParams.toString()}` : ''}`;
    if (typeof window !== 'undefined' && typeof window.ym === 'function') {
      try {
        window.ym(YM_ID, 'hit', url, {
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


