import type { QuestionMetadata } from "../types";

export const languageTest1: QuestionMetadata[] = [
  {
    id: "icse-9-eng-test-lang-001",
    board: "ICSE", class: 9, subject: "English", component: "Language",
    chapterId: "icse-9-eng-lang-gram-02", topic: "Tenses",
    questionType: "mcq", difficulty: "medium", marks: 1, bloomLevel: "Apply",
    learningObjective: "Choose correct tense.",
    source: "board-style", year: null,
    question: "She ______ here since 2020.",
    options: ["lives", "is living", "has been living", "lived"],
    hints: ["'Since' + continuing action."],
    answer: "has been living",
    explanation: "Present perfect continuous with 'since'.",
    commonMistake: "Choosing 'lives' (simple present).",
  },
  {
    id: "icse-9-eng-test-lang-002",
    board: "ICSE", class: 9, subject: "English", component: "Language",
    chapterId: "icse-9-eng-lang-gram-10", topic: "Voice",
    questionType: "grammar-transformation", difficulty: "medium", marks: 2, bloomLevel: "Apply",
    learningObjective: "Convert to passive.",
    source: "board-style", year: null,
    question: "Change to passive: 'Someone has stolen my bicycle.'",
    hints: ["Agent unknown."],
    answer: "My bicycle has been stolen.",
    explanation: "Present perfect passive.",
    commonMistake: "Keeping 'by someone' unnecessarily.",
  },
  {
    id: "icse-9-eng-test-lang-003",
    board: "ICSE", class: 9, subject: "English", component: "Language",
    chapterId: "icse-9-eng-lang-comp-02", topic: "Comprehension",
    questionType: "comprehension", difficulty: "medium", marks: 5, bloomLevel: "Understand",
    learningObjective: "Identify central idea.",
    source: "board-style", year: null,
    question: "Read the passage and identify the central idea in one sentence.",
    hints: ["Focus on the main argument."],
    answer: "Student's own phrasing of the passage's central claim.",
    explanation: "Depends on passage.",
    commonMistake: "Copying a detail rather than the main idea.",
  },
];

export const languageTests = [languageTest1];
