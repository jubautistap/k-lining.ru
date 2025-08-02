'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Home, Building, Sparkles, Sun, Shield, CheckCircle, Car, Hotel, School, Store, Factory, Star } from 'lucide-react';
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
  const [result, setResult] = useState<CalculationResult | null>(null);

  // Базовые цены за м² (обновленные с учетом минимального заказа 6000 руб)
  const basePrices = useMemo(() => ({
    apartment: {
      maintenance: 60, // 3,000 / 50 м²
      general: 100, // 5,000 / 50 м²
      postRenovation: 140, // 7,000 / 50 м²
      eco: 120, // 6,000 / 50 м²
      vip: 200 // 10,000 / 50 м²
    },
    house: {
      maintenance: 120, // 6,000 / 50 м²
      general: 200, // 10,000 / 50 м²
      postRenovation: 280, // 14,000 / 50 м²
      eco: 240, // 12,000 / 50 м²
      vip: 400 // 20,000 / 50 м²
    },
    office: {
      maintenance: 80, // 4,000 / 50 м²
      general: 140, // 7,000 / 50 м²
      postRenovation: 200, // 10,000 / 50 м²
      eco: 160, // 8,000 / 50 м²
      vip: 300 // 15,000 / 50 м²
    },
    commercial: {
      maintenance: 70, // 3,500 / 50 м²
      general: 120, // 6,000 / 50 м²
      postRenovation: 180, // 9,000 / 50 м²
      eco: 140, // 7,000 / 50 м²
      vip: 250 // 12,500 / 50 м²
    }
  }), []);

  // Расширенный список дополнительных услуг
  const additionalServicesList = useMemo(() => [
    { id: 'windows', name: 'Мытье окон', price: 600, icon: Sun },
    { id: 'sofa', name: 'Химчистка дивана', price: 3000, icon: Sparkles },
    { id: 'carpet', name: 'Химчистка ковра', price: 1800, icon: Sparkles },
    { id: 'balcony', name: 'Уборка балкона', price: 1200, icon: Home },
    { id: 'fridge', name: 'Мытье холодильника', price: 1000, icon: Home },
    { id: 'wardrobe', name: 'Уборка шкафов', price: 1500, icon: Home },
    { id: 'mattress', name: 'Химчистка матраса', price: 2500, icon: Sparkles },
    { id: 'curtains', name: 'Химчистка штор', price: 2000, icon: Sparkles },
    { id: 'furniture', name: 'Химчистка мягкой мебели', price: 3500, icon: Sparkles },
    { id: 'kitchen', name: 'Уборка кухни', price: 2000, icon: Home },
    { id: 'bathroom', name: 'Уборка санузлов', price: 1500, icon: Home },
    { id: 'pet_hair', name: 'Уборка шерсти животных', price: 1000, icon: Home },
    { id: 'disinfection', name: 'Дезинфекция', price: 2500, icon: Shield },
    { id: 'night', name: 'Ночная уборка', price: 3000, icon: Sun },
    { id: 'express', name: 'Срочная уборка', price: 2000, icon: Sparkles }
  ], []);

  // Расчет времени работы (реалистичный)
  const calculateDuration = (area: number, cleaningType: string, propertyType: string) => {
    let baseHours = 0;
    
    // Базовое время в зависимости от типа уборки
    switch (cleaningType) {
      case 'maintenance':
        baseHours = Math.max(2, Math.ceil(area / 25)); // 25 м² за час
        break;
      case 'general':
        baseHours = Math.max(3, Math.ceil(area / 20)); // 20 м² за час
        break;
      case 'postRenovation':
        baseHours = Math.max(4, Math.ceil(area / 15)); // 15 м² за час
        break;
      case 'eco':
        baseHours = Math.max(3, Math.ceil(area / 18)); // 18 м² за час
        break;
      case 'vip':
        baseHours = Math.max(4, Math.ceil(area / 12)); // 12 м² за час
        break;
    }
    
    // Множитель для типа помещения
    let multiplier = 1;
    switch (propertyType) {
      case 'house':
        multiplier = 1.3; // Дома сложнее
        break;
      case 'office':
        multiplier = 0.9; // Офисы проще
        break;
      case 'commercial':
        multiplier = 1.1; // Коммерческие помещения
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

    let totalPrice = basePrice + additionalPrice;
    
    // Минимальный заказ 6000 руб
    if (totalPrice < 6000) {
      totalPrice = 6000;
    }

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
  }, [propertyType, area, cleaningType, additionalServices, additionalServicesList, basePrices, serviceNames]);

  const handleServiceToggle = (serviceId: string) => {
    setAdditionalServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
          <Calculator className="w-6 h-6 text-primary-600" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">
            Расчет стоимости услуг
          </h3>
          <p className="text-gray-600">
            Рассчитайте примерную стоимость уборки онлайн
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Левая колонка - Настройки */}
        <div className="space-y-6">
          {/* Тип помещения */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Тип помещения
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'apartment', name: 'Квартира', icon: Home },
                { id: 'house', name: 'Дом', icon: Building },
                { id: 'office', name: 'Офис', icon: Building },
                { id: 'commercial', name: 'Коммерческое', icon: Store }
              ].map((type) => (
                <button
                  key={type.id}
                  onClick={() => setPropertyType(type.id as any)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    propertyType === type.id
                      ? 'border-primary-600 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                >
                  <type.icon className="w-6 h-6 mx-auto mb-2" />
                  <span className="text-sm font-medium">{type.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Площадь */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Площадь помещения
            </label>
            <div className="space-y-3">
              {/* Быстрый выбор */}
              <div className="grid grid-cols-3 gap-2">
                {[50, 100, 200].map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setArea(size);
                      setCustomArea(size.toString());
                    }}
                    className={`p-2 rounded-lg border-2 transition-all duration-200 text-sm ${
                      area === size
                        ? 'border-primary-600 bg-primary-50 text-primary-700'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    {size} м²
                  </button>
                ))}
              </div>
              
              {/* Кастомный ввод */}
              <div>
                <label className="block text-xs text-gray-600 mb-2">
                  Или введите точную площадь:
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    min="1"
                    max="5000"
                    value={customArea}
                    onChange={(e) => handleAreaChange(e.target.value)}
                    placeholder="Например: 150"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  />
                  <span className="text-sm text-gray-500">м²</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Максимум: 5,000 м²
                </div>
              </div>
            </div>
          </div>

          {/* Тип уборки */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Тип уборки
            </label>
            <div className="space-y-3">
              {[
                { id: 'maintenance', name: 'Поддерживающая', icon: Home },
                { id: 'general', name: 'Генеральная', icon: Shield },
                { id: 'postRenovation', name: 'После ремонта', icon: Sparkles },
                { id: 'eco', name: 'Эко уборка', icon: CheckCircle },
                { id: 'vip', name: 'VIP уборка', icon: Star }
              ].map((type) => (
                <button
                  key={type.id}
                  onClick={() => setCleaningType(type.id as any)}
                  className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                    cleaningType === type.id
                      ? 'border-primary-600 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <type.icon className="w-5 h-5" />
                    <span className="font-medium">{type.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Дополнительные услуги */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Дополнительные услуги
            </label>
            <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto">
              {additionalServicesList.map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleServiceToggle(service.id)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                    additionalServices.includes(service.id)
                      ? 'border-primary-600 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <service.icon className="w-4 h-4" />
                      <span className="text-sm">{service.name}</span>
                    </div>
                    <span className="text-sm font-medium">{service.price} ₽</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Правая колонка - Результат */}
        <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            Результат расчета
          </h4>

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* Основная услуга */}
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">
                    {result.services[0]}
                  </span>
                  <span className="text-lg font-bold text-primary-600">
                    {result.basePrice.toLocaleString()} ₽
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  Площадь: {area} м² • Время: {result.duration}
                </div>
              </div>

              {/* Дополнительные услуги */}
              {result.services.slice(1).map((service, index) => (
                <div key={index} className="bg-white rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{service}</span>
                    <span className="text-lg font-bold text-primary-600">
                      {additionalServicesList.find(s => s.name === service)?.price.toLocaleString()} ₽
                    </span>
                  </div>
                </div>
              ))}

              {/* Итого */}
              <div className="bg-primary-600 text-white rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">Итого:</span>
                  <span className="text-2xl font-bold">
                    {result.totalPrice.toLocaleString()} ₽
                  </span>
                </div>
                <div className="text-sm opacity-90 mt-1">
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
                className="w-full btn-primary py-4 text-lg font-semibold"
              >
                Заказать уборку
              </button>

              {/* Информация */}
              <div className="text-center text-sm text-gray-600 space-y-2">
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 bg-primary-600 rounded-full flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Расчет примерный</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 bg-primary-600 rounded-full flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Окончательная цена после осмотра</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 bg-primary-600 rounded-full flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Минимальный заказ: 6,000 ₽</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 bg-primary-600 rounded-full flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Время работы зависит от сложности</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
} 