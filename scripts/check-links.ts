/**
 * Requests every URL in items.json (officialUrl, sources) and images.json
 * (sourceUrl) and reports the ones that do not answer 200. An Amazon WAF
 * challenge (HTTP 202 with x-amzn-waf-action: challenge) is reachable, so it
 * is reported separately instead of failing the release check.
 *
 *   npm run check-links
 *
 * Uses HEAD first. Some servers refuse HEAD, so anything that is not 200 is
 * retried once with GET before it is reported. Needs network access, so it
 * is not part of `npm run build`.
 */
import { ImagesFileSchema, ItemsFileSchema } from '../src/content/schema';
import { paths, readJson, rel } from './lib';

const TIMEOUT_MS = 20_000;
const CONCURRENCY = 4;
// Some NASA sites (jpl.nasa.gov) answer 403 to anything that does not look
// like a browser, so the checker sends browser-style headers.
const HEADERS = {
  'user-agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36',
  accept: 'text/html,application/xhtml+xml,*/*;q=0.8',
  'accept-language': 'en-US,en;q=0.9',
};

type ReachableStatus = 200 | '202 (bot challenge)';
type Status = ReachableStatus | number | string;
type Result = { url: string; usedBy: string[]; status: Status };

function collectUrls(): Map<string, string[]> {
  const urls = new Map<string, string[]>();
  const add = (url: string, usedBy: string) => {
    urls.set(url, [...(urls.get(url) ?? []), usedBy]);
  };

  const items = readJson(paths.items);
  const images = readJson(paths.images);
  if (!items.ok) throw new Error(`${rel(paths.items)}: ${items.error}`);
  if (!images.ok) throw new Error(`${rel(paths.images)}: ${images.error}`);

  for (const item of ItemsFileSchema.parse(items.data)) {
    add(item.officialUrl, `${item.id} officialUrl`);
    item.sources.forEach((source, index) => add(source.url, `${item.id} sources[${index}]`));
  }
  for (const image of ImagesFileSchema.parse(images.data)) {
    if (image.sourceUrl) add(image.sourceUrl, `image ${image.id} sourceUrl`);
  }
  return urls;
}

async function request(url: string, method: 'HEAD' | 'GET'): Promise<Status> {
  try {
    const response = await fetch(url, {
      method,
      headers: HEADERS,
      redirect: 'follow',
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    const challenged =
      response.status === 202 && response.headers.get('x-amzn-waf-action')?.toLowerCase() === 'challenge';
    await response.body?.cancel();
    return challenged ? '202 (bot challenge)' : response.status;
  } catch (error) {
    const cause = (error as { cause?: { code?: string } }).cause?.code;
    return cause ?? (error as Error).name;
  }
}

async function check(url: string): Promise<Status> {
  const head = await request(url, 'HEAD');
  return head === 200 || head === '202 (bot challenge)' ? head : request(url, 'GET');
}

async function main(): Promise<void> {
  const queue = [...collectUrls()];
  const results: Result[] = [];

  const worker = async () => {
    for (let next = queue.shift(); next; next = queue.shift()) {
      const [url, usedBy] = next;
      const status = await check(url);
      console.log(`${status === 200 || status === '202 (bot challenge)' ? 'ok  ' : 'FAIL'} ${status} ${url}`);
      results.push({ url, usedBy, status });
    }
  };
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  const failures = results.filter(
    (result) => result.status !== 200 && result.status !== '202 (bot challenge)',
  );
  if (failures.length === 0) {
    console.log(`\nAll ${results.length} links are reachable.`);
    return;
  }

  console.error(`\n${failures.length} of ${results.length} links did not answer 200:`);
  for (const failure of failures) {
    console.error(`  - ${failure.status} ${failure.url}`);
    console.error(`    used by: ${failure.usedBy.join(', ')}`);
  }
  process.exit(1);
}

await main();
