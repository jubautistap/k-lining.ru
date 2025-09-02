'use client';

import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import { Calculator, AlertTriangle, RefreshCw } from 'lucide-react';
import { errorLogger } from '@/lib/errorLogger';

interface CalculatorErrorBoundaryProps {
  children: React.ReactNode;
  calculatorType?: 'mini' | 'admin' | 'main';
}

export default function CalculatorErrorBoundary({ children, calculatorType = 'main' }: CalculatorErrorBoundaryProps) {
  const getCalculatorName = () => {
    switch (calculatorType) {
      case 'mini': return 'Мини-калькулятор';
      case 'admin': return 'Админ-калькулятор';
      case 'main': return 'Калькулятор стоимости';
      default: return 'Калькулятор';
    }
  };

  const calculatorFallback = (
    <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-dashed border-gray-300">
      <div className="text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8 text-red-600" />
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {getCalculatorName()} временно недоступен
        </h3>
        
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Произошла ошибка при загрузке калькулятора. Мы работаем над исправлением проблемы.
        </p>

        <div className="space-y-3">
          <button
            onClick={() => window.location.reload()}
            className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors mx-auto"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Обновить страницу</span>
          </button>
          
          <div className="text-sm text-gray-500">
            <p>Если проблема не исчезает, обратитесь в поддержку:</p>
            <a href="tel:+79255551833" className="text-primary-600 hover:underline">
              +7 (925) 555-18-33
            </a>
          </div>
        </div>

        {/* Alternative calculation methods */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Альтернативные способы расчета:</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p>📞 Звонок менеджеру: <a href="tel:+79255551833" className="text-primary-600">+7 (925) 555-18-33</a></p>
            <p>💬 WhatsApp: <a href="https://wa.me/79255551833" className="text-primary-600">Написать в WhatsApp</a></p>
            <p>✉️ Email: <a href="mailto:info@k-lining.ru" className="text-primary-600">info@k-lining.ru</a></p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <ErrorBoundary
      name={getCalculatorName()}
      level="section"
      fallback={calculatorFallback}
      onError={(error, errorInfo) => {
        // Special logging for calculator errors using error logger
        errorLogger.logError(error, errorInfo, {
          calculatorType,
          errorType: 'calculator_error',
          userAction: 'using_calculator'
        });
      }}
    >
      {children}
    </ErrorBoundary>
  );
}