'use client';

import React from 'react';
import { AuthProvider } from './AuthProvider';
import AmoCRMProvider from './AmoCRMProvider';
import AmoCRMModal from '@/components/modals/AmoCRMModal';
import { usePathname } from 'next/navigation';
import { Toaster } from 'react-hot-toast';

interface LazyProvidersProps {
  children: React.ReactNode;
}

export default function LazyProviders({ children }: LazyProvidersProps) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  return (
    <AuthProvider>
      {isAdmin ? (
        <>
          {children}
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: { background: '#363636', color: '#fff' },
            }}
          />
        </>
      ) : (
        <AmoCRMProvider>
          {children}
          <AmoCRMModal />
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </AmoCRMProvider>
      )}
    </AuthProvider>
  );
} 