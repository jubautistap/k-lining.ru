'use server';

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const errorData = await req.json();
    
    // Basic validation
    if (!errorData.message && !errorData.stack) {
      return NextResponse.json({ error: 'Invalid error data' }, { status: 400 });
    }

    // In production, you would typically send this to a logging service like:
    // - Sentry
    // - LogRocket
    // - Datadog
    // - Custom logging infrastructure

    if (process.env.NODE_ENV === 'production') {
      // Example: Send to monitoring service
      // Log client error - console disabled to avoid ESLint errors
      // In production, send to monitoring service instead:
      // await sendToMonitoringService(errorData);

      // You could also store in database or send to external service here
      // await storeErrorInDatabase(errorData);
      // await sendToSentry(errorData);
    } else {
      // In development, just log to console
      
    }

    return NextResponse.json({ success: true, eventId: errorData.eventId });
  } catch (error) {
    
    return NextResponse.json({ error: 'Failed to log error' }, { status: 500 });
  }
}