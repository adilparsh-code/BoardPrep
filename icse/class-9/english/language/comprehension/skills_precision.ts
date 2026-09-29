import type { ComprehensionSkill } from "../../types";

export const answeringPrecisely: ComprehensionSkill = {
  id: "icse-9-eng-lang-comp-02-t07",
  title: "Answering Precisely",
  difficulty: "medium",
  learningObjective: "Answer in complete sentences, avoid over-writing, and check every answer.",
  whatItIs: "Precision means answering what is asked, in the fewest words that fully answer.",
  howToDoIt: [
    "Read the question twice.",
    "Identify the question type: What? Why? How? Who?",
    "Answer in a complete sentence.",
    "Do not add extra information.",
    "Check: does my answer match the marks?",
  ],
  workedExample: {
    passage: "The magician pulled a rabbit from the hat. The children gasped.",
    question: "What did the magician do?",
    thinking: [
      "Question: what?",
      "Answer must state action.",
      "No need to describe the children's reaction.",
    ],
    answer: "The magician pulled a rabbit from the hat.",
  },
  commonMistakes: ["Over-writing — adding unasked information.", "Answering in fragments.", "Answering multiple questions in one."],
  practice: [
    {
      question: "Answer in one line: 'Why did the children gasp?'",
      answer: "They gasped because the magician pulled a rabbit from the hat.",
      explanation: "Complete sentence.",
    },
  ],
};
