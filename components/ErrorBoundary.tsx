'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, Bug, Copy } from 'lucide-react';
import { errorLogger } from '@/lib/errorLogger';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  eventId: string | null;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  level?: 'page' | 'section' | 'component';
  name?: string;
  showDetails?: boolean;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      eventId: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
      eventId: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      errorInfo
    });

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);

    // Log error using our error logging service
    errorLogger.logError(error, errorInfo, {
      level: this.props.level || 'component',
      component: this.props.name || 'Unknown',
      eventId: this.state.eventId
    });
  }


  private handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      eventId: null
    });
  };

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  private copyErrorDetails = () => {
    const { error, errorInfo, eventId } = this.state;
    const errorDetails = {
      eventId,
      message: error?.message,
      stack: error?.stack,
      componentStack: errorInfo?.componentStack,
      timestamp: new Date().toISOString(),
      url: window.location.href
    };

    navigator.clipboard.writeText(JSON.stringify(errorDetails, null, 2))
      .then(() => alert('Детали ошибки скопированы в буфер обмена'))
      .catch(() => console.error('Failed to copy error details'));
  };

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const { level = 'component', name, showDetails = process.env.NODE_ENV === 'development' } = this.props;
      const { error, errorInfo, eventId } = this.state;

      // Different UI based on error level
      if (level === 'page') {
        return (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              
              <h1 className="text-xl font-semibold text-gray-900 mb-2">
                Что-то пошло не так
              </h1>
              
              <p className="text-gray-600 mb-6">
                Произошла неожиданная ошибка. Мы уже получили уведомление и работаем над исправлением.
              </p>

              <div className="space-y-3">
                <button
                  onClick={this.handleRetry}
                  className="w-full flex items-center justify-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Попробовать снова</span>
                </button>
                
                <button
                  onClick={this.handleGoHome}
                  className="w-full flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Home className="w-4 h-4" />
                  <span>На главную</span>
                </button>
              </div>

              {showDetails && (
                <details className="mt-6 text-left">
                  <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                    Техническая информация
                  </summary>
                  <div className="mt-2 p-3 bg-gray-50 rounded text-xs">
                    <p className="mb-2"><strong>ID события:</strong> {eventId}</p>
                    <p className="mb-2"><strong>Ошибка:</strong> {error?.message}</p>
                    {error?.stack && (
                      <pre className="text-xs overflow-auto max-h-32 bg-white p-2 rounded">
                        {error.stack}
                      </pre>
                    )}
                  </div>
                </details>
              )}
            </div>
          </div>
        );
      }

      if (level === 'section') {
        return (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 my-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-red-800 mb-2">
                  Ошибка в разделе {name ? `"${name}"` : ''}
                </h3>
                <p className="text-red-700 mb-4">
                  Не удалось загрузить этот раздел. Попробуйте обновить страницу или обратитесь в поддержку.
                </p>
                
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={this.handleRetry}
                    className="flex items-center space-x-2 bg-red-600 text-white px-3 py-2 rounded text-sm hover:bg-red-700 transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Повторить</span>
                  </button>
                  
                  {showDetails && (
                    <button
                      onClick={this.copyErrorDetails}
                      className="flex items-center space-x-2 bg-gray-600 text-white px-3 py-2 rounded text-sm hover:bg-gray-700 transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                      <span>Копировать детали</span>
                    </button>
                  )}
                </div>

                {showDetails && errorInfo && (
                  <details className="mt-4">
                    <summary className="cursor-pointer text-sm text-red-600 hover:text-red-700">
                      Показать детали
                    </summary>
                    <div className="mt-2 p-3 bg-white border border-red-200 rounded text-xs">
                      <pre className="overflow-auto max-h-32">
                        {error?.stack || error?.message}
                      </pre>
                    </div>
                  </details>
                )}
              </div>
            </div>
          </div>
        );
      }

      // Component level (default)
      return (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 my-2">
          <div className="flex items-center space-x-2">
            <Bug className="w-5 h-5 text-yellow-600" />
            <h4 className="font-medium text-yellow-800">
              Компонент {name ? `"${name}"` : ''} недоступен
            </h4>
          </div>
          
          <p className="text-yellow-700 text-sm mt-1 mb-3">
            Произошла ошибка при отображении этого компонента.
          </p>
          
          <button
            onClick={this.handleRetry}
            className="flex items-center space-x-1 bg-yellow-600 text-white px-2 py-1 rounded text-sm hover:bg-yellow-700 transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Повторить</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}