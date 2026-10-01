import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Dashboard } from "@/components/Dashboard";
import { boardLabels, subjectRegistryLite } from "@/lib/content/subjects";
import { routes } from "@/lib/content/routes";

export const metadata: Metadata = {
  title: "Your dashboard | BoardPrep",
  description:
    "Track readiness, weak areas, next-best actions and revision across every BoardPrep subject. Independent study platform, not an official board site.",
  alternates: { canonical: routes.dashboard },
};

/**
 * The dashboard is a pure client view over the local progress store; the only
 * server input is the subject registry, so no per-subject data is duplicated.
 */
export default function DashboardPage() {
  // Only subjects with published chapters can show measured progress, so the
  // client bundle carries just those instead of the entire 75-subject registry.
  const all = subjectRegistryLite().filter((s) => s.publishedChapters.length > 0);
  const labels = boardLabels();

  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Dashboard" }]} />
      <section className="section">
        <p className="eyebrow">Dashboard</p>
        <h1>Your academic command centre</h1>
      </section>
      <Dashboard subjects={all} boardLabels={labels} />
    </>
  );
}