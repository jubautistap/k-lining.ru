'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface AmoCRMContextType {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  submitLead: (data: LeadData) => Promise<void>;
}

interface LeadData {
  name: string;
  phone: string;
  email?: string;
  service?: string;
  message?: string;
  utm?: Record<string, string>;
  referrer?: string;
  page?: string;
}

const AmoCRMContext = createContext<AmoCRMContextType | undefined>(undefined);

export function useAmoCRM(): AmoCRMContextType {
  const context = useContext(AmoCRMContext);
  if (context) return context;
  // Безопасный no-op фолбэк, чтобы не падать на страницах без провайдера
  return {
    isModalOpen: false,
    openModal: () => {},
    closeModal: () => {},
    submitLead: async () => {},
  };
}

export default function AmoCRMProvider({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Проверяем что мы на клиенте (избегаем hydration mismatch)
    if (typeof window === 'undefined') return;
    
    // Показываем модальное окно через 5 секунд, один раз за сессию
    if (!sessionStorage.getItem('amocrm_modal_shown')) {
      const timer = setTimeout(() => {
        setIsModalOpen(true);
        sessionStorage.setItem('amocrm_modal_shown', '1');
      }, 5000);
      return () => clearTimeout(timer);
    }

    return () => {};
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const submitLead = async (data: LeadData) => {
    try {
      // Собираем UTM и источники на клиенте
      let utm: Record<string, string> | undefined = undefined;
      let referrer: string | undefined = undefined;
      let page: string | undefined = undefined;
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const keys = ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','gclid','yclid','ymclid','fbclid','_openstat'];
        const collected: Record<string,string> = {};
        keys.forEach(k => {
          const v = params.get(k);
          if (v) collected[k] = v;
        });
        if (Object.keys(collected).length > 0) utm = collected;
        referrer = document.referrer || undefined;
        page = window.location.href;
      }

      const payload: LeadData = { ...data, ...(utm ? { utm } : {}), ...(referrer ? { referrer } : {}), ...(page ? { page } : {}) };

      // Единая точка отправки
      const response = await fetch('/api/amo-crm/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to submit lead');
      }

      // Закрываем модальное окно после успешной отправки
      closeModal();
    } catch (error) {
      console.error('Error submitting lead:', error);
      throw error;
    }
  };

  const value = {
    isModalOpen,
    openModal,
    closeModal,
    submitLead,
  };

  return (
    <AmoCRMContext.Provider value={value}>
      {children}
    </AmoCRMContext.Provider>
  );
} 