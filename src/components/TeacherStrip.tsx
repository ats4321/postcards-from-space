import { getImage, type Item } from '../content';
import { useI18n } from '../lib/i18n';

/** Footer for adults: what the app teaches, every source, every image credit. */
export function TeacherStrip({ items }: { items: Item[] }) {
  const { t } = useI18n();

  return (
    <footer className="teacher">
      <h2>{t('teacher.heading')}</h2>
      <p>{t('teacher.line')}</p>

      <details>
        <summary>{t('teacher.sources')}</summary>
        {items.map((item) => (
          <section key={item.id}>
            <h3>{item.name}</h3>
            <ul>
              {item.sources.map((source) => (
                <li key={source.url}>
                  <a href={source.url} target="_blank" rel="noreferrer">
                    {source.title}
                  </a>
                  <span className="label">{source.supports}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </details>

      <details>
        <summary>{t('teacher.credits')}</summary>
        <ul>
          {items.flatMap((item) =>
            [getImage(item.imageId), getImage(`${item.imageId}-now`)].map(
              (image) =>
                image && (
                  <li key={image.id}>
                    <strong>{item.name}</strong>: {image.credit}.{' '}
                    {image.sourceUrl && (
                      <a href={image.sourceUrl} target="_blank" rel="noreferrer">
                        {t('teacher.source')}
                        <span className="visually-hidden">: {image.id}</span>
                      </a>
                    )}
                    <span className="label">{image.license}</span>
                  </li>
                ),
            ),
          )}
        </ul>
      </details>
    </footer>
  );
}
