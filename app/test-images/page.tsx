import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Тест изображений - K-lining',
  description: 'Тестирование оптимизации изображений',
};

export default function TestImagesPage() {
  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl font-bold mb-8">Тест изображений</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">OG изображение</h2>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">OG изображение для соцсетей</h3>
            <div className="space-y-4">
              <div className="mb-4">
                <h4 className="font-medium mb-2">WebP версия:</h4>
                <img
                  src="/og-image.webp"
                  alt="OG Image WebP"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                <p className="text-sm text-gray-600 mt-2">Файл: /og-image.webp (22KB)</p>
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium mb-2">WebP версия (новый):</h4>
                <img
                  src="/og-image-new.webp"
                  alt="OG Image WebP New"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                <p className="text-sm text-gray-600 mt-2">Файл: /og-image-new.webp (27KB)</p>
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium mb-2">JPG версия (fallback):</h4>
                <img
                  src="/og-image.jpg"
                  alt="OG Image JPG"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                <p className="text-sm text-gray-600 mt-2">Файл: /og-image.jpg (485KB)</p>
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium mb-2">Next.js Image компонент:</h4>
                <Image
                  src="/og-image.webp"
                  alt="OG Image Next.js"
                  width={800}
                  height={533}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                <p className="text-sm text-gray-600 mt-2">Next.js Image с WebP</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Другие изображения</h2>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Изображение для соцсетей</h3>
            <div className="space-y-4">
              <div className="mb-4">
                <h4 className="font-medium mb-2">WebP версия:</h4>
                <img
                  src="/og-image.webp"
                  alt="Social Media Image WebP"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                <p className="text-sm text-gray-600 mt-2">Файл: /og-image.webp (22KB)</p>
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium mb-2">JPG версия (fallback):</h4>
                <img
                  src="/og-image.jpg"
                  alt="Social Media Image JPG"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                <p className="text-sm text-gray-600 mt-2">Файл: /og-image.jpg (485KB)</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Информация о файлах</h2>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <ul className="space-y-2 text-sm">
            <li>✅ /logo.png - Логотип</li>
            <li>✅ /og-image.jpg - Hero изображение</li>
            <li>✅ /og-image.webp - OG изображение</li>
            <li>✅ /og-image-new.webp - Новое OG изображение</li>
            <li>✅ /favicon.ico - Favicon</li>
            <li>✅ /apple-touch-icon.png - Apple Touch Icon</li>
          </ul>
        </div>
      </section>
    </div>
  );
} 