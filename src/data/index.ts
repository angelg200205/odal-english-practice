import glossaryJson from './glossary.json';
import scenariosJson from './scenarios.json';
import topicsJson from './topics.json';
import type { GlossaryEntry, Scenario, Topic } from '../types';

export const topics = (topicsJson as Topic[]).slice().sort((a, b) => a.order - b.order);
export const scenarios = scenariosJson as Scenario[];
export const glossary = glossaryJson as GlossaryEntry[];

export function getScenario(id: string): Scenario | undefined {
  return scenarios.find((s) => s.id === id);
}

export function scenariosForTopic(topicId: string): Scenario[] {
  return scenarios.filter((s) => s.topicId === topicId);
}
