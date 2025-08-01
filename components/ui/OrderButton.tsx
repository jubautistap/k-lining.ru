'use client';

import React from 'react';
import { useAmoCRM } from '@/components/providers/AmoCRMProvider';

interface OrderButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export default function OrderButton({ children, className = '', variant = 'primary' }: OrderButtonProps) {
  const { openModal } = useAmoCRM();

  const baseClasses = 'inline-block px-6 py-3 rounded-lg font-semibold transition-colors w-full text-center';
  
  const variantClasses = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700',
    secondary: 'bg-white text-primary-600 border-2 border-primary-600 hover:bg-gray-50'
  };

  return (
    <button
      onClick={openModal}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
} 