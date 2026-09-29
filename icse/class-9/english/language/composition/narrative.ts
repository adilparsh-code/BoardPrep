import type { CompositionTopic } from "../../types";

export const narrative: CompositionTopic = {
  id: "icse-9-eng-lang-comp-03",
  title: "Narrative Composition",
  difficulty: "medium",
  learningObjective: "Write a story with clear arc, showing rather than telling.",
  whatItIs: "Narrative tells a story with characters, setting, conflict, and resolution.",
  whyItMatters: "ICSE lists 'narrate' as a required ability.",
  thinkingFramework: [
    "Who is the main character?",
    "Where and when?",
    "What is the conflict?",
    "What is the climax?",
    "What changes by the end?",
  ],
  structure: [
    { section: "Exposition", purpose: "Setting and characters", wordCountGuide: "50-70 words" },
    { section: "Rising Action", purpose: "Build tension", wordCountGuide: "100-120 words" },
    { section: "Climax", purpose: "Peak intensity", wordCountGuide: "60-80 words" },
    { section: "Falling Action + Resolution", purpose: "Aftermath + reflection", wordCountGuide: "60-80 words" },
  ],
  vocabularyBank: ["trembled", "whispered", "clattered", "shuddered", "gripped", "hovered", "stumbled"],
  paragraphDevelopment: [
    "Start in the middle of the action.",
    "Short sentences for tension.",
    "Longer sentences for reflection.",
    "End with what changed.",
  ],
  modelResponse: "My finger hovered over the redial button. The RJ had just announced the quiz. What if I got through? What if I made a fool of myself? The phone rang twice. A voice said, 'You're on air.'",
  weakResponse: "One day I called the radio station. They picked up. I answered questions. I won.",
  improvedResponse: "One day, on impulse, I dialled the number. My hand was shaking. When the RJ's voice crackled through the speaker — 'Congratulations, you're our next caller!' — I forgot every answer I had ever known.",
  commonMistakes: [
    { incorrect: "Starting too early ('I woke up…')", corrected: "Start at the moment of tension.", explanation: "Hook the reader." },
    { incorrect: "Telling emotions ('I was scared')", corrected: "Showing ('My hands trembled')", explanation: "Physical detail." },
  ],
  examinerChecklist: [
    "Does my story have a clear arc?",
    "Did I start at the moment of tension?",
    "Did I show emotion through action?",
    "Is the reflection earned?",
    "Is my tense consistent?",
  ],
  practiceQuestions: [
    { question: "Narrate an experience that taught you patience.", hint: "Build to a climax; end with insight.", answer: "Plan: situation → waiting → climax → insight.", explanation: "Narrative + reflection." },
    { question: "Write a story ending: '…and I realised that sometimes, losing is the best thing that can happen.'", hint: "Work backward from the ending.", answer: "Plan the loss, the discovery, the change.", explanation: "Story with growth." },
  ],
  quickRevision: {
    keyPoints: ["Arc: Exposition → Rising → Climax → Falling → Resolution.", "Show, don't tell."],
    memoryTip: "Start at the moment of tension.",
    examTip: "First line creates a question.",
  },
};
