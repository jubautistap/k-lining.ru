'use client';

import React from 'react';
import { Home, Building, Store, Calculator } from 'lucide-react';

interface CalculatorFormProps {
  propertyType: 'apartment' | 'house' | 'office' | 'commercial';
  setPropertyType: (type: 'apartment' | 'house' | 'office' | 'commercial') => void;
  area: number;
  setArea: (area: number) => void;
  customArea: string;
  setCustomArea: (area: string) => void;
  cleaningType: 'maintenance' | 'general' | 'postRenovation' | 'eco' | 'vip';
  setCleaningType: (type: 'maintenance' | 'general' | 'postRenovation' | 'eco' | 'vip') => void;
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
  setCleaningType
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
    <div className="space-y-6">
      {/* Тип недвижимости */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Тип недвижимости</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {propertyTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => setPropertyType(type.id as any)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                  propertyType === type.id
                    ? 'border-primary-600 bg-primary-50 text-primary-700'
                    : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
                }`}
              >
                <Icon className="w-6 h-6 mb-2 text-primary-600" />
                <div className="font-medium text-sm">{type.name}</div>
                <div className="text-xs text-gray-500">{type.description}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Площадь */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Площадь помещения (м²)</h3>
        
        {/* Быстрый выбор */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-4">
          {presetAreas.map((presetArea) => (
            <button
              key={presetArea}
              onClick={() => {
                setArea(presetArea);
                setCustomArea(presetArea.toString());
              }}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
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
        <div className="relative">
          <Calculator className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="number"
            value={customArea}
            onChange={handleAreaChange}
            placeholder="Введите площадь"
            min="1"
            max="1000"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        
        <p className="text-sm text-gray-500 mt-2">
          Текущая площадь: <span className="font-medium">{area} м²</span>
        </p>
      </div>

      {/* Тип уборки */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Тип уборки</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {cleaningTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setCleaningType(type.id as any)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                cleaningType === type.id
                  ? 'border-primary-600 bg-primary-50 text-primary-700'
                  : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
              }`}
            >
              <div className="font-medium">{type.name}</div>
              <div className="text-sm text-gray-500">{type.description}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
