import { LANGUAGES } from '../content';
import { useI18n } from '../lib/i18n';
import { Languages } from 'lucide-react';
import { Icon } from './Icon';

export function LanguageToggle() {
  const { language, setLanguage, t } = useI18n();

  return (
    <div className="language-toggle" role="group" aria-label={t('language.label')}>
      <Icon as={Languages} />
      {LANGUAGES.map((code) => (
        <button
          key={code}
          type="button"
          lang={code}
          aria-pressed={code === language}
          onClick={() => setLanguage(code)}
        >
          <span aria-hidden="true">{code.toUpperCase()}</span>
          <span className="visually-hidden">{t(`language.${code}`)}</span>
        </button>
      ))}
    </div>
  );
}
