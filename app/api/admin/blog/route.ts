import { NextRequest, NextResponse } from 'next/server';
import { requireEditor } from '@/lib/auth/middleware';
import { v4 as uuidv4 } from 'uuid';
import blogIndex from '@/data/blog-index';

// In-memory объединённый стор для админки: карта slug -> пост
// Контент для публичных страниц хранится в файловой системе (app/blog/[slug]).
// В админке отображаем индекс из blogIndex, чтобы совпадало с сайтом.
const memoryPosts = new Map<string, any>();
for (const idx of blogIndex) {
  memoryPosts.set(idx.id, {
    id: idx.id,
    title: idx.title,
    excerpt: idx.excerpt,
    content: '',
    category: idx.category,
    tags: [],
    date: new Date(idx.date).toISOString(),
    readTime: idx.readTime,
    image: idx.image || '',
    isPublished: true,
    slug: idx.id,
  });
}

export async function GET(request: NextRequest) {
  const auth = await requireEditor(request);
  if (auth) return auth;
  return NextResponse.json({ posts: Array.from(memoryPosts.values()) });
}

export async function POST(request: NextRequest) {
  try {
    const auth = await requireEditor(request);
    if (auth) return auth;
    const body = await request.json();
    
    // Валидация
    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: 'Заголовок и содержание обязательны' },
        { status: 400 }
      );
    }

    const slug = (body.slug || body.title || '').toLowerCase()
      .replace(/[^а-яa-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    const newPost = {
      id: slug || uuidv4(),
      title: body.title,
      excerpt: body.excerpt || '',
      content: body.content || '',
      category: body.category || 'Общее',
      tags: body.tags || [],
      date: new Date().toISOString(),
      readTime: body.readTime || '5 мин',
      image: body.image || '',
      isPublished: body.isPublished || false,
      slug: slug || undefined
    } as any;

    memoryPosts.set(newPost.id, newPost);

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
    const auth = await requireEditor(request);
    if (auth) return auth;
    const body = await request.json();
    
    if (!body.id) {
      return NextResponse.json(
        { error: 'ID статьи обязателен' },
        { status: 400 }
      );
    }

    const existing = memoryPosts.get(body.id);
    if (!existing) {
      return NextResponse.json(
        { error: 'Статья не найдена' },
        { status: 404 }
      );
    }

    const updated = {
      ...existing,
      title: body.title ?? existing.title,
      excerpt: body.excerpt ?? existing.excerpt,
      content: body.content ?? existing.content,
      category: body.category ?? existing.category,
      tags: body.tags ?? existing.tags,
      readTime: body.readTime ?? existing.readTime,
      image: body.image ?? existing.image,
      isPublished: typeof body.isPublished === 'boolean' ? body.isPublished : existing.isPublished,
      slug: body.slug ?? existing.slug,
    };
    memoryPosts.set(body.id, updated);

    return NextResponse.json({ 
      success: true, 
      post: updated 
    });

  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
} 