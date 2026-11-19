import { Link } from 'react-router-dom';
import { scenarios } from '../data';
import { useProgress } from '../hooks/useProgress';

export function ProgressPage() {
  const { progress, resetProgress, storageKey } = useProgress();
  const done = progress.completedScenarios.length;
  const total = scenarios.length;
  const pct = Math.round((done / total) * 100);

  return (
    <section className="section">
      <h2>Your progress</h2>
      <p>Stored only in this phone/browser via localStorage key <code>{storageKey}</code>.</p>
      <div className="progress-panel">
        <strong>
          {done}/{total} scenarios complete ({pct}%)
        </strong>
        <div className="progress-bar">
          <span style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="scenario-list" style={{ marginTop: '1rem' }}>
        {scenarios.map((s) => {
          const complete = progress.completedScenarios.includes(s.id);
          return (
            <Link key={s.id} to={`/scenario/${s.id}`} className="panel scenario-card">
              <h3>{s.title}</h3>
              <span className={`chip ${complete ? 'done' : ''}`}>{complete ? 'Completed' : 'In progress / not started'}</span>
            </Link>
          );
        })}
      </div>

      <button type="button" className="btn btn-secondary" style={{ marginTop: '1rem' }} onClick={resetProgress}>
        Reset progress on this device
      </button>
    </section>
  );
}
