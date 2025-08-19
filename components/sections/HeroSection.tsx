'use client';

import React from 'react';
import OrderButton from '@/components/ui/OrderButton';
import { Phone, Clock, Shield, Lock, Sparkles } from 'lucide-react';
import Image from 'next/image';
import MiniCalculator from '@/components/calculators/MiniCalculator';
import { useAmoCRM } from '@/components/providers/AmoCRMProvider';

export default function HeroSection() {
  const { openModal } = useAmoCRM();
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

            <div className="flex flex-col gap-4">
              <MiniCalculator 
                defaultArea={50}
                propertyType="apartment"
                cleaningType="general"
                className="max-w-xl"
              />
              {/* Убрали дополнительный CTA, оставили только кнопку внутри мини-калькулятора */}
            </div>

            {/* Trust Indicators (иконки для лучшей читаемости) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 text-sm text-gray-700">
              <div className="inline-flex items-center gap-2 bg-white/70 border border-gray-200 rounded-lg px-3 py-2">
                <Clock className="w-4 h-4 text-green-600" aria-hidden="true" />
                <span>Работаем 24/7</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-white/70 border border-gray-200 rounded-lg px-3 py-2">
                <Shield className="w-4 h-4 text-green-600" aria-hidden="true" />
                <span>Гарантия качества</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-white/70 border border-gray-200 rounded-lg px-3 py-2">
                <Sparkles className="w-4 h-4 text-green-600" aria-hidden="true" />
                <span>Бесплатная консультация</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-white/70 border border-gray-200 rounded-lg px-3 py-2">
                <Lock className="w-4 h-4 text-green-600" aria-hidden="true" />
                <span>Без предоплаты</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-white/70 border border-gray-200 rounded-lg px-3 py-2">
                <Phone className="w-4 h-4 text-green-600" aria-hidden="true" />
                <span>Ответ за 5–10 минут</span>
              </div>
            </div>

            <div className="text-sm text-gray-500">
            Минимальный заказ — 6 000 ₽
            </div>
          </div>

          {/* Visual - только CSS градиент для LCP */}
          <div className="relative overflow-hidden">
            {/* Main Visual - только CSS градиент */}
            <div className="relative bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl p-4 shadow-2xl">
              <div className="relative aspect-[3/2] rounded-xl overflow-hidden">
                {/* Градиентный фон для момента до загрузки LCP */}
                <div className="absolute inset-0 hero-visual" />
                {/* LCP изображение через next/image */}
                <Image
                  src="/og-image.webp"
                  alt="Профессиональная уборка в Москве - K-lining"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxAAPwCdABmX/9k="
                />
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" aria-hidden="true"></div>
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