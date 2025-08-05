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
    { name: 'Уборка квартир', href: '/services/apartment-cleaning' },
    { name: 'Цены на уборку', href: '/prices' },
    { name: 'Калькулятор стоимости', href: '/calculator' },
    { name: 'Блог', href: '/blog' },
    { name: 'О компании', href: '/about' },
    { name: 'Контакты', href: '/contacts' },
  ], []);

  const corporateServices = useMemo(() => [
    {
      title: 'Уборка офисов',
      services: [
        'Генеральная уборка',
        'После ремонта',
        'Поддерживающая',
        'Ежедневная',
        'На постоянной основе',
        'Разовая',
        'Вечерняя',
        'Утренняя',
        'Влажная',
        'Мытье окон в офисе',
        'Дезинфекция офисов',
        'Химчистка мебели'
      ]
    },
    {
      title: 'Уборка помещений',
      services: [
        'Торговых центров',
        'Дезинфекция',
        'Школ',
        'Нежилых помещений',
        'Складских помещений',
        'Бани и сауны',
        'Бизнес-центров',
        'Фитнес клубов',
        'Производственных помещений',
        'Магазинов',
        'Ресторанов и кафе'
      ]
    },
    {
      title: 'Специализированные услуги',
      services: [
        'Салонов красоты',
        'На мероприятиях',
        'Паркинга',
        'Подъездов домов',
        'Медицинских учреждений',
        'Автосалонов',
        'Служебных помещений',
        'Учебных заведений',
        'Гостиниц и отелей',
        'Влажная уборка',
        'Детских садов и ДОУ'
      ]
    },
    {
      title: 'Дополнительно',
      services: [
        'Мойка витрин',
        'Мойка фасадов',
        'Промышленный альпинизм',
        'Мойка вывесок',
        'Механизированная уборка',
        'Покос травы',
        'Уборка территории',
        'Уборка бассейнов',
        'Уборка снега',
        'Химчистка автомобилей'
      ]
    }
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
        <div className="flex items-center justify-between h-20 md:h-24 min-h-[80px]">
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
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 whitespace-nowrap text-base"
              >
                {item.name}
              </Link>
            ))}
            
            {/* Corporate Link (simplified) */}
            <Link
              href="/corporate"
              className="text-primary-600 hover:text-primary-700 font-semibold transition-colors duration-200 whitespace-nowrap text-base"
            >
              Для бизнеса
            </Link>
          </nav>

          {/* Contact Info & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <a 
              href="tel:+79255551833" 
              className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium whitespace-nowrap"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm">+7 (925) 555-18-33</span>
            </a>
            <button
              onClick={openModal}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-700 transition-colors text-sm whitespace-nowrap"
            >
              Заказать уборку
            </button>
          </div>

          {/* Mobile Contact & Menu - ИСПРАВЛЕНА СТРУКТУРА */}
          <div className="md:hidden flex items-center">
            <div className="flex items-center gap-3">
              <a 
                href="tel:+79255551833" 
                className="flex items-center gap-2 px-3 py-3 rounded-lg hover:bg-gray-50 text-gray-600 hover:text-primary-600 transition-colors duration-200 touch-manipulation"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span className="text-xs font-medium whitespace-nowrap">+7 (925) 555-18-33</span>
              </a>
              <button
                onClick={handleMobileMenuToggle}
                className="flex items-center justify-center p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 touch-manipulation"
                aria-label="Открыть меню"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 flex-shrink-0" />
                ) : (
                  <Menu className="w-6 h-6 flex-shrink-0" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg pb-safe-bottom">
          <div className="container-custom py-6 px-4">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-primary-600 font-medium py-4 px-2 rounded-lg hover:bg-gray-50 transition-all duration-200 text-lg touch-manipulation"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Corporate Link */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <Link
                  href="/corporate"
                  className="text-primary-600 hover:text-primary-700 font-semibold text-lg block py-3 px-2 rounded-lg hover:bg-gray-50 transition-all duration-200 touch-manipulation"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Для бизнеса
                </Link>
              </div>
            </nav>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-3 text-base text-gray-600 mb-4 p-2">
                <Phone className="w-5 h-5" />
                <a 
                  href="tel:+79255551833" 
                  className="hover:text-primary-600 transition-colors duration-200 font-medium"
                >
                  +7 (925) 555-18-33
                </a>
              </div>
              <div className="flex items-center space-x-3 text-base text-gray-600 mb-4 p-2">
                <MapPin className="w-5 h-5" />
                <span>Москва и МО</span>
              </div>
              <div className="flex items-center space-x-3 text-base text-gray-600 mb-8 p-2">
                <Clock className="w-5 h-5" />
                <span>Работаем 24/7</span>
              </div>
              <button
                onClick={handleModalOpen}
                className="btn-primary w-full text-lg py-4 touch-manipulation"
              >
                Заказать уборку
              </button>
            </div>
          </div>
        </div>
      )}


    </header>
  );
} 