import type { CompositionTopic } from "../../types";

export const descriptive: CompositionTopic = {
  id: "icse-9-eng-lang-comp-02",
  title: "Descriptive Composition",
  difficulty: "medium",
  learningObjective: "Create vivid pictures in words using sensory detail and organisation.",
  whatItIs: "Descriptive writing paints a picture — not what happened, but what it was like.",
  whyItMatters: "ICSE tests descriptive writing as one of the composition options.",
  thinkingFramework: [
    "What is the dominant mood?",
    "Which senses will I activate?",
    "What is my organisational plan? (spatial or chronological)",
    "Which 3-4 details will anchor the description?",
  ],
  structure: [
    { section: "Introduction", purpose: "Set the mood and place", wordCountGuide: "50-60 words" },
    { section: "Body", purpose: "Describe through senses, moving spatially", wordCountGuide: "180-220 words" },
    { section: "Conclusion", purpose: "Reflect on the atmosphere or impact", wordCountGuide: "40-50 words" },
  ],
  vocabularyBank: ["fragrant", "glimmering", "cacophony", "crimson", "gritty", "hollow", "damp", "sharp", "sweet", "stale"],
  paragraphDevelopment: [
    "Topic sentence establishes what is being described.",
    "Sensory details follow.",
    "Compare or contrast to create texture.",
    "Link to next sense or area.",
  ],
  modelResponse: "The railway station is a city in miniature. Coolies in red shirts weave through the crowd, balancing trunks on their heads. Tea vendors call out in sing-song voices — 'Chai, garam chai!' — their glass tumblers clinking. The smell is a mixture of diesel, fried snacks, and something indefinably human — sweat and hope and hurry.",
  weakResponse: "The station was very nice. There were many people. I liked it very much.",
  improvedResponse: "The station breathed. Every few seconds a new announcement crackled through the dusty air, and the platform shifted like a living organism — some passengers settling, others readying to move.",
  commonMistakes: [
    { incorrect: "Telling instead of describing ('It was nice')", corrected: "Showing ('The air smelled of wet earth and jasmine')", explanation: "Senses, not judgements." },
    { incorrect: "Only visual detail", corrected: "Include sound, smell, touch, taste", explanation: "All senses." },
  ],
  examinerChecklist: [
    "Did I use all five senses?",
    "Is my organisation clear?",
    "Did I avoid overused adjectives?",
    "Is my mood consistent?",
    "Did I avoid telling?",
  ],
  practiceQuestions: [
    { question: "Describe a busy market scene in your locality.", hint: "Use colour, sound, smell, movement.", answer: "Structure spatially — entrance → stalls → crowd → exit.", explanation: "Vivid sensory description." },
    { question: "Describe a very hot summer day.", hint: "Focus on heat — how it feels, smells, sounds.", answer: "Structure chronologically — morning → afternoon → evening.", explanation: "Single mood, sustained." },
  ],
  quickRevision: {
    keyPoints: ["Senses, not judgements.", "Spatial or chronological organisation.", "Precise vocabulary."],
    memoryTip: "Show, don't tell.",
    examTip: "Opening line sets mood.",
  },
};
