export type TopicId =
  | 'booking'
  | 'airport-shuttle'
  | 'counter-checkin'
  | 'insurance-noc'
  | 'free-items'
  | 'car-inspection'
  | 'driving-tips'
  | 'fuel-return'
  | 'accidents'
  | 'cancellations'
  | 'special-situations';

export type Speaker = 'staff' | 'customer';

export interface DialogueLine {
  speaker: Speaker;
  text: string;
  hints?: { word: string; ja: string }[];
}

export interface FillBlankExercise {
  id: string;
  type: 'fillBlank';
  prompt: string;
  sentence: string;
  blanks: string[];
  explanation: string;
}

export interface MultipleChoiceExercise {
  id: string;
  type: 'multipleChoice';
  prompt: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
}

export interface SentenceOrderExercise {
  id: string;
  type: 'sentenceOrder';
  prompt: string;
  words: string[];
  correctOrder: string[];
  explanation: string;
}

export interface PoliteChoiceExercise {
  id: string;
  type: 'politeChoice';
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export type Exercise =
  | FillBlankExercise
  | MultipleChoiceExercise
  | SentenceOrderExercise
  | PoliteChoiceExercise;

export interface Scenario {
  id: string;
  title: string;
  topicId: TopicId;
  grammarFocus: string;
  summary: string;
  dialogue: DialogueLine[];
  exercises: Exercise[];
}

export interface Topic {
  id: TopicId;
  title: string;
  blurb: string;
  order: number;
}

export interface GlossaryEntry {
  en: string;
  ja: string;
  note?: string;
}

export interface ProgressState {
  completedScenarios: string[];
  exerciseResults: Record<string, boolean>;
  lastVisitedScenarioId?: string;
}
