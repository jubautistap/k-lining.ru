'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface OrderButtonProps {
  service: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  'aria-label'?: string;
}

export default function OrderButton({ 
  service, 
  className = "", 
  children, 
  onClick,
  href,
  disabled = false,
  'aria-label': ariaLabel
}: OrderButtonProps) {
  const router = useRouter();
  const YM_ID = Number(process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID) || 103567092;
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (disabled) return;
    
    // Отслеживание событий с обработкой ошибок
    try {
      // Яндекс.Метрика
      if (typeof window !== 'undefined' && (window as any).ym) {
        (window as any).ym(YM_ID, 'reachGoal', 'order_button_click', {
          service: service,
          button_text: children,
          page_url: window.location.href
        });
      }
      
      // Google Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'order_button_click', {
          service: service,
          button_text: children,
          page_url: window.location.href
        });
      }
    } catch (error) {
      console.warn('Ошибка отслеживания события:', error);
    }
    
    // Вызываем пользовательский обработчик
    if (onClick) {
      onClick();
      return;
    }

    // Дефолтное действие: навигация на страницу контактов (или указанную ссылку)
    try {
      router.push(href || '/contacts');
    } catch (navError) {
      console.warn('Ошибка навигации по кнопке заказа:', navError);
    }
  };

  const buttonProps = {
    className: `btn-primary ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`,
    onClick: handleClick,
    'data-order-button': 'true',
    'data-service': service,
    type: 'button' as const,
    disabled,
    'aria-label': ariaLabel || `Заказать услугу: ${service}`,
    'aria-disabled': disabled,
    role: 'button'
  };

  if (disabled) {
    return (
      <button {...buttonProps}>
        {children}
      </button>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...buttonProps}
    >
      {children}
    </motion.button>
  );
} 