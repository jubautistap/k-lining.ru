import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// Временное хранилище цен (в реальном проекте - база данных)
let prices = [
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

export async function GET() {
  return NextResponse.json({ prices });
}

export async function POST(request: NextRequest) {
  try {
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
    console.error('Error creating price:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
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
    console.error('Error updating price:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
} 