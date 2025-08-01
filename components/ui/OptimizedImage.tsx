'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
  quality?: number;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  placeholder = 'empty',
  blurDataURL,
  sizes = '100vw',
  quality = 75,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  if (!isInView) {
    return (
      <div
        ref={imageRef}
        className={`bg-gray-200 animate-pulse ${className || ''}`}
        style={{
          width: width ? `${width}px` : '100%',
          height: height ? `${height}px` : '200px',
        }}
      />
    );
  }

  return (
    <div className={className}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        priority={priority}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        onLoad={() => setIsLoaded(true)}
        loading={priority ? 'eager' : 'lazy'}
        sizes={sizes}
        quality={quality}
      />
    </div>
  );
} 