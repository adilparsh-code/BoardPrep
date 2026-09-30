import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ChapterBrowser, type BrowserSection } from "@/components/ChapterBrowser";
import { Disclaimer } from "@/components/Disclaimer";
import { OverallProgress } from "@/components/ProgressControls";
import { flattenChapters, getClass, getSubject, listStaticParams } from "@/lib/content/loader";
import { BASELINE_LABEL } from "@/lib/content/labels";
import { routes } from "@/lib/content/routes";

export const dynamicParams = false;

export function generateStaticParams() {
  const seen = new Set<string>();
  return listStaticParams()
    .map(({ classSlug, subject }) => ({ classSlug, subject }))
    .filter((p) => (seen.has(`${p.classSlug}/${p.subject}`) ? false : (seen.add(`${p.classSlug}/${p.subject}`), true)));
}

type Props = { params: Promise<{ classSlug: string; subject: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { classSlug, subject } = await params;
  const cls = getClass("cisce", classSlug);
  const subj = getSubject("cisce", classSlug, subject);
  if (!cls || !subj) return {};
  const title = `CISCE ${cls.label} ${subj.title}: summaries, notes and practice | BoardPrep`;
  const description = `Original ${subj.title} study material for CISCE ${cls.label}: chapter summaries, analysis, vocabulary and practice questions with model answers. Independent, not an official CISCE site.`;
  return {
    title,
    description,
    openGraph: { title, description, type: "website", siteName: "BoardPrep" },
    alternates: { canonical: routes.subject(classSlug, subject) },
  };
}

export default async function SubjectPage({ params }: Props) {
  const { classSlug, subject } = await params;
  const cls = getClass("cisce", classSlug);
  const subj = getSubject("cisce", classSlug, subject);
  if (!cls || !subj) notFound();

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
        return { ...c, href: routes.chapter(classSlug, subject, c.slug) };
      }),
    })),
  }));
  const publishedIds = flattenChapters(subj).filter((l) => l.chapter.status === "published").map((l) => l.chapter.id);

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "CISCE", href: routes.board() },
          { label: cls.label, href: routes.cls(classSlug) },
          { label: subj.title },
        ]}
      />
      <section className="section">
        <p className="eyebrow">CISCE · {cls.label}</p>
        <h1>{subj.title}</h1>
        <p className="lead">{subj.description}</p>
        <OverallProgress chapterIds={publishedIds} />
      </section>

      <section className="notice" aria-labelledby="baseline-h">
        <h2 id="baseline-h">Syllabus basis</h2>
        <p>
          Chapters follow the lists below. Always check your school&apos;s current CISCE documents: BoardPrep is not the
          official source.
        </p>
        <ul>
          {subj.syllabusBaselines.map((b) => (
            <li key={b.examYear}>
              <strong>ICSE {b.examYear}:</strong> {BASELINE_LABEL[b.status]}. {b.note}
            </li>
          ))}
        </ul>
        <p className="muted">
          Chapters marked &quot;draft&quot; are original study notes that have not yet been reviewed by a subject teacher.
        </p>
      </section>

      <section className="section">
        <ChapterBrowser sections={sections} />
      </section>

      <Disclaimer />
    </>
  );
}
