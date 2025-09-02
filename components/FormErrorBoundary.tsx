'use client';

import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import { FileText, AlertTriangle, RefreshCw, Phone } from 'lucide-react';
import { errorLogger } from '@/lib/errorLogger';

interface FormErrorBoundaryProps {
  children: React.ReactNode;
  formType?: 'contact' | 'order' | 'auth' | 'admin';
  onError?: () => void;
}

export default function FormErrorBoundary({ children, formType = 'contact', onError }: FormErrorBoundaryProps) {
  const getFormName = () => {
    switch (formType) {
      case 'contact': return 'Форма обратной связи';
      case 'order': return 'Форма заказа';
      case 'auth': return 'Форма авторизации';
      case 'admin': return 'Админ-форма';
      default: return 'Форма';
    }
  };

  const getAlternativeActions = () => {
    switch (formType) {
      case 'contact':
      case 'order':
        return (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-3">Другие способы связи:</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-blue-600" />
                <span>Телефон: </span>
                <a href="tel:+79255551833" className="text-blue-600 font-medium hover:underline">
                  +7 (925) 555-18-33
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.687"/>
                </svg>
                <span>WhatsApp: </span>
                <a href="https://wa.me/79255551833" className="text-green-600 font-medium hover:underline">
                  Написать в WhatsApp
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Email: </span>
                <a href="mailto:info@k-lining.ru" className="text-gray-600 font-medium hover:underline">
                  info@k-lining.ru
                </a>
              </div>
            </div>
          </div>
        );
        
      case 'auth':
        return (
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-medium text-yellow-900 mb-2">Проблемы с входом?</h4>
            <p className="text-sm text-yellow-800">
              Обратитесь к администратору для восстановления доступа
            </p>
          </div>
        );
        
      default:
        return null;
    }
  };

  const formFallback = (
    <div className="bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-300 p-6">
      <div className="text-center">
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-6 h-6 text-red-600" />
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {getFormName()} недоступна
        </h3>
        
        <p className="text-gray-600 mb-4">
          Произошла ошибка при загрузке формы. Попробуйте обновить страницу.
        </p>

        <button
          onClick={() => {
            onError?.();
            window.location.reload();
          }}
          className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors mx-auto"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Обновить</span>
        </button>

        {getAlternativeActions()}
      </div>
    </div>
  );

  return (
    <ErrorBoundary
      name={getFormName()}
      level="component"
      fallback={formFallback}
      onError={(error, errorInfo) => {
        // Special logging for form errors using error logger
        errorLogger.logError(error, errorInfo, {
          formType,
          errorType: 'form_error',
          userAction: 'submitting_form'
        });

        // Call custom error handler
        onError?.();
      }}
    >
      {children}
    </ErrorBoundary>
  );
}