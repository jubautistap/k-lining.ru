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
      console.error('Client Error:', {
        timestamp: new Date().toISOString(),
        message: errorData.message,
        stack: errorData.stack,
        url: errorData.url,
        userAgent: errorData.userAgent,
        componentStack: errorData.componentStack,
        level: errorData.level,
        component: errorData.component,
        eventId: errorData.eventId
      });

      // You could also store in database or send to external service here
      // await storeErrorInDatabase(errorData);
      // await sendToSentry(errorData);
    } else {
      // In development, just log to console
      console.error('Development Error:', errorData);
    }

    return NextResponse.json({ success: true, eventId: errorData.eventId });
  } catch (error) {
    console.error('Failed to log error:', error);
    return NextResponse.json({ error: 'Failed to log error' }, { status: 500 });
  }
}