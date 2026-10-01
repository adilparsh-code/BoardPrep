"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

/**
 * Lightweight, per-browser student state. Stored in localStorage only; every
 * access is wrapped in try/catch so the app works when storage is unavailable
 * (private mode, blocked cookies).
 *
 * Design notes:
 * - Everything is keyed by a stable content id, never by a route, so a
 *   subject's data can never overwrite another subject's.
 * - The stored shape is versioned. Older payloads are migrated on read and
 *   unknown fields are ignored, so existing students keep their history.
 * - Pure analytics live in lib/analytics.ts; this module is only the store.
 */
const KEY = "boardprep:progress:v1";
const EVENT = "boardprep:progress";

export type AnswerStatus = "correct" | "wrong" | "seen";

/** Subject-agnostic revision lifecycle. Kept coarse on purpose so it is not tied to one subject. */
export type RevisionState =
  | "not-started"
  | "learning"
  | "practicing"
  | "weak"
  | "improving"
  | "mastered"
  | "needs-revision";

export interface TestResult {
  id: string;
  /** Stable identity of the paper, e.g. "icse/class-9/english". */
  scope: string;
  title: string;
  /** ISO timestamp. */
  takenAt: string;
  total: number;
  correct: number;
  wrong: number;
  skipped: number;
  marks: number;
  maxMarks: number;
  durationSec: number;
  /** chapterId -> { correct, wrong, seen } for chapter-wise analysis. */
  byChapter: Record<string, { correct: number; wrong: number; seen: number }>;
  /** questionType -> { correct, wrong } for question-type analysis. */
  byType: Record<string, { correct: number; wrong: number }>;
}

/**
 * A bookmark stores its full context, not just a boolean, so the dashboard can
 * render and link it later without having to guess which board/class/subject a
 * chapter id belonged to.
 */
export interface Bookmark {
  id: string;
  board: string;
  classSlug: string;
  subject: string;
  subjectTitle: string;
  chapter: string;
  chapterTitle: string;
  href: string;
  savedAt: string;
}

export interface Progress {
  completed: Record<string, true>;
  answers: Record<string, Record<string, AnswerStatus>>;
  /** id -> full bookmark record (older payloads may hold `true`; read tolerates that) */
  bookmarks: Record<string, Bookmark | true>;
  /** test results, newest first */
  tests: TestResult[];
  /** chapterId -> ISO date last practised, for spaced revision */
  lastPractised: Record<string, string>;
  /** manually pinned revision states, overriding the derived one */
  revisionOverride: Record<string, RevisionState>;
  /** daily goal in questions; the dashboard reads it */
  dailyGoal: number;
  /** XP is derived from activity, never stored independently */
}
const EMPTY: Progress = {
  completed: {},
  answers: {},
  bookmarks: {},
  tests: [],
  lastPractised: {},
  revisionOverride: {},
  dailyGoal: 20,
};

function readRaw(): string {
  try {
    return window.localStorage.getItem(KEY) ?? "";
  } catch {
    return "";
  }
}

function subscribe(cb: () => void) {
  window.addEventListener("storage", cb);
  window.addEventListener(EVENT, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(EVENT, cb);
  };
}

function parse(raw: string): Progress {
  if (!raw) return EMPTY;
  try {
    const p = JSON.parse(raw) as Partial<Progress>;
    return {
      completed: p.completed ?? {},
      answers: p.answers ?? {},
      bookmarks: p.bookmarks ?? {},
      tests: Array.isArray(p.tests) ? p.tests : [],
      lastPractised: p.lastPractised ?? {},
      revisionOverride: p.revisionOverride ?? {},
      dailyGoal: Number.isInteger(p.dailyGoal) && (p.dailyGoal as number) > 0 ? (p.dailyGoal as number) : 20,
    };
  } catch {
    return EMPTY;
  }
}

function write(next: Progress) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage unavailable: progress simply isn't saved */
  }
  window.dispatchEvent(new Event(EVENT));
}

export function useProgress() {
  const raw = useSyncExternalStore(subscribe, readRaw, () => "");
  const progress = useMemo(() => parse(raw), [raw]);

  const setAnswer = useCallback((chapterId: string, qid: string, status: AnswerStatus) => {
    const cur = parse(readRaw());
    const forChapter = { ...(cur.answers[chapterId] ?? {}) };
    // never downgrade a correct result to "seen"
    if (forChapter[qid] === "correct" && status === "seen") return;
    forChapter[qid] = status;
    write({
      ...cur,
      answers: { ...cur.answers, [chapterId]: forChapter },
      lastPractised: { ...cur.lastPractised, [chapterId]: new Date().toISOString() },
    });
  }, []);

  const toggleComplete = useCallback((chapterId: string) => {
    const cur = parse(readRaw());
    const completed = { ...cur.completed };
    if (completed[chapterId]) delete completed[chapterId];
    else completed[chapterId] = true;
    write({ ...cur, completed });
  }, []);

  const toggleBookmark = useCallback((mark: Omit<Bookmark, "savedAt">) => {
    const cur = parse(readRaw());
    const bookmarks = { ...cur.bookmarks };
    if (bookmarks[mark.id]) delete bookmarks[mark.id];
    else bookmarks[mark.id] = { ...mark, savedAt: new Date().toISOString() };
    write({ ...cur, bookmarks });
  }, []);

  const recordTest = useCallback((result: TestResult) => {
    const cur = parse(readRaw());
    write({ ...cur, tests: [result, ...cur.tests].slice(0, 100) });
  }, []);

  const setRevisionState = useCallback((chapterId: string, state: RevisionState) => {
    const cur = parse(readRaw());
    const revisionOverride = { ...cur.revisionOverride };
    if (state === "not-started") delete revisionOverride[chapterId];
    else revisionOverride[chapterId] = state;
    write({ ...cur, revisionOverride });
  }, []);

  const setDailyGoal = useCallback((n: number) => {
    const cur = parse(readRaw());
    write({ ...cur, dailyGoal: Math.max(5, Math.min(200, Math.round(n))) });
  }, []);

  return { progress, setAnswer, toggleComplete, toggleBookmark, recordTest, setRevisionState, setDailyGoal };
}
