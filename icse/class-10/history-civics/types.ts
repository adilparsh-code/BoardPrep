export type Difficulty = "easy" | "medium" | "hard";
export type BloomLevel = "Remember" | "Understand" | "Apply" | "Analyse" | "Evaluate" | "Create";
export type QuestionType = "mcq" | "very-short" | "short" | "structured" | "long" | "analytical" | "hots";
export type Component = "Civics" | "History";
export type SourceType = "practice" | "board-style" | "PYQ" | "original";

export interface PracticeQuestion {
  question: string;
  hint?: string;
  answer: string;
  explanation: string;
}

export interface TimelineEvent {
  year: string;
  event: string;
  significance: string;
}

export interface KeyTerm {
  term: string;
  meaning: string;
}

export interface KeyFigure {
  name: string;
  role: string;
  contributions: string[];
}

export interface ChapterSection {
  id: string;
  title: string;
  explanation: string;
  keyPoints: string[];
  whyItMatters: string;
}

export interface ExamQuestion {
  type: QuestionType;
  marks: number;
  question: string;
  modelAnswerGuidance: string[];
}

export interface QuickRevision {
  keyPoints: string[];
  memoryTip: string;
  examTip: string;
}

export interface CivicsChapter {
  id: string;
  title: string;
  difficulty: Difficulty;
  learningObjective: string;
  overview: string;
  sections: ChapterSection[];
  keyTerms: KeyTerm[];
  keyInstitutions?: { name: string; composition: string; functions: string[]; powers: string[] }[];
  constitutionalBasis?: string[];
  practiceQuestions: PracticeQuestion[];
  examQuestions: ExamQuestion[];
  commonMistakes: string[];
  quickRevision: QuickRevision;
}

export interface HistoryChapter {
  id: string;
  title: string;
  difficulty: Difficulty;
  learningObjective: string;
  background: { period: string; context: string };
  timeline: TimelineEvent[];
  overview: string;
  sections: ChapterSection[];
  keyTerms: KeyTerm[];
  keyFigures?: KeyFigure[];
  causesAndConsequences?: { item: string; causes: string[]; consequences: string[] }[];
  practiceQuestions: PracticeQuestion[];
  examQuestions: ExamQuestion[];
  commonMistakes: string[];
  quickRevision: QuickRevision;
}

export interface QuestionMetadata {
  id: string;
  board: "ICSE";
  class: 10;
  subject: "History & Civics";
  component: Component;
  chapterId: string;
  topic: string;
  questionType: QuestionType;
  difficulty: Difficulty;
  marks: number;
  bloomLevel: BloomLevel;
  learningObjective: string;
  source: SourceType;
  year: number | null;
  question: string;
  options?: string[];
  hints: string[];
  answer: string;
  explanation: string;
  commonMistake: string;
}