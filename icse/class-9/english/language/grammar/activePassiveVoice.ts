import type { GrammarTopic } from "../../types";

export const activePassiveVoice: GrammarTopic = {
  id: "icse-9-eng-lang-gram-10",
  title: "Active and Passive Voice",
  difficulty: "medium",
  learningObjective: "Convert sentences between active and passive voice while preserving tense.",
  concept: "Active: subject does action. Passive: subject receives action. Passive = be + past participle.",
  whyItMatters: "Voice transformation is a common ICSE grammar question.",
  rules: [
    "Object → subject; verb → be + V3; original subject → by + agent.",
    "Keep the tense.",
    "Only transitive verbs can be passive.",
    "Continuous: is/was being + V3. Perfect: has/had been + V3.",
    "Imperative: Let + object + be + V3.",
  ],
  examples: {
    easy: [{ text: "Active: The boy kicked the ball.", note: "Passive: The ball was kicked by the boy." }],
    medium: [{ text: "Active: She is writing a letter.", note: "Passive: A letter is being written by her." }],
    hard: [{ text: "Active: Open the door.", note: "Passive: Let the door be opened." }],
  },
  incorrectExamples: ["A song is sang by her."],
  correctedExamples: [
    { incorrect: "The ball was kicked by the boy (from 'kicks').", corrected: "The ball is kicked by the boy.", explanation: "Keep tense." },
    { incorrect: "A song is sang by her.", corrected: "A song is sung by her.", explanation: "Correct V3." },
  ],
  commonMistakes: ["Tense shifts.", "Wrong V3.", "Passive of intransitive verbs."],
  guidedPractice: [
    { question: "Change to passive: 'The chef prepared a delicious meal.'", hint: "Object becomes subject.", answer: "A delicious meal was prepared by the chef.", explanation: "Simple past → was + V3." },
  ],
  independentPractice: [
    { question: "Change to passive: 'Someone has stolen my bicycle.'", answer: "My bicycle has been stolen.", explanation: "Present perfect passive; agent unknown." },
  ],
  examStyleQuestions: [
    { question: "Change to active: 'The letter will be posted by Ravi tomorrow.'", answer: "Ravi will post the letter tomorrow.", explanation: "Future passive → active." },
  ],
  quickRevision: {
    keyPoints: ["Passive = be + V3.", "Preserve tense."],
    memoryTip: "Object → Subject → be + V3 → (by agent).",
    examTip: "Identify tense first.",
  },
};
