'use client';

import React from 'react';
import { Sun, Sparkles, Home, Shield, Zap } from 'lucide-react';

interface AdditionalServicesSettingsProps {
  additionalServices: string[];
  handleServiceToggle: (serviceId: string) => void;
}

const additionalServicesList = [
  { id: 'windows', name: 'Мытье окон', price: 600, icon: Sun },
  { id: 'sofa', name: 'Химчистка дивана', price: 3000, icon: Sparkles },
  { id: 'carpet', name: 'Химчистка ковра', price: 1800, icon: Sparkles },
  { id: 'balcony', name: 'Уборка балкона', price: 1200, icon: Home },
  { id: 'fridge', name: 'Мытье холодильника', price: 1000, icon: Home },
  { id: 'wardrobe', name: 'Уборка шкафов', price: 1500, icon: Home },
  { id: 'mattress', name: 'Химчистка матраса', price: 2500, icon: Sparkles },
  { id: 'curtains', name: 'Химчистка штор', price: 2000, icon: Sparkles },
  { id: 'furniture', name: 'Химчистка мягкой мебели', price: 3500, icon: Sparkles },
  { id: 'kitchen', name: 'Уборка кухни', price: 2000, icon: Home },
  { id: 'bathroom', name: 'Уборка санузлов', price: 1500, icon: Home },
  { id: 'pet_hair', name: 'Уборка шерсти животных', price: 1000, icon: Home },
  { id: 'disinfection', name: 'Дезинфекция', price: 2500, icon: Shield },
  { id: 'night', name: 'Ночная уборка', price: 3000, icon: Sun },
  { id: 'express', name: 'Срочная уборка', price: 2000, icon: Zap }
];

export default function AdditionalServicesSettings({ additionalServices, handleServiceToggle }: AdditionalServicesSettingsProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Дополнительные услуги
      </label>
      <div className="grid grid-cols-1 gap-2 max-h-80 overflow-y-auto">
        {additionalServicesList.map((service) => (
          <button
            key={service.id}
            onClick={() => handleServiceToggle(service.id)}
            className={`p-3 rounded-lg border-2 transition-all duration-200 text-left ${
              additionalServices.includes(service.id)
                ? 'border-primary-600 bg-primary-50 text-primary-700'
                : 'border-gray-200 hover:border-primary-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <service.icon className="w-4 h-4" />
                <span className="text-sm">{service.name}</span>
              </div>
              <span className="text-sm font-medium">{service.price} ₽</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}