import type { CompositionTopic } from "../../types";

export const letterWriting: CompositionTopic = {
  id: "icse-9-eng-lang-comp-07",
  title: "Letter Writing",
  difficulty: "medium",
  learningObjective: "Write formal and informal letters with correct format and appropriate tone.",
  whatItIs: "Letters communicate with a specific reader for a specific purpose. Formal = official. Informal = personal.",
  whyItMatters: "ICSE Q2 is 10 marks — letter writing.",
  thinkingFramework: [
    "Who is the reader?",
    "What is my purpose?",
    "What tone (formal/informal)?",
    "What format applies?",
  ],
  structure: [
    { section: "Sender's address", purpose: "Formal: top-left; Informal: top-right", wordCountGuide: "3-4 lines" },
    { section: "Date", purpose: "Below address", wordCountGuide: "1 line" },
    { section: "Salutation", purpose: "Dear Sir/Madam (formal); Dear Uncle (informal)", wordCountGuide: "1 line" },
    { section: "Subject", purpose: "Formal only", wordCountGuide: "1 line" },
    { section: "Body", purpose: "Purpose + details + action", wordCountGuide: "150-200 words" },
    { section: "Closing", purpose: "Yours faithfully (formal); Yours lovingly (informal)", wordCountGuide: "1 line" },
  ],
  vocabularyBank: ["I am writing to", "I wish to bring to your notice", "I would be grateful if", "Looking forward to your response"],
  paragraphDevelopment: [
    "Opening states purpose.",
    "Middle paragraph gives details.",
    "Closing requests action or expresses feeling.",
  ],
  modelResponse: "25, MG Road\nKolkata – 700001\n15 March 2026\n\nThe Editor\nThe Telegraph\nKolkata\n\nSubject: Concern over increasing traffic congestion\n\nSir,\n\nI am writing to draw attention to the severe traffic congestion on MG Road during peak hours...",
  weakResponse: "Dear Sir, There is traffic problem. Please do something. Yours, Ravi",
  improvedResponse: "Sir, I wish to bring to your kind notice the acute traffic congestion that has paralysed MG Road during morning and evening peak hours over the past month.",
  commonMistakes: [
    { incorrect: "Missing subject line in formal letter", corrected: "Always include Subject in formal letters.", explanation: "Format requirement." },
    { incorrect: "Informal tone in formal letter", corrected: "Use 'Yours faithfully' and formal register.", explanation: "Register matters." },
  ],
  examinerChecklist: [
    "Is the format correct?",
    "Is the tone appropriate?",
    "Is the purpose clear in the opening?",
    "Are all required details included?",
    "Is the closing correct?",
  ],
  practiceQuestions: [
    { question: "Write a letter to the Editor about the poor condition of roads in your locality.", hint: "Formal format + balanced tone + specific suggestions.", answer: "Format + purpose + details + polite request.", explanation: "Formal letter to editor." },
    { question: "Write a letter to your friend describing a recent trip.", hint: "Warm tone; personal voice.", answer: "Informal format + personal narrative.", explanation: "Informal letter." },
  ],
  quickRevision: {
    keyPoints: ["Format + tone + purpose.", "Formal: subject line.", "Informal: personal."],
    memoryTip: "F-A-S-B-C: From, Address, Salutation, Body, Closing.",
    examTip: "Format errors cost easy marks.",
  },
};
