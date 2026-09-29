import type { GrammarTopic } from "../../types";

export const directIndirectSpeech: GrammarTopic = {
  id: "icse-9-eng-lang-gram-11",
  title: "Direct and Indirect Speech",
  difficulty: "medium",
  learningObjective: "Convert statements, questions, commands, exclamations between direct and indirect speech.",
  concept: "Direct quotes exactly. Indirect reports without quotes, with changes in pronouns, tense, time/place words.",
  whyItMatters: "ICSE tests direct-to-indirect conversion.",
  rules: [
    "said → said; said to → told.",
    "Pronouns shift by speaker/listener.",
    "Tense shifts one step back.",
    "Time/place: now→then, today→that day, here→there.",
    "Questions: if/whether for yes/no; keep wh-word; change word order.",
    "Commands: told/ordered/requested + to + verb.",
  ],
  examples: {
    easy: [{ text: "Direct: He said, \"I am tired.\"", note: "Indirect: He said that he was tired." }],
    medium: [{ text: "Direct: She said to me, \"Do you like tea?\"", note: "Indirect: She asked me if I liked tea." }],
    hard: [{ text: "Direct: The teacher said, \"Submit your work tomorrow.\"", note: "Indirect: The teacher told us to submit our work the next day." }],
  },
  incorrectExamples: ["He said that he is tired.", "She asked me do I like tea."],
  correctedExamples: [
    { incorrect: "He said that he is tired.", corrected: "He said that he was tired.", explanation: "Tense shift." },
    { incorrect: "She asked me do I like tea.", corrected: "She asked me if I liked tea.", explanation: "if/whether + statement order." },
    { incorrect: "He told me to not go.", corrected: "He told me not to go.", explanation: "not to + verb." },
  ],
  commonMistakes: ["No tense shift.", "Wrong pronoun.", "Wrong word order."],
  guidedPractice: [
    { question: "Change: He said, \"I will come tomorrow.\"", hint: "Shift tense + time.", answer: "He said that he would come the next day.", explanation: "Will→would; tomorrow→next day." },
  ],
  independentPractice: [
    { question: "Change: Mother said to me, \"Don't waste time.\"", answer: "Mother told me not to waste time.", explanation: "Command → told + not to + verb." },
  ],
  examStyleQuestions: [
    { question: "Change: The captain said, \"What a glorious victory!\"", answer: "The captain exclaimed with joy that it was a glorious victory.", explanation: "Exclamation → exclaimed with emotion." },
  ],
  quickRevision: {
    keyPoints: ["Pronouns, tense, time/place change.", "said to → told."],
    memoryTip: "SOFT: Subject, Object, Form, Time.",
    examTip: "Change word order for questions.",
  },
};
