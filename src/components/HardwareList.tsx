import type { Item } from '../content';
import { useI18n } from '../lib/i18n';

type Props = { items: Item[]; selectedId?: string };

/** Stub: a plain list of every item. Filters are the UI agent's job. */
export function HardwareList({ items, selectedId }: Props) {
  const { t } = useI18n();

  return (
    <section aria-labelledby="list-heading">
      <h2 id="list-heading">{t('list.heading')}</h2>
      <ul className="hardware-list">
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} aria-current={item.id === selectedId ? 'page' : undefined}>
              <span className="hardware-name">{item.name}</span>
              <span className="label">
                {t(`place.${item.place}`)} · {t(`status.${item.status}`)}
                {item.arizona ? ` · ${t('list.arizona')}` : ''}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
