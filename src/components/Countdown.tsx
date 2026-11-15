import { useEffect, useState } from 'react';
import { getItem, VOYAGER_ONE_LIGHT_DAY_UTC } from '../content';
import { useI18n } from '../lib/i18n';

const TARGET_MS = Date.parse(VOYAGER_ONE_LIGHT_DAY_UTC);

/**
 * Counts down to Voyager 1's one light-day moment, then shows a fixed line.
 * The ticking digits are hidden from screen readers; a separate polite live
 * region has no seconds in it, so its text (and the announcement) changes once a minute.
 */
export function Countdown() {
  const { t } = useI18n();
  const [now, setNow] = useState(Date.now);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const left = TARGET_MS - now;
  const seconds = Math.max(0, Math.floor(left / 1000));
  const parts: Array<[value: number, unit: string]> = [
    [Math.floor(seconds / 86_400), t('countdown.days')],
    [Math.floor(seconds / 3600) % 24, t('countdown.hours')],
    [Math.floor(seconds / 60) % 60, t('countdown.minutes')],
    [seconds % 60, t('countdown.seconds')],
  ];
  const spoken = parts
    .slice(0, 3)
    .map(([value, unit]) => `${value} ${unit}`)
    .join(', ');

  return (
    <section className="countdown-band" aria-labelledby="countdown-heading">
      <h2 id="countdown-heading" className="label">
        {t('countdown.heading')}
      </h2>
      {left <= 0 ? (
        <p role="status">{t('countdown.after')}</p>
      ) : (
        <>
          <p className="countdown" aria-hidden="true">
            {parts.map(([value, unit]) => (
              <span key={unit}>
                <b>{String(value).padStart(2, '0')}</b> {unit}
              </span>
            ))}
          </p>
          <p aria-hidden="true">{t('countdown.before')}</p>
          <p className="visually-hidden" role="status" aria-live="polite">
            {spoken} {t('countdown.before')}
          </p>
        </>
      )}
      {getItem('voyager-1') && <a href="#voyager-1">{t('countdown.link')}</a>}
    </section>
  );
}
