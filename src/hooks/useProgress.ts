import { useCallback, useEffect, useState } from 'react';
import type { ProgressState } from '../types';

const STORAGE_KEY = 'odal-staff-english-progress-v1';

const empty: ProgressState = {
  completedScenarios: [],
  exerciseResults: {},
};

function readProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return empty;
    const parsed = JSON.parse(raw) as ProgressState;
    return {
      completedScenarios: parsed.completedScenarios ?? [],
      exerciseResults: parsed.exerciseResults ?? {},
      lastVisitedScenarioId: parsed.lastVisitedScenarioId,
    };
  } catch {
    return empty;
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>(empty);

  useEffect(() => {
    setProgress(readProgress());
  }, []);

  const persist = useCallback((next: ProgressState) => {
    setProgress(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  const markExercise = useCallback(
    (exerciseId: string, correct: boolean, scenarioId: string, allExerciseIds: string[]) => {
      setProgress((prev) => {
        const exerciseResults = { ...prev.exerciseResults, [exerciseId]: correct };
        const done = allExerciseIds.every((id) => exerciseResults[id] === true);
        const completedScenarios = done
          ? Array.from(new Set([...prev.completedScenarios, scenarioId]))
          : prev.completedScenarios.filter((id) => id !== scenarioId);
        const next = {
          ...prev,
          exerciseResults,
          completedScenarios,
          lastVisitedScenarioId: scenarioId,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
      });
    },
    [],
  );

  const visitScenario = useCallback(
    (scenarioId: string) => {
      persist({ ...readProgress(), lastVisitedScenarioId: scenarioId });
    },
    [persist],
  );

  const resetProgress = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setProgress(empty);
  }, []);

  return { progress, markExercise, visitScenario, resetProgress, storageKey: STORAGE_KEY };
}
