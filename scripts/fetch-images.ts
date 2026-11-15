/**
 * Downloads every photo in MANIFEST and writes it to public/img/<id>.webp
 * (max 1200 px wide, under 200 KB, metadata stripped), then records each
 * picture's width and height in src/content/images.json.
 *
 *   npm run fetch-images            only what is missing
 *   npm run fetch-images -- --force redo every conversion
 *
 * Originals are cached in .cache/img-originals (not in git). The words about
 * each picture (alt, credit, license) live in images.json; this file only
 * says where the pixels come from. Exits 1 if a download fails or a size
 * budget is broken.
 */
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';
import { paths, PUBLIC_DIR, ROOT } from './lib';

type Entry = {
  /** Output name: public/img/<id>.webp. Hero ids equal the item id. */
  id: string;
  kind: 'hero' | 'now';
  /** The human-readable page the picture comes from (same as sourceUrl). */
  page: string;
  /** The file to download. */
  url: string;
};

const MAX_WIDTH = 1200;
const MAX_BYTES = 200 * 1024;
const MAX_TOTAL_BYTES = 6 * 1024 * 1024;
const QUALITY = 78;
const MIN_QUALITY = 40;
const CACHE_DIR = join(ROOT, '.cache', 'img-originals');
const OUT_DIR = join(PUBLIC_DIR, 'img');

const library = (nasaId: string) => ({
  page: `https://images.nasa.gov/details/${nasaId}`,
  url: `https://images-assets.nasa.gov/image/${nasaId}/${nasaId}~orig.jpg`,
});
const photojournal = (pia: string) => ({
  page: `https://photojournal.jpl.nasa.gov/catalog/${pia}`,
  url: `https://images-assets.nasa.gov/image/${pia}/${pia}~orig.jpg`,
});
const hirise = (observation: string, path: string) => ({
  page: `https://www.uahirise.org/${observation}`,
  url: `https://static.uahirise.org/images/${path}`,
});
// lroc.asu.edu no longer resolves; www.lroc.asu.edu redirects to this host.
const lroc = (post: number, path: string) => ({
  page: `https://lroc.im-ldi.com/images/${post}`,
  url: `https://lroc.im-ldi.com/${path}`,
});

const MANIFEST: Entry[] = [
  { id: 'phoenix', kind: 'hero', ...photojournal('PIA11719') },
  { id: 'phoenix-now', kind: 'now', ...hirise('PSP_008591_2485', '2008/details/cut/PSP_008591_2485_cut_a.jpg') },
  { id: 'voyager-1', kind: 'hero', ...photojournal('PIA26353') },
  { id: 'apollo-11-eagle', kind: 'hero', ...library('as11-40-5915') },
  // One orbital view shows both the Eagle descent stage and the reflector.
  { id: 'apollo-11-site-now', kind: 'now', ...lroc(484, 'news/uploads/Apollo_11.png') },
  { id: 'apollo-11-reflector', kind: 'hero', ...library('as11-40-5948') },
  { id: 'opportunity', kind: 'hero', ...photojournal('PIA18079') },
  { id: 'opportunity-now', kind: 'now', ...hirise('ESP_056955_1775', '2018/details/ESP_056955_1775.jpg') },
  { id: 'spirit', kind: 'hero', ...photojournal('PIA07371') },
  { id: 'spirit-now', kind: 'now', ...hirise('ESP_021925_1650', '2011/details/ESP_021925_1650.jpg') },
  { id: 'ingenuity', kind: 'hero', ...photojournal('PIA25881') },
  // Taken from the ground by Perseverance: HiRISE has no captioned view of the final airfield.
  { id: 'ingenuity-now', kind: 'now', ...photojournal('PIA26236') },
  { id: 'apollo-17-lrv', kind: 'hero', ...library('as17-147-22527') },
  { id: 'apollo-17-lrv-now', kind: 'now', ...lroc(379, 'news/uploads/a17_lrv.png') },
  { id: 'insight', kind: 'hero', ...photojournal('PIA22876') },
  { id: 'insight-now', kind: 'now', ...hirise('ESP_061684_1845', '2019/details/ESP_061684_1845.jpg') },
  { id: 'viking-1', kind: 'hero', ...photojournal('PIA00381') },
  { id: 'viking-1-now', kind: 'now', ...hirise('PSP_001521_2025', '2011/details/PSP_001521_2025.jpg') },
  { id: 'sojourner', kind: 'hero', ...photojournal('PIA01122') },
  { id: 'sojourner-now', kind: 'now', ...hirise('PSP_001890_1995', '2011/details/PSP_001890_1995.jpg') },
  { id: 'voyager-2', kind: 'hero', ...photojournal('PIA21736') },
  { id: 'pioneer-10', kind: 'hero', ...library('ARC-1972-AC72-2135') },
  { id: 'surveyor-3', kind: 'hero', ...library('as12-48-7121') },
  {
    id: 'surveyor-3-now',
    kind: 'now',
    ...lroc(1135, 'ckeditor_assets/pictures/944/content_M175428601_LRmos.str01.1100SQCROP.fix.51.png'),
  },
  { id: 'apollo-12-alsep', kind: 'hero', ...library('as12-47-6918') },
  { id: 'apollo-12-alsep-now', kind: 'now', ...lroc(401, 'news/uploads/M175428601RE_25cm_AP12_area.png') },
  { id: 'dawn', kind: 'hero', ...photojournal('PIA12018') },
  { id: 'near-shoemaker', kind: 'hero', ...library('9701593') },
  { id: 'pioneer-11', kind: 'hero', ...library('KSC-73P-0116') },
  { id: 'kepler', kind: 'hero', ...photojournal('PIA11188') },
];

async function download(entry: Entry): Promise<string> {
  const cached = join(CACHE_DIR, entry.id);
  if (existsSync(cached)) return cached;
  // A generic browser-style agent: some NASA hosts refuse unknown clients.
  const response = await fetch(entry.url, { headers: { 'user-agent': 'Mozilla/5.0 Chrome/130' } });
  if (!response.ok) throw new Error(`${response.status} for ${entry.url}`);
  writeFileSync(cached, Buffer.from(await response.arrayBuffer()));
  return cached;
}

/** Steps the quality down until the file fits the per-image budget. */
async function convert(original: string, out: string): Promise<void> {
  for (let quality = QUALITY; quality >= MIN_QUALITY; quality -= 6) {
    // sharp drops EXIF/ICC metadata unless asked to keep it; rotate() bakes in the orientation first.
    const webp = await sharp(original)
      .rotate()
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality })
      .toBuffer();
    if (webp.byteLength <= MAX_BYTES) {
      writeFileSync(out, webp);
      return;
    }
  }
  throw new Error(`cannot get under ${MAX_BYTES} bytes even at quality ${MIN_QUALITY}`);
}

const force = process.argv.includes('--force');
mkdirSync(CACHE_DIR, { recursive: true });

const failures: string[] = [];
const sizes = new Map<string, { width: number; height: number }>();
let totalBytes = 0;

for (const entry of MANIFEST) {
  const out = join(OUT_DIR, `${entry.id}.webp`);
  try {
    if (force || !existsSync(out)) await convert(await download(entry), out);
    const { width, height } = await sharp(out).metadata();
    const bytes = statSync(out).size;
    if (!width || !height || width > MAX_WIDTH || bytes > MAX_BYTES) {
      throw new Error(`breaks the budget: ${width}x${height}, ${bytes} bytes`);
    }
    sizes.set(`/img/${entry.id}.webp`, { width, height });
    totalBytes += bytes;
    console.log(`ok   ${entry.id}.webp ${width}x${height} ${Math.round(bytes / 1024)} KB`);
  } catch (error) {
    failures.push(`${entry.id}: ${(error as Error).message}`);
    console.error(`FAIL ${entry.id}: ${(error as Error).message}`);
  }
}

// Keep images.json honest: sizes come from the files, source and kind from the manifest.
type ImageRecord = { id: string; file: string; kind?: string; sourceUrl?: string; width?: number; height?: number };
const images = JSON.parse(readFileSync(paths.images, 'utf8')) as ImageRecord[];
const byFile = new Map(MANIFEST.map((entry) => [`/img/${entry.id}.webp`, entry]));
for (const image of images) {
  const entry = byFile.get(image.file);
  if (!entry) continue;
  Object.assign(image, sizes.get(image.file));
  if (image.sourceUrl !== entry.page) failures.push(`${image.id}: sourceUrl differs from the manifest page`);
  if (image.kind !== entry.kind) failures.push(`${image.id}: kind differs from the manifest`);
}
for (const file of byFile.keys()) {
  if (!images.some((image) => image.file === file)) failures.push(`${file}: no entry in images.json`);
}
writeFileSync(paths.images, `${JSON.stringify(images, null, 2)}\n`);

console.log(`\n${sizes.size} images, ${(totalBytes / 1024 / 1024).toFixed(2)} MB in total.`);
if (totalBytes > MAX_TOTAL_BYTES) failures.push(`public/img is over ${MAX_TOTAL_BYTES} bytes`);
if (failures.length > 0) {
  console.error(`\n${failures.length} problem(s):`);
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}
