import { useMemo } from 'react';
import { Employee, CalculationResult, PropertyType, CleaningType } from '../types';
import { 
  RATES, 
  RATE_POINT, 
  WINDOW_PRICE_PER_SASH, 
  MIN_ORDER, 
  SURCHARGES,
  additionalServicesList,
  commercialServicesList,
  materialsList,
  serviceNames
} from '../constants';

interface UseCalculationsProps {
  propertyType: PropertyType;
  area: number;
  cleaningType: CleaningType;
  additionalServices: string[];
  commercialServices: string[];
  specialModes: string[];
  distance: number;
  windowsCount: number;
  urgent: boolean;
  night: boolean;
  outside: boolean;
  selectedEmployeeData?: Employee;
}

export function useCalculations({
  propertyType,
  area,
  cleaningType,
  additionalServices,
  commercialServices,
  specialModes,
  distance,
  windowsCount,
  urgent,
  night,
  outside,
  selectedEmployeeData
}: UseCalculationsProps): CalculationResult | null {
  return useMemo(() => {
    if (!selectedEmployeeData) return null;

    const employee = selectedEmployeeData;

    // Calculate team time and composition
    const timePerSqm = employee.efficiency; // м²/час
    const totalHours = Math.ceil(area / timePerSqm);
    const employeesCount = 1; // Один выбранный сотрудник

    let regularHours = totalHours;
    let overtimeHours = 0;

    if (employee.type === 'staff' && employee.maxHoursPerDay) {
      if (totalHours > employee.maxHoursPerDay) {
        regularHours = employee.maxHoursPerDay;
        overtimeHours = totalHours - employee.maxHoursPerDay;
      }
    }

    // Calculate labor cost
    let labor = 0;
    if (employee.type === 'staff') {
      const regularCost = regularHours * employee.hourlyRate;
      const overtimeCost = overtimeHours * (employee.overtimeRate || employee.hourlyRate * 1.5);
      labor = regularCost + overtimeCost;
    } else {
      labor = totalHours * employee.hourlyRate;
    }

    // Calculate materials
    const baseMaterials = materialsList.reduce((sum, material) => {
      return sum + (material.costPerSqm * area * (material.usage / 100));
    }, 0);

    const additionalMaterials = additionalServices.reduce((sum, serviceId) => {
      const service = additionalServicesList.find(s => s.id === serviceId);
      return sum + (service?.materials || 0);
    }, 0);

    const commercialMaterials = commercialServices.reduce((sum, serviceId) => {
      const service = commercialServicesList.find(s => s.id === serviceId);
      return sum + (service?.materials || 0);
    }, 0);

    const materials = baseMaterials + additionalMaterials + commercialMaterials;

    // Transport cost (round trip) - multiply by employee count
    const transportCostPerKm = 50; // руб/км
    const transport = distance * transportCostPerKm * 2 * employeesCount;

    // Overhead costs (20% of labor)
    const overhead = labor * 0.2;

    const totalCost = labor + materials + transport + overhead;

    // Calculate public price (as shown on website)
    const pickRate = () => {
      const prop: any = RATES[propertyType] ?? RATES.apartment;
      const r = prop[cleaningType] ?? (RATES.apartment as any).general;
      return r[RATE_POINT] as number;
    };

    const extrasFactor = () => {
      let f = 1.0;
      if (urgent) f *= SURCHARGES.urgent;
      if (night) f *= SURCHARGES.night;
      if (outside) f *= SURCHARGES.outside;
      return f;
    };

    const round10 = (n: number) => Math.round(n / 10) * 10;

    const basePublic = area * pickRate();
    const windowsCost = windowsCount * WINDOW_PRICE_PER_SASH;

    // Additional services price for public
    const publicAdditionalIds = new Set(['kitchen','bathroom','balcony','fridge','disinfection','carpet']);
    const additionalPricePublic = additionalServices.reduce((sum, serviceId) => {
      if (!publicAdditionalIds.has(serviceId)) return sum;
      const service = additionalServicesList.find(s => s.id === serviceId);
      return sum + (service?.price || 0);
    }, 0);

    const subTotalPublic = basePublic + windowsCost + additionalPricePublic;
    const rawClientTotal = round10(subTotalPublic * extrasFactor());
    const totalPrice = Math.max(rawClientTotal, MIN_ORDER);

    // Calculate profit
    const profit = totalPrice - totalCost;
    const grossMargin = profit;
    const netMargin = profit * 0.8; // Taxes ~20%
    const marginPercentage = (profit / totalPrice) * 100;

    // Generate service list
    const services = [serviceNames[cleaningType]];
    
    additionalServices.forEach(serviceId => {
      const service = additionalServicesList.find(s => s.id === serviceId);
      if (service) services.push(service.name);
    });

    commercialServices.forEach(serviceId => {
      const service = commercialServicesList.find(s => s.id === serviceId);
      if (service) services.push(service.name);
    });

    return {
      basePrice: basePublic,
      additionalServices: additionalPricePublic,
      commercialServices: commercialServices.length,
      totalPrice,
      duration: `${totalHours} ${totalHours === 1 ? 'час' : totalHours < 5 ? 'часа' : 'часов'}`,
      services,
      team: {
        employeesCount,
        totalHours,
        regularHours,
        overtimeHours,
        costPerEmployee: labor / employeesCount,
        totalLaborCost: labor
      },
      costs: {
        labor,
        materials,
        transport,
        overhead,
        profit,
        totalCost
      },
      margins: {
        grossMargin,
        netMargin,
        marginPercentage
      },
      pricing: {
        publicPrice: totalPrice,
        ourCost: totalCost,
        profit
      }
    };
  }, [
    propertyType,
    area,
    cleaningType,
    additionalServices,
    commercialServices,
    specialModes,
    distance,
    windowsCount,
    urgent,
    night,
    outside,
    selectedEmployeeData
  ]);
}