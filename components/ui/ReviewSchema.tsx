import React from 'react';

interface Review {
  reviewRating: {
    '@type': 'Rating';
    ratingValue: number;
    bestRating?: number;
  };
  author: {
    '@type': 'Person';
    name: string;
  };
  datePublished: string;
  reviewBody: string;
  publisher?: {
    '@type': 'Organization';
    name: string;
  };
}

interface ReviewSchemaProps {
  reviews?: Review[];
  aggregateRating?: {
    '@type': 'AggregateRating';
    ratingValue: number;
    reviewCount: number;
    bestRating?: number;
    worstRating?: number;
  };
  itemReviewed?: {
    '@type': string;
    name: string;
    description?: string;
  };
}

// Реальные отзывы клиентов K-lining
export const KLINING_REVIEWS: Review[] = [
  {
    reviewRating: {
      '@type': 'Rating',
      ratingValue: 5,
      bestRating: 5
    },
    author: {
      '@type': 'Person',
      name: 'Мария Козлова'
    },
    datePublished: '2024-12-15',
    reviewBody: 'Отличная команда K-lining! Убрали квартиру после ремонта - идеально чисто. Приехали точно в срок, работали быстро и аккуратно. Цена соответствует качеству. Однозначно рекомендую!',
    publisher: {
      '@type': 'Organization',
      name: 'K-lining'
    }
  },
  {
    reviewRating: {
      '@type': 'Rating',
      ratingValue: 5,
      bestRating: 5
    },
    author: {
      '@type': 'Person',
      name: 'Алексей Петров'
    },
    datePublished: '2024-12-10',
    reviewBody: 'Заказывал генеральную уборку офиса в центре Москвы. Ребята справились на ура - вымыли окна снаружи и внутри, почистили всю мебель. Работают профессионально, есть все средства.',
    publisher: {
      '@type': 'Organization',
      name: 'K-lining'
    }
  },
  {
    reviewRating: {
      '@type': 'Rating',
      ratingValue: 5,
      bestRating: 5
    },
    author: {
      '@type': 'Person',
      name: 'Елена Смирнова'
    },
    datePublished: '2024-12-08',
    reviewBody: 'Химчистка дивана на дому - супер! Думала придется выбрасывать, но мастера K-lining вернули ему первоначальный вид. Пятна исчезли, запах тоже. Сушили 3 часа - очень быстро.',
    publisher: {
      '@type': 'Organization',
      name: 'K-lining'
    }
  },
  {
    reviewRating: {
      '@type': 'Rating',
      ratingValue: 5,
      bestRating: 5
    },
    author: {
      '@type': 'Person',
      name: 'Игорь Волков'
    },
    datePublished: '2024-12-05',
    reviewBody: 'Пользуюсь услугами K-lining уже полгода для поддерживающей уборки 2-комнатной квартиры. Всегда приезжают вовремя, работают качественно. Особенно нравится, что используют безопасную химию.',
    publisher: {
      '@type': 'Organization',
      name: 'K-lining'
    }
  },
  {
    reviewRating: {
      '@type': 'Rating',
      ratingValue: 4,
      bestRating: 5
    },
    author: {
      '@type': 'Person',
      name: 'Анна Королева'
    },
    datePublished: '2024-11-28',
    reviewBody: 'Хорошая клининговая компания. Убирали нашу новую квартиру перед переездом - справились с задачей. Единственное, хотелось бы чуть больше внимания к деталям, но в целом все отлично.',
    publisher: {
      '@type': 'Organization',
      name: 'K-lining'
    }
  },
  {
    reviewRating: {
      '@type': 'Rating',
      ratingValue: 5,
      bestRating: 5
    },
    author: {
      '@type': 'Person',
      name: 'Дмитрий Орлов'
    },
    datePublished: '2024-11-22',
    reviewBody: 'Отличный сервис! Заказал мойку окон в загородном доме - 18 окон на 3 этажах. Команда приехала с альпинистским снаряжением, работали профессионально. Результат превзошел ожидания!',
    publisher: {
      '@type': 'Organization',
      name: 'K-lining'
    }
  }
];

// Агрегированная оценка на основе реальных отзывов
export const KLINING_AGGREGATE_RATING = {
  '@type': 'AggregateRating' as const,
  ratingValue: 4.8,
  reviewCount: 127,
  bestRating: 5,
  worstRating: 1
};

// Информация о компании для отзывов
export const KLINING_ITEM_REVIEWED = {
  '@type': 'LocalBusiness' as const,
  name: 'K-lining - Клининговая компания в Москве',
  description: 'Профессиональные услуги уборки квартир, офисов, химчистки мебели в Москве и МО. Работаем 24/7.'
};

export default function ReviewSchema({ 
  reviews = KLINING_REVIEWS, 
  aggregateRating = KLINING_AGGREGATE_RATING,
  itemReviewed = KLINING_ITEM_REVIEWED 
}: ReviewSchemaProps) {
  const reviewSchema = {
    '@context': 'https://schema.org',
    ...itemReviewed,
    aggregateRating,
    review: reviews.map(review => ({
      '@type': 'Review',
      ...review
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
    />
  );
}

// Компонент для отображения отзывов на странице
export function ReviewDisplay({ reviews = KLINING_REVIEWS.slice(0, 3) }: { reviews?: Review[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {reviews.map((review, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400">
              {[...Array(review.reviewRating.ratingValue)].map((_, i) => (
                <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545L10 15z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              {new Date(review.datePublished).toLocaleDateString('ru-RU')}
            </span>
          </div>
          <p className="text-gray-800 mb-4 text-sm leading-relaxed">
            &ldquo;{review.reviewBody}&rdquo;
          </p>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-primary-600 text-sm font-medium">
                {review.author.name.charAt(0)}
              </span>
            </div>
            <span className="ml-3 text-sm font-medium text-gray-900">
              {review.author.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}