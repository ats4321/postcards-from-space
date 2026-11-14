import { getImage, getItemText, type Item } from '../content';
import { formatDate, formatDistance } from '../lib/format';
import { useI18n } from '../lib/i18n';
import { Quiz } from './Quiz';

type Props = { item: Item; earned: boolean; onCorrect: () => void };

/** Stub: every field of the data contract on screen, with minimal styling. */
export function Postcard({ item, earned, onCorrect }: Props) {
  const { language, t } = useI18n();
  const text = getItemText(item.id, language);
  const image = getImage(item.imageId);
  if (!text) return null;

  const facts: Array<[label: string, value: string]> = [
    [t('postcard.launched'), formatDate(item.launchDate, language)],
    ...(item.arrivalDate
      ? [[t('postcard.arrived'), formatDate(item.arrivalDate, language)] as [string, string]]
      : []),
    ...(item.lastContact
      ? [[t('postcard.lastContact'), formatDate(item.lastContact, language)] as [string, string]]
      : []),
    [t('postcard.distance'), formatDistance(item.distanceKm, language)],
  ];

  return (
    <article className="postcard" aria-labelledby="postcard-title">
      <header>
        <p className="label">
          {t(`place.${item.place}`)} · {item.locationName} · {t(`status.${item.status}`)}
        </p>
        <h2 id="postcard-title">{item.name}</h2>
      </header>

      {image && (
        <figure>
          <img src={image.file} alt={image.alt} width={480} height={320} />
          <figcaption className="label">
            {t('postcard.credit')}: {image.credit}
          </figcaption>
        </figure>
      )}

      <div className="letter">
        {text.letter.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <p className="sign-off">{text.signOff}</p>
      </div>

      <dl className="facts">
        {facts.map(([label, value]) => (
          <div key={label}>
            <dt className="label">{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <p className="label">{item.distanceNote}</p>

      <section>
        <h3>{t('postcard.science')}</h3>
        <ul>
          {text.science.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3>{t('postcard.today')}</h3>
        <p>{text.today}</p>
        <p>
          <a href={item.officialUrl} target="_blank" rel="noreferrer">
            {t('postcard.official')}
          </a>
        </p>
      </section>

      {text.arizonaNote && (
        <section>
          <h3>{t('postcard.arizona')}</h3>
          <p>{text.arizonaNote}</p>
        </section>
      )}

      {text.worldNote && (
        <section>
          <h3>{t('postcard.world')}</h3>
          <p>{text.worldNote}</p>
        </section>
      )}

      <Quiz quiz={text.quiz} earned={earned} onCorrect={onCorrect} />
    </article>
  );
}
