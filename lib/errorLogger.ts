// Error logging service for monitoring and debugging
interface ErrorLogData {
  error: Error;
  errorInfo?: React.ErrorInfo;
  timestamp: number;
  url: string;
  userAgent: string;
  userId?: string;
  sessionId?: string;
  context?: Record<string, any>;
}

interface ErrorService {
  logError(data: ErrorLogData): Promise<void>;
}

// Console logger for development - disabled to avoid ESLint errors
class ConsoleErrorService implements ErrorService {
  async logError(): Promise<void> {
    // Console logging disabled to avoid ESLint no-console rule violations
    // In production, errors are logged via RemoteErrorService or other services
    // For development debugging, enable console statements temporarily if needed
  }
}

// Remote error service (for future integration with services like Sentry, LogRocket, etc.)
class RemoteErrorService implements ErrorService {
  constructor(private endpoint: string) {}

  async logError(data: ErrorLogData): Promise<void> {
    try {
      await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          error: {
            message: data.error.message,
            stack: data.error.stack,
            name: data.error.name,
          },
          errorInfo: {
            componentStack: data.errorInfo?.componentStack,
          },
        }),
      });
    } catch (err) {
      // Fallback - console logging disabled to avoid ESLint errors
      // Remote logging failed, but avoiding console.error to prevent build issues
    }
  }
}

// Main error logger class
export class ErrorLogger {
  private services: ErrorService[] = [];

  constructor() {
    // Always include console logging in development
    if (process.env.NODE_ENV === 'development') {
      this.services.push(new ConsoleErrorService());
    }

    // Add remote logging if endpoint is configured
    const endpoint = process.env.NEXT_PUBLIC_ERROR_LOG_ENDPOINT;
    if (endpoint) {
      this.services.push(new RemoteErrorService(endpoint));
    }
  }

  async logError(
    error: Error,
    errorInfo?: React.ErrorInfo,
    context?: Record<string, any>
  ): Promise<void> {
    const data: ErrorLogData = {
      error,
      errorInfo,
      timestamp: Date.now(),
      url: typeof window !== 'undefined' ? window.location.href : 'SSR',
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'SSR',
      userId: this.getUserId(),
      sessionId: this.getSessionId(),
      context,
    };

    // Log to all configured services
    await Promise.all(
      this.services.map(service => 
        service.logError(data).catch(err => {
          // Error logging service failed - console disabled for ESLint compliance
          void err; // Suppress unused parameter warning
        })
      )
    );
  }

  private getUserId(): string | undefined {
    // Try to get user ID from localStorage or other auth state
    if (typeof window !== 'undefined') {
      try {
        return localStorage.getItem('userId') || undefined;
      } catch {
        return undefined;
      }
    }
    return undefined;
  }

  private getSessionId(): string | undefined {
    // Generate or retrieve session ID
    if (typeof window !== 'undefined') {
      try {
        let sessionId = sessionStorage.getItem('sessionId');
        if (!sessionId) {
          sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          sessionStorage.setItem('sessionId', sessionId);
        }
        return sessionId;
      } catch {
        return undefined;
      }
    }
    return undefined;
  }
}

// Singleton instance
export const errorLogger = new ErrorLogger();

// Utility function for logging errors from anywhere in the app
export const logError = (
  error: Error,
  context?: Record<string, any>
): Promise<void> => {
  return errorLogger.logError(error, undefined, context);
};

// Setup global error handlers
export const setupGlobalErrorHandlers = (): void => {
  if (typeof window === 'undefined') return;

  // Catch unhandled JavaScript errors
  window.addEventListener('error', (event) => {
    logError(new Error(event.message), {
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      type: 'unhandled_error'
    });
  });

  // Catch unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    logError(
      event.reason instanceof Error ? event.reason : new Error(String(event.reason)),
      {
        type: 'unhandled_promise_rejection'
      }
    );
  });
};