import Link from "next/link";

const classes = [
  {
    grade: "Class 9",
    href: "/icse/history-civics/class-9",
    focus: "Civics: Constitution, Elections, Local Self Government. History: Harappan Civilisation to the Modern Age in Europe.",
  },
  {
    grade: "Class 10",
    href: "/icse/history-civics/class-10",
    focus: "Civics: Union Legislature, Executive, Judiciary. History: National Movement (1857-1947) and the Contemporary World.",
  },
];

export default function HistoryCivicsPage() {
  return (
    <>
      <header className="topbar"><div className="container topbar-inner">
        <Link className="brand" href="/">BoardPrep</Link>
        <nav className="nav"><Link href="/icse/history-civics">ICSE History & Civics</Link></nav>
      </div></header>
      <main className="container">
        <div className="breadcrumb"><Link href="/">Home</Link> / ICSE / History & Civics</div>
        <section className="section">
          <div className="eyebrow">ICSE</div>
          <h1>History & Civics</h1>
          <p className="lead">Choose your class. Each class contains Civics (Section A) and History (Section B) with notes, practice questions and test sets following the ICSE pattern.</p>
          <div className="grid" style={{marginTop: 28}}>
            {classes.map((item) => (
              <div className="card" key={item.grade}>
                <span className="pill">{item.grade}</span>
                <h3>{item.grade} History & Civics</h3>
                <p>{item.focus}</p>
                <Link className="button" href={item.href}>Explore class</Link>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}