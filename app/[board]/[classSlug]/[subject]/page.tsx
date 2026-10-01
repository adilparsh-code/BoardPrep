import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ChapterBrowser, type BrowserSection } from "@/components/ChapterBrowser";
import { Disclaimer } from "@/components/Disclaimer";
import { OverallProgress } from "@/components/ProgressControls";
import { SubjectWorkspace } from "@/components/SubjectWorkspace";
import { flattenChapters, getClass, getSubject, listSubjectParams, getBoard } from "@/lib/content/loader";
import { BASELINE_LABEL } from "@/lib/content/labels";
import { routes } from "@/lib/content/routes";
import { subjectRegistry } from "@/lib/content/subjects";
import type { SubjectMeta } from "@/lib/analytics";

export const dynamicParams = false;

export function generateStaticParams() {
  // Every registered subject gets a page, including subjects whose chapters are
  // still planned: the class page links to them, so they must not 404. Planned
  // subjects render a deliberate empty state instead of a broken page.
  return listSubjectParams();
}

type Props = { params: Promise<{ board: string; classSlug: string; subject: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { board, classSlug, subject } = await params;
  const b = getBoard(board);
  const cls = getClass(board, classSlug);
  const subj = getSubject(board, classSlug, subject);
  if (!b || !cls || !subj) return {};
  const title = `${b.name.replace(" (CISCE)", "")} ${cls.label} ${subj.title}: summaries, notes and practice | BoardPrep`;
  const description = `Original ${subj.title} study material for ${b.name.replace(" (CISCE)", "")} ${cls.label}: chapter summaries, analysis, key terms and practice questions with model answers. Independent, not an official board site.`;
  return {
    title,
    description,
    openGraph: { title, description, type: "website", siteName: "BoardPrep" },
    alternates: { canonical: routes.subject(b.slug, cls.slug, subj.subjectSlug) },
  };
}

export default async function SubjectPage({ params }: Props) {
  const { board, classSlug, subject } = await params;
  const b = getBoard(board);
  const cls = getClass(board, classSlug);
  const subj = getSubject(board, classSlug, subject);
  if (!b || !cls || !subj) notFound();

  const sections: BrowserSection[] = subj.sections.map((s) => ({
    id: s.id,
    title: s.title,
    paperLabel: s.paperLabel,
    description: s.description,
    groups: s.groups.map((g) => ({
      id: g.id,
      title: g.title,
      chapters: g.chapters.map(({ file, ...c }) => {
        void file;
        return { ...c, href: routes.chapter(b.slug, cls.slug, subj.subjectSlug, c.slug) };
      }),
    })),
  }));
  const published = flattenChapters(subj).filter((l) => l.chapter.status === "published");
  const baseline = subj.syllabusBaselines.find((x) => x.status === "official-verified") ?? subj.syllabusBaselines[0];
  // The analytics metadata for this subject only. Pulled from the registry so the
  // subject page and the dashboard always describe a subject identically.
  const meta: SubjectMeta | null =
    subjectRegistry().find((e) => e.board === b.slug && e.classSlug === cls.slug && e.slug === subj.subjectSlug) ?? null;

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: b.name, href: routes.board(b.slug) },
          { label: cls.label, href: routes.cls(b.slug, cls.slug) },
          { label: subj.title },
        ]}
      />
      <section className="section">
        <p className="eyebrow">{b.name} · {cls.label}</p>
        <h1>{subj.title}</h1>
        <p className="lead">{subj.description}</p>
        {baseline && (
          <p className="muted">
            Syllabus basis: {baseline.examYear} — {BASELINE_LABEL[baseline.status]}. {baseline.note}
          </p>
        )}
        <p className="muted">
          {published.length} chapter{published.length === 1 ? "" : "s"} published of{" "}
          {flattenChapters(subj).length} in the official syllabus structure.
        </p>
        <OverallProgress chapterIds={published.map((l) => l.chapter.id)} />
      </section>
      <section className="section" aria-label="Chapters">
        {subj.sections.length === 0 ? (
          <p className="muted" role="status">
            No chapters are available for this subject yet. The syllabus structure is being prepared.
          </p>
        ) : (
          <ChapterBrowser sections={sections} />
        )}
      </section>
      <SubjectWorkspace
        board={b.slug}
        cls={cls.slug}
        subject={subj.subjectSlug}
        subjectTitle={subj.title}
        meta={meta}
      />
      <Disclaimer />
    </>
  );
}
