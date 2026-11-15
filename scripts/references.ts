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
const SUBMISSION = join(ROOT, 'docs', 'submission.md');
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

function replaceReferences(document: string, references: string): string {
  const start = document.indexOf(START);
  const end = document.indexOf(END);
  if (start === -1 || end === -1 || end < start) {
    throw new Error(`document must contain "${START}" followed by "${END}"`);
  }
  return `${document.slice(0, start + START.length)}\n${references}\n${document.slice(end)}`;
}

const readme = readFileSync(README, 'utf8');
const references = buildReferences();
const updated = replaceReferences(readme, references);
const submission = readFileSync(SUBMISSION, 'utf8');
const updatedSubmission = replaceReferences(submission, references);

if (process.argv.includes('--check')) {
  if (updated !== readme || updatedSubmission !== submission) {
    console.error('References are out of date. Run `npm run references`.');
    process.exit(1);
  }
  console.log('README.md references are up to date.');
} else if (updated === readme) {
  if (updatedSubmission === submission) console.log('References are already up to date.');
  else {
    writeFileSync(SUBMISSION, updatedSubmission);
    console.log('Submission references updated.');
  }
} else {
  writeFileSync(README, updated);
  writeFileSync(SUBMISSION, updatedSubmission);
  console.log('README.md and submission references updated.');
}
