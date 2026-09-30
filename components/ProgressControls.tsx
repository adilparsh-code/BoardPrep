"use client";

import { useProgress } from "@/lib/progress";

export function MarkComplete({ chapterId }: { chapterId: string }) {
  const { progress, toggleComplete } = useProgress();
  const done = !!progress.completed[chapterId];
  return (
    <button type="button" className={done ? "btn btn-done" : "btn"} aria-pressed={done} onClick={() => toggleComplete(chapterId)}>
      {done ? "Completed (tap to undo)" : "Mark chapter as completed"}
    </button>
  );
}

export function ChapterStatusBadge({ chapterId }: { chapterId: string }) {
  const { progress } = useProgress();
  if (progress.completed[chapterId]) return <span className="tag tag-ok">Completed</span>;
  const n = Object.keys(progress.answers[chapterId] ?? {}).length;
  if (n > 0) return <span className="tag tag-muted">{n} answered</span>;
  return null;
}

export function OverallProgress({ chapterIds }: { chapterIds: string[] }) {
  const { progress } = useProgress();
  const done = chapterIds.filter((id) => progress.completed[id]).length;
  const pct = chapterIds.length ? Math.round((done / chapterIds.length) * 100) : 0;
  return (
    <div className="overall" role="group" aria-label="Your progress">
      <p className="muted">{done} of {chapterIds.length} chapters completed (saved in this browser only)</p>
      <div className="bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}><span style={{ width: `${pct}%` }} /></div>
    </div>
  );
}
