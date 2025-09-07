'use client';

import React from 'react';
import { motion } from 'framer-motion';
import CalculatorErrorBoundary from '@/components/CalculatorErrorBoundary';
import CalculatorHeader from '@/components/admin/calculator/CalculatorHeader';
import PropertySettings from '@/components/admin/calculator/PropertySettings';
import CleaningTypeSettings from '@/components/admin/calculator/CleaningTypeSettings';
import SpecialModesSettings from '@/components/admin/calculator/SpecialModesSettings';
import AdditionalServicesSettings from '@/components/admin/calculator/AdditionalServicesSettings';
import StaffSettings from '@/components/admin/calculator/StaffSettings';
import CalculationResult from '@/components/admin/calculator/CalculationResult';
import FinancialAnalysis from '@/components/admin/calculator/FinancialAnalysis';
import OrderForm from '@/components/admin/calculator/OrderForm';
import { useCalculator } from '@/hooks/useCalculator';

export default function CalculatorPageContent() {
  const {
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
  } = useCalculator();

  return (
    <CalculatorErrorBoundary calculatorType="admin">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CalculatorHeader />
        
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-6">
              <PropertySettings 
                propertyType={propertyType} 
                setPropertyType={setPropertyType} 
                area={area} 
                setArea={setArea} 
                customArea={customArea} 
                setCustomArea={setCustomArea} 
              />
              <CleaningTypeSettings 
                cleaningType={cleaningType} 
                setCleaningType={setCleaningType} 
              />
              <SpecialModesSettings 
                isNightMode={isNightMode} 
                setIsNightMode={setIsNightMode} 
                isEmergencyMode={isEmergencyMode} 
                setIsEmergencyMode={setIsEmergencyMode} 
              />
            </div>

            <div className="space-y-6">
              <AdditionalServicesSettings 
                additionalServices={additionalServices} 
                handleServiceToggle={handleServiceToggle} 
              />
              <StaffSettings />
            </div>

            <div className="space-y-6">
              <CalculationResult 
                result={result} 
                area={area} 
                isNightMode={isNightMode} 
                isEmergencyMode={isEmergencyMode} 
                additionalServicesList={additionalServicesList} 
              />
              <FinancialAnalysis result={result} />
              <OrderForm 
                result={result} 
                leadId={leadId} 
                setLeadId={setLeadId} 
                clientName={clientName} 
                setClientName={setClientName} 
                clientPhone={clientPhone} 
                setClientPhone={setClientPhone} 
                managerNote={managerNote} 
                setManagerNote={setManagerNote} 
                serviceNames={serviceNames} 
                cleaningType={cleaningType} 
                area={area} 
              />
            </div>
          </div>
        </div>
      </div>
    </CalculatorErrorBoundary>
  );
}