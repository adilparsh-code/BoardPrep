/**
 * BoardPrep content schema (v1).
 *
 * Hierarchy: board -> class -> subject -> section (paper) -> group -> chapter.
 * Everything below `subject` is described by a subject manifest
 * (content/<board>/<class>/<subject>/subject.json). Chapter bodies live in
 * separate JSON files and are loaded one at a time, so listing pages never load
 * full chapter content.
 *
 * All text fields are PLAIN TEXT. They are rendered through React (escaped);
 * never put HTML or markdown in content files. The validator enforces this.
 */

export const SCHEMA_VERSION = 1 as const;

/* ---------- Board / class / subject (navigation) ---------- */

export interface BoardManifest {
  schemaVersion: typeof SCHEMA_VERSION;
  id: string; // e.g. "cisce"
  slug: string; // e.g. "cisce" (must equal folder name)
  name: string; // "CISCE"
  fullName: string;
  description: string;
  classes: ClassRef[];
}

export interface ClassRef {
  slug: string; // "class-9" (must equal folder name)
  label: string; // "Class IX"
  numeral: number; // 9
  description: string;
}

export interface ClassManifest {
  schemaVersion: typeof SCHEMA_VERSION;
  id: string; // "cisce-class-9"
  board: string; // board slug
  slug: string; // class slug
  label: string;
  subjects: SubjectRef[];
}

export interface SubjectRef {
  slug: string; // "english" (must equal folder name)
  title: string;
  description: string;
}

/* ---------- Subject manifest ---------- */

export type BaselineStatus =
  | "repository-baseline" // taken from the repo's data file; not re-verified here
  | "official-verified" // checked against an official CISCE document
  | "pending"; // official list not yet supplied/verified

export interface SyllabusBaseline {
  examYear: number;
  status: BaselineStatus;
  source: string;
  note: string;
}

/**
 * Subject families. Each section of a subject manifest declares one family so
 * the UI and the validator can present a subject appropriately. The list is
 * intentionally not exhaustive: adding a new subject family is a config
 * change here plus a label entry, never a code rewrite.
 */
export type SectionKind =
  | "language"
  | "literature"
  | "civics"
  | "history"
  | "political-science"
  | "geography"
  | "mathematics"
  | "physics"
  | "chemistry"
  | "biology"
  | "computer-science"
  | "accountancy"
  | "business-studies"
  | "economics"
  | "commerce"
  | "sociology"
  | "psychology"
  | "hindi";

export type ChapterStatus = "published" | "planned";
/** "listed" = appears in a syllabus baseline; "supplementary" = extra practice, clearly labelled. */
export type SyllabusStatus = "listed" | "supplementary";
export type ChapterKind =
  // English language
  | "grammar"
  | "composition"
  | "comprehension"
  // Literature
  | "prose"
  | "poetry"
  | "drama"
  // Social science
  | "civics"
  | "history"
  | "political-science"
  | "geography"
  | "sociology"
  | "psychology"
  // STEM
  | "mathematics"
  | "physics"
  | "chemistry"
  | "biology"
  | "computer-science"
  // Commerce
  | "accountancy"
  | "business-studies"
  | "economics"
  | "commerce"
  // Languages
  | "hindi";

export interface ChapterRef {
  id: string;
  slug: string;
  title: string;
  author?: string;
  kind: ChapterKind;
  status: ChapterStatus;
  syllabusStatus: SyllabusStatus;
  /** Exam years whose baseline lists this chapter. */
  examYears: number[];
  blurb: string;
  /** Path relative to the subject folder. Required when status === "published". */
  file?: string;
}

export interface ChapterGroup {
  id: string;
  title: string;
  chapters: ChapterRef[];
}

export interface Section {
  id: string;
  slug: string;
  title: string;
  paperLabel: string;
  kind: SectionKind;
  description: string;
  groups: ChapterGroup[];
}

export interface SubjectManifest {
  schemaVersion: typeof SCHEMA_VERSION;
  id: string;
  board: string;
  classSlug: string;
  subjectSlug: string;
  title: string;
  description: string;
  syllabusBaselines: SyllabusBaseline[];
  sections: Section[];
}

/* ---------- Chapter content ---------- */

export type Block =
  | { type: "paragraph"; text: string }
  | { type: "bullets"; items: string[] }
  | { type: "terms"; items: { term: string; meaning: string }[] }
  | { type: "examples"; items: { text: string; note?: string }[] };

export interface LearnSection {
  id: string;
  title: string;
  blocks: Block[];
}

export interface VocabItem {
  word: string;
  meaning: string;
  context?: string;
}

export const QUESTION_TYPES = [
  "mcq",
  "short",
  "long",
  "extract",
  "analytical",
  "fill-blank",
  "transformation",
  "hots",
] as const;
export type QuestionType = (typeof QUESTION_TYPES)[number];

export const DIFFICULTIES = ["easy", "medium", "hard"] as const;
export type Difficulty = (typeof DIFFICULTIES)[number];

export interface Question {
  id: string;
  type: QuestionType;
  difficulty: Difficulty;
  marks: number;
  /**
   * Provenance. `practice` (or its earlier alias `boardprep`) means original
   * practice written by BoardPrep; `pyq` means the question is a reproduced
   * past-paper question. The two are never mixed in the UI: a practice question
   * is never relabelled as a PYQ, because claiming a board exam question we
   * cannot verify would be false. Only questions carrying a verified `year` may
   * use `pyq`. The default, when omitted, is `practice`.
   */
  origin?: "practice" | "boardprep" | "pyq";
  /** Board exam year. Required when origin === "pyq". */
  year?: number;
  /** For extract questions, put the (short, public-domain) extract in `extract` and the task in `prompt`. */
  extract?: string;
  prompt: string;
  /** MCQ only. */
  options?: string[];
  /** MCQ only: index into `options`. */
  correctIndex?: number;
  /** Model answer. For MCQ, the text of the correct option plus a brief reason is fine. */
  answer: string;
  explanation?: string;
  commonMistake?: string;
}

export type ReviewStatus = "draft" | "reviewed";

export interface Chapter {
  schemaVersion: typeof SCHEMA_VERSION;
  id: string;
  title: string;
  author?: string;
  kind: ChapterKind;
  /** Short line under the title, e.g. "Short story · science fiction". */
  tagline: string;
  reviewStatus: ReviewStatus;
  sourceNote: {
    /** Who owns the underlying work / what is third-party. Empty string if the chapter has no third-party work. */
    thirdParty: string;
    /** What BoardPrep created. */
    boardprep: string;
  };
  overview: { intro: string; facts: { label: string; value: string }[] };
  learn: LearnSection[];
  keyPoints: string[];
  examFocus: string[];
  vocabulary: VocabItem[];
  questions: Question[];
}

/* ---------- Resolved navigation helpers ---------- */

export interface ChapterLocation {
  section: Section;
  group: ChapterGroup;
  chapter: ChapterRef;
  index: number; // position within flattened published order
}
