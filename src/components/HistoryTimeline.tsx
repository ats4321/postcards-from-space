import { useLayoutEffect, useRef, useState, type KeyboardEvent } from 'react';
import { getImage, getItemName, type Item, type Place } from '../content';
import { formatDate } from '../lib/format';
import { useI18n } from '../lib/i18n';
import '../styles/history.css';
import { Globe, type GlobeKind } from './Globe';
import { Bubble } from './JourneyScene';

type Props = { items: Item[]; stamps: string[]; year: number; today: number; selectedId?: string; machineId?: string };

const START = 1965;
const GLOBE: Partial<Record<string, GlobeKind>> = { Moon: 'moon', Mars: 'mars', Asteroids: 'asteroids' };
const PLACES: Place[] = ['Moon', 'Mars', 'Asteroids', 'Deep space'];

// Geometry in px, on the 8 px grid.
const PAD_L = 16; // room for the 20 px bubble at the start of a bar
const PAD_R = 24; // room for the "still going" arrow
const TOP = 32; // year labels
const ROW = 24; // one machine per row; the whole row is the hit area
const BAR = 8;

const YEAR_MS = 365.25 * 86_400_000;
/** "1969-07-20" → 1969.55, so bars sit at their true point in the year. */
const yearOf = (iso: string) => {
  const date = new Date(`${iso}T00:00:00Z`);
  const year = date.getUTCFullYear();
  return year + (date.getTime() - Date.UTC(year, 0, 1)) / YEAR_MS;
};

/**
 * Every machine on one time axis, one band per place. Bars run from launch to
 * the last signal; with no last signal they run to arrival, or to today when the
 * machine is still working. Only dates already in items.json are used.
 * The year comes from WhereNow; machines appear as their launch passes.
 */
export function HistoryTimeline({ items, stamps, year, today, selectedId, machineId }: Props) {
  const { language, t } = useI18n();
  const box = useRef<HTMLDivElement>(null);
  const bars = useRef(new Map<string, Element & { focus(): void }>());
  const [width, setWidth] = useState(328);
  const [focusId, setFocusId] = useState<string>();
  const [previewId, setPreviewId] = useState<string>();

  useLayoutEffect(() => {
    const element = box.current;
    if (!element) return;
    const measure = () => setWidth(Math.max(280, Math.floor(element.clientWidth)));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const xOf = (at: number) => PAD_L + ((Math.min(at, today) - START) / (today - START)) * (width - PAD_L - PAD_R);

  const rows: { place: Place; item: Item; y: number }[] = [];
  const bands: { place: Place; y: number }[] = [];
  let y = TOP;
  for (const place of PLACES) {
    const here = items.filter((item) => item.place === place).sort((a, b) => a.launchDate.localeCompare(b.launchDate));
    if (!here.length) continue;
    bands.push({ place, y });
    y += ROW;
    for (const item of here) {
      rows.push({ place, item, y });
      y += ROW;
    }
  }
  const height = y + 8;

  const endOf = (item: Item) =>
    item.lastContact ? yearOf(item.lastContact) : item.status === 'working' ? today : yearOf(item.arrivalDate ?? item.launchDate);

  const shown = rows.filter(({ item }) => yearOf(item.launchDate) <= year);
  const order = [...shown].sort((a, b) => a.item.launchDate.localeCompare(b.item.launchDate) || a.y - b.y);
  const tabId = order.some((row) => row.item.id === focusId) ? focusId : order[0]?.item.id;
  const preview = shown.find((row) => row.item.id === previewId);
  const done = year >= today;
  const ticks = Array.from({ length: Math.floor(today / 10) * 10 - 1960 }, (_, i) => 1970 + i)
    .filter((tick) => tick % (width >= 560 ? 10 : 20) === 0 && tick < today - 3);

  const onBarKey = (event: KeyboardEvent, index: number) => {
    const last = order.length - 1;
    const next =
      event.key === 'ArrowRight' || event.key === 'ArrowDown'
        ? Math.min(index + 1, last)
        : event.key === 'ArrowLeft' || event.key === 'ArrowUp'
          ? Math.max(index - 1, 0)
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? last
              : undefined;
    if (next === undefined) return;
    event.preventDefault();
    const id = order[next]!.item.id;
    setFocusId(id);
    bars.current.get(id)?.focus();
  };

  const tip = preview && {
    x: (xOf(yearOf(preview.item.launchDate)) + xOf(endOf(preview.item))) / 2,
    y: preview.y,
  };
  const tipSide = !tip ? '' : tip.x < width / 3 ? 'start' : tip.x > (width * 2) / 3 ? 'end' : 'middle';

  return (
    <div className="history">
      <p>{t('history.note')}</p>
      <div className="history-chart" ref={box}>
        <svg width={width} height={height} role="group" aria-labelledby="where-heading" aria-describedby="history-keys">
          {ticks.map((tick) => (
            <g key={tick} aria-hidden="true">
              <line className="history-grid" x1={xOf(tick)} x2={xOf(tick)} y1={TOP - 8} y2={height} />
              <text className="history-axis" x={xOf(tick)} y={16} textAnchor="middle">
                {tick}
              </text>
            </g>
          ))}
          {bands.map(({ place, y: bandY }) => {
            const globe = GLOBE[place];
            return (
              <g key={place} aria-hidden="true">
                {globe && <Globe kind={globe} x={PAD_L - 8} y={bandY + 12} r={6} />}
                <text className="history-place" x={PAD_L + (globe ? 8 : -8)} y={bandY + 16}>
                  {t(`place.${place}`)}
                </text>
              </g>
            );
          })}
          {order.map(({ item, y: rowY }, index) => {
            const start = xOf(yearOf(item.launchDate));
            const end = Math.max(xOf(Math.min(endOf(item), year)), start + 2 * BAR);
            const going = item.status === 'working' && !item.lastContact && done;
            const arrived = item.arrivalDate && yearOf(item.arrivalDate) <= year;
            const name = getItemName(item.id, language);
            const stamped = stamps.includes(item.id);
            const mid = rowY + ROW / 2;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                ref={(element) => {
                  if (element) bars.current.set(item.id, element);
                  else bars.current.delete(item.id);
                }}
                className="history-bar"
                data-stamped={stamped}
                data-id={item.id}
                data-selected={item.id === machineId}
                tabIndex={item.id === tabId ? 0 : -1}
                aria-label={t('history.bar', {
                  name,
                  stamp: t(stamped ? 'passport.stamped' : 'passport.open'),
                  date: formatDate(item.launchDate, language),
                  status: t(`status.${item.status}`),
                })}
                aria-current={item.id === selectedId ? 'true' : undefined}
                onKeyDown={(event) => onBarKey(event, index)}
                onFocus={() => {
                  setFocusId(item.id);
                  setPreviewId(item.id);
                }}
                onBlur={() => setPreviewId(undefined)}
                onMouseEnter={() => setPreviewId(item.id)}
                onMouseLeave={() => setPreviewId(undefined)}
              >
                <rect className="history-hit" x={start - 12} y={rowY} width={end - start + (going ? 28 : 16)} height={ROW} rx={4} />
                <rect className="history-fill" x={start} y={mid - BAR / 2} width={end - start} height={BAR} rx={BAR / 2} />
                {going && <path className="history-fill" d={`M${end + 2} ${mid - 6} L${end + 12} ${mid} L${end + 2} ${mid + 6} Z`} />}
                {arrived && <circle className="history-arrival" cx={xOf(yearOf(item.arrivalDate!))} cy={mid} r={2} />}
                <Bubble
                  id={item.id}
                  x={start}
                  y={mid}
                  r={10}
                  photo={getImage(item.imageId)?.file}
                  ring={item.arrivalDate && yearOf(item.arrivalDate) > year ? 'travelling' : item.status}
                  stamped={stamped}
                />
              </a>
            );
          })}
          {!done && <line className="history-marker" x1={xOf(year)} x2={xOf(year)} y1={TOP - 8} y2={height} aria-hidden="true" />}
        </svg>
        {preview && tip && (
          <p className={`history-tip history-tip--${tipSide}`} aria-hidden="true" style={{ left: tipSide === 'start' ? Math.max(0, tip.x - 24) : tip.x, top: tip.y - 4 }}>
            <strong>{getItemName(preview.item.id, language)}</strong>
            {t('history.launched', { year: preview.item.launchDate.slice(0, 4) })}
            <br />
            {t(`status.${preview.item.status}`)}
          </p>
        )}
      </div>

      <ul className="history-legend label" aria-hidden="true">
        <li>
          <svg width="24" height="16">
            <rect className="history-fill" x="0" y="4" width="24" height="8" rx="4" />
            <circle className="history-arrival" cx="12" cy="8" r="2" />
          </svg>
          {t('history.legend.arrived')}
        </li>
        <li>
          <svg width="16" height="16">
            <path className="history-fill" d="M3 2 L13 8 L3 14 Z" />
          </svg>
          {t('history.legend.going')}
        </li>
      </ul>
      <p className="visually-hidden" id="history-keys">
        {t('history.keys')}
      </p>
    </div>
  );
}
