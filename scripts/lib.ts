import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const CONTENT_DIR = join(ROOT, 'src', 'content');
export const LOCALES_DIR = join(CONTENT_DIR, 'locales');
export const PUBLIC_DIR = join(ROOT, 'public');
export const BASE_LOCALE = 'en';

export const paths = {
  items: join(CONTENT_DIR, 'items.json'),
  images: join(CONTENT_DIR, 'images.json'),
  itemText: (locale: string) => join(LOCALES_DIR, locale, 'items.json'),
  ui: (locale: string) => join(LOCALES_DIR, locale, 'ui.json'),
};

/** Path relative to the repo root, for readable messages. */
export function rel(path: string): string {
  return relative(ROOT, path);
}

export type JsonResult = { ok: true; data: unknown } | { ok: false; error: string };

export function readJson(path: string): JsonResult {
  if (!existsSync(path)) return { ok: false, error: 'file is missing' };
  try {
    return { ok: true, data: JSON.parse(readFileSync(path, 'utf8')) as unknown };
  } catch (error) {
    return { ok: false, error: `not valid JSON (${(error as Error).message})` };
  }
}

export function listLocales(): string[] {
  if (!existsSync(LOCALES_DIR)) return [];
  return readdirSync(LOCALES_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}
