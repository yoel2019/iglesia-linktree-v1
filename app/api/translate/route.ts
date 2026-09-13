import { NextResponse } from 'next/server';

const LANGS = new Set(['es', 'en', 'pt']);
const MAX_TEXTS = 30;
const MAX_CHARS = 3000;

type TranslationResult = { text: string; source?: string };

async function translate(text: string, target: string): Promise<TranslationResult> {
  if (!text.trim()) return { text };
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${target}&dt=t&q=${encodeURIComponent(text.slice(0, MAX_CHARS))}`;
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) throw new Error(`Translation provider returned ${response.status}`);
  const data = await response.json();
  const parts = Array.isArray(data?.[0]) ? data[0] : [];
  const translated = parts.map((part: unknown[]) => String(part?.[0] ?? '')).join('') || text;
  const source = typeof data?.[2] === 'string' && LANGS.has(data[2]) ? data[2] : undefined;
  return { text: translated, source };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const targets = Array.isArray(body?.targets) ? [...new Set(body.targets.map(String).filter((x: string) => LANGS.has(x)))] : [];
    const texts = body?.texts;
    if (!targets.length || !texts || typeof texts !== 'object' || Array.isArray(texts)) return NextResponse.json({ error: 'Solicitud de traducción no válida.' }, { status: 400 });
    const entries = Object.entries(texts).slice(0, MAX_TEXTS);
    const translations: Record<string, Record<string, string>> = {};
    const detected: Record<string, string> = {};
    for (const target of targets) translations[target] = {};

    await Promise.all(targets.flatMap((target: string) => entries.map(async ([key, value]) => {
      const text = typeof value === 'string' ? value : '';
      if (!text.trim()) return;
      try {
        const result = await translate(text, target);
        translations[target][key] = result.text;
        if (result.source && !detected[key]) detected[key] = result.source;
      } catch {
        translations[target][key] = text;
      }
    })));
    for (const [key, source] of Object.entries(detected)) {
      const original = typeof texts[key] === 'string' ? texts[key] : '';
      if (original && translations[source]) translations[source][key] = original;
    }
    return NextResponse.json({ translations, detected });
  } catch {
    return NextResponse.json({ error: 'No se pudo generar la traducción automática.' }, { status: 500 });
  }
}
