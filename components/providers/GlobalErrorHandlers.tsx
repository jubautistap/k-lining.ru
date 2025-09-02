'use client';

import { useEffect } from 'react';
import { setupGlobalErrorHandlers } from '@/lib/errorLogger';

export default function GlobalErrorHandlers() {
  useEffect(() => {
    // Set up global error handlers for unhandled errors and promise rejections
    setupGlobalErrorHandlers();
  }, []);

  return null; // This component doesn't render anything
}