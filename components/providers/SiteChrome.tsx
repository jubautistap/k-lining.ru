'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

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
      <Header />
      <main className="flex-grow pt-20 md:pt-24">
        {children}
      </main>
      <Footer />
    </div>
  );
}


