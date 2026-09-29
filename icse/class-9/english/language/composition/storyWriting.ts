import type { CompositionTopic } from "../../types";

export const storyWriting: CompositionTopic = {
  id: "icse-9-eng-lang-comp-05",
  title: "Story Writing",
  difficulty: "medium",
  learningObjective: "Write an original short story with clear structure and a satisfying close.",
  whatItIs: "Short story with characters, setting, conflict, resolution — usually given a title, opening line, or ending line.",
  whyItMatters: "ICSE offers 'short story' as a composition option.",
  thinkingFramework: [
    "Who is the protagonist?",
    "What is the central conflict?",
    "What is at stake?",
    "What changes by the end?",
  ],
  structure: [
    { section: "Opening", purpose: "Hook and set scene", wordCountGuide: "50-70 words" },
    { section: "Build-up", purpose: "Introduce conflict", wordCountGuide: "100-120 words" },
    { section: "Climax", purpose: "Peak moment", wordCountGuide: "60-80 words" },
    { section: "Resolution", purpose: "Ending that satisfies title/line", wordCountGuide: "60-80 words" },
  ],
  vocabularyBank: ["suddenly", "without warning", "at that moment", "his heart raced", "the silence was deafening"],
  paragraphDevelopment: [
    "One scene per paragraph.",
    "Movement between action and reflection.",
    "Concrete details over abstractions.",
  ],
  modelResponse: "The letter arrived on a Tuesday. The postman, who knew everyone, hesitated before handing it over. The envelope was thin. Unusually thin. I held it a moment longer than necessary before tearing it open.",
  weakResponse: "One day a letter came. It was important. My life changed. The end.",
  improvedResponse: "The letter was in a pale blue envelope — my grandmother's handwriting. She had been gone for three years. My fingers stopped moving. The world seemed to hold its breath with me.",
  commonMistakes: [
    { incorrect: "Ignoring the given line", corrected: "Integrate the given opening/closing naturally.", explanation: "The instruction is part of the test." },
    { incorrect: "No clear climax", corrected: "Build to a single most intense moment.", explanation: "Structure." },
  ],
  examinerChecklist: [
    "Does my story have a title link or line link?",
    "Is there a clear climax?",
    "Do characters change?",
    "Is the ending satisfying?",
    "Is the language vivid?",
  ],
  practiceQuestions: [
    { question: "Write a short story titled 'The Gift'.", hint: "Gift can be material or emotional.", answer: "Plan: setup → gift revelation → emotional beat → resolution.", explanation: "Title-anchored story." },
    { question: "Story beginning: 'The letter arrived on a Tuesday, and everything changed.'", hint: "Work from the line forward.", answer: "Plan: the letter → what it said → consequence → new normal.", explanation: "Opening-line story." },
  ],
  quickRevision: {
    keyPoints: ["Arc required.", "Integrate given line/title.", "Concrete details."],
    memoryTip: "One protagonist, one conflict, one climax.",
    examTip: "Ending must satisfy the title or line.",
  },
};
