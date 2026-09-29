export type Difficulty = "easy" | "medium" | "hard";
export type BloomLevel = "Remember" | "Understand" | "Apply" | "Analyse" | "Evaluate" | "Create";
export type QuestionType = "mcq" | "very-short" | "short" | "long" | "extract-based" | "grammar-transformation" | "comprehension" | "analytical" | "application" | "hots";
export type Component = "Language" | "Literature";
export type SourceType = "practice" | "board-style" | "PYQ" | "original";

export interface Example { text: string; note?: string; }
export interface MistakePair { incorrect: string; corrected: string; explanation: string; }
export interface PracticeQuestion { question: string; hint?: string; answer: string; explanation: string; }

export interface GrammarTopic {
  id: string;
  title: string;
  difficulty: Difficulty;
  learningObjective: string;
  concept: string;
  whyItMatters: string;
  rules: string[];
  examples: { easy: Example[]; medium: Example[]; hard: Example[]; };
  incorrectExamples: string[];
  correctedExamples: MistakePair[];
  commonMistakes: string[];
  guidedPractice: PracticeQuestion[];
  independentPractice: PracticeQuestion[];
  examStyleQuestions: PracticeQuestion[];
  quickRevision: { keyPoints: string[]; memoryTip: string; examTip: string; };
}

export interface CompositionTopic {
  id: string;
  title: string;
  difficulty: Difficulty;
  learningObjective: string;
  whatItIs: string;
  whyItMatters: string;
  thinkingFramework: string[];
  structure: { section: string; purpose: string; wordCountGuide: string; }[];
  vocabularyBank: string[];
  paragraphDevelopment: string[];
  modelResponse: string;
  weakResponse: string;
  improvedResponse: string;
  commonMistakes: MistakePair[];
  examinerChecklist: string[];
  practiceQuestions: PracticeQuestion[];
  quickRevision: { keyPoints: string[]; memoryTip: string; examTip: string; };
}

export interface ComprehensionSkill {
  id: string;
  title: string;
  difficulty: Difficulty;
  learningObjective: string;
  whatItIs: string;
  howToDoIt: string[];
  workedExample: { passage: string; question: string; thinking: string[]; answer: string; };
  commonMistakes: string[];
  practice: PracticeQuestion[];
}

export interface ComprehensionPassage {
  id: string;
  title: string;
  difficulty: Difficulty;
  wordCount: number;
  passage: string;
  questions: PracticeQuestion[];
  summaryTask: string;
  modelSummary: string;
}

export interface LiteratureModule {
  id: string;
  title: string;
  author: string;
  genre: "prose" | "poetry" | "drama";
  difficulty: Difficulty;
  learningObjective: string;
  background: { author: string; context: string; setting: string; };
  vocabulary: { word: string; meaning: string }[];
  overview: string;
  sections: { id: string; title: string; whatHappens: string; whatItMeans: string; whyItMatters: string; keyDetails: string[]; }[];
  characters?: { name: string; introduction: string; personality: string; motivations: string; importantActions: string[]; development: string; evidence: string[]; examAngles: string[]; }[];
  themes: { theme: string; evidence: string; explanation: string; significance: string; }[];
  literaryDevices: { device: string; definition: string; example: string; effect: string; whyUsed: string; }[];
  extracts: { id: string; context: string; speaker?: string; situation: string; meaning: string; significance: string; likelyQuestions: PracticeQuestion[]; }[];
  thinkingQuestions: string[];
  examQuestions: { type: QuestionType; marks: number; question: string; modelAnswerGuidance: string[]; }[];
  commonMistakes: string[];
  quickRevision: { keyPoints: string[]; keyVocabulary: string[]; examPoints: string[]; selfTest: string[]; };
}

export interface QuestionMetadata {
  id: string;
  board: "ICSE";
  class: 9;
  subject: "English";
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
