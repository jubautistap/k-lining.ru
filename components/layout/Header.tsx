'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, MapPin, Clock, ChevronDown } from 'lucide-react';
import { useAmoCRM } from '../providers/AmoCRMProvider';
import { useThrottle } from '../../hooks/usePerformance';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCorporateMenuOpen, setIsCorporateMenuOpen] = useState(false);
  const { openModal } = useAmoCRM();

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 10);
  }, []);

  const throttledHandleScroll = useThrottle(handleScroll, 100);

  useEffect(() => {
    window.addEventListener('scroll', throttledHandleScroll);
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, [throttledHandleScroll]);

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
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center">
              <img src="/logo.png" alt="KliningPro" className="w-8 h-8 object-contain" />
            </div>
            <span className="text-xl md:text-2xl font-bold text-primary-600">
              KliningPro
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
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
          <div className="hidden lg:flex items-center space-x-4">
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
          <div className="lg:hidden flex items-center space-x-2">
            <a 
              href="tel:+79255551833" 
              className="flex items-center space-x-1 text-sm text-gray-600 hover:text-primary-600 transition-colors duration-200"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">+7 (925) 555-18-33</span>
            </a>
            <button
              onClick={handleMobileMenuToggle}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="container-custom py-4">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-primary-600 font-medium py-2 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Corporate Menu */}
              <div className="border-t border-gray-200 pt-4">
                <div className="text-primary-600 font-semibold mb-4">Юрлицам</div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {corporateServices.slice(0, 2).map((category, index) => (
                    <div key={index}>
                      <div className="font-medium text-gray-900 mb-2">{category.title}</div>
                      <ul className="space-y-1">
                        {category.services.slice(0, 4).map((service, serviceIndex) => (
                          <li key={serviceIndex}>
                            <Link
                              href="/corporate"
                              className="text-gray-600 hover:text-primary-600"
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
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                <Phone className="w-4 h-4" />
                <a 
                  href="tel:+79255551833" 
                  className="hover:text-primary-600 transition-colors duration-200"
                >
                  +7 (925) 555-18-33
                </a>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                <MapPin className="w-4 h-4" />
                <span>Москва и МО</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
                <Clock className="w-4 h-4" />
                <span>Работаем 24/7</span>
              </div>
              <button
                onClick={handleModalOpen}
                className="btn-primary w-full"
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