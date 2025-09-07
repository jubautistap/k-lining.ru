'use client';

import React, { useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion'; // Временно отключено для тестирования hydration
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastProps extends Toast {
  duration?: number;
  onClose: (id: string) => void;
}

const toastColors = {
  success: 'bg-green-50 border-green-200 text-green-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800'
};

export default function Toast({ id, type, message, duration = 5000, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [id, duration, onClose]);

  const Icon = type === 'success' ? CheckCircle : type === 'error' ? XCircle : AlertCircle;

  return (
    <div 
      className={`fixed top-4 right-4 z-50 max-w-sm w-full ${toastColors[type]} border rounded-lg shadow-lg p-4`}
    >
      <div className="flex items-start space-x-3">
        <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button onClick={() => onClose(id)} className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

interface ToastContainerProps {
  toasts: Toast[];
  removeToast: (id: string) => void;
}

export function ToastContainer({ toasts, removeToast }: ToastContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {/* <AnimatePresence> */}
        {toasts.map((toast) => (
          // <motion.div
          //   key={toast.id}
          //   initial={{ opacity: 0, y: -20, scale: 0.9 }}
          //   animate={{ opacity: 1, y: 0, scale: 1 }}
          //   exit={{ opacity: 0, y: 20, scale: 0.9 }}
          //   transition={{ duration: 0.3 }}
          // >
            <Toast {...toast} onClose={removeToast} />
          // </motion.div>
        ))}
      {/* </AnimatePresence> */}
    </div>
  );
}