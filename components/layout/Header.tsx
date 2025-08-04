'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, MapPin, Clock, ChevronDown } from 'lucide-react';
import { useAmoCRM } from '../providers/AmoCRMProvider';
import { useThrottle } from '../../hooks/usePerformance';
import OptimizedLogo from '../ui/OptimizedLogo';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCorporateMenuOpen, setIsCorporateMenuOpen] = useState(false);
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
    { name: 'Услуги', href: '/services' },
    { name: 'Цены', href: '/prices' },
    { name: 'Калькулятор', href: '/calculator' },
    { name: 'Блог', href: '/blog' },
    { name: 'О нас', href: '/about' },
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

  const handleCorporateMenuToggle = useCallback((isOpen: boolean) => {
    setIsCorporateMenuOpen(isOpen);
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
        <div className="flex items-center justify-between h-20 md:h-24 min-h-[80px] px-4 md:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <OptimizedLogo 
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 object-contain" 
              width={64}
              height={64}
            />
            <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary-600">
              KliningPro
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 whitespace-nowrap text-sm"
              >
                {item.name}
              </Link>
            ))}
            
            {/* Corporate Menu */}
            <div className="relative">
              <button
                onMouseEnter={() => handleCorporateMenuToggle(true)}
                onMouseLeave={() => handleCorporateMenuToggle(false)}
                className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 font-semibold transition-colors duration-200"
              >
                <span>Юрлицам</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                  isCorporateMenuOpen ? 'rotate-180' : ''
                }`} />
              </button>

              {/* Mega Menu */}
              {isCorporateMenuOpen && (
                <div
                  onMouseEnter={() => handleCorporateMenuToggle(true)}
                  onMouseLeave={() => handleCorporateMenuToggle(false)}
                  className="absolute top-full left-0 mt-2 w-screen max-w-6xl bg-white border border-gray-200 rounded-lg shadow-xl"
                  style={{ left: '50%', transform: 'translateX(-50%)' }}
                >
                  <div className="p-6">
                    <div className="grid grid-cols-4 gap-8">
                      {corporateServices.map((category, index) => (
                        <div key={index}>
                          <h3 className="font-semibold text-gray-900 mb-4 text-lg">
                            {category.title}
                          </h3>
                          <ul className="space-y-2">
                            {category.services.map((service, serviceIndex) => (
                              <li key={serviceIndex}>
                                <Link
                                  href="/corporate"
                                  className="text-gray-600 hover:text-primary-600 text-sm transition-colors duration-200"
                                >
                                  {service}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    
                    {/* CTA Section */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">
                            Корпоративным клиентам
                          </h4>
                          <p className="text-sm text-gray-600">
                            Специальные условия и скидки для бизнеса
                          </p>
                        </div>
                        <button
                          onClick={openModal}
                          className="bg-primary-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                        >
                          Заказать звонок
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Contact Info & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Phone className="w-4 h-4" />
              <a 
                href="tel:+79255551833" 
                className="hover:text-primary-600 transition-colors duration-200"
              >
                +7 (925) 555-18-33
              </a>
            </div>
            <button
              onClick={openModal}
              className="btn-primary text-sm"
            >
              Заказать уборку
            </button>
          </div>



          {/* Mobile Contact & Menu */}
          <div className="md:hidden flex items-center space-x-3">
            <a 
              href="tel:+79255551833" 
              className="flex items-center space-x-2 text-sm sm:text-base text-gray-600 hover:text-primary-600 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-50"
            >
              <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="hidden sm:inline font-medium">+7 (925) 555-18-33</span>
            </a>
            <button
              onClick={handleMobileMenuToggle}
              className="p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 touch-manipulation"
              aria-label="Открыть меню"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 sm:w-7 sm:h-7" />
              ) : (
                <Menu className="w-6 h-6 sm:w-7 sm:h-7" />
              )}
            </button>
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
              
              {/* Mobile Corporate Menu */}
              <div className="border-t border-gray-200 pt-6 mt-4">
                <div className="text-primary-600 font-semibold mb-4 text-lg">Юрлицам</div>
                <div className="grid grid-cols-1 gap-6 text-base">
                  {corporateServices.slice(0, 2).map((category, index) => (
                    <div key={index}>
                      <div className="font-medium text-gray-900 mb-3 text-lg">{category.title}</div>
                      <ul className="space-y-2">
                        {category.services.slice(0, 4).map((service, serviceIndex) => (
                          <li key={serviceIndex}>
                            <Link
                              href="/corporate"
                              className="text-gray-600 hover:text-primary-600 py-2 px-2 rounded-lg hover:bg-gray-50 block transition-all duration-200 touch-manipulation"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {service}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
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