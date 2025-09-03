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
  // unit‑экономика (опционально)
  cost_labor: z.number().optional(),
  cost_materials: z.number().optional(),
  cost_transport: z.number().optional(),
  cost_overhead: z.number().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const auth = await requireManager(request);
    if (auth) return auth;

    const body = await request.json();
    const { leadId, service_type, area, price, notes, scheduled_at, cost_labor, cost_materials, cost_transport, cost_overhead } = createOrderSchema.parse(body);

    const data: any = {
      lead: { connect: { id: leadId } },
      service_type,
      area: area ?? undefined,
      price,
      notes: notes ?? undefined,
      scheduled_at: scheduled_at ? new Date(scheduled_at) : undefined,
      status: 'CONFIRMED',
    };
    if (typeof cost_labor === 'number') data.cost_labor = cost_labor;
    if (typeof cost_materials === 'number') data.cost_materials = cost_materials;
    if (typeof cost_transport === 'number') data.cost_transport = cost_transport;
    if (typeof cost_overhead === 'number') data.cost_overhead = cost_overhead;
    if (typeof price === 'number') {
      const cl = cost_labor || 0; const cm = cost_materials || 0; const ct = cost_transport || 0; const co = cost_overhead || 0;
      data.profit = price - (cl + cm + ct + co);
    }
    let created;
    try {
      created = await prisma.order.create({ data });
    } catch (e) {
      
      const fallback: any = {
        lead: { connect: { id: leadId } },
        service_type,
        area: area ?? undefined,
        price,
        notes: notes ?? undefined,
        scheduled_at: scheduled_at ? new Date(scheduled_at) : undefined,
        status: 'CONFIRMED',
      };
      created = await prisma.order.create({ data: fallback });
    }

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
    
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


