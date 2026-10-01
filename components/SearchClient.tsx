"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { search, type SearchIndex, type SearchResult } from "@/lib/content/searchRank";

const TYPE_LABEL: Record<SearchResult["type"], string> = {
  subject: "Subject",
  chapter: "Chapter",
  question: "Question",
};

/**
 * Renders a typed search result. Every result carries its own board/class/subject
 * context, so this component works identically for English prose, a Maths
 * numerical and a Geography map question.
 */
export function SearchClient({ index }: { index: SearchIndex }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => search(index, query), [index, query]);

  return (
    <div className="search-client">
      <label className="search-field" htmlFor="search-input">
        <span className="sr-only">Search subjects, chapters and questions</span>
        <input
          id="search-input"
          type="search"
          value={query}
          placeholder="Try “Mauryan”, “Ohm’s law”, “Photosynthesis”…"
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
        />
      </label>

      <p className="search-status" role="status">
        {query.trim().length < 2
          ? "Type at least two characters to search."
          : `${results.length} result${results.length === 1 ? "" : "s"} for “${query.trim()}”.`}
      </p>

      {query.trim().length >= 2 && results.length === 0 && (
        <div className="empty-state">
          <h2>No matches</h2>
          <p>
            Nothing matches “{query.trim()}”. Only published chapters and their questions are
            searchable, so subjects still being written will not appear here yet.
          </p>
        </div>
      )}

      <ul className="search-results">
        {results.map((r) => (
          <li key={`${r.type}-${r.id}`} className="search-result">
            <div className="search-result-head">
              <span className={`pill pill-${r.type}`}>{TYPE_LABEL[r.type]}</span>
              <span className="search-result-context">
                {r.boardName} · {r.classLabel} · {r.subjectTitle}
              </span>
            </div>
            <h3>
              <Link href={r.href}>{r.title}</Link>
            </h3>
            {r.snippet && <p>{r.snippet}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}