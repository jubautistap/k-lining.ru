'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Calculator, 
  Home, 
  Building, 
  Store,
  Shield, 
  Sparkles, 
  CheckCircle, 
  Star,
  Clock,
  Zap,
  Moon,
  AlertTriangle,
  Phone,
  ArrowRight
} from 'lucide-react';
import { useAmoCRM } from '../providers/AmoCRMProvider';

interface CalculationResult {
  basePrice: number;
  additionalServices: number;
  totalPrice: number;
  duration: string;
  services: string[];
}

export default function CleaningCalculator() {
  const { openModal } = useAmoCRM();
  const [propertyType, setPropertyType] = useState<'apartment' | 'house' | 'office' | 'commercial'>('apartment');
  const [area, setArea] = useState<number>(50);
  const [customArea, setCustomArea] = useState<string>('');
  const [cleaningType, setCleaningType] = useState<'maintenance' | 'general' | 'postRenovation' | 'eco' | 'vip'>('maintenance');
  const [additionalServices, setAdditionalServices] = useState<string[]>([]);
  const [specialModes, setSpecialModes] = useState<string[]>([]);
  const [result, setResult] = useState<CalculationResult | null>(null);

  // Базовые цены за м²
  const basePrices = useMemo(() => ({
    apartment: {
      maintenance: 60,
      general: 100,
      postRenovation: 140,
      eco: 120,
      vip: 200
    },
    house: {
      maintenance: 120,
      general: 200,
      postRenovation: 280,
      eco: 240,
      vip: 400
    },
    office: {
      maintenance: 80,
      general: 140,
      postRenovation: 200,
      eco: 160,
      vip: 300
    },
    commercial: {
      maintenance: 70,
      general: 120,
      postRenovation: 180,
      eco: 140,
      vip: 250
    }
  }), []);

  // Дополнительные услуги
  const additionalServicesList = useMemo(() => [
    { id: 'windows', name: 'Мытье окон', price: 1500, icon: Sparkles },
    { id: 'kitchen', name: 'Уборка кухни', price: 2000, icon: Home },
    { id: 'bathroom', name: 'Уборка санузла', price: 1500, icon: Shield },
    { id: 'balcony', name: 'Уборка балкона', price: 1000, icon: Building },
    { id: 'fridge', name: 'Мытье холодильника', price: 800, icon: Home },
    { id: 'oven', name: 'Чистка духовки', price: 1200, icon: Home },
    { id: 'disinfection', name: 'Дезинфекция', price: 3000, icon: Shield },
    { id: 'carpet', name: 'Химчистка ковра', price: 2500, icon: Sparkles }
  ], []);

  // Специальные режимы
  const specialModesList = useMemo(() => [
    { id: 'express', name: 'Экспресс уборка', description: 'Быстрая уборка за 2-3 часа', multiplier: 1.3, icon: '⚡' },
    { id: 'night', name: 'Ночная уборка', description: 'Работа в ночное время', multiplier: 1.5, icon: '🌙' },
    { id: 'weekend', name: 'Выходной день', description: 'Уборка в выходные', multiplier: 1.2, icon: '📅' },
    { id: 'urgent', name: 'Срочный выезд', description: 'Выезд в течение часа', multiplier: 1.4, icon: '🚨' }
  ], []);

  // Расчет времени работы
  const calculateDuration = (area: number, cleaningType: string, propertyType: string) => {
    let baseHours = 0;
    
    switch (cleaningType) {
      case 'maintenance':
        baseHours = Math.max(2, Math.ceil(area / 25));
        break;
      case 'general':
        baseHours = Math.max(3, Math.ceil(area / 20));
        break;
      case 'postRenovation':
        baseHours = Math.max(4, Math.ceil(area / 15));
        break;
      case 'eco':
        baseHours = Math.max(3, Math.ceil(area / 18));
        break;
      case 'vip':
        baseHours = Math.max(4, Math.ceil(area / 12));
        break;
    }
    
    let multiplier = 1;
    switch (propertyType) {
      case 'house':
        multiplier = 1.3;
        break;
      case 'office':
        multiplier = 0.9;
        break;
      case 'commercial':
        multiplier = 1.1;
        break;
    }
    
    const totalHours = Math.ceil(baseHours * multiplier);
    
    if (totalHours <= 4) {
      return `${totalHours} часа`;
    } else if (totalHours <= 8) {
      return `${totalHours} часов`;
    } else {
      return `${totalHours} часов (работа в несколько смен)`;
    }
  };

  // Названия услуг
  const serviceNames = useMemo(() => ({
    maintenance: 'Поддерживающая уборка',
    general: 'Генеральная уборка',
    postRenovation: 'После ремонта',
    eco: 'Эко уборка',
    vip: 'VIP уборка'
  }), []);

  // Обработка ввода площади
  const handleAreaChange = (value: string) => {
    setCustomArea(value);
    const numValue = parseInt(value) || 0;
    if (numValue > 0 && numValue <= 5000) {
      setArea(numValue);
    }
  };

  // Расчет стоимости
  useEffect(() => {
    const basePrice = basePrices[propertyType][cleaningType] * area;
    const additionalPrice = additionalServices.reduce((sum, serviceId) => {
      const service = additionalServicesList.find(s => s.id === serviceId);
      return sum + (service?.price || 0);
    }, 0);

    let baseTotal = basePrice + additionalPrice;
    
    if (baseTotal < 6000) {
      baseTotal = 6000;
    }

    let specialModeMultiplier = 1;
    specialModes.forEach(modeId => {
      const mode = specialModesList.find(m => m.id === modeId);
      if (mode) {
        specialModeMultiplier *= mode.multiplier;
      }
    });

    const totalPrice = baseTotal * specialModeMultiplier;
    const duration = calculateDuration(area, cleaningType, propertyType);

    setResult({
      basePrice: basePrice < 6000 ? 6000 : basePrice,
      additionalServices: additionalPrice,
      totalPrice,
      duration,
      services: [
        serviceNames[cleaningType],
        ...additionalServices.map(id => 
          additionalServicesList.find(s => s.id === id)?.name || ''
        ).filter(Boolean)
      ]
    });
  }, [propertyType, area, cleaningType, additionalServices, specialModes, additionalServicesList, specialModesList, basePrices, serviceNames]);

  const handleServiceToggle = (serviceId: string) => {
    setAdditionalServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleSpecialModeToggle = (modeId: string) => {
    setSpecialModes(prev => 
      prev.includes(modeId) 
        ? prev.filter(id => id !== modeId)
        : [...prev, modeId]
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Современный дизайн с карточками */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Левая колонка - Настройки */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Тип помещения */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Building className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Тип помещения</h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { id: 'apartment', name: 'Квартира', icon: Home, color: 'blue' },
                { id: 'house', name: 'Дом', icon: Building, color: 'green' },
                { id: 'office', name: 'Офис', icon: Building, color: 'purple' },
                { id: 'commercial', name: 'Коммерческое', icon: Store, color: 'orange' }
              ].map((type) => (
                <button
                  key={type.id}
                  onClick={() => setPropertyType(type.id as any)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
                    propertyType === type.id
                      ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <type.icon className={`w-6 h-6 mx-auto mb-2 ${
                    propertyType === type.id ? 'text-blue-600' : 'text-gray-600'
                  }`} />
                  <span className="text-sm font-medium block text-center">{type.name}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Площадь */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Calculator className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Площадь помещения</h3>
            </div>
            
            <div className="space-y-4">
              {/* Быстрый выбор */}
              <div className="grid grid-cols-3 gap-3">
                {[50, 100, 200].map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setArea(size);
                      setCustomArea(size.toString());
                    }}
                    className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                      area === size
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <span className="text-lg font-bold">{size}</span>
                    <span className="text-sm block">м²</span>
                  </button>
                ))}
              </div>
              
              {/* Кастомный ввод */}
              <div className="bg-gray-50 rounded-xl p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Или введите точную площадь:
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="number"
                    min="1"
                    max="5000"
                    value={customArea}
                    onChange={(e) => handleAreaChange(e.target.value)}
                    placeholder="Например: 150"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  />
                  <span className="text-sm text-gray-500 font-medium">м²</span>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  Максимум: 5,000 м²
                </div>
              </div>
            </div>
          </motion.div>

          {/* Тип уборки */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Тип уборки</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { id: 'maintenance', name: 'Поддерживающая', icon: Home, desc: 'Регулярная уборка' },
                { id: 'general', name: 'Генеральная', icon: Shield, desc: 'Глубокая уборка' },
                { id: 'postRenovation', name: 'После ремонта', icon: Sparkles, desc: 'Уборка строительной пыли' },
                { id: 'eco', name: 'Эко уборка', icon: CheckCircle, desc: 'Безопасные средства' },
                { id: 'vip', name: 'VIP уборка', icon: Star, desc: 'Премиум сервис' }
              ].map((type) => (
                <button
                  key={type.id}
                  onClick={() => setCleaningType(type.id as any)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 text-left hover:shadow-md ${
                    cleaningType === type.id
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <type.icon className="w-5 h-5" />
                    <div>
                      <div className="font-medium">{type.name}</div>
                      <div className="text-xs opacity-75">{type.desc}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Дополнительные услуги */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Дополнительные услуги</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
              {additionalServicesList.map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleServiceToggle(service.id)}
                  className={`p-3 rounded-xl border-2 transition-all duration-200 text-left hover:shadow-md ${
                    additionalServices.includes(service.id)
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <service.icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{service.name}</span>
                    </div>
                    <span className="text-sm font-bold">{service.price} ₽</span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Специальные режимы */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Специальные режимы</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {specialModesList.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => handleSpecialModeToggle(mode.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 text-left hover:shadow-md ${
                    specialModes.includes(mode.id)
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-200 hover:border-red-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{mode.icon}</span>
                      <div>
                        <div className="font-medium">{mode.name}</div>
                        <div className="text-xs opacity-75">{mode.description}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-red-600">
                        +{Math.round((mode.multiplier - 1) * 100)}%
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Правая колонка - Результат */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-1"
        >
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-xl p-6 text-white sticky top-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Calculator className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold">Результат расчета</h3>
            </div>

            {result ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4"
              >
                {/* Основная услуга */}
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">
                      {result.services[0]}
                    </span>
                    <span className="text-xl font-bold">
                      {result.basePrice.toLocaleString()} ₽
                    </span>
                  </div>
                  <div className="text-sm opacity-90">
                    Площадь: {area} м² • Время: {result.duration}
                  </div>
                </div>

                {/* Дополнительные услуги */}
                {result.services.slice(1).map((service, index) => (
                  <div key={index} className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{service}</span>
                      <span className="text-lg font-bold">
                        {additionalServicesList.find(s => s.name === service)?.price.toLocaleString()} ₽
                      </span>
                    </div>
                  </div>
                ))}

                {/* Итого */}
                <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm border border-white/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-semibold">Итого:</span>
                    <span className="text-3xl font-bold">
                      {result.totalPrice.toLocaleString()} ₽
                    </span>
                  </div>
                  <div className="text-sm opacity-90">
                    Время работы: {result.duration}
                  </div>
                  {result.totalPrice === 6000 && (
                    <div className="text-xs opacity-90 mt-1">
                      * Минимальная стоимость заказа
                    </div>
                  )}
                </div>

                {/* Кнопка заказа */}
                <button 
                  onClick={openModal}
                  className="w-full bg-white text-blue-600 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
                >
                  <Phone className="w-5 h-5" />
                  <span>Заказать уборку</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                {/* Информация */}
                <div className="space-y-3 text-sm opacity-90">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                    <span>Расчет примерный</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                    <span>Окончательная цена после осмотра</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                    <span>Минимальный заказ: 6,000 ₽</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                    <span>Время работы зависит от сложности</span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calculator className="w-8 h-8" />
                </div>
                <p className="text-lg font-medium mb-2">Выберите параметры</p>
                <p className="text-sm opacity-75">для расчета стоимости</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 