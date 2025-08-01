'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Gift, 
  Star, 
  Users, 
  Award,
  Plus,
  Edit,
  Trash2,
  Crown,
  Diamond,
  Heart,
  TrendingUp,
  Percent
} from 'lucide-react';

interface LoyaltyLevel {
  id: string;
  name: string;
  icon: string;
  minOrders: number;
  discount: number;
  bonusPoints: number;
  description: string;
  color: string;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  level: string;
  points: number;
  totalOrders: number;
  totalSpent: number;
  lastOrder: string;
  status: 'active' | 'inactive';
}

export default function LoyaltyPage() {
  const [levels, setLevels] = useState<LoyaltyLevel[]>([
    {
      id: '1',
      name: 'Новичок',
      icon: 'Heart',
      minOrders: 0,
      discount: 0,
      bonusPoints: 10,
      description: 'Базовый уровень для новых клиентов',
      color: 'bg-gray-500'
    },
    {
      id: '2',
      name: 'Бронза',
      icon: 'Award',
      minOrders: 3,
      discount: 5,
      bonusPoints: 15,
      description: 'После 3 заказов',
      color: 'bg-yellow-600'
    },
    {
      id: '3',
      name: 'Серебро',
      icon: 'Star',
      minOrders: 10,
      discount: 10,
      bonusPoints: 25,
      description: 'После 10 заказов',
      color: 'bg-gray-400'
    },
    {
      id: '4',
      name: 'Золото',
      icon: 'Crown',
      minOrders: 25,
      discount: 15,
      bonusPoints: 50,
      description: 'После 25 заказов',
      color: 'bg-yellow-500'
    },
    {
      id: '5',
      name: 'Платина',
      icon: 'Diamond',
      minOrders: 50,
      discount: 20,
      bonusPoints: 100,
      description: 'После 50 заказов',
      color: 'bg-purple-500'
    }
  ]);

  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: '1',
      name: 'Иван Петров',
      email: 'ivan@example.com',
      phone: '+7 (999) 123-45-67',
      level: 'Золото',
      points: 1250,
      totalOrders: 28,
      totalSpent: 45000,
      lastOrder: '2024-01-15',
      status: 'active'
    },
    {
      id: '2',
      name: 'Мария Сидорова',
      email: 'maria@example.com',
      phone: '+7 (999) 234-56-78',
      level: 'Серебро',
      points: 450,
      totalOrders: 12,
      totalSpent: 18000,
      lastOrder: '2024-01-10',
      status: 'active'
    },
    {
      id: '3',
      name: 'Алексей Козлов',
      email: 'alex@example.com',
      phone: '+7 (999) 345-67-89',
      level: 'Бронза',
      points: 120,
      totalOrders: 5,
      totalSpent: 8000,
      lastOrder: '2024-01-08',
      status: 'active'
    }
  ]);

  const [showLevelModal, setShowLevelModal] = useState(false);
  const [editingLevel, setEditingLevel] = useState<LoyaltyLevel | null>(null);
  const [newLevel, setNewLevel] = useState({
    name: '',
    minOrders: 0,
    discount: 0,
    bonusPoints: 0,
    description: '',
    color: 'bg-gray-500'
  });

  const stats = {
    totalCustomers: customers.length,
    activeCustomers: customers.filter(c => c.status === 'active').length,
    totalPoints: customers.reduce((sum, c) => sum + c.points, 0),
    averageLevel: customers.length > 0 ? 
      customers.reduce((sum, c) => {
        const levelIndex = levels.findIndex(l => l.name === c.level);
        return sum + (levelIndex + 1);
      }, 0) / customers.length : 0
  };

  const getLevelIcon = (iconName: string) => {
    switch (iconName) {
      case 'Heart': return Heart;
      case 'Award': return Award;
      case 'Star': return Star;
      case 'Crown': return Crown;
      case 'Diamond': return Diamond;
      default: return Gift;
    }
  };

  const handleAddLevel = () => {
    if (newLevel.name && newLevel.description) {
      const level: LoyaltyLevel = {
        id: Date.now().toString(),
        name: newLevel.name,
        icon: 'Gift',
        minOrders: newLevel.minOrders,
        discount: newLevel.discount,
        bonusPoints: newLevel.bonusPoints,
        description: newLevel.description,
        color: newLevel.color
      };
      setLevels([...levels, level]);
      setNewLevel({ name: '', minOrders: 0, discount: 0, bonusPoints: 0, description: '', color: 'bg-gray-500' });
      setShowLevelModal(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Система лояльности</h1>
          <p className="text-gray-600">Управление уровнями и бонусами клиентов</p>
        </div>
        <button
          onClick={() => setShowLevelModal(true)}
          className="btn-primary flex items-center space-x-2 mt-4 sm:mt-0"
        >
          <Plus className="w-4 h-4" />
          <span>Добавить уровень</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Всего клиентов</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalCustomers}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Активных клиентов</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeCustomers}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Всего баллов</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalPoints}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Gift className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Средний уровень</p>
              <p className="text-2xl font-bold text-gray-900">{stats.averageLevel.toFixed(1)}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Levels */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Уровни лояльности</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {levels.map((level) => {
            const Icon = getLevelIcon(level.icon);
            return (
              <motion.div
                key={level.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 ${level.color} rounded-lg flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{level.name}</h3>
                      <p className="text-sm text-gray-500">{level.description}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingLevel(level)}
                      className="text-primary-600 hover:text-primary-900"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setLevels(levels.filter(l => l.id !== level.id))}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Минимум заказов:</span>
                    <span className="font-medium">{level.minOrders}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Скидка:</span>
                    <span className="font-medium text-green-600">{level.discount}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Бонусные баллы:</span>
                    <span className="font-medium text-blue-600">{level.bonusPoints}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Customers */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Клиенты</h2>
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Клиент
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Уровень
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Баллы
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Заказы
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Сумма
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Последний заказ
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {customers.map((customer) => (
                  <motion.tr
                    key={customer.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                          <Users className="w-4 h-4 text-primary-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                          <div className="text-sm text-gray-500">{customer.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {customer.level}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {customer.points}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {customer.totalOrders}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {customer.totalSpent.toLocaleString()} ₽
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {customer.lastOrder}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Level Modal */}
      {showLevelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 w-full max-w-md mx-4"
          >
            <h3 className="text-lg font-semibold mb-4">Добавить уровень</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Название уровня
                </label>
                <input
                  type="text"
                  value={newLevel.name}
                  onChange={(e) => setNewLevel({ ...newLevel, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Описание
                </label>
                <input
                  type="text"
                  value={newLevel.description}
                  onChange={(e) => setNewLevel({ ...newLevel, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Мин. заказов
                  </label>
                  <input
                    type="number"
                    value={newLevel.minOrders}
                    onChange={(e) => setNewLevel({ ...newLevel, minOrders: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Скидка (%)
                  </label>
                  <input
                    type="number"
                    value={newLevel.discount}
                    onChange={(e) => setNewLevel({ ...newLevel, discount: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Баллы
                  </label>
                  <input
                    type="number"
                    value={newLevel.bonusPoints}
                    onChange={(e) => setNewLevel({ ...newLevel, bonusPoints: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleAddLevel}
                className="flex-1 btn-primary"
              >
                Добавить
              </button>
              <button
                onClick={() => setShowLevelModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Отмена
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
} 