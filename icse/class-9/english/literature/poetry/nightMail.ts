import type { LiteratureModule } from "../../types";

export const nightMail: LiteratureModule = {
  id: "icse-9-eng-lit-poetry-01-01",
  title: "The Night Mail",
  author: "W.H. Auden",
  genre: "poetry",
  difficulty: "easy",
  learningObjective: "Understand how rhythm mimics the train and how the poem celebrates duty and connection.",
  background: {
    author: "W.H. Auden (1907-1973), English-American poet. Written 1936 for a documentary film about the British postal service.",
    context: "Between the World Wars; celebration of industry and communication.",
    setting: "Night journey of a mail train from London to Scotland.",
  },
  vocabulary: [
    { word: "Postal order", meaning: "Document for sending money by post" },
    { word: "Punctual", meaning: "On time" },
    { word: "Border", meaning: "Line between countries" },
  ],
  overview: "The night mail train crosses from England to Scotland carrying letters and parcels. The poem celebrates the train's reliability, purpose, and the human connection it enables.",
  sections: [
    { id: "s1", title: "Departure", whatHappens: "The train crosses the border.", whatItMeans: "Journey begins.", whyItMatters: "Sets the scene.", keyDetails: ["Distant moon", "Shrill whistle"] },
    { id: "s2", title: "Landscape", whatHappens: "Train climbs through hills and moors.", whatItMeans: "The train moves steadily through difficulty.", whyItMatters: "Establishes reliability.", keyDetails: ["Steady, punctual"] },
    { id: "s3", title: "Purpose", whatHappens: "Train carries letters and parcels.", whatItMeans: "Human connection across distance.", whyItMatters: "Theme of communication.", keyDetails: ["Letters for rich and poor"] },
  ],
  themes: [
    { theme: "Beauty of Machinery", evidence: "Train described as steady, punctual.", explanation: "Function is beautiful.", significance: "Celebrates industry." },
    { theme: "Human Connection", evidence: "Carries letters and parcels.", explanation: "Links people across distance.", significance: "Communication matters." },
    { theme: "Reliability and Duty", evidence: "Train never stops.", explanation: "Quiet heroism of doing one's job.", significance: "Duty celebrated." },
  ],
  literaryDevices: [
    { device: "Personification", definition: "Giving human qualities to non-human.", example: "Train 'crosses' and 'climbs'.", effect: "Train feels alive.", whyUsed: "Adds warmth." },
    { device: "Rhyme", definition: "Matching sounds at line ends.", example: "Regular rhyme scheme.", effect: "Steady beat like train wheels.", whyUsed: "Rhythm mimics movement." },
  ],
  extracts: [
    { id: "e1", context: "Opening lines.", situation: "Description of the night mail crossing the border.", meaning: "Journey begins.", significance: "Establishes purpose.", likelyQuestions: [{ question: "What is the night mail?", answer: "The mail train carrying letters and parcels overnight.", explanation: "Direct meaning." }] },
  ],
  thinkingQuestions: [
    "How does Auden use rhythm?",
    "What does the train symbolize?",
    "Why is reliability celebrated?",
  ],
  examQuestions: [
    { type: "short", marks: 2, question: "What does the night mail carry?", modelAnswerGuidance: ["Mention letters, cheques, postal orders."] },
    { type: "analytical", marks: 6, question: "How does Auden use rhythm to mimic the train?", modelAnswerGuidance: ["Cite rhyme scheme.", "Cite alliteration."] },
  ],
  commonMistakes: ["Calling it 'just about a train'.", "Ignoring rhythm."],
  quickRevision: {
    keyPoints: ["Mail train journey.", "Rhythm mimics movement.", "Themes: machinery, connection, duty."],
    keyVocabulary: ["Postal order", "Punctual"],
    examPoints: ["Rhythm is key.", "Cite imagery."],
    selfTest: ["What is the theme?", "How is rhythm used?"],
  },
};
