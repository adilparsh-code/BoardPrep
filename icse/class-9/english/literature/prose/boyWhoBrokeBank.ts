import type { LiteratureModule } from "../../types";

export const boyWhoBrokeBank: LiteratureModule = {
  id: "icse-9-eng-lit-prose-01-05",
  title: "The Boy who Broke the Bank",
  author: "Ruskin Bond",
  genre: "prose",
  difficulty: "easy",
  learningObjective: "Understand how a rumour becomes a crisis and Bond's comment on human gullibility.",
  background: {
    author: "Ruskin Bond (b. 1934), beloved Indian writer. Known for gentle humour and deep human insight.",
    context: "Small-town India.",
    setting: "Pipalnagar, a dusty, poor Indian town.",
  },
  vocabulary: [
    { word: "Rumour", meaning: "Unverified information spread among people" },
    { word: "Panic", meaning: "Sudden uncontrollable fear" },
    { word: "Collapse", meaning: "Sudden failure" },
    { word: "Gullible", meaning: "Easily deceived" },
  ],
  overview: "Nathu, a sweeper boy at Pipalnagar Bank, complains about his unpaid salary to his friend Sitaram. The complaint becomes a rumour that the bank is collapsing. Townspeople panic, withdraw money, and the bank actually collapses.",
  sections: [
    { id: "s1", title: "Nathu's Complaint", whatHappens: "Nathu, unpaid for months, tells Sitaram he might leave.", whatItMeans: "A small personal frustration.", whyItMatters: "Start of the chain.", keyDetails: ["Sweeper at Pipalnagar Bank"] },
    { id: "s2", title: "The Rumour Spreads", whatHappens: "Sitaram tells others; beggar tells more; rumour grows.", whatItMeans: "Information mutates as it travels.", whyItMatters: "Shows how rumours work.", keyDetails: ["Rumour becomes 'bank is collapsing'"] },
    { id: "s3", title: "Panic", whatHappens: "People rush to withdraw; bank runs out of cash.", whatItMeans: "Fear is contagious.", whyItMatters: "Crisis point.", keyDetails: ["Manager helpless"] },
    { id: "s4", title: "Collapse", whatHappens: "Bank does not open the next day.", whatItMeans: "Self-fulfilling prophecy.", whyItMatters: "Irony of the title.", keyDetails: ["Nathu still looking for job"] },
  ],
  characters: [
    { name: "Nathu", introduction: "Sweeper boy at Pipalnagar Bank.", personality: "Hardworking, frustrated, innocent.", motivations: "To get his salary.", importantActions: ["Complains to Sitaram"], development: "Unknowing catalyst.", evidence: ["Swept the steps vigorously."], examAngles: ["Is Nathu responsible for the collapse?"] },
    { name: "Sitaram", introduction: "Washerman's son at a hair-cutting salon.", personality: "Friendly, talkative, well-connected.", motivations: "Sharing news.", importantActions: ["Spreads the rumour"], development: "Static.", evidence: ["Knows everyone in town."], examAngles: ["What role does Sitaram play?"] },
    { name: "The Bank Manager", introduction: "Manager of Pipalnagar Bank branch.", personality: "Helpless, harassed.", motivations: "To save the bank.", importantActions: ["Tries to calm crowd", "Fails"], development: "Static.", evidence: ["Overwhelmed by the panic."], examAngles: ["Why does he fail?"] },
  ],
  themes: [
    { theme: "The Power of Rumours", evidence: "Complaint becomes bank collapse.", explanation: "Rumours spread faster than facts.", significance: "Words have consequences." },
    { theme: "Fear and Panic", evidence: "People rush to withdraw.", explanation: "Fear is contagious; panic defeats reason.", significance: "Warning about herd behaviour." },
    { theme: "Unintended Consequences", evidence: "Nathu had no intention of breaking the bank.", explanation: "Small actions can have huge effects.", significance: "Every action has ripple effects." },
  ],
  literaryDevices: [
    { device: "Irony", definition: "Contrast between expectation and reality.", example: "Title: 'The Boy who Broke the Bank' — Nathu didn't; the rumour did.", effect: "Highlights absurdity.", whyUsed: "Wit + commentary." },
    { device: "Satire", definition: "Humour for social criticism.", example: "Mocking townspeople's gullibility.", effect: "Exposes human foolishness.", whyUsed: "Social commentary." },
  ],
  extracts: [
    { id: "e1", context: "Nathu's complaint.", speaker: "Nathu to Sitaram.", situation: "Nathu complains about unpaid salary.", meaning: "Small frustration.", significance: "Starting point.", likelyQuestions: [{ question: "Why was Nathu unhappy?", answer: "He had not been paid his salary for months.", explanation: "Personal problem." }] },
    { id: "e2", context: "The collapse.", situation: "Bank runs out of cash.", meaning: "Rumour became truth.", significance: "Climax.", likelyQuestions: [{ question: "How did the rumour spread?", answer: "From Nathu to Sitaram to beggar to the whole town, growing in the telling.", explanation: "Chain reaction." }] },
  ],
  thinkingQuestions: [
    "Is Nathu responsible for the bank's collapse?",
    "How does Bond use humour to make a serious point?",
    "Why is the title ironic?",
  ],
  examQuestions: [
    { type: "short", marks: 2, question: "How did the rumour spread?", modelAnswerGuidance: ["Trace the chain from Nathu to town."] },
    { type: "analytical", marks: 6, question: "How does Bond show the power of rumours?", modelAnswerGuidance: ["Cite start, spread, consequence.", "Comment on human gullibility."] },
  ],
  commonMistakes: [
    "Blaming Nathu.",
    "Missing the irony.",
    "Treating the story as only comic.",
  ],
  quickRevision: {
    keyPoints: ["Nathu = sweeper.", "Rumour spreads.", "Bank collapses.", "Title ironic."],
    keyVocabulary: ["Rumour", "Panic", "Gullible"],
    examPoints: ["Cite chain of spread.", "Comment on satire."],
    selfTest: ["Who spread the rumour?", "What happened to the bank?", "What is the theme?"],
  },
};
