import { NextRequest, NextResponse } from 'next/server';
import { requireEditor } from '@/lib/auth/middleware';
import { v4 as uuidv4 } from 'uuid';
import blogIndex from '@/data/blog-index';
import { z } from 'zod';

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

const blogSchema = z.object({
  title: z.string().min(1, 'Заголовок обязателен'),
  content: z.string().min(1, 'Содержание обязательно'),
  slug: z.string().optional(),
  excerpt: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  readTime: z.string().optional(),
  image: z.string().optional(),
  isPublished: z.boolean().optional(),
});

const blogUpdateSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Заголовок обязателен').optional(),
  content: z.string().min(1, 'Содержание обязательно').optional(),
  slug: z.string().optional(),
  excerpt: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  readTime: z.string().optional(),
  image: z.string().optional(),
  isPublished: z.boolean().optional(),
});

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
    
    const parsed = blogSchema.parse(body);

    const slug = (parsed.slug || parsed.title || '').toLowerCase()
      .replace(/[^а-яa-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    const newPost = {
      id: slug || uuidv4(),
      title: parsed.title,
      excerpt: parsed.excerpt || '',
      content: parsed.content || '',
      category: parsed.category || 'Общее',
      tags: parsed.tags || [],
      date: new Date().toISOString(),
      readTime: parsed.readTime || '5 мин',
      image: parsed.image || '',
      isPublished: parsed.isPublished || false,
      slug: slug || undefined
    } as any;

    memoryPosts.set(newPost.id, newPost);

    return NextResponse.json({ 
      success: true, 
      post: newPost 
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Ошибка валидации данных', errors: error.errors },
        { status: 400 }
      );
    }
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
    
    const parsed = blogUpdateSchema.parse(body);

    const existing = memoryPosts.get(parsed.id);
    if (!existing) {
      return NextResponse.json(
        { error: 'Статья не найдена' },
        { status: 404 }
      );
    }

    const updated = {
      ...existing,
      ...parsed,
    };
    memoryPosts.set(parsed.id, updated);

    return NextResponse.json({ 
      success: true, 
      post: updated 
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Ошибка валидации данных', errors: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
} 