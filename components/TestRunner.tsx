"use client";

import { useMemo, useState } from "react";
import { QUESTION_TYPE_LABEL } from "@/lib/content/labels";
import type { SubjectPool } from "@/lib/content/exam";
import { BLUEPRINTS, generateTest, scoreAttempt, type AttemptResult, type GeneratedTest, type TestScope } from "@/lib/tests";
import { useProgress } from "@/lib/progress";

interface Props {
  pool: SubjectPool;
  board: string;
  cls: string;
  subject: string;
  subjectTitle: string;
}

type Selection = { scope: TestScope; chapterId?: string; sectionId?: string };

/**
 * Test centre. A paper is drawn from questions that already exist in the content
 * tree — nothing is invented — and the same selection always yields the same
 * paper, so a retake is a fair comparison. Free-response questions cannot be
 * auto-marked, so the runner is honest about that: it scores the objective
 * questions and asks the student to self-check the rest rather than inventing a
 * mark it cannot verify.
 */
export function TestRunner({ pool, board, cls, subject, subjectTitle }: Props) {
  const { recordTest } = useProgress();
  const [sel, setSel] = useState<Selection>({ scope: "subject" });
  const [test, setTest] = useState<GeneratedTest | null>(null);
  const [picks, setPicks] = useState<Record<string, number>>({});
  const [selfMarked, setSelfMarked] = useState<Record<string, boolean>>({});
  const [result, setResult] = useState<AttemptResult | null>(null);
  const [startedAt, setStartedAt] = useState<number>(0);

  const scopeKey = `${board}/${cls}/${subject}`;

  const start = (next: Selection) => {
    setSel(next);
    const poolFor =
      next.scope === "chapter"
        ? (pool.byChapter[next.chapterId ?? ""] ?? [])
        : next.scope === "unit"
          ? (pool.bySection[next.sectionId ?? ""] ?? [])
          : pool.items;
    const seed = `${scopeKey}:${next.scope}:${next.chapterId ?? next.sectionId ?? "all"}`;
    const bp = { ...BLUEPRINTS[next.scope], scope: next.scope, seed };
    const title =
      next.scope === "chapter"
        ? `Chapter test — ${pool.testableChapters.find((c) => c.id === next.chapterId)?.title ?? "chapter"}`
        : next.scope === "unit"
          ? `Unit test — ${pool.testableChapters.find((c) => c.sectionId === next.sectionId)?.sectionTitle ?? "unit"}`
          : `${subjectTitle} ${next.scope === "full" ? "full syllabus" : "subject"} test`;
    setTest(generateTest(poolFor, { ...bp, title }));
    setPicks({});
    setSelfMarked({});
    setResult(null);
    setStartedAt(Date.now());
  };

  const objectiveIds = useMemo(
    () => new Set((test?.items ?? []).filter((i) => i.question.type === "mcq").map((i) => i.question.id)),
    [test],
  );

  const submit = () => {
    if (!test) return;
    // A free-response question has no key we can check automatically. Counting
    // the student's self-marking as a score would be a fabricated number, so the
    // auto-marked score covers objective questions only and the rest is reported
    // separately.
    const auto: Record<string, boolean> = {};
    for (const item of test.items) {
      if (!objectiveIds.has(item.question.id)) continue;
      const pick = picks[item.question.id];
      auto[item.question.id] = pick !== undefined && pick === item.question.correctIndex;
    }

    const scored = scoreAttempt(test, auto, Math.round((Date.now() - startedAt) / 1000));
    const freeResponse = test.items.filter((i) => !objectiveIds.has(i.question.id));

    recordTest({
      id: `${test.id}:${Date.now()}`,
      scope: scopeKey,
      title: test.title,
      takenAt: new Date().toISOString(),
      total: test.items.length,
      correct: scored.correct,
      wrong: scored.wrong,
      skipped: test.items.length - objectiveIds.size - scored.wrong,
      marks: scored.marks,
      maxMarks: test.marks,
      durationSec: scored.durationSec,
      byChapter: Object.fromEntries(
        scored.byChapter.map((c) => [c.id, { correct: c.correct, wrong: c.wrong, seen: 0 }]),
      ),
      byType: scored.byType,
    });

    setResult({ ...scored, skipped: scored.skipped + freeResponse.length });
  };

  if (pool.testableChapters.length === 0) {
    return (
      <div className="empty-state">
        <h3>No test paper available yet</h3>
        <p>
          A test can only be built from verified questions, and this subject has no published chapters with
          questions yet. Nothing is fabricated to fill a paper.
        </p>
      </div>
    );
  }

  if (!test) return <TestPicker pool={pool} onStart={start} sel={sel} />;

  if (result) {
    return (
      <TestResultView
        test={test}
        result={result}
        selfMarked={selfMarked}
        onSelfMark={(qid, ok) => setSelfMarked((m) => ({ ...m, [qid]: ok }))}
        onRetake={() => setTest(null)}
      />
    );
  }

  return (
    <div className="test-paper">
      <header className="practice-bar">
        <div>
          <h3>{test.title}</h3>
          <p className="muted" role="status">
            {test.items.length} question{test.items.length === 1 ? "" : "s"} · {test.marks} marks · suggested{" "}
            {Math.round(test.durationSec / 60)} minutes · {test.chapters.length} chapter
            {test.chapters.length === 1 ? "" : "s"} covered
          </p>
          {test.shortfall && <p className="muted">{test.shortfall}</p>}
        </div>
        <button type="button" className="btn" onClick={submit}>Submit paper</button>
      </header>

      <ol className="test-list">
        {test.items.map((item, i) => {
          const q = item.question;
          const isMcq = objectiveIds.has(q.id);
          return (
            <li key={q.id} className="qcard">
              <header className="qhead">
                <span className="qnum">Q{i + 1}</span>
                <span className="tag">{QUESTION_TYPE_LABEL[q.type]}</span>
                <span className="tag tag-muted">{q.marks} mark{q.marks === 1 ? "" : "s"}</span>
                <span className="tag tag-muted">{item.chapterTitle}</span>
              </header>
              {q.extract && <blockquote className="extract">{q.extract}</blockquote>}
              <p className="qprompt">{q.prompt}</p>
              {isMcq && q.options && (
                <fieldset className="options">
                  <legend className="sr-only">Choose one answer</legend>
                  {q.options.map((o, oi) => (
                    <label key={o} className="option">
                      <input
                        type="radio"
                        name={q.id}
                        checked={picks[q.id] === oi}
                        onChange={() => setPicks((a) => ({ ...a, [q.id]: oi }))}
                      />
                      <span>{o}</span>
                    </label>
                  ))}
                </fieldset>
              )}
              {!isMcq && (
                <p className="muted">
                  Written answer — not auto-marked. Write it out, then compare with the model answer after
                  submitting.
                </p>
              )}
              <details className="answer">
                <summary>Model answer</summary>
                <p>{q.answer}</p>
                {q.explanation && <p className="muted">{q.explanation}</p>}
              </details>
            </li>
          );
        })}
      </ol>
      <button type="button" className="btn" onClick={submit}>Submit paper</button>
    </div>
  );
}

function TestPicker({
  pool,
  onStart,
  sel,
}: {
  pool: SubjectPool;
  onStart: (s: Selection) => void;
  sel: Selection;
}) {
  const sections = [...new Set(pool.testableChapters.map((c) => c.sectionId))];
  return (
    <div className="grid">
      <div className="card">
        <h3>Chapter test</h3>
        <p className="muted">Every chapter with published questions, with its question count.</p>
        <label className="filter">
          <span>Chapter</span>
          <select
            value={sel.chapterId ?? ""}
            onChange={(e) => onStart({ scope: "chapter", chapterId: e.target.value })}
          >
            <option value="">Choose a chapter…</option>
            {pool.testableChapters.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title} ({c.questions} questions)
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="card">
        <h3>Unit test</h3>
        <p className="muted">All chapters in one syllabus section.</p>
        <label className="filter">
          <span>Section</span>
          <select
            value={sel.sectionId ?? ""}
            onChange={(e) => onStart({ scope: "unit", sectionId: e.target.value })}
          >
            <option value="">Choose a section…</option>
            {sections.map((id) => (
              <option key={id} value={id}>
                {pool.testableChapters.find((c) => c.sectionId === id)?.sectionTitle ?? id}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="card">
        <h3>Subject test</h3>
        <p className="muted">
          Mixed paper across all {pool.counts.questions} published questions, weighted by difficulty and
          question type.
        </p>
        <button type="button" className="btn" onClick={() => onStart({ scope: "subject" })}>
          Start subject test
        </button>
      </div>

      <div className="card">
        <h3>Full syllabus test</h3>
        <p className="muted">Longer paper, same weighting, for a full end-of-year rehearsal.</p>
        <button type="button" className="btn" onClick={() => onStart({ scope: "full" })}>
          Start full test
        </button>
      </div>
    </div>
  );
}

function TestResultView({
  test,
  result,
  selfMarked,
  onSelfMark,
  onRetake,
}: {
  test: GeneratedTest;
  result: AttemptResult;
  selfMarked: Record<string, boolean>;
  onSelfMark: (id: string, ok: boolean) => void;
  onRetake: () => void;
}) {
  const free = test.items.filter((i) => i.question.type !== "mcq");
  return (
    <div className="test-result">
      <h3>{test.title} — result</h3>
      <div className="grid">
        <div className="card">
          <span className="pill">Objective score</span>
          <p className="stat-big">{result.marks}/{result.maxMarks}</p>
          <p className="muted">
            {result.correct} correct, {result.wrong} incorrect, {result.skipped} unattempted. Accuracy{" "}
            {Math.round(result.accuracy * 100)}% of the multiple-choice questions you answered.
          </p>
        </div>
        <div className="card">
          <span className="pill">By chapter</span>
          <ul className="dash-list">
            {result.byChapter.map((c) => (
              <li key={c.id}>
                <span>{c.title}</span>
                <span className="muted">
                  {c.correct} correct / {c.wrong} wrong
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card">
          <span className="pill">By question type</span>
          <ul className="dash-list">
            {Object.entries(result.byType).map(([t, v]) => (
              <li key={t}>
                <span>{QUESTION_TYPE_LABEL[t as keyof typeof QUESTION_TYPE_LABEL] ?? t}</span>
                <span className="muted">
                  {v.correct} correct / {v.wrong} wrong
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {result.weakChapters.length > 0 && (
        <div className="card next-action">
          <span className="pill">Recommended next</span>
          <h4>Practise {result.weakChapters[0].title}</h4>
          <p className="muted">
            You got more wrong than right there ({result.weakChapters[0].wrong} wrong,{" "}
            {result.weakChapters[0].correct} correct). Redo that chapter&apos;s questions before moving on.
          </p>
        </div>
      )}

      {free.length > 0 && (
        <section className="section" aria-label="Self-mark written answers">
          <h4>Self-mark your written answers ({free.length})</h4>
          <p className="muted">
            Written answers cannot be marked automatically without inventing a mark. Compare your answer with the
            model answer and tick what you got right — this feeds your weak-topic detection.
          </p>
          <ul className="dash-list">
            {free.map((item) => (
              <li key={item.question.id}>
                <div>
                  <strong>{item.question.prompt.slice(0, 90)}</strong>
                  <details>
                    <summary>Model answer</summary>
                    <p>{item.question.answer}</p>
                  </details>
                </div>
                <span>
                  <button
                    type="button"
                    className="btn"
                    aria-pressed={selfMarked[item.question.id] === true}
                    onClick={() => onSelfMark(item.question.id, true)}
                  >
                    Got it
                  </button>{" "}
                  <button
                    type="button"
                    className="btn"
                    aria-pressed={selfMarked[item.question.id] === false}
                    onClick={() => onSelfMark(item.question.id, false)}
                  >
                    Missed it
                  </button>
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <button type="button" className="btn" onClick={onRetake}>Back to test list</button>
    </div>
  );
}