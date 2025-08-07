'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, MapPin, Clock } from 'lucide-react';
import { useAmoCRM } from '../providers/AmoCRMProvider';
import { useThrottle } from '../../hooks/usePerformance';
import OptimizedLogo from '../ui/OptimizedLogo';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [isMounted, setIsMounted] = useState(false); // Предотвращаем hydration mismatch
  const { openModal } = useAmoCRM();

  // Устанавливаем mounted после hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleScroll = useCallback(() => {
    if (typeof window !== 'undefined') {
      setIsScrolled(window.scrollY > 10);
    }
  }, []);

  const throttledHandleScroll = useThrottle(handleScroll, 100);

  useEffect(() => {
    if (typeof window === 'undefined' || !isMounted) return;
    
    // Инициализируем состояние скролла
    setIsScrolled(window.scrollY > 10);
    
    window.addEventListener('scroll', throttledHandleScroll);
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, [throttledHandleScroll, isMounted]);

  const navigation = useMemo(() => [
    { name: 'Главная', href: '/' },
    { name: 'Услуги', href: '/services' },
    { name: 'Цены', href: '/prices' },
    { name: 'Калькулятор', href: '/calculator' },
    { name: 'Блог', href: '/blog' },
    { name: 'Контакты', href: '/contacts' },
  ], []);

  const handleMobileMenuToggle = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const handleModalOpen = useCallback(() => {
    openModal();
    setIsMobileMenuOpen(false);
  }, [openModal]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
      isMounted && isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'
    } pt-safe-top`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-20 md:h-24 min-h-[80px] overflow-hidden">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <OptimizedLogo 
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 object-contain" 
              width={64}
              height={64}
            />
            <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary-600">
              K-lining
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 whitespace-nowrap text-sm"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Contact Info & CTA */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <a 
              href="tel:+79255551833" 
              className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium whitespace-nowrap"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden lg:inline">+7 (925) 555-18-33</span>
            </a>
            
            <button
              onClick={handleModalOpen}
              className="btn-primary text-sm px-4 py-2"
            >
              Заказать
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={handleMobileMenuToggle}
            className="md:hidden p-2 text-gray-700 hover:text-primary-600 transition-colors duration-200"
            aria-label="Открыть меню"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Navigation */}
              <nav className="space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* Mobile Contact Info */}
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <a 
                  href="tel:+79255551833" 
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Phone className="w-4 h-4" />
                  <span>+7 (925) 555-18-33</span>
                </a>
                
                <div className="flex items-center space-x-2 text-gray-600 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>Москва и МО</span>
                </div>
                
                <div className="flex items-center space-x-2 text-gray-600 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>Работаем 24/7</span>
                </div>
              </div>

              {/* Mobile CTA */}
              <button
                onClick={handleModalOpen}
                className="w-full btn-primary py-3"
              >
                Заказать уборку
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
} 