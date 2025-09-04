// Конфигурация служб с расширенными SEO данными
export interface ServiceConfig {
  name: string;
  description: string;
  category: string;
  serviceType: string;
  duration: string; // ISO 8601 format
  startingPrice: string;
  offers: {
    '@type': 'Offer';
    name: string;
    description: string;
    price: string;
    priceCurrency: 'RUB';
    eligibleDuration?: {
      '@type': 'QuantitativeValue';
      value: number;
      unitCode: 'HUR';
    };
  };
  additionalProperty?: Array<{
    '@type': 'PropertyValue';
    name: string;
    value: string;
  }>;
}

// Конфигурации для каждой услуги
export const SERVICE_CONFIGS: Record<string, ServiceConfig> = {
  'apartment-cleaning': {
    name: 'Уборка квартир в Москве',
    description: 'Профессиональная уборка квартир: генеральная, поддерживающая, после ремонта. Выезд 24/7, эко-средства, гарантия качества.',
    category: 'Бытовые услуги',
    serviceType: 'Уборка жилых помещений',
    duration: 'PT3H', // 3 часа
    startingPrice: '3500',
    offers: {
      '@type': 'Offer',
      name: 'Уборка квартиры',
      description: 'Комплексная уборка квартиры с использованием профессиональных средств',
      price: '3500',
      priceCurrency: 'RUB',
      eligibleDuration: {
        '@type': 'QuantitativeValue',
        value: 3,
        unitCode: 'HUR'
      }
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Выезд',
        value: '24/7'
      },
      {
        '@type': 'PropertyValue',
        name: 'Минимальный заказ',
        value: '6000 ₽'
      }
    ]
  },
  
  'office-cleaning': {
    name: 'Уборка офисов в Москве',
    description: 'Клининг офисов, бизнес-центров, коммерческих помещений. Ежедневная, генеральная уборка, дезинфекция. Работаем по договору.',
    category: 'Коммерческие услуги',
    serviceType: 'Уборка коммерческих помещений',
    duration: 'PT4H', // 4 часа
    startingPrice: '5000',
    offers: {
      '@type': 'Offer',
      name: 'Уборка офиса',
      description: 'Профессиональная уборка офисных помещений с документооборотом',
      price: '5000',
      priceCurrency: 'RUB',
      eligibleDuration: {
        '@type': 'QuantitativeValue',
        value: 4,
        unitCode: 'HUR'
      }
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'График работы',
        value: 'Гибкий'
      },
      {
        '@type': 'PropertyValue',
        name: 'Документооборот',
        value: 'Полный пакет документов'
      }
    ]
  },

  'window-cleaning': {
    name: 'Мытьё окон в Москве',
    description: 'Профессиональное мытьё окон в квартирах, офисах, коттеджах. Внутри и снаружи, любая высота. Без разводов, быстро, безопасно.',
    category: 'Специализированные услуги',
    serviceType: 'Мытьё окон',
    duration: 'PT1H', // 1 час
    startingPrice: '600',
    offers: {
      '@type': 'Offer',
      name: 'Мытьё окон',
      description: 'Мытьё окон снаружи и внутри профессиональными средствами',
      price: '600',
      priceCurrency: 'RUB',
      eligibleDuration: {
        '@type': 'QuantitativeValue',
        value: 1,
        unitCode: 'HUR'
      }
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Цена за створку',
        value: '600 ₽'
      },
      {
        '@type': 'PropertyValue',
        name: 'Высотные работы',
        value: 'Любая сложность'
      }
    ]
  },

  'furniture-dry-cleaning': {
    name: 'Химчистка мебели в Москве',
    description: 'Химчистка мягкой мебели на дому: диваны, кресла, матрасы, стулья. Удаление пятен, запахов, дезинфекция. Быстрая сушка 2-4 часа.',
    category: 'Специализированные услуги',
    serviceType: 'Химчистка мебели',
    duration: 'PT2H', // 2 часа
    startingPrice: '1000',
    offers: {
      '@type': 'Offer',
      name: 'Химчистка мебели',
      description: 'Глубокая очистка мягкой мебели с выездом на дом',
      price: '1000',
      priceCurrency: 'RUB',
      eligibleDuration: {
        '@type': 'QuantitativeValue',
        value: 2,
        unitCode: 'HUR'
      }
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Время сушки',
        value: '2-4 часа'
      },
      {
        '@type': 'PropertyValue',
        name: 'Безопасная химия',
        value: 'Эко-средства'
      }
    ]
  },

  'post-renovation-cleaning': {
    name: 'Уборка после ремонта в Москве',
    description: 'Послестроительная уборка квартир, домов, офисов. Удаление строительной пыли, мытьё окон, финишная очистка. Быстро и качественно.',
    category: 'Специализированные услуги',
    serviceType: 'Послестроительная уборка',
    duration: 'PT6H', // 6 часов
    startingPrice: '8000',
    offers: {
      '@type': 'Offer',
      name: 'Уборка после ремонта',
      description: 'Полная очистка помещения от строительной пыли и мусора',
      price: '8000',
      priceCurrency: 'RUB',
      eligibleDuration: {
        '@type': 'QuantitativeValue',
        value: 6,
        unitCode: 'HUR'
      }
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Сложность',
        value: 'Любая'
      },
      {
        '@type': 'PropertyValue',
        name: 'Профессиональное оборудование',
        value: 'Промышленные пылесосы'
      }
    ]
  },

  'house-cleaning': {
    name: 'Уборка домов в Москве и МО',
    description: 'Уборка коттеджей, загородных домов, таунхаусов. Генеральная и поддерживающая уборка больших площадей. Выезд в Подмосковье.',
    category: 'Бытовые услуги',
    serviceType: 'Уборка загородных домов',
    duration: 'PT5H', // 5 часов
    startingPrice: '5000',
    offers: {
      '@type': 'Offer',
      name: 'Уборка дома',
      description: 'Комплексная уборка загородного дома с выездом в МО',
      price: '5000',
      priceCurrency: 'RUB',
      eligibleDuration: {
        '@type': 'QuantitativeValue',
        value: 5,
        unitCode: 'HUR'
      }
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Территория обслуживания',
        value: 'Москва и МО'
      },
      {
        '@type': 'PropertyValue',
        name: 'Большие площади',
        value: 'От 100 м²'
      }
    ]
  }
};

// Функция для получения конфигурации услуги
export function getServiceConfig(serviceId: string): ServiceConfig | null {
  return SERVICE_CONFIGS[serviceId] || null;
}

// Функция для получения всех доступных услуг
export function getAllServiceConfigs(): Record<string, ServiceConfig> {
  return SERVICE_CONFIGS;
}