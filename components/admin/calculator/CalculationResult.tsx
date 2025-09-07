'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CalculationResultProps {
  result: {
    basePrice: number;
    additionalServices: number;
    totalPrice: number;
    duration: string;
    services: string[];
    profit: number;
    costs: number;
    margin: number;
  } | null;
  area: number;
  isNightMode: boolean;
  isEmergencyMode: boolean;
  additionalServicesList: any[];
}

export default function CalculationResult({ 
  result, 
  area, 
  isNightMode, 
  isEmergencyMode, 
  additionalServicesList 
}: CalculationResultProps) {
  if (!result) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">
          Результат расчета
        </h4>
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-900">
                {result.services[0]}
              </span>
              <span className="text-lg font-bold text-primary-600">
                {result.basePrice.toLocaleString()} ₽
              </span>
            </div>
            <div className="text-sm text-gray-600">
              Площадь: {area} м² • Время: {result.duration}
            </div>
            {(isNightMode || isEmergencyMode) && (
              <div className="mt-2 text-xs text-gray-500">
                {isNightMode && <div>🌙 Ночной режим (+30%)</div>}
                {isEmergencyMode && <div>⚡ Экстренный режим (+50%)</div>}
              </div>
            )}
          </div>

          {result.services.slice(1).map((service, index) => (
            <div key={index} className="bg-white rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">{service}</span>
                <span className="text-lg font-bold text-primary-600">
                  {additionalServicesList.find(s => s.name === service)?.price.toLocaleString()} ₽
                </span>
              </div>
            </div>
          ))}

          <div className="bg-primary-600 text-white rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">Итого:</span>
              <span className="text-2xl font-bold">
                {result.totalPrice.toLocaleString()} ₽
              </span>
            </div>
            <div className="text-sm opacity-90 mt-1">
              Время работы: {result.duration}
            </div>
            {result.totalPrice === 6000 && (
              <div className="text-xs opacity-90 mt-1">
                * Минимальная стоимость заказа
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}