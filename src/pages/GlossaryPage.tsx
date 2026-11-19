import { useMemo, useState } from 'react';
import { glossary } from '../data';

export function GlossaryPage() {
  const [q, setQ] = useState('');
  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return glossary;
    return glossary.filter(
      (g) =>
        g.en.toLowerCase().includes(needle) ||
        g.ja.includes(q.trim()) ||
        (g.note ?? '').toLowerCase().includes(needle),
    );
  }, [q]);

  return (
    <section className="section">
      <h2>Glossary</h2>
      <p>English rental terms with Japanese (日本語) for Tomigusuku staff.</p>
      <input
        className="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search English or 日本語…"
        aria-label="Search glossary"
      />
      <div className="glossary-list">
        {filtered.map((g) => (
          <div key={g.en} className="glossary-item">
            <strong>{g.en}</strong>
            <div className="ja">{g.ja}</div>
            {g.note && <div className="note">{g.note}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}
