'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, BarChart3, DollarSign, Users, FileText, Calculator, Settings } from 'lucide-react';

type Analytics = {
  totalLeads: number;
  todayLeads: number;
  conversionRate: number;
  totalRevenue: number;
  averageOrderValue: number;
};

type Lead = {
  id: string;
  name: string;
  phone: string;
  status: string;
  createdAt: string;
};

export default function AdminPage() {
  const [analytics, setAnalytics] = React.useState<Analytics | null>(null);
  const [recentLeads, setRecentLeads] = React.useState<Lead[]>([]);
  const [loading, setLoading] = React.useState(true);

  // Гарантированный скролл к началу при первом монтировании главной админки
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        if ('scrollRestoration' in window.history) {
          window.history.scrollRestoration = 'manual';
        }
        window.requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: 'auto' }));
      } catch {}
    }
  }, []);

  const getTokenOrRefresh = React.useCallback(async (): Promise<string> => {
    const token = localStorage.getItem('accessToken') || '';
    return token;
  }, []);

  const authorizedFetch = React.useCallback(async (input: RequestInfo | URL, init: RequestInit = {}) => {
    let token = await getTokenOrRefresh();
    const doRequest = async (bearer?: string) => {
      const headers: HeadersInit = {
        ...(init.headers || {}),
        ...(bearer ? { Authorization: `Bearer ${bearer}` } : {}),
      } as HeadersInit;
      return fetch(input, { ...init, headers, credentials: init.credentials ?? 'include' });
    };
    let res = await doRequest(token || undefined);
    if (res.status === 401) {
      try {
        const refresh = await fetch('/api/auth/refresh', { method: 'POST', credentials: 'include' });
        if (refresh.ok) {
          const data = await refresh.json();
          token = data.accessToken;
          localStorage.setItem('accessToken', token);
          res = await doRequest(token || undefined);
        }
      } catch {}
    }
    return res;
  }, [getTokenOrRefresh]);

  React.useEffect(() => {
    const load = async () => {
      try {
        const a = await fetch('/api/admin/analytics?range=30');
        if (a.ok) setAnalytics(await a.json());

        const l = await authorizedFetch('/api/admin/leads?limit=5');
        if (l.ok) {
          const data = await l.json();
          setRecentLeads(data.leads);
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [authorizedFetch]);

  const cards = [
    {
      title: 'Всего заявок',
      value: analytics?.totalLeads ?? 0,
      icon: MessageSquare,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Заявок сегодня',
      value: analytics?.todayLeads ?? 0,
      icon: BarChart3,
      color: 'bg-green-100 text-green-600',
    },
    {
      title: 'Доход (30д)',
      value: `${(analytics?.totalRevenue ?? 0).toLocaleString()} ₽`,
      icon: DollarSign,
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      title: 'Конверсия',
      value: `${analytics?.conversionRate ?? 0}%`,
      icon: BarChart3,
      color: 'bg-purple-100 text-purple-600',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Быстрые действия */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <a href="/admin/leads" className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow">Заявки</a>
        <a href="/admin/calculator" className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow">Калькулятор</a>
        <a href="/admin/analytics" className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow">Аналитика</a>
        <a href="/admin/settings" className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow">Настройки</a>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <motion.div key={c.title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{c.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{loading ? '—' : c.value}</p>
                </div>
                <div className={`w-12 h-12 ${c.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Последние заявки */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Последние заявки</h2>
            <a href="/admin/leads" className="text-primary-600 text-sm hover:underline">Все заявки</a>
          </div>
          <div className="divide-y divide-gray-200">
            {recentLeads.map((l) => (
              <div key={l.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                <div>
                  <div className="font-medium text-gray-900">{l.name || 'Без имени'}</div>
                  <div className="text-sm text-gray-600">{l.phone}</div>
                </div>
                <div className="text-right text-sm text-gray-500">
                  {new Date(l.createdAt).toLocaleString('ru-RU')}
                </div>
              </div>
            ))}
            {(!loading && recentLeads.length === 0) && (
              <div className="px-6 py-8 text-center text-gray-500">Нет заявок</div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Разделы</h3>
            <div className="space-y-3">
              <a href="/admin/content" className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50">
                <span className="flex items-center gap-2"><FileText className="w-4 h-4" />Контент</span>
                <span className="text-gray-400">→</span>
              </a>
              <a href="/admin/users" className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50">
                <span className="flex items-center gap-2"><Users className="w-4 h-4" />Пользователи</span>
                <span className="text-gray-400">→</span>
              </a>
              <a href="/admin/prices" className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50">
                <span className="flex items-center gap-2"><DollarSign className="w-4 h-4" />Цены</span>
                <span className="text-gray-400">→</span>
              </a>
              <a href="/admin/blog" className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50">
                <span className="flex items-center gap-2"><FileText className="w-4 h-4" />Блог</span>
                <span className="text-gray-400">→</span>
              </a>
              <a href="/admin/settings" className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50">
                <span className="flex items-center gap-2"><Settings className="w-4 h-4" />Настройки</span>
                <span className="text-gray-400">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}