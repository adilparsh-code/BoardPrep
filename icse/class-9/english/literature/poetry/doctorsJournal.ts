import type { LiteratureModule } from "../../types";

export const doctorsJournal: LiteratureModule = {
  id: "icse-9-eng-lit-poetry-01-04",
  title: "A Doctor's Journal Entry for August 6, 1945",
  author: "Vikram Seth",
  genre: "poetry",
  difficulty: "hard",
  learningObjective: "Understand the horror of nuclear war and the resilience of human compassion.",
  background: {
    author: "Vikram Seth (b. 1952), Indian poet and novelist. Wrote The Golden Gate and A Suitable Boy.",
    context: "Atomic bombing of Hiroshima, August 6, 1945.",
    setting: "Hiroshima, Japan.",
  },
  vocabulary: [
    { word: "Journal", meaning: "Daily record" },
    { word: "Delirious", meaning: "Feverish and confused" },
    { word: "Witness", meaning: "Person who sees an event" },
  ],
  overview: "A Japanese doctor describes the immediate aftermath of the Hiroshima bombing in his journal. He survives, treats the wounded, and reflects on the horror and his gratitude for being alive.",
  sections: [
    { id: "s1", title: "Ordinary Morning", whatHappens: "The morning begins like any other.", whatItMeans: "Ordinariness makes horror more shocking.", whyItMatters: "Sets contrast.", keyDetails: ["Clinic routine"] },
    { id: "s2", title: "The Bomb", whatHappens: "Flash of light; explosion.", whatItMeans: "Catastrophe.", whyItMatters: "Climax.", keyDetails: ["Doctor thrown to ground"] },
    { id: "s3", title: "Aftermath", whatHappens: "Doctor treats wounded; lacks medicine.", whatItMeans: "Helplessness and duty.", whyItMatters: "Human response.", keyDetails: ["Burns, wounds, suffering"] },
    { id: "s4", title: "Reflection", whatHappens: "Doctor grateful to be alive.", whatItMeans: "Resilience.", whyItMatters: "Poem's message.", keyDetails: ["Determined to help"] },
  ],
  themes: [
    { theme: "Horror of War", evidence: "Description of destruction.", explanation: "Nuclear war destroys all.", significance: "Warning against weapons." },
    { theme: "Compassion and Duty", evidence: "Doctor treats wounded.", explanation: "Humanity persists in horror.", significance: "Celebrates resilience." },
    { theme: "Witness and Memory", evidence: "Journal form.", explanation: "Records for future.", significance: "Poem asks us to remember." },
  ],
  literaryDevices: [
    { device: "First-person Narrative", definition: "Told by 'I'.", example: "Doctor's voice.", effect: "Immediacy and intimacy.", whyUsed: "Personal horror." },
    { device: "Imagery", definition: "Vivid sensory description.", example: "Flash, fire, wounded.", effect: "Visceral horror.", whyUsed: "Witness." },
    { device: "Contrast", definition: "Opposites side by side.", example: "Ordinary morning vs bomb.", effect: "Shock.", whyUsed: "Heightens horror." },
  ],
  extracts: [
    { id: "e1", context: "Opening.", situation: "Morning described as ordinary.", meaning: "Contrast to come.", significance: "Sets tone.", likelyQuestions: [{ question: "Why is 'ordinary morning' significant?", answer: "It makes the horror more shocking by contrast.", explanation: "Literary device." }] },
  ],
  thinkingQuestions: ["How does Seth use first-person?", "What is the poet's attitude to war?"],
  examQuestions: [
    { type: "short", marks: 2, question: "Who is the speaker?", modelAnswerGuidance: ["Japanese doctor."] },
    { type: "analytical", marks: 6, question: "How does Seth create horror?", modelAnswerGuidance: ["Cite imagery.", "Cite contrast.", "Cite first-person."] },
  ],
  commonMistakes: ["Treating as just war poem.", "Ignoring first-person."],
  quickRevision: {
    keyPoints: ["Hiroshima bombing.", "Doctor's perspective.", "Themes: war, compassion, witness."],
    keyVocabulary: ["Journal", "Witness"],
    examPoints: ["Cite contrast.", "Cite first-person voice."],
    selfTest: ["Who is speaking?", "What is the theme?"],
  },
};
