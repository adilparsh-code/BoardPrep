import type { GrammarTopic } from "../../types";

export const partsOfSpeech: GrammarTopic = {
  id: "icse-9-eng-lang-gram-01",
  title: "Parts of Speech",
  difficulty: "easy",
  learningObjective: "Identify the eight parts of speech and explain the role each word plays in a sentence.",
  concept: "Every word in English belongs to a category based on the job it does. These categories are called parts of speech. The same word can change its part of speech depending on how it is used.",
  whyItMatters: "ICSE grammar questions often ask you to identify a word's function. If you know parts of speech, you can answer transformation, error-correction and sentence-structure questions correctly.",
  rules: [
    "Noun — names a person, place, thing, or idea. (Ravi, Delhi, honesty)",
    "Pronoun — replaces a noun. (he, she, it, they)",
    "Verb — shows action or state of being. (run, is, seems)",
    "Adjective — describes a noun or pronoun. (tall, blue, three)",
    "Adverb — describes a verb, adjective, or another adverb. (quickly, very, yesterday)",
    "Preposition — shows relation of a noun to another word. (in, on, under)",
    "Conjunction — joins words, phrases, or clauses. (and, but, because)",
    "Interjection — shows sudden feeling. (Oh! Alas! Wow!)",
  ],
  examples: {
    easy: [
      { text: "The dog barked.", note: "dog = noun, barked = verb" },
      { text: "She is happy.", note: "She = pronoun, is = verb, happy = adjective" },
    ],
    medium: [
      { text: "Oh! The little boy ran quickly into the garden.", note: "Oh = interjection, little = adjective, quickly = adverb, into = preposition" },
    ],
    hard: [
      { text: "Because the rain was heavy, we waited under the old tree.", note: "Because = conjunction, heavy = adjective, under = preposition" },
    ],
  },
  incorrectExamples: [
    "In 'Ravi runs fast', 'fast' is an adjective. (It describes 'runs', a verb, so it is an adverb.)",
  ],
  correctedExamples: [
    { incorrect: "In 'He sings well', 'well' is an adjective.", corrected: "In 'He sings well', 'well' is an adverb.", explanation: "It describes the verb 'sings', not a noun." },
    { incorrect: "In 'This is my book', 'this' is a pronoun.", corrected: "In 'This is my book', 'this' is a demonstrative adjective.", explanation: "It modifies the noun 'book'." },
  ],
  commonMistakes: [
    "Confusing adjectives with adverbs.",
    "Assuming a word's part of speech is fixed.",
    "Forgetting interjections.",
  ],
  guidedPractice: [
    { question: "Identify the part of speech of 'beautifully' in: 'She sang beautifully.'", hint: "What does it describe — a noun or a verb?", answer: "Adverb", explanation: "It describes the verb 'sang'." },
  ],
  independentPractice: [
    { question: "Identify the parts of speech of every word in: 'Alas! The tiny bird flew away quickly.'", answer: "Alas=interjection, The=article, tiny=adjective, bird=noun, flew=verb, away=adverb, quickly=adverb.", explanation: "Each word has a specific function." },
  ],
  examStyleQuestions: [
    { question: "In 'The old man walked slowly across the narrow bridge', identify the part of speech of 'slowly' and 'across'.", answer: "slowly = adverb; across = preposition.", explanation: "slowly describes 'walked'; across shows relation." },
  ],
  quickRevision: {
    keyPoints: ["Eight parts of speech.", "Function, not form, decides part of speech."],
    memoryTip: "NPV AAP CI.",
    examTip: "Ask what job the word is doing in THIS sentence.",
  },
};
