import { useCallback, useRef } from 'react';

export function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<NodeJS.Timeout>();

  return useCallback(
    ((...args: any[]) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => callback(...args), delay);
    }) as T,
    [callback, delay]
  );
}

export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const lastCall = useRef(0);
  const lastCallTimer = useRef<NodeJS.Timeout>();

  return useCallback(
    ((...args: any[]) => {
      const now = Date.now();
      if (now - lastCall.current >= delay) {
        callback(...args);
        lastCall.current = now;
      } else {
        if (lastCallTimer.current) {
          clearTimeout(lastCallTimer.current);
        }
        lastCallTimer.current = setTimeout(() => {
          callback(...args);
          lastCall.current = Date.now();
        }, delay - (now - lastCall.current));
      }
    }) as T,
    [callback, delay]
  );
}

export function useIntersectionObserver(
  callback: (entry: IntersectionObserverEntry) => void,
  options: IntersectionObserverInit = {}
) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const observe = useCallback(
    (element: Element) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new IntersectionObserver((entries) => {
        entries.forEach(callback);
      }, options);

      observerRef.current.observe(element);
    },
    [callback, options]
  );

  const unobserve = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
  }, []);

  return { observe, unobserve };
}

export function useIdleCallback(
  callback: () => void,
  timeout: number = 1000
) {
  const timeoutRef = useRef<NodeJS.Timeout>();

  const scheduleIdleCallback = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(callback, { timeout });
    } else {
      timeoutRef.current = setTimeout(callback, timeout);
    }
  }, [callback, timeout]);

  return scheduleIdleCallback;
} 