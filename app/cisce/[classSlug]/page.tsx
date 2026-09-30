import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getBoard, getClass } from "@/lib/content/loader";
import { routes } from "@/lib/content/routes";

export const dynamicParams = false;

export function generateStaticParams() {
  return (getBoard("cisce")?.classes ?? []).map((c) => ({ classSlug: c.slug }));
}

type Props = { params: Promise<{ classSlug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { classSlug } = await params;
  const cls = getClass("cisce", classSlug);
  if (!cls) return {};
  const title = `CISCE ${cls.label} subjects | BoardPrep`;
  const description = `Choose a CISCE ${cls.label} subject for original summaries, explanations and practice questions.`;
  return { title, description, openGraph: { title, description, type: "website", siteName: "BoardPrep" } };
}

export default async function ClassPage({ params }: Props) {
  const { classSlug } = await params;
  const cls = getClass("cisce", classSlug);
  if (!cls) notFound();
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "CISCE", href: routes.board() }, { label: cls.label }]} />
      <section className="section">
        <p className="eyebrow">CISCE</p>
        <h1>{cls.label}</h1>
        <p className="lead">Pick a subject to start.</p>
        <div className="grid" style={{ marginTop: 28 }}>
          {cls.subjects.map((s) => (
            <div className="card" key={s.slug}>
              <span className="pill">{cls.label}</span>
              <h2>{s.title}</h2>
              <p>{s.description}</p>
              <Link className="button" href={routes.subject(cls.slug, s.slug)}>Open {s.title}</Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
