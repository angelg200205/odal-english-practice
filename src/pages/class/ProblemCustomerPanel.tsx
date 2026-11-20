import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { problemCustomers } from '../../data';
import type { ProblemCustomer, ProblemDifficulty } from '../../types';

const DIFFICULTY_LABEL: Record<ProblemDifficulty, string> = {
  easy: 'Easy — calm guest',
  medium: 'Medium — upset guest',
  hard: 'Hard — very angry guest',
};

function pickRandom(
  pool: ProblemCustomer[],
  difficulty: ProblemDifficulty | 'any',
  usedIds: Set<string>,
): ProblemCustomer | null {
  const candidates = pool.filter(
    (p) => (difficulty === 'any' || p.difficulty === difficulty) && !usedIds.has(p.id),
  );
  if (!candidates.length) return null;
  return candidates[Math.floor(Math.random() * candidates.length)];
}

export function ProblemCustomerPanel() {
  const [difficulty, setDifficulty] = useState<ProblemDifficulty | 'any'>('any');
  const [seconds, setSeconds] = useState(90);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [running, setRunning] = useState(false);
  const [showJa, setShowJa] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [current, setCurrent] = useState<ProblemCustomer | null>(null);
  const [usedIds, setUsedIds] = useState<Set<string>>(() => new Set());
  const [doneIds, setDoneIds] = useState<string[]>([]);

  const availableCount = useMemo(() => {
    return problemCustomers.filter(
      (p) => (difficulty === 'any' || p.difficulty === difficulty) && !usedIds.has(p.id),
    ).length;
  }, [difficulty, usedIds]);

  useEffect(() => {
    if (!running || remaining === null) return;
    if (remaining <= 0) {
      setRunning(false);
      setShowModel(true);
      return;
    }
    const t = window.setTimeout(() => setRemaining((r) => (r === null ? r : r - 1)), 1000);
    return () => window.clearTimeout(t);
  }, [running, remaining]);

  function draw() {
    const next = pickRandom(problemCustomers, difficulty, usedIds);
    if (!next) {
      setCurrent(null);
      return;
    }
    setCurrent(next);
    setUsedIds((prev) => new Set(prev).add(next.id));
    setShowModel(false);
    setShowJa(false);
    setRemaining(seconds);
    setRunning(true);
  }

  function markDone() {
    if (!current) return;
    setDoneIds((ids) => (ids.includes(current.id) ? ids : [...ids, current.id]));
    setRunning(false);
    setShowModel(true);
  }

  function resetSession() {
    setUsedIds(new Set());
    setDoneIds([]);
    setCurrent(null);
    setRunning(false);
    setRemaining(null);
    setShowModel(false);
  }

  return (
    <section className="section problem-stage teacher-wide">
      <Link className="back-link" to="/class/teacher">
        ← Teacher
      </Link>
      <h1 className="class-title">Problem customer</h1>
      <p className="muted">
        Projector / TV view. Draw a tough situation for the whole class. Situations do not repeat in this session.
      </p>

      <div className="problem-controls panel">
        <label className="field-label" htmlFor="diff">
          Difficulty
        </label>
        <select
          id="diff"
          className="search"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value as ProblemDifficulty | 'any')}
        >
          <option value="any">Any</option>
          <option value="easy">{DIFFICULTY_LABEL.easy}</option>
          <option value="medium">{DIFFICULTY_LABEL.medium}</option>
          <option value="hard">{DIFFICULTY_LABEL.hard}</option>
        </select>

        <label className="field-label" htmlFor="timer">
          Countdown
        </label>
        <div className="timer-options">
          {[60, 90, 120].map((n) => (
            <button
              key={n}
              type="button"
              className={`btn btn-secondary btn-compact ${seconds === n ? 'is-selected' : ''}`}
              onClick={() => {
                setSeconds(n);
                if (!running) setRemaining(n);
              }}
            >
              {n}s
            </button>
          ))}
        </div>

        <div className="hero-actions" style={{ marginTop: '0.5rem' }}>
          <button type="button" className="btn btn-primary" onClick={draw} disabled={availableCount === 0}>
            Draw a problem
          </button>
          <button type="button" className="btn btn-secondary" onClick={resetSession}>
            Reset session repeats
          </button>
        </div>
        <p className="muted" style={{ margin: 0 }}>
          Left in pool: {availableCount} / {problemCustomers.length} · Done this session: {doneIds.length}
        </p>
      </div>

      {current ? (
        <div className="problem-board">
          <div className="problem-top">
            <span className={`chip difficulty-${current.difficulty}`}>
              {DIFFICULTY_LABEL[current.difficulty]}
            </span>
            <div className={`countdown ${remaining === 0 ? 'done' : ''}`} aria-live="polite">
              {remaining === null ? '—' : `${remaining}s`}
            </div>
          </div>
          <h2 className="problem-title">{current.title}</h2>
          <p className="problem-situation">{current.situation}</p>
          <div className="hero-actions">
            <button type="button" className="btn btn-secondary" onClick={() => setShowJa((v) => !v)}>
              {showJa ? 'Hide Japanese hint' : 'Japanese hint'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setRunning((r) => !r)}
              disabled={remaining === null || remaining <= 0}
            >
              {running ? 'Pause' : 'Resume'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={markDone}>
              Mark done
            </button>
            <button type="button" className="btn btn-primary" onClick={() => setShowModel(true)}>
              Show model answer
            </button>
          </div>
          {showJa ? (
            <p className="ja-hint-block">
              <strong>日本語ヒント:</strong> {current.jaHint}
            </p>
          ) : null}
          {showModel || remaining === 0 ? (
            <div className="model-answer panel">
              <h3>Model answer</h3>
              <p>{current.modelAnswer}</p>
              <h4>Key phrases</h4>
              <ul className="checklist">
                {current.keyPhrases.map((k) => (
                  <li key={k}>{k}</li>
                ))}
              </ul>
              <button type="button" className="btn btn-primary" onClick={draw} disabled={availableCount === 0}>
                Draw next
              </button>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="panel">
          <p className="muted" style={{ margin: 0 }}>
            {availableCount === 0
              ? 'No situations left for this filter. Reset the session or change difficulty.'
              : 'Press “Draw a problem” to begin.'}
          </p>
        </div>
      )}
    </section>
  );
}
