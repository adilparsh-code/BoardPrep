import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getBoard } from "@/lib/content/loader";
import { routes } from "@/lib/content/routes";

const TITLE = "CISCE (ICSE) study material | BoardPrep";
const DESC = "Independent study notes, explanations and practice questions for the CISCE ICSE course, starting with Class IX English.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  openGraph: { title: TITLE, description: DESC, type: "website", siteName: "BoardPrep" },
};

export default function BoardPage() {
  const board = getBoard("cisce");
  if (!board) notFound();
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: board.name }]} />
      <section className="section">
        <p className="eyebrow">Board</p>
        <h1>{board.name}</h1>
        <p className="lead">{board.description}</p>
        <div className="grid" style={{ marginTop: 28 }}>
          {board.classes.map((c) => (
            <div className="card" key={c.slug}>
              <span className="pill">{c.label}</span>
              <h2>{c.label}</h2>
              <p>{c.description}</p>
              <Link className="button" href={routes.cls(c.slug)}>Choose subject</Link>
            </div>
          ))}
        </div>
        <p className="muted" style={{ marginTop: 24 }}>
          Looking for Class X? An early outline is available at{" "}
          <Link className="text-link" href="/icse/english/class-10">ICSE English, Class X</Link>.
        </p>
      </section>
    </>
  );
}
