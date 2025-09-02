export interface CalculationResult {
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
    publicPrice: number;
    ourCost: number;
    profit: number;
  };
}

export interface Employee {
  id: string;
  name: string;
  hourlyRate: number;
  efficiency: number; // м²/час
  type: 'freelance' | 'staff'; // фрилансер или штатный
  maxHoursPerDay?: number; // максимальные часы в день
  overtimeRate?: number; // ставка за сверхурочные
}

export interface Material {
  name: string;
  costPerSqm: number;
  usage: number; // % от площади
}

export interface Preset {
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

export type PropertyType = 'apartment' | 'house' | 'office' | 'commercial';
export type CleaningType = 'maintenance' | 'general' | 'postRenovation' | 'eco' | 'vip';