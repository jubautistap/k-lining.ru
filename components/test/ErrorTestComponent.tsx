'use client';

import React, { useState } from 'react';
import CalculatorErrorBoundary from '@/components/CalculatorErrorBoundary';
import FormErrorBoundary from '@/components/FormErrorBoundary';
import ErrorBoundary from '@/components/ErrorBoundary';
import { logError } from '@/lib/errorLogger';

// Component that throws an error on command
const BuggyComponent = ({ shouldError }: { shouldError: boolean }) => {
  if (shouldError) {
    throw new Error('Test error from BuggyComponent');
  }
  return <div className="p-4 bg-green-100 rounded">Component working normally</div>;
};

// Component with async error
const AsyncErrorComponent = ({ shouldError }: { shouldError: boolean }) => {
  React.useEffect(() => {
    if (shouldError) {
      setTimeout(() => {
        // This will be caught by global error handlers
        throw new Error('Async error from setTimeout');
      }, 100);
    }
  }, [shouldError]);
  
  return <div className="p-4 bg-blue-100 rounded">Async component (check console for errors)</div>;
};

// Component with promise rejection
const PromiseErrorComponent = ({ shouldError }: { shouldError: boolean }) => {
  React.useEffect(() => {
    if (shouldError) {
      Promise.reject(new Error('Promise rejection test'));
    }
  }, [shouldError]);
  
  return <div className="p-4 bg-yellow-100 rounded">Promise component (check console for rejections)</div>;
};

export default function ErrorTestComponent() {
  const [calculatorError, setCalculatorError] = useState(false);
  const [formError, setFormError] = useState(false);
  const [componentError, setComponentError] = useState(false);
  const [asyncError, setAsyncError] = useState(false);
  const [promiseError, setPromiseError] = useState(false);

  const handleManualError = async () => {
    try {
      await logError(new Error('Manual error test'), {
        source: 'manual_test',
        timestamp: Date.now(),
        userAction: 'clicked_test_button'
      });
      alert('Manual error logged successfully! Check console.');
    } catch (error) {
      console.error('Failed to log manual error:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Error Boundary Test Page</h1>
        <p className="text-gray-600">Use the buttons below to test different error scenarios</p>
      </div>

      {/* Manual Error Logging Test */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Manual Error Logging</h2>
        <button
          onClick={handleManualError}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Log Manual Error
        </button>
      </div>

      {/* Calculator Error Boundary Test */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Calculator Error Boundary Test</h2>
        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => setCalculatorError(!calculatorError)}
            className={`px-4 py-2 rounded ${calculatorError ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}`}
          >
            {calculatorError ? 'Fix Calculator' : 'Break Calculator'}
          </button>
        </div>
        
        <CalculatorErrorBoundary calculatorType="admin">
          <BuggyComponent shouldError={calculatorError} />
        </CalculatorErrorBoundary>
      </div>

      {/* Form Error Boundary Test */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Form Error Boundary Test</h2>
        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => setFormError(!formError)}
            className={`px-4 py-2 rounded ${formError ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}`}
          >
            {formError ? 'Fix Form' : 'Break Form'}
          </button>
        </div>
        
        <FormErrorBoundary formType="contact">
          <BuggyComponent shouldError={formError} />
        </FormErrorBoundary>
      </div>

      {/* Generic Error Boundary Test */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Generic Error Boundary Test</h2>
        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => setComponentError(!componentError)}
            className={`px-4 py-2 rounded ${componentError ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}`}
          >
            {componentError ? 'Fix Component' : 'Break Component'}
          </button>
        </div>
        
        <ErrorBoundary name="Test Component" level="component">
          <BuggyComponent shouldError={componentError} />
        </ErrorBoundary>
      </div>

      {/* Async Error Test */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Async Error Test (Global Handlers)</h2>
        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => setAsyncError(!asyncError)}
            className={`px-4 py-2 rounded ${asyncError ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'}`}
          >
            {asyncError ? 'Stop Async Error' : 'Trigger Async Error'}
          </button>
        </div>
        
        <AsyncErrorComponent shouldError={asyncError} />
      </div>

      {/* Promise Rejection Test */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Promise Rejection Test (Global Handlers)</h2>
        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => setPromiseError(!promiseError)}
            className={`px-4 py-2 rounded ${promiseError ? 'bg-red-600 text-white' : 'bg-yellow-600 text-white'}`}
          >
            {promiseError ? 'Stop Promise Error' : 'Trigger Promise Rejection'}
          </button>
        </div>
        
        <PromiseErrorComponent shouldError={promiseError} />
      </div>

      {/* Test Instructions */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Test Instructions</h2>
        <div className="space-y-2 text-sm text-gray-700">
          <p><strong>Calculator/Form/Component Tests:</strong> Click buttons to toggle errors. Error boundaries should catch and display fallback UI.</p>
          <p><strong>Async Error Test:</strong> Triggers setTimeout error that should be caught by global error handlers.</p>
          <p><strong>Promise Rejection Test:</strong> Triggers unhandled promise rejection that should be caught by global handlers.</p>
          <p><strong>Manual Error:</strong> Directly calls the error logging service.</p>
          <p><strong>Check Console:</strong> All errors should be logged to console in development mode.</p>
        </div>
      </div>
    </div>
  );
}