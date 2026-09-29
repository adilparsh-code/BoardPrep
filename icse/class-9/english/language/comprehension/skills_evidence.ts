import type { ComprehensionSkill } from "../../types";

export const locatingEvidence: ComprehensionSkill = {
  id: "icse-9-eng-lang-comp-02-t03",
  title: "Locating Evidence",
  difficulty: "easy",
  learningObjective: "Find explicit information from the passage to support answers.",
  whatItIs: "Evidence = specific words or phrases in the passage that support your answer.",
  howToDoIt: [
    "Read the question carefully.",
    "Scan for key words from the question.",
    "Underline the relevant lines.",
    "Answer in your own words using this evidence.",
  ],
  workedExample: {
    passage: "The clock struck midnight. Meera sat by the window, unable to sleep. The letter from her brother lay open on the table. She had read it a dozen times.",
    question: "Why was Meera unable to sleep?",
    thinking: [
      "Question asks: why?",
      "Look for evidence near 'unable to sleep'.",
      "Evidence: 'The letter from her brother lay open'.",
    ],
    answer: "Meera was unable to sleep because she was troubled by the letter from her brother, which she had read many times.",
  },
  commonMistakes: ["Copying the whole sentence.", "Not answering the specific question.", "Ignoring the 'why' and answering 'what'."],
  practice: [
    {
      question: "What object was on the table?",
      answer: "A letter from Meera's brother.",
      explanation: "Direct evidence.",
    },
  ],
};
