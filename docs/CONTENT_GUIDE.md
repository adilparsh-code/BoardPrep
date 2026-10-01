# BoardPrep content guide

## Layout
```
content/<board>/board.json                      classes offered by the board
content/<board>/<class>/class.json              subjects offered in the class
content/<board>/<class>/<subject>/subject.json  manifest: syllabus baselines, sections, groups, chapter refs
content/<board>/<class>/<subject>/<path>.json   one chapter body per file (loaded one at a time)
```
Routes mirror this: `/cisce/class-9/english/<chapter-slug>`. To add a subject, add a folder, register it in
`class.json`, write `subject.json` and chapter files, then run `npm run check`. No code changes are needed for a
new subject or class under an existing board.

## Schema
See `lib/content/types.ts`. All text is plain text, rendered through React (escaped). No HTML or markdown.

## Rules enforced by `npm run validate:content`
Valid, unique ids and slugs; manifests match folder names (class/subject mapping); chapter files exist and there
are no orphans; chapter kind matches its section; titles, summaries and answers non-empty; question type,
difficulty and marks valid; MCQ structure valid; no duplicate questions (per chapter and per subject); no markup;
extract questions quote at most 60 words (copyright guard); literature chapters need attribution and vocabulary.

## Content policy
- Original summaries, analysis, vocabulary and questions only. Never paste textbook or guide text.
- Quote only short public-domain passages you can verify word for word. Never invent a quotation.
- Do not state mark allocations, word limits or paper structure unless verified against an official CISCE document.
- New chapters start as `reviewStatus: "draft"`; set `"reviewed"` only after a subject teacher signs off.
- Label unverified syllabus claims via `syllabusBaselines[].status` (`repository-baseline`, `official-verified`, `pending`).
