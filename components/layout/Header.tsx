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

  // Блокируем скролл страницы при открытом мобильном меню
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
      isMounted && isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'
    } pt-4 md:pt-6`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20 min-h-[64px] overflow-hidden">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <OptimizedLogo 
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 object-contain" 
              width={56}
              height={56}
            />
            <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-primary-600">
              K-lining
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 whitespace-nowrap text-sm xl:text-base"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <a 
              href="tel:+79255551833" 
              className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium whitespace-nowrap text-sm xl:text-base"
              title="+7 (925) 555-18-33"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden xl:inline">+7 (925) 555-18-33</span>
              <span className="xl:hidden text-xs">+7 (925) 555-18-33</span>
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
            className="lg:hidden p-2 text-gray-700 hover:text-primary-600 transition-colors duration-200"
            aria-label="Открыть меню"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div id="mobile-menu" className="lg:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Navigation */}
              <nav className="space-y-2" role="navigation" aria-label="Мобильная навигация">
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
                <div className="text-xs text-gray-600">
                  Минимальный заказ — 6 000 ₽
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