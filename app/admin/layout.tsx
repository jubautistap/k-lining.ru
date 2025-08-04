'use client';

import { useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';

export default function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
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
    document.title = 'Админ панель - Доступ запрещен';
    
    // Cleanup при размонтировании
    return () => {
      metaTags.forEach(({ name }) => {
        const tag = document.querySelector(`meta[name="${name}"]`);
        if (tag) tag.remove();
      });
    };
  }, []);

  return (
    <>
      <AdminLayout>{children}</AdminLayout>
      {/* Скрываем react-hot-toast для админки */}
      <style jsx global>{`
        #_rht_toaster {
          display: none !important;
        }
      `}</style>
    </>
  );
} 