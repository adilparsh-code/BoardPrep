export * from "./types";
export * from "./language";
export * from "./literature";
export * from "./questions";
export * from "./revision";
export * from "./tests";

export const icseEnglishClass9Meta = {
  board: "ICSE" as const,
  class: 9 as const,
  subject: "English" as const,
  academicYearBasis: "ICSE Year 2027",
  components: ["Language", "Literature"] as const,
  paperStructure: {
    paper1: {
      name: "English Language",
      totalMarks: 80,
      sections: [
        { q: 1, area: "Composition", marks: 20 },
        { q: 2, area: "Letter Writing", marks: 10 },
        { q: 3, area: "Notice & Email", marks: 10 },
        { q: 4, area: "Comprehension", marks: 20 },
        { q: 5, area: "Grammar & Usage", marks: 20 },
      ],
    },
    paper2: {
      name: "Literature in English",
      totalMarks: 80,
      sections: [
        { section: "A", area: "Drama (Julius Caesar, Acts I & II)", marks: 20 },
        { section: "B", area: "Prose (Treasure Chest)", marks: 30 },
        { section: "C", area: "Poetry (Treasure Chest)", marks: 30 },
      ],
    },
  },
} as const;
