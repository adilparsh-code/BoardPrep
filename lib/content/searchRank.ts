/**
 * Client-safe half of the search system.
 *
 * Ranking is pure data work with no filesystem access, so it is separated from
 * `search.ts` (which reads the content tree) and can therefore run in the
 * browser. `search.ts` builds the index on the server; this file scores it.
 *
 * There is no per-subject logic here at all: every result is a typed record
 * carrying its own board/class/subject context, which is exactly what the results
 * list renders.
 */
export type SearchResultType = "subject" | "chapter" | "question";

export interface SearchResult {
  type: SearchResultType;
  title: string;
  /** The line shown under the title. */
  snippet: string;
  board: string;
  boardName: string;
  classLabel: string;
  subject: string;
  subjectTitle: string;
  chapterSlug: string | null;
  href: string;
  /** Stable id, so a result can be bookmarked. */
  id: string;
  /** Anchor within the chapter page, for questions. */
  anchor: string | null;
}

export interface SearchIndex {
  results: SearchResult[];
  /** Lowercased haystack, precomputed once at build time. */
  haystack: string[];
}

/** Rank matches: title hits beat snippet hits, and shorter titles rank higher. */
export function search(index: SearchIndex, query: string, limit = 40): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  const terms = q.split(/\s+/).filter(Boolean);
  const scored: { i: number; score: number }[] = [];

  for (let i = 0; i < index.results.length; i++) {
    const hay = index.haystack[i];
    if (!terms.every((t) => hay.includes(t))) continue;
    const title = index.results[i].title.toLowerCase();
    let score = 0;
    for (const t of terms) {
      if (title === t) score += 12;
      else if (title.startsWith(t)) score += 8;
      else if (title.includes(t)) score += 5;
      else score += 1;
    }
    score -= Math.min(4, title.length / 40);
    scored.push({ i, score });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map(({ i }) => index.results[i]);
}