import type { ComprehensionSkill } from "../../types";

export const vocabularyInContext: ComprehensionSkill = {
  id: "icse-9-eng-lang-comp-02-t05",
  title: "Vocabulary in Context",
  difficulty: "medium",
  learningObjective: "Determine meaning of unfamiliar words using surrounding clues.",
  whatItIs: "Context clues = hints from the surrounding text that reveal a word's meaning.",
  howToDoIt: [
    "Read the sentence and one before/after.",
    "Look for definitions, examples, contrasts, or synonyms.",
    "Substitute your guess — does it fit?",
    "Write the meaning in your own words.",
  ],
  workedExample: {
    passage: "The teacher's admonition was stern but fair. She warned the students not to repeat the mistake.",
    question: "What does 'admonition' mean?",
    thinking: [
      "Context: 'stern but fair', 'warned'.",
      "Meaning likely = a warning or reprimand.",
    ],
    answer: "Admonition = a warning or firm reprimand.",
  },
  commonMistakes: ["Using dictionary meaning without checking context.", "Guessing without examining clues."],
  practice: [
    {
      question: "The desolate village had no shops, no schools, and no one on the streets. Meaning of 'desolate'?",
      answer: "Empty, abandoned, bleak.",
      explanation: "Context lists absences.",
    },
  ],
};
