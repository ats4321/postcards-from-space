import { useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent } from 'react';
import { getItemName, getItemText, type Item, type Place } from '../content';
import { formatDate } from '../lib/format';
import { useI18n } from '../lib/i18n';
import '../styles/history.css';
import { useMediaQuery } from './useMediaQuery';

type Props = { items: Item[]; stamps: string[]; selectedId?: string };

const START = 1965;
const PLAY_MS = 12_000;
const PLACES: Place[] = ['Moon', 'Mars', 'Asteroids', 'Deep space'];

// Geometry in px, on the 8 px grid.
const PAD_L = 8;
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

type Event = { at: number; key: string; item: Item; date: string };

/**
 * Every machine on one time axis, one band per place. Bars run from launch to
 * the last signal; with no last signal they run to arrival, or to today when the
 * machine is still working. Only dates already in items.json are used.
 *
 * "Play" sweeps a year marker from 1965 to today; machines appear as their launch
 * passes. With reduced motion there is no sweep: everything shows, and the reader
 * steps year by year instead.
 */
export function History({ items, stamps, selectedId }: Props) {
  const { language, t } = useI18n();
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const box = useRef<HTMLDivElement>(null);
  const bars = useRef(new Map<string, Element & { focus(): void }>());
  const frame = useRef<number>();
  const [width, setWidth] = useState(328);
  const [today] = useState(() => (Date.now() - Date.UTC(1970, 0, 1)) / YEAR_MS + 1970);
  // The marker. Starts at today, so everything shows until the reader presses Play.
  const [year, setYear] = useState(today);
  const [playing, setPlaying] = useState(false);
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

  useEffect(() => {
    if (!playing) return;
    // Resume from wherever the marker is; a finished sweep restarts at 1965.
    const from = year >= today ? START : year;
    const began = performance.now() - ((from - START) / (today - START)) * PLAY_MS;
    const tick = (now: number) => {
      const next = START + ((now - began) / PLAY_MS) * (today - START);
      if (next >= today) {
        setYear(today);
        setPlaying(false);
        return;
      }
      setYear(next);
      frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current!);
    // The sweep reads `year` only when it starts or resumes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, today]);

  useEffect(() => {
    if (reduceMotion) setPlaying(false);
  }, [reduceMotion]);

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

  const events: Event[] = items
    .flatMap((item) => [
      { at: yearOf(item.launchDate), key: 'history.event.launch', item, date: item.launchDate },
      ...(item.arrivalDate && item.place !== 'Deep space'
        ? [{ at: yearOf(item.arrivalDate), key: `history.event.arrive.${item.place}`, item, date: item.arrivalDate }]
        : []),
      ...(item.lastContact ? [{ at: yearOf(item.lastContact), key: 'history.event.last', item, date: item.lastContact }] : []),
    ])
    .sort((a, b) => a.at - b.at);
  const latest = events.filter((event) => event.at <= year).at(-1);
  const caption = latest
    ? t(latest.key, {
        date: formatDate(latest.date, language),
        name: getItemName(latest.item.id, language),
        location: getItemText(latest.item.id, language)?.locationName ?? '',
      })
    : '';

  const shown = rows.filter(({ item }) => yearOf(item.launchDate) <= year);
  const order = [...shown].sort((a, b) => a.item.launchDate.localeCompare(b.item.launchDate) || a.y - b.y);
  const tabId = order.some((row) => row.item.id === focusId) ? focusId : order[0]?.item.id;
  const preview = shown.find((row) => row.item.id === previewId);
  const done = year >= today;
  const shownYear = Math.floor(year);
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

  const step = (by: number) => setYear((current) => Math.min(today, Math.max(START, Math.floor(current) + by) + 0.999));

  const tip = preview && {
    x: (xOf(yearOf(preview.item.launchDate)) + xOf(endOf(preview.item))) / 2,
    y: preview.y,
  };
  const tipSide = !tip ? '' : tip.x < width / 3 ? 'start' : tip.x > (width * 2) / 3 ? 'end' : 'middle';

  return (
    <section className="history panel" aria-labelledby="history-heading">
      <h2 id="history-heading">{t('history.heading')}</h2>
      <p>{t('history.note')}</p>

      <div className="history-controls">
        {reduceMotion ? (
          <>
            <button type="button" onClick={() => step(-1)} disabled={shownYear <= START}>
              {t('history.prev')}
            </button>
            <button type="button" onClick={() => step(1)} disabled={done}>
              {t('history.next')}
            </button>
          </>
        ) : playing ? (
          <button type="button" onClick={() => setPlaying(false)}>
            {t('history.pause')}
          </button>
        ) : (
          <>
            <button type="button" className="history-play" onClick={() => setPlaying(true)}>
              {t(done ? 'history.play' : 'history.resume')}
            </button>
            {!done && (
              <button type="button" onClick={() => { setYear(START); setPlaying(true); }}>
                {t('history.replay')}
              </button>
            )}
          </>
        )}
      </div>

      {/* Silent while sweeping, so a screen reader is not flooded with 60 years. */}
      <div className="history-readout" aria-live={playing ? 'off' : 'polite'} aria-atomic="true">
        <p className="history-year">
          <span className="visually-hidden">{t('history.year')} </span>
          {shownYear}
        </p>
        <p className="history-caption">{caption || ' '}</p>
      </div>

      <div className="history-chart" ref={box}>
        <svg width={width} height={height} role="group" aria-labelledby="history-heading" aria-describedby="history-keys">
          {ticks.map((tick) => (
            <g key={tick} aria-hidden="true">
              <line className="history-grid" x1={xOf(tick)} x2={xOf(tick)} y1={TOP - 8} y2={height} />
              <text className="history-axis" x={xOf(tick)} y={16} textAnchor="middle">
                {tick}
              </text>
            </g>
          ))}
          {bands.map(({ place, y: bandY }) => (
            <text key={place} className="history-place" x={PAD_L} y={bandY + 16} aria-hidden="true">
              {t(`place.${place}`)}
            </text>
          ))}
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
                <rect className="history-hit" x={start - 4} y={rowY} width={end - start + (going ? 20 : 8)} height={ROW} rx={4} />
                <rect className="history-fill" x={start} y={mid - BAR / 2} width={end - start} height={BAR} rx={BAR / 2} />
                {going && <path className="history-fill" d={`M${end + 2} ${mid - 6} L${end + 12} ${mid} L${end + 2} ${mid + 6} Z`} />}
                {arrived && <circle className="history-arrival" cx={xOf(yearOf(item.arrivalDate!))} cy={mid} r={2} />}
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
            <rect className="history-fill" data-stamped="true" x="0" y="4" width="24" height="8" rx="4" />
          </svg>
          {t('ladder.legend.stamped')}
        </li>
        <li>
          <svg width="24" height="16">
            <rect className="history-fill" x="0" y="4" width="24" height="8" rx="4" />
          </svg>
          {t('ladder.legend.open')}
        </li>
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
    </section>
  );
}
