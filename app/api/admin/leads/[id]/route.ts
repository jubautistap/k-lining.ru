import { NextRequest, NextResponse } from 'next/server';
import { requireManager } from '@/lib/auth/middleware';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const uiToDbStatus: Record<string, string> = {
  new: 'NEW',
  contacted: 'CONTACTED',
  confirmed: 'QUALIFIED',
  completed: 'WON',
  cancelled: 'LOST',
};

const leadUpdateSchema = z.object({
  status: z.string().optional(),
  price: z.number().optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const auth = await requireManager(request);
    if (auth) return auth;
    const body = await request.json().catch(() => ({}));
    const parsed = leadUpdateSchema.parse(body);
    const { status, price } = parsed;

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
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Ошибка валидации данных', errors: error.errors },
        { status: 400 }
      );
    }
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