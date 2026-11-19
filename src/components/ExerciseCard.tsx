import { useMemo, useState } from 'react';
import type { Exercise } from '../types';

interface Props {
  exercise: Exercise;
  savedCorrect?: boolean;
  onResult: (exerciseId: string, correct: boolean) => void;
}

function normalize(s: string): string {
  return s.trim().toLowerCase().replace(/[’']/g, "'");
}

export function ExerciseCard({ exercise, savedCorrect, onResult }: Props) {
  const [revealed, setRevealed] = useState(savedCorrect !== undefined);
  const [correct, setCorrect] = useState(savedCorrect ?? false);
  const [selected, setSelected] = useState<number | null>(null);
  const [blanks, setBlanks] = useState<string[]>([]);
  const [ordered, setOrdered] = useState<string[]>([]);

  const shuffled = useMemo(() => {
    if (exercise.type !== 'sentenceOrder') return [] as string[];
    return [...exercise.words].sort(() => Math.random() - 0.5);
  }, [exercise]);

  const remaining = useMemo(() => {
    if (exercise.type !== 'sentenceOrder') return [] as string[];
    const used = [...ordered];
    return shuffled.filter((w) => {
      const idx = used.indexOf(w);
      if (idx === -1) return true;
      used.splice(idx, 1);
      return false;
    });
  }, [exercise, ordered, shuffled]);

  function finish(ok: boolean) {
    setCorrect(ok);
    setRevealed(true);
    onResult(exercise.id, ok);
  }

  function checkFill() {
    if (exercise.type !== 'fillBlank') return;
    const ok = exercise.blanks.every((ans, i) => normalize(blanks[i] ?? '') === normalize(ans));
    finish(ok);
  }

  function checkOrder() {
    if (exercise.type !== 'sentenceOrder') return;
    const ok =
      ordered.length === exercise.correctOrder.length &&
      ordered.every((w, i) => normalize(w) === normalize(exercise.correctOrder[i]));
    finish(ok);
  }

  return (
    <article className="exercise">
      <h3>
        {exercise.type === 'fillBlank' && 'Fill in the blank'}
        {exercise.type === 'multipleChoice' && 'Multiple choice'}
        {exercise.type === 'sentenceOrder' && 'Sentence order'}
        {exercise.type === 'politeChoice' && 'More polite / correct'}
      </h3>
      <p className="muted" style={{ margin: 0 }}>
        {exercise.prompt}
      </p>

      {exercise.type === 'fillBlank' && (
        <>
          <p style={{ marginTop: '0.7rem', fontWeight: 600 }}>{exercise.sentence}</p>
          <div className="blank-row">
            {exercise.blanks.map((_, i) => (
              <input
                key={i}
                aria-label={`Blank ${i + 1}`}
                value={blanks[i] ?? ''}
                disabled={revealed}
                onChange={(e) => {
                  const next = [...blanks];
                  next[i] = e.target.value;
                  setBlanks(next);
                }}
              />
            ))}
            {!revealed && (
              <button type="button" className="btn btn-primary" onClick={checkFill}>
                Check
              </button>
            )}
          </div>
        </>
      )}

      {(exercise.type === 'multipleChoice' || exercise.type === 'politeChoice') && (
        <div className="choices">
          {(exercise.type === 'multipleChoice' ? exercise.choices : exercise.options).map((choice, i) => {
            let cls = 'choice';
            if (selected === i) cls += ' selected';
            if (revealed) {
              if (i === exercise.correctIndex) cls += ' correct';
              else if (selected === i) cls += ' wrong';
            }
            return (
              <button
                key={choice}
                type="button"
                className={cls}
                disabled={revealed}
                onClick={() => {
                  setSelected(i);
                  finish(i === exercise.correctIndex);
                }}
              >
                {choice}
              </button>
            );
          })}
        </div>
      )}

      {exercise.type === 'sentenceOrder' && (
        <>
          <div className="word-bank" aria-label="Built sentence">
            {ordered.map((w, i) => (
              <button
                key={`o-${w}-${i}`}
                type="button"
                className="word-chip selected"
                disabled={revealed}
                onClick={() => setOrdered((prev) => prev.filter((_, idx) => idx !== i))}
              >
                {w}
              </button>
            ))}
          </div>
          <div className="word-bank" aria-label="Word bank">
            {remaining.map((w, i) => (
              <button
                key={`b-${w}-${i}`}
                type="button"
                className="word-chip"
                disabled={revealed}
                onClick={() => setOrdered((prev) => [...prev, w])}
              >
                {w}
              </button>
            ))}
          </div>
          {!revealed && (
            <div style={{ marginTop: '0.6rem', display: 'flex', gap: '0.45rem' }}>
              <button type="button" className="btn btn-primary" onClick={checkOrder}>
                Check
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => setOrdered([])}>
                Clear
              </button>
            </div>
          )}
        </>
      )}

      {revealed && (
        <div className={`feedback ${correct ? '' : 'wrong'}`}>
          <strong>{correct ? 'Correct.' : 'Not quite.'}</strong>{' '}
          {exercise.type === 'fillBlank' && (
            <>
              Answer: <em>{exercise.blanks.join(' / ')}</em>.{' '}
            </>
          )}
          {exercise.type === 'sentenceOrder' && (
            <>
              Answer: <em>{exercise.correctOrder.join(' ')}</em>.{' '}
            </>
          )}
          {(exercise.type === 'multipleChoice' || exercise.type === 'politeChoice') && (
            <>
              Answer:{' '}
              <em>
                {(exercise.type === 'multipleChoice' ? exercise.choices : exercise.options)[exercise.correctIndex]}
              </em>
              .{' '}
            </>
          )}
          {exercise.explanation}
        </div>
      )}
    </article>
  );
}
