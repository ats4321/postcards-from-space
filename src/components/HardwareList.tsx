import { useState, type ReactNode } from 'react';
import type { Item, Place, Status } from '../content';
import { useI18n } from '../lib/i18n';
import { Stamp } from './Stamp';
import { StatusPill } from './StatusPill';

type Props = {
  items: Item[];
  selectedId?: string;
  stamps: string[];
  /** On narrow screens the open postcard is passed in here and shown under its row. */
  inline?: ReactNode;
};

// Listed here, not imported from schema.ts, so zod stays out of the browser bundle.
const PLACES: Place[] = ['Moon', 'Mars', 'Asteroids', 'Deep space'];
const STATUSES: Status[] = ['working', 'resting', 'drifting'];

function toggled<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((entry) => entry !== value) : [...list, value];
}

/** Every item, with filters for place, status and the Arizona connection. */
export function HardwareList({ items, selectedId, stamps, inline }: Props) {
  const { t } = useI18n();
  const [places, setPlaces] = useState<Place[]>([]);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [arizona, setArizona] = useState(false);

  // An empty group means "any".
  const shown = items.filter(
    (item) =>
      (places.length === 0 || places.includes(item.place)) &&
      (statuses.length === 0 || statuses.includes(item.status)) &&
      (!arizona || item.arizona),
  );
  const filtered = places.length > 0 || statuses.length > 0 || arizona;
  const clear = () => {
    setPlaces([]);
    setStatuses([]);
    setArizona(false);
  };

  return (
    <section className="layout-side" aria-labelledby="list-heading">
      <h2 id="list-heading">{t('list.heading')}</h2>

      <div className="filters">
        <div role="group" aria-labelledby="filter-place">
          <span className="label" id="filter-place">
            {t('list.filterPlace')}
          </span>
          {PLACES.map((place) => (
            <button
              key={place}
              type="button"
              className="chip"
              aria-pressed={places.includes(place)}
              onClick={() => setPlaces(toggled(places, place))}
            >
              {t(`place.${place}`)}
            </button>
          ))}
        </div>
        <div role="group" aria-labelledby="filter-status">
          <span className="label" id="filter-status">
            {t('list.filterStatus')}
          </span>
          {STATUSES.map((status) => (
            <button
              key={status}
              type="button"
              className="chip"
              aria-pressed={statuses.includes(status)}
              onClick={() => setStatuses(toggled(statuses, status))}
            >
              {t(`status.${status}`)}
            </button>
          ))}
        </div>
        <div role="group" aria-labelledby="filter-more">
          <span className="label" id="filter-more">
            {t('list.filterMore')}
          </span>
          <button
            type="button"
            className="chip chip--arizona"
            aria-pressed={arizona}
            onClick={() => setArizona(!arizona)}
          >
            {t('list.arizona')}
          </button>
        </div>
        <p className="label filter-count" role="status">
          {t('list.showing', { shown: shown.length, total: items.length })}
          {filtered && (
            <button type="button" className="link-button" onClick={clear}>
              {t('list.clear')}
            </button>
          )}
        </p>
      </div>

      {shown.length === 0 && <p className="empty">{t('list.none')}</p>}
      {/* The open postcard stays on screen even when the filters hide its row. */}
      {inline && !shown.some((item) => item.id === selectedId) && inline}

      <ul className="hardware-list">
        {shown.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} aria-current={item.id === selectedId ? 'page' : undefined}>
              <Stamp item={item} size="row" cancelled={stamps.includes(item.id)} />
              <span className="row-text">
                <span className="hardware-name">{item.name}</span>
                <span className="label">
                  {t(`place.${item.place}`)} ·{' '}
                  <span className="visually-hidden">
                    {t('list.launched', { year: item.launchDate.slice(0, 4) })}
                  </span>
                  <span aria-hidden="true">{item.launchDate.slice(0, 4)}</span>
                  {item.arizona && (
                    <>
                      {' · '}
                      <span className="az-tag" aria-hidden="true">
                        AZ
                      </span>
                      <span className="visually-hidden">{t('list.arizona')}</span>
                    </>
                  )}
                  {stamps.includes(item.id) && (
                    <span className="visually-hidden">, {t('list.stamped')}</span>
                  )}
                </span>
              </span>
              <StatusPill status={item.status} />
            </a>
            {item.id === selectedId && inline}
          </li>
        ))}
      </ul>
    </section>
  );
}
