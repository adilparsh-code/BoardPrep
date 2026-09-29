import type { ComprehensionSkill } from "../../types";

export const toneAndPurpose: ComprehensionSkill = {
  id: "icse-9-eng-lang-comp-02-t06",
  title: "Tone and Author's Purpose",
  difficulty: "medium",
  learningObjective: "Identify the tone and the author's purpose.",
  whatItIs: "Tone = the writer's attitude. Purpose = why the writer wrote (to inform, persuade, entertain, warn).",
  howToDoIt: [
    "Ask: how does the writing feel? (serious, humorous, angry, nostalgic)",
    "Look at word choices — they reveal tone.",
    "Ask: what is the writer trying to make me do or feel?",
    "State tone and purpose in one line each.",
  ],
  workedExample: {
    passage: "We must act now. Every day we delay, the forests shrink, the rivers dry, the air thickens. The choice is ours — and the time is now.",
    question: "What is the tone and purpose of this passage?",
    thinking: [
      "Urgent words: 'now', 'must', 'choice is ours'.",
      "Repetition builds urgency.",
      "Purpose: persuade to act.",
    ],
    answer: "Tone: urgent and persuasive. Purpose: to urge immediate action on environmental issues.",
  },
  commonMistakes: ["Confusing tone with topic.", "Not supporting tone with evidence."],
  practice: [
    {
      question: "Identify tone: 'Oh, wonderful! Another Monday morning.'",
      answer: "Sarcastic / ironic.",
      explanation: "Contrast between words and feeling.",
    },
  ],
};
