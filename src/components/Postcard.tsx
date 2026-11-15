import { useEffect, useRef } from 'react';
import { DEFAULT_LANGUAGE, getImage, getItemText, type Item } from '../content';
import { formatDate, formatDistance } from '../lib/format';
import { useI18n } from '../lib/i18n';
import { ItemImage } from './ItemImage';
import { Postmark } from './Postmark';
import { Quiz } from './Quiz';
import { ReadAloud } from './ReadAloud';
import { Stamp } from './Stamp';
import { StatusPill } from './StatusPill';

type Props = {
  item: Item;
  earned: boolean;
  onCorrect: () => void;
  onClose: () => void;
  /** Move keyboard focus to the title when the card opens (not on first page load). */
  focusOnOpen: boolean;
};

/** One postcard: letter, stamp and postmark, picture, science, where it is now, quiz. */
export function Postcard({ item, earned, onCorrect, onClose, focusOnOpen }: Props) {
  const { language, t } = useI18n();
  const title = useRef<HTMLHeadingElement>(null);
  const text = getItemText(item.id, language);
  const image = getImage(item.imageId);
  // Convention for the optional "now" picture: an images.json entry with id "<imageId>-now".
  const nowImage = getImage(`${item.imageId}-now`);

  useEffect(() => {
    if (focusOnOpen) title.current?.focus();
    else if (window.location.hash) title.current?.scrollIntoView({ block: 'start' });
  }, [focusOnOpen]);

  if (!text) return null;

  // A letter that fell back to English is marked and read aloud as English.
  const letterLanguage =
    text.letter === getItemText(item.id, DEFAULT_LANGUAGE)?.letter ? DEFAULT_LANGUAGE : language;
  const postmarkDate = new Intl.DateTimeFormat(language, {
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${item.launchDate}T00:00:00Z`));

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
      <div className="postcard-inner">
        <header className="postcard-head">
          <div>
            <p className="label">
              {t(`place.${item.place}`)} · {item.locationName}
            </p>
            <h2 id="postcard-title" ref={title} tabIndex={-1}>
              {item.name}
            </h2>
            <StatusPill status={item.status} />
            <div className="postcard-actions">
              <ReadAloud
                text={[...text.letter, text.signOff].join(' ')}
                lang={letterLanguage === 'es' ? 'es-US' : 'en-US'}
              />
              <button type="button" onClick={onClose}>
                {t('postcard.close')}
              </button>
            </div>
          </div>
          <div className="postage">
            <Postmark
              top={t(`place.${item.place}`)}
              date={postmarkDate}
              year={item.launchDate.slice(0, 4)}
            />
            <Stamp item={item} size="card" />
          </div>
        </header>

        <div className="postcard-body">
          <div className="letter" lang={letterLanguage}>
            {text.letter.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
            <p className="sign-off">{text.signOff}</p>
          </div>
          <div className="postcard-facts">
            <dl className="facts">
              {facts.map(([label, value]) => (
                <div key={label}>
                  <dt className="label">{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <p className="label">{item.distanceNote}</p>
          </div>
        </div>

        <figure>
          <ItemImage
            className="hero"
            image={image}
            fallback={`/img/illustrations/${item.illustration}.svg`}
            alt={image?.alt ?? item.name}
          />
          {image && (
            <figcaption className="label">
              {t('postcard.credit')}: {image.credit}
            </figcaption>
          )}
        </figure>

        <section>
          <h3>{t('postcard.science')}</h3>
          <ul className="science">
            {text.science.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </section>

        <section>
          <h3>{t('postcard.today')}</h3>
          <p>{text.today}</p>
          {nowImage && (
            <figure>
              <ItemImage className="hero" image={nowImage} alt={nowImage.alt} lazy />
              <figcaption className="label">
                {t('postcard.credit')}: {nowImage.credit}
              </figcaption>
            </figure>
          )}
          <p>
            <a href={item.officialUrl} target="_blank" rel="noreferrer">
              {t('postcard.official')}
              <span className="visually-hidden"> {t('postcard.newTab')}</span>
            </a>
          </p>
        </section>

        {text.arizonaNote && (
          <section className="arizona">
            <h3>
              <span className="arizona-badge">{t('postcard.arizona')}</span>
            </h3>
            <p>{text.arizonaNote}</p>
          </section>
        )}

        {text.worldNote && (
          <section>
            <h3>{t('postcard.world')}</h3>
            <p>{text.worldNote}</p>
          </section>
        )}

        <Quiz item={item} quiz={text.quiz} earned={earned} onCorrect={onCorrect} />
      </div>
    </article>
  );
}
