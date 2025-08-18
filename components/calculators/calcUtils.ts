'use client';

export type PropertyType = 'apartment' | 'house' | 'office' | 'commercial';
export type CleaningType = 'maintenance' | 'general' | 'postRenovation' | 'eco' | 'vip';

// Базовые ставки (синхронизировано с основным калькулятором)
export const RATES = {
  apartment: {
    maintenance: { min: 60, mid: 85, max: 110 },
    general: { min: 160, mid: 190, max: 220 },
    postRenovation: { min: 220, mid: 260, max: 300 },
    eco: { min: 160, mid: 190, max: 220 },
    vip: { min: 300, mid: 350, max: 400 },
  },
  house: {
    maintenance: { min: 80, mid: 100, max: 130 },
    general: { min: 180, mid: 220, max: 260 },
    postRenovation: { min: 240, mid: 280, max: 320 },
    eco: { min: 180, mid: 220, max: 260 },
    vip: { min: 350, mid: 400, max: 450 },
  },
  office: {
    maintenance: { min: 80, mid: 95, max: 110 },
    general: { min: 100, mid: 120, max: 140 },
    postRenovation: { min: 160, mid: 180, max: 200 },
    eco: { min: 120, mid: 140, max: 160 },
    vip: { min: 200, mid: 250, max: 300 },
  },
  commercial: {
    maintenance: { min: 70, mid: 90, max: 110 },
    general: { min: 120, mid: 150, max: 180 },
    postRenovation: { min: 180, mid: 200, max: 220 },
    eco: { min: 120, mid: 150, max: 180 },
    vip: { min: 220, mid: 260, max: 300 },
  },
} as const;

export const WINDOW_PRICE_PER_SASH = 600; // ₽ за створку
export const MIN_ORDER = 6000;
export const RATE_POINT: 'min' | 'mid' | 'max' = 'mid';
export const SURCHARGES = { urgent: 1.20, night: 1.15, outside: 1.15 } as const;
export const DISCOUNTS = { new: 0.90, bundle: 0.85 } as const;

export function pickRate(propertyType: PropertyType, cleaningType: CleaningType, point: 'min' | 'mid' | 'max' = RATE_POINT): number {
  const prop = (RATES as any)[propertyType] ?? (RATES as any).apartment;
  const r = prop[cleaningType] ?? (RATES as any).apartment.general;
  return r[point] as number;
}

export function calculateDuration(area: number, cleaningType: CleaningType, propertyType: PropertyType): string {
  let baseHours = 0;
  switch (cleaningType) {
    case 'maintenance': baseHours = Math.max(2, Math.ceil(area / 25)); break;
    case 'general': baseHours = Math.max(3, Math.ceil(area / 20)); break;
    case 'postRenovation': baseHours = Math.max(4, Math.ceil(area / 15)); break;
    case 'eco': baseHours = Math.max(3, Math.ceil(area / 18)); break;
    case 'vip': baseHours = Math.max(4, Math.ceil(area / 12)); break;
  }
  let multiplier = 1;
  switch (propertyType) {
    case 'house': multiplier = 1.3; break;
    case 'office': multiplier = 0.9; break;
    case 'commercial': multiplier = 1.1; break;
  }
  const totalHours = Math.ceil(baseHours * multiplier);
  if (totalHours <= 4) return `${totalHours} часа`;
  if (totalHours <= 8) return `${totalHours} часов`;
  return `${totalHours} часов (работа в несколько смен)`;
}

export function round10(n: number) { return Math.round(n / 10) * 10; }

export function calculateQuote(opts: {
  area: number;
  propertyType: PropertyType;
  cleaningType: CleaningType;
  windowsCount?: number;
  extrasTotal?: number;
  urgent?: boolean;
  night?: boolean;
  outside?: boolean;
  isNewClient?: boolean;
  bundle?: boolean;
  ratePoint?: 'min' | 'mid' | 'max';
}) {
  const {
    area,
    propertyType,
    cleaningType,
    windowsCount = 0,
    extrasTotal = 0,
    urgent = false,
    night = false,
    outside = false,
    isNewClient = false,
    bundle = false,
    ratePoint = RATE_POINT,
  } = opts;

  const rate = pickRate(propertyType, cleaningType, ratePoint);
  const base = area * rate;
  const windowsCost = windowsCount * WINDOW_PRICE_PER_SASH;
  const subTotal = base + windowsCost + extrasTotal;

  let factor = 1.0;
  if (urgent) factor *= SURCHARGES.urgent;
  if (night) factor *= SURCHARGES.night;
  if (outside) factor *= SURCHARGES.outside;

  const discount = Math.min(1.0, (isNewClient ? DISCOUNTS.new : 1.0), (bundle ? DISCOUNTS.bundle : 1.0));

  const withExtras = subTotal * factor;
  const withDiscount = withExtras * discount;
  const rawTotal = round10(withDiscount);
  const total = Math.max(rawTotal, MIN_ORDER);
  const duration = calculateDuration(area, cleaningType, propertyType);

  return {
    basePrice: round10(base),
    windowsPrice: round10(windowsCost),
    extrasTotal: round10(extrasTotal),
    totalPrice: total,
    duration,
    breakdown: { base: round10(base), windows: round10(windowsCost), extrasFactor: factor, discountFactor: discount },
  } as const;
}


