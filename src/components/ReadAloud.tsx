import { useEffect, useState } from 'react';
import { useI18n } from '../lib/i18n';
import { Square, Volume2 } from 'lucide-react';
import { Icon } from './Icon';

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
      <Icon as={speaking ? Square : Volume2} />
      {t(speaking ? 'read.stop' : 'read.start')}
    </button>
  );
}
