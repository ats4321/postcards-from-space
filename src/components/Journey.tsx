import { useEffect, useMemo, useRef, useState } from 'react';
import { DEFAULT_LANGUAGE, getImage, getImageAlt, getItemText, items, type Item } from '../content';
import { formatDate, formatDistance, formatLightTime, formatTimelineDate } from '../lib/format';
import { useI18n } from '../lib/i18n';
import {
  clockDuration,
  daysBetween,
  formatDuration,
  getMilestones,
  timeAt,
  toDuration,
  type Duration,
  type Milestone,
} from '../lib/journey';
import { useStoredState } from '../lib/useStoredState';
import { ItemImage } from './ItemImage';
import { JourneyScene } from './JourneyScene';
import { ReadAloud } from './ReadAloud';
import { useMediaQuery } from './useMediaQuery';
import { ArrowLeft, Pause, Play } from 'lucide-react';
import { Icon } from './Icon';

const UNITS: Duration['unit'][] = ['day', 'month', 'year'];
const YEAR_DAYS = 365.25;

/** Travel with one machine from launch to today, on real dates. Route: #journey-<id>. */
export function Journey({ item }: { item: Item }) {
  const { language, t } = useI18n();
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const title = useRef<HTMLHeadingElement>(null);
  const text = getItemText(item.id, language)!;
  const english = getItemText(item.id, DEFAULT_LANGUAGE)!;
  const hero = getImage(item.imageId);
  const nowImage = getImage(`${item.imageId}-now`);

  // Today's local calendar date as UTC midnight, so it formats like every other date here.
  const [todayMs] = useState(() => {
    const now = new Date();
    return Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  });
  const milestones = useMemo(() => getMilestones(item, text, todayMs), [item, text, todayMs]);
  const last = milestones.length - 1;
  const [value, setValue] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [played, setPlayed] = useState(false);
  const [guess, setGuess] = useState<number | 'skip'>();
  const [chapter, setChapter] = useState(0);

  const [taken, setTaken] = useStoredState<string[]>('pfs.journeys', []);
  const journeys = Array.isArray(taken) ? taken : [];
  useEffect(() => {
    if (!journeys.includes(item.id)) setTaken([...journeys, item.id]);
    title.current?.focus();
    window.scrollTo(0, 0);
    // Count this journey once, when it opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.id]);

  // Play: one milestone gap every two seconds at 1x.
  useEffect(() => {
    if (!playing) return;
    let frame = 0;
    let previous = performance.now();
    const step = (now: number) => {
      const dt = (now - previous) / 1000;
      previous = now;
      setValue((v) => {
        const next = Math.min(last, v + dt * 0.5 * speed);
        if (next >= last) setPlaying(false);
        return next;
      });
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [playing, speed, last]);

  const jump = (to: number) => {
    setPlaying(false);
    setValue(Math.max(0, Math.min(last, to)));
  };

  const play = () => {
    setPlayed(true);
    if (playing) return setPlaying(false);
    // Reduced motion: no travel animation, just step to the next milestone.
    if (reduceMotion) return jump(value >= last ? 0 : Math.floor(value) + 1);
    if (value >= last) setValue(0);
    setPlaying(true);
  };

  const time = timeAt(milestones, value);
  const launchMs = milestones[0]!.ms;
  const arrivalMs = milestones.find((m) => m.kind === 'arrival')?.ms;
  const deep = item.place === 'Deep space';
  const travelling = deep ? value < last : arrivalMs !== undefined && time < arrivalMs;
  const at = milestones[Math.floor(value)]!;

  // Mission clock.
  const days = daysBetween(launchMs, time);
  const rows = milestones.filter((m) => m.kind === 'row');
  const endMs =
    milestones.find((m) => m.kind === 'lastContact')?.ms ??
    (item.status !== 'working' && rows.length && arrivalMs && rows[rows.length - 1]!.ms > arrivalMs
      ? rows[rows.length - 1]!.ms
      : undefined);
  const yearsAfterEnd = endMs !== undefined && time > endMs ? Math.floor((time - endMs) / 86_400_000 / YEAR_DAYS) : 0;
  const clock =
    yearsAfterEnd >= 1
      ? t('journey.later', {
          time: formatDuration({ n: yearsAfterEnd, unit: 'year' }, language),
        })
      : days === 0
        ? t('journey.launchDay')
        : days < 60
          ? t('journey.day', { n: days })
          : formatDuration(clockDuration(days), language);

  // From Earth and radio time: only real numbers from the data, never an interpolated distance.
  const tag = /average/i.test(english.distanceNote)
    ? 'average'
    : /Horizons/.test(english.distanceNote)
      ? 'today'
      : 'about';

  // Photo: the hero picture until arrival (or the last dated milestone), then the "now" picture if there is one.
  const switchMs = arrivalMs ?? milestones[last - 1]!.ms;
  const showNow = !!nowImage && time >= switchMs;
  const photo = showNow ? nowImage : hero;

  // Prediction.
  const tripDays = daysBetween(launchMs, arrivalMs ?? todayMs);
  const answer = toDuration(tripDays);
  const target =
    item.place === 'Asteroids'
      ? (text.locationName.match(/\b(Ceres|Eros)\b/)?.[1] ?? text.locationName)
      : t(`journey.to.${item.place}`);
  const showPrediction = guess === undefined && !played;

  // Chapters: launch, arrival (or the first trip-log row), today.
  const middle = Math.max(
    1,
    milestones.findIndex((m) => m.kind === 'arrival') >= 0
      ? milestones.findIndex((m) => m.kind === 'arrival')
      : milestones.findIndex((m) => m.kind === 'row'),
  );
  const chapterAt = [0, Math.min(middle, last), last];
  const letterLanguage = text.letter === english.letter ? DEFAULT_LANGUAGE : language;

  const chipLabel = (m: Milestone) =>
    m.kind === 'row' ? formatTimelineDate(m.date, language) : t(`journey.chip.${m.kind}`);

  const nextChapter = () => {
    const next = chapter + 1;
    setChapter(next);
    jump(chapterAt[Math.min(next, 2)]!);
  };

  return (
    <article className="journey" aria-labelledby="journey-title">
      <header className="journey-head">
        <a href={`#${item.id}`} className="journey-back">
          <Icon as={ArrowLeft} />
          {t('journey.back')}
        </a>
        <p className="label">{t(item.place === 'Moon' ? 'journey.eyebrowMoon' : 'journey.eyebrow')}</p>
        <h2 id="journey-title" ref={title} tabIndex={-1}>
          {text.name}
        </h2>
        <p>{text.locationName}</p>
        <p className="label journey-count">{t('journey.count', { n: journeys.length, total: items.length })}</p>
      </header>

      {showPrediction && (
        <section className="journey-predict" aria-labelledby="predict-heading">
          <h3 id="predict-heading">
            {item.arrivalDate ? t('journey.predict', { place: target }) : t('journey.predictTravel')}
          </h3>
          <div className="journey-options">
            {UNITS.map((unit, index) => (
              <button key={unit} type="button" onClick={() => setGuess(index)}>
                {t('journey.aboutTime', {
                  time: formatDuration({ n: answer.n, unit }, language),
                })}
              </button>
            ))}
            <button type="button" className="link-button" onClick={() => setGuess('skip')}>
              {t('journey.skip')}
            </button>
          </div>
        </section>
      )}
      {typeof guess === 'number' && (
        <p className="journey-result" role="status">
          {t(UNITS[guess] === answer.unit ? 'journey.right' : 'journey.notQuite')}{' '}
          {t(item.arrivalDate ? 'journey.answer' : 'journey.answerTravel', {
            time: formatDuration({ n: tripDays, unit: 'day' }, language),
            about: formatDuration(answer, language),
          })}
        </p>
      )}

      <figure className="journey-stage">
        <JourneyScene item={item} text={text} englishText={english} time={time} todayMs={todayMs} photo={hero?.file} />
        <figcaption className="label">
          {item.place === 'Moon'
            ? /384,400/.test(english.distanceNote) && t('journey.moonCaption')
            : t('journey.caption')}
        </figcaption>
      </figure>

      <div className="journey-controls">
        <button type="button" className="journey-play" aria-pressed={playing} onClick={play}>
          <Icon as={playing ? Pause : Play} />
          {t(playing ? 'journey.pause' : 'journey.play')}
        </button>
        <label className="journey-range">
          <span className="visually-hidden">{t('journey.scrub')}</span>
          <input
            type="range"
            min={0}
            max={last * 100}
            value={Math.round(value * 100)}
            aria-valuetext={formatDate(new Date(time).toISOString().slice(0, 10), language)}
            onChange={(event) => jump(Number(event.target.value) / 100)}
          />
        </label>
        <label className="journey-speed">
          <span className="label">{t('journey.speed')}</span>
          <select value={speed} onChange={(event) => setSpeed(Number(event.target.value))}>
            <option value={1}>1x</option>
            <option value={4}>4x</option>
          </select>
        </label>
      </div>

      <ol className="journey-chips">
        {milestones.map((m, index) => (
          <li key={`${m.kind}-${m.date}`}>
            <button type="button" aria-pressed={at === m && value - index < 0.01} onClick={() => jump(index)}>
              {chipLabel(m)}
            </button>
          </li>
        ))}
      </ol>
      <p className="journey-now" aria-live="polite">
        <span className="label">{formatDate(new Date(time).toISOString().slice(0, 10), language)}</span>
        {at.event ?? chipLabel(at)}
      </p>

      <dl className="journey-readouts">
        <div>
          <dt className="label">{t('journey.clock')}</dt>
          <dd data-readout="clock">{clock}</dd>
        </div>
        <div>
          <dt className="label">{t('journey.fromEarth')}</dt>
          <dd data-readout="distance">
            {travelling ? (
              t('journey.onTheWay')
            ) : (
              <>
                {formatDistance(item.distanceKm, language)} <span className="label">{t(`journey.tag.${tag}`)}</span>
              </>
            )}
          </dd>
        </div>
        <div>
          <dt className="label">{t('journey.radio')}</dt>
          <dd data-readout="radio">
            {travelling ? t('journey.depends') : formatLightTime(item.distanceKm, language, t('ladder.about'))}
          </dd>
        </div>
      </dl>

      <figure className="journey-photo">
        <figcaption>
          <h3>{t(showNow ? 'postcard.today' : 'journey.before')}</h3>
        </figcaption>
        <ItemImage
          className="hero"
          image={photo}
          fallback={showNow ? undefined : `/img/illustrations/${item.illustration}.svg`}
          alt={photo ? getImageAlt(photo.id, language) : text.name}
        />
        {photo && (
          <p className="label">
            {t('postcard.credit')}: {photo.credit}
          </p>
        )}
      </figure>

      <section className="journey-chapters" aria-labelledby="chapter-heading">
        {chapter < 3 ? (
          <>
            <h3 id="chapter-heading">
              {t('journey.chapter', { n: chapter + 1 })}
              <span className="label">{chipLabel(milestones[chapterAt[chapter]!]!)}</span>
            </h3>
            <p lang={letterLanguage}>{text.letter[chapter]}</p>
            <div className="postcard-actions">
              <ReadAloud text={text.letter[chapter]!} lang={letterLanguage === 'es' ? 'es-US' : 'en-US'} />
              <button type="button" onClick={nextChapter}>
                {t('journey.next')}
              </button>
            </div>
          </>
        ) : (
          <>
            <h3 id="chapter-heading">{t('journey.end')}</h3>
            {item.arrivalDate && (
              <p className="journey-took">
                {t('journey.took', {
                  time: formatDuration(toDuration(tripDays), language),
                  launch: formatDate(item.launchDate, language),
                  arrival: formatDate(item.arrivalDate, language),
                })}
              </p>
            )}
            <h4>{t('postcard.science')}</h4>
            <ul className="science">
              {text.science.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
            <p className="sign-off" lang={letterLanguage}>
              {text.signOff}
            </p>
            <div className="postcard-actions">
              <ReadAloud text={text.signOff} lang={letterLanguage === 'es' ? 'es-US' : 'en-US'} />
              <button type="button" onClick={() => (setChapter(0), jump(0))}>
                {t('journey.again')}
              </button>
            </div>
          </>
        )}
      </section>
    </article>
  );
}
