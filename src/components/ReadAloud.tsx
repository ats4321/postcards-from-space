import { useEffect, useState } from 'react';
import { useI18n } from '../lib/i18n';

type Props = { text: string; lang: string };

/** Reads text with the Web Speech API. Renders nothing where the browser cannot speak. */
export function ReadAloud({ text, lang }: Props) {
  const { t } = useI18n();
  const [speaking, setSpeaking] = useState(false);
  const supported = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;

  // Stop when the text changes (new language) or the postcard closes.
  useEffect(
    () => () => {
      try {
        window.speechSynthesis?.cancel();
      } catch {
        // Nothing to stop.
      }
    },
    [text],
  );

  if (!supported) return null;

  const toggle = () => {
    try {
      window.speechSynthesis.cancel();
      if (speaking) {
        setSpeaking(false);
        return;
      }
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.9;
      utterance.onend = utterance.onerror = () => setSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setSpeaking(true);
    } catch {
      setSpeaking(false);
    }
  };

  return (
    <button type="button" className="read-aloud" aria-pressed={speaking} onClick={toggle}>
      <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
        {speaking ? <path d="M3 3h10v10H3z" /> : <path d="M2 6h3l4-3v10l-4-3H2zM11 5.5a3.5 3.5 0 0 1 0 5" />}
      </svg>
      {t(speaking ? 'read.stop' : 'read.start')}
    </button>
  );
}
