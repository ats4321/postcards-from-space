import { useState, type KeyboardEvent, type MouseEvent } from 'react';
import { formatDate } from '../lib/format';
import { useI18n } from '../lib/i18n';

/** The drawing is a grid of 8 × 6 squares; one of them holds Earth. */
const COLS = 8;
const ROWS = 6;
const CELL = 50;
const EARTH = { col: 5, row: 2 };
const START = { col: 3, row: 3 };

type Spot = { col: number; row: number };

const MOVES: Record<string, [number, number]> = {
  ArrowLeft: [-1, 0],
  ArrowRight: [1, 0],
  ArrowUp: [0, -1],
  ArrowDown: [0, 1],
};

/** Which way Earth lies from a wrong guess: "up", "downLeft", … (keys under pbd.dir.*). */
function direction(from: Spot): string {
  const vertical = EARTH.row < from.row ? 'up' : EARTH.row > from.row ? 'down' : '';
  const horizontal = EARTH.col < from.col ? 'Left' : EARTH.col > from.col ? 'Right' : '';
  return vertical ? vertical + horizontal : horizontal.toLowerCase();
}

/**
 * "Find Earth": a drawn re-creation (not the photo) of Voyager 1's Pale Blue Dot.
 * Click or tap a spot, or move with the arrow keys and press Enter. A miss gives a
 * direction hint, so the game also works without seeing the picture.
 * Idea from the friend's explore.html demo.
 */
export function PaleBlueDot() {
  const { language, t } = useI18n();
  const [cursor, setCursor] = useState<Spot>(START);
  const [found, setFound] = useState(false);
  const [message, setMessage] = useState('');

  const check = (spot: Spot) => {
    if (found) return;
    setCursor(spot);
    if (spot.col === EARTH.col && spot.row === EARTH.row) {
      setFound(true);
      setMessage(t('pbd.found'));
    } else {
      setMessage(t('pbd.miss', { dir: t(`pbd.dir.${direction(spot)}`) }));
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (found) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      check(cursor);
      return;
    }
    const move = MOVES[event.key];
    if (!move) return;
    event.preventDefault();
    const next = {
      col: Math.min(COLS - 1, Math.max(0, cursor.col + move[0])),
      row: Math.min(ROWS - 1, Math.max(0, cursor.row + move[1])),
    };
    setCursor(next);
    setMessage(t('pbd.position', { col: next.col + 1, row: next.row + 1 }));
  };

  const onClick = (event: MouseEvent<HTMLDivElement>) => {
    // A keyboard "click" (detail 0) is already handled by onKeyDown.
    if (event.detail === 0) return;
    const box = event.currentTarget.getBoundingClientRect();
    const col = Math.floor(((event.clientX - box.left) / box.width) * COLS);
    const row = Math.floor(((event.clientY - box.top) / box.height) * ROWS);
    check({ col: Math.min(COLS - 1, Math.max(0, col)), row: Math.min(ROWS - 1, Math.max(0, row)) });
  };

  const dotX = EARTH.col * CELL + 31;
  const dotY = EARTH.row * CELL + 19;

  return (
    <section className="experiment" aria-labelledby="pbd-heading">
      <h3 id="pbd-heading">{t('pbd.heading')}</h3>
      <p id="pbd-help">
        {t('pbd.intro', {
          date: formatDate('1990-02-14', language),
          size: new Intl.NumberFormat(language === 'es' ? 'es-MX' : language).format(0.12),
        })}
      </p>
      {/* A custom keyboard widget: role="application" lets screen readers pass the arrow keys through. */}
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <div
        className="pbd-field"
        role="application"
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- focusable so the arrow keys work
        tabIndex={0}
        aria-label={t('pbd.field', { cols: COLS, rows: ROWS })}
        aria-describedby="pbd-help"
        data-found={found}
        onKeyDown={onKeyDown}
        onClick={onClick}
      >
        <svg viewBox={`0 0 ${COLS * CELL} ${ROWS * CELL}`} aria-hidden="true" focusable="false">
          <rect width={COLS * CELL} height={ROWS * CELL} className="pbd-sky" />
          {/* Faint bands of scattered sunlight, as in the real picture. Earth sits in one. */}
          <rect x="70" y="-40" width="34" height="400" className="pbd-band" transform="rotate(-8 87 150)" />
          <rect x="262" y="-40" width="44" height="400" className="pbd-band" transform="rotate(-8 284 150)" />
          <rect x="340" y="-40" width="18" height="400" className="pbd-band pbd-band-faint" transform="rotate(-8 349 150)" />
          <circle cx={dotX} cy={dotY} r="1.5" className="pbd-earth" />
          {found ? (
            <circle cx={dotX} cy={dotY} r="14" className="pbd-ring" />
          ) : (
            <rect
              x={cursor.col * CELL + 2}
              y={cursor.row * CELL + 2}
              width={CELL - 4}
              height={CELL - 4}
              className="pbd-cursor"
            />
          )}
        </svg>
      </div>
      <p className="label">{t('pbd.note')}</p>
      <p role="status" className="experiment-result">
        {message}
      </p>
    </section>
  );
}
