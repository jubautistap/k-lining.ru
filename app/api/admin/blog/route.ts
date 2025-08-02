import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

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

export async function GET() {
  return NextResponse.json({ posts: blogPosts });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Валидация
    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: 'Заголовок и содержание обязательны' },
        { status: 400 }
      );
    }

    const newPost = {
      id: uuidv4(),
      title: body.title,
      excerpt: body.excerpt || '',
      content: body.content,
      category: body.category || 'Общее',
      tags: body.tags || [],
      date: new Date().toISOString(),
      readTime: body.readTime || '5 мин',
      image: body.image || '',
      isPublished: body.isPublished || false,
      slug: body.slug || body.title.toLowerCase().replace(/[^а-яa-z0-9\s-]/g, '').replace(/\s+/g, '-')
    };

    blogPosts.unshift(newPost);

    return NextResponse.json({ 
      success: true, 
      post: newPost 
    });

  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!body.id) {
      return NextResponse.json(
        { error: 'ID статьи обязателен' },
        { status: 400 }
      );
    }

    const postIndex = blogPosts.findIndex(p => p.id === body.id);
    if (postIndex === -1) {
      return NextResponse.json(
        { error: 'Статья не найдена' },
        { status: 404 }
      );
    }

    // Обновляем статью
    blogPosts[postIndex] = {
      ...blogPosts[postIndex],
      title: body.title || blogPosts[postIndex].title,
      excerpt: body.excerpt || blogPosts[postIndex].excerpt,
      content: body.content || blogPosts[postIndex].content,
      category: body.category || blogPosts[postIndex].category,
      tags: body.tags || blogPosts[postIndex].tags,
      readTime: body.readTime || blogPosts[postIndex].readTime,
      image: body.image || blogPosts[postIndex].image,
      isPublished: body.isPublished !== undefined ? body.isPublished : blogPosts[postIndex].isPublished,
      slug: body.slug || blogPosts[postIndex].slug
    };

    return NextResponse.json({ 
      success: true, 
      post: blogPosts[postIndex] 
    });

  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
} 