import React from 'react';
import { DollarSign, Users, Package, Truck, TrendingUp } from 'lucide-react';
import { CalculationResult } from './types';

interface CostBreakdownProps {
  result: CalculationResult | null;
}

export default function CostBreakdown({ result }: CostBreakdownProps) {
  if (!result) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Структура затрат</h2>
        <div className="text-center py-8 text-gray-500">
          Выберите параметры для расчета
        </div>
      </div>
    );
  }

  const costItems = [
    {
      label: 'Труд',
      value: result.costs.labor,
      icon: Users,
      color: 'blue',
      details: `${result.team.employeesCount} сотр. × ${result.team.totalHours} ч`
    },
    {
      label: 'Материалы',
      value: result.costs.materials,
      icon: Package,
      color: 'green',
      details: 'Расходники'
    },
    {
      label: 'Транспорт',
      value: result.costs.transport,
      icon: Truck,
      color: 'yellow',
      details: 'Туда-обратно'
    },
    {
      label: 'Накладные',
      value: result.costs.overhead,
      icon: TrendingUp,
      color: 'purple',
      details: '15% от труда'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-700',
      green: 'bg-green-100 text-green-700',
      yellow: 'bg-yellow-100 text-yellow-700',
      purple: 'bg-purple-100 text-purple-700',
      red: 'bg-red-100 text-red-700'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <DollarSign className="w-6 h-6 text-primary-600" />
        <h2 className="text-xl font-semibold text-gray-900">Структура затрат</h2>
      </div>

      {/* Cost Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {costItems.map(({ label, value, icon: Icon, color, details }) => (
          <div key={label} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className={`p-2 rounded-lg ${getColorClasses(color)}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="font-medium text-gray-900">{label}</span>
              </div>
              <span className="font-bold text-gray-900">
                {value.toLocaleString()} ₽
              </span>
            </div>
            <p className="text-sm text-gray-600">{details}</p>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium text-gray-700">Общие затраты:</span>
          <span className="text-xl font-bold text-gray-900">
            {result.costs.totalCost.toLocaleString()} ₽
          </span>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <span className="font-medium text-gray-700">Цена клиенту:</span>
          <span className="text-xl font-bold text-primary-600">
            {result.totalPrice.toLocaleString()} ₽
          </span>
        </div>

        {/* Team Details */}
        <div className="bg-gray-50 rounded-lg p-4 mt-4">
          <h4 className="font-medium text-gray-900 mb-2">Детали по персоналу</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Сотрудников:</span>
              <span className="ml-2 font-medium">{result.team.employeesCount}</span>
            </div>
            <div>
              <span className="text-gray-600">Общее время:</span>
              <span className="ml-2 font-medium">{result.team.totalHours}ч</span>
            </div>
            <div>
              <span className="text-gray-600">Обычные часы:</span>
              <span className="ml-2 font-medium">{result.team.regularHours}ч</span>
            </div>
            <div>
              <span className="text-gray-600">Сверхурочные:</span>
              <span className="ml-2 font-medium">{result.team.overtimeHours}ч</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}