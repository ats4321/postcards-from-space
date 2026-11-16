/**
 * The one place the app loads content from. Components import from here and
 * never read the JSON files directly.
 *
 * The JSON is checked by `npm run validate` before every build, so it is cast
 * to the schema types here instead of being parsed again in the browser.
 */
import imagesJson from './images.json';
import itemsJson from './items.json';
import type { Image, ImageText, Item, ItemText, UiStrings } from './schema';

export type { Image, Item, ItemText, Place, Quiz, Source, Status, UiStrings } from './schema';

export const LANGUAGES = ['en', 'es'] as const;
export type Language = (typeof LANGUAGES)[number];
export const DEFAULT_LANGUAGE: Language = 'en';

/** NASA: the moment Voyager 1 is one light-day from Earth (2:16:07 a.m. PST). */
export const VOYAGER_ONE_LIGHT_DAY_UTC = '2026-11-18T10:16:07Z';

export const items = itemsJson as Item[];
export const images = imagesJson as Image[];

// Locale files are found by pattern, so a new language (or the Spanish files
// landing) needs no code change here.
const uiFiles = import.meta.glob<UiStrings>('./locales/*/ui.json', {
  eager: true,
  import: 'default',
});
const textFiles = import.meta.glob<Record<string, ItemText>>('./locales/*/items.json', {
  eager: true,
  import: 'default',
});

const imageTextFiles = import.meta.glob<Record<string, ImageText>>('./locales/*/images.json', {
  eager: true,
  import: 'default',
});

function forLanguage<T>(files: Record<string, T>, language: string, file: string): T | undefined {
  return files[`./locales/${language}/${file}`];
}

export function isLanguage(value: unknown): value is Language {
  return LANGUAGES.includes(value as Language);
}

export function getItem(id: string): Item | undefined {
  return items.find((item) => item.id === id);
}

export function getImage(id: string): Image | undefined {
  return images.find((image) => image.id === id);
}

/** UI strings for a language. Any key not translated yet falls back to English. */
export function getUiStrings(language: Language): UiStrings {
  return {
    ...forLanguage(uiFiles, DEFAULT_LANGUAGE, 'ui.json'),
    ...forLanguage(uiFiles, language, 'ui.json'),
  };
}

/**
 * The words for one item. Each string missing from the translation falls back
 * to English on its own, so a half-translated item still shows in full.
 */
export function getItemText(id: string, language: Language): ItemText | undefined {
  const base = forLanguage(textFiles, DEFAULT_LANGUAGE, 'items.json')?.[id];
  const local = forLanguage(textFiles, language, 'items.json')?.[id];
  return base || local ? ({ ...base, ...local } as ItemText) : undefined;
}

/** An item's display name in a language (English if not translated). */
export function getItemName(id: string, language: Language): string {
  return getItemText(id, language)?.name ?? id;
}

/** A picture's alt text in a language, falling back to English. */
export function getImageAlt(id: string, language: Language): string {
  return (
    forLanguage(imageTextFiles, language, 'images.json')?.[id]?.alt ??
    forLanguage(imageTextFiles, DEFAULT_LANGUAGE, 'images.json')?.[id]?.alt ??
    ''
  );
}
