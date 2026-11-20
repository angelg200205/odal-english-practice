import glossaryJson from './glossary.json';
import scenariosJson from './scenarios.json';
import topicsJson from './topics.json';
import classConfigJson from './class-config.json';
import roleplayPairsJson from './roleplay-pairs.json';
import problemCustomersJson from './problem-customers.json';
import type {
  ClassConfig,
  GlossaryEntry,
  ProblemCustomer,
  RoleplayPair,
  Scenario,
  Topic,
} from '../types';

export const topics = (topicsJson as Topic[]).slice().sort((a, b) => a.order - b.order);
export const scenarios = scenariosJson as Scenario[];
export const glossary = glossaryJson as GlossaryEntry[];
export const classConfig = classConfigJson as ClassConfig;
export const roleplayPairs = roleplayPairsJson as RoleplayPair[];
export const problemCustomers = problemCustomersJson as ProblemCustomer[];

export function getScenario(id: string): Scenario | undefined {
  return scenarios.find((s) => s.id === id);
}

export function scenariosForTopic(topicId: string): Scenario[] {
  return scenarios.filter((s) => s.topicId === topicId);
}

export function getRoleplayPair(index: number): RoleplayPair | undefined {
  return roleplayPairs[index];
}

export function findRoleplayIndex(id: string): number {
  return roleplayPairs.findIndex((p) => p.id === id);
}
