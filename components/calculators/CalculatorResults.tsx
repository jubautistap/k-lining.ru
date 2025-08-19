'use client';

import React from 'react';
import { Phone, MessageCircle, Calculator, RotateCcw } from 'lucide-react';
import { createLeadBeforeRedirect } from '@/utils';
import { useAmoCRM } from '../providers/AmoCRMProvider';

interface CalculationResult {
  basePrice: number;
  additionalServices: number;
  totalPrice: number;
  duration: string;
  services: string[];
}

interface CalculatorResultsProps {
  result: CalculationResult | null;
  breakdown: {
    base: number;
    windows: number;
    extrasFactor: number;
    discountFactor: number;
  } | null;
  onReset: () => void;
  animatedTotal: number;
}

export default function CalculatorResults({
  result,
  breakdown,
  onReset,
  animatedTotal
}: CalculatorResultsProps) {
  const { openModal } = useAmoCRM();

  if (!result) return null;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-6 border border-primary-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Результат расчета
        </h3>

        {/* Основная цена */}
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-white rounded-lg border border-primary-200">
            <span className="text-gray-700 font-medium">Базовая стоимость:</span>
            <span className="text-xl font-bold text-primary-600">
              {result.basePrice.toLocaleString()} ₽
            </span>
          </div>

          {/* Дополнительные услуги */}
          {result.additionalServices > 0 && (
            <div className="flex justify-between items-center p-4 bg-white rounded-lg border border-primary-200">
              <span className="text-gray-700 font-medium">Дополнительные услуги:</span>
              <span className="text-xl font-bold text-green-600">
                +{result.additionalServices.toLocaleString()} ₽
              </span>
            </div>
          )}

          {/* Итоговая цена */}
          <div className="p-4 bg-white rounded-lg border border-primary-200">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-medium">Итого к оплате:</span>
              <span className="text-3xl font-extrabold text-primary-700">
                {animatedTotal.toLocaleString()} ₽
              </span>
            </div>
          </div>
        </div>

        {/* Детализация */}
        {breakdown && (
          <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3">Детализация расчета:</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Базовая ставка:</span>
                <span>{breakdown.base.toLocaleString()} ₽</span>
              </div>
              {breakdown.windows > 0 && (
                <div className="flex justify-between">
                  <span>Окна:</span>
                  <span>+{breakdown.windows.toLocaleString()} ₽</span>
                </div>
              )}
              {breakdown.windows > 0 && (
                <div className="flex justify-between">
                  <span>Окна:</span>
                  <span>+{breakdown.windows.toLocaleString()} ₽</span>
                </div>
              )}
              {breakdown.extrasFactor !== 1 && (
                <div className="flex justify-between">
                  <span>Надбавки:</span>
                  <span>×{breakdown.extrasFactor.toFixed(2)}</span>
                </div>
              )}
              {breakdown.discountFactor !== 1 && (
                <div className="flex justify-between">
                  <span>Скидка:</span>
                  <span>×{breakdown.discountFactor.toFixed(2)}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Время работы */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center space-x-2 text-gray-600">
            <Calculator className="w-5 h-5" />
            <span>Время работы: <strong>{result.duration}</strong></span>
          </div>
        </div>

        {/* Кнопки действий */}
        <div className="mt-8 space-y-3">
          <button
            onClick={openModal}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Заказать уборку
          </button>

          <div className="grid grid-cols-2 gap-3">
            <a
              href="tel:+79255551833"
              className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
            >
              <Phone className="w-4 h-4" />
              <span>Позвонить</span>
            </a>

            <a
              href="https://wa.me/79255551833?text=%D0%A5%D0%BE%D1%87%D1%83%20%D0%BA%D0%BE%D0%BD%D1%81%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%86%D0%B8%D1%8E%20%D0%BF%D0%BE%20%D1%83%D1%81%D0%BB%D1%83%D0%B3%D0%B0%D0%BC%20%D1%83%D0%B1%D0%BE%D1%80%D0%BA%D0%B8"
              target="_blank"
              rel="noopener"
              onClick={() => createLeadBeforeRedirect({ message: 'Переход в WhatsApp из калькулятора' })}
              className="flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>

          <button
            onClick={onReset}
            className="w-full flex items-center justify-center space-x-2 text-gray-600 hover:text-gray-800 font-medium py-3 px-4 rounded-xl border border-gray-300 hover:border-gray-400 transition-colors duration-200"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Пересчитать</span>
          </button>
        </div>
      </div>

      {/* Важная информация */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <h4 className="font-semibold text-amber-800 mb-2">💡 Важно знать</h4>
        <ul className="text-sm text-amber-700 space-y-1">
          <li>• Минимальный заказ: 6,000 ₽</li>
          <li>• Цены зависят от площади и состояния помещения</li>
          <li>• Оплата только после выполнения работ</li>
          <li>• Работаем по договору</li>
        </ul>
      </div>
    </div>
  );
}
