import { NextRequest, NextResponse } from 'next/server';
import { requireManager } from '@/lib/auth/middleware';

// Временное хранилище цен (в реальном проекте - база данных)
const prices = [
  {
    id: '1',
    service: 'Уборка квартиры',
    type: 'Генеральная уборка',
    price: 5000,
    description: 'Полная уборка квартиры с мытьем всех поверхностей',
    isActive: true
  },
  {
    id: '2',
    service: 'Уборка квартиры',
    type: 'Поддерживающая уборка',
    price: 3000,
    description: 'Еженедельная уборка для поддержания чистоты',
    isActive: true
  },
  {
    id: '3',
    service: 'Уборка дома',
    type: 'Генеральная уборка',
    price: 8000,
    description: 'Полная уборка частного дома',
    isActive: true
  },
  {
    id: '4',
    service: 'Химчистка',
    type: 'Диван',
    price: 2500,
    description: 'Профессиональная химчистка мягкой мебели',
    isActive: true
  },
  {
    id: '5',
    service: 'Мытье окон',
    type: 'Стандарт',
    price: 1500,
    description: 'Мытье окон и стеклянных поверхностей',
    isActive: true
  }
];

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const auth = await requireManager(request);
    if (auth) return auth;
    const { id } = params;

    const priceIndex = prices.findIndex(p => p.id === id);
    if (priceIndex === -1) {
      return NextResponse.json(
        { error: 'Услуга не найдена' },
        { status: 404 }
      );
    }

    const deletedPrice = prices[priceIndex];
    prices.splice(priceIndex, 1);

    return NextResponse.json({ 
      success: true, 
      message: 'Услуга удалена',
      price: deletedPrice
    });

  } catch (error) {
    
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
} 