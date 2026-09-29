import type { QuestionMetadata } from "../types";

export const comprehensionQuestions: QuestionMetadata[] = [
  {
    id: "icse-9-eng-q-comp-101",
    board: "ICSE", class: 9, subject: "English", component: "Language",
    chapterId: "icse-9-eng-lang-comp-02-p01", topic: "Comprehension — The Vanishing Sparrows",
    questionType: "comprehension", difficulty: "medium", marks: 4, bloomLevel: "Analyse",
    learningObjective: "Identify central idea and inference.",
    source: "original", year: null,
    question: "What does the writer mean by 'cities belong to all species'?",
    hints: ["Consider the deeper point about urban wildlife."],
    answer: "Urban spaces must accommodate wildlife, not just humans; the sparrow's decline signals a failure to do so.",
    explanation: "Inference based on the concluding paragraph.",
    commonMistake: "Repeating the sentence without interpreting.",
  },
];
