/**
 * Subject-agnostic analytics and recommendation engine.
 *
 * Everything here is a pure function of (content metadata, student progress).
 * No subject is hard-coded: chapters arrive with their board/class/subject
 * context from the content tree, so the same code scores an English prose
 * answer, a Mathematics numerical and a Geography map question identically.
 *
 * Honesty rules baked in:
 * - Accuracy is only reported over questions the student actually answered, so
 *   "seen" questions never inflate or deflate a score.
 * - Nothing here predicts marks. The engine only reports measured counts and
 *   clearly-labelled thresholds, and says "not enough data" when thin.
 * - A chapter with no published questions is never called weak; it is simply
 *   reported as not started.
 */
import type { Progress, RevisionState, TestResult } from "./progress";

/** Minimum answered questions before a per-chapter accuracy is meaningful. */
const MIN_FOR_ACCURACY = 4;
/** Accuracy below this is "weak"; above is "strong". */
const WEAK_BELOW = 0.6;
const STRONG_ABOVE = 0.8;
/** Days after which a chapter is flagged for revision. */
const REVISION_AFTER_DAYS = 7;

export interface ChapterMeta {
  id: string;
  title: string;
  slug: string;
  board: string;
  classSlug: string;
  subjectSlug: string;
  subjectTitle: string;
}

export interface SubjectMeta {
  board: string;
  classSlug: string;
  slug: string;
  title: string;
  publishedChapters: ChapterMeta[];
  plannedChapters: number;
}

export interface ChapterStat {
  meta: ChapterMeta;
  completed: boolean;
  answered: number;
  correct: number;
  wrong: number;
  seen: number;
  /** null when the student has not answered enough to be meaningful. */
  accuracy: number | null;
  mastery: RevisionState;
  lastPractised: string | null;
  needsRevision: boolean;
}

export interface SubjectStat {
  meta: SubjectMeta;
  chapters: ChapterStat[];
  published: number;
  completed: number;
  answered: number;
  correct: number;
  accuracy: number | null;
  /** Share of published chapters marked complete, 0..1. */
  readiness: number;
  weak: ChapterStat[];
  strong: ChapterStat[];
  needsRevision: ChapterStat[];
  byType: Record<string, { correct: number; wrong: number; accuracy: number | null }>;
  tests: TestResult[];
  xp: number;
}

function daysAgo(iso: string | null, now: number): number | null {
  if (!iso) return null;
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return null;
  return Math.floor((now - t) / 86_400_000);
}

/** Derive a revision state from measured activity. Never invents a score. */
export function deriveState(s: { completed: boolean; answered: number; accuracy: number | null; stale: number | null }): RevisionState {
  if (s.answered === 0 && !s.completed) return s.stale !== null && s.stale >= REVISION_AFTER_DAYS ? "not-started" : "not-started";
  if (s.accuracy === null) return s.completed ? "learning" : "practicing";
  if (s.accuracy < WEAK_BELOW) return "weak";
  if (s.accuracy >= STRONG_ABOVE) return s.completed ? "mastered" : "improving";
  return s.completed ? "practicing" : "learning";
}

export const REVISION_STATES: RevisionState[] = [
  "not-started",
  "learning",
  "practicing",
  "weak",
  "improving",
  "mastered",
  "needs-revision",
];

export const REVISION_STATE_LABEL: Record<RevisionState, string> = {
  "not-started": "Not started",
  learning: "Learning",
  practicing: "Practicing",
  weak: "Weak",
  improving: "Improving",
  mastered: "Mastered",
  "needs-revision": "Needs revision",
};

export function chapterStat(meta: ChapterMeta, progress: Progress, now: number): ChapterStat {
  const answers = progress.answers[meta.id] ?? {};
  let correct = 0;
  let wrong = 0;
  let seen = 0;
  for (const v of Object.values(answers)) {
    if (v === "correct") correct++;
    else if (v === "wrong") wrong++;
    else seen++;
  }
  const answered = correct + wrong;
  const accuracy = answered >= MIN_FOR_ACCURACY ? correct / answered : null;
  const last = progress.lastPractised[meta.id] ?? null;
  const stale = daysAgo(last, now);
  const derived = deriveState({
    completed: progress.completed[meta.id] === true,
    answered,
    accuracy,
    stale,
  });
  const needsRevision = stale !== null && stale >= REVISION_AFTER_DAYS && derived !== "mastered";
  return {
    meta,
    completed: progress.completed[meta.id] === true,
    answered,
    correct,
    wrong,
    seen,
    accuracy,
    mastery: progress.revisionOverride[meta.id] ?? (needsRevision ? "needs-revision" : derived),
    lastPractised: last,
    needsRevision,
  };
}

export function subjectStat(meta: SubjectMeta, progress: Progress, now: number): SubjectStat {
  const chapters = meta.publishedChapters.map((c) => chapterStat(c, progress, now));
  const answered = chapters.reduce((n, c) => n + c.answered, 0);
  const correct = chapters.reduce((n, c) => n + c.correct, 0);
  const accuracy = answered >= MIN_FOR_ACCURACY ? correct / answered : null;
  const completed = chapters.filter((c) => c.completed).length;

  // Per-type accuracy is only measurable from test runs, which record the type
  // of every question. Free-form chapter practice does not attribute answers to
  // a type, so we never guess it here.
  const byType: SubjectStat["byType"] = {};
  for (const t of progress.tests) {
    if (t.scope !== scopeOf(meta)) continue;
    for (const [type, v] of Object.entries(t.byType)) {
      const bucket = (byType[type] ??= { correct: 0, wrong: 0, accuracy: null });
      bucket.correct += v.correct;
      bucket.wrong += v.wrong;
    }
  }
  for (const v of Object.values(byType)) {
    const n = v.correct + v.wrong;
    v.accuracy = n >= MIN_FOR_ACCURACY ? v.correct / n : null;
  }

  const tests = progress.tests.filter((t) => t.scope === scopeOf(meta));
  // XP rewards verified effort: completed chapters, correct answers, tests taken.
  const xp = completed * 100 + correct * 5 + tests.length * 25;

  return {
    meta,
    chapters,
    published: meta.publishedChapters.length,
    completed,
    answered,
    correct,
    accuracy,
    readiness: meta.publishedChapters.length ? completed / meta.publishedChapters.length : 0,
    weak: chapters.filter((c) => c.mastery === "weak"),
    strong: chapters.filter((c) => c.mastery === "mastered"),
    needsRevision: chapters.filter((c) => c.needsRevision || c.mastery === "needs-revision"),
    byType,
    tests,
    xp,
  };
}

export function scopeOf(meta: { board: string; classSlug: string; slug: string }): string {
  return `${meta.board}/${meta.classSlug}/${meta.slug}`;
}

export function allSubjectStats(subjects: SubjectMeta[], progress: Progress, now: number): SubjectStat[] {
  return subjects.map((m) => subjectStat(m, progress, now));
}

/* ---------- Next best action ---------- */

export type ActionKind = "start" | "practise" | "revise" | "continue" | "test" | "explore";

export interface NextAction {
  kind: ActionKind;
  subjectSlug: string;
  subjectTitle: string;
  chapterId: string;
  chapterTitle: string;
  chapterSlug: string;
  reason: string;
  headline: string;
  detail: string;
  href: string;
  priority: number;
}

/**
 * Pick ONE clear next action. Priority order is deliberate:
 * a started-but-weak chapter outranks an untouched one, and an untouched
 * chapter outranks optional exploration.
 */
export function nextBestAction(stats: SubjectStat[], hrefFor: (board: string, cls: string, subject: string, chapter?: string) => string): NextAction | null {
  const candidates: NextAction[] = [];
  for (const s of stats) {
    const base = { subjectSlug: s.meta.slug, subjectTitle: s.meta.title, board: s.meta.board, classSlug: s.meta.classSlug };
    for (const c of s.chapters) {
      const href = hrefFor(s.meta.board, s.meta.classSlug, s.meta.slug, c.meta.slug);
      if (c.mastery === "weak" && c.accuracy !== null) {
        candidates.push({
          ...base,
          kind: "practise",
          chapterId: c.meta.id,
          chapterTitle: c.meta.title,
          chapterSlug: c.meta.slug,
          headline: `You are weak in ${c.meta.title}`,
          reason: `${Math.round((1 - c.accuracy) * 100)}% wrong across ${c.answered} attempted questions in ${s.meta.title}.`,
          detail: "Re-read the key points, then redo the questions you got wrong.",
          href,
          priority: 100 + c.wrong,
        });
      } else if (c.needsRevision) {
        candidates.push({
          ...base,
          kind: "revise",
          chapterId: c.meta.id,
          chapterTitle: c.meta.title,
          chapterSlug: c.meta.slug,
          headline: `Revise ${c.meta.title}`,
          reason: "Last practised over a week ago, so this is drifting.",
          detail: "A ten-minute skim of the key points and exam focus is enough to restore it.",
          href,
          priority: 90,
        });
      } else if (c.answered > 0 && !c.completed) {
        candidates.push({
          ...base,
          kind: "continue",
          chapterId: c.meta.id,
          chapterTitle: c.meta.title,
          chapterSlug: c.meta.slug,
          headline: `Finish ${c.meta.title}`,
          reason: `You have answered ${c.answered} of its questions but have not marked it complete.`,
          detail: "Finish the remaining questions, then mark the chapter complete.",
          href,
          priority: 70,
        });
      } else if (!c.completed && c.answered === 0) {
        candidates.push({
          ...base,
          kind: "start",
          chapterId: c.meta.id,
          chapterTitle: c.meta.title,
          chapterSlug: c.meta.slug,
          headline: `Start ${c.meta.title}`,
          reason: `Not yet attempted in ${s.meta.title}.`,
          detail: "Read the chapter, then attempt the practice questions.",
          href,
          priority: 40,
        });
      }
    }
    if (s.published > 0 && s.completed === s.published && s.tests.length === 0) {
      candidates.push({
        ...base,
        kind: "test",
        chapterId: "",
        chapterTitle: "",
        chapterSlug: "",
        headline: `Take a ${s.meta.title} test`,
        reason: "Every published chapter in this subject is complete.",
        detail: "A mixed test is the fastest way to find what still needs work.",
        href: hrefFor(s.meta.board, s.meta.classSlug, s.meta.slug),
        priority: 80,
      });
    }
  }
  if (candidates.length === 0) return null;
  candidates.sort((a, b) => b.priority - a.priority);
  return candidates[0];
}

/** Questions answered today, for the daily goal. */
export function answeredToday(progress: Progress): number {
  let n = 0;
  for (const byQ of Object.values(progress.answers)) {
    for (const status of Object.values(byQ)) if (status === "correct" || status === "wrong") n++;
  }
  return n;
}

export function streakDays(progress: Progress, now: number): number {
  const days = new Set<string>();
  for (const iso of Object.values(progress.lastPractised)) {
    const t = Date.parse(iso);
    if (!Number.isNaN(t)) days.add(new Date(t).toISOString().slice(0, 10));
  }
  let streak = 0;
  for (let i = 0; i < 365; i++) {
    const d = new Date(now - i * 86_400_000).toISOString().slice(0, 10);
    if (days.has(d)) streak++;
    else if (i > 0) break;
  }
  return streak;
}
