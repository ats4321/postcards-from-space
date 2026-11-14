/**
 * Rewrites the References section of README.md from the content JSON, so the
 * list of sources can never drift from what the app actually cites.
 *
 *   npm run references            rewrite README.md
 *   npm run references -- --check exit 1 if README.md is out of date
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { ImagesFileSchema, ItemsFileSchema } from '../src/content/schema';
import { paths, readJson, rel, ROOT } from './lib';

const README = join(ROOT, 'README.md');
const START = '<!-- references:start -->';
const END = '<!-- references:end -->';

function load(path: string): unknown {
  const json = readJson(path);
  if (!json.ok) throw new Error(`${rel(path)}: ${json.error}`);
  return json.data;
}

function buildReferences(): string {
  const items = ItemsFileSchema.parse(load(paths.items));
  const images = ImagesFileSchema.parse(load(paths.images));
  const lines: string[] = [];

  for (const item of items) {
    lines.push(`### ${item.name}`, '');
    lines.push(`Official page: <${item.officialUrl}>`, '');
    for (const source of item.sources) {
      lines.push(`- [${source.title}](${source.url}): ${source.supports}`);
    }
    lines.push('');
  }

  const credited = images.filter((image) => image.sourceUrl);
  if (credited.length > 0) {
    lines.push('### Images', '');
    for (const image of credited) {
      lines.push(`- \`${image.id}\`: ${image.credit}. <${image.sourceUrl}> (${image.license})`);
    }
    lines.push('');
  }

  return lines.join('\n').trimEnd();
}

const readme = readFileSync(README, 'utf8');
const start = readme.indexOf(START);
const end = readme.indexOf(END);
if (start === -1 || end === -1 || end < start) {
  throw new Error(`README.md must contain "${START}" followed by "${END}"`);
}

const updated = `${readme.slice(0, start + START.length)}\n${buildReferences()}\n${readme.slice(end)}`;

if (process.argv.includes('--check')) {
  if (updated !== readme) {
    console.error('README.md references are out of date. Run `npm run references`.');
    process.exit(1);
  }
  console.log('README.md references are up to date.');
} else if (updated === readme) {
  console.log('README.md references are already up to date.');
} else {
  writeFileSync(README, updated);
  console.log('README.md references updated.');
}
