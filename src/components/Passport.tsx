import { getItemName, type Item } from '../content';
import { useI18n } from '../lib/i18n';
import { Stamp } from './Stamp';

type Props = { items: Item[]; stamps: string[]; justEarned?: string };

/** One slot per item, a progress bar, and a badge once every stamp is collected. */
export function Passport({ items, stamps, justEarned }: Props) {
  const { language, t } = useI18n();
  const earned = items.filter((item) => stamps.includes(item.id)).length;
  const complete = items.length > 0 && earned === items.length;

  return (
    <section className="passport panel" aria-labelledby="passport-heading">
      <div className="passport-head">
        <h2 id="passport-heading" tabIndex={-1}>
          {t('passport.heading')}
        </h2>
        <p className="label" id="passport-progress">
          {t('passport.progress', { earned, total: items.length })}
        </p>
        <progress value={earned} max={items.length || 1} aria-labelledby="passport-progress" />
      </div>
      {/* Always in the page so screen readers announce the badge when it appears. */}
      <div role="status">
        {complete && (
          <p className="passport-badge">
            <svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true">
              <circle cx="32" cy="32" r="29" />
              <circle cx="32" cy="32" r="23" />
              <path d="M21 33l8 8 14-17" />
            </svg>
            <span>
              <strong>{t('passport.badge')}</strong>
              {t('passport.complete')}
            </span>
          </p>
        )}
      </div>
      <ul className="passport-slots">
        {items.map((item) => {
          const stamped = stamps.includes(item.id);
          return (
            <li key={item.id}>
              <a href={`#${item.id}`} data-stamped={stamped}>
                {stamped ? (
                  <Stamp item={item} cancelled className={item.id === justEarned ? 'stamp-land' : ''} />
                ) : (
                  <span className="slot-empty" aria-hidden="true" />
                )}
                <span className="slot-name">{getItemName(item.id, language)}</span>
                <span className="visually-hidden">
                  : {t(stamped ? 'passport.stamped' : 'passport.open')}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
