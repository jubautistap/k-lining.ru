import { useState, useCallback, useMemo } from 'react';
import { Employee, Preset, PropertyType, CleaningType, CalculationResult } from '../types';

const initialEmployees: Employee[] = [
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
];

export function useCalculatorState() {
  // Basic settings
  const [propertyType, setPropertyType] = useState<PropertyType>('apartment');
  const [area, setArea] = useState<number>(50);
  const [customArea, setCustomArea] = useState<string>('');
  const [cleaningType, setCleaningType] = useState<CleaningType>('maintenance');
  const [distance, setDistance] = useState<number>(10);

  // Services
  const [additionalServices, setAdditionalServices] = useState<string[]>([]);
  const [commercialServices, setCommercialServices] = useState<string[]>([]);
  const [specialModes, setSpecialModes] = useState<string[]>([]);

  // Public calculator alignment params
  const [windowsCount, setWindowsCount] = useState<number>(0);
  const [urgent, setUrgent] = useState<boolean>(false);
  const [night, setNight] = useState<boolean>(false);
  const [outside, setOutside] = useState<boolean>(false);

  // Staff
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [selectedEmployee, setSelectedEmployee] = useState<string>('1');

  // Presets
  const [presets, setPresets] = useState<Preset[]>([]);
  const [showPresetModal, setShowPresetModal] = useState(false);
  const [newPresetName, setNewPresetName] = useState('');

  // Export settings
  const [showExportModal, setShowExportModal] = useState(false);
  const [orderLeadId, setOrderLeadId] = useState('');
  const [orderNotes, setOrderNotes] = useState('');

  const selectedEmployeeData = useMemo(
    () => employees.find(e => e.id === selectedEmployee),
    [employees, selectedEmployee]
  );

  const resetCalculator = useCallback(() => {
    setPropertyType('apartment');
    setArea(50);
    setCustomArea('');
    setCleaningType('maintenance');
    setDistance(10);
    setAdditionalServices([]);
    setCommercialServices([]);
    setSpecialModes([]);
    setWindowsCount(0);
    setUrgent(false);
    setNight(false);
    setOutside(false);
    setSelectedEmployee('1');
  }, []);

  const loadPreset = useCallback((preset: Preset) => {
    setPropertyType(preset.propertyType);
    setCleaningType(preset.cleaningType);
    setArea(preset.area);
    setCustomArea(preset.area.toString());
    setDistance(preset.distance);
    setSelectedEmployee(preset.employeeId);
    setAdditionalServices(preset.additionalServices);
    setCommercialServices(preset.commercialServices);
    setSpecialModes(preset.specialModes);
  }, []);

  const saveCurrentAsPreset = useCallback(() => {
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
  }, [
    newPresetName, propertyType, cleaningType, area, distance,
    selectedEmployee, additionalServices, commercialServices, specialModes
  ]);

  return {
    // State
    propertyType,
    area,
    customArea,
    cleaningType,
    distance,
    additionalServices,
    commercialServices,
    specialModes,
    windowsCount,
    urgent,
    night,
    outside,
    employees,
    selectedEmployee,
    selectedEmployeeData,
    presets,
    showPresetModal,
    newPresetName,
    showExportModal,
    orderLeadId,
    orderNotes,

    // Setters
    setPropertyType,
    setArea,
    setCustomArea,
    setCleaningType,
    setDistance,
    setAdditionalServices,
    setCommercialServices,
    setSpecialModes,
    setWindowsCount,
    setUrgent,
    setNight,
    setOutside,
    setEmployees,
    setSelectedEmployee,
    setPresets,
    setShowPresetModal,
    setNewPresetName,
    setShowExportModal,
    setOrderLeadId,
    setOrderNotes,

    // Actions
    resetCalculator,
    loadPreset,
    saveCurrentAsPreset,
  };
}