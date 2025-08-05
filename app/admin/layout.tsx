'use client';

import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/layout/AdminLayout';

export default function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

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

  // Проверяем авторизацию
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/admin/login');
    }
  }, [isAuthenticated, isLoading, router]);

  // Показываем загрузку
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Если не авторизован, не показываем контент
  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <AdminLayout user={user}>{children}</AdminLayout>
      {/* Скрываем react-hot-toast для админки */}
      <style jsx global>{`
        #_rht_toaster {
          display: none !important;
        }
      `}</style>
    </>
  );
} 