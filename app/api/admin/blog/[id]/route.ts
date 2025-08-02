import { NextRequest, NextResponse } from 'next/server';

// Временное хранилище статей (в реальном проекте - база данных)
const blogPosts = [
  {
    id: '1',
    title: 'Лучшие средства для уборки квартиры',
    excerpt: 'Обзор профессиональных средств для эффективной уборки',
    content: 'Полный текст статьи о лучших средствах для уборки...',
    category: 'Советы',
    tags: ['уборка', 'средства', 'советы'],
    date: '2025-01-15T10:00:00Z',
    readTime: '5 мин',
    image: '/blog/cleaning-products.jpg',
    isPublished: true,
    slug: 'best-cleaning-products'
  },
  {
    id: '2',
    title: 'Как убраться после ремонта',
    excerpt: 'Пошаговое руководство по уборке после ремонта',
    content: 'Подробная инструкция по уборке после ремонта...',
    category: 'Руководства',
    tags: ['ремонт', 'уборка', 'инструкция'],
    date: '2025-01-10T14:30:00Z',
    readTime: '8 мин',
    image: '/blog/after-renovation.jpg',
    isPublished: true,
    slug: 'how-to-clean-after-renovation'
  }
];

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const postIndex = blogPosts.findIndex(p => p.id === id);
    if (postIndex === -1) {
      return NextResponse.json(
        { error: 'Статья не найдена' },
        { status: 404 }
      );
    }

    const deletedPost = blogPosts[postIndex];
    blogPosts.splice(postIndex, 1);

    return NextResponse.json({ 
      success: true, 
      message: 'Статья удалена',
      post: deletedPost
    });

  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
} 