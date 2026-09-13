'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { resolveLang, SUPPORTED_LANGS } from '@/lib/i18n';
import type { Lang } from '@/lib/types';

const DEFAULT_UI_LANG: Lang = 'es';
type LanguageContextValue = { lang: Lang; setLang: (lang: Lang) => void; cycleLang: () => void };
const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const scope = pathname?.startsWith('/admin') ? 'admin' : 'public';
  const storageKey = `site-language-${scope}`;
  const [lang, setLangState] = useState<Lang>(DEFAULT_UI_LANG);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    setLangState(resolveLang(saved, DEFAULT_UI_LANG));
  }, [storageKey]);

  function setLang(value: Lang) {
    const next = resolveLang(value, DEFAULT_UI_LANG);
    setLangState(next);
    window.localStorage.setItem(storageKey, next);
  }
  function cycleLang() {
    const index = SUPPORTED_LANGS.indexOf(lang);
    setLang(SUPPORTED_LANGS[(index + 1) % SUPPORTED_LANGS.length]);
  }
  const value = useMemo(() => ({ lang, setLang, cycleLang }), [lang, storageKey]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider');
  return context;
}
