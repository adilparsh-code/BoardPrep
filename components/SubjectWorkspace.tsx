"use client";

import { useMemo, useState } from "react";
import { PyqBrowser } from "@/components/PyqBrowser";
import { TestRunner } from "@/components/TestRunner";
import { QUESTION_TYPE_LABEL } from "@/lib/content/labels";
import type { SubjectMeta } from "@/lib/analytics";
import { REVISION_STATE_LABEL, subjectStat } from "@/lib/analytics";
import { useSubjectPool } from "@/lib/useSubjectPool";
import { useProgress } from "@/lib/progress";

type Tab = "practice" | "pyq" | "tests" | "analysis";

const TABS: { id: Tab; label: string }[] = [
  { id: "practice", label: "Practice" },
  { id: "pyq", label: "Past-year questions" },
  { id: "tests", label: "Tests" },
  { id: "analysis", label: "Analysis" },
];

/**
 * The subject workspace: practice, PYQ, tests and analysis for one subject.
 *
 * The panel structure is identical for every subject — that is the point, so a
 * student moving from Physics to History finds the same controls. What differs
 * is the content, which comes entirely from the content tree.
 *
 * Questions load on demand (see useSubjectPool) so a page listing 75 subjects
 * never inlines every chapter body.
 */
export function SubjectWorkspace({
  board,
  cls,
  subject,
  subjectTitle,
  meta,
}: {
  board: string;
  cls: string;
  subject: string;
  subjectTitle: string;
  meta: SubjectMeta | null;
}) {
  const [tab, setTab] = useState<Tab>("practice");
  const { status, pool, error } = useSubjectPool(board, cls, subject);

  return (
    <section className="section workspace" id="workspace">
      <h2>Practice, tests and analysis</h2>

      <div className="tabs" role="tablist" aria-label={`${subjectTitle} practice panels`}>
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={tab === t.id}
            aria-controls={`panel-${t.id}`}
            tabIndex={tab === t.id ? 0 : -1}
            className={`tab${tab === t.id ? " tab-active" : ""}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} tabIndex={0}>
        {status === "loading" && <p className="muted" role="status">Loading questions…</p>}
        {status === "error" && (
          <div className="empty-state">
            <h3>Questions could not be loaded</h3>
            <p>{error}</p>
          </div>
        )}
        {status === "idle" && (
          <p className="muted" role="status">
            Choose a panel to load this subject&apos;s questions.
          </p>
        )}

        {pool && tab === "practice" && (
          <PracticePanel pool={pool} board={board} cls={cls} subjectTitle={subjectTitle} />
        )}
        {pool && tab === "pyq" && <PyqBrowser pool={pool} board={board} cls={cls} subject={subject} />}
        {pool && tab === "tests" && (
          <TestRunner pool={pool} board={board} cls={cls} subject={subject} subjectTitle={subjectTitle} />
        )}
        {tab === "analysis" && <AnalysisPanel meta={meta} subjectTitle={subjectTitle} />}
      </div>
    </section>
  );
}

/* ---------- Practice ---------- */

function PracticePanel({
  pool,
  board,
  cls,
  subjectTitle,
}: {
  pool: NonNullable<ReturnType<typeof useSubjectPool>["pool"]>;
  board: string;
  cls: string;
  subjectTitle: string;
}) {
  const [chapterId, setChapterId] = useState(pool.testableChapters[0]?.id ?? "");
  const [type, setType] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const items = pool.byChapter[chapterId] ?? [];
  const visible = items.filter(
    (i) => (!type || i.question.type === type) && (!difficulty || i.question.difficulty === difficulty),
  );

  if (pool.testableChapters.length === 0) {
    return (
      <div className="empty-state">
        <h3>No practice questions published yet</h3>
        <p>
          {subjectTitle} is registered for {board.toUpperCase()} class {cls.replace("class-", "")} and its
          syllabus structure is mapped, but no chapter content has been published. Questions are never
          invented to fill this space.
        </p>
      </div>
    );
  }

  return (
    <div className="practice-panel">
      <div className="practice-bar">
        <label className="filter">
          <span>Chapter</span>
          <select value={chapterId} onChange={(e) => setChapterId(e.target.value)}>
            {pool.testableChapters.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title} ({c.questions})
              </option>
            ))}
          </select>
        </label>
        <label className="filter">
          <span>Type</span>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">All types</option>
            {[...new Set(items.map((i) => i.question.type))].map((t) => (
              <option key={t} value={t}>{QUESTION_TYPE_LABEL[t]}</option>
            ))}
          </select>
        </label>
        <label className="filter">
          <span>Difficulty</span>
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="">All</option>
            {["easy", "medium", "hard"].map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </label>
      </div>

      {visible.length === 0 ? (
        <p className="muted" role="status">
          No questions in this chapter match those filters.
        </p>
      ) : (
        <ol className="test-list">
          {visible.map((item, i) => (
            <li key={item.question.id} className="qcard">
              <header className="qhead">
                <span className="qnum">Q{i + 1}</span>
                <span className="tag">{QUESTION_TYPE_LABEL[item.question.type]}</span>
                <span className="tag tag-muted">{item.question.difficulty}</span>
                <span className="tag tag-muted">{item.question.marks} mark{item.question.marks === 1 ? "" : "s"}</span>
              </header>
              {item.question.extract && <blockquote className="extract">{item.question.extract}</blockquote>}
              <p className="qprompt">{item.question.prompt}</p>
              <details className="answer">
                <summary>Model answer</summary>
                <p>{item.question.answer}</p>
                {item.question.explanation && <p className="muted">{item.question.explanation}</p>}
                {item.question.commonMistake && (
                  <p className="muted">Common mistake: {item.question.commonMistake}</p>
                )}
              </details>
            </li>
          ))}
        </ol>
      )}
      <p className="muted">
        These are original BoardPrep practice questions. They are not past-year board questions — see the{" "}
        {subjectTitle} past-year tab for those.
      </p>
    </div>
  );
}

/* ---------- Analysis ---------- */

function AnalysisPanel({ meta, subjectTitle }: { meta: SubjectMeta | null; subjectTitle: string }) {
  const { progress } = useProgress();
  const now = useMemo(() => Date.now(), []);
  if (!meta) {
    return (
      <div className="empty-state">
        <h3>No measurable data for {subjectTitle} yet</h3>
        <p>Answer some questions and this panel will show measured accuracy, weak chapters and what to revise.</p>
      </div>
    );
  }

  const s = subjectStat(meta, progress, now);

  if (s.answered === 0) {
    return (
      <div className="empty-state">
        <h3>Nothing to analyse yet in {subjectTitle}</h3>
        <p>
          Analysis only reports what you have actually answered. Attempt questions or take a test and accuracy,
          weak chapters, question-type performance and revision needs appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="analysis">
      <div className="grid">
        <div className="card">
          <span className="pill">Accuracy</span>
          <p className="stat-big">{s.accuracy === null ? "—" : `${Math.round(s.accuracy * 100)}%`}</p>
          <p className="muted">{s.correct} correct of {s.answered} answered questions.</p>
        </div>
        <div className="card">
          <span className="pill">Chapters</span>
          <p className="stat-big">{s.completed}/{s.published}</p>
          <p className="muted">completed.</p>
        </div>
        <div className="card">
          <span className="pill">Weak</span>
          <p className="stat-big">{s.weak.length}</p>
          <p className="muted">chapter{s.weak.length === 1 ? "" : "s"} below 60% correct.</p>
        </div>
        <div className="card">
          <span className="pill">Needs revision</span>
          <p className="stat-big">{s.needsRevision.length}</p>
          <p className="muted">not practised for a week and not yet mastered.</p>
        </div>
      </div>

      {s.weak.length > 0 && (
        <section className="section" aria-label="Weak chapters">
          <h3>Weak chapters</h3>
          <ul className="dash-list">
            {s.weak.map((c) => (
              <li key={c.meta.id}>
                <span>
                  <strong>{c.meta.title}</strong>{" "}
                  <span className="muted">
                    {c.correct}/{c.answered} correct · {REVISION_STATE_LABEL[c.mastery]}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {Object.keys(s.byType).length > 0 && (
        <section className="section" aria-label="Performance by question type">
          <h3>By question type</h3>
          <p className="muted">Measured from your test attempts, which record the type of every question.</p>
          <ul className="dash-list">
            {Object.entries(s.byType).map(([t, v]) => (
              <li key={t}>
                <span>{QUESTION_TYPE_LABEL[t as keyof typeof QUESTION_TYPE_LABEL] ?? t}</span>
                <span className="muted">
                  {v.correct} correct / {v.wrong} wrong
                  {v.accuracy !== null && ` · ${Math.round(v.accuracy * 100)}%`}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {s.tests.length > 0 && (
        <section className="section" aria-label="Test history">
          <h3>Test history</h3>
          <ul className="dash-list">
            {s.tests.slice(0, 10).map((t) => (
              <li key={t.id}>
                <span>{t.title}</span>
                <span className="muted">
                  {t.marks}/{t.maxMarks} marks · {t.correct}/{t.correct + t.wrong} correct
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}