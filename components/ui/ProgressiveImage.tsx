'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

interface ProgressiveImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
}

// Создаем миниатюрную версию для начальной загрузки
const createBlurDataURL = (width: number = 10, height: number = 10) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    // Создаем простой градиент как placeholder
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#f3f4f6');
    gradient.addColorStop(1, '#e5e7eb');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }
  
  return canvas.toDataURL('image/jpeg', 0.1);
};

export default function ProgressiveImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className = '',
  priority = false,
  sizes,
  quality = 85,
  placeholder = 'blur',
  blurDataURL,
  onLoad,
  onError,
}: ProgressiveImageProps) {
  const [imageLoadState, setImageLoadState] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [inView, setInView] = useState(priority); // Если priority, то сразу в view
  const imgRef = useRef<HTMLDivElement>(null);

  // Intersection Observer для lazy loading
  useEffect(() => {
    if (priority || inView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px', // Начинаем загрузку за 50px до появления
        threshold: 0.1,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority, inView]);

  const handleImageLoad = useCallback(() => {
    setImageLoadState('loaded');
    onLoad?.();
  }, [onLoad]);

  const handleImageError = useCallback(() => {
    setImageLoadState('error');
    onError?.();
  }, [onError]);

  // Создаем blur data URL если не передан
  const defaultBlurDataURL = blurDataURL || 
    (width && height ? createBlurDataURL(Math.min(width / 10, 20), Math.min(height / 10, 20)) : 
     'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=');

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden ${fill ? 'absolute inset-0' : ''} ${className}`}
      style={!fill ? { width, height } : undefined}
    >
      {/* Progressive Loading States */}
      
      {/* 1. Skeleton placeholder - показываем до загрузки */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse transition-opacity duration-300 ${imageLoadState === 'loaded' ? 'opacity-0' : 'opacity-100'}`}
        style={{
          backgroundImage: `url("${defaultBlurDataURL}")`,
          backgroundSize: 'cover',
          filter: 'blur(10px)',
          transform: 'scale(1.1)', // Убираем edge artifacts от blur
        }}
      />

      {/* 2. Основное изображение */}
      {inView && (
        <Image
          src={src}
          alt={alt}
          width={!fill ? width : undefined}
          height={!fill ? height : undefined}
          fill={fill}
          className={`transition-all duration-700 ease-out ${imageLoadState === 'loaded' ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
          quality={quality}
          priority={priority}
          sizes={sizes || (fill ? '100vw' : undefined)}
          placeholder={placeholder}
          blurDataURL={defaultBlurDataURL}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading={priority ? 'eager' : 'lazy'}
        />
      )}

      {/* 3. Error state */}
      {imageLoadState === 'error' && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
          <div className="text-center">
            <div className="text-2xl mb-2">📷</div>
            <div className="text-sm">Не удалось загрузить изображение</div>
          </div>
        </div>
      )}

      {/* 4. Loading indicator для медленных соединений */}
      {imageLoadState === 'loading' && inView && (
        <div className="absolute top-2 left-2 z-10">
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}