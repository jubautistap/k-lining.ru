'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import OrderButton from '@/components/ui/OrderButton';

export default function HeroSection() {
  useEffect(() => {
    // Загружаем изображение после рендера для улучшения LCP
    const container = document.getElementById('hero-image-container');
    if (container) {
      const img = new window.Image();
      img.src = '/og-image.jpg';
      img.alt = 'K-lining профессиональная уборка квартир и офисов в Москве - быстро качественно честно';
      img.className = 'w-full h-full object-cover opacity-0 transition-opacity duration-500';
      img.onload = () => {
        img.classList.remove('opacity-0');
      };
      container.appendChild(img);
    }
  }, []);

  return (
    <section className="section-padding bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Профессиональная{' '}
                <motion.span 
                  className="text-gradient"
                  animate={{ 
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                >
                  уборка
                </motion.span>{' '}
                в Москве
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Быстро, качественно, честно. Работаем 24/7 без выходных. 
                Уборка квартир, офисов, химчистка мебели. Гарантия качества.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <OrderButton 
                service="general"
                className="text-lg px-8 py-4"
              >
                Заказать уборку
              </OrderButton>
              
              <a
                href="tel:+79255551833"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary-600 text-primary-600 font-semibold rounded-lg hover:bg-primary-600 hover:text-white transition-colors duration-200 text-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +7 (925) 555-18-33
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Работаем 24/7</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Гарантия качества</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Бесплатная консультация</span>
              </div>
            </div>
          </div>

          {/* Image - загружается после LCP */}
          <div className="relative">
            {/* Main Image - только CSS градиент для LCP */}
            <div className="relative bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl p-4 shadow-2xl">
              <div className="aspect-[3/2] bg-gradient-to-br from-primary-200 to-secondary-200 rounded-xl overflow-hidden relative">
                {/* CSS градиент как основной элемент */}
                <div className="absolute inset-0 hero-gradient"></div>
                
                {/* Изображение загружается через useEffect */}
                <div id="hero-image-container" className="w-full h-full"></div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">Онлайн</span>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">24/7</div>
                <div className="text-xs text-gray-600">Поддержка</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 