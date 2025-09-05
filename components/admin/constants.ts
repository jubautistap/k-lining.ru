export const RATES = {
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
};

export const RATE_POINT: 'min' | 'mid' | 'max' = 'mid';
export const WINDOW_PRICE_PER_SASH = 600;
export const MIN_ORDER = 6000;
export const SURCHARGES = { urgent: 1.20, night: 1.15, outside: 1.15 } as const;

export const additionalServicesList = [
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
];

export const commercialServicesList = [
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
];

export const specialModesList = [
  { 
    id: 'express', 
    name: 'Экспресс уборка', 
    description: 'Быстрая уборка за 2-3 часа',
    multiplier: 1.3, // +30%
    icon: '🔥'
  },
  { 
    id: 'night', 
    name: 'Ночная уборка', 
    description: 'Уборка в ночное время',
    multiplier: 1.5, // +50%
    icon: '🌙'
  },
  { 
    id: 'weekend', 
    name: 'Выходной день', 
    description: 'Уборка в выходные и праздники',
    multiplier: 1.2, // +20%
    icon: '📅'
  },
  { 
    id: 'deep', 
    name: 'Особо тщательная', 
    description: 'Максимально детальная уборка',
    multiplier: 1.4, // +40%
    icon: '🔍'
  }
];

export const materialsList = [
  { name: 'Моющие средства', costPerSqm: 5, usage: 100 }, // Каждый м²
  { name: 'Дезинфекторы', costPerSqm: 3, usage: 50 }, // 50% площади
  { name: 'Инвентарь', costPerSqm: 2, usage: 20 }, // 20% площади
  { name: 'Расходники', costPerSqm: 4, usage: 80 } // 80% площади
];

export const serviceNames = {
  maintenance: 'Поддерживающая уборка',
  general: 'Генеральная уборка',
  postRenovation: 'После ремонта',
  eco: 'Эко уборка',
  vip: 'VIP уборка'
};