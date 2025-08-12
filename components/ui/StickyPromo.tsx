'use client';

import React from 'react';
import { Percent, Phone } from 'lucide-react';
import { useAmoCRM } from '@/components/providers/AmoCRMProvider';

interface StickyPromoProps {
  enabled?: boolean;
}

export default function StickyPromo({ enabled = true }: StickyPromoProps) {
  const { openModal } = useAmoCRM();
  if (!enabled) return null;
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 px-4 w-full max-w-xl">
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-pink-50 p-3 shadow-lg">
        <div className="flex items-center gap-2 text-amber-800">
          <Percent className="w-5 h-5" />
          <span className="text-sm font-semibold">Скидка −10% на первый заказ — только сегодня</span>
        </div>
        <button
          onClick={openModal}
          className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-primary-700"
        >
          <Phone className="w-4 h-4" />
          Перезвонить за 5 мин
        </button>
      </div>
    </div>
  );
}


