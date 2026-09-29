export * from "./civicsQuestions";
export * from "./historyQuestions";
export * from "./mcqBank";

import { civicsQuestions } from "./civicsQuestions";
import { historyQuestions } from "./historyQuestions";
import { mcqQuestions } from "./mcqBank";

export const questionBankMeta = {
  totalQuestions: civicsQuestions.length + historyQuestions.length + mcqQuestions.length,
  mcqCount: mcqQuestions.length,
  note: "Foundation question bank for Class 9 History & Civics; more PYQ-style items to be added over time.",
};