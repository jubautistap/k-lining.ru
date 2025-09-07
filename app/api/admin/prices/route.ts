import { NextRequest, NextResponse } from 'next/server';
import { requireManager } from '@/lib/auth/middleware';
import { v4 as uuidv4 } from 'uuid';
import { PRICING_RATES, RATE_POINT } from '@/data/pricing';
import { z } from 'zod';

// In-memory стор цен (инициализируется из тарифов калькулятора)
const prices: Array<{ id: string; service: string; type: string; price: number; description: string; isActive: boolean; }> = [];
if (prices.length === 0) {
  (Object.keys(PRICING_RATES) as Array<keyof typeof PRICING_RATES>).forEach((prop) => {
    const tiers = PRICING_RATES[prop];
    (Object.keys(tiers) as Array<keyof typeof tiers>).forEach((ct) => {
      const rate = tiers[ct][RATE_POINT];
      prices.push({
        id: `${prop}-${ct}`,
        service: String(prop),
        type: String(ct),
        price: rate,
        description: 'Импорт из калькулятора',
        isActive: true,
      });
    });
  });
}

const priceSchema = z.object({
  service: z.string().min(1, 'Не все обязательные поля заполнены'),
  type: z.string().min(1, 'Не все обязательные поля заполнены'),
  price: z.number().min(0, 'Цена не может быть отрицательной'),
  description: z.string().optional(),
  isActive: z.boolean().optional(),
});

const priceUpdateSchema = z.object({
  id: z.string(),
  service: z.string().min(1, 'Не все обязательные поля заполнены').optional(),
  type: z.string().min(1, 'Не все обязательные поля заполнены').optional(),
  price: z.number().min(0, 'Цена не может быть отрицательной').optional(),
  description: z.string().optional(),
  isActive: z.boolean().optional(),
});

export async function GET(request: NextRequest) {
  const auth = await requireManager(request);
  if (auth) return auth;
  return NextResponse.json({ prices });
}

export async function POST(request: NextRequest) {
  try {
    const auth = await requireManager(request);
    if (auth) return auth;
    const body = await request.json();
    
    const parsed = priceSchema.parse(body);

    const newPrice = {
      id: uuidv4(),
      ...parsed,
      description: parsed.description || '',
      isActive: parsed.isActive !== undefined ? parsed.isActive : true
    };

    prices.push(newPrice);

    return NextResponse.json({ 
      success: true, 
      price: newPrice 
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
    const auth = await requireManager(request);
    if (auth) return auth;
    const body = await request.json();
    
    const parsed = priceUpdateSchema.parse(body);

    const priceIndex = prices.findIndex(p => p.id === parsed.id);
    if (priceIndex === -1) {
      return NextResponse.json(
        { error: 'Услуга не найдена' },
        { status: 404 }
      );
    }

    // Обновляем цену
    prices[priceIndex] = {
      ...prices[priceIndex],
      ...parsed,
    };

    return NextResponse.json({ 
      success: true, 
      price: prices[priceIndex] 
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