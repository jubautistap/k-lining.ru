import React, { useState } from 'react';
import { Download, Send, FileText, DollarSign } from 'lucide-react';
import { CalculationResult } from './types';

interface ExportToolsProps {
  result: CalculationResult | null;
  showExportModal: boolean;
  setShowExportModal: (show: boolean) => void;
  orderLeadId: string;
  setOrderLeadId: (id: string) => void;
  orderNotes: string;
  setOrderNotes: (notes: string) => void;
  parameters: {
    propertyType: string;
    area: number;
    cleaningType: string;
    additionalServices: string[];
    distance: number;
    selectedEmployee: any;
  };
}

export default function ExportTools({
  result,
  showExportModal,
  setShowExportModal,
  orderLeadId,
  setOrderLeadId,
  orderNotes,
  setOrderNotes,
  parameters
}: ExportToolsProps) {
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);

  const downloadJSON = () => {
    if (!result) return;
    
    const data = {
      timestamp: new Date().toISOString(),
      calculation: result,
      parameters
    };
    
    if (typeof window !== 'undefined') {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `calculation-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const createOrder = async () => {
    if (!result) return;
    
    setIsCreatingOrder(true);
    try {
      // Create lead if needed
      let leadId = orderLeadId;
      if (!leadId) {
        const leadRes = await fetch('/api/admin/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            name: 'Заказ из калькулятора',
            phone: '+7',
            source: 'admin-calculator',
            services: result.services,
            area: parameters.area,
            totalPrice: result.totalPrice
          })
        });
        
        if (!leadRes.ok) {
          throw new Error('Failed to create lead');
        }
        
        const leadData = await leadRes.json();
        leadId = leadData.lead?.id || '';
        setOrderLeadId(leadId);
      }

      // Create order
      const orderRes = await fetch('/api/admin/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          leadId,
          services: result.services,
          totalPrice: result.totalPrice,
          calculatorResult: result,
          notes: orderNotes
        })
      });

      if (orderRes.ok) {
        alert('Заказ успешно создан!');
        setShowExportModal(false);
      } else {
        throw new Error('Failed to create order');
      }
    } catch (error) {
      alert('Ошибка при создании заказа');
    } finally {
      setIsCreatingOrder(false);
    }
  };

  if (!showExportModal) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="flex items-center space-x-3 mb-6">
          <Download className="w-6 h-6 text-primary-600" />
          <h3 className="text-xl font-semibold text-gray-900">Экспорт расчета</h3>
        </div>

        {result && (
          <div className="mb-6">
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h4 className="font-medium text-gray-900 mb-2">Результаты расчета</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Общая цена:</span>
                  <span className="ml-2 font-bold text-primary-600">
                    {result.totalPrice.toLocaleString()} ₽
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Себестоимость:</span>
                  <span className="ml-2 font-medium">
                    {result.costs.totalCost.toLocaleString()} ₽
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Прибыль:</span>
                  <span className="ml-2 font-bold text-green-600">
                    {result.costs.profit.toLocaleString()} ₽
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Маржинальность:</span>
                  <span className="ml-2 font-medium">
                    {result.margins.marginPercentage.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Export Options */}
            <div className="space-y-4">
              {/* Download JSON */}
              <button
                onClick={downloadJSON}
                className="w-full flex items-center justify-center space-x-3 bg-blue-100 hover:bg-blue-200 text-blue-700 p-4 rounded-lg transition-colors"
              >
                <FileText className="w-5 h-5" />
                <span className="font-medium">Скачать JSON</span>
              </button>

              {/* Create Order Section */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3 flex items-center space-x-2">
                  <DollarSign className="w-5 h-5" />
                  <span>Создать заказ</span>
                </h4>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ID лида (опционально)
                    </label>
                    <input
                      type="text"
                      value={orderLeadId}
                      onChange={(e) => setOrderLeadId(e.target.value)}
                      placeholder="Оставьте пустым для создания нового"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Примечания к заказу
                    </label>
                    <textarea
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      placeholder="Дополнительная информация о заказе"
                      rows={3}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <button
                    onClick={createOrder}
                    disabled={isCreatingOrder}
                    className="w-full flex items-center justify-center space-x-3 bg-green-100 hover:bg-green-200 text-green-700 p-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                    <span className="font-medium">
                      {isCreatingOrder ? 'Создание...' : 'Создать заказ'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Close Button */}
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button
            onClick={() => setShowExportModal(false)}
            className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
}