import { useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { getItemName, type Item } from '../content';
import { formatDistance, formatLightTime, LIGHT_KM_PER_S } from '../lib/format';
import { useI18n } from '../lib/i18n';
import { toYear } from '../lib/journey';

type Props = {
  items: Item[];
  stamps: string[];
  year: number;
  today: number;
  selectedId?: string;
  machineId?: string;
  pulse?: { id: string; n: number };
  onSend: (id: string) => void;
};

/** The scale runs from 100,000 km (closer than the Moon) to 30 billion km (past Voyager 1). */
const MIN_LOG = 5;
const MAX_LOG = Math.log10(3e10);

// Geometry in px, on the 8 px grid.
const PAD = 16; // room for a dot at either end
const TOP = 48; // axis labels, two rows when the light-time labels need them
const LANE = 64; // one rung: 16 label + 32 hit areas + 16 gap
const PITCH = 32; // between dots that share a rung, so every 32 px hit area stays whole
const HIT = 16; // hit-area radius: 32 px targets
const CHAR = 7.2; // IBM Plex Mono advance at 12 px, used to keep labels inside the strip
const DOT = 8;
// Light-time axis: one light-second, -minute, -hour and -day, in km.
const LIGHT_TICKS = [
  ['second', 1],
  ['minute', 60],
  ['hour', 3600],
  ['day', 86_400],
] as const;
const VIEWS = ['distance', 'light'] as const;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

/**
 * Log-scale strip. Each rung is one group: the Moon, Mars, the asteroids, and one
 * rung per deep-space probe. Giving every group its own rung is what keeps labels
 * from ever overlapping, at any width. A tick marks each true distance; hardware
 * sharing a rung sits side by side around the tick.
 *
 * Selecting a point "sends a hello": a pulse runs from Earth (the left edge) to the
 * point, then a card shows the real radio travel time. The pulse always takes
 * PULSE_MS because the scale is logarithmic; the card says so.
 */
export function LadderMap({ items, stamps, year, today, selectedId, machineId, pulse, onSend }: Props) {
  const { language, t } = useI18n();
  const box = useRef<HTMLDivElement>(null);
  const points = useRef(new Map<string, SVGGElement>());
  const [width, setWidth] = useState(328);
  const [focusId, setFocusId] = useState<string>();
  const [previewId, setPreviewId] = useState<string>();
  const [view, setView] = useState<(typeof VIEWS)[number]>('distance');

  useLayoutEffect(() => {
    const element = box.current;
    if (!element) return;
    const measure = () => setWidth(Math.max(280, Math.floor(element.clientWidth)));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const xOf = (km: number) =>
    PAD + ((clamp(Math.log10(km), MIN_LOG, MAX_LOG) - MIN_LOG) / (MAX_LOG - MIN_LOG)) * (width - 2 * PAD);

  const groups = new Map<string, Item[]>();
  for (const item of [...items].sort((a, b) => a.distanceKm - b.distanceKm)) {
    const key = item.place === 'Deep space' ? item.id : item.place;
    groups.set(key, [...(groups.get(key) ?? []), item]);
  }
  const lanes = [...groups.values()].map((lane, index) => {
    const first = lane[0]!;
    const label = first.place === 'Deep space' ? getItemName(first.id, language) : t(`place.${first.place}`);
    const rung = TOP + index * LANE + 40;
    const centre = lane.reduce((sum, item) => sum + xOf(item.distanceKm), 0) / lane.length;
    const span = (lane.length - 1) * PITCH;
    const start = clamp(centre - span / 2, PAD, Math.max(PAD, width - PAD - span));
    return { first, label, rung, centre, points: lane.map((item, position) => ({ item, x: start + position * PITCH, y: rung })) };
  });
  // Hidden before launch; a ring between Earth and the destination while travelling (deep space travels until today).
  const stateOf = (item: Item) => {
    const launch = toYear(item.launchDate);
    if (year < launch) return { shown: false, travelling: false, f: 0 };
    const end = item.arrivalDate ? toYear(item.arrivalDate) : today;
    return { shown: true, travelling: year < end, f: Math.min(1, (year - launch) / (end - launch || 1)) };
  };
  const order = lanes.flatMap((lane) => lane.points).filter(({ item }) => stateOf(item).shown);
  const height = TOP + lanes.length * LANE;

  const compact = new Intl.NumberFormat(language, { notation: 'compact' });
  const decades = [5, 6, 7, 8, 9, 10].filter((_, index) => width >= 560 || index % 2 === 0);
  // Both views share positions; only the axis labels change. Labels are clamped
  // inside the strip and, when narrow, alternate between two rows so they never touch.
  const ticks =
    view === 'distance'
      ? decades.map((power) => ({ km: 10 ** power, label: `${compact.format(10 ** power)} km` }))
      : LIGHT_TICKS.map(([unit, seconds]) => ({ km: seconds * LIGHT_KM_PER_S, label: t(`ladder.light.${unit}`) }));

  const about = t('ladder.about');
  const lightTime = (item: Item) => formatLightTime(item.distanceKm, language, about);
  const tabId = focusId ?? order[0]?.item.id;
  const target = order.find((point) => point.item.id === pulse?.id);
  const preview = order.find((point) => point.item.id === previewId);
  // Anchor the tooltip's near edge in the outer thirds so it never leaves the strip.
  const tipSide = !preview ? '' : preview.x < width / 3 ? 'start' : preview.x > (width * 2) / 3 ? 'end' : 'middle';

  const move = (id: string) => {
    setFocusId(id);
    points.current.get(id)?.focus();
  };

  const onPointKey = (event: KeyboardEvent, index: number) => {
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
    if (next !== undefined) {
      event.preventDefault();
      move(order[next]!.item.id);
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSend(order[index]!.item.id);
    }
  };

  return (
    <div className="ladder">
      <p>{t('ladder.note')}</p>
      <fieldset className="ladder-toggle">
        <legend className="visually-hidden">{t('ladder.view')}</legend>
        {VIEWS.map((option) => (
          <label key={option}>
            <input
              className="visually-hidden"
              type="radio"
              name="ladder-view"
              checked={view === option}
              onChange={() => setView(option)}
            />
            {t(`ladder.view.${option}`)}
          </label>
        ))}
      </fieldset>
      <div className="ladder-chart" ref={box}>
        <svg width={width} height={height} role="group" aria-labelledby="where-heading" aria-describedby="ladder-keys">
          {ticks.map(({ km, label }, index) => {
            const x = xOf(km);
            const labelWidth = label.length * CHAR;
            const y = width < 560 && view === 'light' && index % 2 === 1 ? 36 : 16;
            return (
              <g key={label}>
                <line className="ladder-grid" x1={x} x2={x} y1={y + 8} y2={height} />
                <text className="ladder-axis" x={clamp(x - labelWidth / 2, 0, width - labelWidth)} y={y}>
                  {label}
                </text>
              </g>
            );
          })}
          {lanes.map((lane) => {
            const labelWidth = lane.label.length * CHAR;
            return (
              <g key={lane.first.id}>
                <line className="ladder-rung" x1={0} x2={width} y1={lane.rung} y2={lane.rung} />
                <text className="ladder-label" x={clamp(lane.centre - labelWidth / 2, 0, Math.max(0, width - labelWidth))} y={lane.rung - 24}>
                  {lane.label}
                </text>
                {lane.points.map(({ item }) => (
                  <line key={item.id} className="ladder-tick" x1={xOf(item.distanceKm)} x2={xOf(item.distanceKm)} y1={lane.rung - 12} y2={lane.rung + 12} />
                ))}
              </g>
            );
          })}
          {target && (
            <g key={pulse!.n} className="ladder-pulse" aria-hidden="true" style={{ '--to': `${target.x - DOT}px` } as CSSProperties}>
              <line className="ladder-beam" x1={0} x2={target.x - DOT} y1={target.y} y2={target.y} pathLength={1} />
              <circle className="ladder-photon" cx={0} cy={target.y} r={4} />
            </g>
          )}
          {order.map(({ item, x: destX, y }, index) => {
            const name = getItemName(item.id, language);
            const stamped = stamps.includes(item.id);
            const { travelling, f } = stateOf(item);
            const x = travelling ? PAD + (destX - PAD) * f : destX;
            return (
              <g
                key={item.id}
                ref={(element) => {
                  if (element) points.current.set(item.id, element);
                  else points.current.delete(item.id);
                }}
                className="ladder-point"
                data-stamped={stamped}
                role="button"
                tabIndex={item.id === tabId ? 0 : -1}
                data-travelling={travelling}
                aria-label={t('ladder.point', {
                  name: travelling ? `${name} (${t('ladder.onTheWay')})` : name,
                  stamp: t(stamped ? 'passport.stamped' : 'passport.open'),
                  distance: formatDistance(item.distanceKm, language),
                  time: lightTime(item),
                })}
                data-id={item.id}
                data-selected={item.id === machineId}
                aria-current={item.id === selectedId ? 'true' : undefined}
                onClick={() => {
                  setFocusId(item.id);
                  setPreviewId(undefined); // a tap fires mouseenter too; the card replaces the tooltip
                  onSend(item.id);
                }}
                onKeyDown={(event) => onPointKey(event, index)}
                onFocus={(event) => {
                  setFocusId(item.id);
                  // Keyboard focus previews; a click already opens the card.
                  if (event.currentTarget.matches(':focus-visible')) setPreviewId(item.id);
                }}
                onBlur={() => setPreviewId(undefined)}
                onMouseEnter={() => setPreviewId(item.id)}
                onMouseLeave={() => setPreviewId(undefined)}
              >
                <circle className="ladder-hit" cx={x} cy={y} r={HIT} />
                <circle className={travelling ? 'ladder-ring' : 'ladder-dot'} cx={x} cy={y} r={DOT} />
              </g>
            );
          })}
        </svg>
        {preview && (
          <p
            className={`ladder-tip ladder-tip--${tipSide}`}
            aria-hidden="true"
            style={{ left: preview.x, top: preview.y - HIT - 8 }}
          >
            <strong>{getItemName(preview.item.id, language)}</strong>
            {formatDistance(preview.item.distanceKm, language)}
          </p>
        )}
      </div>
      <ul className="ladder-legend label" aria-hidden="true">
        <li>
          <svg width="16" height="16">
            <circle className="ladder-dot" data-stamped="true" cx="8" cy="8" r="6" />
          </svg>
          {t('ladder.legend.stamped')}
        </li>
        <li>
          <svg width="16" height="16">
            <circle className="ladder-dot" cx="8" cy="8" r="6" />
          </svg>
          {t('ladder.legend.open')}
        </li>
        <li>
          <svg width="16" height="16">
            <circle className="ladder-ring" cx="8" cy="8" r="6" />
          </svg>
          {t('ladder.onTheWay')}
        </li>
      </ul>
      <p className="ladder-sped label">{t('ladder.sped')}</p>
      <p className="visually-hidden" id="ladder-keys">
        {t('ladder.keys')}
      </p>
    </div>
  );
}
