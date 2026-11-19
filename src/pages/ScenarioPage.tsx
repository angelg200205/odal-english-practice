import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getScenario, topics } from '../data';
import { DialogueBox } from '../components/DialogueBox';
import { ExerciseCard } from '../components/ExerciseCard';
import { useProgress } from '../hooks/useProgress';

export function ScenarioPage() {
  const { id = '' } = useParams();
  const scenario = getScenario(id);
  const { progress, markExercise, visitScenario } = useProgress();

  useEffect(() => {
    if (scenario) visitScenario(scenario.id);
  }, [scenario, visitScenario]);

  if (!scenario) {
    return (
      <section className="section">
        <h2>Scenario not found</h2>
        <Link to="/practice">Back to practice</Link>
      </section>
    );
  }

  const topic = topics.find((t) => t.id === scenario.topicId);
  const exerciseIds = scenario.exercises.map((e) => e.id);

  return (
    <section className="section stack-gap">
      <div>
        <Link className="muted" to={topic ? `/practice?topic=${topic.id}` : '/practice'}>
          ← {topic?.title ?? 'Practice'}
        </Link>
        <h2 style={{ marginTop: '0.4rem' }}>{scenario.title}</h2>
        <p>{scenario.summary}</p>
        <div className="meta-row">
          <span className="chip">Grammar: {scenario.grammarFocus}</span>
        </div>
      </div>

      <div className="panel">
        <h3 style={{ marginTop: 0, fontFamily: 'var(--font-display)' }}>Model dialogue</h3>
        <DialogueBox lines={scenario.dialogue} />
      </div>

      <div className="panel">
        <h3 style={{ marginTop: 0, fontFamily: 'var(--font-display)' }}>Exercises</h3>
        {scenario.exercises.map((ex) => (
          <ExerciseCard
            key={ex.id}
            exercise={ex}
            savedCorrect={progress.exerciseResults[ex.id]}
            onResult={(exerciseId, correct) => markExercise(exerciseId, correct, scenario.id, exerciseIds)}
          />
        ))}
      </div>
    </section>
  );
}
