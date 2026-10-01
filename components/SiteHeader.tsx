import Link from "next/link";
import { listBoards } from "@/lib/content/loader";
import { routes } from "@/lib/content/routes";

export function SiteHeader() {
  const boards = listBoards();
  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <Link className="brand" href="/">BoardPrep</Link>
        <nav className="site-nav" aria-label="Main">
          <Link href={routes.dashboard}>Dashboard</Link>
          <Link href={routes.search}>Search</Link>
          <Link href={routes.boardsIndex}>Boards</Link>
          {boards.map((b) => (
            <Link key={b.slug} href={routes.board(b.slug)}>{b.name.replace(" (CISCE)", "")}</Link>
          ))}
          <Link href={routes.about}>About</Link>
        </nav>
      </div>
    </header>
  );
}