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
}

const AmoCRMContext = createContext<AmoCRMContextType | undefined>(undefined);

export function useAmoCRM() {
  const context = useContext(AmoCRMContext);
  if (!context) {
    throw new Error('useAmoCRM must be used within AmoCRMProvider');
  }
  return context;
}

export default function AmoCRMProvider({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Проверяем что мы на клиенте (избегаем hydration mismatch)
    if (typeof window === 'undefined') return;
    
    // Показываем модальное окно через 5 секунд после загрузки
    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const submitLead = async (data: LeadData) => {
    try {
      // Здесь будет интеграция с amoCRM API
      const response = await fetch('/api/amo-crm/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
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