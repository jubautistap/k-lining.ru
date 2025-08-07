'use client';

import React, { useEffect, useState } from 'react';
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
import { useAuthContext } from '@/components/providers/AuthProvider';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AdminLayoutProps {
  children: React.ReactNode;
  user?: User;
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

export default function AdminLayout({ children, user }: AdminLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { toasts, removeToast } = useToast();
  const { logout } = useAuthContext();
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(min-width: 1024px)');
    const handler = (e: MediaQueryListEvent | MediaQueryList) => {
      const matches = 'matches' in e ? e.matches : (e as MediaQueryList).matches;
      setIsLargeScreen(matches);
    };
    // init
    handler(mq as unknown as MediaQueryList);
    // subscribe
    mq.addEventListener?.('change', handler as (ev: MediaQueryListEvent) => void);
    return () => {
      mq.removeEventListener?.('change', handler as (ev: MediaQueryListEvent) => void);
    };
  }, []);

  const handleLogout = async () => {
    await logout();
  };

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
        initial={false}
        animate={{ x: isLargeScreen ? 0 : (isMobileMenuOpen ? 0 : -300) }}
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform lg:translate-x-0 lg:static lg:inset-0 transition-transform duration-300 ease-in-out lg:relative`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Админка</h1>
                {user && (
                  <p className="text-sm text-gray-500">{user.name} ({user.role})</p>
                )}
              </div>
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
        {/* Top bar (всегда видна в админке) */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-gray-600 hover:text-gray-900 lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">Админка</h1>
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