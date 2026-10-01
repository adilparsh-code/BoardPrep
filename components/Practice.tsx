"use client";

import { useMemo, useState } from "react";
import type { Question, QuestionType } from "@/lib/content/types";
import { QUESTION_TYPE_LABEL } from "@/lib/content/labels";
import { useProgress } from "@/lib/progress";

function QuestionCard({ q, n, chapterId }: { q: Question; n: number; chapterId: string }) {
  const { setAnswer } = useProgress();
  const [picked, setPicked] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [shown, setShown] = useState(false);
  const isMcq = q.type === "mcq" && q.options && q.correctIndex !== undefined;
  const correct = isMcq && checked && picked === q.correctIndex;
  const revealed = isMcq ? checked : shown;

  function check() {
    if (picked === null) return;
    setChecked(true);
    setAnswer(chapterId, q.id, picked === q.correctIndex ? "correct" : "wrong");
  }
  function reveal() {
    setShown((s) => !s);
    setAnswer(chapterId, q.id, "seen");
  }

  return (
    <article className="qcard" id={q.id} aria-labelledby={`${q.id}-title`}>
      <header className="qhead">
        <span className="qnum">Q{n}</span>
        <span className="tag">{QUESTION_TYPE_LABEL[q.type]}</span>
        <span className="tag tag-muted">{q.difficulty}</span>
        <span className="tag tag-muted">{q.marks} {q.marks === 1 ? "mark" : "marks"}</span>
      </header>
      {q.extract && <blockquote className="extract">{q.extract}</blockquote>}
      <p className="qprompt" id={`${q.id}-title`}>{q.prompt}</p>

      {isMcq ? (
        <fieldset className="options" disabled={checked}>
          <legend className="sr-only">Choose one answer</legend>
          {q.options!.map((o, i) => (
            <label key={o} className={`option${checked && i === q.correctIndex ? " option-correct" : ""}${checked && picked === i && i !== q.correctIndex ? " option-wrong" : ""}`}>
              <input type="radio" name={q.id} checked={picked === i} onChange={() => setPicked(i)} />
              <span>{o}</span>
            </label>
          ))}
        </fieldset>
      ) : null}

      <div className="qactions">
        {isMcq ? (
          !checked && (
            <button type="button" className="btn" onClick={check} disabled={picked === null}>Check answer</button>
          )
        ) : (
          <button type="button" className="btn" onClick={reveal} aria-expanded={shown}>
            {shown ? "Hide model answer" : "Show model answer"}
          </button>
        )}
      </div>

      <div aria-live="polite">
        {isMcq && checked && (
          <p className={correct ? "verdict verdict-ok" : "verdict verdict-bad"}>
            {correct ? "Correct." : "Not quite."} The right answer is: {q.options![q.correctIndex!]}
          </p>
        )}
        {revealed && (
          <div className="answer">
            {!isMcq && (<><h4>Model answer</h4><p>{q.answer}</p></>)}
            {q.explanation && (<><h4>Why</h4><p>{q.explanation}</p></>)}
            {q.commonMistake && (<><h4>Common mistake</h4><p>{q.commonMistake}</p></>)}
          </div>
        )}
      </div>
    </article>
  );
}

export function Practice({ chapterId, questions }: { chapterId: string; questions: Question[] }) {
  const { progress } = useProgress();
  const [filter, setFilter] = useState<QuestionType | "all">("all");
  const types = useMemo(() => Array.from(new Set(questions.map((q) => q.type))), [questions]);
  const visible = questions.filter((q) => filter === "all" || q.type === filter);
  const mine = progress.answers[chapterId] ?? {};
  const mcqs = questions.filter((q) => q.type === "mcq");
  const mcqCorrect = mcqs.filter((q) => mine[q.id] === "correct").length;
  const attempted = questions.filter((q) => mine[q.id]).length;

  return (
    <div>
      <div className="practice-bar">
        <p className="muted" role="status">
          {attempted} of {questions.length} attempted
          {mcqs.length > 0 && <> · multiple choice: {mcqCorrect} of {mcqs.length} correct</>}
        </p>
        <label className="filter">
          <span>Show</span>
          <select value={filter} onChange={(e) => setFilter(e.target.value as QuestionType | "all")}>
            <option value="all">All questions ({questions.length})</option>
            {types.map((t) => (
              <option key={t} value={t}>{QUESTION_TYPE_LABEL[t]} ({questions.filter((q) => q.type === t).length})</option>
            ))}
          </select>
        </label>
      </div>
      {visible.map((q) => (
        <QuestionCard key={q.id} q={q} n={questions.indexOf(q) + 1} chapterId={chapterId} />
      ))}
    </div>
  );
}
