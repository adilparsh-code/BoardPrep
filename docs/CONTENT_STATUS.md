# Content status

Figures below are measured from the content tree, not estimated. Regenerate with
`npm run validate:content`.

The point of this file is that "a subject page exists" is **not** the same as "a subject is
ready to study". Only Tier 1 has content a student can actually use.

Current totals: **3 boards · 6 classes · 75 registered subjects · 43 published chapters ·
152 planned chapters · 59 subjects awaiting syllabus verification · 713 questions · 0 errors.**
(The 152 planned chapters include 4 syllabus-listed chapters inside the Tier 1 subjects;
the table below covers the 148 that belong to subjects with nothing published yet.)

## Tier 1 — Published (learning content + question bank)

| Board | Class | Subject | Chapters | Questions |
|---|---|---|---|---|
| ICSE | IX | Mathematics | 14 | 372 |
| ICSE | IX | English | 15 | 173 |
| ICSE | IX | History & Civics | 14 | 168 |

All three carry recorded syllabus baselines in their `subject.json`. The History & Civics
baseline is `official-verified` (CISCE ICSE Examination Year 2027, H.C.G. Paper 1). The
Mathematics baseline is `official-verified` for the same year. The English baseline is
`repository-baseline`, taken from the repository's own data file — see
`docs/LEGACY_CONTENT_REVIEW.md`.

**ICSE IX Mathematics questions are original BoardPrep practice, not past-year board
questions.** No verified Mathematics PYQ has been sourced, so the PYQ view is deliberately
empty and says so. The validator enforces this: a question may only carry a year if its
`origin` is `pyq`, and every Mathematics question is `origin: "practice"`.

## Tier 2 — Syllabus structure verified, content not yet written

Chapters here carry real titles, units, blurbs and exam years taken from the official
syllabus, and every one is marked `"status": "planned"`. They are not clickable and the UI
says so rather than showing a broken page.

| Board | Class | Subject | Planned chapters |
|---|---|---|---|
| ICSE | IX | Physics | 9 |
| ICSE | IX | Chemistry | 6 |
| ICSE | IX | Biology | 11 |
| ICSE | IX | Geography | 11 |
| ICSE | X | Mathematics | 18 |
| ICSE | X | Physics | 8 |
| ICSE | X | Chemistry | 12 |
| ICSE | X | Biology | 14 |
| ISC | XI | English | 5 |
| ISC | XI | Mathematics | 15 |
| ISC | XI | Physics | 10 |
| ISC | XI | Chemistry | 15 |
| ISC | XI | Biology | 14 |

## Tier 3 — Registered, syllabus not yet verified (59 subjects)

These subjects exist in the board/class registry with their paper structure, so navigation
and the subject registry are complete and extensible, but their official syllabus has **not**
been confirmed against an authoritative source. They therefore have no sections and no
chapter titles, because inventing chapter titles would be fabricating curriculum.

The content validator enforces this boundary: a subject with no sections is accepted *only*
while every one of its syllabus baselines is `"pending"`. The moment a baseline becomes
`official-verified`, chapters become mandatory and validation fails without them.

## What this means for a student

- Study-ready in full: the two Tier 1 subjects.
- Everything else: a browseable, verified structure, explicitly marked as not yet available —
  no fake questions, no placeholder explanations, no fake past-year questions.