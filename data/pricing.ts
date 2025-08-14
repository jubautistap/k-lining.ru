export type RatePoint = 'min' | 'mid' | 'max';

export type PropertyType = 'apartment' | 'house' | 'office' | 'commercial';
export type CleaningType = 'maintenance' | 'general' | 'postRenovation' | 'eco' | 'vip';

export interface RateTier {
  min: number;
  mid: number;
  max: number;
}

export type PricingRates = Record<PropertyType, Record<CleaningType, RateTier>>;

export const PRICING_RATES: PricingRates = {
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

export const RATE_POINT: RatePoint = 'mid';
export const WINDOW_PRICE_PER_SASH = 600;
export const MIN_ORDER = 6000;
export const SURCHARGES = { urgent: 1.20, night: 1.15, outside: 1.15 } as const;
export const DISCOUNTS = { new: 0.90, bundle: 0.85 } as const;


