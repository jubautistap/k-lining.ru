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
    const body = await request.json();
    const { status } = body;
    const dbStatus = uiToDbStatus[status] ?? String(status).toUpperCase();

    const updated = await prisma.lead.update({
      where: { id: params.id },
      data: { status: dbStatus as any },
    });

    return NextResponse.json({ success: true, lead: updated });

  } catch (error) {
    console.error('Error updating lead:', error);
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
    console.error('Error deleting lead:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
} 