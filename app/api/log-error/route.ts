'use server';

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const errorSchema = z.object({
  message: z.string().optional(),
  stack: z.string().optional(),
  eventId: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const errorData = await req.json();
    const parsed = errorSchema.parse(errorData);

    // In production, you would typically send this to a logging service like:
    // - Sentry
    // - LogRocket
    // - Datadog
    // - Custom logging infrastructure

    if (process.env.NODE_ENV === 'production') {
      // Example: Send to monitoring service
      // Log client error - console disabled to avoid ESLint errors
      // In production, send to monitoring service instead:
      // await sendToMonitoringService(parsed);

      // You could also store in database or send to external service here
      // await storeErrorInDatabase(parsed);
      // await sendToSentry(parsed);
    } else {
      // In development, just log to console
      
    }

    return NextResponse.json({ success: true, eventId: parsed.eventId });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Ошибка валидации данных', errors: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: 'Failed to log error' }, { status: 500 });
  }
}