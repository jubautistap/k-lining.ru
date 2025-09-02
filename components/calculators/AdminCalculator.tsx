'use client';

import React from 'react';
import { motion } from 'framer-motion';

// Import Error Boundary
import CalculatorErrorBoundary from '@/components/CalculatorErrorBoundary';

// Import all components
import CalculatorHeader from '@/components/admin/CalculatorHeader';
import PropertySettings from '@/components/admin/PropertySettings';
import StaffSettings from '@/components/admin/StaffSettings';
import CostBreakdown from '@/components/admin/CostBreakdown';
import ProfitAnalysis from '@/components/admin/ProfitAnalysis';
import ExportTools from '@/components/admin/ExportTools';

// Import hooks
import { useCalculatorState } from '@/components/admin/hooks/useCalculatorState';
import { useCalculations } from '@/components/admin/hooks/useCalculations';

// Import data
import { additionalServicesList, commercialServicesList } from '@/components/admin/constants';

export default function AdminCalculatorRefactored() {
  const calculatorState = useCalculatorState();
  
  const result = useCalculations({
    propertyType: calculatorState.propertyType,
    area: calculatorState.area,
    cleaningType: calculatorState.cleaningType,
    additionalServices: calculatorState.additionalServices,
    commercialServices: calculatorState.commercialServices,
    specialModes: calculatorState.specialModes,
    distance: calculatorState.distance,
    windowsCount: calculatorState.windowsCount,
    urgent: calculatorState.urgent,
    night: calculatorState.night,
    outside: calculatorState.outside,
    selectedEmployeeData: calculatorState.selectedEmployeeData
  });

  const downloadJSON = () => {
    if (!result) return;
    
    const data = {
      timestamp: new Date().toISOString(),
      calculation: result,
      parameters: {
        propertyType: calculatorState.propertyType,
        area: calculatorState.area,
        cleaningType: calculatorState.cleaningType,
        additionalServices: calculatorState.additionalServices,
        distance: calculatorState.distance,
        selectedEmployee: calculatorState.selectedEmployeeData
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

  return (
    <CalculatorErrorBoundary calculatorType="admin">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <CalculatorHeader
          presets={calculatorState.presets}
          newPresetName={calculatorState.newPresetName}
          setNewPresetName={calculatorState.setNewPresetName}
          showPresetModal={calculatorState.showPresetModal}
          setShowPresetModal={calculatorState.setShowPresetModal}
          onLoadPreset={calculatorState.loadPreset}
          onSavePreset={calculatorState.saveCurrentAsPreset}
          onReset={calculatorState.resetCalculator}
          onExport={downloadJSON}
          onShowExport={() => calculatorState.setShowExportModal(true)}
        />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Left Column - Settings */}
          <div className="space-y-6">
            <PropertySettings
              propertyType={calculatorState.propertyType}
              setPropertyType={calculatorState.setPropertyType}
              area={calculatorState.area}
              setArea={calculatorState.setArea}
              customArea={calculatorState.customArea}
              setCustomArea={calculatorState.setCustomArea}
              cleaningType={calculatorState.cleaningType}
              setCleaningType={calculatorState.setCleaningType}
              distance={calculatorState.distance}
              setDistance={calculatorState.setDistance}
              windowsCount={calculatorState.windowsCount}
              setWindowsCount={calculatorState.setWindowsCount}
              urgent={calculatorState.urgent}
              setUrgent={calculatorState.setUrgent}
              night={calculatorState.night}
              setNight={calculatorState.setNight}
              outside={calculatorState.outside}
              setOutside={calculatorState.setOutside}
            />

            <StaffSettings
              employees={calculatorState.employees}
              setEmployees={calculatorState.setEmployees}
              selectedEmployee={calculatorState.selectedEmployee}
              setSelectedEmployee={calculatorState.setSelectedEmployee}
            />

            {/* Additional Services */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Дополнительные услуги</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {additionalServicesList.map(service => (
                  <label
                    key={service.id}
                    className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={calculatorState.additionalServices.includes(service.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          calculatorState.setAdditionalServices([...calculatorState.additionalServices, service.id]);
                        } else {
                          calculatorState.setAdditionalServices(calculatorState.additionalServices.filter(id => id !== service.id));
                        }
                      }}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{service.name}</div>
                      <div className="text-sm text-gray-600">{service.price} ₽</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Commercial Services */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Коммерческие услуги</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {commercialServicesList.slice(0, 8).map(service => (
                  <label
                    key={service.id}
                    className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={calculatorState.commercialServices.includes(service.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          calculatorState.setCommercialServices([...calculatorState.commercialServices, service.id]);
                        } else {
                          calculatorState.setCommercialServices(calculatorState.commercialServices.filter(id => id !== service.id));
                        }
                      }}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{service.name}</div>
                      <div className="text-sm text-gray-600">{service.price} ₽</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            <CostBreakdown result={result} />
            <ProfitAnalysis result={result} />
          </div>
        </div>

        {/* Export Modal */}
        <ExportTools
          result={result}
          showExportModal={calculatorState.showExportModal}
          setShowExportModal={calculatorState.setShowExportModal}
          orderLeadId={calculatorState.orderLeadId}
          setOrderLeadId={calculatorState.setOrderLeadId}
          orderNotes={calculatorState.orderNotes}
          setOrderNotes={calculatorState.setOrderNotes}
          parameters={{
            propertyType: calculatorState.propertyType,
            area: calculatorState.area,
            cleaningType: calculatorState.cleaningType,
            additionalServices: calculatorState.additionalServices,
            distance: calculatorState.distance,
            selectedEmployee: calculatorState.selectedEmployeeData
          }}
        />
      </div>
    </CalculatorErrorBoundary>
  );
}