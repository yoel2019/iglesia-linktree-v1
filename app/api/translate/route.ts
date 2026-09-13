import { NextResponse } from 'next/server';

const LANGS = new Set(['es', 'en', 'pt']);
const MAX_TEXTS = 30;
const MAX_CHARS = 3000;

async function translate(text: string, target: string) {
  if (!text.trim()) return text;
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${target}&dt=t&q=${encodeURIComponent(text.slice(0, MAX_CHARS))}`;
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) throw new Error(`Translation provider returned ${response.status}`);
  const data = await response.json();
  const parts = Array.isArray(data?.[0]) ? data[0] : [];
  return parts.map((part: unknown[]) => String(part?.[0] ?? '')).join('') || text;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const targets = Array.isArray(body?.targets)
      ? body.targets.map(String).filter((x: string) => LANGS.has(x))
      : [];
    const texts = body?.texts;

    if (!targets.length || !texts || typeof texts !== 'object' || Array.isArray(texts)) {
      return NextResponse.json({ error: 'Solicitud de traducción no válida.' }, { status: 400 });
    }

    const entries = Object.entries(texts).slice(0, MAX_TEXTS);
    const translations: Record<string, Record<string, string>> = {};
    for (const target of targets) translations[target] = {};

    await Promise.all(targets.flatMap((target: string) => entries.map(async ([key, value]) => {
      const text = typeof value === 'string' ? value : '';
      if (!text.trim()) return;
      try {
        translations[target][key] = await translate(text, target);
      } catch {
        translations[target][key] = text;
      }
    })));

    return NextResponse.json({ translations });
  } catch {
    return NextResponse.json({ error: 'No se pudo generar la traducción automática.' }, { status: 500 });
  }
}
