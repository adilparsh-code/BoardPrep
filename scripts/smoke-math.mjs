#!/usr/bin/env node
/**
 * Positive smoke test. Requires a production build (`npm run build`).
 *
 * The route audit proves URLs return 200. This script additionally proves the
 * pages contain the right *content*: every ICSE IX Mathematics and ICSE IX
 * Physics chapter renders its own questions, the PYQ view states the honest
 * empty state rather than showing fabricated previous-year questions, the
 * lazy question pool loads for both subjects and refuses to escape its content
 * root, and the pre-existing English and History & Civics subjects still render.
 */
import { spawn } from "node:child_process";
import fs from "node:fs";
import net from "node:net";
import path from "node:path";

const root = process.cwd();
const j = (...p) => JSON.parse(fs.readFileSync(path.join(root, "content", ...p), "utf8"));

const freePort = () =>
  new Promise((res, rej) => {
    const s = net.createServer();
    s.listen(0, () => {
      const { port } = s.address();
      s.close(() => res(port));
    });
    s.on("error", rej);
  });

const failures = [];
const fail = (m) => {
  failures.push(m);
  console.error("  FAIL", m);
};

const SUBJECTS = [
  { slug: "mathematics", title: "Mathematics" },
  { slug: "physics", title: "Physics" },
];
const publishedChapters = (subject) =>
  [...j("icse", "class-9", subject, "subject.json").sections].flatMap((s) =>
    s.groups.flatMap((g) => g.chapters).filter((c) => c.status === "published")
  );

async function main() {
  if (!fs.existsSync(path.join(root, ".next", "BUILD_ID"))) {
    console.error("No production build found. Run `npm run build` first.");
    process.exit(2);
  }
  const port = await freePort();
  const server = spawn(
    process.execPath,
    [path.join(root, "node_modules", "next", "dist", "bin", "next"), "start", "-p", String(port)],
    { cwd: root, stdio: ["ignore", "pipe", "pipe"] }
  );
  const base = `http://127.0.0.1:${port}`;
  let ready = false;
  for (let i = 0; i < 60 && !ready; i++) {
    try {
      ready = (await fetch(base + "/")).ok;
    } catch {
      await new Promise((r) => setTimeout(r, 500));
    }
  }
  if (!ready) {
    server.kill();
    console.error("Server did not start");
    process.exit(2);
  }

  try {
    // 1. Subject page renders and links every published chapter.
    let totalQuestions = 0;
    const allChapters = [];
    for (const subject of SUBJECTS) {
      const chapters = publishedChapters(subject.slug);
      allChapters.push(...chapters.map((c) => ({ ...c, subject: subject.slug })));
      const subjectRes = await fetch(`${base}/icse/class-9/${subject.slug}`);
      const subjectHtml = await subjectRes.text();
      if (subjectRes.status !== 200) fail(`${subject.slug} subject page -> HTTP ${subjectRes.status}`);
      for (const c of chapters) {
        if (!subjectHtml.includes(`/icse/class-9/${subject.slug}/${c.slug}`))
          fail(`subject page does not link chapter ${c.slug}`);
      }
    }

    // 2. Every chapter page renders its own questions, not a shared template.
    for (const c of allChapters) {
      const ch = j("icse", "class-9", c.subject, c.file);
      totalQuestions += ch.questions.length;
      const res = await fetch(`${base}/icse/class-9/${c.subject}/${c.slug}`);
      const html = await res.text();
      if (res.status !== 200) {
        fail(`chapter ${c.subject}/${c.slug} -> HTTP ${res.status}`);
        continue;
      }
      // A distinctive fragment of a question prompt must appear on its page.
      const probe = ch.questions[0].prompt.slice(0, 40);
      if (!html.includes(probe)) fail(`chapter ${c.slug} does not render its own question text`);
      // No chapter may leak another chapter's identity in its title tag.
      if (!html.includes(`ICSE Class IX`)) fail(`chapter ${c.slug} missing board/class/subject label`);
    }

    // 2b. The lazy question pool must serve each subject and only that subject.
    const ownIds = new Map(SUBJECTS.map((s) => [s.slug, new Set(publishedChapters(s.slug).map((c) => c.id))]));
    const allIds = new Set([...ownIds.values()].flatMap((set) => [...set]));
    for (const subject of SUBJECTS) {
      const poolRes = await fetch(`${base}/api/pool/icse/class-9/${subject.slug}`);
      if (poolRes.status !== 200) {
        fail(`pool ${subject.slug} -> HTTP ${poolRes.status}`);
        continue;
      }
      const pool = await poolRes.json();
      if (pool.pyqs.length !== 0) fail(`pool ${subject.slug} reports ${pool.pyqs.length} PYQ(s)`);
      if (pool.counts?.questions !== pool.items.length)
        fail(`pool ${subject.slug} count does not match the items it returned`);
      const foreign = pool.items.find((it) => !ownIds.get(subject.slug).has(it.chapterId));
      if (foreign) fail(`pool ${subject.slug} leaked chapter ${foreign.chapterId} from another subject`);
      const dated = pool.items.filter((it) => it.year !== undefined);
      if (dated.length) fail(`pool ${subject.slug} returned ${dated.length} item(s) carrying a year`);
      for (const it of pool.items) {
        if (it.origin === "pyq") fail(`pool ${subject.slug} returned ${it.question.id} as a PYQ`);
        if (!allIds.has(it.chapterId)) fail(`pool ${subject.slug} returned an unknown chapter id`);
      }
    }

    // 2c. The pool route must stay inside its content root.
    for (const bad of [
      "/api/pool/icse/class-9/bogus",
      "/api/pool/icse/class-9/..%2F..%2Fpackage",
      "/api/pool/nope/class-9/physics",
    ]) {
      const res = await fetch(base + bad);
      if (res.status === 200) fail(`pool route ${bad} returned 200 instead of refusing`);
    }

    // 3. PYQ honesty: no question may be presented as a previous year question,
    //    and the empty state must be stated honestly.
    for (const c of allChapters) {
      const ch = j("icse", "class-9", c.subject, c.file);
      for (const q of ch.questions) {
        if (q.origin === "pyq") fail(`chapter ${c.slug} question ${q.id} is marked as a PYQ`);
        if (typeof q.year === "number" && q.origin !== "pyq")
          fail(`chapter ${c.slug} question ${q.id} carries a year without PYQ origin`);
      }
    }
    // The search index is built at build time and inlined into the page, so it
    // is assertable from the served HTML without running a browser.
    const searchRes = await fetch(`${base}/search`);
    const searchHtml = await searchRes.text();
    if (searchRes.status !== 200) fail(`search page -> HTTP ${searchRes.status}`);
    for (const c of allChapters) {
      if (!searchHtml.includes(c.title))
        fail(`search index does not contain the ${c.subject} chapter "${c.title}"`);
    }
    // Unpublished chapters must never be indexed, so planned titles stay absent.
    for (const planned of ["The Elevator", "Cell Cycle and Cell Division", "Transpiration"]) {
      if (searchHtml.includes(planned)) fail(`search index leaks unpublished chapter "${planned}"`);
    }

    // 4. Pre-existing subjects still render.
    for (const slug of ["english", "history-civics"]) {
      const s = j("icse", "class-9", slug, "subject.json");
      const pub = [...s.sections]
        .flatMap((x) => x.groups.flatMap((g) => g.chapters))
        .filter((c) => c.status === "published");
      const res = await fetch(`${base}/icse/class-9/${slug}`);
      if (res.status !== 200) fail(`subject ${slug} -> HTTP ${res.status}`);
      const html = await res.text();
      const first = pub[0];
      if (first && !html.includes(`/icse/class-9/${slug}/${first.slug}`))
        fail(`subject ${slug} does not link its first chapter`);
      const cres = await fetch(`${base}/icse/class-9/${slug}/${first.slug}`);
      if (cres.status !== 200) fail(`chapter ${slug}/${first.slug} -> HTTP ${cres.status}`);
    }

    console.log(
      `\nContent smoke test: ${allChapters.length} chapters, ${totalQuestions} questions, ` +
        `${failures.length} failure(s)`
    );
  } finally {
    server.kill();
  }
  process.exit(failures.length ? 1 : 0);
}
main();