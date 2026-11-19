import { Link } from 'react-router-dom';
import { scenarios, topics } from '../data';
import { useProgress } from '../hooks/useProgress';

export function HomePage() {
  const { progress } = useProgress();
  const done = progress.completedScenarios.length;
  const total = scenarios.length;
  const pct = Math.round((done / total) * 100);

  return (
    <>
      <section className="hero" aria-label="ODAL staff English practice">
        <div className="hero-kicker">ODAL Rent-a-Car · Naha Airport</div>
        <h1>ODAL Staff English</h1>
        <p>
          Counter English for Japanese staff in Tomigusuku — Japan-site and Korean-site guest flows, labeled when
          rules differ.
        </p>
        <div className="hero-actions">
          <Link className="btn btn-primary" to="/practice">
            Start practice
          </Link>
          <Link className="btn btn-ghost" to="/glossary">
            Open glossary
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="progress-panel">
          <strong>
            Progress · {done}/{total} scenarios
          </strong>
          <div className="progress-bar" aria-hidden>
            <span style={{ width: `${pct}%` }} />
          </div>
          <p className="muted" style={{ margin: 0, fontSize: '0.9rem' }}>
            Saved in this browser (localStorage). No login.
          </p>
        </div>
      </section>

      <section className="section">
        <h2>Journey topics</h2>
        <p>Practice by the guest journey — booking through accidents and cancellations.</p>
        <div className="topic-grid">
          {topics.map((topic) => {
            const list = scenarios.filter((s) => s.topicId === topic.id);
            const finished = list.filter((s) => progress.completedScenarios.includes(s.id)).length;
            return (
              <Link key={topic.id} className="topic-link" to={`/practice?topic=${topic.id}`}>
                <h3>{topic.title}</h3>
                <p>{topic.blurb}</p>
                <div className="meta-row">
                  <span className="chip">{list.length} scenarios</span>
                  <span className={`chip ${finished === list.length && list.length ? 'done' : ''}`}>
                    {finished}/{list.length} done
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
