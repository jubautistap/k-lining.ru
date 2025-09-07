'use client';

import { useState, useEffect, useMemo } from 'react';

export interface CalculationResult {
  basePrice: number;
  additionalServices: number;
  totalPrice: number;
  duration: string;
  services: string[];
  profit: number;
  costs: number;
  margin: number;
}

export function useCalculator() {
  const [propertyType, setPropertyType] = useState<'apartment' | 'house' | 'office' | 'commercial'>('apartment');
  const [area, setArea] = useState<number>(50);
  const [customArea, setCustomArea] = useState<string>('50');
  const [cleaningType, setCleaningType] = useState<'maintenance' | 'general' | 'postRenovation' | 'eco' | 'vip'>('maintenance');
  const [additionalServices, setAdditionalServices] = useState<string[]>([]);
  const [isNightMode, setIsNightMode] = useState(false);
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [leadId, setLeadId] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [managerNote, setManagerNote] = useState<string>('');

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

  const additionalServicesList = useMemo(() => [
    { id: 'windows', name: 'Мытье окон', price: 600 },
    { id: 'sofa', name: 'Химчистка дивана', price: 3000 },
    { id: 'carpet', name: 'Химчистка ковра', price: 1800 },
    { id: 'balcony', name: 'Уборка балкона', price: 1200 },
    { id: 'fridge', name: 'Мытье холодильника', price: 1000 },
    { id: 'wardrobe', name: 'Уборка шкафов', price: 1500 },
    { id: 'mattress', name: 'Химчистка матраса', price: 2500 },
    { id: 'curtains', name: 'Химчистка штор', price: 2000 },
    { id: 'furniture', name: 'Химчистка мягкой мебели', price: 3500 },
    { id: 'kitchen', name: 'Уборка кухни', price: 2000 },
    { id: 'bathroom', name: 'Уборка санузлов', price: 1500 },
    { id: 'pet_hair', name: 'Уборка шерсти животных', price: 1000 },
    { id: 'disinfection', name: 'Дезинфекция', price: 2500 },
    { id: 'night', name: 'Ночная уборка', price: 3000 },
    { id: 'express', name: 'Срочная уборка', price: 2000 }
  ], []);

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

  const serviceNames = useMemo(() => ({
    maintenance: 'Поддерживающая уборка',
    general: 'Генеральная уборка',
    postRenovation: 'После ремонта',
    eco: 'Эко уборка',
    vip: 'VIP уборка'
  }), []);

  useEffect(() => {
    let basePrice = basePrices[propertyType][cleaningType] * area;
    let additionalPrice = additionalServices.reduce((sum, serviceId) => {
      const service = additionalServicesList.find(s => s.id === serviceId);
      return sum + (service?.price || 0);
    }, 0);

    if (isNightMode) {
      basePrice *= 1.3;
      additionalPrice *= 1.3;
    }
    
    if (isEmergencyMode) {
      basePrice *= 1.5;
      additionalPrice *= 1.5;
    }

    let totalPrice = basePrice + additionalPrice;
    
    if (totalPrice < 6000) {
      totalPrice = 6000;
    }

    const duration = calculateDuration(area, cleaningType, propertyType);

    const laborCost = Math.ceil(basePrice * 0.4);
    const materialCost = Math.ceil(basePrice * 0.15);
    const overheadCost = Math.ceil(basePrice * 0.1);
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

  return {
    propertyType, setPropertyType,
    area, setArea,
    customArea, setCustomArea,
    cleaningType, setCleaningType,
    additionalServices, handleServiceToggle,
    isNightMode, setIsNightMode,
    isEmergencyMode, setIsEmergencyMode,
    result,
    leadId, setLeadId,
    clientName, setClientName,
    clientPhone, setClientPhone,
    managerNote, setManagerNote,
    additionalServicesList,
    serviceNames
  };
}