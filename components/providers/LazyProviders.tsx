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
  const [shouldLoadProviders, setShouldLoadProviders] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Загружаем провайдеры только после LCP на клиенте
    const timer = setTimeout(() => {
      setShouldLoadProviders(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // На сервере всегда рендерим провайдеры
  if (!isClient) {
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

  // На клиенте загружаем провайдеры с задержкой
  if (!shouldLoadProviders) {
    return <>{children}</>;
  }

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