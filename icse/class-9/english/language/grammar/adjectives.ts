import type { GrammarTopic } from "../../types";

export const adjectives: GrammarTopic = {
  id: "icse-9-eng-lang-gram-08",
  title: "Adjectives",
  difficulty: "easy",
  learningObjective: "Identify and use adjectives, including order and comparison.",
  concept: "Adjectives describe or limit nouns. They answer: Which one? What kind? How many?",
  whyItMatters: "ICSE tests adjective order and comparison.",
  rules: [
    "Order: Opinion → Size → Age → Shape → Colour → Origin → Material → Purpose.",
    "Comparative (-er/more) for two. Superlative (-est/most) for three or more.",
    "Irregular: good/better/best, bad/worse/worst.",
    "Never double-compare.",
    "Participial adjectives: interesting vs interested.",
  ],
  examples: {
    easy: [{ text: "A red apple.", note: "Colour" }],
    medium: [{ text: "A beautiful old Italian painting.", note: "Opinion → age → origin" }],
    hard: [{ text: "She is more intelligent than her brother.", note: "Comparative" }],
  },
  incorrectExamples: ["She is more taller than him.", "This is a wooden beautiful old table."],
  correctedExamples: [
    { incorrect: "She is more taller than him.", corrected: "She is taller than him.", explanation: "No double compare." },
    { incorrect: "This is a wooden beautiful old table.", corrected: "This is a beautiful old wooden table.", explanation: "Order matters." },
    { incorrect: "I am boring in this class.", corrected: "I am bored in this class.", explanation: "-ed for feeling." },
  ],
  commonMistakes: ["Double comparative.", "Wrong order.", "-ed vs -ing."],
  guidedPractice: [
    { question: "Fill in: 'This is the ______ (good) film I have seen.'", hint: "Superlative of good.", answer: "best", explanation: "Irregular." },
  ],
  independentPractice: [
    { question: "Arrange: 'a / old / charming / French / house'.", answer: "a charming old French house", explanation: "Opinion → age → origin." },
  ],
  examStyleQuestions: [
    { question: "Correct: 'Of the two brothers, he is the tallest.'", answer: "Of the two brothers, he is the taller.", explanation: "Comparative for two." },
  ],
  quickRevision: {
    keyPoints: ["Order: OSASCOMP.", "Comparative for two; superlative for 3+."],
    memoryTip: "OSASCOMP.",
    examTip: "Check for double comparatives.",
  },
};
