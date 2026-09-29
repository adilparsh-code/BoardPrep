import type { LiteratureModule } from "../../types";

export const modelMillionaire: LiteratureModule = {
  id: "icse-9-eng-lit-prose-01-03",
  title: "The Model Millionaire",
  author: "Oscar Wilde",
  genre: "prose",
  difficulty: "easy",
  learningObjective: "Understand how Wilde uses irony to critique Victorian obsessions with money and class.",
  background: {
    author: "Oscar Wilde (1854-1900), Irish poet and playwright, master of wit and irony.",
    context: "Victorian England's obsession with money and class.",
    setting: "London, 1880s; artist's studio and wealthy drawing rooms.",
  },
  vocabulary: [
    { word: "Millionaire", meaning: "Person with a million pounds or more" },
    { word: "Model", meaning: "Person posing for an artist" },
    { word: "Epigram", meaning: "Short witty saying" },
    { word: "Sovereign", meaning: "Gold coin worth one pound" },
  ],
  overview: "Hughie Erskine, a charming but poor young man, gives his last sovereign to a 'beggar' who is actually Baron Hausberg, one of Europe's richest men. The Baron rewards him with £10,000, allowing Hughie to marry Laura.",
  sections: [
    { id: "s1", title: "Hughie's Character", whatHappens: "Hughie is handsome, charming, kind — but penniless and unsuccessful in business.", whatItMeans: "He has what society claims to value but not what it rewards.", whyItMatters: "Sets up the critique.", keyDetails: ["Tried business, stockbroking, dry sherry", "Everything except money"] },
    { id: "s2", title: "Laura and the £10,000 Condition", whatHappens: "Laura's father demands £10,000 before marriage.", whatItMeans: "Love requires money in Victorian society.", whyItMatters: "Central conflict.", keyDetails: ["Colonel Merton's condition"] },
    { id: "s3", title: "The Generous Act", whatHappens: "Hughie gives his last sovereign to a beggar posing for Alan Trevor.", whatItMeans: "Pure generosity — no expectation of return.", whyItMatters: "Moral centre.", keyDetails: ["Doesn't know the beggar is a Baron"] },
    { id: "s4", title: "The Reveal and Reward", whatHappens: "Alan reveals the beggar was Baron Hausberg, who sends Hughie £10,000.", whatItMeans: "Kindness rewarded.", whyItMatters: "Resolution.", keyDetails: ["The Baron got a good return on his investment"] },
  ],
  characters: [
    { name: "Hughie Erskine", introduction: "Handsome, charming, poor young man.", personality: "Generous, kind, impractical.", motivations: "Love for Laura.", importantActions: ["Gives his last sovereign"], development: "Static but rewarded.", evidence: ["'He had everything in the world except money.'"], examAngles: ["Is Hughie a failure or a success?"] },
    { name: "Baron Hausberg", introduction: "One of Europe's richest men.", personality: "Playful, curious, generous.", motivations: "Testing human nature.", importantActions: ["Poses as beggar", "Rewards Hughie"], development: "Static.", evidence: ["Doesn't mind paying for a joke."], examAngles: ["Why does he pose as a beggar?"] },
    { name: "Alan Trevor", introduction: "Painter; Hughie's friend.", personality: "Practical, cynical, amused.", motivations: "Art and friendship.", importantActions: ["Paints the Baron", "Reveals truth"], development: "Static.", evidence: ["'Alan Trevor was a painter, and a very good one too.'"], examAngles: ["What role does he play?"] },
  ],
  themes: [
    { theme: "Generosity", evidence: "Hughie gives his last sovereign.", explanation: "Pure generosity, no expectation.", significance: "Kindness is its own reward." },
    { theme: "Appearance vs Reality", evidence: "The 'beggar' is a Baron.", explanation: "Things are not what they seem.", significance: "Critique of Victorian superficiality." },
    { theme: "Wealth and Class", evidence: "£10,000 condition; Hughie judged as failure.", explanation: "Money is not the only measure of worth.", significance: "Wilde critiques Victorian materialism." },
  ],
  literaryDevices: [
    { device: "Irony", definition: "Contrast between expectation and reality.", example: "The 'model millionaire' is a beggar who is a millionaire.", effect: "Humour + critique.", whyUsed: "Entertain and instruct." },
    { device: "Epigram", definition: "Short witty saying.", example: "'He had everything in the world except money.'", effect: "Encapsulates critique.", whyUsed: "Wit." },
  ],
  extracts: [
    { id: "e1", context: "Introduction of Hughie.", situation: "Wilde describes Hughie's qualities.", meaning: "Society doesn't reward character.", significance: "Sets up theme.", likelyQuestions: [{ question: "What are Hughie's good qualities?", answer: "Handsome, charming, kind, popular.", explanation: "Character over wealth." }] },
    { id: "e2", context: "Hughie gives the sovereign.", situation: "Hughie gives his last coin to the 'beggar'.", meaning: "Pure generosity.", significance: "Moral centre.", likelyQuestions: [{ question: "Why did Hughie give his last sovereign?", answer: "He felt sorry for the beggar; no expectation of return.", explanation: "Blind generosity." }] },
  ],
  thinkingQuestions: [
    "Why does the Baron pose as a beggar?",
    "Is the ending a happy ending?",
    "What is ironic about the title?",
  ],
  examQuestions: [
    { type: "short", marks: 2, question: "Why could Hughie not marry Laura?", modelAnswerGuidance: ["Mention the £10,000 condition."] },
    { type: "analytical", marks: 6, question: "How does Wilde use irony to critique Victorian society?", modelAnswerGuidance: ["Cite title irony.", "Cite Hughie's 'failure' as virtue.", "Cite reward irony."] },
  ],
  commonMistakes: [
    "Calling the Baron the hero.",
    "Missing the irony of the title.",
    "Calling Hughie stupid.",
  ],
  quickRevision: {
    keyPoints: ["Hughie = generous but poor.", "Baron = beggar in disguise.", "Title is ironic.", "Themes: generosity, appearance vs reality."],
    keyVocabulary: ["Millionaire", "Sovereign", "Epigram"],
    examPoints: ["Cite the £10,000 reward.", "Use textual evidence."],
    selfTest: ["Who is the Baron?", "Why does he reward Hughie?", "What is ironic?"],
  },
};
