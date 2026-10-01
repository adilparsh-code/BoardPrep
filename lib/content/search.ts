/**
 * Server-side search index builder.
 *
 * Built from the content tree at build time, so it covers every board, class and
 * subject automatically. There is no per-subject search logic anywhere: a result
 * is just a typed record with its board/class/subject context attached, which is
 * what the results list renders.
 *
 * Only *published* chapters and their questions are indexed. Planned chapters are
 * deliberately excluded so search never surfaces something a student cannot open.
 *
 * The ranking itself lives in `searchRank.ts`, which has no filesystem imports
 * and therefore runs in the browser too.
 */
import { flattenChapters, getChapter as loadChapter, getClass, getSubject, listBoards } from "./loader";
import { routes } from "./routes";
import type { ChapterRef } from "./types";
import type { SearchIndex, SearchResult } from "./searchRank";

export type { SearchIndex, SearchResult, SearchResultType } from "./searchRank";
export { search } from "./searchRank";

export function buildSearchIndex(): SearchIndex {
  const results: SearchResult[] = [];

  for (const board of listBoards()) {
    for (const cref of board.classes) {
      const cls = getClass(board.slug, cref.slug);
      if (!cls) continue;
      for (const sref of cls.subjects) {
        const subj = getSubject(board.slug, cref.slug, sref.slug);
        if (!subj) continue;

        results.push({
          type: "subject",
          title: subj.title,
          snippet: subj.description,
          board: board.slug,
          boardName: board.name,
          classLabel: cref.label,
          subject: subj.subjectSlug,
          subjectTitle: subj.title,
          chapterSlug: null,
          href: routes.subject(board.slug, cref.slug, subj.subjectSlug),
          id: subj.id,
          anchor: null,
        });

        for (const loc of flattenChapters(subj)) {
          if (loc.chapter.status !== "published" || !loc.chapter.file) continue;
          const chapter = loadChapter(board.slug, cref.slug, subj.subjectSlug, loc.chapter);
          if (!chapter) continue;
          results.push(chapterResult(board.slug, cref.slug, subj.subjectSlug, subj.title, board.name, cref.label, loc.chapter));
          for (const q of chapter.questions) {
            results.push({
              type: "question",
              title: q.prompt,
              snippet: `${q.marks} mark${q.marks === 1 ? "" : "s"} · ${q.type} · ${q.difficulty}`,
              board: board.slug,
              boardName: board.name,
              classLabel: cref.label,
              subject: subj.subjectSlug,
              subjectTitle: subj.title,
              chapterSlug: loc.chapter.slug,
              href: `${routes.chapter(board.slug, cref.slug, subj.subjectSlug, loc.chapter.slug)}#${q.id}`,
              id: q.id,
              anchor: q.id,
            });
          }
        }
      }
    }
  }

  const haystack = results.map((r) =>
    `${r.title} ${r.snippet} ${r.subjectTitle} ${r.boardName} ${r.classLabel}`.toLowerCase(),
  );
  return { results, haystack };
}

function chapterResult(
  board: string,
  classSlug: string,
  subject: string,
  subjectTitle: string,
  boardName: string,
  classLabel: string,
  ref: ChapterRef,
): SearchResult {
  return {
    type: "chapter",
    title: ref.title,
    snippet: ref.author ? `${ref.author} — ${ref.blurb}` : ref.blurb,
    board,
    boardName,
    classLabel,
    subject,
    subjectTitle,
    chapterSlug: ref.slug,
    href: routes.chapter(board, classSlug, subject, ref.slug),
    id: ref.id,
    anchor: null,
  };
}