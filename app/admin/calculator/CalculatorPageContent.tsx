'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import CalculatorErrorBoundary from '@/components/CalculatorErrorBoundary';
import { 
  Calculator, 
  Home, 
  Building, 
  Sparkles, 
  Sun, 
  Shield, 
  CheckCircle, 
  Store, 
  Star,
  Users,
  DollarSign,
  TrendingUp,
  Target,
  Zap,
  Clock,
  Award
} from 'lucide-react';

interface CalculationResult {
  basePrice: number;
  additionalServices: number;
  totalPrice: number;
  duration: string;
  services: string[];
  profit: number;
  costs: number;
  margin: number;
}

export default function CalculatorPage() {
  const [propertyType, setPropertyType] = useState<'apartment' | 'house' | 'office' | 'commercial'>('apartment');
  const [area, setArea] = useState<number>(50);
  const [customArea, setCustomArea] = useState<string>('');
  const [cleaningType, setCleaningType] = useState<'maintenance' | 'general' | 'postRenovation' | 'eco' | 'vip'>('maintenance');
  const [additionalServices, setAdditionalServices] = useState<string[]>([]);
  const [isNightMode, setIsNightMode] = useState(false);
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [leadId, setLeadId] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [managerNote, setManagerNote] = useState<string>('');

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
    { id: 'express', name: 'Срочная уборка', price: 2000, icon: Zap }
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

  // Расчет стоимости и прибыли
  useEffect(() => {
    let basePrice = basePrices[propertyType][cleaningType] * area;
    let additionalPrice = additionalServices.reduce((sum, serviceId) => {
      const service = additionalServicesList.find(s => s.id === serviceId);
      return sum + (service?.price || 0);
    }, 0);

    // Применяем специальные режимы
    if (isNightMode) {
      basePrice *= 1.3; // +30% за ночной режим
      additionalPrice *= 1.3;
    }
    
    if (isEmergencyMode) {
      basePrice *= 1.5; // +50% за экстренный режим
      additionalPrice *= 1.5;
    }

    let totalPrice = basePrice + additionalPrice;
    
    // Минимальный заказ 6000 руб
    if (totalPrice < 6000) {
      totalPrice = 6000;
    }

    const duration = calculateDuration(area, cleaningType, propertyType);

    // Расчет затрат и прибыли
    const laborCost = Math.ceil(basePrice * 0.4); // 40% на зарплату
    const materialCost = Math.ceil(basePrice * 0.15); // 15% на материалы
    const overheadCost = Math.ceil(basePrice * 0.1); // 10% на накладные расходы
    const totalCosts = laborCost + materialCost + overheadCost;
    const profit = totalPrice - totalCosts;
    const margin = totalPrice > 0 ? Math.round((profit / totalPrice) * 100) : 0;

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
      ],
      profit,
      costs: totalCosts,
      margin
    });
  }, [propertyType, area, cleaningType, additionalServices, isNightMode, isEmergencyMode, additionalServicesList, basePrices, serviceNames]);

  const handleServiceToggle = (serviceId: string) => {
    setAdditionalServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  return (
    <CalculatorErrorBoundary calculatorType="admin">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Админ калькулятор
          </h1>
          <p className="text-gray-600">
            Полный расчет всех затрат, прибыли и ценообразования для клининговых услуг
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Левая колонка - Параметры */}
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

              {/* Специальные режимы */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Специальные режимы
                </label>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-primary-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isNightMode}
                      onChange={(e) => setIsNightMode(e.target.checked)}
                      className="text-primary-600 rounded"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">Ночной режим</div>
                      <div className="text-sm text-gray-600">+30% к стоимости (работа с 22:00 до 6:00)</div>
                    </div>
                  </label>
                  
                  <label className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-primary-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isEmergencyMode}
                      onChange={(e) => setIsEmergencyMode(e.target.checked)}
                      className="text-primary-600 rounded"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">Экстренный режим</div>
                      <div className="text-sm text-gray-600">+50% к стоимости (выезд в течение 1-2 часов)</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Средняя колонка - Дополнительные услуги */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Дополнительные услуги
                </label>
                <div className="grid grid-cols-1 gap-2 max-h-80 overflow-y-auto">
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

              {/* Сотрудники */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Сотрудники
                </label>
                <div className="space-y-3">
                  <div className="p-4 rounded-lg border-2 border-primary-600 bg-primary-50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <input type="radio" checked className="text-primary-600" />
                        <span className="font-medium">Уборщица (фрилансер)</span>
                      </div>
                      <div className="text-sm text-gray-600">20 м²/час</div>
                    </div>
                    <div className="text-sm text-gray-600">
                      Стоимость: 500 ₽/час
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Правая колонка - Результаты */}
            <div className="space-y-6">
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Основная услуга */}
                  <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      Результат расчета
                    </h4>
                    <div className="space-y-4">
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
                        {(isNightMode || isEmergencyMode) && (
                          <div className="mt-2 text-xs text-gray-500">
                            {isNightMode && <div>🌙 Ночной режим (+30%)</div>}
                            {isEmergencyMode && <div>⚡ Экстренный режим (+50%)</div>}
                          </div>
                        )}
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
                    </div>
                  </div>

                  {/* Финансовый анализ */}
                  <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Финансовый анализ
                    </h4>
                    <div className="space-y-4">
                      <div className="bg-white rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">Выручка:</span>
                          <span className="text-lg font-bold text-green-600">{result.totalPrice.toLocaleString()} ₽</span>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">Затраты:</span>
                          <span className="text-lg font-bold text-red-600">{result.costs.toLocaleString()} ₽</span>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div>• Зарплата: {Math.ceil(result.basePrice * 0.4).toLocaleString()} ₽</div>
                          <div>• Материалы: {Math.ceil(result.basePrice * 0.15).toLocaleString()} ₽</div>
                          <div>• Накладные: {Math.ceil(result.basePrice * 0.1).toLocaleString()} ₽</div>
                        </div>
                      </div>

                      <div className="bg-green-600 text-white rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-semibold">Прибыль:</span>
                          <span className="text-2xl font-bold">
                            {result.profit.toLocaleString()} ₽
                          </span>
                        </div>
                        <div className="text-sm opacity-90 mt-1">
                          Маржинальность: {result.margin}%
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Конверсия → заказ */}
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Оформление заказа</h4>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="ID лида (опционально)"
                        value={leadId}
                        onChange={(e) => setLeadId(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Имя клиента"
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        />
                        <input
                          type="tel"
                          placeholder="Телефон"
                          value={clientPhone}
                          onChange={(e) => setClientPhone(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <textarea
                        placeholder="Заметка менеджера"
                        value={managerNote}
                        onChange={(e) => setManagerNote(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        rows={3}
                      />
                      <button
                        onClick={async () => {
                          if (!result) return;
                          try {
                            const res = await fetch('/api/admin/orders', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              credentials: 'include',
                              body: JSON.stringify({
                                leadId: leadId || undefined,
                                service_type: serviceNames[cleaningType],
                                area,
                                price: result.totalPrice,
                                notes: managerNote,
                              }),
                            });
                            if (res.ok) {
                              alert('Заказ оформлен и заявка обновлена');
                              setLeadId('');
                              setManagerNote('');
                            } else {
                              const data = await res.json();
                              alert(`Ошибка оформления: ${data.error || 'неизвестно'}`);
                            }
                          } catch (err) {
                            alert('Ошибка сети при оформлении заказа');
                          }
                        }}
                        className="btn-primary w-full"
                      >
                        Закрыть на {result.totalPrice.toLocaleString()} ₽
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </CalculatorErrorBoundary>
  );
} 