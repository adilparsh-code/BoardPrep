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

/**
 * Every route the content implies, across ALL boards. Boards are discovered
 * from the content tree, so adding a board needs no change here.
 */
function expectedRoutes() {
  const routes = new Set(["/", "/about", "/boards"]);
  const contentRoot = path.join(root, "content");
  const boards = fs.readdirSync(contentRoot, { withFileTypes: true })
    .filter((d) => d.isDirectory() && fs.existsSync(path.join(contentRoot, d.name, "board.json")))
    .map((d) => d.name);
  for (const boardSlug of boards) {
    routes.add(`/${boardSlug}`);
    const board = j(boardSlug, "board.json");
    for (const c of board.classes) {
      routes.add(`/${boardSlug}/${c.slug}`);
      const cls = j(boardSlug, c.slug, "class.json");
      for (const s of cls.subjects) {
        routes.add(`/${boardSlug}/${c.slug}/${s.slug}`);
        const subj = j(boardSlug, c.slug, s.slug, "subject.json");
        for (const sec of subj.sections) for (const g of sec.groups) for (const ch of g.chapters)
          if (ch.status === "published") routes.add(`/${boardSlug}/${c.slug}/${s.slug}/${ch.slug}`);
      }
    }
  }
  return routes;
}

/** A representative sample of URLs that must 404 (no published chapter, no such slug). */
function notFoundProbes() {
  const probes = ["/this-board-does-not-exist", "/icse/class-99", "/icse/class-9/no-such-subject",
    "/icse/class-9/english/does-not-exist", "/icse/class-9/english/with-the-photographer"];
  for (const boardSlug of ["isc", "cbse"]) {
    probes.push(`/${boardSlug}/class-99`, `/${boardSlug}/class-11/no-such-subject`);
  }
  return probes;
}

/**
 * Legacy redirect rules, read from next.config.ts so there is a single source
 * of truth. Each rule is exercised with a real published path substituted for
 * the `:path*` wildcard, and the redirect must resolve to 200 at the
 * destination the config declares.
 */
function legacyRedirectRules() {
  const cfg = fs.readFileSync(path.join(root, "next.config.ts"), "utf8");
  const rules = [...cfg.matchAll(/source:\s*"([^"]+)"\s*,\s*destination:\s*"([^"]+)"/g)]
    .map((m) => ({ source: m[1], destination: m[2] }));
  if (rules.length === 0) {
    console.error(
      "Could not parse any redirect rule out of next.config.ts. " +
        "The legacy redirect audit is now a no-op, so update the regex in scripts/audit-routes.mjs."
    );
    process.exit(2);
  }
  return rules;
}

/**
 * A real published path used to fill the `:path*` wildcard, expressed relative
 * to the board root (that is with the leading `/icse/` stripped) so that a rule
 * like `/cisce/:path*` -> `/icse/:path*` resolves to a genuinely existing page.
 */
function wildcardValue() {
  const published = [...expectedRoutes()]
    .filter((r) => r.startsWith("/icse/") && r.split("/").filter(Boolean).length >= 3)
    .sort();
  if (published.length === 0) throw new Error("No published ICSE route to test redirects with");
  return published[0].replace(/^\/icse\//, "");
}

async function auditLegacyRedirects(base, seen) {
  const wildcard = wildcardValue();
  for (const { source, destination } of legacyRedirectRules()) {
    const fill = (p) => p.replace(":path*", wildcard);
    const from = fill(source);
    const to = fill(destination);

    // The first hop must point at the destination the config declares.
    const first = await fetch(base + from, { redirect: "manual" });
    const location = first.headers.get("location");
    if (first.status < 300 || first.status >= 400 || !location) {
      fail(`legacy redirect ${from} did not redirect (HTTP ${first.status})`);
      continue;
    }
    const hop = new URL(location, base).pathname;
    if (hop !== to) {
      fail(`legacy redirect ${from} points at ${hop}, expected ${to}`);
      continue;
    }

    // Following the chain must still land on a real page. Legacy destinations
    // may themselves redirect onward (e.g. /icse/english -> /icse/class-9/english),
    // so only the final status is asserted, not the final path.
    const res = await fetch(base + from, { redirect: "follow" });
    if (res.status !== 200) fail(`legacy redirect ${from} -> ${hop} -> HTTP ${res.status}, expected 200`);
    seen.add(from);
  }
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
    const queue = [...expectedRoutes()];
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
    for (const bad of notFoundProbes()) {
      const r = await get(base, bad);
      if (r.status !== 404) fail(`${bad} should be 404, got ${r.status}`);
    }
    await auditLegacyRedirects(base, seen);
    console.log(`\nRoute audit: ${seen.size} route(s) checked, ${failures.length} failure(s)`);
  } finally {
    server.kill();
  }
  process.exit(failures.length ? 1 : 0);
}
main();
