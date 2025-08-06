'use client';

import React, { useState, useEffect } from 'react';
import { AuthProvider } from './AuthProvider';
import AmoCRMProvider from './AmoCRMProvider';
import AmoCRMModal from '@/components/modals/AmoCRMModal';
import { Toaster } from 'react-hot-toast';

interface LazyProvidersProps {
  children: React.ReactNode;
}

export default function LazyProviders({ children }: LazyProvidersProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // На сервере и клиенте всегда рендерим провайдеры
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
} 