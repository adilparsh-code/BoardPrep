# BoardPrep

BoardPrep is a separate multi-board academic platform intended for:

- ICSE
- ISC
- CBSE
- Classes 9–12 initially
- Multiple subjects

## Current starter milestone

**ICSE → English → Classes 9–10**

The project is intentionally structured so board, class, subject and content types can expand without rewriting the application.

## Stack

- Next.js
- React
- TypeScript
- Plain CSS (no UI framework dependency)

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Content architecture

The first content data file is `data/icseEnglish.ts`. It should eventually be split into reusable board/class/subject/content modules as the content library grows.

## Important content rule

CISCE syllabus information must be verified against the current official CISCE documents before publishing or updating curriculum claims. The starter uses the ICSE Examination Year 2027 English literature baseline.

BoardPrep is an independent educational platform and is not affiliated with CISCE or CBSE.
