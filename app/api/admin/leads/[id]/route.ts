import { NextRequest, NextResponse } from 'next/server';
import { leads } from '../data';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { status } = body;

    const leadIndex = leads.findIndex(lead => lead.id === params.id);
    
    if (leadIndex === -1) {
      return NextResponse.json(
        { error: 'Заявка не найдена' },
        { status: 404 }
      );
    }

    // Обновляем статус
    leads[leadIndex].status = status;
    
    // Если статус "contacted", добавляем время контакта
    if (status === 'contacted' && !leads[leadIndex].contactedAt) {
      leads[leadIndex].contactedAt = new Date().toISOString();
    }

    return NextResponse.json({ 
      success: true, 
      lead: leads[leadIndex] 
    });

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
    const leadIndex = leads.findIndex(lead => lead.id === params.id);
    
    if (leadIndex === -1) {
      return NextResponse.json(
        { error: 'Заявка не найдена' },
        { status: 404 }
      );
    }

    // Удаляем заявку
    const deletedLead = leads.splice(leadIndex, 1)[0];

    return NextResponse.json({ 
      success: true, 
      message: 'Заявка удалена',
      lead: deletedLead 
    });

  } catch (error) {
    console.error('Error deleting lead:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
} 