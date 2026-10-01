import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { validateContent, MAX_EXTRACT_WORDS } from "./validate-content.mjs";

const realRoot = path.join(process.cwd(), "content");

function cloneContent() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "bp-content-"));
  fs.cpSync(realRoot, dir, { recursive: true });
  return dir;
}
const subjDir = (d) => path.join(d, "icse", "class-9", "english");
const readJ = (f) => JSON.parse(fs.readFileSync(f, "utf8"));
const writeJ = (f, v) => fs.writeFileSync(f, JSON.stringify(v, null, 2));
const has = (r, re) => r.errors.some((e) => re.test(e));

test("real content passes with no errors", () => {
  const r = validateContent(realRoot);
  assert.deepEqual(r.errors, []);
  assert.ok(r.stats.chapters >= 15);
});

function mutateChapter(fn) {
  const d = cloneContent();
  const f = path.join(subjDir(d), "literature/prose/the-pedestrian.json");
  const ch = readJ(f);
  fn(ch);
  writeJ(f, ch);
  return validateContent(d);
}

test("empty summary is rejected", () => assert.ok(has(mutateChapter((c) => { c.overview.intro = " "; }), /empty overview/)));
test("missing answer is rejected", () => assert.ok(has(mutateChapter((c) => { c.questions[0].answer = ""; }), /missing answer/)));
test("invalid question type is rejected", () => assert.ok(has(mutateChapter((c) => { c.questions[0].type = "essay"; }), /invalid question type/)));
test("duplicate question ids are rejected", () => assert.ok(has(mutateChapter((c) => { c.questions[1].id = c.questions[0].id; }), /duplicate question id/)));
test("duplicate question text is rejected", () => assert.ok(has(mutateChapter((c) => { c.questions[1].prompt = c.questions[0].prompt; c.questions[1].type = "short"; delete c.questions[1].options; delete c.questions[1].correctIndex; }), /duplicate question/)));
test("invalid id is rejected", () => assert.ok(has(mutateChapter((c) => { c.questions[0].id = "Bad ID"; }), /invalid id/)));
test("mcq correctIndex out of range is rejected", () => assert.ok(has(mutateChapter((c) => { c.questions[0].correctIndex = 9; }), /correctIndex/)));
test("empty learn section is rejected", () => assert.ok(has(mutateChapter((c) => { c.learn[0].blocks = []; }), /empty section/)));
test("HTML in content is rejected", () => assert.ok(has(mutateChapter((c) => { c.keyPoints[0] = "Use <script>alert(1)</script>"; }), /markup/)));
test("math-style less-than is allowed", () => assert.ok(!has(mutateChapter((c) => { c.keyPoints[0] = "If x < y then y is larger."; }), /markup/)));
test("over-long extract is rejected (copyright guard)", () =>
  assert.ok(has(mutateChapter((c) => { c.questions[0].extract = Array(MAX_EXTRACT_WORDS + 5).fill("word").join(" "); }), /copyright guard/)));
test("literature without third-party attribution is rejected", () => assert.ok(has(mutateChapter((c) => { c.sourceNote.thirdParty = ""; }), /thirdParty/)));
test("chapter id must match manifest", () => assert.ok(has(mutateChapter((c) => { c.id = "icse-9-eng-lit-other"; }), /does not match manifest/)));

test("broken reference and orphan file are rejected", () => {
  const d = cloneContent();
  const sf = path.join(subjDir(d), "subject.json");
  const s = readJ(sf);
  s.sections[0].groups[0].chapters[0].file = "language/grammar/missing.json";
  writeJ(sf, s);
  fs.writeFileSync(path.join(subjDir(d), "language/grammar/stray.json"), "{}");
  const r = validateContent(d);
  assert.ok(has(r, /broken reference/));
  assert.ok(has(r, /orphan chapter file/));
});

test("duplicate chapter id and wrong section kind are rejected", () => {
  const d = cloneContent();
  const sf = path.join(subjDir(d), "subject.json");
  const s = readJ(sf);
  s.sections[0].groups[0].chapters[1].id = s.sections[0].groups[0].chapters[0].id;
  s.sections[0].groups[0].chapters[2].kind = "poetry";
  writeJ(sf, s);
  const r = validateContent(d);
  assert.ok(has(r, /duplicate chapter id/));
  assert.ok(has(r, /does not belong in a "language" section/));
});

test("class/subject mapping mismatch and missing chapter name are rejected", () => {
  const d = cloneContent();
  const sf = path.join(subjDir(d), "subject.json");
  const s = readJ(sf);
  s.classSlug = "class-10";
  s.sections[0].groups[0].chapters[0].title = "";
  writeJ(sf, s);
  const r = validateContent(d);
  assert.ok(has(r, /classSlug/));
  assert.ok(has(r, /missing chapter name/));
});

test("planned chapter must not carry a file; unknown examYear rejected", () => {
  const d = cloneContent();
  const sf = path.join(subjDir(d), "subject.json");
  const s = readJ(sf);
  const planned = s.sections[1].groups[1].chapters.find((c) => c.status === "planned");
  planned.file = "literature/prose/x.json";
  planned.examYears = [1999];
  writeJ(sf, s);
  const r = validateContent(d);
  assert.ok(has(r, /planned chapters must not have a file/));
  assert.ok(has(r, /examYear 1999/));
});

test("empty section is rejected", () => {
  const d = cloneContent();
  const sf = path.join(subjDir(d), "subject.json");
  const s = readJ(sf);
  s.sections[0].groups = [];
  writeJ(sf, s);
  assert.ok(has(validateContent(d), /empty section/));
});

/* ---------- multi-board / scaffolded subjects ---------- */

const boardFile = (d, b) => path.join(d, b, "board.json");

test("every registered board, class and subject resolves to a manifest", () => {
  for (const b of fs.readdirSync(realRoot, { withFileTypes: true }).filter((d) => d.isDirectory())) {
    const bf = boardFile(realRoot, b.name);
    assert.ok(fs.existsSync(bf), `${b.name}: missing board.json`);
    const board = readJ(bf);
    for (const c of board.classes) {
      const cf = path.join(realRoot, b.name, c.slug, "class.json");
      assert.ok(fs.existsSync(cf), `${b.name}/${c.slug}: missing class.json`);
      for (const s of readJ(cf).subjects) {
        const sf = path.join(realRoot, b.name, c.slug, s.slug, "subject.json");
        assert.ok(fs.existsSync(sf), `${b.name}/${c.slug}/${s.slug}: missing subject.json (run scripts/scaffold-subjects.mjs)`);
      }
    }
  }
});

test("all three boards are registered with the expected classes", () => {
  const r = validateContent(realRoot);
  assert.equal(r.errors.length, 0);
  for (const b of ["icse", "isc", "cbse"]) {
    const board = readJ(boardFile(realRoot, b));
    assert.equal(board.slug, b);
    assert.ok(board.classes.length > 0, `${b}: no classes`);
  }
});

test("a subject may have no sections only while its baseline is pending", () => {
  const d = cloneContent();
  const sf = path.join(d, "isc", "class-12", "economics", "subject.json");
  assert.ok(fs.existsSync(sf), "expected a scaffolded subject to exist");
  const s = readJ(sf);
  assert.deepEqual(s.sections, [], "scaffolded subject should start with no sections");

  // Pending + no sections: accepted.
  const ok = validateContent(d);
  assert.equal(ok.errors.length, 0);

  // Verified baseline + no sections: rejected, so chapters cannot be skipped
  // once a syllabus has been verified.
  s.syllabusBaselines[0].status = "official-verified";
  writeJ(sf, s);
  assert.ok(has(validateContent(d), /subject has no sections/));
});

test("chapter ids are unique across every board", () => {
  const ids = new Map();
  const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const p = path.join(dir, d.name);
    return d.isDirectory() ? walk(p) : [p];
  });
  for (const f of walk(realRoot)) {
    if (!f.endsWith(".json") || f.endsWith("board.json") || f.endsWith("class.json") || f.endsWith("subject.json")) continue;
    const ch = readJ(f);
    assert.ok(!ids.has(ch.id), `duplicate chapter id "${ch.id}" in ${f} and ${ids.get(ch.id)}`);
    ids.set(ch.id, f);
  }
});

test("question ids are unique across every board", () => {
  const ids = new Set();
  const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const p = path.join(dir, d.name);
    return d.isDirectory() ? walk(p) : [p];
  });
  for (const f of walk(realRoot)) {
    if (!f.endsWith(".json") || f.endsWith("board.json") || f.endsWith("class.json") || f.endsWith("subject.json")) continue;
    for (const q of readJ(f).questions ?? []) {
      assert.ok(!ids.has(q.id), `duplicate question id "${q.id}" in ${f}`);
      ids.add(q.id);
    }
  }
});
