'use client';

import React, { useState } from 'react';
import { X, Phone, CheckCircle } from 'lucide-react';
import { useAmoCRM } from '../providers/AmoCRMProvider';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';

const formSchema = z.object({
  phone: z.string().min(10, 'Введите корректный номер телефона'),
});

type FormData = z.infer<typeof formSchema>;

export default function AmoCRMModal() {
  const { isModalOpen, closeModal, submitLead } = useAmoCRM();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Отслеживание событий с обработкой ошибок
      try {
        // Яндекс.Метрика
        if (typeof window !== 'undefined' && (window as any).ym) {
          (window as any).ym(103567092, 'reachGoal', 'form_submit', {
            form_type: 'callback',
            service: 'callback',
            page_url: window.location.href
          });
        }
        
        // Google Analytics
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'form_submit', {
            form_type: 'callback',
            service: 'callback',
            page_url: window.location.href
          });
        }
      } catch (error) {
        console.warn('Ошибка отслеживания события формы:', error);
      }

      await submitLead({
        name: 'Заявка на звонок',
        phone: data.phone,
        service: 'Обратный звонок'
      });
      toast.success('Спасибо! Мы перезвоним вам в ближайшее время.');
      reset();
      closeModal();
    } catch (error) {
      console.error('Ошибка отправки заявки:', error);
      toast.error('Произошла ошибка. Попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    try {
      const message = encodeURIComponent('Здравствуйте! Хочу получить консультацию по услугам клининга.');
      if (typeof window !== 'undefined') {
        window.open(`https://wa.me/79255551833?text=${message}`, '_blank');
      }
      closeModal();
    } catch (error) {
      console.error('Ошибка открытия WhatsApp:', error);
    }
  };

  const handleTelegram = () => {
    try {
      const message = encodeURIComponent('Здравствуйте! Хочу получить консультацию по услугам клининга.');
      if (typeof window !== 'undefined') {
        window.open(`https://t.me/kliningpro?text=${message}`, '_blank');
      }
      closeModal();
    } catch (error) {
      console.error('Ошибка открытия Telegram:', error);
    }
  };

  if (!isModalOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
      onClick={closeModal}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-6 pb-4">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-primary-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Получить консультацию
            </h2>
            <p className="text-gray-600">
              Оставьте номер телефона, и мы перезвоним вам в течение 5 минут
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="px-6 pb-6">
          <form onSubmit={handleSubmit(onSubmit)} data-form-type="callback">
            <div className="space-y-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Номер телефона *
                </label>
                <input
                  {...register('phone')}
                  type="tel"
                  id="phone"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="+7 (999) 123-45-67"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Отправляем...</span>
                  </>
                ) : (
                  <>
                    <Phone className="w-5 h-5" />
                    <span>Заказать звонок</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Alternative contact methods */}
          <div className="mt-6 space-y-3">
            <p className="text-center text-sm text-gray-500">Или свяжитесь с нами напрямую:</p>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleWhatsApp}
                className="flex items-center justify-center space-x-2 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                <span>WhatsApp</span>
              </button>
              
              <button
                onClick={handleTelegram}
                className="flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
                <span>Telegram</span>
              </button>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Бесплатно</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Без спама</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>5 минут</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 