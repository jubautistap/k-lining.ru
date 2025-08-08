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
}

export default function OrderButton({ 
  service, 
  className = "", 
  children, 
  onClick,
  href
}: OrderButtonProps) {
  const router = useRouter();
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Отслеживание событий с обработкой ошибок
    try {
      // Яндекс.Метрика
      if (typeof window !== 'undefined' && (window as any).ym) {
        (window as any).ym(103567092, 'reachGoal', 'order_button_click', {
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

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`btn-primary ${className}`}
      onClick={handleClick}
      data-order-button="true"
      data-service={service}
      type="button"
    >
      {children}
    </motion.button>
  );
} 