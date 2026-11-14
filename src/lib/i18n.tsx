import { createContext, useContext, useEffect, useMemo, type ReactNode } from 'react';
import { DEFAULT_LANGUAGE, getUiStrings, isLanguage, type Language } from '../content';
import { useStoredState } from './useStoredState';

type Translate = (key: string, values?: Record<string, string | number>) => string;

type I18n = {
  language: Language;
  setLanguage: (language: Language) => void;
  /** Looks up a UI string and fills in {placeholders}. Unknown keys show as the key. */
  t: Translate;
};

const I18nContext = createContext<I18n | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [stored, setLanguage] = useStoredState<Language>('pfs.language', DEFAULT_LANGUAGE);
  const language = isLanguage(stored) ? stored : DEFAULT_LANGUAGE;

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo<I18n>(() => {
    const strings = getUiStrings(language);
    const t: Translate = (key, values = {}) =>
      (strings[key] ?? key).replace(/\{(\w+)\}/g, (match, name: string) =>
        name in values ? String(values[name]) : match,
      );
    return { language, setLanguage, t };
  }, [language, setLanguage]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18n {
  const value = useContext(I18nContext);
  if (!value) throw new Error('useI18n must be used inside <I18nProvider>');
  return value;
}
