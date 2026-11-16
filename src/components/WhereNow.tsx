import { useEffect, useRef, useState } from 'react';
import { getItemName, getItemText, type Item } from '../content';
import { formatDate, formatDistance, formatLightTime, formatTimelineDate } from '../lib/format';
import { useI18n } from '../lib/i18n';
import '../styles/history.css';
import { toYear } from '../lib/journey';
import { useStoredState } from '../lib/useStoredState';
import { HistoryTimeline } from './HistoryTimeline';
import { LadderMap } from './LadderMap';
import { Stamp } from './Stamp';
import { useMediaQuery } from './useMediaQuery';

type Props = { items: Item[]; stamps: string[]; selectedId?: string };

export const START = 1965;
const PLAY_MS = 12_000;
const PULSE_MS = 1500; // matches the ladder-beam animation in widgets.css
const VIEWS = ['map', 'timeline'] as const;
type View = (typeof VIEWS)[number];

/**
 * "Where are they now?": one year, one Play control, one selected machine, and two
 * views of it: the Map (how far, log scale) and the Timeline (when). Switching views
 * keeps the year and the selection because both live here.
 */
export function WhereNow({ items, stamps, selectedId }: Props) {
  const { language, t } = useI18n();
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const [storedView, setView] = useStoredState<View>('pfs.whereView', 'map');
  const view: View = VIEWS.includes(storedView) ? storedView : 'map';
  const [today] = useState(() => toYear(new Date().toISOString().slice(0, 10)));
  // Starts at today, so every machine shows until the reader moves time.
  const [year, setYear] = useState(today);
  const [playing, setPlaying] = useState(false);
  const [machineId, setMachineId] = useState<string>();
  const [pulse, setPulse] = useState<{ id: string; n: number }>();
  const [cardOpen, setCardOpen] = useState(false);
  const card = useRef<HTMLDivElement>(null);
  const timer = useRef<number>();

  useEffect(() => {
    if (!playing) return;
    // Resume from wherever the year is; a finished sweep restarts at START.
    const from = year >= today ? START : year;
    const began = performance.now() - ((from - START) / (today - START)) * PLAY_MS;
    let frame = 0;
    const tick = (now: number) => {
      const next = START + ((now - began) / PLAY_MS) * (today - START);
      if (next >= today) {
        setYear(today);
        setPlaying(false);
        return;
      }
      setYear(next);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // The sweep reads `year` only when it starts or resumes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, today]);

  useEffect(() => {
    if (reduceMotion) setPlaying(false);
  }, [reduceMotion]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  useEffect(() => {
    if (cardOpen) card.current?.scrollIntoView({ block: 'nearest', behavior: reduceMotion ? 'auto' : 'smooth' });
  }, [cardOpen, machineId, reduceMotion]);

  const done = year >= today;
  const shownYear = Math.floor(year);
  const left = items.filter((item) => toYear(item.launchDate) <= year).length;

  /** Select a machine and send it a radio hello. On the Map a pulse runs first. */
  const send = (id: string) => {
    window.clearTimeout(timer.current);
    setMachineId(id);
    setPulse((previous) => ({ id, n: (previous?.n ?? 0) + 1 }));
    if (reduceMotion || view !== 'map') setCardOpen(true);
    else {
      setCardOpen(false);
      timer.current = window.setTimeout(() => setCardOpen(true), PULSE_MS);
    }
  };

  const close = () => {
    window.clearTimeout(timer.current);
    const id = machineId;
    const hadFocus = card.current?.contains(document.activeElement);
    setPulse(undefined);
    setCardOpen(false);
    setMachineId(undefined);
    if (id && hadFocus) document.querySelector<HTMLElement>(`.where [data-id="${id}"]`)?.focus();
  };

  const step = (by: number) => setYear((current) => Math.min(today, Math.max(START, Math.floor(current) + by) + 0.999));

  const moments = items
    .flatMap((item) => {
      const name = getItemName(item.id, language);
      const rows = getItemText(item.id, language)?.timeline ?? [];
      return [
        ...(item.arrivalDate && !rows.some((row) => row.date.startsWith(item.arrivalDate!))
          ? [{ id: item.id, date: item.arrivalDate, caption: `${name}: ${t('postcard.arrived')}` }]
          : []),
        ...rows.map((row) => ({ id: item.id, date: row.date, caption: `${name}: ${row.event}` })),
      ];
    })
    .sort((a, b) => toYear(a.date) - toYear(b.date));

  const shown = cardOpen ? items.find((item) => item.id === machineId) : undefined;
  const travelling = !!shown && year < (shown.arrivalDate ? toYear(shown.arrivalDate) : today);
  const lightTime = (item: Item) => formatLightTime(item.distanceKm, language, t('ladder.about'));

  return (
    // Escape closes the card from anywhere inside the section.
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <section
      className="where panel"
      aria-labelledby="where-heading"
      onKeyDown={(event) => {
        if (event.key === 'Escape' && (cardOpen || pulse)) close();
      }}
    >
      <h2 id="where-heading">{t('where.heading')}</h2>
      <p>{t('where.helper')}</p>

      <div className="where-time">
        <div className="history-controls">
          {reduceMotion ? (
            <>
              <button type="button" onClick={() => step(-1)} disabled={shownYear <= START}>
                {t('history.prev')}
              </button>
              <button type="button" onClick={() => step(1)} disabled={done}>
                {t('history.next')}
              </button>
            </>
          ) : playing ? (
            <button type="button" className="history-play" onClick={() => setPlaying(false)}>
              {t('history.pause')}
            </button>
          ) : (
            <>
              <button type="button" className="history-play" onClick={() => setPlaying(true)}>
                {t(done ? 'history.play' : 'history.resume')}
              </button>
              {!done && (
                <button
                  type="button"
                  onClick={() => {
                    setYear(START);
                    setPlaying(true);
                  }}
                >
                  {t('history.replay')}
                </button>
              )}
            </>
          )}
        </div>
        <label className="where-scrub">
          <span className="visually-hidden">{t('history.year')}</span>
          <input
            type="range"
            min={START}
            max={Math.floor(today)}
            value={Math.min(shownYear, Math.floor(today))}
            onChange={(event) => {
              setPlaying(false);
              const next = Number(event.target.value);
              setYear(next >= Math.floor(today) ? today : next + 0.999);
            }}
          />
        </label>
        {/* Silent while sweeping, so a screen reader is not flooded with 60 years. */}
        <div className="where-readout" aria-live={playing ? 'off' : 'polite'} aria-atomic="true">
          <p className="history-year">
            <span className="visually-hidden">{t('history.year')} </span>
            {shownYear}
          </p>
          <p className="label where-left">{t('ladder.left', { n: left, total: items.length })}</p>
        </div>
      </div>

      <fieldset className="ladder-toggle where-switch">
        <legend className="visually-hidden">{t('where.view')}</legend>
        {VIEWS.map((option) => (
          <label key={option}>
            <input
              className="visually-hidden"
              type="radio"
              name="where-view"
              checked={view === option}
              onChange={() => setView(option)}
            />
            {t(`where.view.${option}`)}
          </label>
        ))}
      </fieldset>

      <div className="where-body">
        <div className="where-view">
          {view === 'map' ? (
            <LadderMap items={items} stamps={stamps} year={year} today={today} selectedId={selectedId} machineId={machineId} pulse={pulse} onSend={send} />
          ) : (
            <HistoryTimeline items={items} stamps={stamps} year={year} today={today} selectedId={selectedId} machineId={machineId} />
          )}
        </div>
        <details className="ladder-moments">
          <summary>{t('ladder.moments')}</summary>
          <ol>
            {moments.map(({ id, date, caption }) => (
              <li key={`${date}-${caption}`}>
                <button
                  type="button"
                  className="link-button"
                  onClick={() => {
                    setPlaying(false);
                    setYear(toYear(date));
                    setMachineId(id);
                    setPulse(undefined);
                    setCardOpen(true);
                  }}
                >
                  <span className="label">{formatTimelineDate(date, language)}</span> {caption}
                </button>
              </li>
            ))}
          </ol>
        </details>
      </div>

      <div className="ladder-result" aria-live="polite" ref={card}>
        {shown ? (
          <div className="ladder-card">
            <Stamp item={shown} size="row" cancelled={stamps.includes(shown.id)} />
            <div>
              <h3>{getItemName(shown.id, language)}</h3>
              <dl>
                <dt className="label">{t('where.launched')}</dt>
                <dd>{formatDate(shown.launchDate, language)}</dd>
                <dt className="label">{t('postcard.distance')}</dt>
                {/* While travelling, no distance number: the stored one is where it ends up. */}
                <dd>{travelling ? t('journey.onTheWay') : formatDistance(shown.distanceKm, language)}</dd>
                {pulse?.id === shown.id && (
                  <>
                    <dt className="label">{t('ladder.lightTime')}</dt>
                    <dd>{travelling ? t('journey.depends') : t('ladder.hello', { time: lightTime(shown) })}</dd>
                  </>
                )}
              </dl>
              <p className="ladder-actions">
                <a href={`#${shown.id}`}>{t('ladder.read')}</a>
                {pulse?.id !== shown.id && (
                  <button type="button" onClick={() => send(shown.id)}>
                    {t('where.hello')}
                  </button>
                )}
                <button type="button" onClick={close}>
                  {t('ladder.close')}
                </button>
                <a href={`#journey-${shown.id}`}>{t('journey.go')}</a>
              </p>
            </div>
          </div>
        ) : (
          !pulse && <p className="label ladder-note">{t('ladder.pick')}</p>
        )}
      </div>
    </section>
  );
}
