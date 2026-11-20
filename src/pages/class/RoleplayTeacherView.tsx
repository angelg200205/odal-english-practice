import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { CustomerVariant, RoleplayPair } from '../../types';
import { VARIANT_LABELS } from '../../lib/sessionCode';

interface Props {
  pair: RoleplayPair;
  variant: CustomerVariant;
  code: string;
}

export function RoleplayTeacherView({ pair, variant, code }: Props) {
  const [revealed, setRevealed] = useState(false);
  const customer = pair.customers[variant];

  return (
    <section className="section teacher-roleplay teacher-wide">
      <Link className="back-link" to="/class/teacher/roleplay">
        ← New role-play
      </Link>
      <div className="session-code-banner">
        <div>
          <p className="kicker">Students: Class Mode → Join</p>
          <p className="session-code" aria-label="Session code">
            {code}
          </p>
        </div>
        <div className="session-meta">
          <h1>{pair.title}</h1>
          <p className="muted">Role B customer: {VARIANT_LABELS[variant]}</p>
        </div>
      </div>

      <div className="answer-key-grid">
        <article className="panel key-panel">
          <h2>Answer key — Staff (Role A)</h2>
          <p className="key-block">{pair.staff.secret}</p>
          <p>
            <strong>Goal:</strong> {pair.staff.goal}
          </p>
          <ul className="phrase-list">
            {pair.staff.phrases.map((p) => (
              <li key={p.en}>
                <strong>{p.en}</strong>
                <span className="hint-ja">{p.ja}</span>
              </li>
            ))}
          </ul>
        </article>
        <article className="panel key-panel">
          <h2>Answer key — Customer (Role B)</h2>
          <p className="chip">{VARIANT_LABELS[variant]}</p>
          <p className="key-block">{customer.secret}</p>
          <p>
            <strong>Goal:</strong> {customer.goal}
          </p>
          <ul className="phrase-list">
            {customer.phrases.map((p) => (
              <li key={p.en}>
                <strong>{p.en}</strong>
                <span className="hint-ja">{p.ja}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>

      <div className="panel">
        <h2>Teacher notes</h2>
        <p>{pair.answerKey.staffSummary}</p>
        <p className="muted">{pair.answerKey.customerNotes}</p>
      </div>

      <div className="hero-actions">
        <button type="button" className="btn btn-primary" onClick={() => setRevealed(true)}>
          Reveal both cards
        </button>
        <Link className="btn btn-secondary" to="/class/teacher/roleplay">
          End / new code
        </Link>
      </div>

      {revealed ? (
        <div className="reveal-panel panel">
          <h2>After talk — listen for</h2>
          <p className="muted">Short checklist of target phrases:</p>
          <ul className="checklist">
            {pair.answerKey.listenFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="answer-key-grid reveal-cards">
            <article>
              <h3>Staff card (shared)</h3>
              <p>{pair.staff.secret}</p>
              <p>
                <strong>Goal:</strong> {pair.staff.goal}
              </p>
            </article>
            <article>
              <h3>Customer card (shared)</h3>
              <p>{customer.secret}</p>
              <p>
                <strong>Goal:</strong> {customer.goal}
              </p>
            </article>
          </div>
        </div>
      ) : null}
    </section>
  );
}
