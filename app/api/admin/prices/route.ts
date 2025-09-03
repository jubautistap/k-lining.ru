import { NextRequest, NextResponse } from 'next/server';
import { requireManager } from '@/lib/auth/middleware';
import { v4 as uuidv4 } from 'uuid';
import { PRICING_RATES, RATE_POINT } from '@/data/pricing';

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
    
    // Валидация
    if (!body.service || !body.type || !body.price) {
      return NextResponse.json(
        { error: 'Не все обязательные поля заполнены' },
        { status: 400 }
      );
    }

    const newPrice = {
      id: uuidv4(),
      service: body.service,
      type: body.type,
      price: Number(body.price),
      description: body.description || '',
      isActive: body.isActive !== undefined ? body.isActive : true
    };

    prices.push(newPrice);

    return NextResponse.json({ 
      success: true, 
      price: newPrice 
    });

  } catch (error) {
    
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
    
    if (!body.id) {
      return NextResponse.json(
        { error: 'ID услуги обязателен' },
        { status: 400 }
      );
    }

    const priceIndex = prices.findIndex(p => p.id === body.id);
    if (priceIndex === -1) {
      return NextResponse.json(
        { error: 'Услуга не найдена' },
        { status: 404 }
      );
    }

    // Обновляем цену
    prices[priceIndex] = {
      ...prices[priceIndex],
      service: body.service || prices[priceIndex].service,
      type: body.type || prices[priceIndex].type,
      price: Number(body.price) || prices[priceIndex].price,
      description: body.description || prices[priceIndex].description,
      isActive: body.isActive !== undefined ? body.isActive : prices[priceIndex].isActive
    };

    return NextResponse.json({ 
      success: true, 
      price: prices[priceIndex] 
    });

  } catch (error) {
    
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
} 