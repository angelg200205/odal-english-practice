import { Link, useSearchParams } from 'react-router-dom';
import { scenarios, topics } from '../data';
import { useProgress } from '../hooks/useProgress';

export function PracticePage() {
  const [params] = useSearchParams();
  const topicFilter = params.get('topic');
  const { progress } = useProgress();
  const topic = topics.find((t) => t.id === topicFilter);
  const list = topicFilter ? scenarios.filter((s) => s.topicId === topicFilter) : scenarios;

  return (
    <section className="section">
      <h2>{topic ? topic.title : 'All scenarios'}</h2>
      <p>
        {topic
          ? topic.blurb
          : '27 scenarios from the Japanese-site lesson list (KR fills gaps, labeled). Optional 日本語 hints on hard words.'}
      </p>

      <div className="meta-row" style={{ marginBottom: '1rem' }}>
        <Link className="chip" to="/practice">
          All
        </Link>
        {topics.map((t) => (
          <Link key={t.id} className="chip" to={`/practice?topic=${t.id}`}>
            {t.title}
          </Link>
        ))}
      </div>

      <div className="scenario-list">
        {list.map((s) => {
          const done = progress.completedScenarios.includes(s.id);
          return (
            <Link key={s.id} to={`/scenario/${s.id}`} className="panel scenario-card">
              <h3>{s.title}</h3>
              <p className="muted" style={{ margin: 0 }}>
                {s.summary}
              </p>
              <div className="meta-row">
                <span className="chip">{s.grammarFocus.split(';')[0]}</span>
                <span className={`chip ${done ? 'done' : ''}`}>{done ? 'Completed' : 'Not done'}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
