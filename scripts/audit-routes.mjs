#!/usr/bin/env node
/**
 * Route audit. Requires a production build (`npm run build`).
 *
 * Starts `next start` on a free port, then:
 *  1. computes every route the content implies (board, class, subject, each
 *     published chapter) and checks each returns 200;
 *  2. crawls every internal <a href> found on those pages (and the legacy
 *     pages) and checks each returns 200 or a redirect that ends in 200;
 *  3. checks that in-page #anchors used in jump links exist;
 *  4. checks unknown content URLs return 404.
 * Exit code 1 on any failure.
 */
import { spawn } from "node:child_process";
import fs from "node:fs";
import net from "node:net";
import path from "node:path";

const root = process.cwd();
const j = (...p) => JSON.parse(fs.readFileSync(path.join(root, "content", ...p), "utf8"));

function freePort() {
  return new Promise((res, rej) => {
    const s = net.createServer();
    s.listen(0, () => { const { port } = s.address(); s.close(() => res(port)); });
    s.on("error", rej);
  });
}

function expectedRoutes() {
  const routes = new Set(["/", "/about", "/cisce"]);
  const board = j("cisce", "board.json");
  for (const c of board.classes) {
    routes.add(`/cisce/${c.slug}`);
    const cls = j("cisce", c.slug, "class.json");
    for (const s of cls.subjects) {
      routes.add(`/cisce/${c.slug}/${s.slug}`);
      const subj = j("cisce", c.slug, s.slug, "subject.json");
      for (const sec of subj.sections) for (const g of sec.groups) for (const ch of g.chapters)
        if (ch.status === "published") routes.add(`/cisce/${c.slug}/${s.slug}/${ch.slug}`);
    }
  }
  return routes;
}

const failures = [];
const fail = (m) => { failures.push(m); console.error("  FAIL", m); };

async function get(base, p) {
  return fetch(base + p, { redirect: "follow" });
}

async function main() {
  if (!fs.existsSync(path.join(root, ".next", "BUILD_ID"))) {
    console.error("No production build found. Run `npm run build` first.");
    process.exit(2);
  }
  const port = await freePort();
  const server = spawn(process.execPath, [path.join(root, "node_modules", "next", "dist", "bin", "next"), "start", "-p", String(port)], {
    cwd: root, stdio: ["ignore", "pipe", "pipe"],
  });
  const base = `http://127.0.0.1:${port}`;
  let ready = false;
  for (let i = 0; i < 60 && !ready; i++) {
    try { ready = (await fetch(base + "/")).ok; } catch { await new Promise((r) => setTimeout(r, 500)); }
  }
  if (!ready) { server.kill(); console.error("Server did not start"); process.exit(2); }

  try {
    const queue = [...expectedRoutes(), "/icse/english", "/icse/english/class-10", "/icse/english/class-9"];
    const seen = new Set();
    const linkSources = new Map();
    while (queue.length) {
      const p = queue.shift();
      if (seen.has(p)) continue;
      seen.add(p);
      const res = await get(base, p);
      if (res.status !== 200) { fail(`${p} -> HTTP ${res.status}${linkSources.has(p) ? ` (linked from ${linkSources.get(p)})` : ""}`); continue; }
      const html = await res.text();
      const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
      for (const m of html.matchAll(/<a\s[^>]*href="([^"]+)"/g)) {
        let href = m[1].replace(/&amp;/g, "&");
        if (/^(https?:|mailto:|tel:)/.test(href)) continue;
        const [pathPart, hash] = href.split("#");
        if (hash && !pathPart && !ids.has(hash)) fail(`${p}: anchor #${hash} has no matching id`);
        if (pathPart) {
          const target = pathPart.replace(/\/$/, "") || "/";
          if (!linkSources.has(target)) linkSources.set(target, p);
          if (!seen.has(target)) queue.push(target);
          if (hash) {
            // cross-page anchor (e.g. /about#disclaimer): verify after fetch
            const r = await get(base, target);
            const h = await r.text();
            if (!new RegExp(`\\sid="${hash}"`).test(h)) fail(`${p}: ${target}#${hash} anchor missing on target page`);
          }
        }
      }
    }
    for (const bad of ["/cisce/class-9/english/does-not-exist", "/cisce/class-9/nope", "/cisce/class-99", "/cisce/class-9/english/with-the-photographer"]) {
      const r = await get(base, bad);
      if (r.status !== 404) fail(`${bad} should be 404, got ${r.status}`);
    }
    console.log(`\nRoute audit: ${seen.size} route(s) checked, ${failures.length} failure(s)`);
  } finally {
    server.kill();
  }
  process.exit(failures.length ? 1 : 0);
}
main();
