'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import DynamicSchemas from '@/components/ui/DynamicSchemas';
import Canonical from '@/components/ui/Canonical';
import SiteNavigationSchema from '@/components/ui/SiteNavigationSchema';
import Script from 'next/script';
import AutoRelatedLinks from '@/components/ui/AutoRelatedLinks';

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    // Для админки — никаких Header/Footer и без верхнего отступа
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <DynamicSchemas />
      <SiteNavigationSchema />
      <Canonical />
      {/* hreflang для ru-RU */}
      <link rel="alternate" hrefLang="ru-RU" href="https://k-lining.ru" />
      {/* Трекинг кликов по data-cta для Метрики/GA */}
      <Script id="cta-tracker" strategy="afterInteractive">{`
        (function(){
          try {
            document.addEventListener('click', function(e){
              var el = e.target && (e.target.closest && e.target.closest('[data-cta]'));
              if (!el) return;
              var id = el.getAttribute('data-cta');
              if (!id) return;
              try { if (window.ym) ym(${Number(process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID) || 103567092}, 'reachGoal', 'cta_click', { id: id }); } catch(e){}
              try { if (window.gtag) gtag('event','cta_click',{ id: id }); } catch(e){}
            }, true);
          } catch(_) {}
        })();
      `}</Script>
      <Header />
      <main className="flex-grow pt-20 md:pt-24">
        {children}
        <div className="container-custom">
          <AutoRelatedLinks />
        </div>
      </main>
      <Footer />
    </div>
  );
}


