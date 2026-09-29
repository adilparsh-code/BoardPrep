import type { GrammarTopic } from "../../types";

export const adverbs: GrammarTopic = {
  id: "icse-9-eng-lang-gram-09",
  title: "Adverbs",
  difficulty: "easy",
  learningObjective: "Identify and use adverbs of manner, time, place, frequency, degree.",
  concept: "Adverbs describe verbs, adjectives, or other adverbs.",
  whyItMatters: "Improves composition style; appears in error correction.",
  rules: [
    "Manner: quickly, softly, well.",
    "Time: now, yesterday, soon.",
    "Place: here, there, everywhere.",
    "Frequency: always, often, sometimes, rarely, never.",
    "Degree: very, quite, extremely, too.",
    "Adjective + -ly = adverb (most cases). Exceptions: fast, hard, late.",
  ],
  examples: {
    easy: [
      { text: "She sings beautifully.", note: "Manner" },
      { text: "I will meet you tomorrow.", note: "Time" },
    ],
    medium: [{ text: "He always arrives on time.", note: "Frequency before main verb" }],
    hard: [{ text: "Fortunately, no one was hurt.", note: "Sentence adverb" }],
  },
  incorrectExamples: ["She sings good.", "He works very hardly."],
  correctedExamples: [
    { incorrect: "She sings good.", corrected: "She sings well.", explanation: "Adverb needed." },
    { incorrect: "He works very hardly.", corrected: "He works very hard.", explanation: "hardly = scarcely." },
  ],
  commonMistakes: ["Adjective where adverb needed.", "hard vs hardly."],
  guidedPractice: [
    { question: "Fill in: 'She speaks English ______ (fluent).'", hint: "Modifies 'speaks'.", answer: "fluently", explanation: "Adjective + -ly." },
  ],
  independentPractice: [
    { question: "Rewrite: 'He goes to the gym (always).'", answer: "He always goes to the gym.", explanation: "Frequency before main verb." },
  ],
  examStyleQuestions: [
    { question: "Correct: 'She did the work good.'", answer: "She did the work well.", explanation: "Adverb of manner." },
  ],
  quickRevision: {
    keyPoints: ["Adverbs modify verbs/adjectives/adverbs.", "hard vs hardly."],
    memoryTip: "HOW, WHEN, WHERE, HOW OFTEN, TO WHAT EXTENT.",
    examTip: "Place adverbs naturally.",
  },
};
