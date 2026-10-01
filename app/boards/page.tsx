import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { listBoards } from "@/lib/content/loader";
import { routes } from "@/lib/content/routes";

const TITLE = "Boards | BoardPrep";
const DESC = "Choose your board: ICSE and ISC (CISCE) and CBSE. Original study material, practice questions and syllabus-aligned structure.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  openGraph: { title: TITLE, description: DESC, type: "website", siteName: "BoardPrep" },
  alternates: { canonical: routes.boardsIndex },
};

export default function BoardsPage() {
  const boards = listBoards();
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Boards" }]} />
      <section className="section">
        <p className="eyebrow">Step 1</p>
        <h1>Choose your board</h1>
        <p className="lead">
          Each board lists only the classes and subjects that actually apply to it. Subject pages show the official
          syllabus structure with published chapters clearly marked.
        </p>
        <div className="grid" style={{ marginTop: 28 }}>
          {boards.map((b) => (
            <div className="card" key={b.slug}>
              <span className="pill">{b.name}</span>
              <h2>{b.name}</h2>
              <p>{b.description}</p>
              <p className="muted">Classes: {b.classes.map((c) => c.label).join(", ")}</p>
              <Link className="button" href={routes.board(b.slug)}>Open {b.name}</Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
