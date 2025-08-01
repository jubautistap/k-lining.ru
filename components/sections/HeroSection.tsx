'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Clock, Shield, Zap } from 'lucide-react';
import { useAmoCRM } from '@/components/providers/AmoCRMProvider';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  const { openModal } = useAmoCRM();

  const features = [
    {
      icon: Clock,
      text: 'Работаем 24/7',
      description: 'В любое время дня и ночи'
    },
    {
      icon: Shield,
      text: 'Честные цены',
      description: 'Без скрытых доплат'
    },
    {
      icon: Zap,
      text: 'Быстро и качественно',
      description: 'Результат за 2-4 часа'
    },
    {
      icon: CheckCircle,
      text: 'Гарантия качества',
      description: 'Переделаем, если не понравится'
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-bounce-gentle"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-secondary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-bounce-gentle animation-delay-200"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-accent-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-bounce-gentle animation-delay-400"></div>
      </div>

      <div className="container-custom relative z-10 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6"
            >
              <span className="inline-block bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                🚀 Новая компания в Москве
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            >
              Профессиональная{' '}
              <span className="text-gradient">уборка</span>{' '}
              в Москве
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-xl text-gray-600 mb-8 leading-relaxed"
            >
              Мы <strong>честно</strong> говорим: мы новая компания, но делаем уборку{' '}
              <strong>быстро, качественно и профессионально</strong>. 
              Никаких пустых обещаний — только реальные результаты.
            </motion.p>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="grid grid-cols-2 gap-4 mb-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-white/50 backdrop-blur-sm"
                >
                  <feature.icon className="w-5 h-5 text-primary-600 flex-shrink-0" />
                  <div className="text-left">
                    <div className="font-semibold text-gray-900 text-sm">
                      {feature.text}
                    </div>
                    <div className="text-gray-600 text-xs">
                      {feature.description}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button
                onClick={openModal}
                className="btn-primary text-lg px-8 py-4"
              >
                Заказать уборку сейчас
              </button>
              <Link href="/prices" className="btn-secondary text-lg px-8 py-4">
                Узнать цены
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="mt-8 text-sm text-gray-500"
            >
              <div className="flex items-center justify-center space-x-4">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-primary-600 rounded-full flex items-center justify-center">
                    <svg className="w-1.5 h-1.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Работаем по договору</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-primary-600 rounded-full flex items-center justify-center">
                    <svg className="w-1.5 h-1.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Оплата после уборки</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-primary-600 rounded-full flex items-center justify-center">
                    <svg className="w-1.5 h-1.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Без предоплаты</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Image */}
              <div className="relative bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl p-4 shadow-2xl">
                <div className="aspect-[3/2] bg-gradient-to-br from-primary-200 to-secondary-200 rounded-xl overflow-hidden">
                  <Image
                    src="/hero.PNG"
                    alt="Профессиональная уборка - KliningPro"
                    width={800}
                    height={533}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Онлайн</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">24/7</div>
                  <div className="text-xs text-gray-600">Поддержка</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 