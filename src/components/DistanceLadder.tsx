import { useLayoutEffect, useRef, useState } from 'react';
import { getItemName, getItemText, type Item } from '../content';
import { formatDistance } from '../lib/format';
import { useI18n } from '../lib/i18n';

type Props = { items: Item[]; selectedId?: string };

/** The scale runs from 100,000 km (closer than the Moon) to 30 billion km (past Voyager 1). */
const MIN_LOG = 5;
const MAX_LOG = Math.log10(3e10);

// Geometry in px, on the 8 px grid.
const PAD = 16; // room for a dot at either end
const TOP = 32; // axis labels
const LANE = 56; // one rung: 16 label + 24 dots + 16 gap
const PITCH = 24; // between dots that share a rung (also the minimum touch spacing)
const CHAR = 7.2; // IBM Plex Mono advance at 12 px, used to keep labels inside the strip

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

/**
 * Log-scale strip. Each rung is one group: the Moon, Mars, the asteroids, and one
 * rung per deep-space probe. Giving every group its own rung is what keeps labels
 * from ever overlapping, at any width. A tick marks each true distance; hardware
 * sharing a rung sits side by side around the tick.
 */
export function DistanceLadder({ items, selectedId }: Props) {
  const { language, t } = useI18n();
  const box = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(328);
  const [hovered, setHovered] = useState<string>();

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
  const lanes = [...groups.values()];
  const height = TOP + lanes.length * LANE;

  const compact = new Intl.NumberFormat(language, { notation: 'compact' });
  const decades = [5, 6, 7, 8, 9, 10].filter((_, index) => width >= 560 || index % 2 === 0);

  const active = items.find((item) => item.id === (hovered ?? selectedId));

  return (
    <section className="ladder panel" aria-labelledby="ladder-heading">
      <h2 id="ladder-heading">{t('ladder.heading')}</h2>
      <p>{t('ladder.note')}</p>
      <div ref={box}>
        <svg width={width} height={height} role="group" aria-labelledby="ladder-heading">
          {decades.map((power) => (
            <g key={power}>
              <line className="ladder-grid" x1={xOf(10 ** power)} x2={xOf(10 ** power)} y1={24} y2={height} />
              <text className="ladder-axis" x={xOf(10 ** power)} y={16} textAnchor={power === 5 ? 'start' : 'middle'} dx={power === 5 ? -PAD : 0}>
                {compact.format(10 ** power)} km
              </text>
            </g>
          ))}
          {lanes.map((lane, index) => {
            const first = lane[0]!;
            const label = first.place === 'Deep space' ? getItemName(first.id, language) : t(`place.${first.place}`);
            const rung = TOP + index * LANE + 36;
            const centre = lane.reduce((sum, item) => sum + xOf(item.distanceKm), 0) / lane.length;
            const span = (lane.length - 1) * PITCH;
            const start = clamp(centre - span / 2, PAD, Math.max(PAD, width - PAD - span));
            const labelWidth = label.length * CHAR;
            return (
              <g key={first.id}>
                <line className="ladder-rung" x1={0} x2={width} y1={rung} y2={rung} />
                <text className="ladder-label" x={clamp(centre - labelWidth / 2, 0, Math.max(0, width - labelWidth))} y={rung - 20}>
                  {label}
                </text>
                {lane.map((item) => (
                  <line key={item.id} className="ladder-tick" x1={xOf(item.distanceKm)} x2={xOf(item.distanceKm)} y1={rung - 12} y2={rung + 12} />
                ))}
                {lane.map((item, position) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    aria-label={`${getItemName(item.id, language)}: ${formatDistance(item.distanceKm, language)}`}
                    aria-current={item.id === selectedId ? 'page' : undefined}
                    onMouseEnter={() => setHovered(item.id)}
                    onMouseLeave={() => setHovered(undefined)}
                    onFocus={() => setHovered(item.id)}
                    onBlur={() => setHovered(undefined)}
                  >
                    <circle className="ladder-hit" cx={start + position * PITCH} cy={rung} r={12} />
                    <circle className="ladder-dot" cx={start + position * PITCH} cy={rung} r={8} />
                  </a>
                ))}
              </g>
            );
          })}
        </svg>
      </div>
      <p className="label ladder-note">
        {active ? (
          <>
            <strong>
              {getItemName(active.id, language)}: {formatDistance(active.distanceKm, language)}.
            </strong>{' '}
            {getItemText(active.id, language)?.distanceNote}
          </>
        ) : (
          t('ladder.pick')
        )}
      </p>
    </section>
  );
}
