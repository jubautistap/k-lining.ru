import React from 'react';
import { Home, Building, Sparkles, Shield } from 'lucide-react';
import { PropertyType, CleaningType } from './types';

interface PropertySettingsProps {
  propertyType: PropertyType;
  setPropertyType: (type: PropertyType) => void;
  area: number;
  setArea: (area: number) => void;
  customArea: string;
  setCustomArea: (area: string) => void;
  cleaningType: CleaningType;
  setCleaningType: (type: CleaningType) => void;
  distance: number;
  setDistance: (distance: number) => void;
  windowsCount: number;
  setWindowsCount: (count: number) => void;
  urgent: boolean;
  setUrgent: (urgent: boolean) => void;
  night: boolean;
  setNight: (night: boolean) => void;
  outside: boolean;
  setOutside: (outside: boolean) => void;
}

const propertyTypeOptions = [
  { value: 'apartment' as const, label: 'Квартира', icon: Home },
  { value: 'house' as const, label: 'Дом/Коттедж', icon: Home },
  { value: 'office' as const, label: 'Офис', icon: Building },
  { value: 'commercial' as const, label: 'Коммерческое', icon: Building }
];

const cleaningTypeOptions = [
  { value: 'maintenance' as const, label: 'Поддерживающая' },
  { value: 'general' as const, label: 'Генеральная' },
  { value: 'postRenovation' as const, label: 'После ремонта' },
  { value: 'eco' as const, label: 'Эко-уборка' },
  { value: 'vip' as const, label: 'VIP-уборка' }
];

const areaPresets = [30, 40, 50, 60, 70, 80, 100, 120, 150, 200];

export default function PropertySettings({
  propertyType,
  setPropertyType,
  area,
  setArea,
  customArea,
  setCustomArea,
  cleaningType,
  setCleaningType,
  distance,
  setDistance,
  windowsCount,
  setWindowsCount,
  urgent,
  setUrgent,
  night,
  setNight,
  outside,
  setOutside
}: PropertySettingsProps) {
  const handleAreaChange = (value: string) => {
    setCustomArea(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue > 0) {
      setArea(numValue);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Параметры объекта</h2>
      
      {/* Property Type */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">Тип объекта</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {propertyTypeOptions.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => setPropertyType(value)}
              className={`flex items-center justify-center space-x-2 p-3 rounded-lg border-2 transition-colors ${
                propertyType === value
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Area */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">Площадь (м²)</label>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {areaPresets.map(preset => (
              <button
                key={preset}
                onClick={() => {
                  setArea(preset);
                  setCustomArea(preset.toString());
                }}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  area === preset
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {preset}
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-3">
            <input
              type="number"
              value={customArea}
              onChange={(e) => handleAreaChange(e.target.value)}
              placeholder="Своя площадь"
              min="1"
              max="10000"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <span className="text-sm text-gray-500">м²</span>
          </div>
        </div>
      </div>

      {/* Cleaning Type */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">Тип уборки</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {cleaningTypeOptions.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setCleaningType(value)}
              className={`p-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                cleaningType === value
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Additional Parameters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Distance */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Расстояние (км)</label>
          <input
            type="number"
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
            min="0"
            max="100"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Windows */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Створки окон</label>
          <input
            type="number"
            value={windowsCount}
            onChange={(e) => setWindowsCount(Number(e.target.value))}
            min="0"
            max="100"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Special Modes */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">Особые условия</label>
        <div className="flex flex-wrap gap-3">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={urgent}
              onChange={(e) => setUrgent(e.target.checked)}
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <span className="text-sm text-gray-700">Срочно (+30%)</span>
          </label>
          
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={night}
              onChange={(e) => setNight(e.target.checked)}
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <span className="text-sm text-gray-700">Ночь (+50%)</span>
          </label>
          
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={outside}
              onChange={(e) => setOutside(e.target.checked)}
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <span className="text-sm text-gray-700">Область (+20%)</span>
          </label>
        </div>
      </div>
    </div>
  );
}