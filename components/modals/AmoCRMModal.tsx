'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { X, Phone, Sparkles, Percent, Home, Building2, Factory, Store, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { useAmoCRM } from '../providers/AmoCRMProvider';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { calculateQuote, MIN_ORDER, type PropertyType, type CleaningType } from '@/components/calculators/calcUtils';

const formSchema = z.object({
  phone: z.string().min(10, 'Введите корректный номер телефона'),
});

type FormData = z.infer<typeof formSchema>;

export default function AmoCRMModal() {
  const { isModalOpen, closeModal, submitLead } = useAmoCRM();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const YM_ID = Number(process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID) || 103567092;
  const dialogRef = useRef<HTMLDivElement>(null);

  // Wizard state
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [propertyType, setPropertyType] = useState<PropertyType>('apartment');
  const [cleaningType, setCleaningType] = useState<CleaningType>('general');
  const [area, setArea] = useState<number>(50);
  const [windowsCount, setWindowsCount] = useState<number>(0);

  const quote = useMemo(() => calculateQuote({ area, propertyType, cleaningType, windowsCount }), [area, propertyType, cleaningType, windowsCount]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  // Универсальный трекер событий (YM + GA)
  const track = (names: string | string[], params?: Record<string, any>) => {
    try {
      const events = Array.isArray(names) ? names : [names];
      const safeParams = params || {};
      if (typeof window !== 'undefined') {
        const w = window as any;
        events.forEach((eventName) => {
          w?.ym?.(YM_ID, 'reachGoal', eventName, safeParams);
          w?.gtag?.('event', eventName, safeParams);
        });
      }
    } catch (error) {
      console.warn('Ошибка отслеживания:', error);
    }
  };

  // Закрытие по ESC и focus-trap
  useEffect(() => {
    if (!isModalOpen) return;
    setStep(1);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (document.activeElement === last && !e.shiftKey) {
          e.preventDefault();
          (first as HTMLElement).focus();
        } else if (document.activeElement === first && e.shiftKey) {
          e.preventDefault();
          (last as HTMLElement).focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    const prev = document.activeElement as HTMLElement | null;
    // начальный фокус
    setTimeout(() => {
      (dialogRef.current?.querySelector('input, button') as HTMLElement | null)?.focus();
    }, 0);
    return () => {
      window.removeEventListener('keydown', onKey);
      prev?.focus();
    };
  }, [isModalOpen, closeModal]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Отслеживание событий одной функцией
      track(['form_submit', 'discount_submit', 'wizard_submit'], {
        source: 'amocrm_modal',
        propertyType,
        cleaningType,
        area,
        windowsCount,
        total: quote.totalPrice,
      });

      await submitLead({
        name: 'Заявка с мастера бронирования (скидка -10%)',
        phone: data.phone,
        service: `${cleaningType} • ${propertyType}`,
        message: `Площадь: ${area} м²; Окон: ${windowsCount}; Предварительная цена: ${quote.totalPrice.toLocaleString()} ₽ (мин. заказ ${MIN_ORDER.toLocaleString()} ₽)`
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

  const handleExternal = (channel: 'whatsapp' | 'telegram') => {
    const message = encodeURIComponent('Здравствуйте! Хочу получить консультацию по услугам клининга.');
    const url = channel === 'whatsapp'
      ? `https://wa.me/79255551833?text=${message}`
      : `https://t.me/k_liningru?text=${message}`;
    try {
      import('@/utils').then(m => m.createLeadBeforeRedirect({ message: `Переход в ${channel === 'whatsapp' ? 'WhatsApp' : 'Telegram'} (модалка)` }));
    } catch {}
    track('contact_click', { channel, source: 'amocrm_modal' });
    window.open(url, '_blank', 'noopener,noreferrer');
    closeModal();
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={closeModal}>
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="amocrm-modal-title"
        tabIndex={-1}
        ref={dialogRef}
        className="bg-white rounded-2xl shadow-xl w-full max-w-xl"
        onClick={(e) => e.stopPropagation()}
        style={{ paddingTop: 'max(env(safe-area-inset-top), 0px)' }}
      >
        {/* Header */}
        <div className="relative p-6 pb-3">
          <button
            onClick={closeModal}
            aria-label="Закрыть"
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white ring-1 ring-gray-200 hover:bg-gray-50 flex items-center justify-center transition-colors shadow-sm z-20"
          >
            <X className="w-4 h-4 text-gray-700" />
          </button>
          
          <div className="text-center">
            <div className="relative mx-auto mb-4">
              {step === 3 ? (
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto z-10 relative">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
              ) : (
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto z-10 relative">
                  <Sparkles className="w-6 h-6 text-blue-600" />
                </div>
              )}
              <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center pointer-events-none z-0">
                <Sparkles className="w-4 h-4 text-amber-500" />
              </div>
            </div>
            <h2 id="amocrm-modal-title" className="text-xl font-bold text-gray-900 mb-1">
              {step === 1 && 'Выберите параметры уборки'}
              {step === 2 && 'Уточните параметры объекта'}
              {step === 3 && 'Оставьте контакт для подтверждения'}
            </h2>
            <p className="text-sm text-gray-600">
              {step === 1 && 'Тип объекта и вид уборки'}
              {step === 2 && 'Площадь и окна — чтобы рассчитать цену'}
              {step === 3 && 'Перезвоним в течение 5 минут'}
            </p>
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full text-white text-sm font-semibold bg-gradient-to-r from-pink-500 to-amber-500 shadow">
              <Percent className="w-4 h-4" />
              <span>Скидка −10% на первый заказ</span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 pb-6">
          {/* Steps indicator */}
          <div className="mb-4 flex items-center justify-center gap-2 text-xs">
            {[1,2,3].map((s) => (
              <div key={s} className={`h-1.5 w-16 rounded-full ${s <= step ? 'bg-blue-600' : 'bg-gray-200'}`} />
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-5">
              <div>
                <div className="text-sm font-medium text-gray-900 mb-2">Тип объекта</div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {[
                    { id: 'apartment' as PropertyType, name: 'Квартира', Icon: Home },
                    { id: 'house' as PropertyType, name: 'Дом', Icon: Building2 },
                    { id: 'office' as PropertyType, name: 'Офис', Icon: Factory },
                    { id: 'commercial' as PropertyType, name: 'Коммерция', Icon: Store },
                  ].map(({ id, name, Icon }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setPropertyType(id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${propertyType===id?'border-blue-600 bg-blue-50':'border-gray-300 hover:border-gray-400'}`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm">{name}</span>
                      {propertyType === id && <Check className="w-4 h-4 text-blue-600 ml-auto" />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-gray-900 mb-2">Вид уборки</div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {[
                    { id: 'general' as CleaningType, label: 'Генеральная' },
                    { id: 'postRenovation' as CleaningType, label: 'После ремонта' },
                    { id: 'maintenance' as CleaningType, label: 'Поддерживающая' },
                    { id: 'eco' as CleaningType, label: 'Эко' },
                    { id: 'vip' as CleaningType, label: 'VIP' },
                  ].map(({ id, label }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setCleaningType(id)}
                      className={`px-3 py-2 rounded-lg border text-sm ${cleaningType===id?'border-blue-600 bg-blue-50':'border-gray-300 hover:border-gray-400'}`}
                    >
                      {label} {cleaningType===id && <Check className="inline w-4 h-4 text-blue-600 ml-1" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button type="button" className="inline-flex items-center gap-2 text-gray-600 px-3 py-2" onClick={closeModal}>
                  Отмена
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  onClick={() => { setStep(2); track('wizard_next', { step: 1, propertyType, cleaningType }); }}
                  data-cta="wizard_next_1"
                >
                  Далее <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Площадь, м²</label>
                  <input
                    type="number"
                    min={15}
                    max={1000}
                    value={area}
                    onChange={(e) => setArea(Math.max(15, Math.min(1000, parseInt(e.target.value) || 15)))}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {(cleaningType === 'general' || cleaningType === 'postRenovation') && (
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Окон, створок</label>
                    <input
                      type="number"
                      min={0}
                      max={200}
                      value={windowsCount}
                      onChange={(e) => setWindowsCount(Math.max(0, Math.min(200, parseInt(e.target.value) || 0)))}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}
                <div className="text-right">
                  <div className="text-xs text-gray-500">Итого</div>
                  <div className="text-2xl font-bold">{quote.totalPrice.toLocaleString()} ₽</div>
                  <div className="text-[11px] text-gray-500">мин. заказ {MIN_ORDER.toLocaleString()} ₽</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button type="button" className="inline-flex items-center gap-2 text-gray-600 px-3 py-2" onClick={() => setStep(1)}>
                  <ArrowLeft className="w-4 h-4" /> Назад
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  onClick={() => { setStep(3); track('wizard_next', { step: 2, area, windowsCount, total: quote.totalPrice }); }}
                  data-cta="wizard_next_2"
                >
                  Далее <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              {/* Summary */}
              <div className="mb-4 rounded-lg bg-gray-50 border p-3 text-sm text-gray-800">
                <div className="flex flex-wrap gap-2 mb-1">
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white border text-gray-700"><Home className="w-4 h-4" /> {propertyType}</span>
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white border text-gray-700">{cleaningType}</span>
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white border text-gray-700">{area} м²</span>
                  {(cleaningType === 'general' || cleaningType === 'postRenovation') && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white border text-gray-700">окна: {windowsCount}</span>
                  )}
                </div>
                <div className="font-semibold">Предварительно: {quote.totalPrice.toLocaleString()} ₽</div>
                <div className="text-xs text-gray-500">Цена зависит от сложности и состояния. Точное предложение подтвердим по звонку.</div>
              </div>

              {/* Contact form */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4">
                  <div>
                    <input
                      {...register('phone')}
                      type="tel"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="+7 (999) 123-45-67"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <button type="button" className="inline-flex items-center gap-2 text-gray-600 px-3 py-2" onClick={() => setStep(2)}>
                      <ArrowLeft className="w-4 h-4" /> Назад
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      data-cta="wizard_submit"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Отправляем...</span>
                        </>
                      ) : (
                        <>
                          <Phone className="w-4 h-4" />
                          <span>Заказать звонок</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>

              {/* Alternative contact methods */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-center text-xs text-gray-500 mb-3">Или свяжитесь с нами напрямую:</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleExternal('whatsapp')}
                    className="flex items-center justify-center space-x-2 bg-green-500 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
                    data-cta="wizard_whatsapp"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    <span>WhatsApp</span>
                  </button>
                  
                  <button
                    onClick={() => handleExternal('telegram')}
                    className="flex items-center justify-center space-x-2 bg-blue-500 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                    data-cta="wizard_telegram"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.27-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                    <span>Telegram</span>
                  </button>
                </div>
              </div>

              {/* Trust indicators */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-center space-x-3 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Без предоплаты</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Ответ за 5 минут</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 