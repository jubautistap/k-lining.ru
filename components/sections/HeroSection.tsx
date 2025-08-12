'use client';

import React from 'react';
import OrderButton from '@/components/ui/OrderButton';
import { Phone, MessageCircle } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="section-padding bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight break-words">
                Профессиональная{' '}
                <span className="text-gradient break-words">
                  уборка
                </span>{' '}
                в Москве
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Быстро, качественно, честно. Работаем 24/7 без выходных. 
                Уборка квартир, офисов, химчистка мебели. Гарантия качества.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <OrderButton 
                service="general"
                className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
              >
                Заказать уборку
              </OrderButton>
              
              <a
                href="tel:+79255551833"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-primary-600 text-primary-600 font-semibold rounded-lg hover:bg-primary-600 hover:text-white transition-colors duration-200 text-base sm:text-lg"
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                +7 (925) 555-18-33
              </a>

              <a
                href="https://wa.me/79255551833?text=%D0%A5%D0%BE%D1%87%D1%83%20%D0%BA%D0%BE%D0%BD%D1%81%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%86%D0%B8%D1%8E%20%D0%BF%D0%BE%20%D1%83%D1%81%D0%BB%D1%83%D0%B3%D0%B0%D0%BC%20%D1%83%D0%B1%D0%BE%D1%80%D0%BA%D0%B8"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-green-600 text-green-600 font-semibold rounded-lg hover:bg-green-600 hover:text-white transition-colors duration-200 text-base sm:text-lg"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                WhatsApp
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-sm text-gray-600">
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
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Без предоплаты</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Ответ за 5–10 минут</span>
              </div>
            </div>
          </div>

          {/* Visual - только CSS градиент для LCP */}
          <div className="relative overflow-hidden">
            {/* Main Visual - только CSS градиент */}
            <div className="relative bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl p-4 shadow-2xl">
              <div className="aspect-[3/2] bg-gradient-to-br from-primary-200 to-secondary-200 rounded-xl overflow-hidden relative">
                {/* Красивый CSS градиент как основной элемент */}
                <div className="absolute inset-0 hero-visual"></div>
                
                {/* Fallback изображение для SEO */}
                <img 
                  src="/og-image.webp" 
                  alt="Профессиональная уборка в Москве - K-lining"
                  className="absolute inset-0 w-full h-full object-cover opacity-100"
                  loading="eager"
                />
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