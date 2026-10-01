import Link from "next/link";

const classes = [
  { grade: "Class 9", href: "/icse/english/class-9", focus: "Language + Literature" },
  { grade: "Class 10", href: "/icse/english/class-10", focus: "Language + Literature" }
];

export default function EnglishPage() {
  return (
    <>
      <header className="topbar"><div className="container topbar-inner">
        <Link className="brand" href="/">BoardPrep</Link>
        <nav className="nav"><Link href="/icse/english">ICSE English</Link></nav>
      </div></header>
      <main className="container">
        <div className="breadcrumb"><Link href="/">Home</Link> / ICSE / English</div>
        <section className="section">
          <div className="eyebrow">ICSE</div>
          <h1>English</h1>
          <p className="lead">Choose your class. Each class will contain English Language and Literature in English, with learning, practice and tests.</p>
          <div className="grid" style={{marginTop: 28}}>
            {classes.map((item) => (
              <div className="card" key={item.grade}>
                <span className="pill">{item.grade}</span>
                <h3>{item.grade} English</h3>
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