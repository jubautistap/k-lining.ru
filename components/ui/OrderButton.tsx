'use client';

import React from 'react';
import { useAmoCRM } from '@/components/providers/AmoCRMProvider';

interface OrderButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
  service?: string;
}

export default function OrderButton({ children, className = '', variant = 'primary', service = 'general' }: OrderButtonProps) {
  const { openModal } = useAmoCRM();

  const baseClasses = 'inline-block px-6 py-3 rounded-lg font-semibold transition-colors w-full text-center';
  
  const variantClasses = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700',
    secondary: 'bg-white text-primary-600 border-2 border-primary-600 hover:bg-gray-50'
  };

  const handleClick = () => {
    // Отслеживание события в Яндекс.Метрике
    if (typeof window !== 'undefined' && (window as any).ym) {
      (window as any).ym(103567092, 'reachGoal', 'order_button_click', {
        service: service
      });
    }
    
    // Отслеживание события в Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'order_button_click', {
        service: service,
        button_text: children
      });
    }
    
    openModal();
  };

  return (
    <button
      onClick={handleClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      data-order-button="true"
      data-service={service}
    >
      {children}
    </button>
  );
} 