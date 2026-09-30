import Link from "next/link";
import { icseEnglish } from "@/data/icseEnglish";

export default function Class9Page() {
  const data = icseEnglish.class9;
  return <ClassPage title="Class 9 English" subtitle="ICSE English Language + Literature in English" language={data.language} literature={data.literature} />;
}

function ClassPage({ title, subtitle, language, literature }: { title: string; subtitle: string; language: string[]; literature: typeof icseEnglish.class9.literature }) {
  return (
    <>
      <header className="topbar"><div className="container topbar-inner">
        <Link className="brand" href="/">BoardPrep</Link>
        <nav className="nav"><Link href="/icse/english">ICSE English</Link></nav>
      </div></header>
      <main className="container">
        <div className="breadcrumb"><Link href="/">Home</Link> / <Link href="/icse/english">ICSE English</Link> / {title}</div>
        <section className="section">
          <div className="eyebrow">ICSE • 2027 syllabus baseline</div>
          <h1>{title}</h1>
          <p className="lead">{subtitle}</p>
        </section>
        <section className="section">
          <div className="grid">
            <div className="card">
              <span className="pill">Paper 1</span><h2>English Language</h2>
              <p>Content framework ready. Detailed lessons and question banks will be added next.</p>
              <ul className="list">{language.map(x => <li key={x}>{x}</li>)}</ul>
            </div>
            <div className="card">
              <span className="pill">Paper 2</span><h2>Literature in English</h2>
              <p>Prescribed Class 9 literature baseline from CISCE&apos;s 2027 syllabus.</p>
              <ul className="list">{literature.map(x => <li key={x.title}><strong>{x.type}:</strong> {x.title} — {x.author}</li>)}</ul>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}