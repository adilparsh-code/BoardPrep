import type { CompositionTopic } from "../../types";

export const noticeEmail: CompositionTopic = {
  id: "icse-9-eng-lang-comp-08",
  title: "Notice and Email Writing",
  difficulty: "easy",
  learningObjective: "Write notices and emails with correct format and clear purpose.",
  whatItIs: "Notice = short formal announcement. Email = modern formal/informal message.",
  whyItMatters: "ICSE Q3 is 10 marks — notice and email.",
  thinkingFramework: [
    "What is the purpose?",
    "Who is the audience?",
    "What are the 5 W's? (Who, What, When, Where, Why)",
    "What tone?",
  ],
  structure: [
    { section: "Notice — Heading", purpose: "NAME OF ORGANISATION + 'NOTICE'", wordCountGuide: "2 lines" },
    { section: "Notice — Date", purpose: "Below heading", wordCountGuide: "1 line" },
    { section: "Notice — Body", purpose: "5 W's in 50-70 words", wordCountGuide: "50-70 words" },
    { section: "Notice — Signature", purpose: "Name + Designation", wordCountGuide: "2 lines" },
    { section: "Email — To/Subject", purpose: "Recipient + clear subject line", wordCountGuide: "2 lines" },
    { section: "Email — Salutation + Body + Closing", purpose: "Formal message", wordCountGuide: "80-120 words" },
  ],
  vocabularyBank: ["This is to inform", "All students are hereby informed", "Kindly note", "Regards"],
  paragraphDevelopment: [
    "Notice: brevity and clarity.",
    "Email: purpose in first sentence.",
    "No informal language in formal communication.",
  ],
  modelResponse: "ST. XAVIER'S SCHOOL\nNOTICE\n15 March 2026\n\nINTER-HOUSE QUIZ COMPETITION\n\nAll students of Classes IX and X are hereby informed that the Inter-House Quiz Competition will be held on 25 March 2026 in the school auditorium at 10 a.m. Interested students may register with their class teachers by 20 March.\n\nRavi Kumar\nHead Boy",
  weakResponse: "Notice. Quiz on 25th. Come. — Ravi",
  improvedResponse: "ST. XAVIER'S SCHOOL\nNOTICE\n15 March 2026\n\nINTER-HOUSE QUIZ COMPETITION\n\nAll students of Classes IX and X are informed that the Inter-House Quiz will be held on 25 March 2026 at 10 a.m. in the school auditorium. Interested students should register with their class teachers by 20 March.",
  commonMistakes: [
    { incorrect: "Missing 5 W's in notice", corrected: "Include Who, What, When, Where, Why.", explanation: "Completeness." },
    { incorrect: "Informal tone in email", corrected: "Use 'Dear Sir/Madam' and 'Regards'.", explanation: "Register." },
  ],
  examinerChecklist: [
    "Does the notice include all 5 W's?",
    "Is the notice under 70 words?",
    "Does the email have a clear subject line?",
    "Is the tone appropriate?",
    "Is the format correct?",
  ],
  practiceQuestions: [
    { question: "Write a notice for a school excursion to a historical site.", hint: "Include date, place, cost, contact.", answer: "Format + 5 W's + signature.", explanation: "Notice writing." },
    { question: "Write an email to your principal requesting a leave of absence.", hint: "Formal email format.", answer: "Subject + salutation + purpose + details + closing.", explanation: "Formal email." },
  ],
  quickRevision: {
    keyPoints: ["Notice: 5 W's, brief.", "Email: subject + salutation + body + closing."],
    memoryTip: "5 W's for notice.",
    examTip: "Notice must be under 70 words.",
  },
};
