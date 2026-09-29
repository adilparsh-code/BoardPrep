import type { ComprehensionSkill } from "../../types";

export const centralIdea: ComprehensionSkill = {
  id: "icse-9-eng-lang-comp-02-t02",
  title: "Identifying the Central Idea",
  difficulty: "medium",
  learningObjective: "Identify the main point of a passage, separate from supporting details.",
  whatItIs: "Central idea = the one big point the passage makes. Different from supporting details.",
  howToDoIt: [
    "Ask: What is the passage mostly about?",
    "Look at first and last sentences — often the thesis.",
    "Check: do the middle details support this idea?",
    "State the central idea in your own words, not the passage's.",
  ],
  workedExample: {
    passage: "Small daily habits shape who we become. Reading for ten minutes a day compounds into a lifetime of knowledge. Walking for twenty minutes strengthens the heart. Even five minutes of reflection helps us understand our own minds.",
    question: "What is the central idea of the passage?",
    thinking: [
      "First sentence: 'Small daily habits shape who we become.'",
      "Middle examples all support this.",
      "Central idea is not 'reading is good' — that's a detail.",
    ],
    answer: "Small daily habits, over time, shape a person's mind and body.",
  },
  commonMistakes: ["Confusing a detail with the central idea.", "Copying the first sentence verbatim.", "Writing two sentences when one is asked."],
  practice: [
    {
      question: "Identify the central idea of a passage about climate change focusing on individual action.",
      answer: "Individual daily actions, combined, can meaningfully address climate change.",
      explanation: "State in own words.",
    },
  ],
};
