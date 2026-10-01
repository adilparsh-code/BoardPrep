/**
 * Subject-agnostic test generator.
 *
 * A test is drawn from *published questions that already exist in the content
 * tree* — nothing is generated or invented here. Selection is deterministic
 * (seeded by the test id) so a student's "chapter test" is reproducible: the
 * same chapter always yields the same paper, which matters when a mark is being
 * compared against an earlier attempt.
 *
 * The blueprint is expressed in relative weights rather than absolute counts, so
 * it works identically for a subject with 6 chapters and 6 questions each and one
 * with 60 chapters, and it never asks for more questions than exist.
 */
import type { Question } from "./content/types";

export type TestScope = "chapter" | "unit" | "subject" | "full";

export interface TestBlueprint {
  scope: TestScope;
  title: string;
  /** Marks allowed for the paper. */
  maxMarks: number;
  /** Suggested time in seconds. */
  durationSec: number;
  /** Relative weight of each difficulty band; they are normalised. */
  difficulty: { easy: number; medium: number; hard: number };
  /** Relative weight of each question type; normalised over the types present. */
  types: Record<string, number>;
  /** Do not exceed this many questions. */
  maxQuestions: number;
  seed: string;
}

export interface TestItem {
  question: Question;
  chapterId: string;
  chapterTitle: string;
  chapterSlug: string;
  href: string;
}

export interface GeneratedTest {
  id: string;
  title: string;
  scope: TestScope;
  items: TestItem[];
  maxMarks: number;
  marks: number;
  durationSec: number;
  /** Chapters represented, for the post-test analysis. */
  chapters: { id: string; title: string; questions: number; marks: number }[];
  /** Set when the pool was too small to satisfy the blueprint. */
  shortfall: string | null;
}

/** Pool of everything a test may draw from, gathered by the caller. */
export interface TestPoolItem extends TestItem {
  year?: number;
  origin?: string;
}

/** Deterministic 32-bit hash → seeded PRNG, so tests are reproducible. */
function rng(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return function next(): number {
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    return ((h >>> 0) % 1_000_000) / 1_000_000;
  };
}

function normalise(weights: Record<string, number>, keys: string[]): Record<string, number> {
  const out: Record<string, number> = {};
  let total = 0;
  for (const k of keys) {
    const w = weights[k] ?? 0;
    out[k] = w;
    total += w;
  }
  if (total === 0) for (const k of keys) out[k] = 1;
  else for (const k of keys) out[k] /= total;
  return out;
}

/**
 * Weighted, seeded draw without replacement.
 * Returns fewer items than `count` if the pool is exhausted.
 */
function draw(pool: TestPoolItem[], weights: number[], count: number, seed: string): TestPoolItem[] {
  const rand = rng(seed);
  const remaining = pool.map((p, i) => ({ p, w: weights[i] ?? 0 }));
  const picked: TestPoolItem[] = [];
  let guard = pool.length * 4 + 8;

  while (picked.length < count && remaining.length > 0 && guard-- > 0) {
    const total = remaining.reduce((n, r) => n + r.w, 0);
    if (total <= 0) break;
    let t = rand() * total;
    let idx = 0;
    for (; idx < remaining.length - 1; idx++) {
      t -= remaining[idx].w;
      if (t <= 0) break;
    }
    picked.push(remaining[idx].p);
    remaining.splice(idx, 1);
  }
  return picked;
}

/**
 * Build a test from a pool.
 *
 * @param pool   every question eligible for this test, already scoped by the caller
 * @param bp     the blueprint
 */
export function generateTest(pool: TestPoolItem[], bp: TestBlueprint): GeneratedTest {
  const empty = {
    id: bp.seed,
    title: bp.title,
    scope: bp.scope,
    items: [] as TestItem[],
    maxMarks: bp.maxMarks,
    marks: 0,
    durationSec: bp.durationSec,
    chapters: [],
    shortfall: null as string | null,
  };

  if (pool.length === 0) {
    return { ...empty, shortfall: "No published questions are available in this scope yet." };
  }

  const count = Math.min(bp.maxQuestions, pool.length);
  const diffKeys = ["easy", "medium", "hard"];
  const typeKeys = [...new Set(pool.map((p) => p.question.type))];
  const diffW = normalise(bp.difficulty, diffKeys);
  const typeW = normalise(bp.types, typeKeys);

  // Primary weight: difficulty band × question type, both normalised. This is
  // how "marks distribution, difficulty and question type" are honoured without
  // any subject knowing what a sensible paper looks like.
  const weights = pool.map((p) => (diffW[p.question.difficulty] ?? 0) * (typeW[p.question.type] ?? 1));

  const items = draw(pool, weights, count, bp.seed);

  // Respect the mark ceiling: keep dropping the highest-mark items until the
  // paper fits, but never drop below three questions (a two-question "test" is
  // not a test, and saying so is better than silently shrinking it).
  let marks = items.reduce((n, i) => n + i.question.marks, 0);
  while (marks > bp.maxMarks && items.length > 3) {
    let worst = 0;
    for (let i = 1; i < items.length; i++) if (items[i].question.marks > items[worst].question.marks) worst = i;
    marks -= items[worst].question.marks;
    items.splice(worst, 1);
  }

  const byChapter = new Map<string, { title: string; questions: number; marks: number }>();
  for (const it of items) {
    const e = byChapter.get(it.chapterId) ?? { title: it.chapterTitle, questions: 0, marks: 0 };
    e.questions++;
    e.marks += it.question.marks;
    byChapter.set(it.chapterId, e);
  }

  return {
    id: bp.seed,
    title: bp.title,
    scope: bp.scope,
    items,
    maxMarks: bp.maxMarks,
    marks,
    durationSec: bp.durationSec,
    chapters: [...byChapter.entries()].map(([id, v]) => ({ id, ...v })),
    shortfall:
      pool.length < bp.maxQuestions
        ? `Only ${pool.length} published question${pool.length === 1 ? "" : "s"} exist in this scope, so this paper uses all of them.`
        : null,
  };
}

/**
 * Blueprints per scope. Weights, not counts: these scale with however much
 * verified content the subject actually has.
 */
export const BLUEPRINTS: Record<TestScope, Omit<TestBlueprint, "title" | "seed" | "scope">> = {
  chapter: {
    maxMarks: 20,
    durationSec: 20 * 60,
    difficulty: { easy: 0.35, medium: 0.45, hard: 0.2 },
    types: { mcq: 3, short: 4, long: 3, hots: 2, analytical: 2, "fill-blank": 1 },
    maxQuestions: 15,
  },
  unit: {
    maxMarks: 40,
    durationSec: 40 * 60,
    difficulty: { easy: 0.3, medium: 0.45, hard: 0.25 },
    types: { mcq: 3, short: 4, long: 4, hots: 2, analytical: 3 },
    maxQuestions: 30,
  },
  subject: {
    maxMarks: 80,
    durationSec: 90 * 60,
    difficulty: { easy: 0.3, medium: 0.45, hard: 0.25 },
    types: { mcq: 3, short: 4, long: 5, hots: 2, analytical: 3 },
    maxQuestions: 60,
  },
  full: {
    maxMarks: 100,
    durationSec: 120 * 60,
    difficulty: { easy: 0.3, medium: 0.45, hard: 0.25 },
    types: { mcq: 3, short: 4, long: 5, hots: 2, analytical: 3 },
    maxQuestions: 75,
  },
};

/** Score a finished attempt. `correct` is keyed by question id. */
export interface AttemptResult {
  correct: number;
  wrong: number;
  skipped: number;
  marks: number;
  maxMarks: number;
  percentage: number;
  accuracy: number;
  byType: Record<string, { correct: number; wrong: number }>;
  byChapter: { id: string; title: string; correct: number; wrong: number; marks: number }[];
  weakChapters: { id: string; title: string; correct: number; wrong: number }[];
  durationSec: number;
}

export function scoreAttempt(test: GeneratedTest, answers: Record<string, boolean>, durationSec: number): AttemptResult {
  let correct = 0;
  let wrong = 0;
  let marks = 0;
  const byType: AttemptResult["byType"] = {};
  const byChapter = new Map<string, { title: string; correct: number; wrong: number; marks: number }>();

  for (const item of test.items) {
    const q = item.question;
    const given = answers[item.question.id];
    const right = given === undefined ? false : given === true;
    if (given === undefined) {
      /* skipped */
    } else if (right) correct++;
    else wrong++;

    if (given !== undefined && right) marks += q.marks;

    const t = (byType[q.type] ??= { correct: 0, wrong: 0 });
    if (given === undefined) {
      /* not attributed */
    } else if (right) t.correct++;
    else t.wrong++;

    const c = byChapter.get(item.chapterId) ?? { title: item.chapterTitle, correct: 0, wrong: 0, marks: 0 };
    if (given !== undefined) {
      if (right) {
        c.correct++;
        c.marks += q.marks;
      } else c.wrong++;
    }
    byChapter.set(item.chapterId, c);
  }

  const answered = correct + wrong;
  const chapterRows = [...byChapter.entries()].map(([id, v]) => ({ id, ...v }));
  return {
    correct,
    wrong,
    skipped: test.items.length - answered,
    marks,
    maxMarks: test.marks,
    percentage: test.marks ? marks / test.marks : 0,
    accuracy: answered ? correct / answered : 0,
    byType,
    byChapter: chapterRows,
    weakChapters: chapterRows.filter((c) => c.wrong > c.correct).sort((a, b) => b.wrong - a.wrong),
    durationSec,
  };
}