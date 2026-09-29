import type { QuestionMetadata } from "../types";

export const compositionQuestions: QuestionMetadata[] = [
  {
    id: "icse-9-eng-q-comp-001",
    board: "ICSE", class: 9, subject: "English", component: "Language",
    chapterId: "icse-9-eng-lang-comp-03", topic: "Narrative Composition",
    questionType: "long", difficulty: "medium", marks: 20, bloomLevel: "Create",
    learningObjective: "Write a narrative with clear arc and reflection.",
    source: "original", year: null,
    question: "Narrate an incident when you helped someone in need.",
    hints: ["Plan: setting, incident, reaction, reflection."],
    answer: "Structure: Exposition → Rising Action → Climax → Resolution + Reflection.",
    explanation: "Marks for content, expression, vocabulary, grammar.",
    commonMistake: "Starting too early; forgetting reflection.",
  },
  {
    id: "icse-9-eng-q-comp-002",
    board: "ICSE", class: 9, subject: "English", component: "Language",
    chapterId: "icse-9-eng-lang-comp-04", topic: "Argumentative Composition",
    questionType: "long", difficulty: "hard", marks: 20, bloomLevel: "Evaluate",
    learningObjective: "Argue a clear position with evidence and rebuttal.",
    source: "original", year: null,
    question: "Cinema both entertains and educates the masses. Express your views for or against.",
    hints: ["Position → reasons → counter → conclusion."],
    answer: "Structure: Clear position → PEE paragraphs → Counter + rebuttal → Firm conclusion.",
    explanation: "Formal register; measured tone.",
    commonMistake: "No clear position; ignoring counter-argument.",
  },
];
