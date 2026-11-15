import { useState } from 'react';
import type { Item, Quiz as QuizData } from '../content';
import { useI18n } from '../lib/i18n';
import { Stamp } from './Stamp';

type Props = { item: Item; quiz: QuizData; earned: boolean; onCorrect: () => void };

/** One question, three buttons. A right answer awards the stamp; a wrong one asks for a reread. */
export function Quiz({ item, quiz, earned, onCorrect }: Props) {
  const { t } = useI18n();
  const [wrong, setWrong] = useState<number[]>([]);
  const [fresh, setFresh] = useState(false);

  const answer = (index: number) => {
    if (index === quiz.answerIndex) {
      setFresh(true);
      onCorrect();
    } else if (!wrong.includes(index)) {
      setWrong([...wrong, index]);
    }
  };

  const message = earned
    ? t(fresh ? 'quiz.correct' : 'quiz.already')
    : wrong.length > 0
      ? t('quiz.tryAgain')
      : '';

  return (
    <section className="quiz" aria-labelledby="quiz-heading">
      <h3 id="quiz-heading">{t('quiz.heading')}</h3>
      <p className="quiz-question" id="quiz-question">
        {quiz.question}
      </p>
      <div className="quiz-options" role="group" aria-labelledby="quiz-question">
        {quiz.options.map((option, index) => {
          const right = earned && index === quiz.answerIndex;
          const tried = !earned && wrong.includes(index);
          return (
            <button
              key={index}
              type="button"
              disabled={earned}
              data-state={right ? 'right' : tried ? 'wrong' : undefined}
              onClick={() => answer(index)}
            >
              {option}
              {(right || tried) && (
                <span className="visually-hidden"> {t(right ? 'quiz.right' : 'quiz.wrong')}</span>
              )}
            </button>
          );
        })}
      </div>
      <div className="quiz-result">
        {earned && <Stamp item={item} cancelled className={fresh ? 'stamp-land' : ''} />}
        <p role="status">{message}</p>
        {earned && (
          <button
            type="button"
            onClick={() => document.getElementById('passport-heading')?.focus()}
          >
            {t('quiz.seePassport')}
          </button>
        )}
      </div>
    </section>
  );
}
