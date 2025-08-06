'use client';

import React, { useState } from 'react';

export default function TestSimplePage() {
  const [imageStatus, setImageStatus] = useState({
    jpg: 'loading',
    webp: 'loading',
    webpNew: 'loading'
  });

  const handleImageLoad = (type: string) => {
    setImageStatus(prev => ({ ...prev, [type]: 'loaded' }));
  };

  const handleImageError = (type: string) => {
    setImageStatus(prev => ({ ...prev, [type]: 'error' }));
  };

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
        </div>
      </div>
    </div>
  );
} 