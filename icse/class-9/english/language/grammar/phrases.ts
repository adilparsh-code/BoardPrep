import type { GrammarTopic } from "../../types";

export const phrases: GrammarTopic = {
  id: "icse-9-eng-lang-gram-16",
  title: "Phrases",
  difficulty: "medium",
  learningObjective: "Identify noun, verb, adjective, adverb, prepositional phrases.",
  concept: "Phrase = words without subject-verb. Different phrases do different jobs.",
  whyItMatters: "Recognising phrases helps sentence variety.",
  rules: [
    "Noun phrase: acts as noun.",
    "Verb phrase: main + helping.",
    "Adjective phrase: describes noun.",
    "Adverb phrase: describes verb.",
    "Prepositional phrase: begins with preposition.",
  ],
  examples: {
    easy: [{ text: "The little girl smiled.", note: "Noun phrase" }],
    medium: [{ text: "He spoke with great confidence.", note: "Adverb phrase" }],
    hard: [{ text: "The house on the hill is old.", note: "Prepositional phrase acting as adjective" }],
  },
  incorrectExamples: ["'On the table' is a clause."],
  correctedExamples: [
    { incorrect: "'On the table' is a clause.", corrected: "'On the table' is a prepositional phrase.", explanation: "No subject-verb." },
  ],
  commonMistakes: ["Confusing phrase with clause."],
  guidedPractice: [
    { question: "Identify: 'She is full of energy.'", hint: "What does it describe?", answer: "Adjective phrase", explanation: "Describes 'she'." },
  ],
  independentPractice: [
    { question: "Identify: 'He ran with great speed.'", answer: "Adverb phrase", explanation: "Modifies 'ran'." },
  ],
  examStyleQuestions: [
    { question: "Underline noun phrase: 'The boy with the bag left.'", answer: "The boy with the bag", explanation: "Subject." },
  ],
  quickRevision: {
    keyPoints: ["Phrase ≠ clause.", "Four functions."],
    memoryTip: "No subject-verb → phrase.",
    examTip: "Phrases add detail.",
  },
};
