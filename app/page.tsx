import Link from "next/link";
import { listBoards } from "@/lib/content/loader";
import { routes } from "@/lib/content/routes";

export default function Home() {
  const boards = listBoards();
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="eyebrow">Learn · Practice · Revise · Improve</div>
          <h1>Board preparation,<br />built properly.</h1>
          <p className="lead">
            BoardPrep is a multi-board learning platform: pick your board, class and subject, study the official
            syllabus structure chapter by chapter, and practise with original questions and model answers.
          </p>
          <p style={{ marginTop: 18 }}>
            <Link className="button" href={routes.boardsIndex}>Choose your board</Link>{" "}
            <Link className="text-link" href={routes.dashboard}>Open dashboard</Link>{" "}
            <Link className="text-link" href={routes.search}>Search</Link>
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Boards</h2>
          <div className="grid">
            {boards.map((b) => (
              <div className="card" key={b.slug}>
                <span className="pill">{b.name}</span>
                <h3>{b.fullName}</h3>
                <p>{b.description}</p>
                <p className="muted">
                  {b.classes.map((c) => c.label).join(" · ")}
                </p>
                <Link className="button" href={routes.board(b.slug)}>Open {b.name.replace(" (CISCE)", "")}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>How it works</h2>
          <div className="grid">
            {[
              ["1. Choose", "Board, class and subject — each class lists only subjects that actually apply to it."],
              ["2. Learn", "Chapter pages follow the official syllabus: overview, concepts, key terms, timelines where relevant."],
              ["3. Practice", "Original questions with model answers, marked by type and difficulty. Progress is saved per chapter."],
              ["4. Analyse", "Your dashboard tracks readiness, weak chapters and revision needs, and names the single next best action."],
            ].map(([t, d]) => (
              <div className="card" key={t}>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
