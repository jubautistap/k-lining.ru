import { NextRequest, NextResponse } from 'next/server';
import { requireManager } from '@/lib/auth/middleware';
import { prisma } from '@/lib/prisma';

function formatDate(d: Date): string {
  const y = d.getFullYear();
  const m = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export async function GET(request: NextRequest) {
  try {
    const auth = await requireManager(request);
    if (auth) return auth;

    const { searchParams } = new URL(request.url);
    const rangeDays = Math.max(1, parseInt(searchParams.get('range') || '30'));
    const sourceFilter = (searchParams.get('source') || '').trim();
    const serviceFilter = (searchParams.get('service') || '').trim();
    const to = new Date();
    const from = new Date(to.getTime() - rangeDays * 24 * 60 * 60 * 1000);

    // 1) Данные
    // TODO: Implement caching for analytics data (e.g., using Redis or a similar in-memory store)
    const [leads, orders] = await Promise.all([
      prisma.lead.findMany({
        where: {
          created_at: { gte: from, lte: to },
          ...(sourceFilter
            ? { utm_source: { contains: sourceFilter, mode: 'insensitive' } }
            : {}),
        },
        select: { created_at: true, status: true, utm_source: true },
      }),
      prisma.order.findMany({
        where: {
          created_at: { gte: from, lte: to },
          ...(serviceFilter
            ? { service_type: { contains: serviceFilter, mode: 'insensitive' } }
            : {}),
        },
        select: { created_at: true, status: true, price: true, service_type: true },
      }),
    ]);

    // 2) Метрики
    const totalLeads = leads.length;
    const leadsByStatusMap = new Map<string, number>();
    for (const l of leads) {
      const key = l.status.toLowerCase();
      leadsByStatusMap.set(key, (leadsByStatusMap.get(key) || 0) + 1);
    }
    const leadsByStatus = Array.from(leadsByStatusMap.entries()).map(([status, count]) => ({
      status,
      count,
      percentage: totalLeads ? Math.round((count / totalLeads) * 100) : 0,
    }));

    // Доход: подтвержденные + завершенные как «забронированный доход»
    const bookedOrders = orders.filter(o => ['CONFIRMED', 'COMPLETED'].includes(o.status));
    const completedOrders = orders.filter(o => o.status === 'COMPLETED');

    const totalRevenue = bookedOrders.reduce((s, o) => s + (o.price || 0), 0);
    const realizedRevenue = completedOrders.reduce((s, o) => s + (o.price || 0), 0);
    const averageOrderValue = bookedOrders.length ? totalRevenue / bookedOrders.length : 0;
    const conversionRate = totalLeads ? Math.round((bookedOrders.length / totalLeads) * 100) : 0;

    // 3) Топ услуг
    const serviceMap = new Map<string, { count: number; revenue: number; leads: number; profit: number }>();
    for (const o of bookedOrders as any[]) {
      const key = o.service_type || 'Услуга';
      const prev = serviceMap.get(key) || { count: 0, revenue: 0, leads: 0, profit: 0 };
      // Себестоимость не хранится в текущей выборке — считаем прибыль как 0 для совместимости
      const profit = 0;
      serviceMap.set(key, { 
        count: prev.count + 1, 
        revenue: prev.revenue + (o.price || 0), 
        leads: prev.leads, 
        profit: prev.profit + profit 
      });
    }

    // Нет сервиса на лидах в текущей выборке — пропускаем распределение лидов по услугам

    const topServices = Array.from(serviceMap.entries())
      .map(([name, v]) => ({ 
        name, 
        count: v.count, 
        revenue: v.revenue, 
        profit: v.profit,
        conversion: v.leads > 0 ? Math.round((v.count / v.leads) * 100) : 0 
      }))

    const availableServices = Array.from(new Set(orders.map(o => o.service_type).filter(Boolean))) as string[];

    // 3b) Источники
    const sourceMap = new Map<string, number>();
    for (const l of leads) {
      const key = (l.utm_source || 'direct').toLowerCase();
      sourceMap.set(key, (sourceMap.get(key) || 0) + 1);
    }
    const sources = Array.from(sourceMap.entries())
      .map(([source, count]) => ({ source, count, percentage: totalLeads ? Math.round((count / totalLeads) * 100) : 0 }))
      .sort((a, b) => b.count - a.count);

    // 4) По дням (лиды)
    const dayIndex = new Map<string, number>();
    for (let i = 0; i < rangeDays; i++) {
      const d = new Date(from.getTime() + i * 86400000);
      dayIndex.set(formatDate(d), 0);
    }
    for (const l of leads) {
      const key = formatDate(new Date(l.created_at));
      if (dayIndex.has(key)) dayIndex.set(key, (dayIndex.get(key) || 0) + 1);
    }
    const leadsByDay = Array.from(dayIndex.entries()).map(([date, count]) => ({ date, count }));
    const todayLeads = leadsByDay[leadsByDay.length - 1]?.count || 0;
    const weekLeads = leadsByDay.slice(-7).reduce((s, d) => s + d.count, 0);
    const monthLeads = leadsByDay.slice(-30).reduce((s, d) => s + d.count, 0);

    // 5) По месяцам (агрегации)
    const months: { month: string; count: number; revenue: number }[] = [];
    const monthKey = (d: Date) => `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}`;
    const monthsRange = Math.max(1, Math.ceil(rangeDays / 30));
    const monthMap = new Map<string, { count: number; revenue: number }>();
    for (let i = 0; i < monthsRange; i++) {
      const mDate = new Date(to.getFullYear(), to.getMonth() - i, 1);
      const key = monthKey(mDate);
      monthMap.set(key, { count: 0, revenue: 0 });
    }
    for (const l of leads) {
      const key = monthKey(new Date(l.created_at));
      if (monthMap.has(key)) monthMap.get(key)!.count += 1;
    }
    for (const o of bookedOrders) {
      const key = monthKey(new Date(o.created_at));
      if (monthMap.has(key)) monthMap.get(key)!.revenue += o.price || 0;
    }
    for (const [key, val] of monthMap.entries()) {
      const [y, m] = key.split('-');
      const label = new Date(parseInt(y, 10), parseInt(m, 10) - 1, 1).toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' });
      months.push({ month: label, count: val.count, revenue: val.revenue });
    }
    const leadsByMonth = months.reverse();

    // 6) Прогноз (EMA и среднесуточные)
    const avgDailyLeads = leadsByDay.length ? leadsByDay.reduce((s, d) => s + d.count, 0) / leadsByDay.length : 0;
    // Дневной доход: по заказам
    const revenueByDayMap = new Map<string, number>();
    for (let i = 0; i < rangeDays; i++) {
      const d = new Date(from.getTime() + i * 86400000);
      revenueByDayMap.set(formatDate(d), 0);
    }
    for (const o of bookedOrders) {
      const key = formatDate(new Date(o.created_at));
      revenueByDayMap.set(key, (revenueByDayMap.get(key) || 0) + (o.price || 0));
    }
    const revenueByDay = Array.from(revenueByDayMap.values());
    const avgDailyRevenue = revenueByDay.length ? revenueByDay.reduce((s, v) => s + v, 0) / revenueByDay.length : 0;

    // EMA helper
    const ema = (values: number[], span: number) => {
      if (!values.length) return { series: [], last: 0 };
      const alpha = 2 / (span + 1);
      const s: number[] = [];
      values.forEach((v, i) => {
        if (i === 0) s.push(v); else s.push(v * alpha + s[i - 1] * (1 - alpha));
      });
      return { series: s, last: s[s.length - 1] };
    };
    const leadsEma = ema(leadsByDay.map(d => d.count), 7);
    const revenueEma = ema(revenueByDay, 7);

    const forecast = {
      leadsNext30: Math.round((leadsEma.last || avgDailyLeads) * 30),
      revenueNext30: Math.round((revenueEma.last || avgDailyRevenue) * 30),
      avgDailyLeads: Math.round(avgDailyLeads * 100) / 100,
      avgDailyRevenue: Math.round(avgDailyRevenue),
      ema: {
        leads: Math.round(leadsEma.last || 0),
        revenue: Math.round(revenueEma.last || 0),
      }
    };

    // 7) Алерты (простые правила)
    const alerts: string[] = [];
    const todayRevenue = revenueByDay[revenueByDay.length - 1] || 0;
    if (leadsByDay.length > 3 && leadsEma.last && leadsByDay[leadsByDay.length - 1].count < leadsEma.last * 0.6) {
      alerts.push('Резкое падение заявок сегодня относительно EMA');
    }
    if (revenueByDay.length > 3 && revenueEma.last && todayRevenue < revenueEma.last * 0.6) {
      alerts.push('Резкое падение дневного дохода относительно EMA');
    }

    return NextResponse.json({
      totalLeads,
      todayLeads,
      weekLeads,
      monthLeads,
      conversionRate,
      totalRevenue: Math.round(totalRevenue),
      realizedRevenue: Math.round(realizedRevenue),
      averageOrderValue: Math.round(averageOrderValue),
      topServices,
      availableServices,
      leadsByStatus,
      sources,
      leadsByDay,
      leadsByMonth,
      forecast,
      alerts,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}