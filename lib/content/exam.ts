/**
 * Server-side helpers that turn a subject manifest into the two things the
 * practice surfaces need: a pool of questions a test may draw from, and the
 * list of *verified* past-year questions.
 *
 * Server-only (reads the file system). Both lists are built from published
 * chapter bodies only.
 */
import { flattenChapters, getChapter, getSubject } from "./loader";
import type { ChapterLocation } from "./types";
import { routes } from "./routes";
import { isPyq, type PyqQuestion } from "./pyq";
import type { TestPoolItem } from "../tests";

export interface SubjectPool {
  /** Everything published in the subject, for tests and filters. */
  items: TestPoolItem[];
  /** Only questions explicitly recorded as reproduced past-paper items. */
  pyqs: PyqQuestion[];
  /** Per-chapter pool, used by chapter tests. */
  byChapter: Record<string, TestPoolItem[]>;
  /** Per-section pool, used by unit tests. */
  bySection: Record<string, TestPoolItem[]>;
  /** Chapters with at least one published question. */
  testableChapters: { id: string; title: string; slug: string; sectionId: string; sectionTitle: string; questions: number; marks: number; href: string }[];
  /** Verifiable facts about the pool, used for honest empty states. */
  counts: { questions: number; mcqs: number; byDifficulty: Record<string, number>; byType: Record<string, number>; years: number[] };
}

function locationsWithBodies(board: string, cls: string, subject: string): ChapterLocation[] {
  const subj = getSubject(board, cls, subject);
  if (!subj) return [];
  const out: ChapterLocation[] = [];
  for (const loc of flattenChapters(subj)) {
    if (loc.chapter.status !== "published" || !loc.chapter.file) continue;
    out.push(loc);
  }
  return out;
}

export function buildSubjectPool(board: string, cls: string, subject: string): SubjectPool {
  const subj = getSubject(board, cls, subject);
  const items: TestPoolItem[] = [];
  const pyqs: PyqQuestion[] = [];
  const byChapter: SubjectPool["byChapter"] = {};
  const bySection: SubjectPool["bySection"] = {};
  const testableChapters: SubjectPool["testableChapters"] = [];
  const counts: SubjectPool["counts"] = {
    questions: 0,
    mcqs: 0,
    byDifficulty: {},
    byType: {},
    years: [],
  };
  if (!subj) return { items, pyqs, byChapter, bySection, testableChapters, counts };

  for (const loc of locationsWithBodies(board, cls, subject)) {
    const chapter = getChapter(board, cls, subject, loc.chapter);
    if (!chapter || chapter.questions.length === 0) continue;

    const href = routes.chapter(board, cls, subject, loc.chapter.slug);
    const chapterItems: TestPoolItem[] = chapter.questions.map((q) => ({
      question: q,
      chapterId: loc.chapter.id,
      chapterTitle: loc.chapter.title,
      chapterSlug: loc.chapter.slug,
      href,
      year: q.year,
      origin: q.origin,
    }));

    items.push(...chapterItems);
    byChapter[loc.chapter.id] = chapterItems;
    (bySection[loc.section.id] ??= []).push(...chapterItems);

    for (const q of chapter.questions) {
      counts.byDifficulty[q.difficulty] = (counts.byDifficulty[q.difficulty] ?? 0) + 1;
      counts.byType[q.type] = (counts.byType[q.type] ?? 0) + 1;
      if (q.type === "mcq") counts.mcqs++;
      if (isPyq(q)) {
        pyqs.push({
          ...q,
          year: q.year as number,
          chapterId: loc.chapter.id,
          chapterTitle: loc.chapter.title,
          chapterSlug: loc.chapter.slug,
          href,
          topic: loc.group.title,
        });
        counts.years.push(q.year as number);
      }
    }

    testableChapters.push({
      id: loc.chapter.id,
      title: loc.chapter.title,
      slug: loc.chapter.slug,
      sectionId: loc.section.id,
      sectionTitle: loc.section.title,
      questions: chapter.questions.length,
      marks: chapter.questions.reduce((n, q) => n + q.marks, 0),
      href,
    });
  }

  counts.questions = items.length;
  counts.years = [...new Set(counts.years)].sort((a, b) => b - a);
  return { items, pyqs, byChapter, bySection, testableChapters, counts };
}