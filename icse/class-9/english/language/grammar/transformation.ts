import type { GrammarTopic } from "../../types";

export const transformation: GrammarTopic = {
  id: "icse-9-eng-lang-gram-12",
  title: "Transformation of Sentences",
  difficulty: "hard",
  learningObjective: "Transform sentences without changing meaning.",
  concept: "Rewrite in different form (simple/compound/complex, degrees, affirmative/negative) with same meaning.",
  whyItMatters: "Hardest ICSE grammar questions test control over structure.",
  rules: [
    "Simple ↔ Compound ↔ Complex: use conjunctions.",
    "Positive ↔ Comparative ↔ Superlative: preserve comparison.",
    "Affirmative ↔ Negative: opposite word.",
    "Too...to ↔ So...that...not.",
  ],
  examples: {
    easy: [{ text: "Affirmative: He is honest.", note: "Negative: He is not dishonest." }],
    medium: [{ text: "Simple: Being tired, he slept.", note: "Compound: He was tired, so he slept." }],
    hard: [{ text: "Positive: No other boy in class is as tall as Ravi.", note: "Superlative: Ravi is the tallest boy in class." }],
  },
  incorrectExamples: ["He is too weak that he cannot walk.", "He is the most tallest boy."],
  correctedExamples: [
    { incorrect: "He is too weak that he cannot walk.", corrected: "He is so weak that he cannot walk.", explanation: "too...to vs so...that." },
    { incorrect: "He is the most tallest boy.", corrected: "He is the tallest boy.", explanation: "No double superlative." },
  ],
  commonMistakes: ["Meaning changes.", "too...to vs so...that mix."],
  guidedPractice: [
    { question: "Transform: 'He worked hard. He passed.'", hint: "Use 'because'.", answer: "Because he worked hard, he passed.", explanation: "Simple → complex." },
  ],
  independentPractice: [
    { question: "Transform: 'Ravi is the strongest boy in class.' (to comparative)", answer: "Ravi is stronger than any other boy in class.", explanation: "Superlative → comparative." },
  ],
  examStyleQuestions: [
    { question: "Transform: 'The coffee was too hot to drink.'", answer: "The coffee was so hot that it could not be drunk.", explanation: "too...to → so...that...not." },
  ],
  quickRevision: {
    keyPoints: ["Meaning preserved.", "Pattern for each type."],
    memoryTip: "Same meaning, different shape.",
    examTip: "Read both versions after transforming.",
  },
};
