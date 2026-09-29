import type { CompositionTopic } from "../../types";

export const argumentative: CompositionTopic = {
  id: "icse-9-eng-lang-comp-04",
  title: "Argumentative / Discursive Composition",
  difficulty: "hard",
  learningObjective: "Take a clear position, support with reasons, address counter-arguments.",
  whatItIs: "Argumentative writing persuades; discursive writing discusses both sides.",
  whyItMatters: "ICSE tests 'express views for/against' and 'discuss'.",
  thinkingFramework: [
    "Choose your position (for/against/discuss).",
    "3 reasons supporting your position.",
    "1 counter-argument + rebuttal.",
    "Strong conclusion.",
  ],
  structure: [
    { section: "Introduction", purpose: "State position clearly", wordCountGuide: "50-60 words" },
    { section: "Reason 1 (PEE)", purpose: "Point → Evidence → Explanation", wordCountGuide: "60-80 words" },
    { section: "Reason 2 (PEE)", purpose: "Second reason", wordCountGuide: "60-80 words" },
    { section: "Counter + Rebuttal", purpose: "Acknowledge opposite; refute", wordCountGuide: "60-80 words" },
    { section: "Conclusion", purpose: "Firm restatement", wordCountGuide: "40-50 words" },
  ],
  vocabularyBank: ["furthermore", "however", "nevertheless", "consequently", "arguably", "evidence suggests", "it is evident that"],
  paragraphDevelopment: [
    "PEE structure: Point, Evidence, Explanation.",
    "Each paragraph = one reason.",
    "Rhetorical questions used sparingly.",
  ],
  modelResponse: "I do not fully agree that 'a single child is a happy child.' While single children may enjoy undivided parental attention, they also miss the companionship and social learning that siblings provide.",
  weakResponse: "Single child is good. Also bad. Many problems. I think so.",
  improvedResponse: "The claim that a single child is a happy child overlooks a crucial dimension of childhood — companionship. Without siblings, a child may grow up without learning the daily give-and-take that builds social resilience.",
  commonMistakes: [
    { incorrect: "No clear position", corrected: "State position in first two sentences.", explanation: "Examiner must know where you stand." },
    { incorrect: "Only one side", corrected: "Acknowledge + rebut the opposite.", explanation: "Shows maturity." },
  ],
  examinerChecklist: [
    "Is my position clear from the start?",
    "Do I have 2-3 reasons?",
    "Did I address the counter-argument?",
    "Is my tone formal and measured?",
    "Does my conclusion restate the position firmly?",
  ],
  practiceQuestions: [
    { question: "Corporal punishment in schools should be abolished. Express your views.", hint: "Choose a side; give 2-3 reasons; address counter.", answer: "Plan: position → 2 reasons → counter + rebuttal → conclusion.", explanation: "Argumentative." },
    { question: "Cinema both entertains and educates the masses. Express your views for or against.", hint: "Define 'educate'; give examples.", answer: "Plan: position → supporting arguments → counter → conclusion.", explanation: "Discursive." },
  ],
  quickRevision: {
    keyPoints: ["Clear position.", "PEE paragraph structure.", "Address opposite view."],
    memoryTip: "PEE — Point, Evidence, Explanation.",
    examTip: "Introduction states position in first two sentences.",
  },
};
