import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getBoard, listBoards } from "@/lib/content/loader";
import { routes } from "@/lib/content/routes";

export const dynamicParams = false;

export function generateStaticParams() {
  return listBoards().map((b) => ({ board: b.slug }));
}

type Props = { params: Promise<{ board: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { board } = await params;
  const b = getBoard(board);
  if (!b) return {};
  const title = `${b.name} study material | BoardPrep`;
  return {
    title,
    description: b.description,
    openGraph: { title, description: b.description, type: "website", siteName: "BoardPrep" },
    alternates: { canonical: routes.board(b.slug) },
  };
}

export default async function BoardPage({ params }: Props) {
  const { board } = await params;
  const b = getBoard(board);
  if (!b) notFound();
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Boards", href: routes.boardsIndex }, { label: b.name }]} />
      <section className="section">
        <p className="eyebrow">Board</p>
        <h1>{b.name}</h1>
        <p className="lead">{b.description}</p>
        <p className="muted">
          {b.fullName}. {b.classes.length} class{b.classes.length === 1 ? "" : "es"} available.
        </p>
        <div className="grid" style={{ marginTop: 28 }}>
          {b.classes.map((c) => (
            <div className="card" key={c.slug}>
              <span className="pill">{c.label}</span>
              <h2>{c.label}</h2>
              <p>{c.description}</p>
              <p className="muted">
                Subjects: {c.numeral === 9 || c.numeral === 10 ? "ICSE" : "senior secondary"} structure, listed on the
                next page.
              </p>
              <a className="button" href={routes.cls(b.slug, c.slug)}>Choose subject</a>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
