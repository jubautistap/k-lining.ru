'use client';

import dynamic from 'next/dynamic';

const SettingsPageContent = dynamic(() => import('./SettingsPageContent'), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
    </div>
  ),
  ssr: false
});

export default function ClientSettingsPage() {
  return <SettingsPageContent />;
}