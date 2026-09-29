import Link from "next/link";

const boards = [
  { name: "ICSE", description: "Classes 9–10. Start with English.", href: "/icse/english" },
  { name: "ICSE History & Civics", description: "Classes 9-10. Civics and History, fully structured.", href: "/icse/history-civics" },
  { name: "ISC", description: "Classes 11–12. Architecture ready.", href: "#" },
  { name: "CBSE", description: "Multi-subject expansion planned.", href: "#" }
];

export default function Home() {
  return (
    <>
      <header className="topbar">
        <div className="container topbar-inner">
          <Link className="brand" href="/">BoardPrep</Link>
          <nav className="nav">
            <Link href="/icse/english">ICSE English</Link>
            <Link href="/icse/history-civics">ICSE History & Civics</Link>
            <span>CBSE</span><span>ISC</span>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container">
            <div className="eyebrow">Learn · Practice · Test · Improve</div>
            <h1>Board preparation,<br />built properly.</h1>
            <p className="lead">
              BoardPrep is being built as a multi-board learning platform. The first
              implementation is ICSE English for Classes 9 and 10, with a structure
              designed to expand to ISC, CBSE and other subjects.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2>Boards</h2>
            <div className="grid">
              {boards.map((board) => (
                <div className="card" key={board.name}>
                  <span className="pill">{board.name}</span>
                  <h3>{board.name}</h3>
                  <p>{board.description}</p>
                  {board.href !== "#" && <Link className="button" href={board.href}>Open</Link>}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">BoardPrep — independent educational platform. Not affiliated with CISCE or CBSE.</div>
      </footer>
    </>
  );
}