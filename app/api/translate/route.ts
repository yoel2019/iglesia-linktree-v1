import { NextResponse } from 'next/server';

const TARGETS = new Set(['en', 'pt']);
const MAX_TEXTS = 12;
const MAX_CHARS = 3000;

async function translate(text: string, target: string) {
  if (!text.trim() || target === 'es') return text;
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=es&tl=${target}&dt=t&q=${encodeURIComponent(text.slice(0, MAX_CHARS))}`;
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) throw new Error(`Translation provider returned ${response.status}`);
  const data = await response.json();
  const parts = Array.isArray(data?.[0]) ? data[0] : [];
  return parts.map((part: unknown[]) => String(part?.[0] ?? '')).join('') || text;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const target = String(body?.target ?? '');
    const texts = body?.texts;

    if (!TARGETS.has(target) || !texts || typeof texts !== 'object' || Array.isArray(texts)) {
      return NextResponse.json({ error: 'Solicitud de traducción no válida.' }, { status: 400 });
    }

    const entries = Object.entries(texts).slice(0, MAX_TEXTS);
    const result: Record<string, string> = {};

    await Promise.all(entries.map(async ([key, value]) => {
      const text = typeof value === 'string' ? value : '';
      if (!text.trim()) return;
      try {
        result[key] = await translate(text, target);
      } catch {
        // If the provider is temporarily unavailable, keep the Spanish source.
        result[key] = text;
      }
    }));

    return NextResponse.json({ translations: result });
  } catch {
    return NextResponse.json({ error: 'No se pudo generar la traducción automática.' }, { status: 500 });
  }
}
