import type { ComprehensionSkill } from "../../types";

export const inference: ComprehensionSkill = {
  id: "icse-9-eng-lang-comp-02-t04",
  title: "Inference — Reading Between the Lines",
  difficulty: "medium",
  learningObjective: "Draw conclusions not explicitly stated in the passage.",
  whatItIs: "Inference = understanding what the writer implies without stating directly.",
  howToDoIt: [
    "Identify what is stated.",
    "Ask: what must be true for this statement to make sense?",
    "Combine evidence from multiple sentences.",
    "State the inference as a clear conclusion, supported by evidence.",
  ],
  workedExample: {
    passage: "Ravi glanced at the clock for the fifth time. His hands moved to the exam paper, then back to his pockets. The room grew louder with scratching pens.",
    question: "What can you infer about Ravi?",
    thinking: [
      "Evidence: repeated clock glances, restless hands, other students writing.",
      "Inference: Ravi is anxious and unprepared compared to others.",
    ],
    answer: "Ravi appears anxious and possibly unprepared for the exam, judging by his repeated clock-watching and restless movements while others write.",
  },
  commonMistakes: ["Making inferences unsupported by evidence.", "Answering with what is directly stated.", "Confusing inference with opinion."],
  practice: [
    {
      question: "What does the noise of scratching pens suggest?",
      answer: "Other students are actively writing, contrasting with Ravi's stillness.",
      explanation: "Contrast used for inference.",
    },
  ],
};
