// Утилиты для проекта KliningPro

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Объединяет классы CSS с помощью clsx и tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Форматирует номер телефона в читаемый вид
 */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/);
  if (match) {
    return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`;
  }
  return phone;
}

/**
 * Форматирует цену в рублях
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
  }).format(price);
}

/**
 * Форматирует дату в читаемый вид
 */
export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

/**
 * Форматирует время в читаемый вид
 */
export function formatTime(date: string | Date): string {
  return new Intl.DateTimeFormat('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}

/**
 * Генерирует случайный ID
 */
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

/**
 * Проверяет, является ли строка валидным email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Проверяет, является ли строка валидным номером телефона
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Обрезает текст до указанной длины
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * Дебаунс функция
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Троттлинг функция
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Копирует текст в буфер обмена
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
}

/**
 * Получает размер экрана
 */
export function getScreenSize(): 'sm' | 'md' | 'lg' | 'xl' | '2xl' {
  if (typeof window === 'undefined') return 'lg';
  
  const width = window.innerWidth;
  if (width < 640) return 'sm';
  if (width < 768) return 'md';
  if (width < 1024) return 'lg';
  if (width < 1280) return 'xl';
  return '2xl';
}

/**
 * Проверяет, поддерживается ли Intersection Observer
 */
export function supportsIntersectionObserver(): boolean {
  return typeof window !== 'undefined' && 'IntersectionObserver' in window;
}

/**
 * Проверяет, поддерживается ли WebP
 */
export async function supportsWebP(): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  
  const webP = new Image();
  return new Promise((resolve) => {
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
}

/**
 * Получает параметры из URL
 */
export function getUrlParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  
  const params = new URLSearchParams(window.location.search);
  const result: Record<string, string> = {};
  
  params.forEach((value, key) => {
    result[key] = value;
  });
  
  return result;
}

/**
 * Устанавливает параметры в URL
 */
export function setUrlParams(params: Record<string, string>): void {
  if (typeof window === 'undefined') return;
  
  const url = new URL(window.location.href);
  
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      url.searchParams.set(key, value);
    } else {
      url.searchParams.delete(key);
    }
  });
  
  window.history.replaceState({}, '', url.toString());
}

/**
 * Генерирует мета-теги для SEO
 */
export function generateMetaTags(config: {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}) {
  const {
    title,
    description,
    keywords,
    image = '/og-image.jpg',
            url = 'https://k-lining.ru',
    type = 'website'
  } = config;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url,
      siteName: 'KliningPro',
      images: [{ url: image, width: 1200, height: 630 }],
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

/**
 * Валидирует форму
 */
export function validateForm(data: Record<string, any>, rules: Record<string, any>): Record<string, string> {
  const errors: Record<string, string> = {};

  Object.entries(rules).forEach(([field, rule]) => {
    const value = data[field];
    
    if (rule.required && !value) {
      errors[field] = rule.required;
    } else if (value) {
      if (rule.minLength && value.length < rule.minLength) {
        errors[field] = rule.minLength;
      }
      if (rule.maxLength && value.length > rule.maxLength) {
        errors[field] = rule.maxLength;
      }
      if (rule.pattern && !rule.pattern.test(value)) {
        errors[field] = rule.pattern;
      }
      if (rule.email && !isValidEmail(value)) {
        errors[field] = 'Введите корректный email';
      }
      if (rule.phone && !isValidPhone(value)) {
        errors[field] = 'Введите корректный номер телефона';
      }
    }
  });

  return errors;
}

/**
 * Анимация счетчика
 */
export function animateCounter(
  element: HTMLElement,
  start: number,
  end: number,
  duration: number = 2000
): void {
  const startTime = performance.now();
  
  function updateCounter(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    const current = Math.floor(start + (end - start) * progress);
    element.textContent = current.toString();
    
    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    }
  }
  
  requestAnimationFrame(updateCounter);
}

/**
 * Ленивая загрузка изображений
 */
export function lazyLoadImage(img: HTMLImageElement): void {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src || '';
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });
    
    observer.observe(img);
  } else {
    // Fallback для старых браузеров
    img.src = img.dataset.src || '';
  }
} 