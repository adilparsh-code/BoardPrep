"use client";

import { useEffect, useState } from "react";
import type { SubjectPool } from "./content/exam";

/**
 * Lazily fetches a subject's question pool from the read-only API route.
 *
 * The subject page deliberately does NOT inline every chapter body: 75 subjects
 * would make the listing pages enormous. The pool is fetched once, on first use,
 * and cached for the life of the tab.
 */
export type PoolState =
  | { status: "idle" | "loading"; pool: SubjectPool | null; error: string | null }
  | { status: "ready"; pool: SubjectPool; error: null }
  | { status: "error"; pool: null; error: string };

export function useSubjectPool(board: string, cls: string, subject: string) {
  const [state, setState] = useState<PoolState>({ status: "idle", pool: null, error: null });

  useEffect(() => {
    if (state.status !== "idle") return;
    const ac = new AbortController();
    setState({ status: "loading", pool: null, error: null });

    fetch(`/api/pool/${board}/${cls}/${subject}`, { signal: ac.signal })
      .then((r) => {
        if (!r.ok) throw new Error(`Request failed with status ${r.status}.`);
        return r.json() as Promise<SubjectPool>;
      })
      .then((pool) => setState({ status: "ready", pool, error: null }))
      .catch((e: unknown) => {
        if (e instanceof DOMException && e.name === "AbortError") return;
        setState({
          status: "error",
          pool: null,
          error: e instanceof Error ? e.message : "Could not load questions for this subject.",
        });
      });

    return () => ac.abort();
  }, [board, cls, subject, state.status]);

  return state;
}