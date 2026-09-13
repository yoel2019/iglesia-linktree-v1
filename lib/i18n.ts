import type { Lang, Translation, Translations } from './types';

export const DEFAULT_LANG: Lang = 'en';
export const SUPPORTED_LANGS: Lang[] = ['es', 'en', 'pt'];

export function resolveLang(value: unknown, fallback: Lang = DEFAULT_LANG): Lang {
  return typeof value === 'string' && SUPPORTED_LANGS.includes(value as Lang) ? value as Lang : fallback;
}

export function t<T extends keyof Translation>(base: string | null | undefined, translations: Translations | null | undefined, lang: Lang, key: T): string {
  const selected = translations?.[lang]?.[key];
  if (selected?.trim()) return selected;
  if (base?.trim()) return base;
  for (const candidate of [translations?.es?.[key], translations?.en?.[key], translations?.pt?.[key]]) {
    if (candidate?.trim()) return candidate;
  }
  return '';
}

export function uiText<T extends Record<Lang, string>>(dictionary: T, lang: Lang): string {
  return dictionary[lang] || dictionary.en || '';
}
