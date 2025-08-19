import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useDebounce } from '@/hooks/usePerformance';
import { calculateQuote, type PropertyType, type CleaningType } from './calcUtils';

interface CalculationResult {
  basePrice: number;
  additionalServices: number;
  totalPrice: number;
  duration: string;
  services: string[];
}

interface Breakdown {
  base: number;
  windows: number;
  extrasFactor: number;
  discountFactor: number;
}

export function useCalculator() {
  const [propertyType, setPropertyType] = useState<PropertyType>('apartment');
  const [area, setArea] = useState<number>(50);
  const [customArea, setCustomArea] = useState<string>('50');
  const [cleaningType, setCleaningType] = useState<CleaningType>('maintenance');
  const [additionalServices, setAdditionalServices] = useState<string[]>([]);
  const [windowsCount, setWindowsCount] = useState<number>(0);
  const [urgent, setUrgent] = useState<boolean>(false);
  const [night, setNight] = useState<boolean>(false);
  const [outside, setOutside] = useState<boolean>(false);
  const [isNewClient, setIsNewClient] = useState<boolean>(false);
  const [bundle, setBundle] = useState<boolean>(false);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [servicesSearch, setServicesSearch] = useState<string>('');
  const [animatedTotal, setAnimatedTotal] = useState<number>(0);
  const [breakdown, setBreakdown] = useState<Breakdown | null>(null);
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

  const MIN_ORDER = 6000;

  // Дополнительные услуги
  const additionalServicesList = useMemo(() => [
    { id: 'kitchen', name: 'Уборка кухни', price: 2000, icon: 'Home' },
    { id: 'bathroom', name: 'Уборка санузла', price: 1500, icon: 'Shield' },
    { id: 'balcony', name: 'Уборка балкона', price: 1000, icon: 'Building' },
    { id: 'fridge', name: 'Мытье холодильника', price: 800, icon: 'Home' },
    { id: 'oven', name: 'Чистка духовки', price: 1200, icon: 'Home' },
    { id: 'disinfection', name: 'Дезинфекция', price: 3000, icon: 'Shield' },
    { id: 'carpet', name: 'Химчистка ковра', price: 1800, icon: 'Shield' },
    { id: 'sofa', name: 'Химчистка дивана', price: 3000, icon: 'Home' },
    { id: 'mattress', name: 'Химчистка матраса', price: 2500, icon: 'Home' },
    { id: 'wardrobe', name: 'Уборка шкафов', price: 1500, icon: 'Building' }
  ], []);

  // Сумма по выбранным доп. услугам
  const calculateExtrasTotal = useCallback(() => {
    return additionalServices.reduce((total, serviceId) => {
      const service = additionalServicesList.find(s => s.id === serviceId);
      return total + (service?.price || 0);
    }, 0);
  }, [additionalServices, additionalServicesList]);

  // Расчет времени работы
  const calculateDuration = useCallback(() => {
    const baseHours = area / 30; // Примерно 30м² в час
    const minHours = 2;
    const maxHours = 8;
    const hours = Math.max(minHours, Math.min(maxHours, Math.round(baseHours)));
    return `${hours} часов`;
  }, [area]);

  // Основной расчет (как на админке: используем общий движок расчёта)
  const calculateResult = useCallback(() => {
    const extrasTotal = calculateExtrasTotal();
    const quote = calculateQuote({
      area,
      propertyType,
      cleaningType,
      windowsCount,
      extrasTotal,
      urgent,
      night,
      outside,
      isNewClient,
      bundle
    });

    const nextResult: CalculationResult = {
      basePrice: quote.basePrice + quote.windowsPrice,
      additionalServices: quote.extrasTotal,
      totalPrice: quote.totalPrice,
      duration: quote.duration,
      services: additionalServices
    };

    setResult(nextResult);
    setBreakdown({
      base: quote.breakdown.base,
      windows: quote.breakdown.windows,
      extrasFactor: quote.breakdown.extrasFactor,
      discountFactor: quote.breakdown.discountFactor
    });

    const startValue = prevTotalRef.current;
    const endValue = quote.totalPrice;
    const animDuration = 1000;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / animDuration, 1);
      const currentValue = startValue + (endValue - startValue) * progress;
      setAnimatedTotal(Math.round(currentValue));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
    prevTotalRef.current = quote.totalPrice;
  }, [
    area,
    propertyType,
    cleaningType,
    windowsCount,
    urgent,
    night,
    outside,
    isNewClient,
    bundle,
    additionalServices,
    calculateExtrasTotal
  ]);

  // Debounced расчет
  const debouncedCalculate = useDebounce(calculateResult, 300);

  // Автоматический пересчет при изменении параметров
  useEffect(() => {
    if (didInitRef.current) {
      debouncedCalculate();
    } else {
      didInitRef.current = true;
    }
  }, [propertyType, cleaningType, area, additionalServices, windowsCount, urgent, night, outside, isNewClient, bundle, debouncedCalculate]);

  // Сброс калькулятора
  const resetCalculator = useCallback(() => {
    setPropertyType('apartment');
    setArea(50);
    setCustomArea('50');
    setCleaningType('maintenance');
    setAdditionalServices([]);
    setResult(null);
    setBreakdown(null);
    setAnimatedTotal(0);
    setServicesSearch('');
  }, []);

  return {
    // Состояния
    propertyType,
    setPropertyType,
    area,
    setArea,
    customArea,
    setCustomArea,
    cleaningType,
    setCleaningType,
    additionalServices,
    setAdditionalServices,
    windowsCount,
    setWindowsCount,
    urgent,
    setUrgent,
    night,
    setNight,
    outside,
    setOutside,
    isNewClient,
    setIsNewClient,
    bundle,
    setBundle,
    result,
    servicesSearch,
    setServicesSearch,
    animatedTotal,
    breakdown,
    
    // Действия
    resetCalculator,
    calculateResult,
    
    // Константы
    additionalServicesList
  };
}
