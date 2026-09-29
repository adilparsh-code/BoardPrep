import type { GrammarTopic } from "../../types";

export const questionTags: GrammarTopic = {
  id: "icse-9-eng-lang-gram-13",
  title: "Question Tags",
  difficulty: "medium",
  learningObjective: "Add correct question tags matching auxiliary, tense, polarity.",
  concept: "Short question added to end of statement. Positive → negative tag. Negative → positive tag.",
  whyItMatters: "Appears in ICSE grammar and conversation.",
  rules: [
    "Same auxiliary.",
    "Opposite polarity.",
    "Pronoun, not noun.",
    "I am → aren't I?",
    "Imperatives → will you? / shall we?",
    "Let's → shall we?",
  ],
  examples: {
    easy: [
      { text: "She is here, isn't she?", note: "Positive → negative tag" },
      { text: "He isn't late, is he?", note: "Negative → positive tag" },
    ],
    medium: [{ text: "They have finished, haven't they?", note: "Same auxiliary" }],
    hard: [{ text: "Let's go for a walk, shall we?", note: "Special case" }],
  },
  incorrectExamples: ["She is here, isn't it?", "Let's go, will we?"],
  correctedExamples: [
    { incorrect: "She is here, isn't it?", corrected: "She is here, isn't she?", explanation: "Match pronoun." },
    { incorrect: "Let's go, will we?", corrected: "Let's go, shall we?", explanation: "Special case." },
  ],
  commonMistakes: ["Wrong pronoun.", "Polarity rule.", "Wrong auxiliary."],
  guidedPractice: [
    { question: "Add tag: 'She has completed the work.'", hint: "Same aux, opposite polarity.", answer: "She has completed the work, hasn't she?", explanation: "Positive → negative." },
  ],
  independentPractice: [
    { question: "Add tag: 'Nobody came, ______?'", answer: "did they", explanation: "Nobody negative → positive tag." },
  ],
  examStyleQuestions: [
    { question: "Add tag: 'I am the winner, ______?'", answer: "aren't I", explanation: "Special case." },
  ],
  quickRevision: {
    keyPoints: ["Match auxiliary.", "Opposite polarity."],
    memoryTip: "Same verb, opposite sign, pronoun.",
    examTip: "Watch let's, nobody, I am.",
  },
};
