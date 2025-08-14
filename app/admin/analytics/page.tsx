'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign,
  Calendar,
  ArrowLeft,
  Download,
  Filter
} from 'lucide-react';
import Link from 'next/link';

interface AnalyticsData {
  totalLeads: number;
  todayLeads: number;
  weekLeads: number;
  monthLeads: number;
  conversionRate: number;
  totalRevenue: number;
  realizedRevenue?: number;
  averageOrderValue: number;
  topServices: Array<{
    name: string;
    count: number;
    revenue: number;
  }>;
  leadsByStatus: Array<{
    status: string;
    count: number;
    percentage: number;
  }>;
  leadsByDay: Array<{
    date: string;
    count: number;
  }>;
  leadsByMonth: Array<{
    month: string;
    count: number;
    revenue: number;
  }>;
  sources?: Array<{ source: string; count: number; percentage: number }>;
  forecast?: { leadsNext30: number; revenueNext30: number; avgDailyLeads: number; avgDailyRevenue: number };
}

export default function AdminAnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalLeads: 0,
    todayLeads: 0,
    weekLeads: 0,
    monthLeads: 0,
    conversionRate: 0,
    totalRevenue: 0,
    averageOrderValue: 0,
    topServices: [],
    leadsByStatus: [],
    leadsByDay: [],
    leadsByMonth: []
  });
  const [dateRange, setDateRange] = useState('30');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const response = await fetch(`/api/admin/analytics?range=${dateRange}`);
        if (response.ok) {
          const data = await response.json();
          setAnalytics(data);
        }
      } catch (error) {
        console.error('Error loading analytics:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadAnalytics();
  }, [dateRange]);

  const exportData = () => {
    const dataStr = JSON.stringify(analytics, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `analytics-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка аналитики...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">Аналитика</h1>
        </div>
        
            <div className="flex items-center space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="7">7 дней</option>
            <option value="30">30 дней</option>
            <option value="90">90 дней</option>
            <option value="365">Год</option>
          </select>
          <button
            onClick={exportData}
            className="btn-secondary flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Экспорт</span>
          </button>
        </div>
      </div>
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Всего заявок</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.totalLeads}</p>
                <p className="text-xs text-green-600">+12% с прошлого месяца</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Конверсия</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.conversionRate}%</p>
                <p className="text-xs text-green-600">+5% с прошлого месяца</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Общий доход</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.totalRevenue.toLocaleString()} ₽</p>
                <p className="text-xs text-green-600">+18% с прошлого месяца</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Реализованный доход</p>
                <p className="text-2xl font-bold text-gray-900">{(analytics.realizedRevenue || 0).toLocaleString()} ₽</p>
                <p className="text-xs text-green-600">COMPLETED</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Средний чек</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.averageOrderValue.toLocaleString()} ₽</p>
                <p className="text-xs text-green-600">+8% с прошлого месяца</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Популярные услуги</h3>
            <div className="space-y-4">
              {analytics.topServices.map((service, index) => (
                <div key={service.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 font-semibold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{service.name}</p>
                      <p className="text-sm text-gray-500">{service.count} заявок</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{service.revenue.toLocaleString()} ₽</p>
                    <p className="text-xs text-gray-500">{((service.count / analytics.totalLeads) * 100).toFixed(1)}%</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Leads by Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Заявки по статусам</h3>
            <div className="space-y-4">
              {analytics.leadsByStatus.map((status) => (
                <div key={status.status} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      status.status === 'new' ? 'bg-blue-500' :
                      status.status === 'contacted' ? 'bg-yellow-500' :
                      status.status === 'confirmed' ? 'bg-green-500' :
                      status.status === 'completed' ? 'bg-gray-500' :
                      'bg-red-500'
                    }`}></div>
                    <span className="text-sm font-medium text-gray-900">
                      {status.status === 'new' ? 'Новые' :
                       status.status === 'contacted' ? 'Связались' :
                       status.status === 'confirmed' ? 'Подтверждены' :
                       status.status === 'completed' ? 'Завершены' :
                       'Отменены'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-semibold text-gray-900">{status.count}</span>
                    <span className="text-xs text-gray-500">{status.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Sources */}
          {analytics.sources && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Источники (utm_source)</h3>
              <div className="space-y-3">
                {analytics.sources.map((s) => (
                  <div key={s.source} className="flex items-center justify-between">
                    <div className="text-sm font-medium text-gray-900">{s.source}</div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-gray-900">{s.count}</div>
                      <div className="text-xs text-gray-500">{s.percentage}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Recent Activity + Forecast */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-sm p-6 mt-8"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Активность по дням</h3>
          <div className="grid grid-cols-7 gap-2">
            {analytics.leadsByDay.slice(-7).map((day, index) => (
              <div key={day.date} className="text-center">
                <div className="text-xs text-gray-500 mb-1">
                  {new Date(day.date).toLocaleDateString('ru-RU', { weekday: 'short' })}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-20 relative">
                  <div 
                    className="bg-primary-600 rounded-full absolute bottom-0 w-full"
                    style={{ 
                      height: `${Math.max((day.count / Math.max(...analytics.leadsByDay.slice(-7).map(d => d.count))) * 100, 10)}%` 
                    }}
                  ></div>
                </div>
                <div className="text-xs text-gray-600 mt-1">{day.count}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Прогноз */}
        {'forecast' in analytics && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-xl shadow-sm p-6 mt-8"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Прогноз на 30 дней</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-600">Ожидаемые заявки</p>
                <p className="text-2xl font-bold text-gray-900">{(analytics as any).forecast.leadsNext30}</p>
                <p className="text-xs text-gray-500">Среднесуточно: {(analytics as any).forecast.avgDailyLeads}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Прогноз дохода</p>
                <p className="text-2xl font-bold text-gray-900">{(analytics as any).forecast.revenueNext30.toLocaleString()} ₽</p>
                <p className="text-xs text-gray-500">Среднесуточно: {(analytics as any).forecast.avgDailyRevenue.toLocaleString()} ₽</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Конверсия (текущ.)</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.conversionRate}%</p>
                <p className="text-xs text-gray-500">На базе текущей воронки</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
  );
}