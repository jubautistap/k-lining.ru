'use client';

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
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
  Zap,
  Phone,
  ArrowRight,
  RotateCcw,
  X
} from 'lucide-react';
import { useAmoCRM } from '../providers/AmoCRMProvider';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useDebounce } from '@/hooks/usePerformance';

interface CalculationResult {
  basePrice: number;
  additionalServices: number;
  totalPrice: number;
  duration: string;
  services: string[];
}

export default function CleaningCalculator() {
  const { openModal } = useAmoCRM();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [propertyType, setPropertyType] = useState<'apartment' | 'house' | 'office' | 'commercial'>('apartment');
  const [area, setArea] = useState<number>(50);
  const [customArea, setCustomArea] = useState<string>('');
  const [cleaningType, setCleaningType] = useState<'maintenance' | 'general' | 'postRenovation' | 'eco' | 'vip'>('maintenance');
  const [additionalServices, setAdditionalServices] = useState<string[]>([]);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [servicesSearch, setServicesSearch] = useState<string>('');
  const [animatedTotal, setAnimatedTotal] = useState<number>(0);
  const [breakdown, setBreakdown] = useState<{
    base: number;
    windows: number;
    extrasFactor: number;
    discountFactor: number;
  } | null>(null);
  const prevTotalRef = useRef<number>(0);
  const didInitRef = useRef<boolean>(false);

  // Диапазоны цен за м² и окно (согласованно с прайсом)
  const RATES = useMemo(() => ({
    apartment: {
      maintenance: { min: 60, mid: 85, max: 110 },
      general: { min: 160, mid: 190, max: 220 },
      postRenovation: { min: 220, mid: 260, max: 300 },
      eco: { min: 160, mid: 190, max: 220 },
      vip: { min: 300, mid: 350, max: 400 }
    },
    house: {
      maintenance: { min: 80, mid: 100, max: 130 },
      general: { min: 180, mid: 220, max: 260 },
      postRenovation: { min: 240, mid: 280, max: 320 },
      eco: { min: 180, mid: 220, max: 260 },
      vip: { min: 350, mid: 400, max: 450 }
    },
    office: {
      maintenance: { min: 80, mid: 95, max: 110 },
      general: { min: 100, mid: 120, max: 140 },
      postRenovation: { min: 160, mid: 180, max: 200 },
      eco: { min: 120, mid: 140, max: 160 },
      vip: { min: 200, mid: 250, max: 300 }
    },
    commercial: {
      maintenance: { min: 70, mid: 90, max: 110 },
      general: { min: 120, mid: 150, max: 180 },
      postRenovation: { min: 180, mid: 200, max: 220 },
      eco: { min: 120, mid: 150, max: 180 },
      vip: { min: 220, mid: 260, max: 300 }
    }
  }), []);

  const WINDOW_PRICE_PER_SASH = 600; // ₽ за створку
  const MIN_ORDER = 6000;
  const RATE_POINT: 'min' | 'mid' | 'max' = 'mid';
  const SURCHARGES = { urgent: 1.20, night: 1.15, outside: 1.15 } as const;
  const DISCOUNTS = { new: 0.90, bundle: 0.85 } as const; // берем лучшую

  // Дополнительные услуги
  const additionalServicesList = useMemo(() => [
    // окна считаем отдельно по створкам ниже, эта позиция убирается чтобы не дублировать
    { id: 'kitchen', name: 'Уборка кухни', price: 2000, icon: Home },
    { id: 'bathroom', name: 'Уборка санузла', price: 1500, icon: Shield },
    { id: 'balcony', name: 'Уборка балкона', price: 1000, icon: Building },
    { id: 'fridge', name: 'Мытье холодильника', price: 800, icon: Home },
    { id: 'oven', name: 'Чистка духовки', price: 1200, icon: Home },
    { id: 'disinfection', name: 'Дезинфекция', price: 3000, icon: Shield },
    { id: 'carpet', name: 'Химчистка ковра', price: 2500, icon: Sparkles }
  ], []);

  const filteredAdditionalServices = useMemo(() => {
    if (!servicesSearch.trim()) return additionalServicesList;
    const q = servicesSearch.trim().toLowerCase();
    return additionalServicesList.filter((s) => s.name.toLowerCase().includes(q));
  }, [additionalServicesList, servicesSearch]);

  // Инициализация из URL или localStorage (однократно)
  useEffect(() => {
    if (didInitRef.current) return;
    didInitRef.current = true;

    try {
      const pt = searchParams?.get('pt');
      const a = searchParams?.get('a');
      const ct = searchParams?.get('ct');
      const s = searchParams?.get('s');

      if (pt || a || ct || s) {
        if (pt && ['apartment','house','office','commercial'].includes(pt)) {
          setPropertyType(pt as any);
        }
        const numA = parseInt(a || '');
        if (!Number.isNaN(numA) && numA >= 15 && numA <= 500) {
          setArea(numA);
          setCustomArea(String(numA));
        }
        if (ct && ['maintenance','general','postRenovation','eco','vip'].includes(ct)) {
          setCleaningType(ct as any);
        }
        if (s) {
          const split = s.split(',').map(v => v.trim()).filter(Boolean);
          const allowed = additionalServicesList.map(x => x.id);
          const valid = split.filter(id => allowed.includes(id));
          if (valid.length) setAdditionalServices(valid);
        }
        return; // если инициализировали из URL — не трогаем localStorage
      }

      // fallback: localStorage
      const raw = typeof window !== 'undefined' ? window.localStorage.getItem('calc-state-v1') : null;
      if (raw) {
        const st = JSON.parse(raw);
        if (st?.propertyType && ['apartment','house','office','commercial'].includes(st.propertyType)) setPropertyType(st.propertyType);
        if (typeof st?.area === 'number' && st.area >= 15 && st.area <= 500) { setArea(st.area); setCustomArea(String(st.area)); }
        if (st?.cleaningType && ['maintenance','general','postRenovation','eco','vip'].includes(st.cleaningType)) setCleaningType(st.cleaningType);
        if (Array.isArray(st?.additionalServices)) {
          const allowed = new Set(additionalServicesList.map(x => x.id));
          setAdditionalServices(st.additionalServices.filter((id: string) => allowed.has(id)));
        }
      }
    } catch {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Обновление URL + localStorage (дебаунсом)
  const updateUrlState = useCallback(() => {
    try {
      const params = new URLSearchParams(searchParams?.toString() || '');
      params.set('pt', propertyType);
      params.set('a', String(area));
      params.set('ct', cleaningType);
      if (additionalServices.length) params.set('s', additionalServices.join(',')); else params.delete('s');
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });

      if (typeof window !== 'undefined') {
        const st = { propertyType, area, cleaningType, additionalServices };
        window.localStorage.setItem('calc-state-v1', JSON.stringify(st));
      }
    } catch {}
  }, [propertyType, area, cleaningType, additionalServices, router, pathname, searchParams]);

  const updateUrlStateDebounced = useDebounce(updateUrlState, 300);

  useEffect(() => {
    updateUrlStateDebounced();
  }, [propertyType, area, cleaningType, additionalServices, updateUrlStateDebounced]);

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
    if (numValue >= 15 && numValue <= 500) {
      setArea(numValue);
    }
  };

  // Доп. параметры калькулятора
  const [windowsCount, setWindowsCount] = useState<number>(0); // створки
  const [urgent, setUrgent] = useState<boolean>(false);
  const [night, setNight] = useState<boolean>(false);
  const [outside, setOutside] = useState<boolean>(false);
  const [isNewClient, setIsNewClient] = useState<boolean>(false);
  const [bundle, setBundle] = useState<boolean>(false); // «генеральная + окна»

  // Рекомендованные допы для мобильного быстрого выбора
  const mobileRecommendedExtras = useMemo(() => ['kitchen','bathroom','balcony','fridge','disinfection','carpet'] as const, []);

  const pickRate = useCallback(() => {
    const prop = RATES[propertyType] ?? RATES.apartment;
    const r = (prop as any)[cleaningType] ?? (RATES.apartment as any).general;
    return r[RATE_POINT] as number;
  }, [RATES, propertyType, cleaningType]);

  const extrasFactor = useCallback(() => {
    let factor = 1.0;
    if (urgent) factor *= SURCHARGES.urgent;
    if (night) factor *= SURCHARGES.night;
    if (outside) factor *= SURCHARGES.outside;
    return factor;
  }, [urgent, night, outside]);

  const bestDiscount = useCallback(() => {
    const opts = [1.0];
    if (isNewClient) opts.push(DISCOUNTS.new);
    if (bundle) opts.push(DISCOUNTS.bundle);
    return Math.min(...opts);
  }, [isNewClient, bundle]);

  const round10 = (n: number) => Math.round(n / 10) * 10;

  // Расчет стоимости
  useEffect(() => {
    const rate = pickRate();
    const base = area * rate;
    const windowsCost = windowsCount * WINDOW_PRICE_PER_SASH;
    const subTotal = base + windowsCost + additionalServices.reduce((sum, serviceId) => {
      const service = additionalServicesList.find(s => s.id === serviceId);
      return sum + (service?.price || 0);
    }, 0);

    const withExtras = subTotal * extrasFactor();
    const withDiscount = withExtras * bestDiscount();
    const rawTotal = round10(withDiscount);
    const total = Math.max(rawTotal, MIN_ORDER);

    const duration = calculateDuration(area, cleaningType, propertyType);
    setBreakdown({ base: round10(base), windows: round10(windowsCost), extrasFactor: extrasFactor(), discountFactor: bestDiscount() });

    setResult({
      basePrice: round10(base),
      additionalServices: round10(windowsCost + (subTotal - base - windowsCost)),
      totalPrice: total,
      duration,
      services: [
        serviceNames[cleaningType],
        ...additionalServices.map(id => additionalServicesList.find(s => s.id === id)?.name || '').filter(Boolean)
      ]
    });
  }, [area, windowsCount, propertyType, cleaningType, additionalServices, additionalServicesList, pickRate, extrasFactor, bestDiscount, serviceNames]);

  // Анимация totalPrice
  useEffect(() => {
    const next = result?.totalPrice ?? 0;
    const start = prevTotalRef.current || 0;
    const diff = next - start;
    const durationMs = 350;
    const startTime = typeof performance !== 'undefined' ? performance.now() : Date.now();

    if (diff === 0) {
      setAnimatedTotal(next);
      return;
    }

    let raf: number | null = null;
    const step = () => {
      const now = (typeof performance !== 'undefined' ? performance.now() : Date.now()) - startTime;
      const t = Math.min(1, now / durationMs);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      setAnimatedTotal(Math.round(start + diff * eased));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    prevTotalRef.current = next;
    return () => { if (raf) cancelAnimationFrame(raf); };
  }, [result?.totalPrice]);

  const handleServiceToggle = (serviceId: string) => {
    setAdditionalServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleReset = () => {
    setPropertyType('apartment');
    setArea(50);
    setCustomArea('');
    setCleaningType('maintenance');
    setAdditionalServices([]);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Рассчитать стоимость уборки</h2>
          <p className="text-gray-600">Подберите параметры — увидите итоговую цену и время работ</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-50"
            type="button"
          >
            <RotateCcw className="w-4 h-4" /> Сбросить
          </button>
          <button
            onClick={openModal}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            type="button"
          >
            <Phone className="w-4 h-4" /> Заказать
          </button>
        </div>
      </div>

      {/* Современный дизайн с карточками */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-24 md:pb-0">
        
        {/* Левая колонка - Настройки */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Тип помещения */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-primary-50 border border-primary-200 text-primary-600">
                <Building className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Тип помещения</h3>
            </div>
            
            {/* Мобильные чипы */}
            <div className="md:hidden -mx-1 mb-3 overflow-x-auto">
              <div className="flex gap-2 px-1">
                {[
                  { id: 'apartment', name: 'Квартира', icon: Home },
                  { id: 'house', name: 'Дом', icon: Building },
                  { id: 'office', name: 'Офис', icon: Building },
                  { id: 'commercial', name: 'Коммерч.', icon: Store }
                ].map(type => (
                  <button
                    key={type.id}
                    onClick={() => setPropertyType(type.id as any)}
                    className={`px-3 py-2 rounded-full text-sm border whitespace-nowrap ${propertyType === type.id ? 'border-primary-600 bg-primary-50 text-primary-700' : 'border-gray-200'}`}
                    type="button"
                  >
                    <span className="inline-flex items-center gap-1">
                      <type.icon className="w-4 h-4" /> {type.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3" role="radiogroup" aria-label="Тип помещения">
              {[
                { id: 'apartment', name: 'Квартира', icon: Home, color: 'blue' },
                { id: 'house', name: 'Дом', icon: Building, color: 'green' },
                { id: 'office', name: 'Офис', icon: Building, color: 'purple' },
                { id: 'commercial', name: 'Коммерческое', icon: Store, color: 'orange' }
              ].map((type) => (
                <button
                  key={type.id}
                  onClick={() => setPropertyType(type.id as any)}
                  className={`px-4 py-3 rounded-lg border transition flex flex-col items-center justify-center min-h-[72px] focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    propertyType === type.id
                      ? 'border-primary-600 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                  role="radio"
                  aria-checked={propertyType === type.id}
                  type="button"
                >
                  <div className={`w-6 h-6 mx-auto mb-1 rounded-lg flex items-center justify-center overflow-hidden ${
                    propertyType === type.id 
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    <type.icon className="w-4 h-4 shrink-0" />
                  </div>
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
className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-primary-50 border border-primary-200 text-primary-600">
                <Calculator className="w-5 h-5" />
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
                {/* Мобильный слайдер */}
                <div className="md:hidden mt-4">
                  <input
                    type="range"
                    min={15}
                    max={500}
                    step={5}
                    value={area}
                    onChange={(e) => { const v = parseInt(e.target.value) || 15; setArea(v); setCustomArea(String(v)); }}
                    className="w-full"
                  />
                  <div className="text-xs text-gray-500 mt-1">{area} м²</div>
                </div>
                  <div className="text-xs text-gray-500 mt-2">
                    Диапазон: 15–500 м² • Минимальная стоимость заказа: 6,000 ₽
                  </div>
              </div>
            </div>
          </motion.div>

          {/* Тип уборки */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-primary-50 border border-primary-200 text-primary-600">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Тип уборки</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3" role="radiogroup" aria-label="Тип уборки">
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
                  className={`p-4 rounded-lg border transition text-left focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    cleaningType === type.id
                      ? 'border-primary-600 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                  role="radio"
                  aria-checked={cleaningType === type.id}
                  type="button"
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
className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-primary-50 border border-primary-200 text-primary-600">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Дополнительные услуги</h3>
            </div>

            {/* Поиск по услугам */}
            <div className="mb-3 relative">
              <input
                value={servicesSearch}
                onChange={(e) => setServicesSearch(e.target.value)}
                placeholder="Поиск услуги…"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                aria-label="Поиск по дополнительным услугам"
              />
              {servicesSearch && (
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700"
                  onClick={() => setServicesSearch('')}
                  type="button"
                  aria-label="Очистить поиск"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Мобильные быстрые теги */}
            <div className="md:hidden mb-3 -mx-1 overflow-x-auto">
              <div className="flex gap-2 px-1">
                {mobileRecommendedExtras.map(id => {
                  const svc = additionalServicesList.find(s => s.id === id);
                  if (!svc) return null;
                  const active = additionalServices.includes(id);
                  return (
                    <button
                      key={id}
                      onClick={() => handleServiceToggle(id)}
                      className={`px-3 py-1 rounded-full text-sm border whitespace-nowrap ${active ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-gray-200'}`}
                      type="button"
                    >
                      {svc.name}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-64 overflow-y-auto [mask-image:linear-gradient(to_bottom,transparent,black_12px,black_calc(100%-12px),transparent)]">
              {filteredAdditionalServices.map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleServiceToggle(service.id)}
                  className={`p-3 rounded-xl border-2 transition-all duration-200 text-left hover:shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                    additionalServices.includes(service.id)
                      ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-orange-100 text-orange-700'
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                  aria-pressed={additionalServices.includes(service.id)}
                  type="button"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded flex items-center justify-center ${
                        additionalServices.includes(service.id)
                          ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        <service.icon className="w-3 h-3" />
                      </div>
                      <span className="text-sm font-medium">{service.name}</span>
                    </div>
                    <span className="text-sm font-bold whitespace-nowrap">{service.price} ₽</span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Окна (за створку) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-primary-50 border border-primary-200 text-primary-600">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Окна</h3>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Количество створок (от 0)
                </label>
                <div className="flex items-center space-x-3">
                  <div className="md:hidden inline-flex items-center border rounded-lg overflow-hidden">
                    <button type="button" className="px-3 py-2 text-lg" onClick={() => setWindowsCount(w => Math.max(0, w - 1))}>−</button>
                    <div className="px-4 py-2 min-w-[48px] text-center">{windowsCount}</div>
                    <button type="button" className="px-3 py-2 text-lg" onClick={() => setWindowsCount(w => Math.min(200, w + 1))}>+</button>
                  </div>
                  <input
                    type="number"
                    min="0"
                    max="200"
                    value={windowsCount}
                    onChange={(e) => setWindowsCount(Math.max(0, parseInt(e.target.value) || 0))}
                    placeholder="Например: 4"
                    className="hidden md:block flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                  <span className="text-sm text-gray-500 font-medium">× {WINDOW_PRICE_PER_SASH} ₽</span>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  Единая метрика: «за створку». Москитная сетка/решётка: +200–300 ₽/шт
                </div>
              </div>
            </div>
          </motion.div>

          {/* Надбавки и скидки */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-primary-50 border border-primary-200 text-primary-600">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Надбавки и скидки</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={urgent} onChange={(e) => setUrgent(e.target.checked)} />
                Срочно (24 ч) +20%
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={night} onChange={(e) => setNight(e.target.checked)} />
                Ночная уборка (23:00–07:00) +15%
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={outside} onChange={(e) => setOutside(e.target.checked)} />
                За МКАД (до 20 км) +15%
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={isNewClient} onChange={(e) => setIsNewClient(e.target.checked)} />
                Новый клиент −10%
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={bundle} onChange={(e) => setBundle(e.target.checked)} />
                Пакет «Генеральная + окна» −15%
              </label>
            </div>
            {/* Мобильные чипы надбавок */}
            <div className="md:hidden mt-3 -mx-1 overflow-x-auto">
              <div className="flex gap-2 px-1">
                <button type="button" onClick={() => setUrgent(v => !v)} className={`px-3 py-1 rounded-full text-sm border ${urgent ? 'border-primary-600 bg-primary-50 text-primary-700' : 'border-gray-200'}`}>Срочно +20%</button>
                <button type="button" onClick={() => setNight(v => !v)} className={`px-3 py-1 rounded-full text-sm border ${night ? 'border-primary-600 bg-primary-50 text-primary-700' : 'border-gray-200'}`}>Ночь +15%</button>
                <button type="button" onClick={() => setOutside(v => !v)} className={`px-3 py-1 rounded-full text-sm border ${outside ? 'border-primary-600 bg-primary-50 text-primary-700' : 'border-gray-200'}`}>За МКАД +15%</button>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2">Скидки не суммируются — применяется лучшая</div>
          </motion.div>

          {/* Специальные режимы */}
          {/* Убрали специальные режимы - у конкурентов их нет */}
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
                {/* Бейджи состояния */}
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-full bg-white/15 px-2 py-1 text-xs">{serviceNames[cleaningType]}</span>
                  <span className="inline-flex items-center rounded-full bg-white/15 px-2 py-1 text-xs">{propertyType === 'apartment' ? 'Квартира' : propertyType === 'house' ? 'Дом' : propertyType === 'office' ? 'Офис' : 'Коммерческое'}</span>
                  <span className="inline-flex items-center rounded-full bg-white/15 px-2 py-1 text-xs">{area} м²</span>
                </div>

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

                {/* Разбивка */}
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-sm opacity-90 space-y-1">
                    <div className="flex justify-between"><span>Базовая услуга</span><span>{breakdown ? breakdown.base.toLocaleString() : 0} ₽</span></div>
                    <div className="flex justify-between"><span>Окна</span><span>{breakdown ? breakdown.windows.toLocaleString() : 0} ₽</span></div>
                    <div className="flex justify-between"><span>Надбавки</span><span>{breakdown && breakdown.extrasFactor !== 1 ? `× ${breakdown.extrasFactor.toFixed(2)}` : 'нет'}</span></div>
                    <div className="flex justify-between"><span>Скидка</span><span>{breakdown && breakdown.discountFactor < 1 ? `− ${(100 - breakdown.discountFactor*100).toFixed(0)}%` : 'нет'}</span></div>
                  </div>
                </div>

                {/* Итого */}
                <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm border border-white/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-semibold">Итого:</span>
                    <span className="text-3xl font-bold" aria-live="polite">
                      {animatedTotal.toLocaleString()} ₽
                    </span>
                  </div>
                  <motion.div key={result.duration} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm opacity-90">
                    Время работы: {result.duration}
                  </motion.div>
                  {result.totalPrice === MIN_ORDER && (
                    <div className="text-xs opacity-90 mt-1">
                      * Минимальная стоимость заказа
                    </div>
                  )}
                </div>

                {/* Кнопки действия */}
                <button 
                  onClick={openModal}
                  className="w-full bg-white text-blue-600 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
                >
                  <Phone className="w-5 h-5" />
                  <span>Заказать уборку</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={handleReset}
                  className="w-full bg-white/10 text-white py-3 rounded-xl font-medium hover:bg-white/20 transition"
                  type="button"
                >
                  Сбросить параметры
                </button>

                {/* Информация */}
                <div className="space-y-3 text-sm opacity-90">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                    <span>Расчет примерный. Округление до 10 ₽</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                    <span>Окончательная цена после осмотра</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                    <span>Минимальный заказ: {MIN_ORDER.toLocaleString()} ₽</span>
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

      {/* Sticky mobile summary bar */}
      {result && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40" style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 0px)' }}>
          <div className="mx-auto max-w-6xl">
            <div className="m-3 rounded-2xl shadow-lg bg-white border border-gray-200 p-3 flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-500">Итого</div>
                <div className="text-xl font-bold text-gray-900" aria-live="polite">{animatedTotal.toLocaleString()} ₽</div>
                <div className="text-[11px] text-gray-500">{result.duration}</div>
              </div>
              <button
                onClick={openModal}
                className="px-4 py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700"
                type="button"
                aria-label="Заказать уборку"
              >
                Заказать
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 