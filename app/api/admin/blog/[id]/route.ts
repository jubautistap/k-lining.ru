import { NextRequest, NextResponse } from 'next/server';
import { requireEditor } from '@/lib/auth/middleware';
import blogIndex from '@/data/blog-index';

// Единый in-memory стор: slug -> пост (из индекса)
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const auth = await requireEditor(request);
    if (auth) return auth;
    const { id } = params;
    const exists = memoryPosts.has(id);
    if (!exists) {
      return NextResponse.json(
        { error: 'Статья не найдена' },
        { status: 404 }
      );
    }

    const deletedPost = memoryPosts.get(id);
    memoryPosts.delete(id);

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