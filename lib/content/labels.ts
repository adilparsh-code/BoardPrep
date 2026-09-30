import type { BaselineStatus, ChapterKind, QuestionType, SyllabusStatus } from "./types";

export const QUESTION_TYPE_LABEL: Record<QuestionType, string> = {
  mcq: "Multiple choice",
  short: "Short answer",
  long: "Long answer",
  extract: "Extract-based",
  analytical: "Analytical",
  "fill-blank": "Fill in the blank",
  transformation: "Transformation",
  hots: "Higher-order thinking",
};

export const KIND_LABEL: Record<ChapterKind, string> = {
  grammar: "Grammar",
  composition: "Composition",
  comprehension: "Comprehension",
  prose: "Prose",
  poetry: "Poetry",
  drama: "Drama",
};

export const BASELINE_LABEL: Record<BaselineStatus, string> = {
  "repository-baseline": "From repository baseline (not re-verified)",
  "official-verified": "Verified against official CISCE document",
  pending: "Official list pending",
};

export const SYLLABUS_LABEL: Record<SyllabusStatus, string> = {
  listed: "In syllabus baseline",
  supplementary: "Supplementary practice",
};
