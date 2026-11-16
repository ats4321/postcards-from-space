import type { Item, ItemText } from '../content';
import { asteroidName, deepSpaceAnchors, type Planet } from '../lib/journey';
import { useI18n } from '../lib/i18n';

type Props = {
  item: Item;
  text: ItemText;
  englishText: ItemText;
  /** The moment being shown, in ms. */
  time: number;
  todayMs: number;
  photo?: string;
};

const BUBBLE = 14;
// ponytail: schematic radii, not to scale (the caption says so).
const PLANET_R: Record<Planet, number> = {
  Jupiter: 62,
  Saturn: 88,
  Uranus: 112,
  Neptune: 136,
};
const EARTH_R = 24;
const INTERSTELLAR_R = 160;
const MAX_R = 182;
const spiralAngle = (r: number) => Math.PI + (r - EARTH_R) / 32;

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

/** Piecewise-linear radius through (time, radius) anchors. */
function radiusAt(anchors: Array<[number, number]>, time: number) {
  if (time <= anchors[0]![0]) return anchors[0]![1];
  for (let i = 1; i < anchors.length; i++) {
    const [t0, r0] = anchors[i - 1]!;
    const [t1, r1] = anchors[i]!;
    if (time <= t1) return r0 + (r1 - r0) * clamp01((time - t0) / (t1 - t0 || 1));
  }
  return anchors[anchors.length - 1]![1];
}

function Bubble({ id, x, y, photo }: { id: string; x: number; y: number; photo?: string }) {
  return (
    <g transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`} className="journey-bubble">
      <clipPath id={`bubble-${id}`}>
        <circle r={BUBBLE} />
      </clipPath>
      <circle r={BUBBLE + 2} fill="var(--color-stamp)" />
      {photo ? (
        <image
          href={photo}
          x={-BUBBLE}
          y={-BUBBLE}
          width={BUBBLE * 2}
          height={BUBBLE * 2}
          preserveAspectRatio="xMidYMid slice"
          clipPath={`url(#bubble-${id})`}
        />
      ) : (
        <circle r={BUBBLE - 2} fill="var(--color-earth)" />
      )}
      <circle r={BUBBLE + 2} fill="none" stroke="var(--color-red)" strokeWidth="2" strokeDasharray="2 2" />
    </g>
  );
}

/** The simplified path drawing for one item, chosen by place. Decorative; the readouts carry the facts. */
export function JourneyScene({ item, text, englishText, time, todayMs, photo }: Props) {
  const { t } = useI18n();
  const launch = Date.parse(`${item.launchDate}T00:00:00Z`);
  const label = {
    fill: 'var(--color-paper)',
    fontSize: 11,
    fontFamily: 'var(--font-data)',
  } as const;

  if (item.place === 'Moon') {
    const arrival = item.arrivalDate ? Date.parse(`${item.arrivalDate}T00:00:00Z`) : launch;
    const p = clamp01((time - launch) / (arrival - launch || 1));
    // Quadratic arc from Earth (60,130) over (200,30) to the Moon (340,130).
    const x = (1 - p) ** 2 * 60 + 2 * (1 - p) * p * 200 + p ** 2 * 340;
    const y = (1 - p) ** 2 * 130 + 2 * (1 - p) * p * 30 + p ** 2 * 130;
    return (
      <svg className="journey-scene" viewBox="0 0 400 200" aria-hidden="true">
        <path
          d="M60 130 Q200 30 340 130"
          fill="none"
          stroke="var(--color-paper)"
          strokeWidth="2"
          strokeDasharray="2 6"
          strokeLinecap="round"
        />
        <circle cx="60" cy="130" r="28" fill="var(--color-earth)" />
        <text x="60" y="180" textAnchor="middle" {...label}>
          {t('journey.earth')}
        </text>
        <circle cx="340" cy="130" r="14" fill="var(--color-paper)" />
        <text x="340" y="180" textAnchor="middle" {...label}>
          {t('journey.moon')}
        </text>
        <Bubble id={item.id} x={x} y={y} photo={photo} />
      </svg>
    );
  }

  if (item.place === 'Mars' || item.place === 'Asteroids') {
    const arrival = item.arrivalDate ? Date.parse(`${item.arrivalDate}T00:00:00Z`) : launch;
    const p = clamp01((time - launch) / (arrival - launch || 1));
    const [cx, cy, r1, r2] = [200, 135, 56, 112];
    const a = (r1 + r2) / 2;
    const b = Math.sqrt(r1 * r2);
    const ex = cx + (r2 - r1) / 2;
    const theta = Math.PI + Math.PI * p; // left (Earth) over the top to the right (target)
    const target = item.place === 'Mars' ? t('journey.mars') : (asteroidName(text.locationName) ?? text.locationName);
    return (
      <svg className="journey-scene" viewBox="0 0 400 270" aria-hidden="true">
        <circle cx={cx} cy={cy} r={r1} fill="none" stroke="var(--color-earth)" strokeDasharray="4 4" />
        <circle cx={cx} cy={cy} r={r2} fill="none" stroke="var(--color-earth)" strokeDasharray="4 4" />
        <path
          d={`M${cx - r1} ${cy} A${a} ${b.toFixed(1)} 0 0 1 ${cx + r2} ${cy}`}
          fill="none"
          stroke="var(--color-paper)"
          strokeWidth="2"
          strokeDasharray="2 6"
          strokeLinecap="round"
        />
        <circle cx={cx} cy={cy} r="12" fill="var(--color-yellow)" />
        <text x={cx} y={cy + 28} textAnchor="middle" {...label}>
          {t('journey.sun')}
        </text>
        <circle cx={cx - r1} cy={cy} r="6" fill="var(--color-earth)" />
        <text x={cx - r1} y={cy + 22} textAnchor="middle" {...label}>
          {t('journey.earth')}
        </text>
        <circle cx={cx + r2} cy={cy} r="6" fill={item.place === 'Mars' ? 'var(--color-red)' : 'var(--color-paper)'} />
        <text x={cx + r2 - 10} y={cy + 24} textAnchor="end" {...label}>
          {target}
        </text>
        <Bubble id={item.id} x={ex + a * Math.cos(theta)} y={cy + b * Math.sin(theta)} photo={photo} />
      </svg>
    );
  }

  // Deep space: a spiral outward, pinned to each planet ring on the trip-log date that names it.
  const { planets, interstellarMs } = deepSpaceAnchors(englishText);
  const anchors: Array<[number, number]> = [
    [launch, EARTH_R],
    ...planets.map(({ planet, ms }): [number, number] => [ms, PLANET_R[planet]]),
    ...(interstellarMs ? [[interstellarMs, INTERSTELLAR_R] as [number, number]] : []),
    [todayMs, MAX_R],
  ];
  const r = radiusAt(anchors, time);
  const points: string[] = [];
  for (let s = EARTH_R; s <= MAX_R; s += 2) {
    points.push(`${(s * Math.cos(spiralAngle(s))).toFixed(1)},${(s * Math.sin(spiralAngle(s))).toFixed(1)}`);
  }
  return (
    <svg className="journey-scene" viewBox="-200 -200 400 400" aria-hidden="true">
      <circle r={EARTH_R} fill="none" stroke="var(--color-earth)" strokeDasharray="4 4" />
      {planets.map(({ planet }) => (
        <g key={planet}>
          <circle r={PLANET_R[planet]} fill="none" stroke="var(--color-earth)" strokeDasharray="4 4" />
          <text x="0" y={-PLANET_R[planet] - 4} textAnchor="middle" {...label}>
            {t(`journey.planet.${planet}`)}
          </text>
        </g>
      ))}
      {interstellarMs && (
        <text x="-110" y="160" textAnchor="middle" {...label}>
          {t('journey.interstellar')}
        </text>
      )}
      <polyline
        points={points.join(' ')}
        fill="none"
        stroke="var(--color-paper)"
        strokeWidth="2"
        strokeDasharray="2 6"
        strokeLinecap="round"
      />
      <circle r="9" fill="var(--color-yellow)" />
      <circle cx={EARTH_R * Math.cos(Math.PI)} cy="0" r="4" fill="var(--color-earth)" />
      <text x={-EARTH_R} y="16" textAnchor="middle" {...label}>
        {t('journey.earth')}
      </text>
      <Bubble id={item.id} x={r * Math.cos(spiralAngle(r))} y={r * Math.sin(spiralAngle(r))} photo={photo} />
    </svg>
  );
}
