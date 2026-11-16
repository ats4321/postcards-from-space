/**
 * Journey maths. Everything here is computed from fields already in the
 * content (launchDate, arrivalDate, lastContact, timeline rows); nothing new.
 */
import type { Item, ItemText } from '../content';

const DAY_MS = 86_400_000;

export type MilestoneKind = 'launch' | 'row' | 'arrival' | 'lastContact' | 'today';
export type Milestone = {
  kind: MilestoneKind;
  date: string;
  ms: number;
  event?: string;
};

export function toMs(date: string): number {
  return Date.parse(date.length === 7 ? `${date}-01T00:00:00Z` : date.length === 10 ? `${date}T00:00:00Z` : date);
}

/** Launch, every trip-log row, arrival, last contact and today, oldest first, without same-day repeats. */
export function getMilestones(item: Item, text: ItemText, now = Date.now()): Milestone[] {
  const fixed: Milestone[] = [
    { kind: 'launch', date: item.launchDate, ms: toMs(item.launchDate) },
    ...(item.arrivalDate
      ? [
          {
            kind: 'arrival' as const,
            date: item.arrivalDate,
            ms: toMs(item.arrivalDate),
          },
        ]
      : []),
    ...(item.lastContact
      ? [
          {
            kind: 'lastContact' as const,
            date: item.lastContact,
            ms: toMs(item.lastContact),
          },
        ]
      : []),
  ];
  // A row on the same day as launch, arrival or last contact ("I left Earth.") is already a chip.
  const rows: Milestone[] = (text.timeline ?? [])
    .filter((row) => !fixed.some((m) => m.date.startsWith(row.date.slice(0, 10))))
    .map((row) => ({
      kind: 'row',
      date: row.date,
      ms: toMs(row.date),
      event: row.event,
    }));
  return [
    ...fixed,
    ...rows,
    {
      kind: 'today' as const,
      date: new Date(now).toISOString().slice(0, 10),
      ms: now,
    },
  ].sort((a, b) => a.ms - b.ms);
}

/** Scrubber value (0 … milestones-1, equal width per gap) to a moment in time. */
export function timeAt(milestones: Milestone[], value: number): number {
  const i = Math.min(Math.floor(value), milestones.length - 2);
  const a = milestones[i]!;
  const b = milestones[i + 1]!;
  return a.ms + (b.ms - a.ms) * Math.min(1, value - i);
}

export function daysBetween(fromMs: number, toMs: number): number {
  return Math.floor((toMs - fromMs) / DAY_MS);
}

export type Duration = { n: number; unit: 'day' | 'month' | 'year' };

/** Days under 60, months under 2 years, then years. */
export function toDuration(days: number): Duration {
  if (days < 60) return { n: days, unit: 'day' };
  if (days < 730) return { n: Math.max(2, Math.round(days / 30.4375)), unit: 'month' };
  return { n: Math.round(days / 365.25), unit: 'year' };
}

/** Like toDuration but never rounds up, for a running clock. */
export function clockDuration(days: number): Duration {
  if (days < 60) return { n: days, unit: 'day' };
  if (days < 730) return { n: Math.max(2, Math.floor(days / 30.4375)), unit: 'month' };
  return { n: Math.floor(days / 365.25), unit: 'year' };
}

export function formatDuration({ n, unit }: Duration, language: string): string {
  return new Intl.NumberFormat(language === 'es' ? 'es-MX' : language, {
    style: 'unit',
    unit,
    unitDisplay: 'long',
  }).format(n);
}

const PLANETS = ['Jupiter', 'Saturn', 'Uranus', 'Neptune'] as const;
export type Planet = (typeof PLANETS)[number];

/**
 * Deep-space anchors read from the English trip log (dates match in every
 * locale): which planets a row names, and whether a row says "interstellar".
 */
export function deepSpaceAnchors(englishText: ItemText) {
  const planets: Array<{ planet: Planet; ms: number }> = [];
  let interstellarMs: number | undefined;
  for (const row of englishText.timeline ?? []) {
    const planet = PLANETS.find((name) => row.event.includes(name));
    if (planet && !planets.some((p) => p.planet === planet)) planets.push({ planet, ms: toMs(row.date) });
    if (/interstellar/i.test(row.event)) interstellarMs = toMs(row.date);
  }
  return { planets, interstellarMs };
}

/** The asteroid's name as written in the item's own location text (Ceres, Eros). */
export function asteroidName(locationName: string): string | undefined {
  return locationName.match(/\b(Ceres|Eros)\b/)?.[1];
}

const YEAR_MS = 365.25 * DAY_MS;
/** Any content date ("1972-03", "1969-07-20", "1969-07-20T20:17Z") as a fractional year. */
export function toYear(date: string): number {
  return (toMs(date) - Date.UTC(1970, 0, 1)) / YEAR_MS + 1970;
}
