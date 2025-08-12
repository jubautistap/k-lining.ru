import { NextRequest, NextResponse } from 'next/server';

// Legacy admin auth endpoint — по умолчанию отключен для безопасности.
// Включение только через переменную окружения ENABLE_LEGACY_ADMIN_AUTH=true

function disabledResponse() {
  return NextResponse.json({ error: 'Endpoint disabled' }, { status: 404 });
}

export async function POST(_request: NextRequest) {
  if (process.env.ENABLE_LEGACY_ADMIN_AUTH !== 'true') {
    return disabledResponse();
  }
  return disabledResponse();
}

export async function GET(_request: NextRequest) {
  if (process.env.ENABLE_LEGACY_ADMIN_AUTH !== 'true') {
    return disabledResponse();
  }
  return disabledResponse();
}