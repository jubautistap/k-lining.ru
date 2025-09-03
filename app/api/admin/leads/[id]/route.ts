import { NextRequest, NextResponse } from 'next/server';
import { requireManager } from '@/lib/auth/middleware';
import { prisma } from '@/lib/prisma';

const uiToDbStatus: Record<string, string> = {
  new: 'NEW',
  contacted: 'CONTACTED',
  confirmed: 'QUALIFIED',
  completed: 'WON',
  cancelled: 'LOST',
};

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const auth = await requireManager(request);
    if (auth) return auth;
    const body = await request.json().catch(() => ({}));
    const { status, price } = body as { status?: string; price?: number };

    const data: any = {};
    if (status) {
      data.status = (uiToDbStatus[status] ?? String(status).toUpperCase()) as any;
    }
    if (typeof price === 'number') {
      data.price = price;
    }
    if (Object.keys(data).length === 0) {
      return NextResponse.json({ success: true });
    }

    const updated = await prisma.lead.update({
      where: { id: params.id },
      data,
    });

    return NextResponse.json({ success: true, lead: updated });

  } catch (error) {
    // Обрабатываем "record not found" как 404, а не 500
    const anyErr = error as any;
    if (anyErr?.code === 'P2025') {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const auth = await requireManager(request);
    if (auth) return auth;
    const deleted = await prisma.lead.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true, message: 'Заявка удалена', lead: deleted });

  } catch (error) {
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
} 