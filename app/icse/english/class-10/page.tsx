import Link from "next/link";
import { icseEnglish } from "@/data/icseEnglish";

export default function Class10Page() {
  const data = icseEnglish.class10;
  return (
    <>
      <header className="topbar"><div className="container topbar-inner">
        <Link className="brand" href="/">BoardPrep</Link>
        <nav className="nav"><Link href="/icse/english">ICSE English</Link></nav>
      </div></header>
      <main className="container">
        <div className="breadcrumb"><Link href="/">Home</Link> / <Link href="/icse/english">ICSE English</Link> / Class 10</div>
        <section className="section">
          <div className="eyebrow">ICSE • 2027 syllabus baseline</div>
          <h1>Class 10 English</h1>
          <p className="lead">English Language + Literature in English. This starter uses the official 2027 prescribed literature baseline.</p>
        </section>
        <section className="section">
          <div className="grid">
            <div className="card">
              <span className="pill">Paper 1</span><h2>English Language</h2>
              <p>Learning architecture is ready for composition, comprehension, grammar and board-style practice.</p>
              <ul className="list">{data.language.map(x => <li key={x}>{x}</li>)}</ul>
            </div>
            <div className="card">
              <span className="pill">Paper 2</span><h2>Literature in English</h2>
              <p>Prescribed Class 10 literature baseline from CISCE's 2027 syllabus.</p>
              <ul className="list">{data.literature.map(x => <li key={x.title}><strong>{x.type}:</strong> {x.title} — {x.author}</li>)}</ul>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}