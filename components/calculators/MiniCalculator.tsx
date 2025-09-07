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
    <div className={`rounded-2xl bg-gradient-to-br from-white to-primary-50 border-2 border-primary-100 p-6 text-gray-900 shadow-2xl ${className || ''}`}>
      {/* Header */}
      <div className="text-center mb-4">
        <div className="text-lg font-bold text-primary-700 mb-1">Узнайте стоимость за 30 секунд</div>
        <div className="text-sm text-gray-600">Без звонков и долгих расчётов</div>
      </div>

      {/* Calculator */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            🏠 Площадь помещения
          </label>
          <div className="relative">
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
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-200 text-lg font-semibold text-center"
              placeholder="50"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">м²</span>
          </div>
        </div>
        
        {cleaningType === 'postRenovation' || cleaningType === 'general' ? (
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🪟 Количество окон
            </label>
            <div className="relative">
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
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-200 text-lg font-semibold text-center"
                placeholder="0"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">шт</span>
            </div>
          </div>
        ) : null}
        
        <div className="md:col-span-1 flex flex-col justify-center">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-4 text-center">
            <div className="text-sm opacity-90 mb-1">Стоимость работ</div>
            <div className="text-3xl font-bold">{quote.totalPrice.toLocaleString()} ₽</div>
            <div className="text-xs opacity-80">минимум {MIN_ORDER.toLocaleString()} ₽</div>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-3 gap-2 mb-4 text-xs text-center">
        <div className="bg-white/60 rounded-lg p-2">
          <div className="text-green-600 font-semibold">✓ Без доплат</div>
          <div className="text-gray-600">Фиксированная цена</div>
        </div>
        <div className="bg-white/60 rounded-lg p-2">
          <div className="text-green-600 font-semibold">✓ За 2 часа</div>
          <div className="text-gray-600">Быстрый выезд</div>
        </div>
        <div className="bg-white/60 rounded-lg p-2">
          <div className="text-green-600 font-semibold">✓ Гарантия</div>
          <div className="text-gray-600">30 дней</div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="space-y-3">
        <button
          onClick={openModal}
          className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-primary-700 hover:to-primary-800 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          type="button"
          aria-label="Заказать уборку сейчас"
        >
          <Phone className="w-5 h-5" /> 
          Заказать уборку сейчас
          <ArrowRight className="w-5 h-5" />
        </button>
        
        <button
          onClick={openModal}
          className="w-full bg-white border-2 border-primary-300 text-primary-700 py-3 px-6 rounded-xl font-semibold hover:bg-primary-50 transition-colors flex items-center justify-center gap-2"
          type="button"
          aria-label="Уточнить детали по WhatsApp"
        >
          💬 Уточнить детали по WhatsApp
        </button>
      </div>

      <div className="text-center mt-3">
        <div className="text-xs text-gray-500">
          * Окончательную цену озвучим после осмотра объекта
        </div>
        <div className="text-xs text-primary-600 font-medium">
          🔒 Оплата только после выполнения работ
        </div>
      </div>
    </div>
  );
}


