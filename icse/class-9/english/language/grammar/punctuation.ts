import type { GrammarTopic } from "../../types";

export const punctuation: GrammarTopic = {
  id: "icse-9-eng-lang-gram-14",
  title: "Punctuation",
  difficulty: "easy",
  learningObjective: "Use full stops, commas, semicolons, colons, apostrophes, quotes, capitals correctly.",
  concept: "Punctuation signals structure, meaning, tone.",
  whyItMatters: "Composition marks include punctuation correctness.",
  rules: [
    "Full stop ends statements.",
    "Comma separates items/phrases/clauses.",
    "Semicolon joins related independent clauses.",
    "Colon introduces list/explanation/quote.",
    "Apostrophe shows possession/contraction.",
    "Quotes enclose direct speech.",
    "Capitalize sentence starts, proper nouns, 'I'.",
  ],
  examples: {
    easy: [{ text: "Ravi, Sita and Meena went to the market.", note: "List commas" }],
    medium: [{ text: "He was tired; he went to bed early.", note: "Semicolon" }],
    hard: [{ text: "She said, \"I'll be there by 6 p.m.\"", note: "Direct speech" }],
  },
  incorrectExamples: ["its a beautiful day.", "The boys book."],
  correctedExamples: [
    { incorrect: "its a beautiful day.", corrected: "It's a beautiful day.", explanation: "it's = it is." },
    { incorrect: "The boys book.", corrected: "The boy's book.", explanation: "Possessive." },
  ],
  commonMistakes: ["its vs it's.", "Wrong apostrophe for plural possessive.", "Comma splice."],
  guidedPractice: [
    { question: "Punctuate: 'what are you doing here'", hint: "Question.", answer: "What are you doing here?", explanation: "Capital + question mark." },
  ],
  independentPractice: [
    { question: "Punctuate: 'the teachers notes were on the table'", answer: "The teacher's notes were on the table.", explanation: "Possessive." },
  ],
  examStyleQuestions: [
    { question: "Correct: 'Its raining, isnt it.'", answer: "It's raining, isn't it?", explanation: "Contraction + question mark." },
  ],
  quickRevision: {
    keyPoints: ["Apostrophe: possession vs contraction.", "Comma splice error."],
    memoryTip: "Read aloud — punctuation mirrors speech.",
    examTip: "Compositions lose easy marks here.",
  },
};
