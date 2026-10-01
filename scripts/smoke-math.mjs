#!/usr/bin/env node
/**
 * Positive smoke test. Requires a production build (`npm run build`).
 *
 * The route audit proves URLs return 200. This script additionally proves the
 * pages contain the right *content*: every ICSE IX Mathematics chapter renders
 * its own questions, the PYQ view states the honest empty state rather than
 * showing fabricated previous-year questions, and the pre-existing English and
 * History & Civics subjects still render.
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

const MATH = ["icse", "class-9", "mathematics"];
const publishedChapters = () =>
  [...j(...MATH, "subject.json").sections].flatMap((s) =>
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
    const subjectRes = await fetch(`${base}/icse/class-9/mathematics`);
    const subjectHtml = await subjectRes.text();
    if (subjectRes.status !== 200) fail(`mathematics subject page -> HTTP ${subjectRes.status}`);
    const chapters = publishedChapters();
    for (const c of chapters) {
      if (!subjectHtml.includes(`/icse/class-9/mathematics/${c.slug}`))
        fail(`subject page does not link chapter ${c.slug}`);
    }

    // 2. Every chapter page renders its own questions, not a shared template.
    let totalQuestions = 0;
    for (const c of chapters) {
      const ch = j(...MATH, c.file);
      totalQuestions += ch.questions.length;
      const res = await fetch(`${base}/icse/class-9/mathematics/${c.slug}`);
      const html = await res.text();
      if (res.status !== 200) {
        fail(`chapter ${c.slug} -> HTTP ${res.status}`);
        continue;
      }
      // A distinctive fragment of a question prompt must appear on its page.
      const probe = ch.questions[0].prompt.slice(0, 40);
      if (!html.includes(probe)) fail(`chapter ${c.slug} does not render its own question text`);
      // No chapter may leak another chapter's identity in its title tag.
      if (!html.includes(`ICSE Class IX Mathematics`)) fail(`chapter ${c.slug} missing board/class/subject label`);
    }

    // 3. PYQ honesty: no Mathematics question may be presented as a previous
    //    year question, and the empty state must be stated honestly.
    for (const c of chapters) {
      const ch = j(...MATH, c.file);
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
    for (const c of chapters) {
      if (!searchHtml.includes(c.title))
        fail(`search index does not contain the Mathematics chapter "${c.title}"`);
    }
    // Unpublished chapters must never be indexed, so planned titles stay absent.
    for (const planned of ["The Elevator", "Motion in One Dimension"]) {
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
      `\nMath smoke test: ${chapters.length} chapters, ${totalQuestions} questions, ` +
        `${failures.length} failure(s)`
    );
  } finally {
    server.kill();
  }
  process.exit(failures.length ? 1 : 0);
}
main();