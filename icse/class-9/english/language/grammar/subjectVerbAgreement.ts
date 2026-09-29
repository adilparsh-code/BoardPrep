import type { GrammarTopic } from "../../types";

export const subjectVerbAgreement: GrammarTopic = {
  id: "icse-9-eng-lang-gram-03",
  title: "Subject–Verb Agreement",
  difficulty: "easy",
  learningObjective: "Match the verb to its subject in number and person, even when phrases intervene.",
  concept: "The verb agrees with its subject in number and person. The subject — not an intervening phrase — decides the verb.",
  whyItMatters: "ICSE tests this in error-correction and fill-in-the-blank questions.",
  rules: [
    "Singular subject → singular verb. Plural subject → plural verb.",
    "Two subjects joined by 'and' → plural verb.",
    "'Each/Every/Either/Neither/Everyone/Somebody' → singular verb.",
    "Subjects joined by 'or/nor' → verb agrees with nearer subject.",
    "Phrases between subject and verb do not change the verb.",
    "Collective nouns: singular when acting as unit; plural when members act separately.",
  ],
  examples: {
    easy: [
      { text: "She is a doctor.", note: "Singular" },
      { text: "They are doctors.", note: "Plural" },
    ],
    medium: [
      { text: "Each of the boys has a book.", note: "'Each' singular" },
      { text: "Neither Ravi nor his brothers are here.", note: "Nearest subject" },
    ],
    hard: [
      { text: "The quality of the mangoes was excellent.", note: "Subject = 'quality'" },
    ],
  },
  incorrectExamples: ["The list of items are long.", "Each of the students have submitted."],
  correctedExamples: [
    { incorrect: "The list of items are long.", corrected: "The list of items is long.", explanation: "Subject 'list' is singular." },
    { incorrect: "Each of the students have submitted.", corrected: "Each of the students has submitted.", explanation: "'Each' singular." },
    { incorrect: "Neither of the two answers are correct.", corrected: "Neither of the two answers is correct.", explanation: "'Neither' singular." },
  ],
  commonMistakes: [
    "Matching verb to nearest noun.",
    "Treating 'each/neither/either' as plural.",
  ],
  guidedPractice: [
    { question: "Fill in: 'The bunch of grapes ______ (be) ripe.'", hint: "Real subject?", answer: "is", explanation: "Subject is 'bunch'." },
  ],
  independentPractice: [
    { question: "Correct: 'Neither the teacher nor the students was ready.'", answer: "Neither the teacher nor the students were ready.", explanation: "Verb agrees with nearer subject 'students'." },
  ],
  examStyleQuestions: [
    { question: "Choose: 'The number of applicants (has/have) increased.'", answer: "has", explanation: "'The number' is singular." },
  ],
  quickRevision: {
    keyPoints: ["Verb agrees with true subject.", "'Each/Every/Neither/Either' → singular."],
    memoryTip: "Cross out intervening phrase.",
    examTip: "Find actual subject first.",
  },
};
