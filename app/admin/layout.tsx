'use client';

import { useEffect } from 'react';
import { useAuthContext } from '@/components/providers/AuthProvider';
import { useRouter, usePathname } from 'next/navigation';
import AdminLayout from '@/components/layout/AdminLayout';

export default function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading, user } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();

  // Режим админки: скрываем публичный Header/Footer, убираем внешний layout
  // Это wrapper, он рендерит только AdminLayout без публичных частей

  useEffect(() => {
    // КРИТИЧНО: Динамически добавляем meta теги для запрета индексации
    const metaTags = [
      { name: 'robots', content: 'noindex, nofollow, noarchive, nosnippet, noimageindex' },
      { name: 'googlebot', content: 'noindex, nofollow, noarchive, nosnippet, noimageindex' },
      { name: 'yandex', content: 'noindex, nofollow, noarchive, nosnippet, noimageindex' }
    ];
    
    metaTags.forEach(({ name, content }) => {
      // Удаляем существующий meta тег если есть
      const existingTag = document.querySelector(`meta[name="${name}"]`);
      if (existingTag) {
        existingTag.remove();
      }
      
      // Добавляем новый meta тег
      const meta = document.createElement('meta');
      meta.name = name;
      meta.content = content;
      document.head.appendChild(meta);
    });
    
    // Меняем title
    document.title = 'Админ панель - K-lining Pro';
    
    // Cleanup при размонтировании
    return () => {
      metaTags.forEach(({ name }) => {
        const tag = document.querySelector(`meta[name="${name}"]`);
        if (tag) tag.remove();
      });
    };
  }, []);

  // Проверяем авторизацию, но не на странице логина
  useEffect(() => {
    if (!isLoading && !isAuthenticated && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [isAuthenticated, isLoading, router, pathname]);

  // Показываем загрузку
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Если не авторизован и не на странице логина, не показываем контент
  if (!isAuthenticated && pathname !== '/admin/login') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Перенаправление на страницу входа...</p>
        </div>
      </div>
    );
  }

  // Если на странице логина, показываем контент без AdminLayout
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div id="__admin_root" className="lg:overflow-x-hidden">
      <AdminLayout user={user || undefined}>{children}</AdminLayout>
      {/* Скрываем react-hot-toast для админки и убираем любые верхние отступы */}
      <style jsx global>{`
        /* Стабилизируем раскладку ТОЛЬКО на страницах админки */
        html, body { margin: 0 !important; padding: 0 !important; }
        html, body { scroll-behavior: auto !important; }
        html { overflow-anchor: none; }
        #__admin_root { display: flex; flex-direction: column; min-height: 100vh; }
        #__admin_root > * { flex: 0 0 auto; }
        #_rht_toaster { display: none !important; }
        /* На всякий случай обнуляем верхние отступы в админке */
        #__admin_root main { padding-top: 0 !important; margin-top: 0 !important; }
        #__admin_root [class*="pt-"] { padding-top: 0 !important; }
        /* Снимаем margin-top у первого блока контента на страницах админки */
        #__admin_root main > *:first-child { margin-top: 0 !important; }
        #__admin_root main > * { scroll-margin-top: 0 !important; }
        /* На десктопе исключаем липкий хедер для предотвращения скачка */
        @media (min-width: 1024px) {
          #__admin_root header.sticky { position: static !important; }
        }
      `}</style>
    </div>
  );
} 