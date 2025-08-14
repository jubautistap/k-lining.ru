export interface BlogIndexItem {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO date
  readTime: string;
  image?: string;
  featured?: boolean;
}

// Единый индекс статей блога, используемый публичной страницей и админ‑панелью
const blogIndex: BlogIndexItem[] = [
  {
    id: 'general-apartment-cleaning-checklist-prices',
    title: 'Генеральная уборка квартиры: чек-лист и цены 2025',
    excerpt: 'Подробный гид по генеральной уборке квартиры. Полный чек-лист, актуальные цены, что входит в услугу от профессионалов K-lining.',
    category: 'Генеральная уборка',
    date: '2025-01-16',
    readTime: '12 мин',
    image: '/blog/general-cleaning-checklist.jpg',
    featured: true
  },
  {
    id: 'how-to-choose-reliable-cleaning-company-moscow',
    title: 'Клининг в Москве: как выбрать надежную компанию',
    excerpt: 'Полное руководство по выбору клининговой компании. Критерии отбора, красные флаги, вопросы для проверки. Советы от профессионалов K-lining.',
    category: 'Советы',
    date: '2025-01-16',
    readTime: '15 мин',
    image: '/blog/choose-cleaning-company.jpg',
    featured: true
  },
  {
    id: 'cleaning-company-moscow',
    title: 'Клининговая компания в Москве: рейтинг лучших, цены 2025',
    excerpt: 'Полный гид по выбору клининговой компании в Москве. Рейтинг лучших, сравнение цен и критерии выбора.',
    category: 'Рейтинг компаний',
    date: '2025-01-16',
    readTime: '10 мин',
    image: '/blog/cleaning-company.jpg',
    featured: false
  },
  {
    id: 'apartment-cleaning-price-moscow',
    title: 'Уборка квартир в Москве недорого - цены 2025',
    excerpt: 'Актуальные цены на уборку квартир в Москве. Способы экономии и сравнение тарифов клининговых компаний.',
    category: 'Цены и тарифы',
    date: '2025-01-16',
    readTime: '11 мин',
    image: '/blog/apartment-cleaning-price.jpg',
    featured: false
  },
  {
    id: 'office-cleaning-moscow-24-7',
    title: 'Уборка офисов в Москве 24/7 - клининг офисных помещений',
    excerpt: 'Профессиональная уборка офисов в Москве круглосуточно. Поддерживающая и генеральная уборка офисных помещений.',
    category: 'Офисная уборка',
    date: '2025-01-16',
    readTime: '9 мин',
    image: '/blog/office-cleaning.jpg',
    featured: false
  },
  {
    id: 'how-to-clean-after-renovation',
    title: 'Как правильно убирать после ремонта',
    excerpt: 'Пошаговое руководство по уборке строительной пыли и мусора. Секреты профессионалов.',
    category: 'Уборка после ремонта',
    date: '2025-01-15',
    readTime: '5 мин',
    image: '/blog/after-renovation.jpg',
    featured: false
  },
  {
    id: 'best-cleaning-products',
    title: 'Топ-10 профессиональных средств для уборки',
    excerpt: 'Обзор лучших чистящих средств от профессионалов. Что действительно работает, а что нет.',
    category: 'Советы',
    date: '2025-01-10',
    readTime: '7 мин',
    image: '/blog/cleaning-products.jpg'
  },
  {
    id: 'dry-cleaning-guide',
    title: 'Химчистка мебели: полное руководство',
    excerpt: 'Все о химчистке диванов, ковров и мебели. Как выбрать правильную услугу.',
    category: 'Химчистка',
    date: '2025-01-05',
    readTime: '6 мин',
    image: '/blog/dry-cleaning.jpg'
  },
  {
    id: 'window-cleaning-tips',
    title: 'Мытье окон: секреты профессионалов',
    excerpt: 'Как правильно мыть окна без разводов. Инструменты и техники от опытных клинеров.',
    category: 'Мытье окон',
    date: '2024-12-28',
    readTime: '4 мин',
    image: '/blog/window-cleaning.jpg'
  },
  {
    id: 'eco-friendly-cleaning',
    title: 'Экологичная уборка: безопасно и эффективно',
    excerpt: 'Как убирать без химии и вреда для здоровья. Натуральные средства для чистоты.',
    category: 'Эко-уборка',
    date: '2024-12-20',
    readTime: '8 мин',
    image: '/blog/eco-cleaning.jpg'
  },
  {
    id: 'office-cleaning-schedule',
    title: 'График уборки офиса: что и когда чистить',
    excerpt: 'Оптимальный план уборки для офисных помещений. Ежедневные и еженедельные задачи.',
    category: 'Офисная уборка',
    date: '2024-12-15',
    readTime: '6 мин',
    image: '/blog/office-cleaning.jpg'
  }
];

export default blogIndex;


