import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireManager } from '@/lib/auth/middleware';
import { prisma } from '@/lib/prisma';

const createOrderSchema = z.object({
  leadId: z.string().min(1),
  service_type: z.string().min(1),
  area: z.number().optional(),
  price: z.number().min(0),
  notes: z.string().optional(),
  scheduled_at: z.string().datetime().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const auth = await requireManager(request);
    if (auth) return auth;

    const body = await request.json();
    const { leadId, service_type, area, price, notes, scheduled_at } = createOrderSchema.parse(body);

    const created = await prisma.order.create({
      data: {
        lead: { connect: { id: leadId } },
        service_type,
        area: area ?? undefined,
        price,
        notes: notes ?? undefined,
        scheduled_at: scheduled_at ? new Date(scheduled_at) : undefined,
        status: 'CONFIRMED',
      },
    });

    // Если указан leadId — обновляем лид
    if (leadId) {
      await prisma.lead.update({
        where: { id: leadId },
        data: { status: 'WON', price },
      });
    }

    return NextResponse.json({ success: true, order: created });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Create order error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


