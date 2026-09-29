// Content audit for ICSE History & Civics (Class 9 & 10).
// Dependency-free: reads the content trees as text and verifies:
//  - duplicate ids (chapters, questions, tests) within and across classes
//  - questions/tests reference existing chapterIds (no orphans)
//  - every chapter module is registered in its section index
//  - class index re-exports all sections
//  - ids do not collide with the existing ICSE English tree
// Usage: node scripts/audit-history-civics.mjs  (run from the repo root)

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const classes = [
  { key: "class-9", prefix: "icse-9-", dir: "icse/class-9/history-civics" },
  { key: "class-10", prefix: "icse-10-", dir: "icse/class-10/history-civics" },
];

const failures = [];
const allIds = new Map();
const note = (msg) => failures.push(msg);
const read = (p) => readFileSync(p, "utf8");
const listFiles = (dir) =>
  readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isFile() && e.name.endsWith(".ts") && e.name !== "index.ts")
    .map((e) => e.name);

// Existing English tree ids (for collision check only).
const englishIds = new Set();
{
  const engDir = join(root, "icse/class-9/english");
  if (existsSync(engDir)) {
    const walk = (d) => {
      for (const e of readdirSync(d, { withFileTypes: true })) {
        const p = join(d, e.name);
        if (e.isDirectory()) walk(p);
        else if (e.name.endsWith(".ts")) {
          const text = read(p);
          const re = /id:\s*"(icse-[^"]+)"/g;
          let m;
          while ((m = re.exec(text))) englishIds.add(m[1]);
        }
      }
    };
    walk(engDir);
  }
}

const register = (id, where) => {
  if (allIds.has(id)) note(`Duplicate id "${id}" in ${where} (also in ${allIds.get(id)})`);
  else allIds.set(id, where);
};

let totals = { chapters: 0, questions: 0, mcqs: 0, tests: 0 };

for (const { key, prefix, dir } of classes) {
  const base = join(root, dir);
  if (!existsSync(base)) {
    note(`Missing tree: ${dir}`);
    continue;
  }

  const chapterIds = new Set();
  for (const section of ["civics", "history"]) {
    const secDir = join(base, section);
    if (!existsSync(secDir)) {
      note(`Missing section dir: ${dir}/${section}`);
      continue;
    }
    const index = read(join(secDir, "index.ts"));
    for (const name of listFiles(secDir)) {
      const full = join(secDir, name);
      const modName = name.replace(/\.ts$/, "");
      if (!index.includes(`./${modName}"`)) note(`Registry missing: ${dir}/${section}/index.ts does not reference ${modName}`);
      const text = read(full);
      const re = /id:\s*"(icse-\d+-hc-(?:civ|his)-\d+)"/g;
      let m;
      let found = false;
      while ((m = re.exec(text))) {
        found = true;
        const id = m[1];
        if (!id.startsWith(prefix)) note(`Class-prefix mismatch: "${id}" found under ${dir}`);
        if (englishIds.has(id)) note(`Collision with English tree id "${id}" in ${full}`);
        register(id, full);
        chapterIds.add(id);
      }
      if (!found) note(`No chapter id found in ${full}`);
    }
  }

  let qCount = 0;
  let mcqCount = 0;
  let testCount = 0;
  for (const qdir of ["questions", "tests"]) {
    const dpath = join(base, qdir);
    if (!existsSync(dpath)) {
      note(`Missing dir: ${dir}/${qdir}`);
      continue;
    }
    for (const name of listFiles(dpath)) {
      const full = join(dpath, name);
      const text = read(full);
      {
        const re = /id:\s*"(icse-[^"]+)"/g;
        let m;
        while ((m = re.exec(text))) {
          if (englishIds.has(m[1])) note(`Collision with English tree id "${m[1]}" in ${full}`);
          if (!m[1].startsWith(prefix)) note(`Class-prefix mismatch: "${m[1]}" found under ${dir}`);
          register(m[1], full);
        }
      }
      {
        const re = /chapterId:\s*"([^"]+)"/g;
        let m;
        while ((m = re.exec(text))) {
          if (!chapterIds.has(m[1])) note(`Orphan chapterId "${m[1]}" referenced in ${full}`);
        }
      }
      const ids = text.match(/id:\s*"icse-[^"]+"/g) || [];
      if (qdir === "questions") {
        qCount += ids.length;
        mcqCount += name.toLowerCase().includes("mcq") ? ids.length : (text.match(/questionType: "mcq"/g) || []).length;
      } else {
        testCount += ids.length;
      }
    }
  }

  const classIndex = read(join(base, "index.ts"));
  for (const sub of ["civics", "history", "questions", "revision", "tests", "types"]) {
    if (!classIndex.includes(`./${sub}"`)) note(`Class index missing export for ./${sub} in ${dir}`);
  }

  totals.chapters += chapterIds.size;
  totals.questions += qCount;
  totals.mcqs += mcqCount;
  totals.tests += testCount;
  console.log(`[${key}] chapters: ${chapterIds.size} | question-bank items: ${qCount} (mcqs: ${mcqCount}) | test items: ${testCount}`);
}

console.log("");
console.log(
  `TOTAL - chapters: ${totals.chapters}, question-bank items: ${totals.questions} (mcqs: ${totals.mcqs}), test items: ${totals.tests}`
);

if (failures.length) {
  console.log("");
  console.log(`FAILURES (${failures.length}):`);
  for (const f of failures) console.log(` - ${f}`);
  process.exit(1);
} else {
  console.log("");
  console.log("All checks passed: no duplicate ids, no orphan chapter references, registries complete, no collisions with the English tree.");
}