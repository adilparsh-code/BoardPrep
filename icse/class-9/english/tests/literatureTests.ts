import type { QuestionMetadata } from "../types";

export const literatureTest1: QuestionMetadata[] = [
  {
    id: "icse-9-eng-test-lit-001",
    board: "ICSE", class: 9, subject: "English", component: "Literature",
    chapterId: "icse-9-eng-lit-drama-01", topic: "Julius Caesar",
    questionType: "extract-based", difficulty: "hard", marks: 6, bloomLevel: "Analyse",
    learningObjective: "Analyse extract from Act II.",
    source: "board-style", year: null,
    question: "Read the given extract from Act II, Scene 1, and answer: (a) Who is the speaker? (b) What is the context? (c) Why is this moment significant?",
    hints: ["Soliloquy in the orchard."],
    answer: "(a) Brutus. (b) He is alone, deciding Caesar must die. (c) It is the moral turning point where Brutus commits to the conspiracy.",
    explanation: "Extract analysis with contextual understanding.",
    commonMistake: "Failing to connect to larger themes.",
  },
  {
    id: "icse-9-eng-test-lit-002",
    board: "ICSE", class: 9, subject: "English", component: "Literature",
    chapterId: "icse-9-eng-lit-prose-01-04", topic: "The Home-coming",
    questionType: "analytical", difficulty: "hard", marks: 6, bloomLevel: "Analyse",
    learningObjective: "Analyse emotional neglect.",
    source: "board-style", year: null,
    question: "How does Tagore present the theme of emotional neglect in 'The Home-coming'?",
    hints: ["Cite family dynamics; Calcutta loneliness; deathbed scene."],
    answer: "Through Phatik's misunderstanding by his mother, his loneliness in Calcutta, and his deathbed longing, Tagore shows neglect's fatal consequences.",
    explanation: "Multi-layered analysis.",
    commonMistake: "Blaming only one family member.",
  },
];

export const literatureTests = [literatureTest1];
