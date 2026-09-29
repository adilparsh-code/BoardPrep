import type { CompositionTopic } from "../../types";

export const fundamentals: CompositionTopic = {
  id: "icse-9-eng-lang-comp-01",
  title: "Composition Fundamentals",
  difficulty: "easy",
  learningObjective: "Understand purpose, audience, mode, and structure before writing.",
  whatItIs: "A composition is organised, purposeful writing with a clear beginning, middle, and end.",
  whyItMatters: "ICSE Q1 is 20 marks — the largest single question in Paper 1.",
  thinkingFramework: [
    "What is my purpose? (narrate, describe, argue, reflect)",
    "Who is my audience? (the examiner — a stranger)",
    "What mode does the question demand?",
    "What are the key instruction words?",
    "What is my strongest opening line?",
  ],
  structure: [
    { section: "Introduction", purpose: "Hook the reader; establish context", wordCountGuide: "50-60 words" },
    { section: "Body Paragraph 1", purpose: "First main idea with example", wordCountGuide: "70-90 words" },
    { section: "Body Paragraph 2", purpose: "Second main idea with example", wordCountGuide: "70-90 words" },
    { section: "Body Paragraph 3", purpose: "Third main idea or climax", wordCountGuide: "70-90 words" },
    { section: "Conclusion", purpose: "Reflection, resolution, or firm restatement", wordCountGuide: "40-50 words" },
  ],
  vocabularyBank: ["precise verbs", "sensory adjectives", "linking words (however, therefore, moreover)", "varied sentence lengths"],
  paragraphDevelopment: [
    "One idea per paragraph.",
    "Start with topic sentence.",
    "Support with detail/example.",
    "Link to next idea.",
  ],
  modelResponse: "It was a cool November evening, and the roadside chaat stall near our colony was buzzing with its usual crowd. I had ordered a plate of pani puri and was enjoying the spicy burst of flavours when something unexpected happened.",
  weakResponse: "It was a nice evening. I was eating. Then something happened. It was very shocking. I did not know what to do.",
  improvedResponse: "The November air carried the sharp tang of tamarind and the warm hum of the chaat stall. I was mid-bite when a sudden cry split the noise — a man at the next table was choking. My hand froze. For a heartbeat, no one moved.",
  commonMistakes: [
    { incorrect: "Starting too early ('I woke up at 7 a.m.')", corrected: "Start at the moment of tension.", explanation: "Hook the reader immediately." },
    { incorrect: "One long paragraph", corrected: "4-5 paragraphs, one idea each.", explanation: "Structure aids clarity." },
  ],
  examinerChecklist: [
    "Did I answer every part of the question?",
    "Is my introduction engaging?",
    "Does each paragraph have one main idea?",
    "Is my vocabulary varied and precise?",
    "Is my conclusion satisfying?",
    "Are my tenses consistent?",
    "Is my spelling and punctuation accurate?",
    "Am I within 300-350 words?",
  ],
  practiceQuestions: [
    { question: "Narrate an incident when you helped someone in need.", hint: "Plan first — what happened, how you reacted, what you learnt.", answer: "Plan: setting, incident, reaction, reflection.", explanation: "Narrative + reflective." },
    { question: "Describe a place that left a deep impression on you.", hint: "Use all five senses.", answer: "Plan: setting, sensory details, why it impressed you.", explanation: "Descriptive mode." },
  ],
  quickRevision: {
    keyPoints: ["Purpose + Audience + Mode.", "Plan 3-4 min.", "Structure: Intro → Body → Conclusion."],
    memoryTip: "PAM — Purpose, Audience, Mode.",
    examTip: "First and last paragraphs matter most.",
  },
};
