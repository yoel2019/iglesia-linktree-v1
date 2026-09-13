import { NextResponse } from 'next/server';

const LANGS = new Set(['es', 'en', 'pt']);
const MAX_TEXTS = 30;
const MAX_CHARS = 3000;
type Lang = 'es' | 'en' | 'pt';
type TranslationResult = { text: string; source?: Lang };

async function translate(text: string, target: Lang): Promise<TranslationResult> {
  if (!text.trim()) return { text };
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${target}&dt=t&q=${encodeURIComponent(text.slice(0, MAX_CHARS))}`;
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) throw new Error(`Translation provider returned ${response.status}`);
  const data = await response.json();
  const parts = Array.isArray(data?.[0]) ? data[0] : [];
  const translated = parts.map((part: unknown[]) => String(part?.[0] ?? '')).join('') || text;
  const source = typeof data?.[2] === 'string' && LANGS.has(data[2]) ? data[2] as Lang : undefined;
  return { text: translated, source };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const targets: Lang[] = Array.isArray(body?.targets) ? [...new Set(body.targets.map(String).filter((x: string): x is Lang => LANGS.has(x)))] : [];
    const texts = body?.texts;
    if (!targets.length || !texts || typeof texts !== 'object' || Array.isArray(texts)) return NextResponse.json({ error: 'Solicitud de traducción no válida.' }, { status: 400 });
    const entries = Object.entries(texts).slice(0, MAX_TEXTS);
    const translations: Record<Lang, Record<string, string>> = { es: {}, en: {}, pt: {} };
    const detected: Record<string, Lang> = {};
    await Promise.all(targets.flatMap((target: Lang) => entries.map(async ([key, value]) => {
      const text = typeof value === 'string' ? value : '';
      if (!text.trim()) return;
      try {
        const result = await translate(text, target);
        translations[target][key] = result.text;
        if (result.source && !detected[key]) detected[key] = result.source;
      } catch { translations[target][key] = text; }
    })));
    for (const [key, source] of Object.entries(detected)) {
      const original = typeof texts[key] === 'string' ? texts[key] : '';
      if (original) translations[source][key] = original;
    }
    return NextResponse.json({ translations, detected });
  } catch { return NextResponse.json({ error: 'No se pudo generar la traducción automática.' }, { status: 500 }); }
}
