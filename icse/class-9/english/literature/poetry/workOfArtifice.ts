import type { LiteratureModule } from "../../types";

export const workOfArtifice: LiteratureModule = {
  id: "icse-9-eng-lit-poetry-01-05",
  title: "A Work of Artifice",
  author: "Marge Piercy",
  genre: "poetry",
  difficulty: "medium",
  learningObjective: "Understand the bonsai metaphor for the limitation of women's potential.",
  background: {
    author: "Marge Piercy (b. 1936), American feminist poet and novelist.",
    context: "Second-wave feminism; critique of patriarchal limitation.",
    setting: "Symbolic — a garden.",
  },
  vocabulary: [
    { word: "Artifice", meaning: "Clever device; something made by skill" },
    { word: "Bonsai", meaning: "Artificially dwarfed tree" },
    { word: "Dwarfed", meaning: "Prevented from growing to full size" },
  ],
  overview: "A bonsai tree, pruned and potted, is compared to a woman limited by society. Both could have grown to great heights, but were deliberately stunted.",
  sections: [
    { id: "s1", title: "The Bonsai", whatHappens: "Description of an attractive, well-pruned bonsai in a small pot.", whatItMeans: "Beauty created through limitation.", whyItMatters: "Establishes metaphor.", keyDetails: ["Little pot", "Pruned"] },
    { id: "s2", title: "The Gardener", whatHappens: "Gardener is proud of his work.", whatItMeans: "Control is celebrated by the controller.", whyItMatters: "Critique of patriarchy.", keyDetails: ["'A work of art'"] },
    { id: "s3", title: "The Parallel", whatHappens: "Women, like bonsai, are dwarfed and confined.", whatItMeans: "Social limitation.", whyItMatters: "Poem's message.", keyDetails: ["'Could have grown eighty feet tall'"] },
  ],
  themes: [
    { theme: "Limitation of Women's Potential", evidence: "Bonsai pruned to stay small.", explanation: "Society limits women's growth.", significance: "Feminist critique." },
    { theme: "Power and Control", evidence: "Gardener decides growth.", explanation: "Those in power limit others.", significance: "Questions authority." },
    { theme: "Resistance and Hope", evidence: "'Could have grown eighty feet tall'.", explanation: "Potential is reclaimed.", significance: "Call to action." },
  ],
  literaryDevices: [
    { device: "Metaphor", definition: "Extended comparison.", example: "Bonsai = women.", effect: "Powerful parallel.", whyUsed: "Social critique." },
    { device: "Irony", definition: "Contrast between expectation and reality.", example: "Gardener calls bonsai 'a work of art'.", effect: "Highlights cruelty.", whyUsed: "Satire." },
    { device: "Symbolism", definition: "Objects representing ideas.", example: "Pot = social confinement.", effect: "Depth.", whyUsed: "Layering." },
  ],
  extracts: [
    { id: "e1", context: "Opening.", situation: "Bonsai described.", meaning: "Establishes metaphor.", significance: "Sets up theme.", likelyQuestions: [{ question: "What is the bonsai a metaphor for?", answer: "Women whose potential is limited by society.", explanation: "Extended metaphor." }] },
  ],
  thinkingQuestions: ["How does Piercy use irony?", "What hope does the poem offer?"],
  examQuestions: [
    { type: "short", marks: 2, question: "What does the bonsai represent?", modelAnswerGuidance: ["Women limited by society."] },
    { type: "analytical", marks: 6, question: "How does Piercy use the bonsai as a metaphor?", modelAnswerGuidance: ["Cite pruning.", "Cite pot.", "Link to women."] },
  ],
  commonMistakes: ["Saying 'just about a tree'.", "Missing the feminism."],
  quickRevision: {
    keyPoints: ["Bonsai = women.", "Gardener = patriarchy.", "Themes: limitation, resistance."],
    keyVocabulary: ["Artifice", "Bonsai", "Dwarfed"],
    examPoints: ["Cite metaphor.", "Identify irony."],
    selfTest: ["What is the metaphor?", "What is the message?"],
  },
};
