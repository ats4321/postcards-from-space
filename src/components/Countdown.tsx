import { useEffect, useState } from 'react';
import { VOYAGER_ONE_LIGHT_DAY_UTC } from '../content';
import { useI18n } from '../lib/i18n';

const TARGET_MS = Date.parse(VOYAGER_ONE_LIGHT_DAY_UTC);

/** Stub: counts down to Voyager 1's one light-day moment, then shows a fixed line. */
export function Countdown() {
  const { t } = useI18n();
  const [now, setNow] = useState(Date.now);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const seconds = Math.floor((TARGET_MS - now) / 1000);
  const parts: Array<[value: number, unit: string]> = [
    [Math.floor(seconds / 86_400), t('countdown.days')],
    [Math.floor(seconds / 3600) % 24, t('countdown.hours')],
    [Math.floor(seconds / 60) % 60, t('countdown.minutes')],
    [seconds % 60, t('countdown.seconds')],
  ];

  return (
    <section aria-labelledby="countdown-heading">
      <h2 id="countdown-heading">{t('countdown.heading')}</h2>
      {seconds <= 0 ? (
        <p>{t('countdown.after')}</p>
      ) : (
        <p>
          <span className="countdown" role="timer">
            {parts.map(([value, unit]) => `${value} ${unit}`).join(' · ')}
          </span>{' '}
          {t('countdown.before')}
        </p>
      )}
    </section>
  );
}
