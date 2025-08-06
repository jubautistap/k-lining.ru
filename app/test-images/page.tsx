import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Тест изображений - K-lining',
  description: 'Тестовая страница для проверки отображения изображений',
};

export default function TestImagesPage() {
  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl font-bold mb-8">Тест изображений</h1>
      
      <div className="space-y-8">
        {/* Логотип */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Логотип</h2>
          <div className="flex items-center space-x-4">
            <Image
              src="/logo.png"
              alt="Логотип K-lining"
              width={200}
              height={200}
              className="border rounded-lg"
            />
            <div>
              <p className="text-sm text-gray-600">Файл: /logo.png</p>
              <p className="text-sm text-gray-600">Размер: 200x200</p>
            </div>
          </div>
        </section>

        {/* Hero изображение */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Hero изображение</h2>
          <div className="max-w-2xl">
            <Image
              src="/og-image.jpg"
              alt="Hero изображение"
              width={800}
              height={533}
              className="border rounded-lg"
            />
            <p className="text-sm text-gray-600 mt-2">Файл: /og-image.jpg</p>
          </div>
        </section>

        {/* OG изображение */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">OG изображение</h2>
          <div className="max-w-2xl">
            <Image
              src="/og-image.jpg"
              alt="OG изображение для соцсетей"
              width={1200}
              height={630}
              className="border rounded-lg"
            />
            <p className="text-sm text-gray-600 mt-2">Файл: /og-image.jpg</p>
          </div>
        </section>

        {/* Иконки */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Иконки</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <Image
                src="/favicon.ico"
                alt="Favicon"
                width={32}
                height={32}
                className="border rounded mx-auto"
              />
              <p className="text-sm text-gray-600 mt-2">Favicon</p>
            </div>
            
            <div className="text-center">
              <Image
                src="/apple-touch-icon.png"
                alt="Apple Touch Icon"
                width={180}
                height={180}
                className="border rounded mx-auto"
              />
              <p className="text-sm text-gray-600 mt-2">Apple Touch Icon</p>
            </div>
            
            <div className="text-center">
              <Image
                src="/icon-192.png"
                alt="Icon 192"
                width={192}
                height={192}
                className="border rounded mx-auto"
              />
              <p className="text-sm text-gray-600 mt-2">Icon 192</p>
            </div>
            
            <div className="text-center">
              <Image
                src="/icon-512.png"
                alt="Icon 512"
                width={512}
                height={512}
                className="border rounded mx-auto"
              />
              <p className="text-sm text-gray-600 mt-2">Icon 512</p>
            </div>
          </div>
        </section>

        {/* Логотип оригинальный */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Логотип оригинальный</h2>
          <div className="max-w-md">
            <Image
              src="/logo-original.png"
              alt="Логотип оригинальный"
              width={400}
              height={400}
              className="border rounded-lg"
            />
            <p className="text-sm text-gray-600 mt-2">Файл: /logo-original.png</p>
          </div>
        </section>

        {/* Статус файлов */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Статус файлов</h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Проверьте наличие файлов:</h3>
            <ul className="space-y-1 text-sm">
              <li>✅ /logo.png - Логотип</li>
              <li>✅ /og-image.jpg - Hero изображение</li>
              <li>✅ /og-image.jpg - OG изображение</li>
              <li>✅ /favicon.ico - Favicon</li>
              <li>✅ /apple-touch-icon.png - Apple Touch Icon</li>
              <li>✅ /icon-192.png - PWA Icon 192</li>
              <li>✅ /icon-512.png - PWA Icon 512</li>
              <li>✅ /logo-original.png - Оригинальный логотип</li>
              <li>✅ /manifest.json - PWA Manifest</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
} 