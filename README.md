# BoardPrep

A multi-board academic preparation platform for **ICSE**, **ISC** and **CBSE**, covering
Classes 9–12 across core, language, commerce and humanities subjects.

BoardPrep is an independent educational platform. It is **not affiliated with CISCE or
CBSE**, and it is not an official board site.

## Student journey

```
Board → Class → Subject → Chapter → Learn → Practice → PYQ → Test → Analysis → AI next action → Revision
```

Every stage is subject-agnostic. The panel structure, controls and analysis are identical
for an English prose chapter, a Mathematics numerical and a Geography map question; only
the content differs, and it comes from the content tree.

## Stack

- Next.js (App Router, static generation for every content route)
- React + TypeScript
- Plain CSS — no UI framework dependency
- JSON content files on disk, read server-side through one validated loader
- Student state in `localStorage` (versioned, per-browser, no server, no accounts)

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
```

## Verify everything

```bash
npm run check
```

`check` runs, in order: content validation → typecheck → lint → unit tests → production
build → live route audit → Mathematics arithmetic verification → live content smoke test.
Each is also available on its own:

| Command | What it does |
|---|---|
| `npm run validate:content` | Validates every manifest, chapter and question |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm test` | Validator unit tests |
| `npm run build` | Production build |
| `npm run audit:routes` | Live HTTP audit of every generated route and legacy redirect |
| `npm run verify:math` | Recomputes the numeric claims in the Mathematics chapters exactly |
| `npm run smoke` | Live check that Mathematics chapters render their own content and are indexed |

## Content architecture

```
content/
  <board>/
    board.json              board metadata + class list
    class-9/
      class.json            subjects offered in this board/class
      <subject>/
        subject.json        sections (papers) → groups → chapter refs
        chapters/*.json     chapter bodies, loaded one at a time
```

```
board → class → subject → section (paper) → group → chapter → questions
```

Adding a board, class, subject or chapter is a **data change**: create or edit a manifest
file. No route, component or registry needs to change. Boards, classes and subjects are
discovered from the tree at build time — nothing is hardcoded.

See `docs/CONTENT_GUIDE.md` for the schema and `docs/CONTENT_STATUS.md` for what is
published versus still awaiting syllabus verification.

## Content status — read this before trusting a subject

The distinction matters more than the page count:

- **Published** chapters have full learning content *and* a question bank with model
  answers. Currently: **ICSE Class IX Mathematics**, **ICSE Class IX English** and **ICSE
  Class IX History & Civics**.
- **Planned** chapters have a verified syllabus structure (title, unit, blurb, exam year)
  but no content yet. They are listed so students can see what is coming and are clearly
  marked as not yet available.
- **Registered, unverified** subjects exist in the board/class registry with their paper
  structure, but their official syllabus has not been confirmed yet, so no chapter titles
  are invented for them.

Questions are never fabricated to fill a page, and original practice questions are never
labelled as past-year board questions — `Question.origin` / `Question.year` are validated by
the content validator precisely to make that impossible.

## Key modules

| Path | Responsibility |
|---|---|
| `lib/content/loader.ts` | Validated server-side content access |
| `lib/content/subjects.ts` | Central subject registry (single source of truth) |
| `lib/content/routes.ts` | Board-aware URL builder |
| `lib/content/pyq.ts` | PYQ filtering, year/type/marks filters, repeated-concept detection |
| `lib/tests.ts` | Deterministic, weighted test generator and scorer |
| `lib/analytics.ts` | Subject-agnostic accuracy, weak chapters, revision states, next-best action |
| `lib/progress.ts` | Versioned per-browser student store |
| `scripts/validate-content.mjs` | Content validator |
| `scripts/audit-routes.mjs` | Route inventory + live HTTP audit |

## Legacy notes

`docs/LEGACY_CONTENT_REVIEW.md` records the review of the original starter content.