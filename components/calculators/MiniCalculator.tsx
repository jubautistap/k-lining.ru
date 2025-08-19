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
  const [areaText, setAreaText] = useState<string>(String(defaultArea));
  const [windowsText, setWindowsText] = useState<string>(windowsCount > 0 ? String(windowsCount) : '');
  const quote = useMemo(() => calculateQuote({ area, propertyType, cleaningType, windowsCount: windows }), [area, propertyType, cleaningType, windows]);

  useEffect(() => {
    setArea(defaultArea);
    setWindows(windowsCount);
    setAreaText(String(defaultArea));
    setWindowsText(windowsCount > 0 ? String(windowsCount) : '');
  }, [defaultArea, windowsCount]);

  return (
    <div className={`rounded-2xl bg-white/90 backdrop-blur p-4 text-gray-900 shadow-xl ${className || ''}`}>
      <div className="text-sm text-gray-500 mb-2">Быстрый расчёт</div>
      <div className="flex items-end gap-3">
        <div className="flex-1">
          <label className="block text-xs text-gray-600 mb-1">Площадь, м²</label>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={areaText}
            onChange={(e) => {
              const digits = e.target.value.replace(/[^\d]/g, '');
              setAreaText(digits);
            }}
            onBlur={() => {
              const raw = areaText.replace(/[^\d]/g, '');
              const parsed = raw ? parseInt(raw, 10) : NaN;
              const clamped = Math.max(15, Math.min(500, isNaN(parsed) ? defaultArea : parsed));
              setArea(clamped);
              setAreaText(String(clamped));
            }}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500"
            placeholder="50"
          />
        </div>
        {cleaningType === 'postRenovation' || cleaningType === 'general' ? (
          <div>
            <label className="block text-xs text-gray-600 mb-1">Окон, створок</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={windowsText}
              onChange={(e) => {
                const digits = e.target.value.replace(/[^\d]/g, '');
                setWindowsText(digits);
              }}
              onFocus={(e) => { if (windowsText === '0') setWindowsText(''); (e.target as HTMLInputElement).select(); }}
              onBlur={() => {
                const raw = windowsText.replace(/[^\d]/g, '');
                const parsed = raw ? parseInt(raw, 10) : 0;
                const clamped = Math.max(0, Math.min(200, parsed));
                setWindows(clamped);
                setWindowsText(clamped === 0 ? '' : String(clamped));
              }}
              className="w-24 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500"
              placeholder="0"
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


