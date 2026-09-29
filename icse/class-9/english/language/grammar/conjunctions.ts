import type { GrammarTopic } from "../../types";

export const conjunctions: GrammarTopic = {
  id: "icse-9-eng-lang-gram-06",
  title: "Conjunctions",
  difficulty: "easy",
  learningObjective: "Use coordinating, subordinating and correlative conjunctions.",
  concept: "Conjunctions join words, phrases, or clauses.",
  whyItMatters: "Explicitly named in CISCE Language syllabus.",
  rules: [
    "Coordinating: for, and, nor, but, or, yet, so (FANBOYS).",
    "Subordinating: because, although, if, since, while, when, unless, until.",
    "Correlative: either...or, neither...nor, both...and, not only...but also.",
    "Never use 'although' with 'but'.",
  ],
  examples: {
    easy: [
      { text: "I like tea and coffee.", note: "Coordinating" },
      { text: "He was tired, so he slept.", note: "Coordinating" },
    ],
    medium: [
      { text: "Although it was raining, we went out.", note: "Subordinating" },
    ],
    hard: [
      { text: "Not only did he apologise, but he also offered to pay.", note: "Correlative with inversion" },
    ],
  },
  incorrectExamples: ["Although he was tired, but he kept working.", "Neither he nor she are coming."],
  correctedExamples: [
    { incorrect: "Although he was tired, but he kept working.", corrected: "Although he was tired, he kept working.", explanation: "Never both." },
    { incorrect: "Neither he nor she are coming.", corrected: "Neither he nor she is coming.", explanation: "Agrees with nearer subject." },
  ],
  commonMistakes: ["Double conjunctions.", "Wrong verb with 'neither...nor'."],
  guidedPractice: [
    { question: "Combine: 'He is poor. He is honest.' using 'although'.", hint: "Contrast clause first.", answer: "Although he is poor, he is honest.", explanation: "Subordinating conjunction." },
  ],
  independentPractice: [
    { question: "Fill in: 'She studied hard, ______ she passed with distinction.'", answer: "so", explanation: "Result." },
  ],
  examStyleQuestions: [
    { question: "Combine with 'not only...but also': 'He sings well. He dances well.'", answer: "He not only sings well but also dances well.", explanation: "Correlative." },
  ],
  quickRevision: {
    keyPoints: ["FANBOYS.", "Never although + but."],
    memoryTip: "One conjunction per contrast.",
    examTip: "Check parallel structure.",
  },
};
