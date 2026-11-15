import type { Item } from '../content';
import { useI18n } from '../lib/i18n';

type Props = { items: Item[]; stamps: string[] };

/** Stub: one slot per item, progress, and a line of text when complete. */
export function Passport({ items, stamps }: Props) {
  const { t } = useI18n();
  const earned = items.filter((item) => stamps.includes(item.id)).length;

  return (
    <section aria-labelledby="passport-heading">
      <h2 id="passport-heading">{t('passport.heading')}</h2>
      <p className="label">{t('passport.progress', { earned, total: items.length })}</p>
      <ul className="passport">
        {items.map((item) => {
          const stamped = stamps.includes(item.id);
          return (
            <li key={item.id} data-stamped={stamped}>
              {item.name}
              <span className="label">{t(stamped ? 'passport.stamped' : 'passport.open')}</span>
            </li>
          );
        })}
      </ul>
      {items.length > 0 && earned === items.length && <p>{t('passport.complete')}</p>}
    </section>
  );
}
