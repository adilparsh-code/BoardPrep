import type { LiteratureModule } from "../../types";

export const homeComing: LiteratureModule = {
  id: "icse-9-eng-lit-prose-01-04",
  title: "The Home-coming",
  author: "Rabindranath Tagore",
  genre: "prose",
  difficulty: "hard",
  learningObjective: "Understand Tagore's exploration of emotional neglect and the meaning of home.",
  background: {
    author: "Rabindranath Tagore (1861-1941), Nobel laureate (1913). Wrote India's and Bangladesh's national anthems.",
    context: "Rural Bengal and Calcutta, late 19th/early 20th century.",
    setting: "A village in Bengal; later, Calcutta.",
  },
  vocabulary: [
    { word: "Home-coming", meaning: "Return to one's home" },
    { word: "Mischievous", meaning: "Playfully naughty" },
    { word: "Estranged", meaning: "Separated and distant" },
    { word: "Delirious", meaning: "Feverish and confused" },
  ],
  overview: "Phatik, a fourteen-year-old boy misunderstood by his mother, goes to Calcutta with his uncle for a better education. He is lonely, neglected by his aunt, and dies of emotional heartbreak.",
  sections: [
    { id: "s1", title: "Phatik in the Village", whatHappens: "Phatik is leader of village boys; his mother considers him wild.", whatItMeans: "Emotional neglect at home.", whyItMatters: "Establishes root cause.", keyDetails: ["Mother favours Makhan", "Phatik leads a gang"] },
    { id: "s2", title: "The Log Incident", whatHappens: "Phatik pushes Makhan aside; Makhan complains; Phatik is beaten.", whatItMeans: "Injustice at home.", whyItMatters: "Turning point.", keyDetails: ["Mother doesn't listen"] },
    { id: "s3", title: "Calcutta", whatHappens: "Phatik goes to Calcutta; aunt resents him; he is lonely.", whatItMeans: "Home is not a place; it is a feeling.", whyItMatters: "Homesickness deepens.", keyDetails: ["Cold aunt", "Unfriendly cousin"] },
    { id: "s4", title: "Death", whatHappens: "Phatik falls ill; asks for his mother; dies.", whatItMeans: "Emotional neglect is fatal.", whyItMatters: "Tragic resolution.", keyDetails: ["Delirious request", "Mother arrives too late"] },
  ],
  characters: [
    { name: "Phatik", introduction: "Fourteen-year-old boy from Bengal.", personality: "Mischievous, sensitive, starved for affection.", motivations: "To be loved.", importantActions: ["Leads village boys", "Goes to Calcutta", "Asks for his mother on deathbed"], development: "Victim of circumstances.", evidence: ["Asked, 'Uncle, have you brought my mother?'"], examAngles: ["Is Phatik a victim or troublemaker?"] },
    { name: "Phatik's Mother", introduction: "Widow; favours Makhan.", personality: "Strict, impatient, blind to Phatik's needs.", motivations: "Survival.", importantActions: ["Beats Phatik", "Allows him to go"], development: "Static.", evidence: ["Calls Phatik 'wild'."], examAngles: ["Is she a bad mother?"] },
    { name: "The Uncle", introduction: "Maternal uncle, schoolteacher in Calcutta.", personality: "Well-meaning but emotionally blind.", motivations: "To help Phatik.", importantActions: ["Takes Phatik to Calcutta", "Visits him when ill"], development: "Realises too late.", evidence: ["Shocked by Phatik's question."], examAngles: ["Is the uncle responsible?"] },
  ],
  themes: [
    { theme: "Emotional Neglect", evidence: "Phatik is fed but not loved.", explanation: "Neglect is a form of abuse.", significance: "Warns adults to pay attention to children's emotional needs." },
    { theme: "The Meaning of Home", evidence: "Phatik is homesick in Calcutta.", explanation: "Home is belonging, not a place.", significance: "Title is ironic — Phatik never finds home." },
    { theme: "Misunderstanding Children", evidence: "Adults misjudge Phatik.", explanation: "Assumptions can be fatal.", significance: "Critique of adult blindness." },
  ],
  literaryDevices: [
    { device: "Pathos", definition: "Quality that evokes pity.", example: "Phatik's deathbed scene.", effect: "Reader feels his pain.", whyUsed: "Empathy." },
    { device: "Irony", definition: "Contrast between expectation and reality.", example: "Phatik goes to Calcutta for a 'better life'; he dies there.", effect: "Tragic inevitability.", whyUsed: "Critique of adult blindness." },
    { device: "Symbolism", definition: "Objects representing deeper meanings.", example: "The log Phatik pushes represents his bid for freedom.", effect: "Deepens meaning.", whyUsed: "Adds layers." },
  ],
  extracts: [
    { id: "e1", context: "Phatik's reputation.", situation: "Mother describes Phatik as wild.", meaning: "Misunderstanding by own family.", significance: "Root cause of tragedy.", likelyQuestions: [{ question: "How does Phatik's mother treat him?", answer: "With harshness and impatience; favours Makhan.", explanation: "Emotional neglect." }] },
    { id: "e2", context: "Deathbed.", speaker: "Phatik", situation: "Phatik asks, 'Uncle, have you brought my mother?'", meaning: "Deepest longing for love.", significance: "Emotional climax.", likelyQuestions: [{ question: "What did Phatik ask and why?", answer: "He asked for his mother — his deepest need was love.", explanation: "Lifelong longing." }] },
  ],
  thinkingQuestions: [
    "Why does Phatik's mother favour Makhan?",
    "Is the uncle responsible for Phatik's death?",
    "Is the title ironic?",
  ],
  examQuestions: [
    { type: "short", marks: 2, question: "What happened during the log incident?", modelAnswerGuidance: ["Mention Makhan, Phatik's push, mother's reaction."] },
    { type: "analytical", marks: 6, question: "How does Tagore explore emotional neglect?", modelAnswerGuidance: ["Cite family dynamics.", "Cite Calcutta loneliness.", "Cite deathbed scene."] },
  ],
  commonMistakes: [
    "Calling Phatik 'naughty'.",
    "Blaming only the mother.",
    "Ignoring the uncle's role.",
  ],
  quickRevision: {
    keyPoints: ["Phatik = misunderstood boy.", "Emotional neglect is fatal.", "Title is ironic.", "Themes: home, belonging, neglect."],
    keyVocabulary: ["Estranged", "Delirious", "Home-coming"],
    examPoints: ["Deathbed extract is common.", "Cite textual evidence."],
    selfTest: ["Why does Phatik go to Calcutta?", "How does he die?", "What is the message?"],
  },
};
