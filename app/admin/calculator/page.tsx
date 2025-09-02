'use client';

import dynamic from 'next/dynamic';

const CalculatorPageContent = dynamic(() => import('./CalculatorPageContent'), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
    </div>
  ),
  ssr: false
});

export default function ClientCalculatorPage() {
  return <CalculatorPageContent />;
}