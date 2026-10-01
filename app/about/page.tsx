import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Disclaimer } from "@/components/Disclaimer";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { routes } from "@/lib/content/routes";

const TITLE = "About BoardPrep and copyright notice";
const DESC = "BoardPrep is an independent educational platform. Read how our study material relates to third-party texts and syllabus documents.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  openGraph: { title: TITLE, description: DESC, type: "website", siteName: "BoardPrep" },
};

export default function AboutPage() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader />
      <main id="main" className="container page">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
        <section className="section">
          <p className="eyebrow">About</p>
          <h1>About BoardPrep</h1>
          <p className="lead">
            BoardPrep helps students understand and revise school subjects with clear summaries, explanations and
            practice questions. Start with <Link className="text-link" href={routes.subject("icse", "class-9", "english")}>ICSE Class IX English</Link>.
          </p>
        </section>
        <Disclaimer />
      </main>
      <SiteFooter />
    </>
  );
}
