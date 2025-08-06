'use client';

import React, { useState, useEffect } from 'react';

export default function TestSimplePage() {
  const [imageStatus, setImageStatus] = useState({
    jpg: 'loading',
    webp: 'loading',
    webpNew: 'loading',
    base64: 'loading'
  });

  const [networkInfo, setNetworkInfo] = useState('');

  useEffect(() => {
    // Проверяем поддержку WebP
    const checkWebPSupport = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(0, 0, 1, 1);
        const dataURL = canvas.toDataURL('image/webp');
        const supportsWebP = dataURL.indexOf('data:image/webp') === 0;
        setNetworkInfo(prev => prev + `WebP поддержка: ${supportsWebP ? 'Да' : 'Нет'}\n`);
      }
    };

    checkWebPSupport();
  }, []);

  const handleImageLoad = (type: string) => {
    setImageStatus(prev => ({ ...prev, [type]: 'loaded' }));
  };

  const handleImageError = (type: string) => {
    setImageStatus(prev => ({ ...prev, [type]: 'error' }));
    console.error(`Ошибка загрузки ${type}:`, new Error(`Failed to load ${type} image`));
  };

  // Base64 изображение для теста
  const base64Image = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzM5OWZmIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5URVNUIElNQUdFPC90ZXh0Pgo8L3N2Zz4K';

  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl font-bold mb-8">Простой тест изображения</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Тест изображений</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">JPG изображение:</h3>
            <img
              src="/og-image.jpg"
              alt="Test JPG Image"
              className="w-full max-w-md h-auto rounded-lg shadow-lg"
              onLoad={() => handleImageLoad('jpg')}
              onError={() => handleImageError('jpg')}
            />
            <p className="text-sm text-gray-600 mt-2">
              Файл: /og-image.jpg (485KB) - Статус: 
              <span className={`ml-1 font-medium ${
                imageStatus.jpg === 'loaded' ? 'text-green-600' : 
                imageStatus.jpg === 'error' ? 'text-red-600' : 'text-yellow-600'
              }`}>
                {imageStatus.jpg}
              </span>
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">WebP изображение:</h3>
            <img
              src="/og-image.webp"
              alt="Test WebP Image"
              className="w-full max-w-md h-auto rounded-lg shadow-lg"
              onLoad={() => handleImageLoad('webp')}
              onError={() => handleImageError('webp')}
            />
            <p className="text-sm text-gray-600 mt-2">
              Файл: /og-image.webp (22KB) - Статус: 
              <span className={`ml-1 font-medium ${
                imageStatus.webp === 'loaded' ? 'text-green-600' : 
                imageStatus.webp === 'error' ? 'text-red-600' : 'text-yellow-600'
              }`}>
                {imageStatus.webp}
              </span>
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Новый WebP:</h3>
            <img
              src="/og-image-new.webp"
              alt="Test New WebP Image"
              className="w-full max-w-md h-auto rounded-lg shadow-lg"
              onLoad={() => handleImageLoad('webpNew')}
              onError={() => handleImageError('webpNew')}
            />
            <p className="text-sm text-gray-600 mt-2">
              Файл: /og-image-new.webp (27KB) - Статус: 
              <span className={`ml-1 font-medium ${
                imageStatus.webpNew === 'loaded' ? 'text-green-600' : 
                imageStatus.webpNew === 'error' ? 'text-red-600' : 'text-yellow-600'
              }`}>
                {imageStatus.webpNew}
              </span>
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Base64 изображение (тест):</h3>
            <img
              src={base64Image}
              alt="Test Base64 Image"
              className="w-full max-w-md h-auto rounded-lg shadow-lg"
              onLoad={() => handleImageLoad('base64')}
              onError={() => handleImageError('base64')}
            />
            <p className="text-sm text-gray-600 mt-2">
              Base64 SVG - Статус: 
              <span className={`ml-1 font-medium ${
                imageStatus.base64 === 'loaded' ? 'text-green-600' : 
                imageStatus.base64 === 'error' ? 'text-red-600' : 'text-yellow-600'
              }`}>
                {imageStatus.base64}
              </span>
            </p>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-medium mb-2">Информация:</h3>
          <ul className="text-sm space-y-1">
            <li>• JPG файл: 485KB</li>
            <li>• WebP файл: 22KB</li>
            <li>• Новый WebP: 27KB</li>
            <li>• Все файлы доступны на сервере</li>
            <li>• Проверь консоль браузера на ошибки</li>
          </ul>
          
          <div className="mt-4">
            <h4 className="font-medium mb-2">Сетевая информация:</h4>
            <pre className="text-xs bg-white p-2 rounded border overflow-auto">
              {networkInfo}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
} 