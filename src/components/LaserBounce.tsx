import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { formatDistance, LIGHT_KM_PER_S } from '../lib/format';
import { useI18n } from '../lib/i18n';

type Props = { distanceKm: number };

type Shot =
  | { phase: 'idle' }
  | { phase: 'flying'; start: number }
  | { phase: 'done'; caughtMs: number | null };

/** How long to wait after the echo before telling a reader who never pressed "Catch it!". */
const GRACE_MS = 3000;

/**
 * "Bounce a laser off the Moon": the echo returns after the real round trip,
 * 2 × distance ÷ the speed of light (about 2.56 s for the Moon). The reader tries
 * to press "Catch it!" at the right moment. Idea from the friend's explore.html demo.
 */
export function LaserBounce({ distanceKm }: Props) {
  const { language, t } = useI18n();
  const [shot, setShot] = useState<Shot>({ phase: 'idle' });
  const timer = useRef<number>();
  const fireButton = useRef<HTMLButtonElement>(null);
  const catchButton = useRef<HTMLButtonElement>(null);
  const roundTripMs = ((2 * distanceKm) / LIGHT_KM_PER_S) * 1000;

  useEffect(() => () => window.clearTimeout(timer.current), []);

  // Each button is disabled while the other is live, so hand focus across instead of dropping it.
  const live = shot.phase === 'flying';
  const started = shot.phase !== 'idle';
  useEffect(() => {
    if (!started) return;
    (live ? catchButton : fireButton).current?.focus({ preventScroll: true });
  }, [live, started]);

  const seconds = (ms: number) =>
    new Intl.NumberFormat(language === 'es' ? 'es-MX' : language, {
      style: 'unit',
      unit: 'second',
      unitDisplay: 'long',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(ms / 1000);

  const fire = () => {
    window.clearTimeout(timer.current);
    setShot({ phase: 'flying', start: performance.now() });
    timer.current = window.setTimeout(
      () => setShot({ phase: 'done', caughtMs: null }),
      roundTripMs + GRACE_MS,
    );
  };

  const caught = () => {
    if (shot.phase !== 'flying') return;
    window.clearTimeout(timer.current);
    setShot({ phase: 'done', caughtMs: performance.now() - shot.start });
  };

  let message = '';
  if (shot.phase === 'flying') message = t('laser.flying');
  if (shot.phase === 'done') {
    const real = seconds(roundTripMs);
    if (shot.caughtMs === null) message = t('laser.missed', { real });
    else {
      const gap = shot.caughtMs - roundTripMs;
      message = t(Math.abs(gap) < 50 ? 'laser.exact' : gap < 0 ? 'laser.early' : 'laser.late', {
        yours: seconds(shot.caughtMs),
        real,
        gap: seconds(Math.abs(gap)),
      });
    }
  }

  return (
    <section className="experiment" aria-labelledby="laser-heading">
      <h3 id="laser-heading">{t('laser.heading')}</h3>
      <p>{t('laser.intro', { distance: formatDistance(distanceKm, language) })}</p>
      <div className="laser-track" aria-hidden="true">
        <span className="label">{t('laser.earth')}</span>
        <span className="laser-path">
          {shot.phase === 'flying' && (
            <span
              className="laser-beam"
              style={{ '--trip': `${roundTripMs}ms` } as CSSProperties}
            />
          )}
        </span>
        <span className="label">{t('laser.moon')}</span>
      </div>
      <div className="experiment-actions">
        <button ref={fireButton} type="button" onClick={fire} disabled={shot.phase === 'flying'}>
          {t(shot.phase === 'done' ? 'laser.again' : 'laser.fire')}
        </button>
        <button ref={catchButton} type="button" onClick={caught} disabled={shot.phase !== 'flying'}>
          {t('laser.catch')}
        </button>
      </div>
      <p role="status" className="experiment-result">
        {message}
      </p>
    </section>
  );
}
