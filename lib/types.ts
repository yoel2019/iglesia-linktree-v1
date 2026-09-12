export type Lang = 'es' | 'en' | 'pt';
export type Translation = { name?: string; handle?: string; bio?: string; title?: string; subtitle?: string; footer?: string };
export type Translations = Partial<Record<Lang, Translation>>;
export type Profile = {
  id: string; slug: string; name: string; handle: string | null; bio: string | null; logo_url: string | null; accent_color: string; background_style: string; featured_title: string | null; featured_url: string | null; featured_image_url: string | null; footer_text: string | null; published: boolean; translations?: Translations | null;
};
export type LinkItem = { id: string; profile_id: string; title: string; subtitle: string | null; url: string; icon: string; sort_order: number; active: boolean; translations?: Translations | null; };

export const LANGUAGE_ORDER: Lang[] = ['es', 'en', 'pt'];
export const SYSTEM_FALLBACK_LANG: Lang = 'en';

export function hasLang(value: unknown): value is Lang {
  return value === 'es' || value === 'en' || value === 'pt';
}
