import { type NextRequest, NextResponse } from 'next/server';
import { deliverLead } from '@/lib/lead-delivery';
import { leadSchema } from '@/lib/lead-schema';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const windows = new Map<string, { count: number; expiresAt: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const MAX_BODY_BYTES = 7_500_000;

function getClientKey(request: NextRequest) {
  // Prefer a platform-provided connecting IP, avoid trusting arbitrary user-set proxy headers.
  return request.headers.get('cf-connecting-ip') ?? request.headers.get('x-real-ip') ?? 'unknown-client';
}

function allowRequest(key: string) {
  const now = Date.now();
  for (const [storedKey, value] of windows.entries()) {
    if (value.expiresAt <= now) windows.delete(storedKey);
  }
  const current = windows.get(key);
  if (!current || current.expiresAt <= now) {
    windows.set(key, { count: 1, expiresAt: now + WINDOW_MS });
    return true;
  }
  if (current.count >= MAX_PER_WINDOW) return false;
  current.count += 1;
  return true;
}

export async function POST(request: NextRequest) {
  const contentType = request.headers.get('content-type') ?? '';
  if (!contentType.toLowerCase().includes('application/json')) {
    return NextResponse.json({ ok: false, error: 'Ongeldig aanvraagformaat.' }, { status: 415 });
  }
  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: 'De aanvraag met foto is te groot (max. 5 MB per foto).' }, { status: 413 });
  }
  if (!allowRequest(getClientKey(request))) {
    return NextResponse.json({ ok: false, error: 'Er zijn te veel aanvragen verstuurd. Probeer het over enkele minuten opnieuw.' }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'De aanvraag kon niet worden gelezen.' }, { status: 400 });
  }
  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    const messages = parsed.error.issues.map((issue) => issue.message);
    return NextResponse.json({ ok: false, error: messages[0] ?? 'Controleer de ingevulde gegevens.' }, { status: 400 });
  }

  const result = await deliverLead(parsed.data);
  if (!result.ok) {
    const status = result.reason === 'not_configured' ? 503 : 502;
    const error = result.reason === 'not_configured'
      ? 'Het aanvragen van offertes wordt nog klaargezet. Neem rechtstreeks contact op zodra Alaina Bouw de contactgegevens heeft ingevuld.'
      : 'De aanvraag is nog niet bevestigd. Probeer het later opnieuw of neem rechtstreeks contact op.';
    return NextResponse.json({ ok: false, error }, { status });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
