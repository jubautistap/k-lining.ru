'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { Phone, ArrowRight } from 'lucide-react';
import { useAmoCRM } from '@/components/providers/AmoCRMProvider';
import { calculateQuote, pickRate, MIN_ORDER, type PropertyType, type CleaningType } from './calcUtils';

type MiniCalculatorProps = {
  defaultArea: number;
  propertyType: PropertyType;
  cleaningType: CleaningType;
  windowsCount?: number;
  className?: string;
};

export default function MiniCalculator(props: MiniCalculatorProps) {
  const { defaultArea, propertyType, cleaningType, windowsCount = 0, className } = props;
  const { openModal } = useAmoCRM();
  const [area, setArea] = useState<number>(defaultArea);
  const [windows, setWindows] = useState<number>(windowsCount);
  const quote = useMemo(() => calculateQuote({ area, propertyType, cleaningType, windowsCount: windows }), [area, propertyType, cleaningType, windows]);

  useEffect(() => {
    setArea(defaultArea);
    setWindows(windowsCount);
  }, [defaultArea, windowsCount]);

  return (
    <div className={`rounded-2xl bg-white/90 backdrop-blur p-4 text-gray-900 shadow-xl ${className || ''}`}>
      <div className="text-sm text-gray-500 mb-2">Быстрый расчёт</div>
      <div className="flex items-end gap-3">
        <div className="flex-1">
          <label className="block text-xs text-gray-600 mb-1">Площадь, м²</label>
          <input
            type="number"
            min={15}
            max={500}
            value={area}
            onChange={(e) => setArea(Math.max(15, Math.min(500, parseInt(e.target.value) || 15)))}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {cleaningType === 'postRenovation' || cleaningType === 'general' ? (
          <div>
            <label className="block text-xs text-gray-600 mb-1">Окон, створок</label>
            <input
              type="number"
              min={0}
              max={200}
              value={windows}
              onChange={(e) => setWindows(Math.max(0, Math.min(200, parseInt(e.target.value) || 0)))}
              className="w-24 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ) : null}
        <div className="text-right ml-auto">
          <div className="text-xs text-gray-500">Итого</div>
          <div className="text-2xl font-bold">{quote.totalPrice.toLocaleString()} ₽</div>
          <div className="text-[11px] text-gray-500">мин. заказ {MIN_ORDER.toLocaleString()} ₽</div>
        </div>
      </div>
      <button
        onClick={openModal}
        className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 text-white py-3 font-semibold hover:bg-blue-700"
        type="button"
      >
        <Phone className="w-4 h-4" /> Заказать сейчас <ArrowRight className="w-4 h-4" />
      </button>
      <div className="text-[11px] text-gray-500 mt-1">Цена предварительная, без учёта сложности</div>
    </div>
  );
}


