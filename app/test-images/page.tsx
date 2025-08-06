import React from 'react';
import Image from 'next/image';

export default function TestImagesPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Тест изображений</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* JPG изображение */}
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">JPG изображение:</h2>
          <Image 
            src="/og-image.jpg" 
            alt="Test JPG Image"
            width={400}
            height={300}
            className="w-full h-64 object-cover rounded"
          />
          <p className="text-sm text-gray-600 mt-2">Файл: /og-image.jpg (485KB)</p>
        </div>

        {/* WebP изображение */}
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">WebP изображение:</h2>
          <Image 
            src="/og-image.webp" 
            alt="Test WebP Image"
            width={400}
            height={300}
            className="w-full h-64 object-cover rounded"
          />
          <p className="text-sm text-gray-600 mt-2">Файл: /og-image.webp (22KB)</p>
        </div>

        {/* Новый WebP */}
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Новый WebP:</h2>
          <Image 
            src="/og-image-new.webp" 
            alt="Test New WebP Image"
            width={400}
            height={300}
            className="w-full h-64 object-cover rounded"
          />
          <p className="text-sm text-gray-600 mt-2">Файл: /og-image-new.webp (27KB)</p>
        </div>

        {/* Base64 изображение */}
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Base64 изображение (тест):</h2>
          <div className="w-full h-64 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center">
            <span className="text-white text-lg font-semibold">Base64 SVG - Статус:loaded</span>
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Информация:</h3>
        <ul className="space-y-2 text-sm">
          <li>• JPG файл: 485KB</li>
          <li>• WebP файл: 22KB</li>
          <li>• Новый WebP: 27KB</li>
          <li>• Все файлы доступны на сервере</li>
          <li>• Проверь консоль браузера на ошибки</li>
        </ul>
      </div>

      <div className="mt-4 p-4 bg-blue-100 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Сетевая информация:</h3>
        <p className="text-sm">WebP поддержка: Да</p>
      </div>
    </div>
  );
} 