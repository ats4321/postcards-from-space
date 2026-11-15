import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { Countdown } from './components/Countdown';
import { DistanceLadder } from './components/DistanceLadder';
import { HardwareList } from './components/HardwareList';
import { LanguageToggle } from './components/LanguageToggle';
import { Passport } from './components/Passport';
import { Postcard } from './components/Postcard';
import { TeacherStrip } from './components/TeacherStrip';
import { useMediaQuery } from './components/useMediaQuery';
import { getItem, items } from './content';
import { useI18n } from './lib/i18n';
import { useHashRoute } from './lib/useHashRoute';
import { useStoredState } from './lib/useStoredState';

export default function App() {
  const { t } = useI18n();
  const selected = getItem(useHashRoute());
  const [stored, setStamps] = useStoredState<string[]>('pfs.stamps', []);
  const stamps = Array.isArray(stored) ? stored : [];
  const [justEarned, setJustEarned] = useState<string>();
  const wide = useMediaQuery('(min-width: 900px)');

  // True once the reader has picked a postcard, as opposed to arriving on a deep link.
  const navigated = useRef(false);
  useEffect(() => {
    const onChange = () => {
      navigated.current = true;
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  const awardStamp = (id: string) => {
    setJustEarned(id);
    if (!stamps.includes(id)) setStamps([...stamps, id]);
  };

  // The hash is the route, so in-page jumps must not go through it.
  const skip = (event: MouseEvent) => {
    event.preventDefault();
    document.getElementById('main')?.focus();
  };

  const close = () => {
    const id = selected?.id;
    // pushState, not location.hash = '', which would jump to the top of the page.
    window.history.pushState(null, '', window.location.pathname + window.location.search);
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    requestAnimationFrame(() =>
      document.querySelector<HTMLElement>(`.hardware-list a[href="#${id}"]`)?.focus(),
    );
  };

  const postcard = selected && (
    <Postcard
      key={selected.id}
      item={selected}
      earned={stamps.includes(selected.id)}
      onCorrect={() => awardStamp(selected.id)}
      onClose={close}
      focusOnOpen={navigated.current}
    />
  );

  return (
    <>
      <a className="skip-link" href="#main" onClick={skip}>
        {t('app.skip')}
      </a>
      <header className="site-header">
        <div>
          <h1>{t('app.title')}</h1>
          <p>{t('app.tagline')}</p>
        </div>
        <LanguageToggle />
      </header>

      <main id="main" tabIndex={-1}>
        <Countdown />
        <div className="layout">
          <HardwareList
            items={items}
            selectedId={selected?.id}
            stamps={stamps}
            inline={wide ? undefined : postcard}
          />
          {wide && (
            <div className="layout-main">
              {postcard ?? <p className="empty">{t('postcard.empty')}</p>}
            </div>
          )}
        </div>
        <Passport items={items} stamps={stamps} justEarned={justEarned} />
        <DistanceLadder items={items} selectedId={selected?.id} />
      </main>

      <TeacherStrip items={items} />
    </>
  );
}
