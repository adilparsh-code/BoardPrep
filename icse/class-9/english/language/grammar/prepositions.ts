import type { GrammarTopic } from "../../types";

export const prepositions: GrammarTopic = {
  id: "icse-9-eng-lang-gram-05",
  title: "Prepositions",
  difficulty: "medium",
  learningObjective: "Use prepositions of time, place, direction, agent correctly.",
  concept: "Prepositions show relationship between a noun/pronoun and another word.",
  whyItMatters: "Explicitly listed in CISCE Language syllabus. Frequent in error-correction.",
  rules: [
    "Time: at (clock), on (day/date), in (month/year).",
    "Place: at (point), on (surface), in (enclosed).",
    "Direction: to, towards, into, onto.",
    "Agent: by. Instrument: with.",
    "Collocations: depend on, listen to, agree with, different from, afraid of, good at.",
  ],
  examples: {
    easy: [
      { text: "The book is on the table.", note: "Surface" },
      { text: "He arrived at 6 p.m.", note: "Clock time" },
    ],
    medium: [
      { text: "We met on Monday.", note: "Day" },
      { text: "I was born in 2008.", note: "Year" },
    ],
    hard: [
      { text: "She is good at mathematics but weak in English.", note: "Fixed collocations" },
    ],
  },
  incorrectExamples: ["He is good in mathematics.", "I will meet you in Monday."],
  correctedExamples: [
    { incorrect: "He is good in mathematics.", corrected: "He is good at mathematics.", explanation: "Collocation." },
    { incorrect: "I will meet you in Monday.", corrected: "I will meet you on Monday.", explanation: "Days take 'on'." },
    { incorrect: "She is different than her sister.", corrected: "She is different from her sister.", explanation: "Standard collocation." },
  ],
  commonMistakes: ["Confusing in/on/at.", "Ignoring collocations."],
  guidedPractice: [
    { question: "Fill in: 'The cat jumped ______ the table.'", hint: "Movement to surface?", answer: "onto", explanation: "Movement to surface." },
  ],
  independentPractice: [
    { question: "Fill in: 'I am afraid ______ spiders and allergic ______ dust.'", answer: "of; to", explanation: "Fixed collocations." },
  ],
  examStyleQuestions: [
    { question: "Correct: 'She apologised for me on being late.'", answer: "She apologised to me for being late.", explanation: "Apologise to someone for something." },
  ],
  quickRevision: {
    keyPoints: ["at = point; on = surface/day; in = enclosed/month/year."],
    memoryTip: "AT a point, ON a line, IN a box.",
    examTip: "Prepositions depend on collocation.",
  },
};
