'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  Calculator, 
  Home, 
  Building, 
  Sparkles, 
  Shield, 
  CheckCircle, 
  Star,
  Users,
  DollarSign,
  TrendingUp,
  AlertCircle,
  Info,
  Save,
  Download
} from 'lucide-react';

interface CalculationResult {
  basePrice: number;
  additionalServices: number;
  commercialServices: number;
  totalPrice: number;
  duration: string;
  services: string[];
  team: {
    employeesCount: number;
    totalHours: number;
    regularHours: number;
    overtimeHours: number;
    costPerEmployee: number;
    totalLaborCost: number;
  };
  costs: {
    labor: number;
    materials: number;
    transport: number;
    overhead: number;
    profit: number;
    totalCost: number;
  };
  margins: {
    grossMargin: number;
    netMargin: number;
    marginPercentage: number;
  };
  pricing: {
    pricePerSqm: number;
    pricePerHour: number;
    pricePerService: number;
  };
}

interface Employee {
  id: string;
  name: string;
  hourlyRate: number;
  efficiency: number; // м²/час
  type: 'freelance' | 'staff'; // фрилансер или штатный
  maxHoursPerDay?: number; // максимальные часы в день
  overtimeRate?: number; // ставка за сверхурочные
}

interface Material {
  id: string;
  name: string;
  costPerSqm: number;
  usage: number; // % от площади
}

interface Preset {
  id: string;
  name: string;
  propertyType: 'apartment' | 'house' | 'office' | 'commercial';
  cleaningType: 'maintenance' | 'general' | 'postRenovation' | 'eco' | 'vip';
  area: number;
  distance: number;
  employeeId: string;
  additionalServices: string[];
  commercialServices: string[];
  specialModes: string[];
}

export default function AdminCalculator() {
  const [propertyType, setPropertyType] = useState<'apartment' | 'house' | 'office' | 'commercial'>('apartment');
  const [area, setArea] = useState<number>(50);
  const [customArea, setCustomArea] = useState<string>('');
  const [cleaningType, setCleaningType] = useState<'maintenance' | 'general' | 'postRenovation' | 'eco' | 'vip'>('maintenance');
  const [additionalServices, setAdditionalServices] = useState<string[]>([]);
  const [commercialServices, setCommercialServices] = useState<string[]>([]);
  const [specialModes, setSpecialModes] = useState<string[]>([]);
  const [distance, setDistance] = useState<number>(10); // км
  const [employees, setEmployees] = useState<Employee[]>([
    { 
      id: '1', 
      name: 'Уборщица (фрилансер)', 
      hourlyRate: 300, 
      efficiency: 20,
      type: 'freelance'
    },
    { 
      id: '2', 
      name: 'Специалист (фрилансер)', 
      hourlyRate: 400, 
      efficiency: 15,
      type: 'freelance'
    },
    { 
      id: '3', 
      name: 'Мастер (штатный)', 
      hourlyRate: 500, 
      efficiency: 12,
      type: 'staff',
      maxHoursPerDay: 8,
      overtimeRate: 750
    },
    { 
      id: '4', 
      name: 'Уборщица (штатная)', 
      hourlyRate: 250, 
      efficiency: 18,
      type: 'staff',
      maxHoursPerDay: 8,
      overtimeRate: 375
    }
  ]);
  const [selectedEmployee, setSelectedEmployee] = useState<string>('1');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [presets, setPresets] = useState<Preset[]>([
    {
      id: '1',
      name: 'Квартира 50м² - Поддерживающая',
      propertyType: 'apartment',
      cleaningType: 'maintenance',
      area: 50,
      distance: 10,
      employeeId: '1',
      additionalServices: [],
      commercialServices: [],
      specialModes: []
    },
    {
      id: '2',
      name: 'Дом 150м² - Генеральная',
      propertyType: 'house',
      cleaningType: 'general',
      area: 150,
      distance: 15,
      employeeId: '2',
      additionalServices: ['windows', 'kitchen'],
      commercialServices: [],
      specialModes: []
    },
    {
      id: '3',
      name: 'Офис 200м² - После ремонта',
      propertyType: 'office',
      cleaningType: 'postRenovation',
      area: 200,
      distance: 20,
      employeeId: '3',
      additionalServices: ['disinfection'],
      commercialServices: ['office_cleaning'],
      specialModes: ['express']
    }
  ]);
  const [showPresetModal, setShowPresetModal] = useState(false);
  const [newPresetName, setNewPresetName] = useState('');

  // Базовые цены за м² (как на сайте)
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
    { id: 'windows', name: 'Мытье окон', price: 1500, materials: 50 },
    { id: 'sofa', name: 'Химчистка дивана', price: 3000, materials: 800 },
    { id: 'carpet', name: 'Химчистка ковра', price: 2500, materials: 400 },
    { id: 'balcony', name: 'Уборка балкона', price: 1000, materials: 100 },
    { id: 'fridge', name: 'Мытье холодильника', price: 800, materials: 150 },
    { id: 'wardrobe', name: 'Уборка шкафов', price: 1500, materials: 50 },
    { id: 'mattress', name: 'Химчистка матраса', price: 2500, materials: 600 },
    { id: 'curtains', name: 'Химчистка штор', price: 2000, materials: 500 },
    { id: 'furniture', name: 'Химчистка мягкой мебели', price: 3500, materials: 900 },
    { id: 'kitchen', name: 'Уборка кухни', price: 2000, materials: 200 },
    { id: 'bathroom', name: 'Уборка санузлов', price: 1500, materials: 150 },
    { id: 'pet_hair', name: 'Уборка шерсти животных', price: 1000, materials: 100 },
    { id: 'disinfection', name: 'Дезинфекция', price: 3000, materials: 600 }
  ], []);

  // Коммерческие услуги
  const commercialServicesList = useMemo(() => [
    { id: 'office_cleaning', name: 'Уборка офисов', price: 4000, materials: 300 },
    { id: 'shopping_centers', name: 'Уборка торговых центров', price: 3500, materials: 400 },
    { id: 'restaurants', name: 'Уборка ресторанов', price: 3500, materials: 350 },
    { id: 'beauty_salons', name: 'Уборка салонов красоты', price: 3500, materials: 300 },
    { id: 'medical_facilities', name: 'Уборка медицинских учреждений', price: 3500, materials: 500 },
    { id: 'schools', name: 'Уборка школ', price: 3500, materials: 250 },
    { id: 'fitness_clubs', name: 'Уборка фитнес клубов', price: 3500, materials: 300 },
    { id: 'saunas', name: 'Уборка бани и сауны', price: 3500, materials: 400 },
    { id: 'car_salons', name: 'Уборка автосалонов', price: 3500, materials: 200 },
    { id: 'parking', name: 'Уборка паркингов', price: 2500, materials: 150 },
    { id: 'window_washing', name: 'Мойка витрин', price: 1500, materials: 100 },
    { id: 'facade_washing', name: 'Мойка фасадов', price: 2000, materials: 200 },
    { id: 'industrial_climbing', name: 'Промышленный альпинизм', price: 5000, materials: 300 },
    { id: 'mechanized_cleaning', name: 'Механизированная уборка', price: 4000, materials: 600 },
    { id: 'territory_cleaning', name: 'Уборка территории', price: 3000, materials: 200 },
    { id: 'grass_cutting', name: 'Покос травы', price: 2500, materials: 100 },
    { id: 'snow_removal', name: 'Уборка снега', price: 3000, materials: 50 },
    { id: 'car_detailing', name: 'Химчистка автомобилей', price: 2500, materials: 400 }
  ], []);

  // Специальные режимы (процентные надбавки)
  const specialModesList = useMemo(() => [
    { 
      id: 'express', 
      name: 'Экспресс уборка', 
      description: 'Быстрая уборка за 2-3 часа',
      multiplier: 1.3, // +30%
      icon: '⚡'
    },
    { 
      id: 'night', 
      name: 'Ночная уборка', 
      description: 'Работа в ночное время',
      multiplier: 1.5, // +50%
      icon: '🌙'
    },
    { 
      id: 'weekend', 
      name: 'Выходной день', 
      description: 'Уборка в выходные',
      multiplier: 1.2, // +20%
      icon: '📅'
    },
    { 
      id: 'urgent', 
      name: 'Срочный выезд', 
      description: 'Выезд в течение часа',
      multiplier: 1.4, // +40%
      icon: '🚨'
    }
  ], []);

  // Материалы
  const materialsList: Material[] = useMemo(() => [
    { id: 'detergent', name: 'Моющие средства', costPerSqm: 5, usage: 100 },
    { id: 'disinfectant', name: 'Дезинфицирующие средства', costPerSqm: 3, usage: 100 },
    { id: 'cloths', name: 'Тряпки и салфетки', costPerSqm: 2, usage: 100 },
    { id: 'gloves', name: 'Перчатки', costPerSqm: 1, usage: 100 },
    { id: 'bags', name: 'Мусорные мешки', costPerSqm: 1, usage: 100 },
    { id: 'special', name: 'Специальные средства', costPerSqm: 8, usage: 50 }
  ], []);

  // Расчет времени работы и команды
  const calculateTeamAndDuration = (area: number, cleaningType: string, propertyType: string, employeeEfficiency: number, maxHoursPerDay: number = 12) => {
    let baseHours = 0;
    
    switch (cleaningType) {
      case 'maintenance':
        baseHours = Math.max(2, Math.ceil(area / employeeEfficiency));
        break;
      case 'general':
        baseHours = Math.max(3, Math.ceil(area / (employeeEfficiency * 0.8)));
        break;
      case 'postRenovation':
        baseHours = Math.max(4, Math.ceil(area / (employeeEfficiency * 0.6)));
        break;
      case 'eco':
        baseHours = Math.max(3, Math.ceil(area / (employeeEfficiency * 0.9)));
        break;
      case 'vip':
        baseHours = Math.max(4, Math.ceil(area / (employeeEfficiency * 0.6)));
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
    
    // Расчет количества сотрудников
    const employeesCount = Math.ceil(totalHours / maxHoursPerDay);
    const hoursPerEmployee = totalHours / employeesCount;
    
    let regularHours = 0;
    let overtimeHours = 0;
    
    if (hoursPerEmployee <= maxHoursPerDay) {
      regularHours = totalHours;
      overtimeHours = 0;
    } else {
      regularHours = employeesCount * maxHoursPerDay;
      overtimeHours = totalHours - regularHours;
    }
    
    return {
      totalHours,
      employeesCount,
      regularHours,
      overtimeHours,
      duration: `${totalHours} ${totalHours === 1 ? 'час' : totalHours < 5 ? 'часа' : 'часов'}`
    };
  };

  // Расчет затрат с учетом команды
  const calculateCosts = useCallback((area: number, teamData: any, employee: Employee, additionalServices: string[], commercialServices: string[]) => {
    const { totalHours, employeesCount, regularHours, overtimeHours } = teamData;
    
    // Трудозатраты с учетом сверхурочных
    let labor = 0;
    if (employee.type === 'staff') {
      // Штатные сотрудники
      const regularCost = regularHours * employee.hourlyRate;
      const overtimeCost = overtimeHours * (employee.overtimeRate || employee.hourlyRate * 1.5);
      labor = regularCost + overtimeCost;
    } else {
      // Фрилансеры
      labor = totalHours * employee.hourlyRate;
    }
    
    // Материалы
    const baseMaterials = materialsList.reduce((sum, material) => {
      return sum + (material.costPerSqm * area * (material.usage / 100));
    }, 0);
    
    // Дополнительные материалы для услуг
    const additionalMaterials = additionalServices.reduce((sum, serviceId) => {
      const service = additionalServicesList.find(s => s.id === serviceId);
      return sum + (service?.materials || 0);
    }, 0);

    const commercialMaterials = commercialServices.reduce((sum, serviceId) => {
      const service = commercialServicesList.find(s => s.id === serviceId);
      return sum + (service?.materials || 0);
    }, 0);
    
    const materials = baseMaterials + additionalMaterials + commercialMaterials;
    
    // Транспорт (туда-обратно) - умножаем на количество сотрудников
    const transportCostPerKm = 50; // руб/км
    const transport = distance * transportCostPerKm * 2 * employeesCount;
    
    // Накладные расходы (20% от трудозатрат)
    const overhead = labor * 0.2;
    
    const totalCost = labor + materials + transport + overhead;
    
    return {
      labor,
      materials,
      transport,
      overhead,
      totalCost
    };
  }, [distance, additionalServicesList, commercialServicesList, materialsList]);

  // Расчет прибыли и наценки
  const calculatePricing = (totalPrice: number, totalCost: number) => {
    const profit = totalPrice - totalCost;
    const grossMargin = profit;
    const netMargin = profit * 0.8; // Налоги ~20%
    const marginPercentage = (profit / totalPrice) * 100;
    
    return {
      profit,
      grossMargin,
      netMargin,
      marginPercentage
    };
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

  // Основной расчет
  useEffect(() => {
    const selectedEmployeeData = employees.find(e => e.id === selectedEmployee);
    if (!selectedEmployeeData) return;

    const basePrice = basePrices[propertyType][cleaningType] * area;
    const additionalPrice = additionalServices.reduce((sum, serviceId) => {
      const service = additionalServicesList.find(s => s.id === serviceId);
      return sum + (service?.price || 0);
    }, 0);

    const commercialPrice = commercialServices.reduce((sum, serviceId) => {
      const service = commercialServicesList.find(s => s.id === serviceId);
      return sum + (service?.price || 0);
    }, 0);

    // Базовая цена без спецрежимов
    let baseTotal = basePrice + additionalPrice + commercialPrice;
    
    // Минимальный заказ 6000 руб
    if (baseTotal < 6000) {
      baseTotal = 6000;
    }

    // Применяем специальные режимы (процентные надбавки)
    let specialModeMultiplier = 1;
    specialModes.forEach(modeId => {
      const mode = specialModesList.find(m => m.id === modeId);
      if (mode) {
        specialModeMultiplier *= mode.multiplier;
      }
    });

    const totalPrice = baseTotal * specialModeMultiplier;

    const maxHoursPerDay = selectedEmployeeData.maxHoursPerDay || 12;
    const teamData = calculateTeamAndDuration(area, cleaningType, propertyType, selectedEmployeeData.efficiency, maxHoursPerDay);
    
    const costs = calculateCosts(area, teamData, selectedEmployeeData, additionalServices, commercialServices);
    const margins = calculatePricing(totalPrice, costs.totalCost);

    const pricing = {
      pricePerSqm: totalPrice / area,
      pricePerHour: totalPrice / teamData.totalHours,
      pricePerService: totalPrice / (1 + additionalServices.length)
    };

    // Расчет команды
    const team = {
      employeesCount: teamData.employeesCount,
      totalHours: teamData.totalHours,
      regularHours: teamData.regularHours,
      overtimeHours: teamData.overtimeHours,
      costPerEmployee: costs.labor / teamData.employeesCount,
      totalLaborCost: costs.labor
    };

    setResult({
      basePrice: basePrice < 6000 ? 6000 : basePrice,
      additionalServices: additionalPrice,
      commercialServices: commercialPrice,
      totalPrice,
      duration: teamData.duration,
      services: [
        serviceNames[cleaningType],
        ...additionalServices.map(id => 
          additionalServicesList.find(s => s.id === id)?.name || ''
        ).filter(Boolean),
        ...commercialServices.map(id =>
          commercialServicesList.find(s => s.id === id)?.name || ''
        ).filter(Boolean)
      ],
      team,
      costs: {
        ...costs,
        profit: margins.profit
      },
      margins,
      pricing
    });
  }, [propertyType, area, cleaningType, additionalServices, commercialServices, specialModes, distance, selectedEmployee, employees, additionalServicesList, commercialServicesList, specialModesList, basePrices, serviceNames, calculateCosts]);

  const handleServiceToggle = (serviceId: string) => {
    setAdditionalServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleCommercialServiceToggle = (serviceId: string) => {
    setCommercialServices(prev => 
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

  const handleEmployeeChange = (employeeId: string) => {
    setSelectedEmployee(employeeId);
  };

  const handleEmployeeUpdate = (employeeId: string, field: keyof Employee, value: number) => {
    setEmployees(prev => prev.map(emp => 
      emp.id === employeeId ? { ...emp, [field]: value } : emp
    ));
  };

  const exportCalculation = () => {
    if (!result) return;
    
    const data = {
      timestamp: new Date().toISOString(),
      calculation: result,
      parameters: {
        propertyType,
        area,
        cleaningType,
        additionalServices,
        distance,
        selectedEmployee: employees.find(e => e.id === selectedEmployee)
      }
    };
    
    if (typeof window !== 'undefined') {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `calculation-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const loadPreset = (preset: Preset) => {
    setPropertyType(preset.propertyType);
    setCleaningType(preset.cleaningType);
    setArea(preset.area);
    setCustomArea(preset.area.toString());
    setDistance(preset.distance);
    setSelectedEmployee(preset.employeeId);
    setAdditionalServices(preset.additionalServices);
    setCommercialServices(preset.commercialServices);
    setSpecialModes(preset.specialModes);
  };

  const saveCurrentAsPreset = () => {
    const newPreset: Preset = {
      id: Date.now().toString(),
      name: newPresetName,
      propertyType,
      cleaningType,
      area,
      distance,
      employeeId: selectedEmployee,
      additionalServices,
      commercialServices,
      specialModes
    };
    
    setPresets(prev => [...prev, newPreset]);
    setNewPresetName('');
    setShowPresetModal(false);
  };

  const deletePreset = (presetId: string) => {
    setPresets(prev => prev.filter(p => p.id !== presetId));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
            <Calculator className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              Админ калькулятор
            </h3>
            <p className="text-gray-600">
              Полный расчет затрат и прибыли
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowPresetModal(true)}
            className="btn-secondary flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Сохранить пресет</span>
          </button>
          <button
            onClick={exportCalculation}
            className="btn-secondary flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Экспорт</span>
          </button>
        </div>
      </div>

      {/* Пресеты */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Быстрые пресеты</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {presets.map((preset) => (
            <div
              key={preset.id}
              className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-primary-300 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-medium text-gray-900">{preset.name}</h5>
                <button
                  onClick={() => deletePreset(preset.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  ×
                </button>
              </div>
              <div className="text-sm text-gray-600 mb-3">
                {preset.area}м² • {preset.distance}км • {preset.additionalServices.length} доп. • {preset.commercialServices.length} комм. • {preset.specialModes.length} режим.
              </div>
              <button
                onClick={() => loadPreset(preset)}
                className="w-full btn-primary py-2 text-sm"
              >
                Загрузить
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Модальное окно для сохранения пресета */}
      {showPresetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Сохранить пресет
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Название пресета
                </label>
                <input
                  type="text"
                  value={newPresetName}
                  onChange={(e) => setNewPresetName(e.target.value)}
                  placeholder="Например: Квартира 80м² - Генеральная"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div className="text-sm text-gray-600">
                <p>Текущие настройки:</p>
                <ul className="mt-2 space-y-1">
                  <li>• {serviceNames[cleaningType]} - {area}м²</li>
                  <li>• Расстояние: {distance}км</li>
                  <li>• Доп. услуг: {additionalServices.length}</li>
                <li>• Комм. услуг: {commercialServices.length}</li>
                <li>• Спец. режимов: {specialModes.length}</li>
                </ul>
              </div>
            </div>
            <div className="flex items-center justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowPresetModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Отмена
              </button>
              <button
                onClick={saveCurrentAsPreset}
                disabled={!newPresetName.trim()}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      )}

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
                { id: 'commercial', name: 'Коммерческое', icon: Building }
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
              
              <div>
                <label className="block text-xs text-gray-600 mb-2">
                  Точная площадь:
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

          {/* Расстояние */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Расстояние до объекта (км)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={distance}
              onChange={(e) => setDistance(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Средняя колонка - Сотрудники и услуги */}
        <div className="space-y-6">
          {/* Сотрудники */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Сотрудники
            </label>
            <div className="space-y-3">
              {employees.map((employee) => (
                <div
                  key={employee.id}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    selectedEmployee === employee.id
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200'
                  }`}
                >
                                     <div className="flex items-center justify-between mb-3">
                     <div className="flex items-center space-x-3">
                       <input
                         type="radio"
                         checked={selectedEmployee === employee.id}
                         onChange={() => handleEmployeeChange(employee.id)}
                         className="text-primary-600"
                       />
                       <span className="font-medium">{employee.name}</span>
                     </div>
                     <div className="text-sm text-gray-600">
                       {employee.efficiency} м²/час
                     </div>
                   </div>
                   <div className="flex items-center justify-between mb-3">
                     <span className={`text-xs px-2 py-1 rounded-full ${
                       employee.type === 'staff' 
                         ? 'bg-green-100 text-green-800' 
                         : 'bg-blue-100 text-blue-800'
                     }`}>
                       {employee.type === 'staff' ? 'Штатный' : 'Фрилансер'}
                     </span>
                     {employee.type === 'staff' && (
                       <span className="text-xs text-gray-500">
                         Макс: {employee.maxHoursPerDay}ч/день
                       </span>
                     )}
                   </div>
                  
                                     <div className="grid grid-cols-2 gap-3">
                     <div>
                       <label className="block text-xs text-gray-600 mb-1">
                         Ставка (₽/час)
                       </label>
                       <input
                         type="number"
                         value={employee.hourlyRate}
                         onChange={(e) => handleEmployeeUpdate(employee.id, 'hourlyRate', parseInt(e.target.value) || 0)}
                         className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500"
                       />
                     </div>
                     <div>
                       <label className="block text-xs text-gray-600 mb-1">
                         Эффективность
                       </label>
                       <input
                         type="number"
                         value={employee.efficiency}
                         onChange={(e) => handleEmployeeUpdate(employee.id, 'efficiency', parseInt(e.target.value) || 0)}
                         className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500"
                       />
                     </div>
                   </div>
                   {employee.type === 'staff' && (
                     <div className="grid grid-cols-2 gap-3 mt-3">
                       <div>
                         <label className="block text-xs text-gray-600 mb-1">
                           Макс. часов/день
                         </label>
                         <input
                           type="number"
                           value={employee.maxHoursPerDay || 8}
                           onChange={(e) => handleEmployeeUpdate(employee.id, 'maxHoursPerDay', parseInt(e.target.value) || 8)}
                           className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500"
                         />
                       </div>
                       <div>
                         <label className="block text-xs text-gray-600 mb-1">
                           Сверхурочные (₽/час)
                         </label>
                         <input
                           type="number"
                           value={employee.overtimeRate || employee.hourlyRate * 1.5}
                           onChange={(e) => handleEmployeeUpdate(employee.id, 'overtimeRate', parseInt(e.target.value) || 0)}
                           className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500"
                         />
                       </div>
                     </div>
                   )}
                </div>
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
                      <Sparkles className="w-4 h-4" />
                      <span className="text-sm">{service.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{service.price} ₽</div>
                      <div className="text-xs text-gray-500">+{service.materials} ₽ мат.</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Коммерческие услуги */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Коммерческие услуги
            </label>
            <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto">
              {commercialServicesList.map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleCommercialServiceToggle(service.id)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                    commercialServices.includes(service.id)
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Building className="w-4 h-4" />
                      <span className="text-sm">{service.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{service.price} ₽</div>
                      <div className="text-xs text-gray-500">+{service.materials} ₽ мат.</div>
                    </div>
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
            <div className="grid grid-cols-1 gap-2">
              {specialModesList.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => handleSpecialModeToggle(mode.id)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                    specialModes.includes(mode.id)
                      ? 'border-orange-600 bg-orange-50 text-orange-700'
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="w-4 h-4 text-center">{mode.icon}</span>
                      <div>
                        <div className="text-sm font-medium">{mode.name}</div>
                        <div className="text-xs text-gray-500">{mode.description}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-orange-600">
                        +{Math.round((mode.multiplier - 1) * 100)}%
                      </div>
                    </div>
                  </div>
                </button>
              ))}
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
              {/* Основная информация */}
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
                   <div className="text-xs text-gray-500 mt-1">
                     Команда: {result.team.employeesCount} {result.team.employeesCount === 1 ? 'человек' : result.team.employeesCount < 5 ? 'человека' : 'человек'}
                   </div>
                  </div>

                  {result.services.slice(1).map((service, index) => {
                    const additionalService = additionalServicesList.find(s => s.name === service);
                    const commercialService = commercialServicesList.find(s => s.name === service);
                    const price = additionalService?.price || commercialService?.price || 0;
                    
                    return (
                      <div key={index} className="bg-white rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900">{service}</span>
                          <span className="text-lg font-bold text-primary-600">
                            {price.toLocaleString()} ₽
                          </span>
                        </div>
                      </div>
                    );
                  })}

                  <div className="bg-primary-600 text-white rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold">Итого:</span>
                      <span className="text-2xl font-bold">
                        {result.totalPrice.toLocaleString()} ₽
                      </span>
                    </div>
                  </div>
                </div>
              </div>

                             {/* Команда */}
               <div className="bg-blue-50 rounded-xl p-6">
                 <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                   <Users className="w-5 h-5" />
                   <span>Команда</span>
                 </h4>
                 
                 <div className="space-y-3">
                   <div className="flex justify-between">
                     <span className="text-gray-600">Количество сотрудников:</span>
                     <span className="font-medium">{result.team.employeesCount}</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-gray-600">Общее время работы:</span>
                     <span className="font-medium">{result.team.totalHours} ч</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-gray-600">Обычные часы:</span>
                     <span className="font-medium">{result.team.regularHours} ч</span>
                   </div>
                   {result.team.overtimeHours > 0 && (
                     <div className="flex justify-between">
                       <span className="text-gray-600">Сверхурочные часы:</span>
                       <span className="font-medium text-orange-600">{result.team.overtimeHours} ч</span>
                     </div>
                   )}
                   <div className="flex justify-between">
                     <span className="text-gray-600">Затраты на команду:</span>
                     <span className="font-medium">{result.team.totalLaborCost.toLocaleString()} ₽</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-gray-600">На одного сотрудника:</span>
                     <span className="font-medium">{result.team.costPerEmployee.toLocaleString()} ₽</span>
                   </div>
                 </div>
               </div>

               {/* Затраты */}
               <div className="bg-gray-50 rounded-xl p-6">
                 <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                   <DollarSign className="w-5 h-5" />
                   <span>Затраты</span>
                 </h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Трудозатраты:</span>
                    <span className="font-medium">{result.costs.labor.toLocaleString()} ₽</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Материалы:</span>
                    <span className="font-medium">{result.costs.materials.toLocaleString()} ₽</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Транспорт:</span>
                    <span className="font-medium">{result.costs.transport.toLocaleString()} ₽</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Накладные:</span>
                    <span className="font-medium">{result.costs.overhead.toLocaleString()} ₽</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-semibold">
                      <span>Общие затраты:</span>
                      <span className="text-red-600">{result.costs.totalCost.toLocaleString()} ₽</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Прибыль */}
              <div className="bg-green-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Прибыль</span>
                </h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Валовая прибыль:</span>
                    <span className="font-medium text-green-600">{result.margins.grossMargin.toLocaleString()} ₽</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Чистая прибыль:</span>
                    <span className="font-medium text-green-600">{result.margins.netMargin.toLocaleString()} ₽</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Маржинальность:</span>
                    <span className="font-medium text-green-600">{result.margins.marginPercentage.toFixed(1)}%</span>
                  </div>
                </div>
              </div>

              {/* Ценообразование */}
              <div className="bg-blue-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <Calculator className="w-5 h-5" />
                  <span>Ценообразование</span>
                </h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Цена за м²:</span>
                    <span className="font-medium">{result.pricing.pricePerSqm.toFixed(0)} ₽/м²</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Цена за час:</span>
                    <span className="font-medium">{result.pricing.pricePerHour.toFixed(0)} ₽/час</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Цена за услугу:</span>
                    <span className="font-medium">{result.pricing.pricePerService.toFixed(0)} ₽</span>
                  </div>
                </div>
              </div>

              {/* Предупреждения */}
              {result.margins.marginPercentage < 20 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                    <span className="font-medium text-yellow-800">Низкая маржинальность</span>
                  </div>
                  <p className="text-sm text-yellow-700">
                    Маржинальность {result.margins.marginPercentage.toFixed(1)}% ниже рекомендуемых 20%. 
                    Рассмотрите повышение цены или оптимизацию затрат.
                  </p>
                </div>
              )}

              {result.margins.marginPercentage > 50 && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Info className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-800">Высокая маржинальность</span>
                  </div>
                  <p className="text-sm text-green-700">
                    Маржинальность {result.margins.marginPercentage.toFixed(1)}% выше средних показателей. 
                    Возможно снижение цены для повышения конкурентоспособности.
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
} 