import type { ComprehensionSkill } from "../../types";

export const readingPassage: ComprehensionSkill = {
  id: "icse-9-eng-lang-comp-02-t01",
  title: "How to Read a Passage Actively",
  difficulty: "easy",
  learningObjective: "Skim, scan, and annotate a passage before answering.",
  whatItIs: "Active reading means reading with a purpose — first for the gist, then for detail.",
  howToDoIt: [
    "Skim the passage once (30-45 seconds) for the general sense.",
    "Read the questions next to know what to look for.",
    "Read the passage again, underlining or circling key details.",
    "Mark unfamiliar words to figure out from context later.",
    "Never copy large chunks as answers.",
  ],
  workedExample: {
    passage: "The tiny island was home to fewer than a hundred residents. Fishing sustained them, as it had for generations. But last summer, the fish disappeared. The elders blamed the new trawlers that had begun circling the reef.",
    question: "What sustained the island's residents?",
    thinking: [
      "Skim: passage is about an island and its fishing community.",
      "Question asks what sustained residents — so look for the main source.",
      "Underline 'Fishing sustained them'.",
      "Answer should be short and direct.",
    ],
    answer: "Fishing sustained the residents of the island.",
  },
  commonMistakes: ["Reading the passage once and jumping to questions.", "Copying whole sentences as answers.", "Ignoring the question word (What? Why? How?)."],
  practice: [
    {
      question: "Skim and identify the topic of the passage above in one line.",
      answer: "The passage describes a small fishing island whose livelihood was disrupted by trawlers.",
      explanation: "Gist — one sentence.",
    },
  ],
};
