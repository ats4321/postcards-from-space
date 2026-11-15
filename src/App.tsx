import { Countdown } from './components/Countdown';
import { DistanceLadder } from './components/DistanceLadder';
import { HardwareList } from './components/HardwareList';
import { LanguageToggle } from './components/LanguageToggle';
import { Passport } from './components/Passport';
import { Postcard } from './components/Postcard';
import { getItem, items } from './content';
import { useI18n } from './lib/i18n';
import { useHashRoute } from './lib/useHashRoute';
import { useStoredState } from './lib/useStoredState';

/**
 * Foundation shell: proves that content, languages and deep links work.
 * The UI agent owns this file and the components from here on.
 */
export default function App() {
  const { t } = useI18n();
  const selected = getItem(useHashRoute());
  const [stamps, setStamps] = useStoredState<string[]>('pfs.stamps', []);

  const awardStamp = (id: string) => {
    if (!stamps.includes(id)) setStamps([...stamps, id]);
  };

  return (
    <>
      <a className="skip-link" href="#postcard">
        {t('app.skip')}
      </a>
      <header className="site-header">
        <div>
          <h1>{t('app.title')}</h1>
          <p>{t('app.tagline')}</p>
        </div>
        <LanguageToggle />
      </header>

      <div className="layout">
        <nav className="layout-side" aria-label={t('list.heading')}>
          <HardwareList items={items} selectedId={selected?.id} />
          <Passport items={items} stamps={stamps} />
          <Countdown />
        </nav>
        <main id="postcard" className="layout-main">
          {selected ? (
            <Postcard
              key={selected.id}
              item={selected}
              earned={stamps.includes(selected.id)}
              onCorrect={() => awardStamp(selected.id)}
            />
          ) : (
            <p className="empty">{t('postcard.empty')}</p>
          )}
          <DistanceLadder items={items} selectedId={selected?.id} />
        </main>
      </div>
    </>
  );
}
