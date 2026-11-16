/**
 * Validates all content JSON against src/content/schema.ts.
 *
 *   npm run validate
 *
 * Errors make the script exit with code 1 (and stop `npm run build`).
 * Warnings are printed but do not fail the run.
 */
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import type { ZodIssue, ZodTypeAny } from 'zod';
import {
  ContentSchema,
  ImagesFileSchema,
  ImageTextsFileSchema,
  ItemsFileSchema,
  ItemTextsFileSchema,
  UiStringsSchema,
} from '../src/content/schema';
import { BASE_LOCALE, listLocales, paths, PUBLIC_DIR, readJson, rel } from './lib';

/**
 * Locales that are still being written. Missing files or keys in these are
 * warnings. Spanish is complete, so it is strict: gaps in es fail the build.
 */
const LOCALES_IN_PROGRESS = new Set<string>();

const errors: string[] = [];
const warnings: string[] = [];

function formatPath(path: ReadonlyArray<string | number>): string {
  return path.map((part) => (typeof part === 'number' ? `[${part}]` : part)).join(' › ');
}

function reportIssues(file: string, issues: ZodIssue[], sink: string[] = errors): void {
  for (const issue of issues) {
    const where = issue.path.length > 0 ? ` › ${formatPath(issue.path)}` : '';
    sink.push(`${file}${where}: ${issue.message}`);
  }
}

/** Reads and parses one file. Returns undefined (and records why) on failure. */
function load<S extends ZodTypeAny>(path: string, schema: S): S['_output'] | undefined {
  const file = rel(path);
  const json = readJson(path);
  if (!json.ok) {
    errors.push(`${file}: ${json.error}`);
    return undefined;
  }
  const parsed = schema.safeParse(json.data);
  if (!parsed.success) {
    reportIssues(file, parsed.error.issues);
    return undefined;
  }
  return parsed.data as S['_output'];
}

// 1. English content: each file on its own, then the cross-references.
const items = load(paths.items, ItemsFileSchema);
const images = load(paths.images, ImagesFileSchema);
const baseText = load(paths.itemText(BASE_LOCALE), ItemTextsFileSchema);
const baseImageText = load(paths.imageText(BASE_LOCALE), ImageTextsFileSchema);
const baseUi = load(paths.ui(BASE_LOCALE), UiStringsSchema);

if (items && images && baseText && baseImageText) {
  const content = ContentSchema.safeParse({
    items,
    images,
    text: baseText,
    imageText: baseImageText,
  });
  if (!content.success) reportIssues('cross-references', content.error.issues);
}

// 2. Every image file exists under /public.
for (const image of images ?? []) {
  if (!existsSync(join(PUBLIC_DIR, image.file))) {
    errors.push(`${rel(paths.images)} › ${image.id}: file "public${image.file}" does not exist`);
  }
}

// 3. Every other locale has the same keys as English.
function compareKeys(
  locale: string,
  file: string,
  base: Record<string, unknown>,
  other: Record<string, unknown>,
): void {
  const gaps = LOCALES_IN_PROGRESS.has(locale) ? warnings : errors;
  for (const key of Object.keys(base)) {
    if (!(key in other)) gaps.push(`${file}: missing "${key}" (present in ${BASE_LOCALE})`);
  }
  for (const key of Object.keys(other)) {
    if (!(key in base)) errors.push(`${file}: "${key}" does not exist in ${BASE_LOCALE}`);
  }
}

/**
 * Every number in an English string must appear unchanged in the translation,
 * so a translated distance or date can never drift from the sourced English.
 * Numbers use the same style in every locale ("238,855", "16.094").
 */
const NUMBER = /\d(?:[\d,.]*\d)?/g;
const NUMBER_CHECKED_FIELDS = ['name', 'locationName', 'distanceNote', 'alt'];

function compareNumbers(
  file: string,
  base: Record<string, Record<string, unknown>>,
  other: Record<string, Record<string, unknown>>,
): void {
  for (const [id, entry] of Object.entries(other)) {
    for (const field of NUMBER_CHECKED_FIELDS) {
      const english = base[id]?.[field];
      const translated = entry[field];
      if (typeof english !== 'string' || typeof translated !== 'string') continue;
      const found = new Set(translated.match(NUMBER));
      for (const number of english.match(NUMBER) ?? []) {
        if (!found.has(number)) {
          errors.push(`${file} › ${id} › ${field}: number "${number}" from ${BASE_LOCALE} is missing`);
        }
      }
    }
  }
}

const locales = new Set([...listLocales(), ...LOCALES_IN_PROGRESS]);
locales.delete(BASE_LOCALE);

for (const locale of locales) {
  const checks = [
    { path: paths.itemText(locale), schema: ItemTextsFileSchema, base: baseText },
    { path: paths.imageText(locale), schema: ImageTextsFileSchema, base: baseImageText },
    { path: paths.ui(locale), schema: UiStringsSchema, base: baseUi },
  ];
  for (const { path, schema, base } of checks) {
    const file = rel(path);
    if (!existsSync(path)) {
      const gaps = LOCALES_IN_PROGRESS.has(locale) ? warnings : errors;
      gaps.push(`${file}: file is missing, the app falls back to ${BASE_LOCALE}`);
      continue;
    }
    const translated = load(path, schema);
    if (!translated || !base) continue;
    compareKeys(locale, file, base, translated);
    if (schema !== UiStringsSchema) {
      compareNumbers(
        file,
        base as Record<string, Record<string, unknown>>,
        translated as Record<string, Record<string, unknown>>,
      );
    }
  }
}

// 4. Report.
function printList(title: string, lines: string[], log: (line: string) => void): void {
  if (lines.length === 0) return;
  log(`\n${title} (${lines.length})`);
  for (const line of lines) log(`  - ${line}`);
}

printList('Warnings', warnings, console.warn);
printList('Errors', errors, console.error);

if (errors.length > 0) {
  console.error(`\nContent validation failed with ${errors.length} error(s).`);
  process.exit(1);
}

console.log(
  `\nContent is valid: ${items?.length ?? 0} items, ${images?.length ?? 0} images, ` +
    `${warnings.length} warning(s).`,
);
