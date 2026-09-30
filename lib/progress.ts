"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

/**
 * Lightweight, per-browser progress tracking. Stored in localStorage only;
 * every access is wrapped in try/catch so the app works when storage is
 * unavailable (private mode, blocked cookies).
 */
const KEY = "boardprep:progress:v1";
const EVENT = "boardprep:progress";

export type AnswerStatus = "correct" | "wrong" | "seen";
export interface Progress {
  completed: Record<string, true>;
  answers: Record<string, Record<string, AnswerStatus>>;
}
const EMPTY: Progress = { completed: {}, answers: {} };

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
    return { completed: p.completed ?? {}, answers: p.answers ?? {} };
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
    write({ ...cur, answers: { ...cur.answers, [chapterId]: forChapter } });
  }, []);

  const toggleComplete = useCallback((chapterId: string) => {
    const cur = parse(readRaw());
    const completed = { ...cur.completed };
    if (completed[chapterId]) delete completed[chapterId];
    else completed[chapterId] = true;
    write({ ...cur, completed });
  }, []);

  return { progress, setAnswer, toggleComplete };
}
