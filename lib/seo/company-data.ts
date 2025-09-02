// Единые данные компании для всех SEO схем и метатегов
// Используется в layout.tsx, structured data, и всех SEO компонентах

export const COMPANY_DATA = {
  name: "K-lining",
  legalName: "K-lining Pro",
  description: "Профессиональная клининговая компания в Москве и МО. Уборка квартир, офисов, химчистка мебели. Работаем 24/7 во всех округах Москвы.",
  
  // Контактная информация
  phone: "+7-925-555-18-33",
  email: "info@k-lining.ru",
  
  // Адрес офиса
  address: {
    streetAddress: "ул. Докукина, 8с2, этаж 6, офис 412",
    addressLocality: "Москва", 
    addressRegion: "Москва",
    postalCode: "127591",
    addressCountry: "RU"
  },
  
  // Координаты для Schema.org
  geo: {
    latitude: 55.7558,
    longitude: 37.6176,
    region: "RU-MOW",
    placename: "Москва"
  },
  
  // Веб-ресурсы
  url: "https://k-lining.ru",
  logo: "https://k-lining.ru/logo.png",
  image: "https://k-lining.ru/og-image.webp",
  
  // Социальные сети
  sameAs: [
    "https://t.me/k_liningru",
    "https://wa.me/79255551833"
  ],
  
  // Часы работы
  openingHours: [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], 
    "opens": "00:00",
    "closes": "23:59"
  }],
  
  // Рейтинг и отзывы (базовые данные)
  rating: {
    ratingValue: 4.8,
    reviewCount: 247,
    bestRating: 5,
    worstRating: 1
  },
  
  // Зона обслуживания
  areaServed: {
    "@type": "City",
    "name": "Москва",
    "sameAs": "https://ru.wikipedia.org/wiki/Москва"
  },
  
  // Основные услуги для Schema
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    "name": "Клининговые услуги",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service", 
          "name": "Уборка квартир",
          "description": "Генеральная и поддерживающая уборка квартир в Москве"
        }
      },
      {
        "@type": "Offer", 
        "itemOffered": {
          "@type": "Service",
          "name": "Уборка офисов", 
          "description": "Клининг офисных помещений и бизнес-центров"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Химчистка мебели",
          "description": "Профессиональная химчистка мягкой мебели и ковров"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service", 
          "name": "Уборка после ремонта",
          "description": "Уборка квартир и офисов после строительных работ"
        }
      }
    ]
  }
} as const;

// Вспомогательные функции для использования в компонентах
export const getFormattedAddress = () => {
  const addr = COMPANY_DATA.address;
  return `${addr.streetAddress}, ${addr.addressLocality}, ${addr.addressCountry}`;
};

export const getContactString = () => {
  return `${COMPANY_DATA.phone} | ${COMPANY_DATA.email}`;
};

export const getGeoString = () => {
  return `${COMPANY_DATA.geo.latitude}, ${COMPANY_DATA.geo.longitude}`;
};