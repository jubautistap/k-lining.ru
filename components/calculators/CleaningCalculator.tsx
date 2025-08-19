'use client';

import React from 'react';
import CalculatorForm from './CalculatorForm';
import ServiceSelector from './ServiceSelector';
import CalculatorResults from './CalculatorResults';
import { useCalculator } from './useCalculator';

export default function CleaningCalculator() {
  const {
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
    result,
    servicesSearch,
    setServicesSearch,
    animatedTotal,
    breakdown,
    
    // Действия
    resetCalculator
  } = useCalculator();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          {/* Заголовок */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Калькулятор уборки
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Рассчитайте стоимость уборки вашего помещения. Выберите тип недвижимости, 
              площадь и дополнительные услуги для точного расчета.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Левая колонка - Форма */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <CalculatorForm
                  propertyType={propertyType}
                  setPropertyType={setPropertyType}
                  area={area}
                  setArea={setArea}
                  customArea={customArea}
                  setCustomArea={setCustomArea}
                  cleaningType={cleaningType}
                  setCleaningType={setCleaningType}
                />
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <ServiceSelector
                  additionalServices={additionalServices}
                  setAdditionalServices={setAdditionalServices}
                  servicesSearch={servicesSearch}
                  setServicesSearch={setServicesSearch}
                />
              </div>
            </div>

            {/* Правая колонка - Результаты */}
            <div className="lg:sticky lg:top-8 lg:self-start">
              <CalculatorResults
                result={result}
                breakdown={breakdown}
                onReset={resetCalculator}
                animatedTotal={animatedTotal}
              />
            </div>
          </div>

          {/* Дополнительная информация */}
          <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Как работает калькулятор?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-600">1</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Выберите параметры</h3>
                <p className="text-gray-600 text-sm">
                  Укажите тип недвижимости, площадь и вид уборки
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-600">2</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Добавьте услуги</h3>
                <p className="text-gray-600 text-sm">
                  Выберите дополнительные услуги по необходимости
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-600">3</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Получите расчет</h3>
                <p className="text-gray-600 text-sm">
                  Мгновенный расчет стоимости и времени работы
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 