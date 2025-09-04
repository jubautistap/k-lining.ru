import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrentPage?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  showHome?: boolean;
  className?: string;
}

export default function Breadcrumbs({ 
  items, 
  showHome = true, 
  className = "" 
}: BreadcrumbsProps) {
  // Добавляем главную страницу если нужно
  const breadcrumbItems: BreadcrumbItem[] = showHome 
    ? [{ label: 'Главная', href: '/' }, ...items]
    : items;

  // Schema.org разметка для хлебных крошек
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      ...(item.href && { "item": `https://k-lining.ru${item.href}` })
    }))
  };

  return (
    <>
      {/* Schema.org JSON-LD для хлебных крошек */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Визуальные хлебные крошки */}
      <nav 
        className={`flex items-center space-x-2 text-sm ${className}`}
        aria-label="Breadcrumb"
      >
        <ol className="flex items-center space-x-2">
          {breadcrumbItems.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
              )}
              
              {item.isCurrentPage ? (
                <span 
                  className="text-gray-500 font-medium"
                  aria-current="page"
                >
                  {/* Иконка дома для главной страницы */}
                  {item.href === '/' && showHome ? (
                    <span className="flex items-center">
                      <Home className="w-4 h-4 mr-1" />
                      {item.label}
                    </span>
                  ) : (
                    item.label
                  )}
                </span>
              ) : item.href ? (
                <Link
                  href={item.href}
                  className="text-primary-600 hover:text-primary-700 transition-colors"
                >
                  {/* Иконка дома для главной страницы */}
                  {item.href === '/' && showHome ? (
                    <span className="flex items-center">
                      <Home className="w-4 h-4 mr-1" />
                      {item.label}
                    </span>
                  ) : (
                    item.label
                  )}
                </Link>
              ) : (
                <span className="text-gray-500">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

// Предустановленные breadcrumbs для разных разделов сайта
export const BREADCRUMB_TEMPLATES = {
  services: (serviceName: string, href?: string) => ([
    { label: 'Услуги', href: '/services' },
    { label: serviceName, href, isCurrentPage: !href }
  ]),

  blog: (articleTitle?: string, articleHref?: string) => ([
    { label: 'Блог', href: '/blog' },
    ...(articleTitle ? [{ label: articleTitle, href: articleHref, isCurrentPage: !articleHref }] : [])
  ]),

  districts: (districtName?: string, districtHref?: string) => ([
    { label: 'Районы Москвы', href: '/districts' },
    ...(districtName ? [{ label: districtName, href: districtHref, isCurrentPage: !districtHref }] : [])
  ]),

  about: (pageName?: string, pageHref?: string) => ([
    { label: 'О компании', href: '/about' },
    ...(pageName ? [{ label: pageName, href: pageHref, isCurrentPage: !pageHref }] : [])
  ]),

  admin: (sectionName?: string, sectionHref?: string) => ([
    { label: 'Админ панель', href: '/admin' },
    ...(sectionName ? [{ label: sectionName, href: sectionHref, isCurrentPage: !sectionHref }] : [])
  ])
};

// Функция для генерации breadcrumbs по URL
export function generateBreadcrumbsFromPath(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [];

  let currentPath = '';
  
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === segments.length - 1;
    
    // Преобразуем сегменты URL в человекочитаемые названия
    let label = segment.replace(/-/g, ' ');
    
    // Специальные случаи для известных путей
    switch (segment) {
      case 'services':
        label = 'Услуги';
        break;
      case 'apartment-cleaning':
        label = 'Уборка квартир';
        break;
      case 'office-cleaning':
        label = 'Уборка офисов';
        break;
      case 'window-cleaning':
        label = 'Мытье окон';
        break;
      case 'furniture-dry-cleaning':
        label = 'Химчистка мебели';
        break;
      case 'post-renovation-cleaning':
        label = 'Уборка после ремонта';
        break;
      case 'house-cleaning':
        label = 'Уборка домов';
        break;
      case 'blog':
        label = 'Блог';
        break;
      case 'districts':
        label = 'Районы Москвы';
        break;
      case 'about':
        label = 'О компании';
        break;
      case 'contacts':
        label = 'Контакты';
        break;
      case 'prices':
        label = 'Цены';
        break;
      case 'calculator':
        label = 'Калькулятор';
        break;
      case 'faq':
        label = 'Вопросы и ответы';
        break;
      case 'admin':
        label = 'Админ панель';
        break;
      default:
        // Капитализируем первую букву
        label = label.charAt(0).toUpperCase() + label.slice(1);
    }

    breadcrumbs.push({
      label,
      href: isLast ? undefined : currentPath,
      isCurrentPage: isLast
    });
  });

  return breadcrumbs;
}

// Компонент с автоматической генерацией breadcrumbs
export function AutoBreadcrumbs({ 
  pathname, 
  customItems,
  className 
}: { 
  pathname: string;
  customItems?: BreadcrumbItem[];
  className?: string;
}) {
  const items = customItems || generateBreadcrumbsFromPath(pathname);
  
  return (
    <Breadcrumbs 
      items={items} 
      className={className}
    />
  );
}