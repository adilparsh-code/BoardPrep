import type { GrammarTopic } from "../../types";

export const clauses: GrammarTopic = {
  id: "icse-9-eng-lang-gram-15",
  title: "Clauses",
  difficulty: "medium",
  learningObjective: "Identify independent/dependent clauses and classify as noun/adjective/adverb.",
  concept: "Clause has subject-verb pair. Independent can stand alone. Dependent cannot.",
  whyItMatters: "Essential for sentence-structure questions and complex sentences.",
  rules: [
    "Independent: complete thought.",
    "Dependent: incomplete; needs main clause.",
    "Noun clause: acts as noun.",
    "Adjective clause: describes noun.",
    "Adverb clause: modifies verb/adjective/adverb.",
  ],
  examples: {
    easy: [{ text: "I know that he is honest.", note: "Noun clause" }],
    medium: [{ text: "The book which I bought is expensive.", note: "Adjective clause" }],
    hard: [{ text: "Although he was tired, he kept working.", note: "Adverb clause" }],
  },
  incorrectExamples: ["Because I was late."],
  correctedExamples: [
    { incorrect: "Because I was late.", corrected: "Because I was late, I missed the bus.", explanation: "Dependent needs main." },
  ],
  commonMistakes: ["Fragments.", "Misidentifying adjective/adverb."],
  guidedPractice: [
    { question: "Identify: 'I do not know where he lives.'", hint: "Function of 'where he lives'?", answer: "Noun clause", explanation: "Object of 'know'." },
  ],
  independentPractice: [
    { question: "Identify: 'The house where I was born is old.'", answer: "Adjective clause", explanation: "Describes 'house'." },
  ],
  examStyleQuestions: [
    { question: "Combine with adverb clause: 'He was ill. He attended the class.'", answer: "Although he was ill, he attended the class.", explanation: "Concession." },
  ],
  quickRevision: {
    keyPoints: ["Independent can stand alone.", "Three types: noun, adj, adv."],
    memoryTip: "Independent = alone.",
    examTip: "Every sentence needs one independent clause.",
  },
};
