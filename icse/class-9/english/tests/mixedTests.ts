import type { QuestionMetadata } from "../types";

export const mixedTest1: QuestionMetadata[] = [
  {
    id: "icse-9-eng-test-mix-001",
    board: "ICSE", class: 9, subject: "English", component: "Language",
    chapterId: "icse-9-eng-lang-comp-03", topic: "Composition",
    questionType: "long", difficulty: "medium", marks: 20, bloomLevel: "Create",
    learningObjective: "Write narrative composition.",
    source: "board-style", year: null,
    question: "Narrate an incident that taught you the value of patience.",
    hints: ["Arc + reflection."],
    answer: "Structure with clear arc and reflection on insight gained.",
    explanation: "Marks: content, expression, vocabulary, grammar.",
    commonMistake: "Weak reflection; starting too early.",
  },
  {
    id: "icse-9-eng-test-mix-002",
    board: "ICSE", class: 9, subject: "English", component: "Literature",
    chapterId: "icse-9-eng-lit-poetry-01-03", topic: "I Remember, I Remember",
    questionType: "analytical", difficulty: "medium", marks: 6, bloomLevel: "Analyse",
    learningObjective: "Analyse nostalgia.",
    source: "board-style", year: null,
    question: "How does Hood use repetition in 'I Remember, I Remember'?",
    hints: ["'I remember, I remember'."],
    answer: "Repetition creates nostalgic rhythm and emphasises the speaker's dwelling on memory.",
    explanation: "Poetic device analysis.",
    commonMistake: "Treating poem as purely happy.",
  },
];

export const mixedTests = [mixedTest1];
