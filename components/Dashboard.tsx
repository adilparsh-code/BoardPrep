"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  REVISION_STATE_LABEL,
  allSubjectStats,
  answeredToday,
  nextBestAction,
  streakDays,
  type NextAction,
  type SubjectMeta,
  type SubjectStat,
} from "@/lib/analytics";
import { useProgress } from "@/lib/progress";
import type { Bookmark } from "@/lib/progress";
import { routes } from "@/lib/content/routes";

/**
 * Personal academic command centre. It is deliberately not a subject directory:
 * it answers four questions only — where am I, what is weak, what next, and how
 * far from ready. Every number shown is measured from the student's own data;
 * when there is not enough data the panel says so instead of guessing.
 */
export function Dashboard({ subjects, boardLabels }: { subjects: SubjectMeta[]; boardLabels: Record<string, string> }) {
  const { progress, setDailyGoal } = useProgress();
  // Recompute against a stable "now" per render pass; Date.now() in render would
  // make the derived stats unstable across re-renders.
  const now = useMemo(() => Date.now(), []);
  const stats: SubjectStat[] = useMemo(() => allSubjectStats(subjects, progress, now), [subjects, progress, now]);
  const hrefFor = (b: string, c: string, s: string, ch?: string) =>
    ch ? routes.chapter(b, c, s, ch) : routes.subject(b, c, s);

  const action: NextAction | null = useMemo(() => nextBestAction(stats, hrefFor), [stats]);
  const withChapters = stats.filter((s) => s.published > 0);
  const totalPublished = withChapters.reduce((n, s) => n + s.published, 0);
  const totalCompleted = withChapters.reduce((n, s) => n + s.completed, 0);
  const overall = totalPublished ? totalCompleted / totalPublished : 0;
  const today = answeredToday(progress);
  const streak = streakDays(progress, now);
  const weak = withChapters.flatMap((s) => s.weak.map((c) => ({ s, c }))).slice(0, 6);
  const revise = withChapters.flatMap((s) => s.needsRevision.map((c) => ({ s, c }))).slice(0, 6);
  const recent = progress.tests.slice(0, 5);
  const bookmarks = Object.values(progress.bookmarks).filter(
    (b): b is Bookmark => typeof b === "object" && b !== null,
  );

  if (totalPublished === 0) {
    return (
      <section className="section">
        <h2>Your dashboard</h2>
        <p className="muted" role="status">
          There is no published study material yet, so there is nothing to track. Browse the boards to see what is
          available.
        </p>
        <Link className="button" href={routes.boardsIndex}>Browse boards</Link>
      </section>
    );
  }

  return (
    <div className="dash">
      <section className="section" aria-labelledby="dash-target">
        <h2 id="dash-target">Where you are</h2>
        <div className="grid">
          <div className="card">
            <span className="pill">Readiness</span>
            <p className="stat-big">{Math.round(overall * 100)}%</p>
            <p className="muted">
              {totalCompleted} of {totalPublished} published chapters completed across {withChapters.length} subject
              {withChapters.length === 1 ? "" : "s"}.
            </p>
          </div>
          <div className="card">
            <span className="pill">Today</span>
            <p className="stat-big">{today}</p>
            <p className="muted">questions answered. Daily goal: {progress.dailyGoal}.</p>
            <label className="goal">
              <span className="sr-only">Daily question goal</span>
              <input
                type="number"
                min={5}
                max={200}
                step={5}
                value={progress.dailyGoal}
                onChange={(e) => setDailyGoal(Number(e.target.value) || 20)}
              />
            </label>
          </div>
          <div className="card">
            <span className="pill">Streak</span>
            <p className="stat-big">{streak}</p>
            <p className="muted">consecutive day{streak === 1 ? "" : "s"} with recorded practice.</p>
          </div>
          <div className="card">
            <span className="pill">XP</span>
            <p className="stat-big">{withChapters.reduce((n, s) => n + s.xp, 0)}</p>
            <p className="muted">earned from completed chapters, correct answers and tests taken.</p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="dash-next">
        <h2 id="dash-next">Do this next</h2>
        {action ? (
          <div className="card next-action">
            <span className="pill">Recommended</span>
            <h3>{action.headline}</h3>
            <p>{action.detail}</p>
            <p className="muted">
              <strong>Why this:</strong> {action.reason}
            </p>
            <Link className="button" href={action.href}>
              {action.kind === "start" ? "Start chapter" : action.kind === "revise" ? "Revise now" : action.kind === "test" ? "Open subject" : "Open chapter"}
            </Link>
          </div>
        ) : (
          <p className="muted" role="status">
            Nothing outstanding. Every published chapter in every subject is complete and marked mastered.
          </p>
        )}
      </section>

      <section className="section" aria-labelledby="dash-subjects">
        <h2 id="dash-subjects">Subject readiness</h2>
        <div className="grid">
          {withChapters.map((s) => (
            <div className="card" key={`${s.meta.board}/${s.meta.classSlug}/${s.meta.slug}`}>
              <span className="pill">{boardLabels[s.meta.board] ?? s.meta.board}</span>
              <h3>{s.meta.title}</h3>
              <ProgressBar value={s.readiness} label={`${s.completed}/${s.published} chapters`} />
              <p className="muted">
                {s.answered === 0
                  ? "No questions attempted yet."
                  : `${s.correct}/${s.answered} correct (${pct(s.accuracy)}).`}
                {s.tests.length > 0 && ` ${s.tests.length} test${s.tests.length === 1 ? "" : "s"} taken.`}
              </p>
              <Link className="text-link" href={routes.subject(s.meta.board, s.meta.classSlug, s.meta.slug)}>
                Open subject
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="dash-weak">
        <h2 id="dash-weak">Weak areas</h2>
        {weak.length === 0 ? (
          <p className="muted" role="status">
            No chapter is below the weak threshold yet. Weak means under 60% correct across at least four attempted
            questions.
          </p>
        ) : (
          <ul className="dash-list">
            {weak.map(({ s, c }) => (
              <li key={c.meta.id}>
                <div>
                  <strong>{c.meta.title}</strong>
                  <span className="muted"> — {s.meta.title}, {c.correct}/{c.answered} correct</span>
                </div>
                <Link className="text-link" href={routes.chapter(s.meta.board, s.meta.classSlug, s.meta.slug, c.meta.slug)}>
                  Practise
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="section" aria-labelledby="dash-revise">
        <h2 id="dash-revise">What to revise today</h2>
        {revise.length === 0 ? (
          <p className="muted" role="status">
            Nothing needs revision. A chapter is queued here once it has not been practised for seven days and has not
            reached mastery.
          </p>
        ) : (
          <ul className="dash-list">
            {revise.map(({ s, c }) => (
              <li key={c.meta.id}>
                <div>
                  <strong>{c.meta.title}</strong>
                  <span className="muted">
                    {" "}
                    — {s.meta.title} · {REVISION_STATE_LABEL[c.mastery]}
                    {c.lastPractised && ` · last practised ${relativeDays(c.lastPractised, now)}`}
                  </span>
                </div>
                <Link className="text-link" href={routes.chapter(s.meta.board, s.meta.classSlug, s.meta.slug, c.meta.slug)}>
                  Revise
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="section" aria-labelledby="dash-tests">
        <h2 id="dash-tests">Recent tests</h2>
        {recent.length === 0 ? (
          <p className="muted" role="status">
            No tests taken yet. Take a subject test from a subject page once its chapters are complete.
          </p>
        ) : (
          <ul className="dash-list">
            {recent.map((t) => (
              <li key={t.id}>
                <div>
                  <strong>{t.title}</strong>
                  <span className="muted">
                    {" "}
                    — {t.correct}/{t.total} correct · {t.marks}/{t.maxMarks} marks · {t.durationSec}s
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {bookmarks.length > 0 && (
        <section className="section" aria-labelledby="dash-bookmarks">
          <h2 id="dash-bookmarks">Bookmarks</h2>
          <ul className="dash-list">
            {bookmarks.map((b) => (
              <li key={b.id}>
                <div>
                  <strong>{b.chapterTitle}</strong>
                  <span className="muted">
                    {" "}
                    — {boardLabels[b.board] ?? b.board} · {b.subjectTitle}
                  </span>
                </div>
                <Link className="text-link" href={b.href}>Open</Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

function pct(a: number | null): string {
  return a === null ? "accuracy not enough to measure yet" : `${Math.round(a * 100)}% accuracy`;
}

function ProgressBar({ value, label }: { value: number; label: string }) {
  const v = Math.round(Math.min(1, Math.max(0, value)) * 100);
  return (
    <div className="bar" role="img" aria-label={`${label}: ${v}%`}>
      <div className="bar-fill" style={{ width: `${v}%` }} />
    </div>
  );
}

function relativeDays(iso: string, now: number): string {
  const d = Math.floor((now - Date.parse(iso)) / 86_400_000);
  if (d <= 0) return "today";
  if (d === 1) return "yesterday";
  return `${d} days ago`;
}

export { ProgressBar };
