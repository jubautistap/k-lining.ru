'use client';

/**
 * 🍞 Компонент хлебных крошек с Schema.org разметкой
 * Оптимизирован для быстрых ссылок Яндекса
 */

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export default function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  // Формируем JSON-LD схему
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://k-lining.ru${item.url}`
    }))
  };

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />
      
      {/* Визуальные хлебные крошки */}
      <nav aria-label="Навигация по сайту" className="mb-6">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          <li>
            <a 
              href="/" 
              className="hover:text-primary-600 transition-colors"
            >
              Главная
            </a>
          </li>
          {items.map((item, index) => (
            <li key={index} className="flex items-center space-x-2">
              <span className="text-gray-400">/</span>
              {index === items.length - 1 ? (
                <span className="text-gray-900 font-medium">{item.name}</span>
              ) : (
                <a 
                  href={item.url}
                  className="hover:text-primary-600 transition-colors"
                >
                  {item.name}
                </a>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}