/**
 * Central subject registry — the single source of truth for "what exists".
 *
 * Every subject is derived from the content tree, so adding a board, class or
 * subject is a data change (a manifest file), never an application rewrite.
 * Components read this registry instead of duplicating subject metadata, which
 * keeps the dashboard, search, navigation and metadata in step automatically.
 *
 * Server-only: it reads the file system. The dashboard passes the serialisable
 * part of this registry to the client.
 */
import { flattenChapters, getClass, getSubject, listBoards } from "./loader";
import type { ChapterMeta, SubjectMeta } from "@/lib/analytics";

export interface SubjectRegistryEntry extends SubjectMeta {
  boardName: string;
  boardFullName: string;
  classLabel: string;
  classNumeral: number;
  classDescription: string;
  description: string;
  /** Section kinds declared by the subject manifest, used for subject styling. */
  kinds: string[];
  /** Syllabus verification state, copied from the manifest baselines. */
  syllabusVerified: boolean;
  examYears: number[];
  href: string;
  sectionHrefs: { title: string; paperLabel: string; kind: string; href: string }[];
}

function chapterMeta(
  board: string,
  classSlug: string,
  subjectSlug: string,
  subjectTitle: string,
  loc: ReturnType<typeof flattenChapters>[number],
): ChapterMeta {
  return {
    id: loc.chapter.id,
    title: loc.chapter.title,
    slug: loc.chapter.slug,
    board,
    classSlug,
    subjectSlug,
    subjectTitle,
  };
}

/**
 * Registry of every board/class/subject combination present in /content.
 * Ordered board -> class -> subject, matching the on-screen navigation.
 */
export function subjectRegistry(): SubjectRegistryEntry[] {
  const out: SubjectRegistryEntry[] = [];

  for (const board of listBoards()) {
    for (const cref of [...board.classes].sort((a, b) => a.numeral - b.numeral)) {
      const cls = getClass(board.slug, cref.slug);
      if (!cls) continue;

      for (const sref of cls.subjects) {
        const subj = getSubject(board.slug, cref.slug, sref.slug);
        if (!subj) continue;

        const locations = flattenChapters(subj);
        const published = locations.filter((l) => l.chapter.status === "published");

        out.push({
          board: board.slug,
          boardName: board.name,
          boardFullName: board.fullName,
          classSlug: cref.slug,
          classLabel: cref.label,
          classNumeral: cref.numeral,
          classDescription: cref.description,
          slug: subj.subjectSlug,
          title: subj.title,
          description: subj.description,
          kinds: [...new Set(subj.sections.map((s) => s.kind))],
          syllabusVerified: subj.syllabusBaselines.some((b) => b.status === "official-verified"),
          examYears: [...new Set(subj.syllabusBaselines.map((b) => b.examYear))].sort(),
          publishedChapters: published.map((l) => chapterMeta(board.slug, cref.slug, subj.subjectSlug, subj.title, l)),
          plannedChapters: locations.length - published.length,
          href: `/${board.slug}/${cref.slug}/${subj.subjectSlug}`,
          sectionHrefs: subj.sections.map((s) => ({
            title: s.title,
            paperLabel: s.paperLabel,
            kind: s.kind,
            href: `/${board.slug}/${cref.slug}/${subj.subjectSlug}#${s.id}`,
          })),
        });
      }
    }
  }

  return out;
}

/** Compact registry for client components: metadata only, no chapter bodies. */
export function subjectRegistryLite(): SubjectMeta[] {
  return subjectRegistry().map((s) => ({
    board: s.board,
    classSlug: s.classSlug,
    slug: s.slug,
    title: s.title,
    publishedChapters: s.publishedChapters,
    plannedChapters: s.plannedChapters,
  }));
}

/** Board slug -> display name, derived from the content tree (never hardcoded). */
export function boardLabels(): Record<string, string> {
  return Object.fromEntries(listBoards().map((b) => [b.slug, b.name]));
}