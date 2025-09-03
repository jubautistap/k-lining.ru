import { NextRequest, NextResponse } from 'next/server';
import { requireEditor } from '@/lib/auth/middleware';
import path from 'path';
import fs from 'fs/promises';

export const runtime = 'nodejs';

function sanitizeFilename(name: string) {
  const base = name.toLowerCase().replace(/[^a-zа-я0-9._-]+/gi, '-');
  return base.replace(/-+/g, '-').replace(/^-|-$/g, '');
}

export async function POST(request: NextRequest) {
  const auth = await requireEditor(request);
  if (auth) return auth;

  try {
    const form = await request.formData();
    const file = form.get('file') as File | null;
    if (!file) {
      return NextResponse.json({ error: 'file is required' }, { status: 400 });
    }

    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowed.includes(file.type)) {
      return NextResponse.json({ error: 'unsupported file type' }, { status: 415 });
    }

    const maxSize = 8 * 1024 * 1024; // 8MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'file too large' }, { status: 413 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const original = sanitizeFilename(file.name || 'image');
    const ext = path.extname(original) || (file.type === 'image/webp' ? '.webp' : file.type === 'image/png' ? '.png' : '.jpg');
    const nameOnly = path.basename(original, path.extname(original));
    const filename = `${Date.now()}-${nameOnly}${ext}`;

    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'blog');
    await fs.mkdir(uploadDir, { recursive: true });
    const target = path.join(uploadDir, filename);
    await fs.writeFile(target, buffer);

    const url = `/uploads/blog/${filename}`;
    return NextResponse.json({ success: true, url });
  } catch (e) {
    return NextResponse.json({ error: 'upload failed' }, { status: 500 });
  }
}


