#!/usr/bin/env node
/**
 * Scaffold subject manifests for subjects that are registered in a class
 * manifest but have no subject.json yet.
 *
 * Why this exists: BoardPrep's subject registry is board -> class -> subject,
 * and a class may legitimately list a subject whose official syllabus has not
 * been verified yet. Rather than inventing chapter titles (which would be fake
 * content), those subjects get a manifest with:
 *
 *   - a "pending" syllabus baseline, and
 *   - zero sections,
 *
 * which the validator accepts only while every baseline is pending, and which
 * the subject page renders as a deliberate empty state. Content authors then
 * replace the baseline with a verified one and fill in sections.
 *
 * Existing manifests are never modified. Safe to re-run.
 *
 * Usage: node scripts/scaffold-subjects.mjs [--dry-run]
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(process.cwd(), "content");
const DRY = process.argv.includes("--dry-run");

const readJson = (file) => JSON.parse(fs.readFileSync(file, "utf8"));
const writeJson = (file, data) =>
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, "utf8");

function listDirs(dir) {
  try {
    return fs.readdirSync(dir, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);
  } catch {
    return [];
  }
}

let created = 0;
let skipped = 0;

for (const boardSlug of listDirs(ROOT)) {
  const boardFile = path.join(ROOT, boardSlug, "board.json");
  if (!fs.existsSync(boardFile)) continue;
  const board = readJson(boardFile);

  for (const classRef of board.classes ?? []) {
    const classFile = path.join(ROOT, boardSlug, classRef.slug, "class.json");
    if (!fs.existsSync(classFile)) continue;
    const cls = readJson(classFile);

    for (const subjectRef of cls.subjects ?? []) {
      const subjectDir = path.join(ROOT, boardSlug, classRef.slug, subjectRef.slug);
      const subjectFile = path.join(subjectDir, "subject.json");
      if (fs.existsSync(subjectFile)) {
        skipped++;
        continue;
      }
      fs.mkdirSync(subjectDir, { recursive: true });
      const manifest = {
        schemaVersion: 1,
        id: `${boardSlug}-${classRef.slug}-${subjectRef.slug}`,
        board: boardSlug,
        classSlug: classRef.slug,
        subjectSlug: subjectRef.slug,
        title: subjectRef.title,
        description: subjectRef.description,
        syllabusBaselines: [
          {
            examYear: 2027,
            status: "pending",
            source: "To be verified against the official board syllabus document.",
            note:
              "Syllabus structure not yet verified against an official source. No chapter titles are listed, so no unverified content is presented to students.",
          },
        ],
        sections: [],
      };
      if (!DRY) writeJson(subjectFile, manifest);
      console.log(`${DRY ? "would create" : "created"} ${path.relative(process.cwd(), subjectFile)}`);
      created++;
    }
  }
}

console.log(`\n${created} manifest(s) ${DRY ? "would be " : ""}created, ${skipped} already present.`);
