'use client';

import React, { useState } from 'react';
import { Bug, Trash2, AlertCircle } from 'lucide-react';

// Component that can throw errors for testing
function ErrorTrigger({ errorType }: { errorType: string }) {
  const [shouldError, setShouldError] = useState(false);

  React.useEffect(() => {
    if (shouldError) {
      switch (errorType) {
        case 'render':
          throw new Error(`Test render error from ${errorType} component`);
        case 'async':
          setTimeout(() => {
            throw new Error(`Test async error from ${errorType} component`);
          }, 100);
          break;
        case 'state':
          throw new Error(`Test state error from ${errorType} component`);
        default:
          throw new Error(`Test generic error from ${errorType} component`);
      }
    }
  }, [shouldError, errorType]);

  if (shouldError && errorType === 'render') {
    throw new Error(`Test render error from ${errorType} component`);
  }

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="font-semibold mb-2 flex items-center">
        <Bug className="w-4 h-4 mr-2" />
        {errorType} Error Test
      </h3>
      <p className="text-sm text-gray-600 mb-3">
        Click to trigger a {errorType} error for testing Error Boundary
      </p>
      <button
        onClick={() => setShouldError(true)}
        className="flex items-center space-x-2 bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
      >
        <AlertCircle className="w-4 h-4" />
        <span>Trigger {errorType} Error</span>
      </button>
    </div>
  );
}

// Test component for Error Boundaries
export default function TestErrorBoundary() {
  const [showTests, setShowTests] = useState(false);

  if (process.env.NODE_ENV === 'production') {
    return null; // Don't show in production
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white rounded-lg shadow-lg border p-4 max-w-sm">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-semibold text-sm">Error Boundary Tests</h2>
          <button
            onClick={() => setShowTests(!showTests)}
            className="text-gray-500 hover:text-gray-700"
          >
            {showTests ? <Trash2 className="w-4 h-4" /> : <Bug className="w-4 h-4" />}
          </button>
        </div>
        
        {showTests && (
          <div className="space-y-3">
            <div className="text-xs text-gray-500 mb-3">
              Development mode only - Test Error Boundaries
            </div>
            
            <ErrorTrigger errorType="render" />
            <ErrorTrigger errorType="async" />
            <ErrorTrigger errorType="state" />
            
            <div className="pt-2 border-t">
              <p className="text-xs text-gray-500">
                These components are wrapped in Error Boundaries. 
                Triggering errors should show fallback UI instead of crashing the app.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}