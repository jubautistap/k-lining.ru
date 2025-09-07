'use client';

import React from 'react';
import { useToast } from '@/hooks/useToast';

interface OrderFormProps {
  result: {
    totalPrice: number;
  } | null;
  leadId: string;
  setLeadId: (id: string) => void;
  clientName: string;
  setClientName: (name: string) => void;
  clientPhone: string;
  setClientPhone: (phone: string) => void;
  managerNote: string;
  setManagerNote: (note: string) => void;
  serviceNames: any;
  cleaningType: any;
  area: number;
}

export default function OrderForm({ 
  result, 
  leadId, 
  setLeadId, 
  clientName, 
  setClientName, 
  clientPhone, 
  setClientPhone, 
  managerNote, 
  setManagerNote,
  serviceNames,
  cleaningType,
  area
}: OrderFormProps) {
  const { success, error } = useToast();
  if (!result) return null;

  const handleOrderSubmit = async () => {
    if (!result) return;
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          leadId: leadId || undefined,
          service_type: serviceNames[cleaningType],
          area,
          price: result.totalPrice,
          notes: managerNote,
        }),
      });
      if (res.ok) {
        success('Заказ оформлен и заявка обновлена');
        setLeadId('');
        setManagerNote('');
      } else {
        const data = await res.json();
        error(`Ошибка оформления: ${data.error || 'неизвестно'}`);
      }
    } catch (err) {
      error('Ошибка сети при оформлении заказа');
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <h4 className="text-lg font-semibold text-gray-900 mb-4">Оформление заказа</h4>
      <div className="space-y-3">
        <input
          type="text"
          placeholder="ID лида (опционально)"
          value={leadId}
          onChange={(e) => setLeadId(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Имя клиента"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          />
          <input
            type="tel"
            placeholder="Телефон"
            value={clientPhone}
            onChange={(e) => setClientPhone(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <textarea
          placeholder="Заметка менеджера"
          value={managerNote}
          onChange={(e) => setManagerNote(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          rows={3}
        />
        <button
          onClick={handleOrderSubmit}
          className="btn-primary w-full"
        >
          Закрыть на {result.totalPrice.toLocaleString()} ₽
        </button>
      </div>
    </div>
  );
}