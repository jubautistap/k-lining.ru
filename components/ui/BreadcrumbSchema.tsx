'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

/**
 * 🍞 Компонент хлебных крошек с Schema.org разметкой
 * Оптимизирован для быстрых ссылок Яндекса
 */

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export default function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  // Формируем JSON-LD схему для хлебных крошек
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.href || `https://k-lining.ru${item.href}`
    }))
  };

  return (
    <>
      {/* Хлебные крошки */}
      <nav className="bg-gray-50 border-b border-gray-200 py-4">
        <div className="container-custom">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link 
                href="/" 
                className="flex items-center text-gray-500 hover:text-blue-600 transition-colors"
              >
                <Home className="w-4 h-4 mr-1" />
                Главная
              </Link>
            </li>
            
            {items.map((item, index) => (
              <li key={index} className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
                {item.href ? (
                  <Link 
                    href={item.href}
                    className="text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <span className="text-gray-900 font-medium">
                    {item.name}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />
    </>
  );
}