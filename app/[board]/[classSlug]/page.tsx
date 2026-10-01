import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getBoard, getClass, listBoards } from "@/lib/content/loader";
import { routes } from "@/lib/content/routes";

export const dynamicParams = false;

export function generateStaticParams() {
  const params: { board: string; classSlug: string }[] = [];
  for (const b of listBoards()) {
    for (const c of b.classes) params.push({ board: b.slug, classSlug: c.slug });
  }
  return params;
}

type Props = { params: Promise<{ board: string; classSlug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { board, classSlug } = await params;
  const cls = getClass(board, classSlug);
  if (!cls) return {};
  const title = `${cls.label} subjects | BoardPrep`;
  const description = `Choose a ${cls.label} subject for original summaries, explanations and practice questions.`;
  return { title, description, openGraph: { title, description, type: "website", siteName: "BoardPrep" } };
}

export default async function ClassPage({ params }: Props) {
  const { board, classSlug } = await params;
  const b = getBoard(board);
  const cls = getClass(board, classSlug);
  if (!b || !cls) notFound();
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: b.name, href: routes.board(b.slug) },
          { label: cls.label },
        ]}
      />
      <section className="section">
        <p className="eyebrow">{b.name}</p>
        <h1>{cls.label}</h1>
        <p className="lead">{b.classes.find((c) => c.slug === cls.slug)?.description ?? "Pick a subject to start."}</p>
        <p className="muted">{cls.subjects.length} subjects listed. Published chapters are open; others are planned against the official syllabus.</p>
        <div className="grid" style={{ marginTop: 28 }}>
          {cls.subjects.map((s) => (
            <div className="card" key={s.slug}>
              <span className="pill">{cls.label}</span>
              <h2>{s.title}</h2>
              <p>{s.description}</p>
              <a className="button" href={routes.subject(b.slug, cls.slug, s.slug)}>Open {s.title}</a>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
