'use client';

import React from 'react';
import { Home, Shield, Sparkles, CheckCircle, Star } from 'lucide-react';

interface CleaningTypeSettingsProps {
  cleaningType: 'maintenance' | 'general' | 'postRenovation' | 'eco' | 'vip';
  setCleaningType: (type: 'maintenance' | 'general' | 'postRenovation' | 'eco' | 'vip') => void;
}

export default function CleaningTypeSettings({ cleaningType, setCleaningType }: CleaningTypeSettingsProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Тип уборки
      </label>
      <div className="space-y-3">
        {[
          { id: 'maintenance', name: 'Поддерживающая', icon: Home },
          { id: 'general', name: 'Генеральная', icon: Shield },
          { id: 'postRenovation', name: 'После ремонта', icon: Sparkles },
          { id: 'eco', name: 'Эко уборка', icon: CheckCircle },
          { id: 'vip', name: 'VIP уборка', icon: Star }
        ].map((type) => (
          <button
            key={type.id}
            onClick={() => setCleaningType(type.id as any)}
            className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left ${
              cleaningType === type.id
                ? 'border-primary-600 bg-primary-50 text-primary-700'
                : 'border-gray-200 hover:border-primary-300'
            }`}
          >
            <div className="flex items-center space-x-3">
              <type.icon className="w-5 h-5" />
              <span className="font-medium">{type.name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}