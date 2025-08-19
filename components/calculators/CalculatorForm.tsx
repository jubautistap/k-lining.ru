'use client';

import React from 'react';
import { Home, Building, Store, Calculator, Zap, Moon, Move } from 'lucide-react';

interface CalculatorFormProps {
  propertyType: 'apartment' | 'house' | 'office' | 'commercial';
  setPropertyType: (type: 'apartment' | 'house' | 'office' | 'commercial') => void;
  area: number;
  setArea: (area: number) => void;
  customArea: string;
  setCustomArea: (area: string) => void;
  cleaningType: 'maintenance' | 'general' | 'postRenovation' | 'eco' | 'vip';
  setCleaningType: (type: 'maintenance' | 'general' | 'postRenovation' | 'eco' | 'vip') => void;
  windowsCount?: number;
  setWindowsCount?: (count: number) => void;
  urgent?: boolean;
  setUrgent?: (v: boolean) => void;
  night?: boolean;
  setNight?: (v: boolean) => void;
  outside?: boolean;
  setOutside?: (v: boolean) => void;
}

const propertyTypes = [
  { id: 'apartment', name: 'Квартира', icon: Home, description: 'Стандартная уборка' },
  { id: 'house', name: 'Дом', icon: Building, description: 'Частный дом' },
  { id: 'office', name: 'Офис', icon: Building, description: 'Рабочее помещение' },
  { id: 'commercial', name: 'Коммерция', icon: Store, description: 'Магазин, салон' }
];

const cleaningTypes = [
  { id: 'maintenance', name: 'Поддерживающая', description: 'Регулярная уборка' },
  { id: 'general', name: 'Генеральная', description: 'Тщательная уборка' },
  { id: 'postRenovation', name: 'После ремонта', description: 'Уборка строительной пыли' },
  { id: 'eco', name: 'Эко уборка', description: 'Экологичные средства' },
  { id: 'vip', name: 'VIP уборка', description: 'Премиум сервис' }
];

export default function CalculatorForm({
  propertyType,
  setPropertyType,
  area,
  setArea,
  customArea,
  setCustomArea,
  cleaningType,
  setCleaningType,
  windowsCount = 0,
  setWindowsCount,
  urgent = false,
  setUrgent,
  night = false,
  setNight,
  outside = false,
  setOutside
}: CalculatorFormProps) {
  const handleAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomArea(value);
    
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue > 0) {
      setArea(numValue);
    }
  };

  const presetAreas = [30, 50, 70, 100, 150, 200];

  return (
    <div className="space-y-8">
      {/* Тип недвижимости */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Тип недвижимости</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {propertyTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => setPropertyType(type.id as any)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 text-left hover:shadow-sm ${
                  propertyType === type.id
                    ? 'border-primary-600 bg-primary-50 text-primary-700 ring-2 ring-primary-100'
                    : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-base text-gray-900 leading-tight break-words">{type.name}</div>
                    <div className="text-xs text-gray-500 leading-snug break-words mt-0.5">{type.description}</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Площадь */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Площадь помещения (м²)</h3>
        
        {/* Быстрый выбор */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-4">
          {presetAreas.map((presetArea) => (
            <button
              key={presetArea}
              onClick={() => {
                setArea(presetArea);
                setCustomArea(presetArea.toString());
              }}
              className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                area === presetArea
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {presetArea}
            </button>
          ))}
        </div>

        {/* Кастомный ввод */}
        <div>
          <div className="relative flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                const current = parseInt(customArea) || area;
                const next = Math.max(1, Math.min(1000, current - 5));
                setArea(next);
                setCustomArea(String(next));
              }}
              className="px-3 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50"
            >
              −5
            </button>
            <div className="relative flex-1">
              <Calculator className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="number"
                value={customArea}
                onChange={handleAreaChange}
                placeholder="Введите площадь"
                min="1"
                max="1000"
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">м²</span>
            </div>
            <button
              type="button"
              onClick={() => {
                const current = parseInt(customArea) || area;
                const next = Math.max(1, Math.min(1000, current + 5));
                setArea(next);
                setCustomArea(String(next));
              }}
              className="px-3 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50"
            >
              +5
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Текущая площадь: <span className="font-medium">{area} м²</span>
          </p>
        </div>
      </div>

      {/* Тип уборки */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Тип уборки</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {cleaningTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setCleaningType(type.id as any)}
              className={`p-4 rounded-xl border-2 transition-all duration-200 text-left hover:shadow-sm ${
                cleaningType === type.id
                  ? 'border-primary-600 bg-primary-50 text-primary-700 ring-2 ring-primary-100'
                  : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
              }`}
            >
              <div className="font-medium leading-snug break-words">{type.name}</div>
              <div className="text-sm text-gray-500 leading-snug break-words">{type.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Окна (для некоторых типов уборки) */}
      {(cleaningType === 'general' || cleaningType === 'postRenovation') && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Количество окон (створок)</h3>
          <input
            type="number"
            min={0}
            max={200}
            value={windowsCount}
            onChange={(e) => setWindowsCount && setWindowsCount(Math.max(0, Math.min(200, parseInt(e.target.value) || 0)))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">Стоимость за створку учитывается автоматически.</p>
        </div>
      )}

      {/* Надбавки */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Надбавки</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <label className="flex items-center space-x-3 p-3 rounded-xl border-2 border-gray-200 hover:border-primary-300 cursor-pointer transition-colors">
            <input type="checkbox" checked={urgent} onChange={(e) => setUrgent && setUrgent(e.target.checked)} className="text-primary-600 rounded" />
            <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
              <Zap className="w-4 h-4 text-orange-600" />
            </div>
            <div>
              <div className="font-medium">Срочно</div>
              <div className="text-xs text-gray-500">+20%</div>
            </div>
          </label>
          <label className="flex items-center space-x-3 p-3 rounded-xl border-2 border-gray-200 hover:border-primary-300 cursor-pointer transition-colors">
            <input type="checkbox" checked={night} onChange={(e) => setNight && setNight(e.target.checked)} className="text-primary-600 rounded" />
            <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
              <Moon className="w-4 h-4 text-indigo-600" />
            </div>
            <div>
              <div className="font-medium">Ночь</div>
              <div className="text-xs text-gray-500">+15%</div>
            </div>
          </label>
          <label className="flex items-center space-x-3 p-3 rounded-xl border-2 border-gray-200 hover:border-primary-300 cursor-pointer transition-colors">
            <input type="checkbox" checked={outside} onChange={(e) => setOutside && setOutside(e.target.checked)} className="text-primary-600 rounded" />
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
              <Move className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <div className="font-medium">Сложный доступ</div>
              <div className="text-xs text-gray-500">+15%</div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
