/**
 * Data contract for Postcards from Space. This file is the source of truth.
 *
 * Owned by the Foundation agent. Other agents may add fields, but only in a
 * separate commit so the change is easy to review.
 *
 * zod is only used at build time (`npm run validate`). The app imports the
 * TypeScript types from here and never bundles zod.
 */
import { z } from 'zod';

const KEBAB_CASE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export const LETTER_PARAGRAPH_MAX = 320;
export const MIN_SOURCES = 2;

const text = z.string().trim().min(1);
const httpsUrl = z
  .string()
  .url()
  .refine((value) => value.startsWith('https://'), 'must be an https:// URL');
const kebabId = z.string().regex(KEBAB_CASE, 'must be kebab-case (for example "voyager-1")');
const isoDate = z
  .string()
  .regex(ISO_DATE, 'must be an ISO date, YYYY-MM-DD')
  .refine((value) => !Number.isNaN(Date.parse(`${value}T00:00:00Z`)), 'is not a real date');

export const PLACES = ['Moon', 'Mars', 'Asteroids', 'Deep space'] as const;
export const STATUSES = ['working', 'resting', 'drifting'] as const;
/** Keys for the drawn fallback shown when an item has no photo yet. */
export const ILLUSTRATIONS = ['lander', 'rover', 'orbiter', 'probe', 'instrument'] as const;

export const SourceSchema = z
  .object({
    url: httpsUrl,
    title: text,
    /** Which claim(s) in the item or its text this source backs. */
    supports: text,
  })
  .strict();

/** Language-neutral facts about one piece of hardware (src/content/items.json). */
export const ItemSchema = z
  .object({
    id: kebabId,
    name: text,
    place: z.enum(PLACES),
    locationName: text,
    launchDate: isoDate,
    arrivalDate: isoDate.optional(),
    lastContact: isoDate.optional(),
    status: z.enum(STATUSES),
    /** Typical distance from Earth in kilometres. Explain the choice in distanceNote. */
    distanceKm: z.number().positive(),
    distanceNote: text,
    illustration: z.enum(ILLUSTRATIONS),
    imageId: kebabId,
    arizona: z.boolean(),
    nssdcId: z
      .string()
      .regex(/^\d{4}-\d{3}[A-Z]{1,3}$/, 'must look like an NSSDCA ID, for example "1977-084A"')
      .optional(),
    officialUrl: httpsUrl,
    /**
     * JSON has no comments, so this is where a "code comment" about content
     * goes, for example a note about two sources that disagree.
     */
    editorNote: text.optional(),
    sources: z.array(SourceSchema).min(MIN_SOURCES, `needs at least ${MIN_SOURCES} sources`),
  })
  .strict();

const letterParagraph = text.max(
  LETTER_PARAGRAPH_MAX,
  `letter paragraphs are at most ${LETTER_PARAGRAPH_MAX} characters`,
);

export const QuizSchema = z
  .object({
    question: text,
    options: z.tuple([text, text, text]),
    answerIndex: z.number().int().min(0).max(2),
  })
  .strict();

/** The words for one item in one language (src/content/locales/<lang>/items.json). */
export const ItemTextSchema = z
  .object({
    letter: z.tuple([letterParagraph, letterParagraph, letterParagraph]),
    signOff: text,
    science: z.tuple([text, text, text]),
    today: text,
    arizonaNote: text.optional(),
    worldNote: text.optional(),
    quiz: QuizSchema,
  })
  .strict();

const WEBP_FILE = /^\/img\/[a-z0-9][a-z0-9/-]*\.webp$/;
const ILLUSTRATION_FILE = /^\/img\/illustrations\/[a-z0-9-]+\.svg$/;

/**
 * One picture (src/content/images.json). `file` is a path under /public.
 * Photos are WebP and must say where they came from. Until the Imagery agent
 * adds a photo, `file` may point at a drawn fallback in /img/illustrations.
 */
export const ImageSchema = z
  .object({
    id: kebabId,
    file: z
      .string()
      .refine(
        (value) => WEBP_FILE.test(value) || ILLUSTRATION_FILE.test(value),
        'must be /img/<name>.webp or /img/illustrations/<name>.svg',
      ),
    alt: text,
    credit: text,
    sourceUrl: httpsUrl.optional(),
    license: text,
    /** "hero" is the item's main picture (id equals the item id); "now" shows where it rests today. */
    kind: z.enum(['hero', 'now']).optional(),
    /** Pixel size of the file, written by `npm run fetch-images` so the UI can reserve space. */
    width: z.number().int().positive().optional(),
    height: z.number().int().positive().optional(),
  })
  .strict()
  .superRefine((image, ctx) => {
    if (WEBP_FILE.test(image.file) && !image.sourceUrl) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['sourceUrl'],
        message: 'photos need a sourceUrl (only illustration fallbacks may leave it out)',
      });
    }
  });

function refineUniqueIds(list: ReadonlyArray<{ id: string }>, ctx: z.RefinementCtx): void {
  const seen = new Map<string, number>();
  list.forEach((entry, index) => {
    const first = seen.get(entry.id);
    if (first === undefined) {
      seen.set(entry.id, index);
      return;
    }
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: [index, 'id'],
      message: `duplicate id "${entry.id}" (first used at index ${first})`,
    });
  });
}

export const ItemsFileSchema = z.array(ItemSchema).superRefine(refineUniqueIds);
export const ImagesFileSchema = z.array(ImageSchema).superRefine(refineUniqueIds);
export const ItemTextsFileSchema = z.record(kebabId, ItemTextSchema);
/** UI strings (src/content/locales/<lang>/ui.json): a flat map of key to text. */
export const UiStringsSchema = z.record(z.string().min(1), text);

/**
 * Everything the app needs for one language, checked together so the
 * cross-references hold: every item has text and an image entry, and no text
 * is left over for an item that does not exist.
 */
export const ContentSchema = z
  .object({
    items: ItemsFileSchema,
    images: ImagesFileSchema,
    text: ItemTextsFileSchema,
  })
  .superRefine((content, ctx) => {
    const itemIds = new Set(content.items.map((item) => item.id));
    const imageIds = new Set(content.images.map((image) => image.id));

    content.items.forEach((item, index) => {
      if (!(item.id in content.text)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['text', item.id],
          message: `item "${item.id}" has no text`,
        });
      }
      if (!imageIds.has(item.imageId)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['items', index, 'imageId'],
          message: `imageId "${item.imageId}" is not in images.json`,
        });
      }
    });

    for (const id of Object.keys(content.text)) {
      if (!itemIds.has(id)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['text', id],
          message: `text for "${id}" has no matching item in items.json`,
        });
      }
    }
  });

export type Place = (typeof PLACES)[number];
export type Status = (typeof STATUSES)[number];
export type Illustration = (typeof ILLUSTRATIONS)[number];
export type Source = z.infer<typeof SourceSchema>;
export type Item = z.infer<typeof ItemSchema>;
export type Quiz = z.infer<typeof QuizSchema>;
export type ItemText = z.infer<typeof ItemTextSchema>;
export type Image = z.infer<typeof ImageSchema>;
export type UiStrings = z.infer<typeof UiStringsSchema>;
export type Content = z.infer<typeof ContentSchema>;
