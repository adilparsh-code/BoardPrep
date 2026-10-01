#!/usr/bin/env node
/**
 * Content language QA.
 *
 * The content validator checks structure and provenance. This checks the
 * things that make a chapter unusable to read: placeholder text left behind
 * from authoring, generation artefacts that leak non-English syntax into a
 * JSON string, and malformed or truncated prose.
 *
 * Usage: node scripts/qa-content-language.mjs [contentRoot]
 * Exit code 1 on any error.
 */
import fs from "node:fs";
import path from "node:path";

const root = process.argv[2] ?? path.join(process.cwd(), "content");

/** Words that must never appear in published learning content. */
const PLACEHOLDERS = [
  "TODO",
  "TBD",
  "PLACEHOLDER",
  "Lorem",
  "lorem",
  "FIXME",
  "XXX",
  "coming soon",
  "dummy",
  "sample question",
  "example question",
  "insert here",
  "to be added",
  "to be confirmed",
];

/**
 * Artefacts of writing code inside a JSON string literal. None of these can
 * occur in legitimate prose, so any hit is a bug in the authoring process
 * rather than a content decision.
 *
 * Note what is deliberately NOT here: words such as "undefined", "false",
 * "true" and "none" are ordinary English in a maths or physics chapter
 * ("tan 90 is undefined"), as are "..." and run-together underscores used as
 * fill-in-the-blank markers. Flagging those produced false positives on
 * correct content, so only unambiguous code syntax is checked here.
 */
const GENERATION_ARTEFACTS = [
  { re: /\bif False\b/, label: "python conditional leaked into prose" },
  { re: /\bif True\b/, label: "python conditional leaked into prose" },
  { re: /"\s*:\s*"\s*if\b/, label: "python conditional leaked into prose" },
  { re: /\belse\s*"/, label: "python conditional leaked into prose" },
  { re: /"\s*:\s*=\s*/, label: "stray assignment operator before a string" },
  { re: /\bconsole\.log\b/, label: "debug statement in content" },
  { re: /\[object Object\]/, label: "stringified object in prose" },
  { re: /`/, label: "backtick / template residue" },
  { re: /\$\{/, label: "template interpolation residue" },
  { re: /<\/?[a-z]+>/i, label: "markup tag in prose" },
];

/**
 * Prose-quality checks that indicate a truncated or unfinished string.
 *
 * Only unambiguous defects belong here. Checks that would fire on legitimate
 * notation were removed: "..." is standard in sequence notation such as
 * a1, a2, ..., an, and Title Case chapter titles are not missing sentence
 * boundaries.
 */
const MALFORMED = [
  { re: /\(\s*\)/, label: "empty parentheses" },
  { re: /\s,/, label: "space before comma" },
  { re: /\broot\s*$/, label: "expression truncated after root" },
  { re: /\bthe the\b|\ba a\b|\bof of\b|\bis is\b/, label: "duplicated word" },
  { re: /\b(?:0x[0-9a-fA-F]{2,})/, label: "hex escape residue" },
  { re: /\\n|\\t|\\"/, label: "escaped control character in prose" },
];

const errors = [];
const files = [];
const manifests = [];

(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith(".json")) files.push(p);
  }
})(root);

/**
 * Chapter bodies that are actually published.
 *
 * Placeholder text is only a defect inside published learning content. A
 * *planned* chapter whose blurb honestly says its notes are still to be added
 * is correctly describing its own unfinished state, and "fixing" that text
 * would mean inventing content that does not exist. So placeholder checks run
 * against published chapter bodies only; generation-artefact checks run
 * everywhere, because leaked code is never legitimate.
 */
const publishedChapterFiles = new Set();
for (const file of files) {
  if (path.basename(file) !== "subject.json") continue;
  manifests.push(file);
  let m;
  try {
    m = JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    continue; // reported below by the JSON check
  }
  const dir = path.dirname(file);
  for (const sec of m.sections ?? [])
    for (const g of sec.groups ?? [])
      for (const c of g.chapters ?? [])
        if (c.status === "published" && c.file) publishedChapterFiles.add(path.resolve(dir, c.file));
}

let checkedStrings = 0;
let placeholderChecked = 0;

function inspectString(value, file, trail, isPublishedContent) {
  checkedStrings++;
  for (const { re, label } of GENERATION_ARTEFACTS) {
    if (re.test(value)) errors.push(`${path.relative(root, file)}: ${trail}: ${label}`);
  }
  if (isPublishedContent) {
    placeholderChecked++;
    for (const w of PLACEHOLDERS) {
      // "sample" alone is legitimate prose ("a sample of readings"); only the
      // phrase forms that signal an unfinished question are treated as defects.
      if (value.toLowerCase().includes(w.toLowerCase()))
        errors.push(`${path.relative(root, file)}: ${trail}: placeholder text "${w}"`);
    }
  }
  for (const { re, label } of MALFORMED) {
    if (re.test(value.trim()))
      errors.push(`${path.relative(root, file)}: ${trail}: ${label} — "${value.trim().slice(-45)}"`);
  }
}

for (const file of files) {
  let data;
  try {
    data = JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (e) {
    errors.push(`${path.relative(root, file)}: invalid JSON — ${e.message}`);
    continue;
  }
  const isPublishedContent = publishedChapterFiles.has(path.resolve(file));
  (function visit(v, trail) {
    if (typeof v === "string") inspectString(v, file, trail, isPublishedContent);
    else if (Array.isArray(v)) v.forEach((x, i) => visit(x, `${trail}[${i}]`));
    else if (v && typeof v === "object")
      for (const [k, x] of Object.entries(v)) visit(x, trail ? `${trail}.${k}` : k);
  })(data, "");
}

if (errors.length) {
  for (const e of errors) console.error(`  ERROR ${e}`);
  console.error(`\nContent language QA: ${errors.length} issue(s) in ${files.length} file(s)`);
  process.exit(1);
}
console.log(
  `Content language QA: ${checkedStrings} string(s) in ${files.length} file(s) ` +
    `(${placeholderChecked} in ${publishedChapterFiles.size} published chapter(s)), ` +
    `${PLACEHOLDERS.length} placeholder pattern(s) and ${GENERATION_ARTEFACTS.length + MALFORMED.length} artefact checks, 0 issues.`
);