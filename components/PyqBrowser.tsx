"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { QUESTION_TYPE_LABEL } from "@/lib/content/labels";
import { filterPyqs, pyqYears, repeatedConcepts } from "@/lib/content/pyq";
import type { SubjectPool } from "@/lib/content/exam";

/**
 * Past-year question browser.
 *
 * The important behaviour here is the empty state: when a subject has no verified
 * past-paper questions, this says exactly that and explains why, rather than
 * quietly presenting original practice questions as if they were board questions.
 * Year filters only ever appear for years that a real reproduced question carries.
 */
export function PyqBrowser({ pool, board, cls, subject }: { pool: SubjectPool; board: string; cls: string; subject: string }) {
  const [chapterId, setChapterId] = useState("");
  const [year, setYear] = useState("");
  const [type, setType] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [marks, setMarks] = useState("");

  const years = useMemo(() => pyqYears(pool.pyqs), [pool.pyqs]);
  const repeated = useMemo(() => repeatedConcepts(pool.pyqs), [pool.pyqs]);

  const visible = useMemo(
    () =>
      filterPyqs(pool.pyqs, {
        ...(chapterId ? { chapterId } : {}),
        ...(year ? { year: Number(year) } : {}),
        ...(type ? { type } : {}),
        ...(difficulty ? { difficulty } : {}),
        ...(marks ? { marks: Number(marks) } : {}),
      }),
    [pool.pyqs, chapterId, year, type, difficulty, marks],
  );

  const practiceCount = pool.counts.questions;
  const pyqCount = pool.pyqs.length;

  if (pyqCount === 0) {
    return (
      <div className="empty-state">
        <h3>No verified past-paper questions for this subject yet</h3>
        <p>
          Past-year questions are only listed when BoardPrep holds a verified reproduction of the actual board
          question, tagged with the year it was set. The {practiceCount}{" "}
          question{practiceCount === 1 ? "" : "s"} in this subject are original practice written by BoardPrep, so
          they are deliberately kept out of this view rather than relabelled as exam questions.
        </p>
        <p>
          <Link className="text-link" href={`/${board}/${cls}/${subject}`}>
            Use the original practice set instead
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="pyq-browser">
      <p className="muted" role="status">
        {visible.length} of {pyqCount} verified past-year question{pyqCount === 1 ? "" : "s"}.
      </p>

      <div className="practice-bar">
        <label className="filter">
          <span>Chapter</span>
          <select value={chapterId} onChange={(e) => setChapterId(e.target.value)}>
            <option value="">All chapters</option>
            {pool.testableChapters.map((c) => (
              <option key={c.id} value={c.id}>{c.title}</option>
            ))}
          </select>
        </label>
        <label className="filter">
          <span>Year</span>
          <select value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="">All years</option>
            {years.map((y) => (
              <option key={y.year} value={y.year}>{y.year} ({y.count})</option>
            ))}
          </select>
        </label>
        <label className="filter">
          <span>Type</span>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">All types</option>
            {[...new Set(pool.pyqs.map((q) => q.type))].map((t) => (
              <option key={t} value={t}>{QUESTION_TYPE_LABEL[t]}</option>
            ))}
          </select>
        </label>
        <label className="filter">
          <span>Difficulty</span>
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="">All</option>
            {[...new Set(pool.pyqs.map((q) => q.difficulty))].map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </label>
        <label className="filter">
          <span>Marks</span>
          <select value={marks} onChange={(e) => setMarks(e.target.value)}>
            <option value="">Any</option>
            {[...new Set(pool.pyqs.map((q) => q.marks))].sort((a, b) => a - b).map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </label>
      </div>

      {repeated.length > 0 && (
        <div className="card">
          <h4>Concepts repeated across years</h4>
          <ul className="dash-list">
            {repeated.map((r) => (
              <li key={r.topic}>
                <span>{r.topic}</span>
                <span className="muted">{r.years.join(", ")}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <ol className="test-list">
        {visible.map((q, i) => (
          <li key={q.id} className="qcard">
            <header className="qhead">
              <span className="qnum">{i + 1}</span>
              <span className="tag tag-pyq">{q.year} board exam</span>
              <span className="tag">{QUESTION_TYPE_LABEL[q.type]}</span>
              <span className="tag tag-muted">{q.marks} mark{q.marks === 1 ? "" : "s"}</span>
              <span className="tag tag-muted">{q.chapterTitle}</span>
            </header>
            {q.extract && <blockquote className="extract">{q.extract}</blockquote>}
            <p className="qprompt">{q.prompt}</p>
            {q.options && (
              <ul className="options">
                {q.options.map((o, oi) => (
                  <li key={o} className="option">
                    <span aria-hidden="true">{String.fromCharCode(65 + oi)}.</span> {o}
                  </li>
                ))}
              </ul>
            )}
            <details className="answer">
              <summary>Answer and explanation</summary>
              <p>{q.answer}</p>
              {q.explanation && <p className="muted">{q.explanation}</p>}
              <p className="muted">
                <Link className="text-link" href={q.href}>Open the full chapter</Link>
              </p>
            </details>
          </li>
        ))}
      </ol>
    </div>
  );
}