import type { LiteratureModule } from "../../types";

export const iRemember: LiteratureModule = {
  id: "icse-9-eng-lit-poetry-01-03",
  title: "I Remember, I Remember",
  author: "Thomas Hood",
  genre: "poetry",
  difficulty: "medium",
  learningObjective: "Understand nostalgia and the loss of childhood innocence.",
  background: {
    author: "Thomas Hood (1799-1845), English poet and humourist.",
    context: "Victorian nostalgia poetry.",
    setting: "Speaker's childhood home, recalled from adulthood.",
  },
  vocabulary: [
    { word: "Nostalgia", meaning: "Sentimental longing for the past" },
    { word: "Wistful", meaning: "Regretful longing" },
    { word: "Infancy", meaning: "Early childhood" },
  ],
  overview: "The speaker remembers the joys of childhood — the sun, the garden, the games — and contrasts them with his current sadness. The poem is a nostalgic reflection on lost innocence.",
  sections: [
    { id: "s1", title: "The House", whatHappens: "Speaker remembers the house where he was born.", whatItMeans: "Roots and origins.", whyItMatters: "Establishes nostalgia.", keyDetails: ["Sun peeping in"] },
    { id: "s2", title: "The Garden", whatHappens: "He remembers garden, trees, birds.", whatItMeans: "Nature and freedom.", whyItMatters: "Deepens nostalgia.", keyDetails: ["Lilies, roses, swallows"] },
    { id: "s3", title: "The Realisation", whatHappens: "Speaker reflects that his joy was based on 'childish ignorance'.", whatItMeans: "Loss of innocence.", whyItMatters: "Poem's turning point.", keyDetails: ["Heaven lies about us in infancy"] },
  ],
  themes: [
    { theme: "Nostalgia", evidence: "Repeated 'I remember'.", explanation: "Longing for the past.", significance: "Celebrates memory." },
    { theme: "Loss of Innocence", evidence: "'Childish ignorance'", explanation: "Happiness was based on not-knowing.", significance: "Poem on growing up." },
  ],
  literaryDevices: [
    { device: "Repetition", definition: "Repeating phrases.", example: "'I remember, I remember'.", effect: "Nostalgic rhythm.", whyUsed: "Emphasises memory." },
    { device: "Imagery", definition: "Vivid sensory description.", example: "Sun, garden, birds.", effect: "Creates childhood feel.", whyUsed: "Depth." },
    { device: "Metaphor", definition: "Comparison without 'like'/'as'.", example: "'Heaven lies about us in our infancy'.", effect: "Childhood as paradise.", whyUsed: "Elevates theme." },
  ],
  extracts: [
    { id: "e1", context: "Opening.", situation: "Speaker remembers birthplace.", meaning: "Nostalgia begins.", significance: "Sets tone.", likelyQuestions: [{ question: "What does the speaker remember?", answer: "The house where he was born.", explanation: "Direct." }] },
  ],
  thinkingQuestions: ["How does Hood use repetition?", "Why is the poem bittersweet?"],
  examQuestions: [
    { type: "short", marks: 2, question: "What is the tone of the poem?", modelAnswerGuidance: ["Nostalgic, wistful."] },
    { type: "analytical", marks: 6, question: "How does Hood contrast childhood and adulthood?", modelAnswerGuidance: ["Cite joy vs sigh.", "Cite 'childish ignorance'."] },
  ],
  commonMistakes: ["Calling it purely happy.", "Missing the loss."],
  quickRevision: {
    keyPoints: ["Nostalgic poem.", "Repetition key.", "Themes: memory, loss."],
    keyVocabulary: ["Nostalgia", "Wistful"],
    examPoints: ["Cite repetition.", "Identify contrast."],
    selfTest: ["What is remembered?", "What is lost?"],
  },
};
