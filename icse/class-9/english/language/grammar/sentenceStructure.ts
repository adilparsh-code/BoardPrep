import type { GrammarTopic } from "../../types";

export const sentenceStructure: GrammarTopic = {
  id: "icse-9-eng-lang-gram-17",
  title: "Sentence Structure",
  difficulty: "medium",
  learningObjective: "Distinguish and construct simple, compound, complex sentences.",
  concept: "Simple = 1 independent. Compound = 2+ independent. Complex = independent + dependent.",
  whyItMatters: "Variety improves composition; transformation tests each type.",
  rules: [
    "Simple: one subject-verb pair.",
    "Compound: two independent clauses joined by FANBOYS or semicolon.",
    "Complex: main + subordinate.",
    "Avoid comma splice.",
    "Vary lengths.",
  ],
  examples: {
    easy: [{ text: "She sang.", note: "Simple" }],
    medium: [{ text: "She sang, and the audience clapped.", note: "Compound" }],
    hard: [{ text: "Although she was nervous, she sang beautifully.", note: "Complex" }],
  },
  incorrectExamples: ["She sang, the audience clapped."],
  correctedExamples: [
    { incorrect: "She sang, the audience clapped.", corrected: "She sang, and the audience clapped.", explanation: "Comma splice." },
    { incorrect: "Being tired. He slept.", corrected: "Being tired, he slept.", explanation: "Fragment." },
  ],
  commonMistakes: ["Comma splice.", "Fragment.", "Overusing 'and'."],
  guidedPractice: [
    { question: "Identify: 'I waited, but he did not come.'", hint: "Two independent?", answer: "Compound", explanation: "Two independent clauses." },
  ],
  independentPractice: [
    { question: "Combine into complex: 'He studied hard. He wanted to win.'", answer: "He studied hard because he wanted to win.", explanation: "Adverb clause of reason." },
  ],
  examStyleQuestions: [
    { question: "Identify: 'When the bell rang, the students left.'", answer: "Complex", explanation: "Dependent + main." },
  ],
  quickRevision: {
    keyPoints: ["Simple=1, Compound=2+, Complex=ind+dep."],
    memoryTip: "Count independent clauses first.",
    examTip: "Vary sentence types.",
  },
};
