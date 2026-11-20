import { Link } from 'react-router-dom';
import type { CustomerVariant, RoleplayPair } from '../../types';
import { VARIANT_LABELS } from '../../lib/sessionCode';

interface Props {
  pair: RoleplayPair;
  variant: CustomerVariant;
  role: 'staff' | 'customer';
  onChangeRole: () => void;
}

export function RoleplayStudentView({ pair, variant, role, onChangeRole }: Props) {
  const card = role === 'staff' ? pair.staff : pair.customers[variant];
  const roleLabel =
    role === 'staff' ? 'Role A — Counter staff' : `Role B — ${VARIANT_LABELS[variant]}`;

  return (
    <section className="section student-role-view">
      <div className="meta-row">
        <Link className="back-link" to="/class/join">
          ← Join
        </Link>
        <button type="button" className="btn btn-secondary btn-compact" onClick={onChangeRole}>
          Switch role
        </button>
      </div>
      <p className="role-badge">{roleLabel}</p>
      <h1 className="class-title">{pair.title}</h1>
      <p className="muted">Your phone shows only your role. Do not read the other card.</p>

      <article className="panel role-secret-card">
        <h2>Your secret details</h2>
        <p>{card.secret}</p>
      </article>

      <article className="panel">
        <h2>Goal</h2>
        <p>{card.goal}</p>
      </article>

      <article className="panel">
        <h2>Useful phrases</h2>
        <ul className="phrase-list">
          {card.phrases.map((p) => (
            <li key={p.en}>
              <strong>{p.en}</strong>
              <span className="hint-ja">{p.ja}</span>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}
