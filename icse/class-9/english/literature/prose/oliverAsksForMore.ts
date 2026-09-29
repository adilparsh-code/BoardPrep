import type { LiteratureModule } from "../../types";

export const oliverAsksForMore: LiteratureModule = {
  id: "icse-9-eng-lit-prose-01-02",
  title: "Oliver Asks for More",
  author: "Charles Dickens",
  genre: "prose",
  difficulty: "medium",
  learningObjective: "Understand Dickens's critique of the Victorian workhouse system through Oliver's plea.",
  background: {
    author: "Charles Dickens (1812-1870), Victorian novelist. His own childhood poverty informed his social critique.",
    context: "Poor Law of 1834 made workhouses deliberately harsh to discourage dependence.",
    setting: "An unnamed English town, early 19th century; the workhouse.",
  },
  vocabulary: [
    { word: "Workhouse", meaning: "Parish institution providing minimal shelter to the poor under harsh rules" },
    { word: "Gruel", meaning: "Thin, watery oatmeal soup" },
    { word: "Pauper", meaning: "Person reliant on public charity" },
    { word: "Beadle", meaning: "Parish official" },
    { word: "Apprentice", meaning: "Person bound to work for a tradesman" },
  ],
  overview: "Oliver Twist, a nine-year-old orphan in a workhouse, is chosen by the other boys to ask the master for more food. His polite request is treated as rebellion, and he is brutally punished and put up for sale.",
  sections: [
    { id: "s1", title: "Oliver's Birth", whatHappens: "Oliver is born in a workhouse; his mother dies.", whatItMeans: "Oliver is orphaned and stigmatised.", whyItMatters: "Establishes his vulnerability.", keyDetails: ["Mother found lying in the street", "No wedding ring"] },
    { id: "s2", title: "The Boys' Hunger", whatHappens: "Boys fed thin gruel three times daily; bowls need no washing.", whatItMeans: "Systematic starvation.", whyItMatters: "Shows institutional cruelty.", keyDetails: ["Bowls scraped clean", "Perpetual hunger"] },
    { id: "s3", title: "The Request", whatHappens: "Oliver says 'Please, sir, I want some more.'", whatItMeans: "A polite request becomes insurrection.", whyItMatters: "Climax of the extract.", keyDetails: ["Master stupefied", "Hits Oliver with spoon"] },
    { id: "s4", title: "Punishment and Sale", whatHappens: "Oliver locked in dark room, beaten daily, put up for five pounds.", whatItMeans: "The system disposes of children.", whyItMatters: "Full extent of injustice.", keyDetails: ["One week confinement", "Five-pound reward"] },
  ],
  characters: [
    { name: "Oliver Twist", introduction: "Nine-year-old orphan born in the workhouse.", personality: "Gentle, timid, quietly courageous.", motivations: "Survival, hunger.", importantActions: ["Asks for more"], development: "Static victim figure.", evidence: ["'Please, sir, I want some more.'"], examAngles: ["Is Oliver brave or a victim?"] },
    { name: "Mr. Bumble", introduction: "The parish beadle.", personality: "Cruel, self-important, hypocritical.", motivations: "Maintaining order, saving parish money.", importantActions: ["Confirms Oliver's punishment", "Arranges apprenticeship"], development: "Static.", evidence: ["Predicts Oliver will be hanged."], examAngles: ["What kind of man is Bumble?"] },
    { name: "The Master", introduction: "Workhouse official serving food.", personality: "Authoritarian, easily shocked.", motivations: "Enforcing rules.", importantActions: ["Hits Oliver with spoon"], development: "Static.", evidence: ["Stupefied at Oliver's request."], examAngles: ["Why does he react so violently?"] },
  ],
  themes: [
    { theme: "Poverty and Social Injustice", evidence: "Boys fed thin gruel; Oliver punished for asking more.", explanation: "Poverty treated as crime.", significance: "Dickens attacks the Poor Law of 1834." },
    { theme: "Institutional Cruelty", evidence: "Bumble, master, board all complicit.", explanation: "Cruelty is bureaucratic, not personal.", significance: "Systems can be cruel even if individuals aren't evil." },
    { theme: "Childhood Innocence vs Adult Cruelty", evidence: "Oliver's polite request; violent response.", explanation: "Contrast highlights injustice.", significance: "Dickens defends childhood." },
  ],
  literaryDevices: [
    { device: "Irony", definition: "Contrast between expectation and reality.", example: "Workhouse called 'house for poor people' — actually a prison.", effect: "Exposes hypocrisy.", whyUsed: "Satire." },
    { device: "Contrast", definition: "Placing opposites side by side.", example: "Fat master vs thin boys.", effect: "Makes injustice visible.", whyUsed: "Moral point." },
    { device: "Pathos", definition: "Quality that evokes pity.", example: "Oliver alone in dark room.", effect: "Reader feels his suffering.", whyUsed: "Empathy for the poor." },
  ],
  extracts: [
    { id: "e1", context: "The famous request.", speaker: "Oliver", situation: "After supper, Oliver asks the master for more.", meaning: "A hungry child asks for enough to live.", significance: "Central moment.", likelyQuestions: [{ question: "What did Oliver say and why?", answer: "He said 'Please, sir, I want some more' because he was starving.", explanation: "Hunger, not greed." }] },
    { id: "e2", context: "Punishment.", situation: "Oliver confined and beaten daily.", meaning: "System punishes disobedience, not hunger.", significance: "Full cruelty revealed.", likelyQuestions: [{ question: "How was Oliver punished?", answer: "Locked in a dark room for a week and beaten daily.", explanation: "Disproportionate." }] },
  ],
  thinkingQuestions: [
    "Why do the boys draw lots?",
    "Is Oliver brave or a victim?",
    "Why does the five-pound reward matter?",
  ],
  examQuestions: [
    { type: "short", marks: 2, question: "How were the boys fed?", modelAnswerGuidance: ["Mention thin gruel three times a day.", "Note bowls never needed washing."] },
    { type: "analytical", marks: 6, question: "How does Dickens expose the cruelty of the workhouse system?", modelAnswerGuidance: ["Cite physical cruelty.", "Cite psychological cruelty.", "Cite bureaucratic cruelty."] },
  ],
  commonMistakes: [
    "Calling Oliver greedy.",
    "Ignoring the Poor Law context.",
    "Treating Bumble as the only villain.",
  ],
  quickRevision: {
    keyPoints: ["Oliver = orphan victim.", "Request = polite but treated as rebellion.", "System = institutional cruelty.", "Dickens = critiques 1834 Poor Law."],
    keyVocabulary: ["Workhouse", "Gruel", "Pauper", "Beadle"],
    examPoints: ["Extract on the request is common.", "Cite textual evidence."],
    selfTest: ["Why was Oliver punished?", "Who was Mr. Bumble?", "What did the notice say?"],
  },
};
