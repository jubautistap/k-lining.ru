'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Mail, User, MessageSquare, Sparkles, CheckCircle, Shield, Clock, FileText } from 'lucide-react';
import { useAmoCRM } from '../providers/AmoCRMProvider';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import Image from 'next/image';

const formSchema = z.object({
  phone: z.string().min(10, 'Введите корректный номер телефона'),
});

type FormData = z.infer<typeof formSchema>;

export default function AmoCRMModal() {
  const { isModalOpen, closeModal, submitLead } = useAmoCRM();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<'messengers' | 'callback'>('messengers');

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
      await submitLead({
        name: 'Заявка на звонок',
        phone: data.phone,
        service: 'Обратный звонок'
      });
      toast.success('Спасибо! Мы перезвоним вам в ближайшее время.');
      reset();
      closeModal();
    } catch (error) {
      toast.error('Произошла ошибка. Попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent('Здравствуйте! Хочу получить консультацию по услугам клининга.');
    window.open(`https://wa.me/74951234567?text=${message}`, '_blank');
    closeModal();
  };

  const handleTelegram = () => {
    const message = encodeURIComponent('Здравствуйте! Хочу получить консультацию по услугам клининга.');
    window.open(`https://t.me/kliningpro?text=${message}`, '_blank');
    closeModal();
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-primary-600 to-primary-700 text-white p-6">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm overflow-hidden">
                  <Image
                    src="/hero.PNG"
                    alt="KliningPro"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">
                    Получить консультацию
                  </h2>
                  <p className="text-primary-100 text-sm">
                    Бесплатно и без обязательств
                  </p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('messengers')}
                className={`flex-1 py-4 px-6 text-sm font-medium transition-colors duration-200 ${
                  activeTab === 'messengers' 
                    ? 'text-primary-600 border-b-2 border-primary-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Мессенджеры
              </button>
              <button
                onClick={() => setActiveTab('callback')}
                className={`flex-1 py-4 px-6 text-sm font-medium transition-colors duration-200 ${
                  activeTab === 'callback' 
                    ? 'text-primary-600 border-b-2 border-primary-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Обратный звонок
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {activeTab === 'messengers' ? (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <p className="text-gray-600 text-sm">
                      Напишите нам в мессенджеры и мы ответим Вам в течение 10 минут!
                    </p>
                  </div>

                  {/* WhatsApp Button */}
                  <button
                    onClick={handleWhatsApp}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-2xl p-4 flex items-center justify-center space-x-3 transition-colors duration-200 shadow-lg"
                  >
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                      </svg>
                    </div>
                    <span className="font-semibold">Написать в WhatsApp</span>
                  </button>

                  {/* Telegram Button */}
                  <button
                    onClick={handleTelegram}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-2xl p-4 flex items-center justify-center space-x-3 transition-colors duration-200 shadow-lg"
                  >
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                      </svg>
                    </div>
                    <span className="font-semibold">Написать в Telegram</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="text-center mb-6">
                    <p className="text-gray-600 text-sm">
                      Оставьте номер телефона и мы перезвоним вам в течение 10 минут!
                    </p>
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Номер телефона *
                    </label>
                    <input
                      {...register('phone')}
                      type="tel"
                      className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 text-lg"
                      placeholder="+7 (999) 123-45-67"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>

                  {/* Consent */}
                  <div className="flex items-center space-x-2 text-xs text-gray-600">
                    <CheckCircle className="w-4 h-4 text-primary-500" />
                    <span>
                      Нажимая кнопку, вы даете согласие на{' '}
                      <span className="text-primary-500 font-medium">обработку персональных данных</span>
                    </span>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-2xl py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 shadow-lg"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Отправляем...</span>
                      </div>
                    ) : (
                      'Заказать обратный звонок'
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 