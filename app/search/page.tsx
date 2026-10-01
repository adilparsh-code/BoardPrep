import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SearchClient } from "@/components/SearchClient";
import { buildSearchIndex } from "@/lib/content/search";
import { routes } from "@/lib/content/routes";

export const metadata: Metadata = {
  title: "Search all subjects, chapters and questions | BoardPrep",
  description:
    "Search across every board, class and subject on BoardPrep: subjects, chapters, questions and key terms. Independent study platform, not an official board site.",
  alternates: { canonical: routes.search },
};

/**
 * The index is built once at build time and passed to the client, so search is
 * instant and no server round-trip happens per keystroke. Only published content
 * is indexed.
 */
export default function SearchPage() {
  const index = buildSearchIndex();
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Search" }]} />
      <section className="section">
        <p className="eyebrow">Search</p>
        <h1>Find anything in your syllabus</h1>
        <p className="lead">
          Searching {index.results.length} subjects, chapters and questions across every board and
          class.
        </p>
        <SearchClient index={index} />
      </section>
    </>
  );
}
