import { COMPANY_DATA } from '@/lib/seo/company-data';

interface StructuredDataProps {
  type: 'LocalBusiness' | 'Service' | 'Article' | 'FAQPage' | 'BreadcrumbList' | 'Review';
  data?: any;
  children?: React.ReactNode;
}

// Генератор базовой LocalBusiness схемы 
const generateLocalBusiness = (additionalData?: any) => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${COMPANY_DATA.url}#organization`,
  name: COMPANY_DATA.name,
  legalName: COMPANY_DATA.legalName,
  description: COMPANY_DATA.description,
  url: COMPANY_DATA.url,
  logo: {
    "@type": "ImageObject",
    url: COMPANY_DATA.logo,
    width: 180,
    height: 60
  },
  image: COMPANY_DATA.image,
  telephone: COMPANY_DATA.phone,
  email: COMPANY_DATA.email,
  address: {
    "@type": "PostalAddress",
    ...COMPANY_DATA.address
  },
  geo: {
    "@type": "GeoCoordinates", 
    latitude: COMPANY_DATA.geo.latitude,
    longitude: COMPANY_DATA.geo.longitude
  },
  areaServed: COMPANY_DATA.areaServed,
  openingHoursSpecification: COMPANY_DATA.openingHours,
  sameAs: COMPANY_DATA.sameAs,
  hasOfferCatalog: COMPANY_DATA.hasOfferCatalog,
  priceRange: "₽₽",
  paymentAccepted: "Cash, Credit Card, Bank transfer",
  currenciesAccepted: "RUB",
  ...additionalData
});

// Генератор Service схемы с расширенными данными
const generateService = (serviceData: any) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: serviceData.name,
  description: serviceData.description,
  provider: {
    "@type": "LocalBusiness",
    ...generateLocalBusiness()
  },
  areaServed: COMPANY_DATA.areaServed,
  serviceType: serviceData.serviceType || "Клининговые услуги",
  category: serviceData.category || "Клининговые услуги",
  duration: serviceData.duration || "PT2H", // По умолчанию 2 часа
  availableChannel: {
    "@type": "ServiceChannel",
    serviceUrl: COMPANY_DATA.url,
    servicePhone: COMPANY_DATA.phone,
    availableLanguage: "ru"
  },
  hoursAvailable: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "00:00",
    closes: "23:59"
  },
  offers: serviceData.offers || {
    "@type": "Offer",
    priceCurrency: "RUB", 
    price: serviceData.startingPrice || "6000",
    description: `${serviceData.name} от ${serviceData.startingPrice || 6000}₽`,
    eligibleRegion: {
      "@type": "City",
      name: "Москва",
      containedInPlace: {
        "@type": "Country",
        name: "Россия"
      }
    }
  },
  ...serviceData
});

// Генератор Article схемы для лендингов
const generateArticle = (articleData: any) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: articleData.title,
  description: articleData.description,
  author: {
    "@type": "Organization",
    name: COMPANY_DATA.name,
    url: COMPANY_DATA.url
  },
  publisher: {
    "@type": "Organization", 
    name: COMPANY_DATA.name,
    logo: {
      "@type": "ImageObject",
      url: COMPANY_DATA.logo
    }
  },
  datePublished: articleData.datePublished || new Date().toISOString().split('T')[0],
  dateModified: articleData.dateModified || new Date().toISOString().split('T')[0],
  image: articleData.image || COMPANY_DATA.image,
  url: articleData.url,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": articleData.url
  },
  about: {
    "@type": "Thing",
    name: articleData.about || "Клининговые услуги в Москве"
  },
  ...articleData
});

// Генератор FAQPage схемы 
const generateFAQPage = (faqData: Array<{question: string, answer: string}>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqData.map((faq, index) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer
    }
  }))
});

// Генератор BreadcrumbList схемы
const generateBreadcrumbs = (breadcrumbs: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: breadcrumbs.map((crumb, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: crumb.name,
    item: crumb.url
  }))
});

export default function StructuredData({ type, data, children }: StructuredDataProps) {
  let schemaData;
  
  switch (type) {
    case 'LocalBusiness':
      schemaData = generateLocalBusiness(data);
      break;
    case 'Service':
      schemaData = generateService(data);
      break;  
    case 'Article':
      schemaData = generateArticle(data);
      break;
    case 'FAQPage':
      schemaData = generateFAQPage(data);
      break;
    case 'BreadcrumbList':
      schemaData = generateBreadcrumbs(data);
      break;
    default:
      schemaData = data;
  }
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData, null, 0)
        }}
      />
      {children}
    </>
  );
}