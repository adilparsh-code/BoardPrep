"use client";

import { REVISION_STATES, REVISION_STATE_LABEL } from "@/lib/analytics";
import { useProgress, type RevisionState } from "@/lib/progress";

export interface ChapterRef {
  id: string;
  board: string;
  classSlug: string;
  subject: string;
  subjectTitle: string;
  chapter: string;
  chapterTitle: string;
  href: string;
}

/**
 * Per-chapter student actions: bookmark and revision state.
 *
 * The revision lifecycle is the subject-agnostic one from lib/analytics, so a
 * student uses the same words for a Chemistry chapter and a History chapter. A
 * manual choice overrides the derived state (progress.revisionOverride), which is
 * what lets "I know this one" persist even when accuracy says otherwise.
 *
 * The bookmark stores full board/class/subject/chapter context, so the dashboard
 * can list and link it without guessing.
 */
export function ChapterActions({ chapter }: { chapter: ChapterRef }) {
  const { progress, toggleBookmark, setRevisionState } = useProgress();
  const bookmarked = !!progress.bookmarks[chapter.id];
  const current = progress.revisionOverride[chapter.id];

  return (
    <div className="chapter-actions">
      <button
        type="button"
        className="btn"
        aria-pressed={bookmarked}
        onClick={() => toggleBookmark(chapter)}
      >
        {bookmarked ? "Bookmarked (tap to remove)" : "Bookmark this chapter"}
      </button>

      <label className="filter">
        <span>Revision status</span>
        <select
          value={current ?? ""}
          onChange={(e) => {
            const v = e.target.value;
            // "" means "go back to the automatically derived state".
            if (v === "") setRevisionState(chapter.id, "not-started");
            else setRevisionState(chapter.id, v as RevisionState);
          }}
        >
          <option value="">Automatic (from your answers)</option>
          {REVISION_STATES.map((s) => (
            <option key={s} value={s}>{REVISION_STATE_LABEL[s]}</option>
          ))}
        </select>
      </label>
    </div>
  );
}