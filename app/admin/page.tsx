'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  FileText, 
  Settings, 
  BarChart3, 
  MessageSquare, 
  DollarSign,
  Shield,
  LogOut,
  Eye,
  EyeOff,
  Calculator
} from 'lucide-react';

interface AdminUser {
  id: string;
  email: string;
  role: 'admin' | 'editor';
  name: string;
}

interface AdminStats {
  totalLeads: number;
  todayLeads: number;
  totalVisits: number;
  conversionRate: number;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [stats, setStats] = useState<AdminStats>({
    totalLeads: 0,
    todayLeads: 0,
    totalVisits: 0,
    conversionRate: 0
  });

  useEffect(() => {
    // Проверяем авторизацию при загрузке
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      if (token) {
        // Здесь будет проверка токена с сервером
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Здесь будет реальная авторизация
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('admin_token', token);
        setIsAuthenticated(true);
      } else {
        alert('Неверный email или пароль');
      }
    } catch (error) {
      alert('Ошибка авторизации');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setIsAuthenticated(false);
  };

  const adminSections = [
    {
      title: 'Пользователи',
      description: 'Управление администраторами',
      icon: Users,
      href: '/admin/users',
      color: 'bg-blue-500'
    },
    {
      title: 'Контент',
      description: 'Редактирование текстов и страниц',
      icon: FileText,
      href: '/admin/content',
      color: 'bg-green-500'
    },
    {
      title: 'Калькулятор',
      description: 'Расчет затрат и прибыли',
      icon: Calculator,
      href: '/admin/calculator',
      color: 'bg-emerald-500'
    },
    {
      title: 'Цены',
      description: 'Управление тарифами и услугами',
      icon: DollarSign,
      href: '/admin/prices',
      color: 'bg-yellow-500'
    },
    {
      title: 'Блог',
      description: 'Управление статьями',
      icon: FileText,
      href: '/admin/blog',
      color: 'bg-purple-500'
    },
    {
      title: 'Заявки',
      description: 'Просмотр и управление заявками',
      icon: MessageSquare,
      href: '/admin/leads',
      color: 'bg-red-500'
    },
    {
      title: 'Аналитика',
      description: 'Статистика и отчеты',
      icon: BarChart3,
      href: '/admin/analytics',
      color: 'bg-indigo-500'
    },
    {
      title: 'Настройки',
      description: 'SEO, контакты, интеграции',
      icon: Settings,
      href: '/admin/settings',
      color: 'bg-gray-500'
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Панель управления
            </h1>
            <p className="text-gray-600">
              Войдите в систему для управления сайтом
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    placeholder="admin@k-lining.ru"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Пароль
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent pr-12"
                  placeholder="Введите пароль"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-3 text-lg font-semibold disabled:opacity-50"
            >
              {isLoading ? 'Вход...' : 'Войти'}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Всего заявок</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalLeads}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Заявок сегодня</p>
                <p className="text-2xl font-bold text-gray-900">{stats.todayLeads}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Посещений</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalVisits}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Конверсия</p>
                <p className="text-2xl font-bold text-gray-900">{stats.conversionRate}%</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Admin Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => window.location.href = section.href}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 ${section.color} rounded-lg flex items-center justify-center`}>
                  <section.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {section.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {section.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
  );
}