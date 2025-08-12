import { NextRequest, NextResponse } from 'next/server';
import { requireManager } from '@/lib/auth/middleware';

// Генерация тестовых данных для аналитики
function generateAnalyticsData(range: number) {
  const today = new Date();
  const daysAgo = new Date(today.getTime() - range * 24 * 60 * 60 * 1000);
  
  // Генерация данных по дням
  const leadsByDay = [];
  for (let i = 0; i < range; i++) {
    const date = new Date(daysAgo.getTime() + i * 24 * 60 * 60 * 1000);
    leadsByDay.push({
      date: date.toISOString().split('T')[0],
      count: Math.floor(Math.random() * 10) + 1
    });
  }

  // Генерация данных по месяцам
  const leadsByMonth = [];
  for (let i = 0; i < Math.ceil(range / 30); i++) {
    const month = new Date(today.getFullYear(), today.getMonth() - i, 1);
    leadsByMonth.push({
      month: month.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' }),
      count: Math.floor(Math.random() * 100) + 20,
      revenue: Math.floor(Math.random() * 500000) + 100000
    });
  }

  // Популярные услуги
  const topServices = [
    { name: 'Уборка квартиры', count: 45, revenue: 225000 },
    { name: 'Химчистка', count: 32, revenue: 80000 },
    { name: 'Мытье окон', count: 28, revenue: 42000 },
    { name: 'Уборка дома', count: 15, revenue: 120000 },
    { name: 'Уборка офиса', count: 12, revenue: 96000 }
  ];

  // Заявки по статусам
  const leadsByStatus = [
    { status: 'new', count: 25, percentage: 20 },
    { status: 'contacted', count: 35, percentage: 28 },
    { status: 'confirmed', count: 30, percentage: 24 },
    { status: 'completed', count: 25, percentage: 20 },
    { status: 'cancelled', count: 10, percentage: 8 }
  ];

  const totalLeads = leadsByDay.reduce((sum, day) => sum + day.count, 0);
  const todayLeads = leadsByDay[leadsByDay.length - 1]?.count || 0;
  const weekLeads = leadsByDay.slice(-7).reduce((sum, day) => sum + day.count, 0);
  const monthLeads = leadsByDay.slice(-30).reduce((sum, day) => sum + day.count, 0);
  const totalRevenue = topServices.reduce((sum, service) => sum + service.revenue, 0);
  const averageOrderValue = totalRevenue / totalLeads || 0;
  const conversionRate = Math.round((leadsByStatus.find(s => s.status === 'completed')?.count || 0) / totalLeads * 100);

  return {
    totalLeads,
    todayLeads,
    weekLeads,
    monthLeads,
    conversionRate,
    totalRevenue,
    averageOrderValue,
    topServices,
    leadsByStatus,
    leadsByDay,
    leadsByMonth
  };
}

export async function GET(request: NextRequest) {
  try {
    const auth = await requireManager(request);
    if (auth) return auth;
    const { searchParams } = new URL(request.url);
    const range = parseInt(searchParams.get('range') || '30');
    
    const analyticsData = generateAnalyticsData(range);
    
    return NextResponse.json(analyticsData);
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
} 