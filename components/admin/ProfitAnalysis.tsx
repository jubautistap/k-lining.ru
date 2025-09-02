import React from 'react';
import { TrendingUp, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { CalculationResult } from './types';

interface ProfitAnalysisProps {
  result: CalculationResult | null;
}

export default function ProfitAnalysis({ result }: ProfitAnalysisProps) {
  if (!result) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Анализ прибыли</h2>
        <div className="text-center py-8 text-gray-500">
          Выберите параметры для расчета
        </div>
      </div>
    );
  }

  const profitability = result.margins.marginPercentage;
  const getProfitabilityStatus = () => {
    if (profitability >= 30) return { status: 'excellent', color: 'green', icon: CheckCircle };
    if (profitability >= 20) return { status: 'good', color: 'blue', icon: Info };
    if (profitability >= 10) return { status: 'acceptable', color: 'yellow', icon: AlertCircle };
    return { status: 'poor', color: 'red', icon: AlertCircle };
  };

  const { status, color, icon: StatusIcon } = getProfitabilityStatus();

  const getStatusText = () => {
    switch (status) {
      case 'excellent': return 'Отличная прибыльность';
      case 'good': return 'Хорошая прибыльность';
      case 'acceptable': return 'Приемлемая прибыльность';
      case 'poor': return 'Низкая прибыльность';
      default: return 'Неизвестно';
    }
  };

  const getColorClasses = (colorName: string) => {
    const colors = {
      green: 'bg-green-100 text-green-800 border-green-200',
      blue: 'bg-blue-100 text-blue-800 border-blue-200',
      yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      red: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[colorName as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <TrendingUp className="w-6 h-6 text-primary-600" />
        <h2 className="text-xl font-semibold text-gray-900">Анализ прибыли</h2>
      </div>

      {/* Profitability Status */}
      <div className={`border rounded-lg p-4 mb-6 ${getColorClasses(color)}`}>
        <div className="flex items-center space-x-3">
          <StatusIcon className="w-6 h-6" />
          <div>
            <h3 className="font-semibold text-lg">{getStatusText()}</h3>
            <p className="text-sm opacity-80">
              Маржинальность: {profitability.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      {/* Profit Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="border border-gray-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600 mb-1">
            {result.costs.profit.toLocaleString()} ₽
          </div>
          <div className="text-sm text-gray-600">Валовая прибыль</div>
        </div>

        <div className="border border-gray-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600 mb-1">
            {result.margins.netMargin.toLocaleString()} ₽
          </div>
          <div className="text-sm text-gray-600">Чистая прибыль</div>
        </div>

        <div className="border border-gray-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-primary-600 mb-1">
            {profitability.toFixed(1)}%
          </div>
          <div className="text-sm text-gray-600">Маржинальность</div>
        </div>
      </div>

      {/* Comparison */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-3">Сравнение с публичной ценой</h4>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Наша себестоимость:</span>
            <span className="font-medium">{result.costs.totalCost.toLocaleString()} ₽</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Цена клиенту:</span>
            <span className="font-medium text-primary-600">{result.totalPrice.toLocaleString()} ₽</span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t">
            <span className="text-gray-900 font-medium">Прибыль:</span>
            <span className="font-bold text-green-600">
              {result.costs.profit.toLocaleString()} ₽ ({profitability.toFixed(1)}%)
            </span>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="mt-6">
        <h4 className="font-medium text-gray-900 mb-3">Рекомендации</h4>
        <div className="space-y-2 text-sm">
          {profitability < 15 && (
            <div className="flex items-start space-x-2 text-red-700">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>Низкая маржинальность. Рассмотрите повышение цены или оптимизацию затрат.</span>
            </div>
          )}
          
          {profitability >= 15 && profitability < 25 && (
            <div className="flex items-start space-x-2 text-yellow-700">
              <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>Приемлемая маржинальность. Можно оптимизировать процессы для увеличения прибыли.</span>
            </div>
          )}
          
          {profitability >= 25 && (
            <div className="flex items-start space-x-2 text-green-700">
              <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>Отличная маржинальность. Заказ выгоден для компании.</span>
            </div>
          )}

          {result.team.overtimeHours > 0 && (
            <div className="flex items-start space-x-2 text-blue-700">
              <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>
                Есть сверхурочные часы ({result.team.overtimeHours}ч). 
                Рассмотрите привлечение дополнительных сотрудников.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}