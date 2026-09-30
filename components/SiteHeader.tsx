import Link from "next/link";
import { routes } from "@/lib/content/routes";

export function SiteHeader() {
  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <Link className="brand" href="/">BoardPrep</Link>
        <nav className="site-nav" aria-label="Main">
          <Link href={routes.board()}>CISCE</Link>
          <Link href={routes.subject("class-9", "english")}>Class IX English</Link>
          <Link href={routes.about}>About</Link>
        </nav>
      </div>
    </header>
  );
}
