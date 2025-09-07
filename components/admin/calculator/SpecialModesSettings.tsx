'use client';

import React from 'react';

interface SpecialModesSettingsProps {
  isNightMode: boolean;
  setIsNightMode: (isNightMode: boolean) => void;
  isEmergencyMode: boolean;
  setIsEmergencyMode: (isEmergencyMode: boolean) => void;
}

export default function SpecialModesSettings({ 
  isNightMode, 
  setIsNightMode, 
  isEmergencyMode, 
  setIsEmergencyMode 
}: SpecialModesSettingsProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Специальные режимы
      </label>
      <div className="space-y-3">
        <label className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-primary-300 cursor-pointer">
          <input
            type="checkbox"
            checked={isNightMode}
            onChange={(e) => setIsNightMode(e.target.checked)}
            className="text-primary-600 rounded"
          />
          <div className="flex-1">
            <div className="font-medium text-gray-900">Ночной режим</div>
            <div className="text-sm text-gray-600">+30% к стоимости (работа с 22:00 до 6:00)</div>
          </div>
        </label>
        
        <label className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-primary-300 cursor-pointer">
          <input
            type="checkbox"
            checked={isEmergencyMode}
            onChange={(e) => setIsEmergencyMode(e.target.checked)}
            className="text-primary-600 rounded"
          />
          <div className="flex-1">
            <div className="font-medium text-gray-900">Экстренный режим</div>
            <div className="text-sm text-gray-600">+50% к стоимости (выезд в течение 1-2 часов)</div>
          </div>
        </label>
      </div>
    </div>
  );
}