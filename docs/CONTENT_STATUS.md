# Content status

Figures below are measured from the content tree, not estimated. Regenerate with
`npm run validate:content`.

The point of this file is that "a subject page exists" is **not** the same as "a subject is
ready to study". Only Tier 1 has content a student can actually use.

Current totals: **3 boards · 6 classes · 75 registered subjects · 52 published chapters ·
143 planned chapters · 59 subjects awaiting syllabus verification · 947 questions · 0 errors.**
(Every Tier 1 chapter is published, so no Tier 1 subject has a planned chapter left; the table
below covers all 143 remaining planned chapters.)

## Tier 1 — Published (learning content + question bank)

| Board | Class | Subject | Chapters | Questions |
|---|---|---|---|---|
| ICSE | IX | Mathematics | 14 | 372 |
| ICSE | IX | English | 15 | 173 |
| ICSE | IX | History & Civics | 14 | 168 |
| ICSE | IX | Physics | 9 | 234 |

All four carry recorded syllabus baselines in their `subject.json`. The History & Civics,
Mathematics and Physics baselines are `official-verified` (CISCE ICSE Examination Year 2027).
The English baseline is `repository-baseline`, taken from the repository's own data file — see
`docs/LEGACY_CONTENT_REVIEW.md`.

**ICSE IX Mathematics and ICSE IX Physics questions are original BoardPrep practice, not
past-year board questions.** No verified PYQ has been sourced for either, so the PYQ view is
deliberately empty and says so. The validator enforces this: a question may only carry a
year if its `origin` is `pyq`, and every Mathematics and Physics question is
`origin: "practice"`.

### ICSE IX Physics in detail

| Group | Chapters | Questions |
|---|---|---|
| Measurement & Mechanics | 3 | 78 |
| Fluids, Heat & Energy | 2 | 52 |
| Light & Sound | 2 | 52 |
| Electricity & Magnetism | 2 | 52 |

Every chapter carries a full learn track (paragraphs, defined terms, bullet rules, worked
numericals with the substitution shown), a key-points revision list, exam-focus notes and a
glossary. Questions mix MCQ, short, long, analytical, extract, fill-blank, transformation and
higher-order-thinking items, weighted 33% easy / 51% medium / 16% hard. Ray diagrams and
field-line patterns are given as labelled textual descriptions, because the content schema is
plain text by design and no image infrastructure exists to abuse.

The numeric claims in all nine chapters are recomputed exactly by
`npm run verify:math` (115 Physics claims alongside 196 Mathematics claims).

## Tier 2 — Syllabus structure verified, content not yet written

Chapters here carry real titles, units, blurbs and exam years taken from the official
syllabus, and every one is marked `"status": "planned"`. They are not clickable and the UI
says so rather than showing a broken page.

| Board | Class | Subject | Planned chapters |
|---|---|---|---|
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

- Study-ready in full: all four Tier 1 subjects.
- Everything else: a browseable, verified structure, explicitly marked as not yet available —
  no fake questions, no placeholder explanations, no fake past-year questions.
