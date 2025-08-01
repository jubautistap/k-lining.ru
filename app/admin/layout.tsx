'use client';

import AdminLayout from '@/components/layout/AdminLayout';

export default function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
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