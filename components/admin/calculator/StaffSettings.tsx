'use client';

import React from 'react';

export default function StaffSettings() {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Сотрудники
      </label>
      <div className="space-y-3">
        <div className="p-4 rounded-lg border-2 border-primary-600 bg-primary-50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <input type="radio" checked className="text-primary-600" />
              <span className="font-medium">Уборщица (фрилансер)</span>
            </div>
            <div className="text-sm text-gray-600">20 м²/час</div>
          </div>
          <div className="text-sm text-gray-600">
            Стоимость: 500 ₽/час
          </div>
        </div>
      </div>
    </div>
  );
}