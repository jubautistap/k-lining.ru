'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface OptimizedLogoProps {
  className?: string;
  alt?: string;
  width?: number;
  height?: number;
}

export default function OptimizedLogo({ 
  className = "w-8 h-8 object-contain", 
  alt = "K-lining логотип клининговой компании",
  width = 32,
  height = 32 
}: OptimizedLogoProps) {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    // Fallback к обычному тексту если изображение не загрузилось
    return (
      <div className={`${className} bg-primary-600 text-white rounded-lg flex items-center justify-center text-xs font-bold`}>
        KP
      </div>
    );
  }

  return (
    <Image
      src="/logo.png"
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={true}
      quality={90}
      onError={() => setImageError(true)}
      sizes="(max-width: 768px) 24px, 32px"
      unoptimized={false}
    />
  );
}