import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlockView } from "@/components/BlockView";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Practice } from "@/components/Practice";
import { MarkComplete } from "@/components/ProgressControls";
import { KIND_LABEL, SYLLABUS_LABEL } from "@/lib/content/labels";
import { findChapterRef, getChapter, getClass, getSubject, listStaticParams, neighbours } from "@/lib/content/loader";
import { routes } from "@/lib/content/routes";

export const dynamicParams = false;

export function generateStaticParams() {
  return listStaticParams().map(({ classSlug, subject, chapter }) => ({ classSlug, subject, chapter }));
}

type Props = { params: Promise<{ classSlug: string; subject: string; chapter: string }> };

function resolve(classSlug: string, subject: string, chapterSlug: string) {
  const cls = getClass("cisce", classSlug);
  const subj = getSubject("cisce", classSlug, subject);
  if (!cls || !subj) return null;
  const loc = findChapterRef(subj, chapterSlug);
  if (!loc || loc.chapter.status !== "published") return null;
  const chapter = getChapter("cisce", classSlug, subject, loc.chapter);
  if (!chapter) return null;
  return { cls, subj, loc, chapter };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { classSlug, subject, chapter: slug } = await params;
  const r = resolve(classSlug, subject, slug);
  if (!r) return {};
  const by = r.chapter.author ? ` by ${r.chapter.author}` : "";
  const title = `${r.chapter.title}${by}: CISCE ${r.cls.label} ${r.subj.title} notes | BoardPrep`;
  const description = `${r.chapter.overview.intro.slice(0, 150).trim()}${r.chapter.overview.intro.length > 150 ? "…" : ""} Original summary, analysis and practice questions.`;
  return {
    title,
    description,
    openGraph: { title, description, type: "article", siteName: "BoardPrep" },
    alternates: { canonical: routes.chapter(classSlug, subject, slug) },
  };
}

export default async function ChapterPage({ params }: Props) {
  const { classSlug, subject, chapter: slug } = await params;
  const r = resolve(classSlug, subject, slug);
  if (!r) notFound();
  const { cls, subj, loc, chapter } = r;
  const nb = neighbours(subj, slug);
  const isLit = loc.section.kind === "literature";

  const nav = [
    { id: "overview", label: "Overview" },
    ...chapter.learn.map((s) => ({ id: s.id, label: s.title })),
    { id: "revise", label: "Key points" },
    ...(chapter.vocabulary.length ? [{ id: "vocabulary", label: isLit ? "Vocabulary" : "Word bank" }] : []),
    { id: "practice", label: "Practice" },
  ];

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "CISCE", href: routes.board() },
          { label: cls.label, href: routes.cls(classSlug) },
          { label: subj.title, href: routes.subject(classSlug, subject) },
          { label: chapter.title },
        ]}
      />

      <header className="chapter-head">
        <p className="eyebrow">{loc.section.paperLabel} · {loc.section.title} · {KIND_LABEL[chapter.kind]}</p>
        <h1>{chapter.title}</h1>
        {chapter.author && <p className="byline">{chapter.author}</p>}
        <p className="lead">{chapter.tagline}</p>
        <p>
          <span className="tag">{SYLLABUS_LABEL[loc.chapter.syllabusStatus]}</span>{" "}
          {chapter.reviewStatus === "draft" && <span className="tag tag-warn">Draft: awaiting teacher review</span>}
        </p>
      </header>

      <div className="chapter-layout">
        <nav className="toc" aria-label="On this page">
          <ol>
            {nav.map((n) => (
              <li key={n.id}><a href={`#${n.id}`}>{n.label}</a></li>
            ))}
          </ol>
        </nav>

        <article className="chapter-body">
          <section id="overview" aria-labelledby="overview-h">
            <h2 id="overview-h">Overview</h2>
            <p>{chapter.overview.intro}</p>
            <dl className="facts">
              {chapter.overview.facts.map((f) => (
                <div key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></div>
              ))}
            </dl>
          </section>

          {chapter.learn.map((s) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`}>
              <h2 id={`${s.id}-h`}>{s.title}</h2>
              {s.blocks.map((b, i) => <BlockView key={i} block={b} />)}
            </section>
          ))}

          <section id="revise" aria-labelledby="revise-h">
            <h2 id="revise-h">Key points to revise</h2>
            <ul className="list">{chapter.keyPoints.map((k) => <li key={k}>{k}</li>)}</ul>
            <h3>What examiners commonly look for</h3>
            <ul className="list">{chapter.examFocus.map((k) => <li key={k}>{k}</li>)}</ul>
          </section>

          {chapter.vocabulary.length > 0 && (
            <section id="vocabulary" aria-labelledby="vocab-h">
              <h2 id="vocab-h">{isLit ? "Vocabulary" : "Word bank"}</h2>
              <dl className="terms">
                {chapter.vocabulary.map((v) => (
                  <div key={v.word}>
                    <dt>{v.word}</dt>
                    <dd>{v.meaning}{v.context && <em className="muted"> Example: {v.context}</em>}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          <section id="practice" aria-labelledby="practice-h">
            <h2 id="practice-h">Practice questions</h2>
            <p className="muted">Try each question yourself first, then check the model answer. Marks are practice indicators, not official allocations.</p>
            <Practice chapterId={chapter.id} questions={chapter.questions} />
            <div className="finish">
              <MarkComplete chapterId={chapter.id} />
            </div>
          </section>

          <aside className="source-note" aria-labelledby="source-h">
            <h2 id="source-h">About this material</h2>
            {chapter.sourceNote.thirdParty && (<p><strong>Third-party material:</strong> {chapter.sourceNote.thirdParty}</p>)}
            <p><strong>BoardPrep-created material:</strong> {chapter.sourceNote.boardprep}</p>
            <p><Link className="text-link" href={routes.aboutDisclaimer}>Read the full educational and copyright notice</Link></p>
          </aside>

          <nav className="pager" aria-label="Chapter navigation">
            {nb.prev ? <Link href={routes.chapter(classSlug, subject, nb.prev.chapter.slug)}>← {nb.prev.chapter.title}</Link> : <span />}
            <Link href={routes.subject(classSlug, subject)}>All chapters</Link>
            {nb.next ? <Link href={routes.chapter(classSlug, subject, nb.next.chapter.slug)}>{nb.next.chapter.title} →</Link> : <span />}
          </nav>
        </article>
      </div>
    </>
  );
}
