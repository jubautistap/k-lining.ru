'use client';

import React from 'react';
import { TrendingUp } from 'lucide-react';

interface FinancialAnalysisProps {
  result: {
    totalPrice: number;
    costs: number;
    profit: number;
    margin: number;
    basePrice: number;
  } | null;
}

export default function FinancialAnalysis({ result }: FinancialAnalysisProps) {
  if (!result) return null;

  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6">
      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <TrendingUp className="w-5 h-5 mr-2" />
        Финансовый анализ
      </h4>
      <div className="space-y-4">
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-900">Выручка:</span>
            <span className="text-lg font-bold text-green-600">{result.totalPrice.toLocaleString()} ₽</span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-900">Затраты:</span>
            <span className="text-lg font-bold text-red-600">{result.costs.toLocaleString()} ₽</span>
          </div>
          <div className="text-sm text-gray-600 space-y-1">
            <div>• Зарплата: {Math.ceil(result.basePrice * 0.4).toLocaleString()} ₽</div>
            <div>• Материалы: {Math.ceil(result.basePrice * 0.15).toLocaleString()} ₽</div>
            <div>• Накладные: {Math.ceil(result.basePrice * 0.1).toLocaleString()} ₽</div>
          </div>
        </div>

        <div className="bg-green-600 text-white rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">Прибыль:</span>
            <span className="text-2xl font-bold">
              {result.profit.toLocaleString()} ₽
            </span>
          </div>
          <div className="text-sm opacity-90 mt-1">
            Маржинальность: {result.margin}%
          </div>
        </div>
      </div>
    </div>
  );
}