'use client';

import React from 'react';
import { Home, Shield, Building, Search, Check } from 'lucide-react';

interface ServiceSelectorProps {
  additionalServices: string[];
  setAdditionalServices: (services: string[] | ((prev: string[]) => string[])) => void;
  servicesSearch: string;
  setServicesSearch: (search: string) => void;
}

const additionalServicesList = [
  { id: 'kitchen', name: 'Уборка кухни', price: 2000, icon: Home },
  { id: 'bathroom', name: 'Уборка санузла', price: 1500, icon: Shield },
  { id: 'balcony', name: 'Уборка балкона', price: 1000, icon: Building },
  { id: 'fridge', name: 'Мытье холодильника', price: 800, icon: Home },
  { id: 'oven', name: 'Чистка духовки', price: 1200, icon: Home },
  { id: 'disinfection', name: 'Дезинфекция', price: 3000, icon: Shield },
  { id: 'carpet', name: 'Химчистка ковра', price: 1800, icon: Shield },
  { id: 'sofa', name: 'Химчистка дивана', price: 3000, icon: Home },
  { id: 'mattress', name: 'Химчистка матраса', price: 2500, icon: Home },
  { id: 'wardrobe', name: 'Уборка шкафов', price: 1500, icon: Building }
];

export default function ServiceSelector({
  additionalServices,
  setAdditionalServices,
  servicesSearch,
  setServicesSearch
}: ServiceSelectorProps) {
  const handleServiceToggle = (serviceId: string) => {
    setAdditionalServices((prev: string[]) => 
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const filteredServices = additionalServicesList.filter(service =>
    service.name.toLowerCase().includes(servicesSearch.toLowerCase())
  );

  const getSelectedServicePrice = (serviceId: string) => {
    const service = additionalServicesList.find(s => s.id === serviceId);
    return service?.price || 0;
  };

  const totalAdditionalPrice = additionalServices.reduce(
    (sum, serviceId) => sum + getSelectedServicePrice(serviceId), 0
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Дополнительные услуги
        </h3>
        
        {/* Поиск услуг */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={servicesSearch}
            onChange={(e) => setServicesSearch(e.target.value)}
            placeholder="Поиск услуг..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Список услуг */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredServices.map((service) => {
            const Icon = service.icon;
            const isSelected = additionalServices.includes(service.id);
            
            return (
              <button
                key={service.id}
                onClick={() => handleServiceToggle(service.id)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 text-left hover:shadow-sm ${
                  isSelected
                    ? 'border-primary-600 bg-primary-50 text-primary-700 ring-2 ring-primary-100'
                    : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center mt-0.5">
                      <Icon className="w-4 h-4 text-primary-600" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{service.name}</div>
                      <div className="text-xs text-gray-500">{service.price} ₽</div>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-primary-600 bg-primary-600 text-white' : 'border-gray-300 text-transparent'}`}>
                    <Check className="w-4 h-4" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Итого по дополнительным услугам */}
        {additionalServices.length > 0 && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">Дополнительные услуги:</span>
              <span className="font-bold text-lg text-primary-600">
                +{totalAdditionalPrice.toLocaleString()} ₽
              </span>
            </div>
            <div className="text-sm text-gray-500 mt-1">
              Выбрано услуг: {additionalServices.length}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}