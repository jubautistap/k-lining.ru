'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import { PRICING_RATES, RATE_POINT } from '@/data/pricing';

interface PriceItem {
  id: string;
  service: string;
  type: string;
  price: number;
  description: string;
  isActive: boolean;
}

export default function AdminPricesPage() {
  const [prices, setPrices] = useState<PriceItem[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editingPrice, setEditingPrice] = useState<PriceItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newPrice, setNewPrice] = useState<Partial<PriceItem>>({
    service: '',
    type: '',
    price: 0,
    description: '',
    isActive: true
  });

  useEffect(() => {
    // Загрузка цен из API
    loadPrices();
  }, []);

  const loadPrices = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('/api/admin/prices', {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      if (response.ok) {
        const data = await response.json();
        // Авто‑инициализация: если API вернуло пусто, поднимем тарифы из калькулятора (PRICING_RATES)
        if (!data.prices || data.prices.length === 0) {
          const bootstrap: PriceItem[] = [];
          (Object.keys(PRICING_RATES) as Array<keyof typeof PRICING_RATES>).forEach((prop) => {
            const tiers = PRICING_RATES[prop];
            (Object.keys(tiers) as Array<keyof typeof tiers>).forEach((ct) => {
              const rate = tiers[ct][RATE_POINT];
              bootstrap.push({
                id: `${prop}-${ct}`,
                service: String(prop),
                type: String(ct),
                price: rate,
                description: 'Импорт из калькулятора',
                isActive: true,
              });
            });
          });
          setPrices(bootstrap);
        } else {
          setPrices(data.prices);
        }
      }
    } catch (error) {
      // Error loading prices
    }
  };

  const handleSave = async (price: PriceItem) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('/api/admin/prices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(price)
      });

      if (response.ok) {
        await loadPrices();
        setIsEditing(null);
        setEditingPrice(null);
      }
    } catch (error) {
      // Error saving price
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Удалить эту услугу?')) return;

    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`/api/admin/prices/${id}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });

      if (response.ok) {
        await loadPrices();
      }
    } catch (error) {
      // Error deleting price
    }
  };

  const handleAdd = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('/api/admin/prices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(newPrice)
      });

      if (response.ok) {
        await loadPrices();
        setIsAdding(false);
        setNewPrice({
          service: '',
          type: '',
          price: 0,
          description: '',
          isActive: true
        });
      }
    } catch (error) {
      // Error adding price
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">Управление ценами</h1>
        </div>
        
        <button
          onClick={() => setIsAdding(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Добавить услугу</span>
        </button>
      </div>
        {/* Prices List */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Тарифы и услуги</h2>
            <p className="text-xs text-gray-500 mt-1">Базовые ставки подтягиваются из калькулятора (mid‑точка). Изменения здесь не меняют логику калькулятора — это отдельный справочник цен для сайта/прейскуранта.</p>
          </div>
          
          <div className="divide-y divide-gray-200">
            {prices.map((price) => (
              <motion.div
                key={price.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-6"
              >
                {isEditing === price.id ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Услуга
                        </label>
                        <input
                          type="text"
                          value={editingPrice?.service || ''}
                          onChange={(e) => setEditingPrice({ ...editingPrice!, service: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Тип
                        </label>
                        <input
                          type="text"
                          value={editingPrice?.type || ''}
                          onChange={(e) => setEditingPrice({ ...editingPrice!, type: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Цена (₽)
                        </label>
                        <input
                          type="number"
                          value={editingPrice?.price || 0}
                          onChange={(e) => setEditingPrice({ ...editingPrice!, price: Number(e.target.value) })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Статус
                        </label>
                        <select
                          value={editingPrice?.isActive ? 'active' : 'inactive'}
                          onChange={(e) => setEditingPrice({ ...editingPrice!, isActive: e.target.value === 'active' })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        >
                          <option value="active">Активна</option>
                          <option value="inactive">Неактивна</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Описание
                      </label>
                      <textarea
                        value={editingPrice?.description || ''}
                        onChange={(e) => setEditingPrice({ ...editingPrice!, description: e.target.value })}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => {
                          setIsEditing(null);
                          setEditingPrice(null);
                        }}
                        className="px-4 py-2 text-gray-600 hover:text-gray-900"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleSave(editingPrice!)}
                        className="btn-primary flex items-center space-x-2"
                      >
                        <Save className="w-4 h-4" />
                        <span>Сохранить</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {price.service}
                          </h3>
                          <p className="text-sm text-gray-600">{price.type}</p>
                          <p className="text-sm text-gray-500 mt-1">{price.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary-600">
                            {price.price.toLocaleString()} ₽
                          </div>
                          <div className={`text-xs px-2 py-1 rounded-full ${
                            price.isActive 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {price.isActive ? 'Активна' : 'Неактивна'}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => {
                          setIsEditing(price.id);
                          setEditingPrice(price);
                        }}
                        className="p-2 text-gray-400 hover:text-gray-600"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(price.id)}
                        className="p-2 text-red-400 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Add New Price Modal */}
        {isAdding && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Добавить услугу</h3>
                <button
                  onClick={() => setIsAdding(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Услуга
                  </label>
                  <input
                    type="text"
                    value={newPrice.service}
                    onChange={(e) => setNewPrice({ ...newPrice, service: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="Уборка квартиры"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Тип
                  </label>
                  <input
                    type="text"
                    value={newPrice.type}
                    onChange={(e) => setNewPrice({ ...newPrice, type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="Генеральная уборка"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Цена (₽)
                  </label>
                  <input
                    type="number"
                    value={newPrice.price}
                    onChange={(e) => setNewPrice({ ...newPrice, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="5000"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Описание
                  </label>
                  <textarea
                    value={newPrice.description}
                    onChange={(e) => setNewPrice({ ...newPrice, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="Описание услуги..."
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900"
                >
                  Отмена
                </button>
                <button
                  onClick={handleAdd}
                  className="btn-primary"
                >
                  Добавить
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
  );
}