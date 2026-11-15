import { useState, type FormEvent } from 'react';
import type { Quiz as QuizData } from '../content';
import { useI18n } from '../lib/i18n';

type Props = { quiz: QuizData; earned: boolean; onCorrect: () => void };

/** Stub: one question, three options. A right answer awards the stamp. */
export function Quiz({ quiz, earned, onCorrect }: Props) {
  const { t } = useI18n();
  const [choice, setChoice] = useState<number | null>(null);
  const [wrong, setWrong] = useState(false);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (choice === quiz.answerIndex) onCorrect();
    else setWrong(choice !== null);
  };

  return (
    <section className="quiz">
      <h3>{t('quiz.heading')}</h3>
      <form onSubmit={submit}>
        <fieldset>
          <legend>{quiz.question}</legend>
          {quiz.options.map((option, index) => (
            <label key={option}>
              <input
                type="radio"
                name="quiz"
                checked={choice === index}
                onChange={() => {
                  setChoice(index);
                  setWrong(false);
                }}
              />
              {option}
            </label>
          ))}
        </fieldset>
        <button type="submit" disabled={choice === null}>
          {t('quiz.check')}
        </button>
      </form>
      <p role="status">
        {earned ? t('quiz.correct') : wrong ? t('quiz.tryAgain') : ''}
      </p>
    </section>
  );
}
