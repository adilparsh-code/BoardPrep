/**
 * PYQ (past-year question) layer.
 *
 * The single most important rule in this file: a practice question is never
 * presented as a past board-exam question. Questions are separated by their
 * recorded `origin`/`year` metadata (enforced by scripts/validate-content.mjs),
 * so this module can only ever return questions that were explicitly marked as
 * reproduced past-paper items with the year they were set.
 *
 * While a subject has no verified PYQs, every caller shows an honest empty state
 * explaining why — never a fabricated year filter over invented questions.
 */
import type { Question } from "./types";

export interface PyqFilters {
  chapterId?: string;
  topic?: string;
  year?: number;
  marks?: number;
  type?: string;
  difficulty?: string;
}

export interface PyqQuestion extends Question {
  year: number;
  chapterId: string;
  chapterTitle: string;
  chapterSlug: string;
  href: string;
  topic: string;
}

/**
 * A question counts as a past-year question only if it is explicitly marked
 * `pyq` AND carries the year it was set. Everything else — including anything
 * with a missing, `practice` or `boardprep` origin — is original practice, and is
 * never shown in the PYQ view.
 */
export function isPyq(q: Question): boolean {
  return q.origin === "pyq" && Number.isInteger(q.year);
}

/** True when a question is original practice rather than a reproduced PYQ. */
export function isPractice(q: Question): boolean {
  return !isPyq(q);
}

/** Counts of verified past-paper questions, by year. */
export function pyqYears(items: PyqQuestion[]): { year: number; count: number }[] {
  const m = new Map<number, number>();
  for (const q of items) m.set(q.year, (m.get(q.year) ?? 0) + 1);
  return [...m.entries()].map(([year, count]) => ({ year, count })).sort((a, b) => b.year - a.year);
}

/**
 * Concepts that recur across years. This is computed from real PYQs only; with
 * no PYQs it returns an empty list rather than ranking generated questions as
 * though they were board-frequency data.
 */
export function repeatedConcepts(items: PyqQuestion[], minYears = 2): { topic: string; years: number[]; count: number }[] {
  const m = new Map<string, Set<number>>();
  for (const q of items) {
    const key = normTopic(q.topic || q.chapterTitle);
    const set = m.get(key) ?? new Set<number>();
    set.add(q.year);
    m.set(key, set);
  }
  return [...m.entries()]
    .filter(([, years]) => years.size >= minYears)
    .map(([topic, years]) => ({ topic, years: [...years].sort((a, b) => b - a), count: years.size }))
    .sort((a, b) => b.count - a.count);
}

function normTopic(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

/** Apply every filter that has a value. Unset filters do not constrain. */
export function filterPyqs(items: PyqQuestion[], f: PyqFilters): PyqQuestion[] {
  return items.filter(
    (q) =>
      (f.chapterId === undefined || q.chapterId === f.chapterId) &&
      (f.topic === undefined || normTopic(q.topic || q.chapterTitle) === normTopic(f.topic)) &&
      (f.year === undefined || q.year === f.year) &&
      (f.marks === undefined || q.marks === f.marks) &&
      (f.type === undefined || q.type === f.type) &&
      (f.difficulty === undefined || q.difficulty === f.difficulty),
  );
}