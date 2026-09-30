import fs from "node:fs";
import path from "node:path";
import type {
  BoardManifest,
  Chapter,
  ChapterLocation,
  ChapterRef,
  ClassManifest,
  SubjectManifest,
} from "./types";

/**
 * Server-side content loader.
 *
 * - Reads structured JSON from /content at build/request time (server only).
 * - Only the manifest needed for a page is read; chapter bodies are read one at
 *   a time. Listing pages never load full chapter content.
 * - Every path segment is validated: route params against SLUG_RE, file paths
 *   from manifests against FILE_RE, and the resolved path must stay inside the
 *   content root. User-controlled input is never used as a path directly.
 */

const CONTENT_ROOT = path.join(process.cwd(), "content");
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const FILE_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*\.json$/;

const cache = new Map<string, unknown>();

function readJson<T>(...segments: string[]): T | null {
  const full = path.resolve(CONTENT_ROOT, ...segments);
  if (!full.startsWith(CONTENT_ROOT + path.sep)) return null;
  const hit = cache.get(full);
  if (hit) return hit as T;
  try {
    const parsed = JSON.parse(fs.readFileSync(full, "utf8")) as T;
    cache.set(full, parsed);
    return parsed;
  } catch {
    return null;
  }
}

function safeSlugs(...slugs: string[]): boolean {
  return slugs.every((s) => SLUG_RE.test(s));
}

export function getBoard(board: string): BoardManifest | null {
  if (!safeSlugs(board)) return null;
  return readJson<BoardManifest>(board, "board.json");
}

export function getClass(board: string, classSlug: string): ClassManifest | null {
  if (!safeSlugs(board, classSlug)) return null;
  return readJson<ClassManifest>(board, classSlug, "class.json");
}

export function getSubject(
  board: string,
  classSlug: string,
  subject: string,
): SubjectManifest | null {
  if (!safeSlugs(board, classSlug, subject)) return null;
  return readJson<SubjectManifest>(board, classSlug, subject, "subject.json");
}

/** All chapters of a subject in reading order (language first, then literature, as listed in the manifest). */
export function flattenChapters(subject: SubjectManifest): ChapterLocation[] {
  const out: ChapterLocation[] = [];
  for (const section of subject.sections) {
    for (const group of section.groups) {
      for (const chapter of group.chapters) {
        out.push({ section, group, chapter, index: out.length });
      }
    }
  }
  return out;
}

export function findChapterRef(
  subject: SubjectManifest,
  chapterSlug: string,
): ChapterLocation | null {
  if (!safeSlugs(chapterSlug)) return null;
  return flattenChapters(subject).find((l) => l.chapter.slug === chapterSlug) ?? null;
}

export function getChapter(
  board: string,
  classSlug: string,
  subject: string,
  ref: ChapterRef,
): Chapter | null {
  if (ref.status !== "published" || !ref.file || !FILE_RE.test(ref.file)) return null;
  if (!safeSlugs(board, classSlug, subject)) return null;
  return readJson<Chapter>(board, classSlug, subject, ref.file);
}

/** Previous/next *published* chapters, for chapter-to-chapter navigation. */
export function neighbours(subject: SubjectManifest, chapterSlug: string) {
  const published = flattenChapters(subject).filter((l) => l.chapter.status === "published");
  const i = published.findIndex((l) => l.chapter.slug === chapterSlug);
  return {
    prev: i > 0 ? published[i - 1] : null,
    next: i >= 0 && i < published.length - 1 ? published[i + 1] : null,
    position: i + 1,
    total: published.length,
  };
}

/** Enumerate everything for generateStaticParams. */
export function listStaticParams() {
  const boards = ["cisce"];
  const params: { board: string; classSlug: string; subject: string; chapter: string }[] = [];
  for (const b of boards) {
    const board = getBoard(b);
    if (!board) continue;
    for (const c of board.classes) {
      const cls = getClass(b, c.slug);
      if (!cls) continue;
      for (const s of cls.subjects) {
        const subj = getSubject(b, c.slug, s.slug);
        if (!subj) continue;
        for (const loc of flattenChapters(subj)) {
          if (loc.chapter.status === "published") {
            params.push({ board: b, classSlug: c.slug, subject: s.slug, chapter: loc.chapter.slug });
          }
        }
      }
    }
  }
  return params;
}
