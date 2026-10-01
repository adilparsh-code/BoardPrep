#!/usr/bin/env node
/**
 * BoardPrep content validator.
 *
 * Usage:  node scripts/validate-content.mjs [contentRoot]
 * Exit code 1 if any error is found (warnings do not fail).
 *
 * Checks (see docs/CONTENT_GUIDE.md):
 *  - board/class/subject manifests exist and match their folder names
 *  - ids and slugs are valid and unique
 *  - chapter refs point at real files; no orphan chapter files
 *  - class/subject mappings and section-kind vs chapter-kind consistency
 *  - no missing titles, empty summaries/sections, missing answers
 *  - question types/difficulty/marks valid; MCQ structure valid
 *  - no duplicate questions (per chapter and per subject)
 *  - plain-text only (no HTML tags / javascript: URLs)
 *  - copyright guard: extract questions may quote at most MAX_EXTRACT_WORDS words
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const MAX_EXTRACT_WORDS = 60;
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const FILE_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*\.json$/;
const HTML_RE = /<\/?[a-zA-Z!]|javascript:/i;

const QUESTION_TYPES = ["mcq", "short", "long", "extract", "analytical", "fill-blank", "transformation", "hots"];
const DIFFICULTIES = ["easy", "medium", "hard"];
const CHAPTER_KINDS = ["grammar", "composition", "comprehension", "prose", "poetry", "drama", "civics", "history"];
const KINDS_BY_SECTION = {
  language: ["grammar", "composition", "comprehension"],
  literature: ["prose", "poetry", "drama"],
  civics: ["civics"],
  history: ["history"],
};
const BLOCK_TYPES = ["paragraph", "bullets", "terms", "examples"];
const REVIEW = ["draft", "reviewed"];
const BASELINE_STATUS = ["repository-baseline", "official-verified", "pending"];
const CHAPTER_STATUS = ["published", "planned"];
const SYLLABUS_STATUS = ["listed", "supplementary"];

const isStr = (v) => typeof v === "string" && v.trim().length > 0;
const words = (s) => s.trim().split(/\s+/).filter(Boolean).length;
const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

function readJson(file, ctx) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (e) {
    ctx.error(file, `cannot read/parse JSON: ${e.message}`);
    return null;
  }
}

function makeCtx(root) {
  const errors = [];
  const warnings = [];
  const rel = (f) => path.relative(root, f) || ".";
  return {
    errors,
    warnings,
    error: (file, msg) => errors.push(`${rel(file)}: ${msg}`),
    warn: (file, msg) => warnings.push(`${rel(file)}: ${msg}`),
  };
}

/** Walk every string in a value and flag markup. */
function checkPlainText(value, file, ctx, where = "") {
  if (typeof value === "string") {
    if (HTML_RE.test(value)) ctx.error(file, `markup/HTML not allowed in content text at ${where || "(root)"}: "${value.slice(0, 50)}"`);
  } else if (Array.isArray(value)) {
    value.forEach((v, i) => checkPlainText(v, file, ctx, `${where}[${i}]`));
  } else if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) checkPlainText(v, file, ctx, where ? `${where}.${k}` : k);
  }
}

function checkId(id, file, ctx, label) {
  if (!isStr(id)) return ctx.error(file, `${label}: missing id`), false;
  if (!SLUG_RE.test(id)) return ctx.error(file, `${label}: invalid id "${id}" (lowercase letters, digits, hyphens)`), false;
  return true;
}

function uniq(seen, key, file, ctx, label) {
  if (seen.has(key)) ctx.error(file, `duplicate ${label} "${key}" (also in ${seen.get(key)})`);
  else seen.set(key, file);
}

function validateQuestion(q, chapterFile, ctx, seenIds, seenPrompts, chapterPrompts, where) {
  if (!q || typeof q !== "object") return ctx.error(chapterFile, `${where}: not an object`);
  if (checkId(q.id, chapterFile, ctx, where)) uniq(seenIds, q.id, chapterFile, ctx, "question id");
  if (!QUESTION_TYPES.includes(q.type)) ctx.error(chapterFile, `${where} (${q.id}): invalid question type "${q.type}"`);
  if (!DIFFICULTIES.includes(q.difficulty)) ctx.error(chapterFile, `${where} (${q.id}): invalid difficulty "${q.difficulty}"`);
  if (!Number.isInteger(q.marks) || q.marks < 1 || q.marks > 20) ctx.error(chapterFile, `${where} (${q.id}): marks must be an integer 1-20`);
  if (!isStr(q.prompt)) ctx.error(chapterFile, `${where} (${q.id}): empty prompt`);
  if (!isStr(q.answer)) ctx.error(chapterFile, `${where} (${q.id}): missing answer`);
  else if (q.answer.trim().length < 3) ctx.error(chapterFile, `${where} (${q.id}): answer too short`);

  if (q.type === "mcq") {
    if (!Array.isArray(q.options) || q.options.length < 2) ctx.error(chapterFile, `${where} (${q.id}): mcq needs >= 2 options`);
    else {
      if (q.options.some((o) => !isStr(o))) ctx.error(chapterFile, `${where} (${q.id}): empty mcq option`);
      if (new Set(q.options.map(norm)).size !== q.options.length) ctx.error(chapterFile, `${where} (${q.id}): duplicate mcq options`);
      if (!Number.isInteger(q.correctIndex) || q.correctIndex < 0 || q.correctIndex >= q.options.length)
        ctx.error(chapterFile, `${where} (${q.id}): correctIndex out of range`);
    }
  } else if (q.options !== undefined || q.correctIndex !== undefined) {
    ctx.error(chapterFile, `${where} (${q.id}): options/correctIndex only allowed on mcq`);
  }

  if (q.type === "extract") {
    if (!isStr(q.extract)) ctx.error(chapterFile, `${where} (${q.id}): extract question needs an "extract"`);
  }
  if (q.extract !== undefined && isStr(q.extract) && words(q.extract) > MAX_EXTRACT_WORDS)
    ctx.error(chapterFile, `${where} (${q.id}): extract is ${words(q.extract)} words; limit is ${MAX_EXTRACT_WORDS} (copyright guard)`);

  if (isStr(q.prompt)) {
    const key = norm(`${q.extract ?? ""} ${q.prompt}`);
    if (chapterPrompts.has(key)) ctx.error(chapterFile, `${where} (${q.id}): duplicate question within chapter`);
    chapterPrompts.add(key);
    if (seenPrompts.has(key) && seenPrompts.get(key) !== chapterFile)
      ctx.error(chapterFile, `${where} (${q.id}): duplicate of a question in ${path.basename(seenPrompts.get(key))}`);
    else seenPrompts.set(key, chapterFile);
  }
}

function validateChapterFile(file, ref, section, subjectMeta, ctx, globals) {
  const ch = readJson(file, ctx);
  if (!ch) return;
  checkPlainText(ch, file, ctx);

  if (ch.schemaVersion !== 1) ctx.error(file, "schemaVersion must be 1");
  if (ch.id !== ref.id) ctx.error(file, `chapter id "${ch.id}" does not match manifest id "${ref.id}"`);
  if (!isStr(ch.title)) ctx.error(file, "missing chapter title");
  else if (ch.title !== ref.title) ctx.error(file, `title "${ch.title}" differs from manifest title "${ref.title}"`);
  if (ch.kind !== ref.kind) ctx.error(file, `kind "${ch.kind}" differs from manifest kind "${ref.kind}"`);
  if (!CHAPTER_KINDS.includes(ch.kind)) ctx.error(file, `invalid kind "${ch.kind}"`);
  if (!isStr(ch.tagline)) ctx.error(file, "missing tagline");
  if (!REVIEW.includes(ch.reviewStatus)) ctx.error(file, `invalid reviewStatus "${ch.reviewStatus}"`);

  const isLit = KINDS_BY_SECTION.literature.includes(ch.kind);
  if (isLit && !isStr(ch.author)) ctx.error(file, "literature chapter needs an author");
  if (!ch.sourceNote || !isStr(ch.sourceNote.boardprep)) ctx.error(file, "sourceNote.boardprep is required");
  if (isLit && !isStr(ch.sourceNote?.thirdParty)) ctx.error(file, "literature chapter needs sourceNote.thirdParty attribution");

  if (!ch.overview || !isStr(ch.overview.intro)) ctx.error(file, "empty overview.intro (summary)");
  else if (words(ch.overview.intro) < 15) ctx.warn(file, "overview.intro is very short");
  if (!Array.isArray(ch.overview?.facts) || ch.overview.facts.some((f) => !isStr(f?.label) || !isStr(f?.value)))
    ctx.error(file, "overview.facts must be an array of {label, value} with text");

  if (!Array.isArray(ch.learn) || ch.learn.length === 0) ctx.error(file, "no learn sections");
  else {
    const learnIds = new Set();
    ch.learn.forEach((s, i) => {
      const w = `learn[${i}]`;
      if (checkId(s?.id, file, ctx, w)) {
        if (learnIds.has(s.id)) ctx.error(file, `${w}: duplicate learn section id "${s.id}"`);
        learnIds.add(s.id);
      }
      if (!isStr(s?.title)) ctx.error(file, `${w}: missing title`);
      if (!Array.isArray(s?.blocks) || s.blocks.length === 0) return ctx.error(file, `${w} (${s?.id}): empty section`);
      s.blocks.forEach((b, j) => {
        const bw = `${w}.blocks[${j}]`;
        if (!BLOCK_TYPES.includes(b?.type)) return ctx.error(file, `${bw}: invalid block type "${b?.type}"`);
        if (b.type === "paragraph" && !isStr(b.text)) ctx.error(file, `${bw}: empty paragraph`);
        if (b.type === "bullets" && (!Array.isArray(b.items) || b.items.length === 0 || b.items.some((x) => !isStr(x))))
          ctx.error(file, `${bw}: bullets need non-empty items`);
        if (b.type === "terms" && (!Array.isArray(b.items) || b.items.length === 0 || b.items.some((x) => !isStr(x?.term) || !isStr(x?.meaning))))
          ctx.error(file, `${bw}: terms need {term, meaning}`);
        if (b.type === "examples" && (!Array.isArray(b.items) || b.items.length === 0 || b.items.some((x) => !isStr(x?.text))))
          ctx.error(file, `${bw}: examples need {text}`);
      });
    });
  }

  for (const key of ["keyPoints", "examFocus"]) {
    if (!Array.isArray(ch[key]) || ch[key].length === 0 || ch[key].some((x) => !isStr(x))) ctx.error(file, `${key} must be a non-empty array of text`);
  }

  if (!Array.isArray(ch.vocabulary)) ctx.error(file, "vocabulary must be an array (may be empty for grammar chapters)");
  else {
    const seen = new Set();
    ch.vocabulary.forEach((v, i) => {
      if (!isStr(v?.word) || !isStr(v?.meaning)) return ctx.error(file, `vocabulary[${i}]: needs word and meaning`);
      if (seen.has(norm(v.word))) ctx.error(file, `vocabulary[${i}]: duplicate word "${v.word}"`);
      seen.add(norm(v.word));
    });
    if (isLit && ch.vocabulary.length === 0) ctx.error(file, "literature chapter needs vocabulary");
  }

  if (!Array.isArray(ch.questions) || ch.questions.length === 0) ctx.error(file, "chapter has no questions");
  else {
    const chapterPrompts = new Set();
    ch.questions.forEach((q, i) => validateQuestion(q, file, ctx, globals.questionIds, globals.prompts, chapterPrompts, `questions[${i}]`));
    if (ch.questions.length < 5) ctx.warn(file, `only ${ch.questions.length} questions (aim for a useful practice set)`);
  }
  return ch;
}

export function validateContent(root) {
  const ctx = makeCtx(root);
  const stats = { boards: 0, classes: 0, subjects: 0, chapters: 0, planned: 0, questions: 0 };
  const globals = { questionIds: new Map(), prompts: new Map(), chapterIds: new Map() };

  if (!fs.existsSync(root)) {
    ctx.error(root, "content root does not exist");
    return { ...ctx, stats };
  }

  const boardDirs = fs.readdirSync(root, { withFileTypes: true }).filter((d) => d.isDirectory());
  for (const bd of boardDirs) {
    const boardDir = path.join(root, bd.name);
    const boardFile = path.join(boardDir, "board.json");
    if (!fs.existsSync(boardFile)) { ctx.error(boardDir, "missing board.json"); continue; }
    const board = readJson(boardFile, ctx);
    if (!board) continue;
    stats.boards++;
    checkPlainText(board, boardFile, ctx);
    if (board.slug !== bd.name) ctx.error(boardFile, `slug "${board.slug}" must equal folder name "${bd.name}"`);
    if (!isStr(board.name)) ctx.error(boardFile, "missing board name");
    if (!Array.isArray(board.classes) || board.classes.length === 0) { ctx.error(boardFile, "board has no classes"); continue; }

    const classSlugs = new Set();
    for (const cref of board.classes) {
      if (!SLUG_RE.test(cref?.slug ?? "")) { ctx.error(boardFile, `invalid class slug "${cref?.slug}"`); continue; }
      if (classSlugs.has(cref.slug)) ctx.error(boardFile, `duplicate class slug "${cref.slug}"`);
      classSlugs.add(cref.slug);
      if (!isStr(cref.label)) ctx.error(boardFile, `class ${cref.slug}: missing label`);
      if (!Number.isInteger(cref.numeral)) ctx.error(boardFile, `class ${cref.slug}: numeral must be an integer`);

      const classDir = path.join(boardDir, cref.slug);
      const classFile = path.join(classDir, "class.json");
      if (!fs.existsSync(classFile)) { ctx.error(classFile, "referenced class.json does not exist"); continue; }
      const cls = readJson(classFile, ctx);
      if (!cls) continue;
      stats.classes++;
      checkPlainText(cls, classFile, ctx);
      if (cls.board !== board.slug) ctx.error(classFile, `board "${cls.board}" must equal "${board.slug}"`);
      if (cls.slug !== cref.slug) ctx.error(classFile, `slug "${cls.slug}" must equal "${cref.slug}"`);
      if (!Array.isArray(cls.subjects) || cls.subjects.length === 0) { ctx.error(classFile, "class has no subjects"); continue; }

      const subjectSlugs = new Set();
      for (const sref of cls.subjects) {
        if (!SLUG_RE.test(sref?.slug ?? "")) { ctx.error(classFile, `invalid subject slug "${sref?.slug}"`); continue; }
        if (subjectSlugs.has(sref.slug)) ctx.error(classFile, `duplicate subject slug "${sref.slug}"`);
        subjectSlugs.add(sref.slug);
        if (!isStr(sref.title)) ctx.error(classFile, `subject ${sref.slug}: missing title`);

        const subjectDir = path.join(classDir, sref.slug);
        const subjectFile = path.join(subjectDir, "subject.json");
        if (!fs.existsSync(subjectFile)) { ctx.error(subjectFile, "referenced subject.json does not exist"); continue; }
        const subj = readJson(subjectFile, ctx);
        if (!subj) continue;
        stats.subjects++;
        validateSubject({ subj, subjectFile, subjectDir, board, cls, sref, ctx, globals, stats });
      }
      // subject folders not registered in class.json
      for (const d of fs.readdirSync(classDir, { withFileTypes: true })) {
        if (d.isDirectory() && !subjectSlugs.has(d.name)) ctx.error(path.join(classDir, d.name), "subject folder is not listed in class.json");
      }
    }
    for (const d of fs.readdirSync(boardDir, { withFileTypes: true })) {
      if (d.isDirectory() && !classSlugs.has(d.name)) ctx.error(path.join(boardDir, d.name), "class folder is not listed in board.json");
    }
  }

  stats.questions = globals.questionIds.size;
  return { errors: ctx.errors, warnings: ctx.warnings, stats };
}

function validateSubject({ subj, subjectFile, subjectDir, board, cls, sref, ctx, globals, stats }) {
  checkPlainText(subj, subjectFile, ctx);
  if (subj.schemaVersion !== 1) ctx.error(subjectFile, "schemaVersion must be 1");
  if (subj.board !== board.slug) ctx.error(subjectFile, `board "${subj.board}" must equal "${board.slug}"`);
  if (subj.classSlug !== cls.slug) ctx.error(subjectFile, `classSlug "${subj.classSlug}" must equal "${cls.slug}"`);
  if (subj.subjectSlug !== sref.slug) ctx.error(subjectFile, `subjectSlug "${subj.subjectSlug}" must equal "${sref.slug}"`);
  if (!isStr(subj.title)) ctx.error(subjectFile, "missing subject title");

  const years = new Set();
  if (!Array.isArray(subj.syllabusBaselines) || subj.syllabusBaselines.length === 0) ctx.error(subjectFile, "syllabusBaselines required");
  else
    for (const b of subj.syllabusBaselines) {
      if (!Number.isInteger(b.examYear)) ctx.error(subjectFile, "baseline examYear must be an integer");
      if (years.has(b.examYear)) ctx.error(subjectFile, `duplicate baseline for ${b.examYear}`);
      years.add(b.examYear);
      if (!BASELINE_STATUS.includes(b.status)) ctx.error(subjectFile, `baseline ${b.examYear}: invalid status "${b.status}"`);
      if (!isStr(b.source) || !isStr(b.note)) ctx.error(subjectFile, `baseline ${b.examYear}: source and note required`);
    }

  if (!Array.isArray(subj.sections) || subj.sections.length === 0) return ctx.error(subjectFile, "subject has no sections");

  const referencedFiles = new Set();
  const sectionIds = new Map(), sectionSlugs = new Map(), groupIds = new Map(), chapterSlugs = new Map();
  const subjectPrompts = new Map();

  for (const section of subj.sections) {
    checkId(section.id, subjectFile, ctx, "section");
    checkId(section.slug, subjectFile, ctx, "section slug");
    uniq(sectionIds, section.id, subjectFile, ctx, "section id");
    uniq(sectionSlugs, section.slug, subjectFile, ctx, "section slug");
    if (!isStr(section.title)) ctx.error(subjectFile, `section ${section.id}: missing title`);
    if (!KINDS_BY_SECTION[section.kind]) ctx.error(subjectFile, `section ${section.id}: invalid kind "${section.kind}"`);
    if (!Array.isArray(section.groups) || section.groups.length === 0) { ctx.error(subjectFile, `section ${section.id}: empty section (no groups)`); continue; }
    let published = 0;

    for (const group of section.groups) {
      checkId(group.id, subjectFile, ctx, "group");
      uniq(groupIds, group.id, subjectFile, ctx, "group id");
      if (!isStr(group.title)) ctx.error(subjectFile, `group ${group.id}: missing title`);
      if (!Array.isArray(group.chapters) || group.chapters.length === 0) { ctx.error(subjectFile, `group ${group.id}: empty group (no chapters)`); continue; }

      for (const ref of group.chapters) {
        const label = `chapter ${ref?.id}`;
        if (!isStr(ref?.title)) ctx.error(subjectFile, `${label}: missing chapter name`);
        if (checkId(ref?.id, subjectFile, ctx, "chapter")) uniq(globals.chapterIds, ref.id, subjectFile, ctx, "chapter id");
        if (checkId(ref?.slug, subjectFile, ctx, "chapter slug")) uniq(chapterSlugs, ref.slug, subjectFile, ctx, "chapter slug");
        if (!CHAPTER_KINDS.includes(ref?.kind)) ctx.error(subjectFile, `${label}: invalid kind "${ref?.kind}"`);
        else if (KINDS_BY_SECTION[section.kind] && !KINDS_BY_SECTION[section.kind].includes(ref.kind))
          ctx.error(subjectFile, `${label}: kind "${ref.kind}" does not belong in a "${section.kind}" section`);
        if (!CHAPTER_STATUS.includes(ref?.status)) ctx.error(subjectFile, `${label}: invalid status "${ref?.status}"`);
        if (!SYLLABUS_STATUS.includes(ref?.syllabusStatus)) ctx.error(subjectFile, `${label}: invalid syllabusStatus`);
        if (!isStr(ref?.blurb)) ctx.error(subjectFile, `${label}: missing blurb`);
        if (!Array.isArray(ref?.examYears)) ctx.error(subjectFile, `${label}: examYears must be an array`);
        else {
          for (const y of ref.examYears) if (!years.has(y)) ctx.error(subjectFile, `${label}: examYear ${y} has no syllabusBaselines entry`);
          if (ref.syllabusStatus === "listed" && ref.examYears.length === 0) ctx.error(subjectFile, `${label}: "listed" chapters need at least one examYear`);
        }

        if (ref.status === "planned") {
          stats.planned++;
          if (ref.file) ctx.error(subjectFile, `${label}: planned chapters must not have a file`);
          continue;
        }
        // published
        if (!isStr(ref.file) || !FILE_RE.test(ref.file)) { ctx.error(subjectFile, `${label}: invalid or missing file path`); continue; }
        const abs = path.resolve(subjectDir, ref.file);
        if (!abs.startsWith(subjectDir + path.sep)) { ctx.error(subjectFile, `${label}: file escapes subject folder`); continue; }
        if (referencedFiles.has(abs)) ctx.error(subjectFile, `${label}: file "${ref.file}" referenced twice`);
        referencedFiles.add(abs);
        if (!fs.existsSync(abs)) { ctx.error(subjectFile, `${label}: broken reference, file "${ref.file}" not found`); continue; }
        published++;
        stats.chapters++;
        validateChapterFile(abs, ref, section, subj, ctx, { ...globals, prompts: subjectPrompts });
      }
    }
    if (published === 0) ctx.warn(subjectFile, `section ${section.id} has no published chapters yet`);
  }

  // Orphan chapter files (present on disk but not referenced by the manifest).
  const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const p = path.join(dir, d.name);
    return d.isDirectory() ? walk(p) : [p];
  });
  for (const f of walk(subjectDir)) {
    if (f.endsWith("subject.json")) continue;
    if (f.endsWith(".json") && !referencedFiles.has(f)) ctx.error(f, "orphan chapter file (not referenced in subject.json)");
  }
}

/* ---------- CLI ---------- */
const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const root = path.resolve(process.argv[2] ?? path.join(process.cwd(), "content"));
  const { errors, warnings, stats } = validateContent(root);
  for (const w of warnings) console.warn(`  warn  ${w}`);
  for (const e of errors) console.error(`  ERROR ${e}`);
  console.log(
    `\nContent validation: ${stats.boards} board(s), ${stats.classes} class(es), ${stats.subjects} subject(s), ` +
      `${stats.chapters} published chapter(s), ${stats.planned} planned, ${stats.questions} question(s) - ` +
      `${errors.length} error(s), ${warnings.length} warning(s)`,
  );
  process.exit(errors.length ? 1 : 0);
}
