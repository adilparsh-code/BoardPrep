"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { ChapterRef, Section } from "@/lib/content/types";
import { KIND_LABEL } from "@/lib/content/labels";
import { ChapterStatusBadge } from "@/components/ProgressControls";

export interface BrowserChapter extends Omit<ChapterRef, "file"> { href: string }
export interface BrowserGroup { id: string; title: string; chapters: BrowserChapter[] }
export interface BrowserSection extends Pick<Section, "id" | "title" | "paperLabel" | "description"> { groups: BrowserGroup[] }

export function ChapterBrowser({ sections }: { sections: BrowserSection[] }) {
  const [query, setQuery] = useState("");
  const [sectionId, setSectionId] = useState<string>("all");
  const [showPlanned, setShowPlanned] = useState(true);
  const q = query.trim().toLowerCase();

  const filtered = useMemo(
    () =>
      sections
        .filter((s) => sectionId === "all" || s.id === sectionId)
        .map((s) => ({
          ...s,
          groups: s.groups
            .map((g) => ({
              ...g,
              chapters: g.chapters.filter(
                (c) =>
                  (showPlanned || c.status === "published") &&
                  (!q || `${c.title} ${c.author ?? ""} ${c.blurb} ${KIND_LABEL[c.kind]}`.toLowerCase().includes(q)),
              ),
            }))
            .filter((g) => g.chapters.length > 0),
        }))
        .filter((s) => s.groups.length > 0),
    [sections, sectionId, showPlanned, q],
  );

  return (
    <div>
      <div className="browser-controls">
        <label className="search">
          <span className="sr-only">Search chapters</span>
          <input type="search" placeholder="Search chapters, authors or topics" value={query} onChange={(e) => setQuery(e.target.value)} />
        </label>
        <div className="chips" role="group" aria-label="Filter by paper">
          <button type="button" className={sectionId === "all" ? "chip chip-on" : "chip"} aria-pressed={sectionId === "all"} onClick={() => setSectionId("all")}>All</button>
          {sections.map((s) => (
            <button key={s.id} type="button" className={sectionId === s.id ? "chip chip-on" : "chip"} aria-pressed={sectionId === s.id} onClick={() => setSectionId(s.id)}>
              {s.paperLabel}: {s.title}
            </button>
          ))}
        </div>
        <label className="check">
          <input type="checkbox" checked={showPlanned} onChange={(e) => setShowPlanned(e.target.checked)} />
          <span>Show chapters coming soon</span>
        </label>
      </div>

      {filtered.length === 0 && <p className="muted" role="status">No chapters match your search.</p>}

      {filtered.map((s) => (
        <section key={s.id} className="paper" aria-labelledby={`${s.id}-h`}>
          <p className="eyebrow">{s.paperLabel}</p>
          <h2 id={`${s.id}-h`}>{s.title}</h2>
          <p className="muted">{s.description}</p>
          {s.groups.map((g) => (
            <div key={g.id} className="group">
              <h3>{g.title}</h3>
              <ul className="chapter-list">
                {g.chapters.map((c) => (
                  <li key={c.id} className="chapter-row">
                    <div>
                      <span className="tag">{KIND_LABEL[c.kind]}</span>
                      {c.status === "planned" ? (
                        <>
                          <p className="chapter-title muted-title">{c.title}</p>
                          {c.author && <p className="muted">{c.author}</p>}
                          <p className="muted"><span className="tag tag-muted">Coming soon</span> {c.blurb}</p>
                        </>
                      ) : (
                        <>
                          <Link className="chapter-title" href={c.href}>{c.title}</Link>
                          {c.author && <p className="muted">{c.author}</p>}
                          <p className="muted">{c.blurb}</p>
                        </>
                      )}
                    </div>
                    {c.status === "published" && <ChapterStatusBadge chapterId={c.id} />}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}
