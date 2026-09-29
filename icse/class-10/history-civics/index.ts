export * from "./types";
export * from "./civics";
export * from "./history";
export * from "./questions";
export * from "./revision";
export * from "./tests";

export const icseHistoryCivicsClass10Meta = {
  board: "ICSE" as const,
  class: 10 as const,
  subject: "History & Civics" as const,
  academicYearBasis: "ICSE Year 2027",
  components: ["Civics", "History"] as const,
  paperStructure: {
    paper: {
      name: "History & Civics",
      duration: "2 hours",
      totalMarks: 80,
      internalAssessment: 20,
      parts: [
        {
          part: "Part I",
          marks: 30,
          detail: "Short-answer questions covering the entire syllabus. All questions are compulsory.",
        },
        {
          part: "Part II",
          marks: 50,
          detail: "Section A: Civics (answer 2 of 3 questions). Section B: History (answer 3 of 5 questions).",
        },
      ],
    },
  },
} as const;