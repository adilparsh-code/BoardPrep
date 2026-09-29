import type { GrammarTopic } from "../../types";

export const pronouns: GrammarTopic = {
  id: "icse-9-eng-lang-gram-07",
  title: "Pronouns",
  difficulty: "easy",
  learningObjective: "Use personal, possessive, reflexive, relative, and demonstrative pronouns correctly.",
  concept: "Pronouns replace nouns. Different pronouns do different jobs.",
  whyItMatters: "ICSE tests pronouns in error correction and comprehension reference questions.",
  rules: [
    "Subject: I, you, he, she, it, we, they.",
    "Object: me, you, him, her, it, us, them.",
    "Possessive adj: my, your, his, her, its, our, their.",
    "Possessive: mine, yours, his, hers, its, ours, theirs.",
    "Reflexive: myself, yourself, himself, herself, itself, ourselves, yourselves, themselves.",
    "Relative: who, whom, whose, which, that.",
  ],
  examples: {
    easy: [
      { text: "She gave me the book.", note: "Subject + object" },
    ],
    medium: [
      { text: "The boy who won the race is my cousin.", note: "Relative pronoun" },
    ],
    hard: [
      { text: "She hurt herself while cooking.", note: "Reflexive" },
    ],
  },
  incorrectExamples: ["Me and Ravi went to the market.", "The dog hurt it's leg."],
  correctedExamples: [
    { incorrect: "Me and Ravi went to the market.", corrected: "Ravi and I went to the market.", explanation: "Subject pronoun; polite order." },
    { incorrect: "The dog hurt it's leg.", corrected: "The dog hurt its leg.", explanation: "it's = it is." },
    { incorrect: "Between you and I, this is wrong.", corrected: "Between you and me, this is wrong.", explanation: "Object after preposition." },
  ],
  commonMistakes: ["Object pronoun in subject slot.", "its vs it's.", "who vs whom."],
  guidedPractice: [
    { question: "Fill in: '______ is a good idea.' (She/Her)", hint: "Subject position.", answer: "She", explanation: "Subject pronoun." },
  ],
  independentPractice: [
    { question: "Fill in: 'The teacher asked Ravi and ______ to stay back.' (I/me)", answer: "me", explanation: "Object of verb." },
  ],
  examStyleQuestions: [
    { question: "Correct: 'Him and me are going to the market.'", answer: "He and I are going to the market.", explanation: "Subject pronouns." },
  ],
  quickRevision: {
    keyPoints: ["Subject vs object depends on position.", "Who = subject; whom = object."],
    memoryTip: "Remove the other person and see what fits.",
    examTip: "Beware its vs it's.",
  },
};
