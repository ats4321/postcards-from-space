import type { Item } from '../content';
import { formatDistance } from '../lib/format';
import { useI18n } from '../lib/i18n';

type Props = { items: Item[]; selectedId?: string };

/** The strip starts at 100,000 km from Earth, closer than anything in the list. */
const MIN_LOG_KM = 5;

/** Stub: items placed on a log scale by distanceKm; each point links to its postcard. */
export function DistanceLadder({ items, selectedId }: Props) {
  const { language, t } = useI18n();
  const sorted = [...items].sort((a, b) => a.distanceKm - b.distanceKm);
  const maxLogKm = Math.max(MIN_LOG_KM + 1, ...sorted.map((item) => Math.log10(item.distanceKm)));

  return (
    <section aria-labelledby="ladder-heading">
      <h2 id="ladder-heading">{t('ladder.heading')}</h2>
      <p className="label">{t('ladder.note')}</p>
      <ol className="ladder">
        {sorted.map((item) => {
          const position = (Math.log10(item.distanceKm) - MIN_LOG_KM) / (maxLogKm - MIN_LOG_KM);
          return (
            <li key={item.id} style={{ marginInlineStart: `${Math.round(position * 60)}%` }}>
              <a href={`#${item.id}`} aria-current={item.id === selectedId ? 'page' : undefined}>
                {item.name}
              </a>
              <span className="label">{formatDistance(item.distanceKm, language)}</span>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
