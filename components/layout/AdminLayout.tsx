'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Shield, 
  LogOut, 
  Users, 
  FileText, 
  DollarSign, 
  MessageSquare, 
  BarChart3, 
  Settings,
  Menu,
  X,
  Calculator,
  Gift
} from 'lucide-react';
import { ToastContainer } from '@/components/ui/Toast';
import { useToast } from '@/hooks/useToast';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const adminMenuItems = [
  {
    title: 'Главная',
    href: '/admin',
    icon: Shield,
    color: 'bg-primary-600'
  },
  {
    title: 'Пользователи',
    href: '/admin/users',
    icon: Users,
    color: 'bg-blue-500'
  },
  {
    title: 'Контент',
    href: '/admin/content',
    icon: FileText,
    color: 'bg-green-500'
  },
  {
    title: 'Заявки',
    href: '/admin/leads',
    icon: MessageSquare,
    color: 'bg-red-500'
  },
  {
    title: 'Калькулятор',
    href: '/admin/calculator',
    icon: Calculator,
    color: 'bg-emerald-500'
  },
  {
    title: 'Цены',
    href: '/admin/prices',
    icon: DollarSign,
    color: 'bg-yellow-500'
  },
  {
    title: 'Блог',
    href: '/admin/blog',
    icon: FileText,
    color: 'bg-purple-500'
  },
  {
    title: 'Аналитика',
    href: '/admin/analytics',
    icon: BarChart3,
    color: 'bg-indigo-500'
  },
  {
    title: 'Лояльность',
    href: '/admin/loyalty',
    icon: Gift,
    color: 'bg-pink-500'
  },
  {
    title: 'Настройки',
    href: '/admin/settings',
    icon: Settings,
    color: 'bg-gray-500'
  }
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { toasts, removeToast } = useToast();

  useEffect(() => {
    // Убираем задержку загрузки
    setIsAuthenticated(true);
    setIsLoading(false);
    // checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // Временно отключаем проверку авторизации для тестирования
      setIsAuthenticated(true);
      setIsLoading(false);
      
      // Рабочий код (закомментирован):
      /*
      const token = localStorage.getItem('admin_token');
      if (token) {
        // Проверяем токен с сервером
        const response = await fetch('/api/admin/auth', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('admin_token');
        }
      }
      */
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_token');
      setIsAuthenticated(false);
      window.location.href = '/admin';
    }
  };

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

  // Если не авторизован, показываем форму входа
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isMobileMenuOpen ? 0 : -300 }}
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform lg:translate-x-0 lg:static lg:inset-0 transition-transform duration-300 ease-in-out lg:relative`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-lg font-bold text-gray-900">Админка</h1>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {adminMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <div className={`w-8 h-8 ${item.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium">{item.title}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Выйти</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <header className="bg-white shadow-sm border-b lg:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-gray-600 hover:text-gray-900"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">KliningPro</h1>
            <div className="w-6"></div>
          </div>
        </header>

        {/* Page content */}
        <main className="min-h-screen p-4">
          {children}
        </main>
      </div>
      
      {/* Toast notifications */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
} 