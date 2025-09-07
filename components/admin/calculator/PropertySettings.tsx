'use client';

import React from 'react';
import { Home, Building, Store } from 'lucide-react';

interface PropertySettingsProps {
  propertyType: 'apartment' | 'house' | 'office' | 'commercial';
  setPropertyType: (type: 'apartment' | 'house' | 'office' | 'commercial') => void;
  area: number;
  setArea: (area: number) => void;
  customArea: string;
  setCustomArea: (area: string) => void;
}

export default function PropertySettings({ 
  propertyType, 
  setPropertyType, 
  area, 
  setArea, 
  customArea, 
  setCustomArea 
}: PropertySettingsProps) {
  const handleAreaChange = (value: string) => {
    setCustomArea(value);
    const numValue = parseInt(value) || 0;
    if (numValue > 0 && numValue <= 5000) {
      setArea(numValue);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Тип помещения
        </label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { id: 'apartment', name: 'Квартира', icon: Home },
            { id: 'house', name: 'Дом', icon: Building },
            { id: 'office', name: 'Офис', icon: Building },
            { id: 'commercial', name: 'Коммерческое', icon: Store }
          ].map((type) => (
            <button
              key={type.id}
              onClick={() => setPropertyType(type.id as any)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                propertyType === type.id
                  ? 'border-primary-600 bg-primary-50 text-primary-700'
                  : 'border-gray-200 hover:border-primary-300'
              }`}
            >
              <type.icon className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm font-medium">{type.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Площадь помещения
        </label>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2">
            {[50, 100, 200].map((size) => (
              <button
                key={size}
                onClick={() => {
                  setArea(size);
                  setCustomArea(size.toString());
                }}
                className={`p-2 rounded-lg border-2 transition-all duration-200 text-sm ${
                  area === size
                    ? 'border-primary-600 bg-primary-50 text-primary-700'
                    : 'border-gray-200 hover:border-primary-300'
                }`}
              >
                {size} м²
              </button>
            ))}
          </div>
          
          <div>
            <label className="block text-xs text-gray-600 mb-2">
              Или введите точную площадь:
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                min="1"
                max="5000"
                value={customArea}
                onChange={(e) => handleAreaChange(e.target.value)}
                placeholder="Например: 150"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              />
              <span className="text-sm text-gray-500">м²</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Максимум: 5,000 м²
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}