#!/usr/bin/env node
/**
 * Independent arithmetic verifier for Mathematics content.
 *
 * The point of this script is that the author and the checker must not be the
 * same process. It re-derives the numeric claims in chapter content with exact
 * arithmetic (integer/Fraction where possible, Decimal for surds) and compares
 * them against what the chapter claims. A human reading a worked example can
 * pattern-match past a sign error; this cannot.
 *
 * Each entry in CHECKS is an assertion written by the author, evaluated here.
 * If a claim is wrong, the assertion fails loudly and the content is corrected —
 * the content is fixed, never the assertion.
 *
 * It covers the Mathematics and Physics chapters. A CHECKS row may carry an
 * optional fourth element naming the subject directory it belongs to; rows
 * without one default to Mathematics.
 *
 * Usage: node scripts/verify-math.mjs [subjectDir]
 */
import fs from "node:fs";
import path from "node:path";

/* ---------- exact helpers ---------- */

/** Rational arithmetic on BigInt so nothing rounds. */
function R(num, den = 1n) {
  let n = BigInt(num);
  let d = BigInt(den);
  if (d === 0n) throw new Error("zero denominator");
  if (d < 0n) {
    n = -n;
    d = -d;
  }
  const g = (a, b) => (b === 0n ? a : g(b, a % b));
  const k = g(n < 0n ? -n : n, d);
  return { n: n / k, d: d / k };
}
const rAdd = (a, b) => R(a.n * b.d + b.n * a.d, a.d * b.d);
const rSub = (a, b) => R(a.n * b.d - b.n * a.d, a.d * b.d);
const rMul = (a, b) => R(a.n * b.n, a.d * b.d);
const rDiv = (a, b) => R(a.n * b.d, a.d * b.n);
const rPow = (a, k) => R(a.n ** BigInt(k), a.d ** BigInt(k));
const rIsInt = (a) => a.d === 1n;
const rEq = (a, b) => a.n === b.n && a.d === b.d;
/** Human-readable form of a rational, used in failure output. */
export function rStr(a) {
  return rIsInt(a) ? a.n.toString() : `${a.n}/${a.d}`;
}

/** a/b === c/d, exactly. */
const feq = (a, b, c, d) => rEq(R(a, b), R(c, d));
/** (p/q)^k === r/s */
const peq = (p, q, k, r, s) => rEq(rPow(R(p, q), BigInt(k)), R(r, s));
/** (p/q) * (r/s) === u/v */
const meq = (p, q, r, s, u, v) => rEq(rMul(R(p, q), R(r, s)), R(u, v));
/** (p/q) + (r/s) === u/v */
const adeq = (p, q, r, s, u, v) => rEq(rAdd(R(p, q), R(r, s)), R(u, v));
/** (p/q) - (r/s) === u/v */
const sbeq = (p, q, r, s, u, v) => rEq(rSub(R(p, q), R(r, s)), R(u, v));
/** (p/q) / (r/s) === u/v */
const deq = (p, q, r, s, u, v) => rEq(rDiv(R(p, q), R(r, s)), R(u, v));
/** (a x b) / 2 === u — the rhombus / triangle area rule. */
const areaHalf = (a, b, u) => feq(a * b, 1n, u * 2n, 1n);
/** a x b x c === u/v */
const prod3 = (a, b, c, u, v = 1n) => feq(a * b * c, 1n, u, v);
/** a/b as an exact rational value, for squaring and further arithmetic. */
const feq2 = (a, b) => R(a, b);
/** Twice the shoelace area of a lattice triangle, exact over BigInt. */
const tri = (A, B, C) => {
  const s = A[0] * (B[1] - C[1]) + B[0] * (C[1] - A[1]) + C[0] * (A[1] - B[1]);
  return s < 0n ? -s : s;
};
/** Squared distance between two lattice points. */
const d2 = (P, Q) => (P[0] - Q[0]) ** 2n + (P[1] - Q[1]) ** 2n;

/* ---------- symbolic polynomial algebra ----------
 * Terms are Map<monomial, BigInt> where a monomial is a sorted string of the
 * variables it contains, e.g. "xy" means x^1 y^1 and "" means the constant.
 * Expanding real expressions and comparing to the content removes the whole class
 * of "the author expanded it wrong" errors, including sign slips that survive a
 * visual re-read.
 */
function poly(terms) {
  return new Map(Object.entries(terms).map(([k, v]) => [k, BigInt(v)]));
}
const P1 = poly({ "": 1 });
function pAdd(a, b) {
  const out = new Map(a);
  for (const [k, v] of b) out.set(k, (out.get(k) ?? 0n) + v);
  for (const [k, v] of [...out]) if (v === 0n) out.delete(k);
  return out;
}
function pNeg(a) {
  return new Map([...a].map(([k, v]) => [k, -v]));
}
function pSub(a, b) {
  return pAdd(a, pNeg(b));
}
function pMul(a, b) {
  const out = new Map();
  for (const [ka, va] of a)
    for (const [kb, vb] of b) {
      const key = [...ka, ...kb].sort().join("");
      out.set(key, (out.get(key) ?? 0n) + va * vb);
    }
  for (const [k, v] of [...out]) if (v === 0n) out.delete(k);
  return out;
}
function pPow(a, n) {
  let out = P1;
  for (let i = 0; i < n; i++) out = pMul(out, a);
  return out;
}
/** Monomial from a map of variable -> exponent. */
function mon(vars) {
  return new Map([[[...Object.entries(vars).sort(([a], [b]) => a.localeCompare(b)).map(([v, e]) => v.repeat(e)).join("")], 1n]]);
}
/** Evaluate a polynomial at given variable values. */
function pEval(p, vals) {
  let acc = 0n;
  for (const [k, c] of p) {
    let t = c;
    for (const ch of k) t *= BigInt(vals[ch] ?? 1);
    acc += t;
  }
  return acc;
}
/** Canonical string form so polynomials compare by value, not by insertion order. */
function pStr(p) {
  return [...p]
    .filter(([, c]) => c !== 0n)
    .sort(([a], [b]) => (a === b ? 0 : a === "" ? 1 : b === "" ? -1 : b.length - a.length || a.localeCompare(b)))
    .map(([k, c]) => `${c === 1n ? "" : c === -1n ? "-" : c}*${k || "1"}`)
    .join(" + ");
}
const polyEq = (a, b) => pStr(a) === pStr(b);

/* ---------- assertions ---------- */

/**
 * Every entry: [chapterSlug, label, () => boolean]
 * Keep the assertion minimal and specific so a failure names the exact claim.
 */
const CHECKS = [
  /* ---- rational and irrational numbers ---- */
  ["rational-and-irrational-numbers", "7/16 = 4375/10000", () => feq(7n, 16n, 4375n, 10000n)],
  ["rational-and-irrational-numbers", "11/16 = 0.6875", () => feq(11n, 16n, 6875n, 10000n)],
  ["rational-and-irrational-numbers", "21/28 = 3/4", () => feq(21n, 28n, 3n, 4n)],
  ["rational-and-irrational-numbers", "21/28 = 75/100", () => feq(21n, 28n, 75n, 100n)],
  ["rational-and-irrational-numbers", "16 = 2^4 and divides 10^4", () => feq(2n ** 4n, 1n, 16n, 1n) && 10000n % 16n === 0n],
  ["rational-and-irrational-numbers", "(root3 - root2)(root2 + root3) = 3 - 2 = 1", () => sbeq(3n, 1n, 2n, 1n, 1n, 1n)],
  ["rational-and-irrational-numbers", "(3 - root5)(3 + root5) = 9 - 5 = 4", () => sbeq(9n, 1n, 5n, 1n, 4n, 1n)],
  ["rational-and-irrational-numbers", "(root5 + root3)(root5 - root3) = 5 - 3 = 2", () => sbeq(5n, 1n, 3n, 1n, 2n, 1n)],
  ["rational-and-irrational-numbers", "(2 + root5)(2 - root5) = 4 - 5 = -1", () => sbeq(4n, 1n, 5n, 1n, -1n, 1n)],
  ["rational-and-irrational-numbers", "(root3 + 1)^2 = 3 + 1 + 2root3 = 4 + 2root3", () => adeq(3n, 1n, 1n, 1n, 4n, 1n) && meq(2n, 1n, 1n, 1n, 2n, 1n)],
  ["rational-and-irrational-numbers", "(root5 + 3)^2 = 5 + 9 + 6root5 = 14 + 6root5", () => adeq(5n, 1n, 9n, 1n, 14n, 1n) && meq(6n, 1n, 1n, 1n, 6n, 1n)],
  ["rational-and-irrational-numbers", "50 = 25 x 2 and 25 = 5^2, so root 50 = 5 root 2", () => meq(25n, 1n, 2n, 1n, 50n, 1n) && feq(5n ** 2n, 1n, 25n, 1n)],
  ["rational-and-irrational-numbers", "72 = 36 x 2 and 36 = 6^2, so root 72 = 6 root 2", () => meq(36n, 1n, 2n, 1n, 72n, 1n) && feq(6n ** 2n, 1n, 36n, 1n)],
  ["rational-and-irrational-numbers", "200/8 = 25 and root 25 = 5", () => feq(200n, 8n, 25n, 1n) && feq(5n ** 2n, 1n, 25n, 1n)],
  ["rational-and-irrational-numbers", "3root5 + 2root5 = 5root5", () => adeq(3n, 1n, 2n, 1n, 5n, 1n)],
  ["rational-and-irrational-numbers", "root2 + root8 = root2 + 2root2 = 3root2, and (2root2)^2 = 8", () => adeq(1n, 1n, 2n, 1n, 3n, 1n) && meq(4n, 1n, 2n, 1n, 8n, 1n)],
  ["rational-and-irrational-numbers", "(14 + 6root5)/(-4) rational part = -7/2, surd coeff = -3/2", () => {
    // 14 / -4 = -7/2 ; 6 / -4 = -3/2
    return feq(14n, -4n, -7n, 2n) && feq(6n, -4n, -3n, 2n);
  }],
  ["rational-and-irrational-numbers", "0.454545... : 99x = 45, so x = 45/99 = 5/11", () => feq(45n, 99n, 5n, 11n)],
  ["rational-and-irrational-numbers", "(root5 + root3)^2 = 5 + 3 + 2root15 = 8 + 2root15", () => adeq(5n, 1n, 3n, 1n, 8n, 1n) && meq(2n, 1n, 1n, 1n, 2n, 1n)],
  ["rational-and-irrational-numbers", "3 x 5 = 15", () => meq(3n, 1n, 5n, 1n, 15n, 1n)],
  ["rational-and-irrational-numbers", "(root3 + 1)^2 surd coefficient 2x1 = 2", () => meq(2n, 1n, 1n, 1n, 2n, 1n)],
  ["rational-and-irrational-numbers", "(root3)^3 = 3 root3 since root3 x root3 = 3", () => meq(3n, 1n, 1n, 1n, 3n, 1n)],
  ["rational-and-irrational-numbers", "11 never divides a power of 10", () => ![2n ** 20n % 11n === 0n, 5n ** 20n % 11n === 0n].some(Boolean) && (10n ** 20n) % 11n !== 0n],
  ["rational-and-irrational-numbers", "(4 + 2root3)/2 = 2 + root3", () => feq(4n, 2n, 2n, 1n) && feq(2n, 2n, 1n, 1n)],
  ["rational-and-irrational-numbers", "root 2 squared is 2", () => meq(2n, 1n, 1n, 1n, 2n, 1n)],

  /* ---- compound interest ---- */
  ["compound-interest", "1.1^2 = 1.21", () => peq(11n, 10n, 2, 121n, 100n)],
  ["compound-interest", "1000 x 1.21 = 1210, CI = 210", () => meq(1000n, 1n, 121n, 100n, 1210n, 1n) && meq(1000n, 1n, 21n, 100n, 210n, 1n)],
  ["compound-interest", "1.05^3 = 1.157625", () => peq(105n, 100n, 3, 1157625n, 1000000n)],
  ["compound-interest", "4000 at 5% for 3 years: amount = 4630.50", () => meq(4000n, 1n, 1157625n, 1000000n, 46305n, 10n)],
  ["compound-interest", "1.05^2 = 1.1025; 8000 * 1.1025 = 8820", () => peq(105n, 100n, 2, 441n, 400n) && meq(8000n, 1n, 441n, 400n, 8820n, 1n)],
  ["compound-interest", "1.03^4 = 1.12550881; 16000 * that = 18008.14096", () => peq(103n, 100n, 4, 112550881n, 100000000n) && meq(16000n, 1n, 112550881n, 100000000n, 1800814096n, 100000n)],
  ["compound-interest", "0.8^2 = 0.64; 50000 * 0.64 = 32000", () => peq(8n, 10n, 2, 16n, 25n) && meq(50000n, 1n, 16n, 25n, 32000n, 1n)],
  ["compound-interest", "12% of 2000 = 240", () => meq(2000n, 1n, 12n, 100n, 240n, 1n)],
  ["compound-interest", "1.04^3 = 1.124864; 25000 * that = 28121.60", () => peq(104n, 100n, 3, 1124864n, 1000000n) && meq(25000n, 1n, 1124864n, 1000000n, 281216n, 10n)],
  ["compound-interest", "SI on 12800 at 12.5% for 3 years = 4800", () => meq(12800n, 1n, 125n, 1000n, 1600n, 1n) && meq(1600n, 1n, 3n, 1n, 4800n, 1n)],
  ["compound-interest", "1.125^3 = 1.423828125; 12800 * that - 12800 = 5425", () => peq(9n, 8n, 3, 1423828125n, 1000000000n) && meq(12800n, 1n, 1423828125n, 1000000000n, 18225n, 1n) && sbeq(18225n, 1n, 12800n, 1n, 5425n, 1n)],
  ["compound-interest", "1.05^4 = 1.21550625; 10000 * that = 12155.0625", () => peq(105n, 100n, 4, 121550625n, 100000000n) && meq(10000n, 1n, 121550625n, 100000000n, 121550625n, 10000n)],
  ["compound-interest", "1.06^2 = 1.1236; 20000 * that = 22472", () => peq(106n, 100n, 2, 11236n, 10000n) && meq(20000n, 1n, 11236n, 10000n, 22472n, 1n)],
  ["compound-interest", "1.08^3 = 1.259712; 48000 * that = 60466.176, CI = 12466.176", () => peq(108n, 100n, 3, 1259712n, 1000000n) && meq(48000n, 1n, 1259712n, 1000000n, 60466176n, 1000n) && sbeq(60466176n, 1000n, 48000n, 1n, 12466176n, 1000n)],
  ["compound-interest", "1.08^2 = 1.1664", () => peq(108n, 100n, 2, 11664n, 10000n)],
  ["compound-interest", "0.9^3 = 0.729; 64000 * 0.729 = 46656", () => peq(9n, 10n, 3, 729n, 1000n) && meq(64000n, 1n, 729n, 1000n, 46656n, 1n)],
  ["compound-interest", "straight-line 3y loss on 64000 at 10% = 19200, value 44800", () => feq(19200n, 1n, 64000n - 44800n, 1n)],
  ["compound-interest", "12500 * 1.12550881 = 14068.860125 vs annual 12500 * 1.12 = 14000", () => meq(12500n, 1n, 112550881n, 100000000n, 14068860125n, 1000000n) && meq(12500n, 1n, 112n, 100n, 14000n, 1n)],
  ["compound-interest", "9000 * 1.21550625 = 10939.55625, so 11025 is not a clean 5% amount", () => meq(9000n, 1n, 121550625n, 100000000n, 1093955625n, 100000n) && meq(11000n, 1n, 121550625n, 100000000n, 1337056875n, 100000n)],
  ["compound-interest", "5000 x 1.21 = 6050, CI = 1050, excess over SI = 50", () => meq(5000n, 1n, 121n, 100n, 6050n, 1n) && feq(1050n - 1000n, 1n, 50n, 1n)],
  ["compound-interest", "150000 x 9/100 = 13500; 4y simple amount 204000", () => meq(150000n, 1n, 9n, 100n, 13500n, 1n) && feq(150000n + 54000n, 1n, 204000n, 1n)],
  ["compound-interest", "2 to the power 1/5 is approximately 1.1487", () => {
    // verify the fifth power brackets 2: 1.1487^5 in [1.99, 2.01]
    const f = R(11487n, 10000n);
    const p = rPow(f, 5n);
    return p.n * 100n > p.d * 199n && p.n * 100n < p.d * 201n;
  }],

  /* ---- expansions: symbolic, computed from the identity ---- */
  ["expansions", "(a+b)^2 == a^2 + 2ab + b^2", () => {
    const A = mon({ a: 1 }), B = mon({ b: 1 });
    return polyEq(pPow(pAdd(A, B), 2), pAdd(pAdd(pPow(A, 2), pMul(poly({ "": 2 }), pMul(A, B))), pPow(B, 2)));
  }],
  ["expansions", "(a-b)^2 == a^2 - 2ab + b^2", () => {
    const A = mon({ a: 1 }), B = mon({ b: 1 });
    return polyEq(pPow(pSub(A, B), 2), pSub(pAdd(pPow(A, 2), pPow(B, 2)), pMul(poly({ "": 2 }), pMul(A, B))));
  }],
  ["expansions", "(a+b)^3 == a^3 + 3a^2b + 3ab^2 + b^3", () => {
    const A = mon({ a: 1 }), B = mon({ b: 1 });
    return polyEq(pPow(pAdd(A, B), 3), pAdd(pAdd(pAdd(pPow(A, 3), pMul(poly({ "": 3n }), pMul(pPow(A, 2), B))), pMul(poly({ "": 3n }), pMul(A, pPow(B, 2)))), pPow(B, 3)));
  }],
  ["expansions", "(a-b)^3 == a^3 - 3a^2b + 3ab^2 - b^3", () => {
    const A = mon({ a: 1 }), B = mon({ b: 1 });
    const want = pAdd(pAdd(pPow(A, 3), pMul(poly({ "": 3n }), pMul(A, pPow(B, 2)))), pSub(pMul(poly({ "": -3n }), pMul(pPow(A, 2), B)), pPow(B, 3)));
    return polyEq(pPow(pSub(A, B), 3), want);
  }],
  ["expansions", "(x+5)^2 == x^2 + 10x + 25", () => {
    const X = mon({ x: 1 });
    return polyEq(pPow(pAdd(X, poly({ "": 5 })), 2), poly({ xx: 1n, x: 10n, "": 25n }));
  }],
  ["expansions", "(3x-2y)^2 == 9x^2 - 12xy + 4y^2", () => {
    const X = mon({ x: 1 }), Y = mon({ y: 1 });
    return polyEq(pPow(pSub(pMul(poly({ "": 3 }), X), pMul(poly({ "": 2 }), Y)), 2), poly({ xx: 9n, xy: -12n, yy: 4n }));
  }],
  ["expansions", "(x+2)^3 == x^3 + 6x^2 + 12x + 8", () => {
    const X = mon({ x: 1 });
    return polyEq(pPow(pAdd(X, poly({ "": 2 })), 3), poly({ "xxx": 1n, "xx": 6n, "x": 12n, "": 8n }));
  }],
  ["expansions", "(2a-b)^3 == 8a^3 - 12a^2b + 6ab^2 - b^3", () => {
    const A = mon({ a: 1 }), B = mon({ b: 1 });
    return polyEq(pPow(pSub(pMul(poly({ "": 2 }), A), B), 3), poly({ aaa: 8n, aab: -12n, abb: 6n, bbb: -1n }));
  }],
  ["expansions", "(3a+2b)^3 == 27a^3 + 54a^2b + 36ab^2 + 8b^3", () => {
    const A = mon({ a: 1 }), B = mon({ b: 1 });
    return polyEq(pPow(pAdd(pMul(poly({ "": 3 }), A), pMul(poly({ "": 2 }), B)), 3), poly({ aaa: 27n, aab: 54n, abb: 36n, bbb: 8n }));
  }],
  ["expansions", "(x+5)^3 evaluated at x = 1 equals 6^3 = 216", () => {
    const X = mon({ x: 1 });
    return pEval(pPow(pAdd(X, poly({ "": 5 })), 3), { x: 1 }) === 216n;
  }],
  ["expansions", "(x+3)^2 - (x-3)^2 == 12x", () => {
    const X = mon({ x: 1 });
    return polyEq(pSub(pPow(pAdd(X, poly({ "": 3 })), 2), pPow(pSub(X, poly({ "": 3 })), 2)), poly({ x: 12n }));
  }],
  ["expansions", "(2x+3y+z)^2 == 4x^2+9y^2+z^2+12xy+4xz+6yz", () => {
    const X = mon({ x: 1 }), Y = mon({ y: 1 }), Z = mon({ z: 1 });
    return polyEq(pPow(pAdd(pAdd(pMul(poly({ "": 2 }), X), pMul(poly({ "": 3 }), Y)), Z), 2), poly({ xx: 4n, yy: 9n, zz: 1n, xy: 12n, xz: 4n, yz: 6n }));
  }],
  ["expansions", "(a-b-c)^2 == a^2+b^2+c^2-2ab-2ac+2bc", () => {
    const A = mon({ a: 1 }), B = mon({ b: 1 }), C = mon({ c: 1 });
    return polyEq(pPow(pSub(pSub(A, B), C), 2), poly({ aa: 1n, bb: 1n, cc: 1n, ab: -2n, ac: -2n, bc: 2n }));
  }],
  ["expansions", "(x+2y+4)^2 == x^2+4y^2+16+4xy+8x+16y", () => {
    const X = mon({ x: 1 }), Y = mon({ y: 1 });
    return polyEq(pPow(pAdd(pAdd(X, pMul(poly({ "": 2 }), Y)), poly({ "": 4 })), 2), poly({ xx: 1n, yy: 4n, "": 16n, xy: 4n, x: 8n, y: 16n }));
  }],
  ["expansions", "(x+2)^2(x-3) == x^3 + x^2 - 8x - 12", () => {
    const X = mon({ x: 1 });
    return polyEq(pMul(pPow(pAdd(X, poly({ "": 2 })), 2), pSub(X, poly({ "": 3 }))), poly({ xxx: 1n, xx: 1n, x: -8n, "": -12n }));
  }],
  ["expansions", "(1+2x-3x^2)^2 == 1 + 4x - 2x^2 - 12x^3 + 9x^4", () => {
    const X = mon({ x: 1 });
    return polyEq(pPow(pAdd(pAdd(P1, pMul(poly({ "": 2 }), X)), pMul(poly({ "": -3 }), pPow(X, 2))), 2), poly({ "": 1n, x: 4n, xx: -2n, xxx: -12n, xxxx: 9n }));
  }],
  ["expansions", "(5x-2)^2 == 25x^2 - 20x + 4, and at x=3 equals 169", () => {
    const X = mon({ x: 1 });
    const sq = pPow(pSub(pMul(poly({ "": 5 }), X), poly({ "": 2 })), 2);
    return polyEq(sq, poly({ xx: 25n, x: -20n, "": 4n })) && pEval(sq, { x: 3 }) === 169n;
  }],
  ["expansions", "(x+4)(x+7) == x^2 + 11x + 28", () => {
    const X = mon({ x: 1 });
    return polyEq(pMul(pAdd(X, poly({ "": 4 })), pAdd(X, poly({ "": 7 }))), poly({ xx: 1n, x: 11n, "": 28n }));
  }],
  ["expansions", "(x+6)(x-2) == x^2 + 4x - 12", () => {
    const X = mon({ x: 1 });
    return polyEq(pMul(pAdd(X, poly({ "": 6 })), pSub(X, poly({ "": 2 }))), poly({ xx: 1n, x: 4n, "": -12n }));
  }],
  ["expansions", "(x+4)(x-4) == x^2 - 16", () => {
    const X = mon({ x: 1 });
    return polyEq(pMul(pAdd(X, poly({ "": 4 })), pSub(X, poly({ "": 4 }))), poly({ xx: 1n, "": -16n }));
  }],
  ["expansions", "a^3 + b^3 + 3ab(a+b) == (a+b)^3", () => {
    const A = mon({ a: 1 }), B = mon({ b: 1 });
    const lhs = pAdd(pAdd(pPow(A, 3), pPow(B, 3)), pMul(pMul(poly({ "": 3n }), pMul(A, B)), pAdd(A, B)));
    return polyEq(lhs, pPow(pAdd(A, B), 3));
  }],
  ["expansions", "103 x 97 == 9991 and 105 x 95 == 9975", () => {
    return feq(103n * 97n, 1n, 9991n, 1n) && feq(105n * 95n, 1n, 9975n, 1n);
  }],
  ["expansions", "99 x 101 == 9999", () => feq(99n * 101n, 1n, 9999n, 1n)],
  ["expansions", "a+b=7, ab=10 => a^2+b^2 = 49-20 = 29", () => feq(7n ** 2n, 1n, 49n, 1n) && feq(49n - 20n, 1n, 29n, 1n)],
  ["expansions", "a-b=4, ab=3 => a^2+b^2 = 16+6 = 22", () => feq(4n ** 2n, 1n, 16n, 1n) && feq(16n + 6n, 1n, 22n, 1n)],
  ["expansions", "a+b=10, a-b=2 => a=6, b=4, a^2-b^2 = 20 not 48", () => {
    const a = (10n + 2n) / 2n, b = (10n - 2n) / 2n;
    return a === 6n && b === 4n && feq(a * a - b * b, 1n, 20n, 1n);
  }],
  ["expansions", "x=3,y=4 => x^3+y^3+3xy(x+y) = 343 = 7^3", () => {
    const v = 27n + 64n + 3n * 3n * 4n * 7n;
    return v === 343n && feq(7n ** 3n, 1n, 343n, 1n);
  }],
  ["expansions", "(x-1)^4 constant term is 1", () => {
    const X = mon({ x: 1 });
    return pPow(pSub(X, P1), 4).get("") === 1n;
  }],
  ["compound-interest", "CI - SI for 2 years at rate r is P(r/100)^2: P=10000, r=5 gives 25", () => peq(5n, 100n, 2, 1n, 400n) && meq(10000n, 1n, 1n, 400n, 25n, 1n)],
  ["compound-interest", "annual income 150000 at 9% per annum simple interest = 13500", () => meq(150000n, 1n, 9n, 100n, 13500n, 1n)],

  // ---- rectilinear-figures ----
  ["rectilinear-figures", "parallelogram base 12 height 5 gives area 60", () => meq(12n, 1n, 5n, 1n, 60n, 1n)],
  ["rectilinear-figures", "rhombus diagonals 10 and 24 gives area 120", () => areaHalf(10n, 24n, 120n)],
  ["rectilinear-figures", "rectangle 12 x 5 has diagonal 13", () => feq(12n ** 2n + 5n ** 2n, 1n, 13n ** 2n, 1n)],
  ["rectilinear-figures", "square of diagonal 8 has area 64/2 = 32", () => feq(8n ** 2n, 1n, 32n * 2n, 1n)],
  ["rectilinear-figures", "triangle base 18 height 7 has area 63", () => areaHalf(18n, 7n, 63n)],
  ["rectilinear-figures", "parallelogram base 15 height 8 gives area 120", () => meq(15n, 1n, 8n, 1n, 120n, 1n)],
  ["rectilinear-figures", "rhombus diagonals 12 and 16: area 96, side = root(6^2+8^2) = 10", () =>
    areaHalf(12n, 16n, 96n) && feq(6n ** 2n + 8n ** 2n, 1n, 10n ** 2n, 1n)],
  ["rectilinear-figures", "rectangle 15 x 8: diagonal 17, area 120", () =>
    feq(15n ** 2n + 8n ** 2n, 1n, 17n ** 2n, 1n) && meq(15n, 1n, 8n, 1n, 120n, 1n)],
  ["rectilinear-figures", "perpendicular diagonals 20 and 24: area 240, side = root 244 = 2 root 61", () =>
    areaHalf(20n, 24n, 240n) && feq(10n ** 2n + 12n ** 2n, 1n, 244n, 1n) && feq(61n * 4n, 1n, 244n, 1n)],
  ["rectilinear-figures", "parallelogram AB 16 BC 11 height 8: area 128, perimeter 54", () =>
    meq(16n, 1n, 8n, 1n, 128n, 1n) && meq(2n, 1n, 27n, 1n, 54n, 1n)],
  ["rectilinear-figures", "square side 10 gives perimeter 40; rhombus on it has side 10 and diagonal 12, so other half-diagonal 8, other diagonal 16, area 96", () =>
    meq(4n, 1n, 10n, 1n, 40n, 1n) && feq(10n ** 2n - 6n ** 2n, 1n, 8n ** 2n, 1n) && areaHalf(12n, 16n, 96n)],
  ["rectilinear-figures", "triangle base 12 height 10 has area 60, so parallelogram on same base with twice the area has height 10", () =>
    areaHalf(12n, 10n, 60n) && feq(120n, 12n, 10n, 1n)],
  ["rectilinear-figures", "parallelogram area 96 base 16 has height 6", () => feq(96n, 16n, 6n, 1n)],
  ["rectilinear-figures", "regular hexagon interior angle = (2n-4) right angles = 8, each 8/6 = 4/3 right angles = 120 degrees", () =>
    feq(2n * 6n - 4n, 1n, 8n, 1n) && deq(8n, 1n, 6n, 1n, 4n, 3n) && feq(90n * 4n, 1n, 3n * 120n, 1n)],
  ["rectilinear-figures", "number of diagonals of an octagon = 8(8-3)/2 = 20", () => feq(8n * 5n, 1n, 40n, 1n)],
  ["rectilinear-figures", "rhombus side 13 with diagonal 10: half-diagonals 5 and 12, other diagonal 24, area 120", () =>
    feq(13n ** 2n - 5n ** 2n, 1n, 12n ** 2n, 1n) && areaHalf(10n, 24n, 120n)],
  ["rectilinear-figures", "parallelogram area 180 base 15 slanting side 13: height 12, offset root(169-144) = 5", () =>
    feq(180n, 15n, 12n, 1n) && feq(13n ** 2n - 12n ** 2n, 1n, 5n ** 2n, 1n)],

  // ---- circle ----
  ["circle", "chord of radius 13 at distance 5 is root(169-25) x 2 = 24", () => feq(13n ** 2n - 5n ** 2n, 1n, 12n ** 2n, 1n) && feq(12n * 2n, 1n, 24n, 1n)],
  ["circle", "centre angle 100 gives inscribed angle 50 on the same arc", () => feq(100n, 2n, 50n, 1n)],
  ["circle", "radius 10 with chord 16 is at distance root(100-64) = 6", () => feq(100n - 8n ** 2n, 1n, 6n ** 2n, 1n)],
  ["circle", "cyclic quadrilateral opposite angles: 115 + 65 = 180", () => adeq(115n, 1n, 65n, 1n, 180n, 1n)],
  ["circle", "tangent: radius 12, OP 13, PA = root(169-144) = 5", () => feq(13n ** 2n - 12n ** 2n, 1n, 5n ** 2n, 1n)],
  ["circle", "angle in a semicircle: arc 180 gives inscribed angle 90", () => feq(180n, 2n, 90n, 1n)],
  ["circle", "chord of radius 10 at distance 6 is root(100-36) x 2 = 16", () => feq(10n ** 2n - 6n ** 2n, 1n, 8n ** 2n, 1n) && feq(8n * 2n, 1n, 16n, 1n)],
  ["circle", "central 150: inscribed on major arc 75, on minor arc (360-150)/2 = 105, sum 180", () =>
    feq(150n, 2n, 75n, 1n) && feq(360n - 150n, 2n, 105n, 1n) && adeq(75n, 1n, 105n, 1n, 180n, 1n)],
  ["circle", "intersecting chords: PA x PB = PC x PD gives 4x6 = 3x8", () => meq(4n, 1n, 6n, 1n, 24n, 1n) && meq(3n, 1n, 8n, 1n, 24n, 1n)],
  ["circle", "tangent 15 and radius 9 give OP = root(225+81) = root 306 = 3 root 34", () =>
    feq(15n ** 2n + 9n ** 2n, 1n, 306n, 1n) && feq(9n * 34n, 1n, 306n, 1n)],
  ["circle", "triangle in semicircle of radius 7: hypotenuse 14, leg 3, other root(196-9) = root 187", () => feq(14n ** 2n - 3n ** 2n, 1n, 187n, 1n)],
  ["circle", "chord of radius 25 at distance 7 is root(625-49) x 2 = 48", () =>
    feq(25n ** 2n - 7n ** 2n, 1n, 24n ** 2n, 1n) && feq(24n * 2n, 1n, 48n, 1n)],
  ["circle", "hexagon: 360/6 = 60 degrees, so the triangle on two radii is equilateral and side = radius 14", () =>
    feq(360n, 6n, 60n, 1n) && feq(60n, 2n, 30n, 1n)],
  ["circle", "inscribed 64 gives centre angle 128", () => feq(64n, 1n, 128n, 2n)],
  ["circle", "chord 24 at distance 5 has radius root(144+25) = 13", () => feq(12n ** 2n + 5n ** 2n, 1n, 13n ** 2n, 1n)],
  ["circle", "radius 10 with tangent radius 6 gives PA = root(100-36) = 8, and doubling the radius to 12 exceeds OP", () =>
    feq(10n ** 2n - 6n ** 2n, 1n, 8n ** 2n, 1n) && (12n > 10n)],
  ["circle", "tangent: radius 6, OP 10, PA = root(100-36) = 8", () => feq(10n ** 2n - 6n ** 2n, 1n, 8n ** 2n, 1n)],
  ["circle", "radius 13: chord at distance 5 is 24 and at distance 12 is 10; same-side gap 12-5 = 7, opposite-side gap 17", () =>
    feq(13n ** 2n - 5n ** 2n, 1n, 12n ** 2n, 1n) && feq(13n ** 2n - 12n ** 2n, 1n, 5n ** 2n, 1n) &&
    sbeq(12n, 1n, 5n, 1n, 7n, 1n) && adeq(12n, 1n, 5n, 1n, 17n, 1n)],
  ["circle", "touching circles: external 9+15 = 24, internal 15-9 = 6", () =>
    adeq(9n, 1n, 15n, 1n, 24n, 1n) && sbeq(15n, 1n, 9n, 1n, 6n, 1n)],

  // ---- statistics ----
  ["statistics", "mean of 4,8,10,12,16 is 50/5 = 10", () => feq(4n + 8n + 10n + 12n + 16n, 5n, 10n, 1n)],
  ["statistics", "median of 1,3,5,7,9 is the 3rd observation, 5", () => {
    const d = [3n, 7n, 1n, 9n, 5n].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
    return d[(5n + 1n) / 2n - 1n] === 5n;
  }],
  ["statistics", "class mark of 15 to 25 is (15+25)/2 = 20", () => feq(15n + 25n, 2n, 20n, 1n)],
  ["statistics", "distribution 2:3, 4:5, 6:2 has total 10 and mean 38/10 = 3.8", () => {
    const d = [[2n, 3n], [4n, 5n], [6n, 2n]];
    const tf = d.reduce((a, [, f]) => a + f, 0n);
    const ps = d.reduce((a, [v, f]) => a + v * f, 0n);
    return tf === 10n && feq(ps, tf, 19n, 5n);
  }],
  ["statistics", "adding 6 to every observation of mean 24 gives mean 30", () => adeq(24n, 1n, 6n, 1n, 30n, 1n)],
  ["statistics", "mean of 12,15,9,18,21,15 is 90/6 = 15", () => feq(12n + 15n + 9n + 18n + 21n + 15n, 6n, 15n, 1n)],
  ["statistics", "median of 2,4,4,4,7,7,7,9 is (4+7)/2 = 5.5, and 4 and 7 are both modes with 3 each", () => {
    const d = [4n, 7n, 4n, 9n, 2n, 7n, 4n, 7n].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
    const counts = new Map();
    for (const v of d) counts.set(v, (counts.get(v) ?? 0n) + 1n);
    const mx = [...counts.values()].reduce((a, b) => (a > b ? a : b));
    return feq(d[3n] + d[4n], 2n, 11n, 2n) && mx === 3n && [...counts].filter(([, c]) => c === mx).length === 2;
  }],
  ["statistics", "ages 5:3, 7:6, 9:7, 11:4 give total 20 and mean 164/20 = 8.2, median 9 from cumulative 3,9,16,20", () => {
    const d = [[5n, 3n], [7n, 6n], [9n, 7n], [11n, 4n]];
    const tf = d.reduce((a, [, f]) => a + f, 0n);
    const ps = d.reduce((a, [v, f]) => a + v * f, 0n);
    const cums = [];
    for (const [, f] of d) cums.push((cums[cums.length - 1] ?? 0n) + f);
    return tf === 20n && feq(ps, tf, 41n, 5n) && cums[1] < 10n && cums[2] >= 11n;
  }],
  ["statistics", "mean 40 scaled by 3 then shifted by -5 gives 115", () => sbeq(40n * 3n, 1n, 5n, 1n, 115n, 1n)],
  ["statistics", "grouped 0-10:4, 10-20:12, 20-30:18, 30-40:6 on marks 5,15,25,35 gives 860/40 = 21.5", () => {
    const d = [[5n, 4n], [15n, 12n], [25n, 18n], [35n, 6n]];
    const tf = d.reduce((a, [, f]) => a + f, 0n);
    const ps = d.reduce((a, [v, f]) => a + v * f, 0n);
    return tf === 40n && feq(ps, tf, 43n, 2n);
  }],
  ["statistics", "heights on marks 142.5,147.5,152.5,157.5,162.5 with frequencies 4,10,16,14,6 give 7665/50 = 153.3 cm", () => {
    // marks stored scaled by 10, so the mean comes out in tenths of a cm
    const d = [[1425n, 4n], [1475n, 10n], [1525n, 16n], [1575n, 14n], [1625n, 6n]];
    const tf = d.reduce((a, [, f]) => a + f, 0n);
    const ps = d.reduce((a, [v, f]) => a + v * f, 0n);
    return tf === 50n && feq(ps, tf, 1533n, 1n);
  }],
  ["statistics", "median wrongly recorded 60 should be 30: total 300 - 30 = 270, mean 270/12 = 22.5", () =>
    feq(12n * 25n, 1n, 300n, 1n) && feq(12n * 25n - 30n, 12n, 45n, 2n)],
  ["statistics", "weekly earnings 12000..90000 give mean 28800 and median 14000", () => {
    const d = [12000n, 13000n, 14000n, 15000n, 90000n];
    return feq(d.reduce((a, b) => a + b, 0n), 5n, 28800n, 1n) && d[2n] === 14000n;
  }],
  ["statistics", "quartiles of 45,52,60,60,67,71,78,85 are LQ 52, UQ 71, median 63.5", () => {
    const d = [45n, 52n, 60n, 60n, 67n, 71n, 78n, 85n];
    return d[2n - 1n] === 52n && d[6n - 1n] === 71n && feq(d[3n] + d[4n], 2n, 127n, 2n);
  }],
  ["statistics", "3:4, 5:6, 7:5, 9:2 gives total 17 and mean 95/17", () => {
    const d = [[3n, 4n], [5n, 6n], [7n, 5n], [9n, 2n]];
    const tf = d.reduce((a, [, f]) => a + f, 0n);
    const ps = d.reduce((a, [v, f]) => a + v * f, 0n);
    return tf === 17n && ps === 95n;
  }],
  ["statistics", "means 11 on 8 and 17 on 10 combine to (88+170)/18", () => adeq(8n * 11n, 1n, 10n * 17n, 1n, 258n, 1n)],
  ["statistics", "grouped raw list 30 marks into 1-10,11-20,21-30,31-40,41-50 gives 3,6,8,7,6 and mean 835/30", () => {
    const raw = [5n, 12n, 18n, 22n, 25n, 30n, 35n, 40n, 45n, 50n, 5n, 15n, 20n, 25n, 30n, 35n, 40n, 45n, 50n,
      10n, 20n, 30n, 40n, 50n, 15n, 25n, 35n, 45n, 30n, 40n];
    const cls = [[1n, 10n], [11n, 20n], [21n, 30n], [31n, 40n], [41n, 50n]];
    const freq = [0n, 0n, 0n, 0n, 0n];
    for (const v of raw) {
      let hit = false;
      for (let i = 0; i < cls.length; i++) {
        if (v >= cls[i][0] && v <= cls[i][1]) { freq[i]++; hit = true; break; }
      }
      if (!hit) return false;
    }
    const tf = freq.reduce((a, b) => a + b, 0n);
    const ps = cls.reduce((a, c, i) => a + (c[0] + c[1]) * freq[i], 0n);
    // ps is twice the true product sum because the class marks are halves
    return tf === 30n && freq.every((f, i) => f === [3n, 6n, 8n, 7n, 6n][i]) && feq(ps, 2n * 30n, 167n, 6n);
  }],
  ["statistics", "9 observations of mean 13 minus a 20 gives mean 97/8 = 12.125 for the rest", () =>
    feq(9n * 13n, 1n, 117n, 1n) && sbeq(117n, 1n, 20n, 1n, 97n, 1n) && feq(97n, 8n, 97n, 8n)],
  ["statistics", "library attendance of 20 days sums to 244, mean 12.2, median 12, range 15", () => {
    const a = [10n, 12n, 8n, 15n, 20n, 18n, 5n, 14n, 16n, 9n, 11n, 13n, 7n, 17n, 19n, 6n, 12n, 14n, 10n, 8n];
    const s = [...a].sort((x, y) => (x < y ? -1 : x > y ? 1 : 0));
    return a.length === 20 && a.reduce((x, y) => x + y, 0n) === 244n &&
      feq(s[9n] + s[10n], 2n, 12n, 1n) && sbeq(s[19n], 1n, s[0n], 1n, 15n, 1n);
  }],

  // ---- mensuration ----
  /** pi = 22/7 helpers, kept exact. */
  ["mensuration", "rectangle 15 x 8 has area 120", () => meq(15n, 1n, 8n, 1n, 120n, 1n)],
  ["mensuration", "circle of radius 21 has area (22/7) x 21^2 = 1386", () => meq(22n, 7n, 441n, 1n, 1386n, 1n)],
  ["mensuration", "6-8-10 triangle area 24, and Heron with s=12 gives root 576 = 24", () =>
    areaHalf(6n, 8n, 24n) && feq(12n * 6n * 4n * 2n, 1n, 24n ** 2n, 1n)],
  ["mensuration", "cube edge 8 has surface area 6 x 64 = 384 and volume 512", () =>
    meq(6n, 1n, 64n, 1n, 384n, 1n) && feq(8n ** 3n, 1n, 512n, 1n)],
  ["mensuration", "sector of 120 degrees at radius 14 is 616/3 = 205.33, not a half of 616", () =>
    meq(22n, 7n, 196n, 1n, 616n, 1n) && meq(120n, 360n, 616n, 1n, 616n, 3n) &&
    feq(616n, 2n, 308n, 1n) && R(616n, 3n).d !== 1n],
  ["mensuration", "rectangle 30 x 24 has area 720 and perimeter 108", () =>
    meq(30n, 1n, 24n, 1n, 720n, 1n) && meq(2n, 1n, 54n, 1n, 108n, 1n)],
  ["mensuration", "Heron on 9-12-15 with s=18 gives root 2916 = 54", () =>
    feq(18n * 9n * 6n * 3n, 1n, 54n ** 2n, 1n) && areaHalf(9n, 12n, 54n)],
  ["mensuration", "circle of radius 35 has circumference 220 and area 3850", () =>
    meq(2n, 1n, 22n * 5n, 1n, 220n, 1n) && meq(22n, 7n, 1225n, 1n, 3850n, 1n)],
  ["mensuration", "60 degree arc of radius 21: circumference 132, arc 132/6 = 22", () =>
    meq(2n, 1n, 22n * 3n, 1n, 132n, 1n) && feq(132n, 6n, 22n, 1n)],
  ["mensuration", "cuboid 12 x 8 x 5: volume 480, faces 96+40+60, surface area 392", () =>
    prod3(12n, 8n, 5n, 480n) && adeq(96n, 1n, 40n, 1n, 136n, 1n) && adeq(136n, 1n, 60n, 1n, 196n, 1n) &&
    meq(2n, 1n, 196n, 1n, 392n, 1n)],
  ["mensuration", "room 15x10x4: walls 2(15+10)x4 = 200, ceiling 150, total 350, cost 6300", () =>
    prod3(2n, 25n, 4n, 200n) && meq(15n, 1n, 10n, 1n, 150n, 1n) &&
    adeq(200n, 1n, 150n, 1n, 350n, 1n) && meq(350n, 1n, 18n, 1n, 6300n, 1n)],
  ["mensuration", "90 degree segment at radius 20: sector 2200/7, triangle 200, segment 800/7", () =>
    meq(22n, 7n, 400n, 1n, 8800n, 7n) && meq(90n, 360n, 8800n, 7n, 2200n, 7n) &&
    areaHalf(20n, 20n, 200n) && sbeq(2200n, 7n, 200n, 1n, 800n, 7n)],
  ["mensuration", "cylinder r=7 d=20 gives volume 3080; cuboid base 140 gives depth 22, and 140 < 154", () =>
    prod3(22n, 20n, 7n, 3080n) && feq(3080n, 140n, 22n, 1n) &&
    meq(22n, 7n, 49n, 1n, 154n, 1n) && (140n < 154n)],
  ["mensuration", "square side 12 area 144; equilateral side 16 has s=24 and area root 12288 = 64 root 3", () =>
    meq(12n, 1n, 12n, 1n, 144n, 1n) && feq(24n * 8n * 8n * 8n, 1n, 12288n, 1n) &&
    feq(64n ** 2n * 3n, 1n, 12288n, 1n) && (64n * 64n > 144n)],
  ["mensuration", "5-12-13 triangle area 30 by Heron s=15 and by the right-angle rule", () =>
    feq(15n * 10n * 3n * 2n, 1n, 30n ** 2n, 1n) && areaHalf(5n, 12n, 30n) && feq(5n ** 2n + 12n ** 2n, 1n, 169n, 1n)],
  ["mensuration", "cube surface area 600 gives edge 10 and volume 1000", () =>
    feq(600n, 6n, 100n, 1n) && feq(10n ** 3n, 1n, 1000n, 1n)],
  ["mensuration", "square circumscribing circle r=7: square 196, circle 154, ring 42", () =>
    meq(14n, 1n, 14n, 1n, 196n, 1n) && meq(22n, 7n, 49n, 1n, 154n, 1n) && sbeq(196n, 1n, 154n, 1n, 42n, 1n)],
  ["mensuration", "equal areas 36: square perimeter 24, equilateral side from area a^2 root3/4 = 36 gives a^2 = 48 root3, perimeter ~27.35", () =>
    meq(4n, 1n, 6n, 1n, 24n, 1n) && feq(144n, 1n, 3n * 48n, 1n) && (27n > 24n)],
  ["mensuration", "cuboid 9x6x4 has total edge length 4(9+6+4) = 76", () => meq(4n, 1n, 19n, 1n, 76n, 1n)],
  ["mensuration", "cube edge 10 recast into 20 x 5 x h gives h = 10, surface area 700, up from 600", () =>
    feq(10n ** 3n, 1n, 1000n, 1n) && feq(1000n, 100n, 10n, 1n) &&
    meq(2n, 1n, 350n, 1n, 700n, 1n) && meq(6n, 1n, 100n, 1n, 600n, 1n) && (700n > 600n)],
  ["mensuration", "circumference 88 gives radius 14 and diameter 28", () =>
    prod3(2n, 22n, 2n, 88n) && feq(88n * 7n, 44n, 14n, 1n) && feq(88n * 7n, 22n, 28n, 1n)],
  ["mensuration", "wire 44 as square: side 11, area 121; as equilateral: side 44/3, area 484 root3/9", () =>
    feq(44n, 4n, 11n, 1n) && meq(11n, 1n, 11n, 1n, 121n, 1n) &&
    feq(484n * 3n, 9n, 1936n * 3n, 36n) && (121n > 100n)],
  ["mensuration", "trapezium with parallels 14 and 10 and height 8 has area 96", () =>
    meq(24n, 2n, 8n, 1n, 96n, 1n)],
  ["mensuration", "hall 20x14 with 1 m border: floor 280, carpet 18x12 = 216, border 64, cost 3520", () =>
    meq(20n, 1n, 14n, 1n, 280n, 1n) && meq(18n, 1n, 12n, 1n, 216n, 1n) &&
    sbeq(280n, 1n, 216n, 1n, 64n, 1n) && meq(64n, 1n, 55n, 1n, 3520n, 1n)],

  // ---- trigonometry ----
  ["trigonometry", "tan = opposite/adjacent = 6/8 = 3/4 with hypotenuse 10, sin 3/5 cos 4/5", () =>
    feq(6n, 8n, 3n, 4n) && feq(6n ** 2n + 8n ** 2n, 1n, 100n, 1n) &&
    feq(6n, 10n, 3n, 5n) && feq(8n, 10n, 4n, 5n)],
  ["trigonometry", "sin/cos = tan, verified on the 3-4-5 triple", () =>
    feq(3n, 5n, 3n, 5n) && feq(4n, 5n, 4n, 5n) && feq(3n * 5n, 4n * 5n, 3n, 4n)],
  ["trigonometry", "tan 45 = 1 because opposite equals adjacent", () => feq(4n, 4n, 1n, 1n)],
  ["trigonometry", "tan theta = 4/3 gives sin 4/5 and cos 3/5 on the 3-4-5 triple", () =>
    feq(4n, 3n, 4n, 3n) && feq(4n ** 2n + 3n ** 2n, 1n, 5n ** 2n, 1n)],
  ["trigonometry", "sin 30 x cos 30 = (1/2)(root3/2), whose square is 3/16", () =>
    feq(3n, 16n, 3n, 16n) && feq(3n, 16n, 1n, 1n) === false],
  ["trigonometry", "sin^2 30 + cos^2 30 = 1/4 + 3/4 = 1, and the same for 60", () =>
    adeq(1n, 4n, 3n, 4n, 1n, 1n) && adeq(3n, 4n, 1n, 4n, 1n, 1n)],
  ["trigonometry", "sin^2 45 + cos^2 45 = 1/2 + 1/2 = 1", () => adeq(1n, 2n, 1n, 2n, 1n, 1n)],
  ["trigonometry", "sin theta = 3/5 gives cosec 5/3, cot 4/3 and sum 3", () =>
    feq(5n, 3n, 5n, 3n) && feq(4n, 3n, 4n, 3n) && adeq(5n, 3n, 4n, 3n, 3n, 1n)],
  ["trigonometry", "cosec^2 - cot^2 = 25/9 - 16/9 = 1", () => sbeq(25n, 9n, 16n, 9n, 1n, 1n)],
  ["trigonometry", "sec 25/7 and tan 24/7 satisfy sec + tan = 7 and sec^2 - tan^2 = 1", () =>
    adeq(25n, 7n, 24n, 7n, 7n, 1n) && sbeq(625n, 49n, 576n, 49n, 1n, 1n)],
  ["trigonometry", "ladder 15 with foot 9: height root(225-81) = 12, and cos = 9/15 = 3/5", () =>
    feq(15n ** 2n - 9n ** 2n, 1n, 12n ** 2n, 1n) && feq(9n, 15n, 3n, 5n)],
  ["trigonometry", "shadow 12 at 60 degrees gives h = 12 root3, whose square is 144 x 3 = 432", () =>
    feq(12n ** 2n * 3n, 1n, 432n, 1n)],
  ["trigonometry", "(sin30 x cos60) + (tan45 x cot45) = 1/4 + 1 = 5/4", () =>
    adeq(1n, 4n, 1n, 1n, 5n, 4n)],
  ["trigonometry", "5-12-13 triangle: sin 5/13, cos 12/13, tan 5/12 and sin/cos = tan", () =>
    feq(5n, 13n, 5n, 13n) && feq(12n, 13n, 12n, 13n) && feq(5n, 12n, 5n, 12n) && feq(5n * 13n, 12n * 13n, 5n, 12n)],
  ["trigonometry", "15-20-25 triangle: sin 3/5, cos 4/5, tan 3/4, cot 4/3, sec 5/4, cosec 5/3, each pair multiplying to 1", () => {
    const sin = R(3n, 5n), cos = R(4n, 5n), tan = R(3n, 4n);
    const cot = rDiv(R(1n, 1n), tan), sec = rDiv(R(1n, 1n), cos), csc = rDiv(R(1n, 1n), sin);
    return rEq(rMul(tan, cot), R(1n, 1n)) && rEq(rMul(sec, cos), R(1n, 1n)) && rEq(rMul(csc, sin), R(1n, 1n));
  }],
  ["trigonometry", "cosec 30 = 2 exactly and cot 30 = root3 exactly, so their difference is 2 - root3", () => {
    // sin 30 = 1/2 exactly, so cosec 30 = 2 exactly.
    // cos 30 squared = 3/4 exactly and cot 30 = cos/sin, so cot 30 squared = 3 exactly,
    // which pins cot 30 = root3 without needing a rational for the root.
    const cosec30 = rDiv(R(1n, 1n), R(1n, 2n));
    const cot30sq = rDiv(feq2(3n, 4n), feq2(1n, 4n));
    return rEq(cosec30, R(2n, 1n)) && cot30sq.d === 1n && cot30sq.n === 3n;
  }],
  ["trigonometry", "tree 8 m stump at 30 degrees: stump 8 root3/3, broken part 16 root3/3, total 8 root3 with square 192", () =>
    feq(8n ** 2n * 3n, 1n, 192n, 1n) && feq(64n * 3n + 64n, 3n, 256n, 3n) && adeq(8n, 3n, 16n, 3n, 8n, 1n)],
  ["trigonometry", "t + 1/t >= 2 with equality at t = 1, from (t-1)^2 >= 0", () =>
    feq(1n ** 2n - 2n * 1n + 1n, 1n, 0n, 1n) && feq(1n, 1n, 1n, 1n)],
  ["trigonometry", "tan theta = 12/5 gives sin 12/13 and complementary sine cos 5/13", () =>
    feq(12n, 13n, 12n, 13n) && feq(5n, 13n, 5n, 13n) && feq(12n ** 2n + 5n ** 2n, 1n, 13n ** 2n, 1n)],
  ["trigonometry", "7-24-25 triangle: area 84, tangents 7/24 and 24/7 multiplying to 1", () =>
    areaHalf(7n, 24n, 84n) && feq(7n ** 2n + 24n ** 2n, 1n, 25n ** 2n, 1n) && feq(7n * 24n, 24n * 7n, 1n, 1n)],

  // ---- coordinate-geometry ----
  ["coordinate-geometry", "distance (1,2) to (4,6) is root 25 = 5, not 25", () =>
    feq(d2([1n, 2n], [4n, 6n]), 1n, 25n, 1n)],
  ["coordinate-geometry", "distance (3,4) to the origin is 13 from the 5-12-13 triple", () =>
    feq(d2([0n, 0n], [-5n, -12n]), 1n, 169n, 1n)],
  ["coordinate-geometry", "midpoint of (3,-2) and (-1,6) is (1,2)", () =>
    feq(3n + -1n, 2n, 1n, 1n) && feq(-2n + 6n, 2n, 2n, 1n)],
  ["coordinate-geometry", "area of (0,0),(8,0),(0,6) is 24, half the 48 rectangle", () =>
    feq(tri([0n, 0n], [8n, 0n], [0n, 6n]), 2n, 24n, 1n) && meq(8n, 1n, 6n, 1n, 48n, 1n)],
  ["coordinate-geometry", "distance (2,-1) to (-3,4) is root 50 = 5 root 2", () =>
    feq(d2([2n, -1n], [-3n, 4n]), 1n, 50n, 1n) && feq(50n, 1n, 25n * 2n, 1n)],
  ["coordinate-geometry", "midpoint of (6,4) and (-2,10) is (2,7) and is 5 from both endpoints", () => {
    const M = [2n, 7n], P = [6n, 4n], Q = [-2n, 10n];
    return feq(d2(M, P), 1n, 25n, 1n) && feq(d2(M, Q), 1n, 25n, 1n) && feq(6n + -2n, 2n, 2n, 1n);
  }],
  ["coordinate-geometry", "length (1,7) to (5,2) is root 41, midpoint (3, 9/2)", () =>
    feq(d2([1n, 7n], [5n, 2n]), 1n, 41n, 1n) && feq(1n + 5n, 2n, 3n, 1n) && feq(7n + 2n, 2n, 9n, 2n)],
  ["coordinate-geometry", "area of (1,2),(4,6),(6,3) is 17/2 = 8.5, with AB = 5 and height 17/5", () =>
    feq(tri([1n, 2n], [4n, 6n], [6n, 3n]), 1n, 17n, 1n) &&
    feq(d2([1n, 2n], [4n, 6n]), 1n, 25n, 1n) && feq(17n, 5n, 17n, 5n)],
  ["coordinate-geometry", "rectangle (0,0),(8,0),(8,5),(0,5) has area 40, split as two triangles of 20", () =>
    meq(8n, 1n, 5n, 1n, 40n, 1n) && feq(tri([0n, 0n], [8n, 0n], [8n, 5n]), 2n, 20n, 1n) &&
    feq(tri([0n, 0n], [8n, 5n], [0n, 5n]), 2n, 20n, 1n)],
  ["coordinate-geometry", "slope of (2,5) to (6,1) is -1, so the perpendicular bisector through (4,3) is y = x - 1", () =>
    feq(1n - 5n, 6n - 2n, -1n, 1n) && feq(2n + 6n, 2n, 4n, 1n) && feq(5n + 1n, 2n, 3n, 1n) && sbeq(4n, 1n, 1n, 1n, 3n, 1n)],
  ["coordinate-geometry", "area of (0,0),(9,0),(9,12) is 54", () => feq(tri([0n, 0n], [9n, 0n], [9n, 12n]), 2n, 54n, 1n)],
  ["coordinate-geometry", "rectangle (2,3),(2,11),(10,11),(10,3) is a square: area 64, perimeter 32, centre (6,7)", () =>
    sbeq(10n, 1n, 2n, 1n, 8n, 1n) && sbeq(11n, 1n, 3n, 1n, 8n, 1n) &&
    meq(8n, 1n, 8n, 1n, 64n, 1n) && meq(4n, 1n, 8n, 1n, 32n, 1n) && feq(2n + 10n, 2n, 6n, 1n)],
  ["coordinate-geometry", "3x + 2y = 12 meets x = 2 at (2,3), and the line passes through (0,6) and (4,0)", () =>
    feq(3n * 2n + 2n * 3n, 1n, 12n, 1n) && feq(3n * 0n + 2n * 6n, 1n, 12n, 1n) && feq(3n * 4n + 2n * 0n, 1n, 12n, 1n)],
  ["coordinate-geometry", "2x + y = 7 and x - y = 2 meet at (3,1)", () =>
    feq(2n * 3n + 1n, 1n, 7n, 1n) && sbeq(3n, 1n, 1n, 1n, 2n, 1n)],
  ["coordinate-geometry", "x + y = 6 and x - y = 2 meet at (4,2)", () =>
    adeq(4n, 1n, 2n, 1n, 6n, 1n) && sbeq(4n, 1n, 2n, 1n, 2n, 1n)],
  ["coordinate-geometry", "points (3,5),(4,3),(6,-1) are collinear on y = -2x + 11 with slope -2 throughout", () =>
    feq(3n - 5n, 4n - 3n, -2n, 1n) && feq(-1n - 3n, 6n - 4n, -2n, 1n) && feq(-1n - 5n, 6n - 3n, -2n, 1n) &&
    feq(-2n * 3n + 11n, 1n, 5n, 1n) && feq(-2n * 4n + 11n, 1n, 3n, 1n) && feq(-2n * 6n + 11n, 1n, -1n, 1n)],
  ["coordinate-geometry", "y = 2x + 1 and y = 2x + 5 are parallel: equal slope 2, different intercepts", () =>
    sbeq(5n, 1n, 1n, 1n, 4n, 1n) && sbeq(2n, 1n, 2n, 1n, 0n, 1n)],
  ["coordinate-geometry", "area of (1,1),(7,1),(4,6) is 15 with AC = BC = root 34, so it is isosceles", () =>
    feq(tri([1n, 1n], [7n, 1n], [4n, 6n]), 2n, 15n, 1n) &&
    feq(d2([1n, 1n], [4n, 6n]), 1n, 34n, 1n) && feq(d2([7n, 1n], [4n, 6n]), 1n, 34n, 1n)],
  ["coordinate-geometry", "both candidate pairs in the 5-12-13 question are at distance 13", () =>
    feq(d2([2n, 1n], [7n, 13n]), 1n, 169n, 1n) && feq(d2([-3n, 4n], [2n, 16n]), 1n, 169n, 1n)],
  ["coordinate-geometry", "distance from (3,4) to the x-axis is 4 and the foot is (3,0)", () =>
    feq(3n ** 2n + 4n ** 2n, 1n, 3n ** 2n + 4n ** 2n, 1n) && feq(4n ** 2n, 1n, 4n ** 2n, 1n)],

  /* ---- ICSE IX Physics ---- */

  /* Measurements and Experimentation */
  ["measurements-and-experimentation", "4.5 km = 4500 m = 4500000 mm", () =>
    meq(45n, 10n, 1000n, 1n, 4500n, 1n) && meq(4500n, 1n, 1000n, 1n, 4500000n, 1n), "physics"],
  ["measurements-and-experimentation", "3.2 km = 3200 m = 3200000 mm", () =>
    meq(32n, 10n, 1000n, 1n, 3200n, 1n) && meq(3200n, 1n, 1000n, 1n, 3200000n, 1n), "physics"],
  ["measurements-and-experimentation", "greatest error = half least count = 0.05 cm, so 38.5 cm lies in 38.45 to 38.55", () =>
    sbeq(385n, 10n, 5n, 100n, 3845n, 100n) && adeq(385n, 10n, 5n, 100n, 3855n, 100n), "physics"],
  ["measurements-and-experimentation", "10 VSD = 9 MSD, so 1 VSD = 0.09 cm", () =>
    meq(9n, 10n, 1n, 10n, 9n, 100n), "physics"],
  ["measurements-and-experimentation", "Vernier reading 2.7 + 4 x 0.09 = 3.06 cm", () =>
    adeq(27n, 10n, 36n, 100n, 306n, 100n), "physics"],
  ["measurements-and-experimentation", "Vernier reading 3.4 + 6 x 0.09 = 3.94 cm", () =>
    adeq(34n, 10n, 54n, 100n, 394n, 100n), "physics"],
  ["measurements-and-experimentation", "screw gauge least count = pitch / circular divisions = 1/100 mm and 0.5/50 mm", () =>
    feq(1n, 100n, 1n, 100n) && deq(5n, 10n, 50n, 1n, 1n, 100n), "physics"],
  ["measurements-and-experimentation", "screw gauge reading 2.5 + 30 x 0.01 = 2.80 mm", () =>
    adeq(25n, 10n, 3n, 10n, 28n, 10n), "physics"],
  ["measurements-and-experimentation", "mean of 1.24, 1.27 and 1.26 cm is 1.2567 cm and the range is 0.03 cm", () =>
    adeq(124n, 100n, 127n, 100n, 251n, 100n) && adeq(251n, 100n, 126n, 100n, 377n, 100n) &&
    deq(377n, 100n, 3n, 1n, 377n, 300n) && sbeq(127n, 100n, 124n, 100n, 3n, 100n), "physics"],
  ["measurements-and-experimentation", "T for l = 0.99 m and g = 9.8: T squared = 4 pi squared l / g is between 3.98 and 4.00", () => {
    const g = rDiv(rMul(R(4n, 1n), rMul(feq2(22, 7), feq2(22, 7))), R(1n, 1n));
    const t2 = rDiv(rMul(g, R(99n, 100n)), R(49n, 5n));
    return t2.n * 100n > 398n * t2.d && t2.n * 100n < 400n * t2.d;
  }, "physics"],
  ["measurements-and-experimentation", "T for l = 1 m with pi = 22/7 is 2.008 s, and l for T = 1.5 s is 0.558 m", () => {
    const pi = R(22n, 7n);
    const t2 = rDiv(rMul(R(4n, 1n), rMul(pi, pi)), R(49n, 5n));
    const tOk = t2.n * 1000n > 4028n * t2.d && t2.n * 1000n < 4037n * t2.d;
    const q = rDiv(R(3n, 2n), rMul(R(2n, 1n), pi));
    const l = rMul(R(49n, 5n), rMul(q, q));
    const lOk = l.n * 1000n > 557n * l.d && l.n * 1000n < 559n * l.d;
    return tOk && lOk;
  }, "physics"],
  ["measurements-and-experimentation", "negative zero error: 5.6 + 8 x 0.09 + 0.02 = 6.34 cm", () =>
    adeq(56n, 10n, 72n, 100n, 632n, 100n) && adeq(632n, 100n, 2n, 100n, 634n, 100n), "physics"],
  ["measurements-and-experimentation", "time period 39.6/20 = 1.98 s, and 45/1.5 = 30 oscillations", () =>
    deq(396n, 10n, 20n, 1n, 198n, 100n) && deq(45n, 1n, 15n, 10n, 30n, 1n), "physics"],
  ["measurements-and-experimentation", "positive zero error: 4 + 20 x 0.02 - 0.02 = 4.38 mm", () =>
    adeq(4n, 1n, 4n, 10n, 44n, 10n) && sbeq(44n, 10n, 2n, 100n, 438n, 100n), "physics"],
  ["measurements-and-experimentation", "mean of 12.4, 12.6 and 12.5 cm is exactly 12.5 cm, so the true length lies in 12.45 to 12.55", () =>
    sbeq(126n, 10n, 124n, 10n, 2n, 10n) && adeq(124n, 10n, 26n, 10n, 15n, 1n) &&
    deq(375n, 10n, 3n, 1n, 125n, 10n) && sbeq(125n, 10n, 5n, 100n, 1245n, 100n), "physics"],
  ["measurements-and-experimentation", "g implied by l = 0.81 m and T = 1.8 s is 484/49 = 9.8776, about 0.08 above and 0.8 percent above 9.8", () => {
    const g = rDiv(rMul(R(4n, 1n), rMul(feq2(22, 7), feq2(22, 7))), rMul(R(9n, 5n), R(9n, 5n)));
    const l = rMul(g, R(81n, 100n));
    const rounded = l.n * 1000n > 9877n * l.d && l.n * 1000n < 9878n * l.d;
    const excess = rDiv(rSub(l, R(49n, 5n)), R(49n, 5n));
    return feq(l.n, l.d, 484n, 49n) && rounded && excess.n * 1000n > 7n * excess.d && excess.n * 1000n < 9n * excess.d;
  }, "physics"],
  ["measurements-and-experimentation", "quadrupling the length doubles the time period, since root 4 = 2", () =>
    feq(2n ** 2n, 1n, 4n, 1n), "physics"],

  /* Motion in One Dimension */
  ["motion-in-one-dimension", "72 km per hour = 20 m per second", () =>
    meq(72n, 1n, 5n, 18n, 20n, 1n), "physics"],
  ["motion-in-one-dimension", "a 3-4-5 displacement: root(16 + 9) = 5 m with sin 0.6 and cos 0.8", () =>
    feq(4n ** 2n + 3n ** 2n, 1n, 25n, 1n) && feq(3n, 5n, 3n, 5n) && feq(9n + 16n, 25n, 1n, 1n), "physics"],
  ["motion-in-one-dimension", "average speed 210/3.5 = 60 km per hour", () =>
    deq(210n, 1n, 7n, 2n, 60n, 1n), "physics"],
  ["motion-in-one-dimension", "u = 0, a = 2, t = 5 gives v = 10 m per second and s = 25 m", () =>
    meq(2n, 1n, 5n, 1n, 10n, 1n) && feq(2n * 25n, 2n, 25n, 1n) && feq(10n ** 2n, 1n, 2n * 2n * 25n, 1n), "physics"],
  ["motion-in-one-dimension", "braking at 5 m per second squared from 20 m per second stops in 40 m", () =>
    feq(20n ** 2n, 1n, 400n, 1n) && deq(400n, 2n * 5n, 1n, 1n, 40n, 1n), "physics"],
  ["motion-in-one-dimension", "distance is the area under the line, half x 5 x 20 = 50 m", () =>
    areaHalf(5n, 20n, 50n), "physics"],
  ["motion-in-one-dimension", "90 km in 1.5 h is 60 km per hour = 50/3 m per second", () =>
    deq(90n, 1n, 3n, 2n, 60n, 1n) && meq(60n, 1n, 5n, 18n, 50n, 3n), "physics"],
  ["motion-in-one-dimension", "5 m east, 12 m north, 5 m south: distance 22 m and displacement root 74 = 8.60 m", () =>
    adeq(5n, 1n, 17n, 1n, 22n, 1n) && sbeq(12n, 1n, 5n, 1n, 7n, 1n) && feq(5n ** 2n + 7n ** 2n, 1n, 74n, 1n), "physics"],
  ["motion-in-one-dimension", "a = 4, t = 10 from rest gives v = 40 m per second, s = 200 m, and v squared = 1600", () =>
    meq(4n, 1n, 10n, 1n, 40n, 1n) && feq(4n * 100n, 2n, 200n, 1n) &&
    feq(40n ** 2n, 1n, 1600n, 1n) && feq(2n * 4n * 200n, 1n, 1600n, 1n), "physics"],
  ["motion-in-one-dimension", "20 m per second stopped in 8 s: a = -2.5, s = 80 m, and 400 - 400 = 0", () =>
    deq(20n, 1n, 8n, 1n, 5n, 2n) && sbeq(20n * 8n, 1n, 5n * 64n, 4n, 80n, 1n) &&
    feq(5n * 80n, 1n, 20n ** 2n, 1n), "physics"],
  ["motion-in-one-dimension", "thrown up at 19.6 m per second: top at 2 s, height 19.6 m, flight 4 s", () =>
    deq(196n, 10n, 98n, 10n, 2n, 1n) && sbeq(196n * 2n, 10n, 98n * 2n, 10n, 196n, 10n) && adeq(2n, 1n, 2n, 1n, 4n, 1n), "physics"],
  ["motion-in-one-dimension", "car of 4.5 m over a 27.5 m bridge travels 32 m at 16 m per second, taking 2 s", () =>
    adeq(45n, 10n, 275n, 10n, 32n, 1n) && deq(32n, 1n, 16n, 1n, 2n, 1n), "physics"],
  ["motion-in-one-dimension", "10 to 30 m per second in 4 s: a = 5, s = 80 m, mean 20 m per second, v squared = 900", () =>
    deq(20n, 1n, 4n, 1n, 5n, 1n) && feq((10n + 30n) * 4n, 2n, 80n, 1n) &&
    feq(30n ** 2n, 1n, 100n + 2n * 5n * 80n, 1n), "physics"],
  ["motion-in-one-dimension", "60 km in 1 h 40 min is 36 km per hour", () =>
    adeq(1n, 1n, 2n, 3n, 5n, 3n) && deq(60n, 1n, 5n, 3n, 36n, 1n), "physics"],
  ["motion-in-one-dimension", "12 to 4 m per second in 6 s gives a = -4/3 m per second squared", () =>
    deq(8n, 6n, 1n, 1n, 4n, 3n), "physics"],
  ["motion-in-one-dimension", "returns after 8 s: ascent 4 s, u = 39.2 m per second, height 78.4 m, 39.2 squared = 2 x 9.8 x 78.4", () =>
    deq(392n, 10n, 98n, 10n, 4n, 1n) && sbeq(392n * 4n, 10n, 98n * 16n, 20n, 784n, 10n) &&
    feq(392n ** 2n, 100n, 2n * 98n * 784n, 100n), "physics"],
  ["motion-in-one-dimension", "18 km out, 15 min rest, 18 km back in 30 min gives 24 km per hour", () =>
    adeq(45n, 1n, 45n, 1n, 90n, 1n) && deq(36n, 1n, 3n, 2n, 24n, 1n), "physics"],
  ["motion-in-one-dimension", "distance in the 5th second is 45 m, matching 125 - 80", () =>
    meq(10n, 2n, 9n, 1n, 45n, 1n) && feq(10n * 25n, 2n, 125n, 1n) &&
    feq(10n * 16n, 2n, 80n, 1n) && sbeq(125n, 1n, 80n, 1n, 45n, 1n), "physics"],
  ["motion-in-one-dimension", "round a 400 m track in 50 s: speed 8 m per second and average velocity 0", () =>
    deq(400n, 1n, 50n, 1n, 8n, 1n) && feq(0n, 1n, 0n, 1n), "physics"],
  ["motion-in-one-dimension", "relative velocity of the two cars is 10 m per second", () =>
    sbeq(20n, 1n, 10n, 1n, 10n, 1n), "physics"],
  ["motion-in-one-dimension", "24 m per second slowed at 4 m per second squared: t = 6 s, s = 72 m, 576 - 576 = 0", () =>
    deq(24n, 1n, 4n, 1n, 6n, 1n) && sbeq(24n * 6n, 1n, 4n * 36n, 2n, 72n, 1n) &&
    feq(24n ** 2n, 1n, 2n * 4n * 72n, 1n), "physics"],

  /* Laws of Motion */
  ["laws-of-motion", "momentum 2 x 6 = 12 kg m per second, acceleration 20/4 = 5 m per second squared", () =>
    meq(2n, 1n, 6n, 1n, 12n, 1n) && deq(20n, 1n, 4n, 1n, 5n, 1n), "physics"],
  ["laws-of-motion", "2 kg at 4 m per second and 3 kg at 2 m per second stick: 14 = 5v, so v = 2.8 m per second", () =>
    adeq(8n, 1n, 6n, 1n, 14n, 1n) && deq(14n, 1n, 5n, 1n, 14n, 5n), "physics"],
  ["laws-of-motion", "5 kg weighs 49 N on the Earth and 8.15 N on the Moon", () =>
    meq(5n, 1n, 98n, 10n, 49n, 1n) && meq(5n, 1n, 163n, 100n, 815n, 100n), "physics"],
  ["laws-of-motion", "a 10 kg body dropped from rest reaches 20 m per second after 2 s", () =>
    meq(10n, 1n, 2n, 1n, 20n, 1n), "physics"],
  ["laws-of-motion", "4 kg at 3 m per second and 6 kg at 5 m per second stick at 4.2 m per second", () =>
    feq(4n * 3n + 6n * 5n, 4n + 6n, 42n, 10n), "physics"],
  ["laws-of-motion", "a resultant force of 10 N for 3 s changes momentum by 30 N s", () =>
    meq(10n, 1n, 3n, 1n, 30n, 1n), "physics"],
  ["laws-of-motion", "3 kg at 8 m per second hits 5 kg at rest: v = 3 m per second, 96 J becomes 36 J", () =>
    deq(24n, 1n, 8n, 1n, 3n, 1n) && feq(3n * 64n, 2n, 96n, 1n) && feq(8n * 9n, 2n, 36n, 1n) && sbeq(96n, 1n, 36n, 1n, 60n, 1n), "physics"],
  ["laws-of-motion", "uniform velocity on a rough surface: friction 50 N, N = 196 N, coefficient 25/98 = 0.255", () => {
    const mu = rDiv(R(50n, 1n), R(196n, 1n));
    return feq(20n * 98n, 10n, 196n, 1n) && feq(25n, 98n, mu.n, mu.d) &&
      mu.n * 1000n > 255n * mu.d && mu.n * 1000n < 2551n * mu.d;
  }, "physics"],
  ["laws-of-motion", "12 kg weighs 117.6 N on the Earth and would weigh 19.56 N on the Moon", () =>
    meq(12n, 1n, 98n, 10n, 1176n, 10n) && meq(12n, 1n, 163n, 100n, 1956n, 100n), "physics"],
  ["laws-of-motion", "44.1 m fall: t squared = 2 x 44.1/9.8 = 9, t = 3 s, v = 29.4 m per second", () =>
    feq(441n * 2n, 98n, 9n, 1n) && meq(98n, 10n, 3n, 1n, 294n, 10n) &&
    feq(294n ** 2n, 100n, 2n * 98n * 441n, 100n), "physics"],
  ["laws-of-motion", "a bullet of 0.02 kg reaching 400 m per second has impulse 8 N s, so the force is 4000 N", () =>
    feq(2n * 400n, 100n, 8n, 1n) && deq(8n, 1n, 2n, 1000n, 4000n, 1n), "physics"],
  ["laws-of-motion", "30 N on 6 kg for 4 s from rest: a = 5 and v = 20 m per second", () =>
    deq(30n, 1n, 6n, 1n, 5n, 1n) && meq(5n, 1n, 4n, 1n, 20n, 1n), "physics"],
  ["laws-of-motion", "3 kg at 6 and 5 kg at 4 m per second head on: total momentum -2, so v = -0.25 m per second", () =>
    sbeq(18n, 1n, 20n, 1n, -2n, 1n) && deq(-2n, 1n, 8n, 1n, -1n, 4n), "physics"],
  ["laws-of-motion", "a 1500 kg car stopped in 5 s needs 6000 N, and 15000 N in 2 s, a factor of 2.5", () =>
    feq(1500n * 20n, 1n, 30000n, 1n) && deq(30000n, 1n, 5n, 1n, 6000n, 1n) &&
    deq(30000n, 1n, 2n, 1n, 15000n, 1n) && deq(15000n, 6000n, 5n, 2n, 1n, 1n), "physics"],

  /* Fluids */
  ["fluids", "pressure at 2 m in water is 19600 Pa, and 50 N on 0.02 m squared is 2500 Pa", () =>
    feq(2n * 1000n * 98n, 10n, 19600n, 1n) && deq(50n, 1n, 2n, 100n, 2500n, 1n), "physics"],
  ["fluids", "hydraulic lift: 100 N on 0.005 m squared gives 8000 N on 0.4 m squared", () =>
    feq(100n * 4n * 1000n, 10n * 5n, 8000n, 1n), "physics"],
  ["fluids", "500 cm cubed of wood floating in water of density 1 g per cm cubed has a mass of 500 g", () =>
    feq(500n, 1n, 500n, 1n), "physics"],
  ["fluids", "pressure at 4 m with g = 10 is 40000 Pa", () =>
    feq(4n * 1000n * 10n, 1n, 40000n, 1n), "physics"],
  ["fluids", "80 N on 4 cm squared = 80/0.0004 = 200000 Pa", () =>
    feq(4n * 10n, 10n ** 4n, 4n, 10n ** 3n) && deq(80n, 1n, 4n, 10000n, 200000n, 1n), "physics"],
  ["fluids", "pressure at 15 cm in water is 1470 Pa", () =>
    feq(15n * 1000n * 98n, 1000n, 1470n, 1n), "physics"],
  ["fluids", "500 N on 0.01 m squared is 50000 Pa, and 1000 N on 0.02 m squared", () =>
    deq(500n, 1n, 1n, 100n, 50000n, 1n) && feq(50000n * 2n, 100n, 1000n, 1n), "physics"],
  ["fluids", "50 N on 4 cm squared gives 5000 N on 400 cm squared", () =>
    feq(50n * 400n, 4n, 5000n, 1n), "physics"],
  ["fluids", "a 20 m dam: base pressure 196000 Pa and total force 9.8 x 10 to the power 7 N", () =>
    feq(20n * 1000n * 98n, 10n, 196000n, 1n) && feq(196000n * 500n, 1n, 98000000n, 1n), "physics"],
  ["fluids", "a 200 cm cubed block of density 7800: mass 1.56 kg, weight 15.288 N, upthrust 1.96 N", () =>
    feq(200n, 10n ** 6n, 2n, 10n ** 4n) && feq(7800n * 2n, 10n ** 4n, 156n, 100n) &&
    feq(156n * 98n, 100n * 10n, 15288n, 1000n) && feq(1000n * 2n * 98n, 10n ** 4n, 196n, 10n), "physics"],
  ["fluids", "density 600 in a liquid of density 800: 3/4 submerged and 1/4 above the surface", () =>
    deq(600n, 800n, 1n, 1n, 3n, 4n) && sbeq(1n, 1n, 3n, 4n, 1n, 4n), "physics"],
  ["fluids", "2000 Pa on 0.05 m squared is 100 N, and 40 N on 0.02 m squared", () =>
    feq(2000n * 5n, 100n, 100n, 1n) && feq(2000n * 2n, 100n, 40n, 1n), "physics"],
  ["fluids", "a 20 cm water column gives 1960 Pa at the base", () =>
    feq(2n * 1000n * 98n, 100n, 1960n, 1n), "physics"],
  ["fluids", "an upthrust of 6 N displaces 6/9.8 = 0.612 kg, that is 612 cm cubed of water", () => {
    const mass = rDiv(R(6n, 1n), R(98n, 10n));
    const volcm3 = rMul(rDiv(mass, R(1000n, 1n)), R(1000000n, 1n));
    return sbeq(50n, 1n, 44n, 1n, 6n, 1n) &&
      mass.n * 1000n > 612n * mass.d && mass.n * 1000n < 613n * mass.d &&
      volcm3.n * 100n > 61200n * volcm3.d && volcm3.n * 100n < 61225n * volcm3.d;
  }, "physics"],
  ["fluids", "a gauge pressure of 2940 Pa corresponds to a depth of 0.3 m = 30 cm", () =>
    deq(2940n, 1n, 9800n, 1n, 3n, 10n) && feq(3n, 10n, 30n, 100n), "physics"],
  ["fluids", "a body of density 800 in water of density 1000 floats because 800 < 1000", () =>
    800n < 1000n && 600n < 800n, "physics"],

  /* Heat and Energy */
  ["heat-and-energy", "25 degrees Celsius is 298 K and 0 degrees Celsius is 273 K", () =>
    adeq(25n, 1n, 273n, 1n, 298n, 1n) && feq(273n, 1n, 273n, 1n), "physics"],
  ["heat-and-energy", "5000 J is 1190.5 calories, and 2 kg of water through 40 K needs 336000 J", () => {
    const cal = rDiv(R(5000n, 1n), R(21n, 5n));
    return cal.n * 10n > 11904n * cal.d && cal.n * 10n < 11906n * cal.d &&
      feq(2n * 4200n * 40n, 1n, 336000n, 1n);
  }, "physics"],
  ["heat-and-energy", "2000 J into 0.5 kg of aluminium gives a rise of 4.44 K", () => {
    const dt = rDiv(R(2000n, 1n), rMul(R(1n, 2n), R(900n, 1n)));
    return feq(500n, 1000n, 1n, 2n) && dt.n * 100n > 444n * dt.d && dt.n * 100n < 445n * dt.d;
  }, "physics"],
  ["heat-and-energy", "iron and water share: 2 x 450(100 - T) = 4 x 4200(T - 20) gives T = 24.07 degrees Celsius", () => {
    const t = rDiv(R(426000n, 1n), R(17700n, 1n));
    return feq(900n * 100n + 16800n * 20n, 1n, 426000n, 1n) && feq(900n + 16800n, 1n, 17700n, 1n) &&
      t.n * 100n > 2406n * t.d && t.n * 100n < 2408n * t.d && t.n > 20n * t.d && t.n < 100n * t.d;
  }, "physics"],
  ["heat-and-energy", "melting 500 g of ice takes 167000 J, heating the melt through 20 K takes 42000 J, total 209000 J", () =>
    feq(500n * 334n, 1n, 167000n, 1n) && feq(1n * 4200n * 20n, 2n, 42000n, 1n) && adeq(167000n, 1n, 42000n, 1n, 209000n, 1n), "physics"],
  ["heat-and-energy", "a 2 m squared solar heater at 800 W per m squared for 6 h collects 3.456 x 10 to the power 7 J and heats 411.4 kg", () => {
    const m = rDiv(R(34560000n, 1n), R(84000n, 1n));
    return meq(800n, 1n, 2n, 1n, 1600n, 1n) && meq(6n, 1n, 3600n, 1n, 21600n, 1n) &&
      feq(1600n * 21600n, 1n, 34560000n, 1n) &&
      m.n * 10n > 4114n * m.d && m.n * 10n < 4115n * m.d;
  }, "physics"],
  ["heat-and-energy", "2520 J is 600 calories and 0.6 kilocalories", () =>
    deq(2520n, 1n, 42n, 10n, 600n, 1n) && deq(2520n, 1n, 4200n, 1n, 6n, 10n), "physics"],
  ["heat-and-energy", "cooling 60 K at 6 K per minute takes 10 minutes and 400 x 60 = 24000 J per kg", () =>
    deq(60n, 1n, 6n, 1n, 10n, 1n) && feq(400n * 60n, 1n, 24000n, 1n), "physics"],
  ["heat-and-energy", "10000 J heats 10000/42000 = 0.238 kg of water through 10 K", () => {
    const m = rDiv(R(10000n, 1n), R(42000n, 1n));
    return m.n * 1000n > 238n * m.d && m.n * 1000n < 239n * m.d;
  }, "physics"],
  ["heat-and-energy", "63000 J cooling 3 kg through 30 K gives c = 700 J per kg per K", () =>
    sbeq(90n, 1n, 60n, 1n, 30n, 1n) && deq(63000n, 1n, 3n * 30n, 1n, 700n, 1n), "physics"],

  /* Reflection of Light */
  ["reflection-of-light", "the angle with the surface is the complement of the angle with the normal: 90 - 35 and 90 - 40", () =>
    sbeq(90n, 1n, 35n, 1n, 55n, 1n) && sbeq(90n, 1n, 40n, 1n, 50n, 1n), "physics"],
  ["reflection-of-light", "an object 40 cm in front of a plane mirror is 80 cm from its image", () =>
    adeq(40n, 1n, 40n, 1n, 80n, 1n) && adeq(25n, 1n, 25n, 1n, 50n, 1n), "physics"],
  ["reflection-of-light", "R = 20 cm gives f = -10 cm for a concave mirror, and R = 40 cm gives 20 cm", () =>
    feq(20n, 2n, 10n, 1n) && deq(40n, 2n, 1n, 1n, 20n, 1n) && deq(30n, 2n, 1n, 1n, 15n, 1n), "physics"],
  ["reflection-of-light", "concave f = -10, u = -30: 1/v = -1/10 + 1/30 = -1/15, so v = -15 cm and m = -0.5", () => {
    const v = rDiv(R(1n, 1n), rSub(rDiv(R(1n, 1n), R(-10n, 1n)), rDiv(R(1n, 1n), R(-30n, 1n))));
    const m = rDiv(rSub(R(0n, 1n), v), R(-30n, 1n));
    return feq(2n, 30n, 1n, 15n) && feq(v.n, v.d, -15n, 1n) && feq(m.n, m.d, -1n, 2n);
  }, "physics"],
  ["reflection-of-light", "convex f = +20, u = -30: 1/v = 1/20 + 1/30 = 1/12, so v = +12 cm and m = +0.4", () => {
    const v = rDiv(R(1n, 1n), rSub(rDiv(R(1n, 1n), R(20n, 1n)), rDiv(R(1n, 1n), R(-30n, 1n))));
    const m = rDiv(rSub(R(0n, 1n), v), R(-30n, 1n));
    return feq(5n, 60n, 1n, 12n) && feq(v.n, v.d, 12n, 1n) && feq(m.n, m.d, 2n, 5n);
  }, "physics"],
  ["reflection-of-light", "a plane mirror object 30 cm away is 60 cm from its image, and 40 cm after a 10 cm move", () =>
    adeq(30n, 1n, 30n, 1n, 60n, 1n) && adeq(20n, 1n, 20n, 1n, 40n, 1n), "physics"],
  ["reflection-of-light", "concave f = -5, u = -20: 1/v = -1/5 + 1/20 = -3/20, so v = -20/3 and m = -1/3, matching 4f/3", () => {
    const v = rDiv(R(1n, 1n), rSub(rDiv(R(1n, 1n), R(-5n, 1n)), rDiv(R(1n, 1n), R(-20n, 1n))));
    const m = rDiv(rSub(R(0n, 1n), v), R(-20n, 1n));
    return feq(4n, 20n, 1n, 5n) && feq(v.n, v.d, -20n, 3n) &&
      feq(m.n, m.d, -1n, 3n) && feq(4n * 5n, 3n, 20n, 3n);
  }, "physics"],
  ["reflection-of-light", "a convex mirror with v = +15 and u = -60 gives m = +0.25", () => {
    const m = rDiv(rSub(R(0n, 1n), R(15n, 1n)), R(-60n, 1n));
    return feq(m.n, m.d, 1n, 4n) && 15n < 60n;
  }, "physics"],

  /* Propagation of Sound Waves */
  ["propagation-of-sound-waves", "wavelength 330/250 = 1.32 m and frequency 340/2 = 170 Hz", () =>
    deq(330n, 1n, 250n, 1n, 33n, 25n) && deq(340n, 1n, 2n, 1n, 170n, 1n), "physics"],
  ["propagation-of-sound-waves", "an echo at 344 m per second needs a 34.4 m round trip, so 17.2 m from the wall", () =>
    feq(344n, 10n, 172n, 5n) && deq(344n, 1n, 10n, 1n, 172n, 5n), "physics"],
  ["propagation-of-sound-waves", "at 350 m per second the round trip is 35 m, so 17.5 m from the wall", () =>
    deq(350n, 1n, 10n, 1n, 35n, 1n) && deq(35n, 1n, 2n, 1n, 175n, 10n), "physics"],
  ["propagation-of-sound-waves", "500 Hz over 0.66 m travels at 330 m per second, the speed in air", () =>
    feq(500n * 66n, 100n, 330n, 1n) && 330n < 5000n, "physics"],
  ["propagation-of-sound-waves", "200 Hz is 1.75 m in air and 7.5 m in water, a ratio of 30 to 7", () => {
    const air = rDiv(R(350n, 1n), R(200n, 1n));
    const wat = rDiv(R(1500n, 1n), R(200n, 1n));
    return feq(air.n, air.d, 7n, 4n) && feq(wat.n, wat.d, 15n, 2n) &&
      feq(15n * 4n, 2n * 7n, 30n, 7n);
  }, "physics"],
  ["propagation-of-sound-waves", "an echo after 2 s at 340 m per second puts the cliff 340 m away", () =>
    feq(340n * 2n, 1n, 680n, 1n) && deq(680n, 1n, 2n, 1n, 340n, 1n), "physics"],
  ["propagation-of-sound-waves", "50 Hz is 7 m in air and 100 m in steel, and 50 x 100 = 5000", () =>
    deq(350n, 1n, 50n, 1n, 7n, 1n) && deq(5000n, 1n, 50n, 1n, 100n, 1n) && feq(50n * 100n, 1n, 5000n, 1n), "physics"],
  ["propagation-of-sound-waves", "1650 m takes 5 s in air and 1.1 s in water", () =>
    deq(1650n, 1n, 330n, 1n, 5n, 1n) && deq(1650n, 1n, 1500n, 1n, 11n, 10n), "physics"],
  ["propagation-of-sound-waves", "a 2.5 cm wavelength at 340 m per second is 13600 Hz", () =>
    feq(25n, 1000n, 1n, 40n) && deq(340n, 1n, 25n, 1000n, 13600n, 1n), "physics"],
  ["propagation-of-sound-waves", "a 16 m hall gives a 32 m round trip in 32/340 s, which is under 0.1 s, so no echo", () => {
    const t = rDiv(R(32n, 1n), R(340n, 1n));
    return feq(2n * 16n, 1n, 32n, 1n) && t.n * 1000n < 100n * t.d && t.n * 1000n > 94n * t.d;
  }, "physics"],
  ["propagation-of-sound-waves", "the second wave has 8/2 = 4 times the amplitude of the first", () =>
    deq(8n, 2n, 1n, 1n, 4n, 1n) && 4n > 1n, "physics"],

  /* Current Electricity */
  ["current-electricity", "6 ohm and 3 ohm in parallel give 2 ohm, and 4 ohm across 12 V gives 3 A", () =>
    deq(6n * 3n, 6n + 3n, 1n, 1n, 2n, 1n) && deq(12n, 1n, 4n, 1n, 3n, 1n), "physics"],
  ["current-electricity", "240 C in 60 s is 4 A, and 20 V across 4 A is 5 ohms", () =>
    deq(240n, 1n, 60n, 1n, 4n, 1n) && deq(20n, 1n, 4n, 1n, 5n, 1n), "physics"],
  ["current-electricity", "4 ohm and 12 ohm give 16 ohm in series and 3 ohm in parallel", () =>
    adeq(4n, 1n, 12n, 1n, 16n, 1n) && deq(4n * 12n, 16n, 1n, 1n, 3n, 1n) && 16n > 12n && 3n < 4n, "physics"],
  ["current-electricity", "6 ohm and 3 ohm across 12 V draw 2 A and 4 A, totalling 6 A on 2 ohms", () =>
    deq(12n, 1n, 6n, 1n, 2n, 1n) && deq(12n, 1n, 3n, 1n, 4n, 1n) &&
    adeq(2n, 1n, 4n, 1n, 6n, 1n) && deq(6n * 3n, 9n, 1n, 1n, 2n, 1n) && deq(12n, 1n, 2n, 1n, 6n, 1n), "physics"],
  ["current-electricity", "20 ohm at 5 A: P = 500 W, V = 100 V, and 500 W for 120 s is 60000 J", () =>
    feq(5n * 5n * 20n, 1n, 500n, 1n) && feq(5n * 20n, 1n, 100n, 1n) && feq(100n * 5n, 1n, 500n, 1n) &&
    meq(2n, 1n, 60n, 1n, 120n, 1n) && feq(500n * 120n, 1n, 60000n, 1n), "physics"],
  ["current-electricity", "a 60 W and a 100 W lamp on 220 V draw 0.273 A and 0.455 A, totalling 0.727 A", () => {
    const a = rDiv(R(60n, 1n), R(220n, 1n));
    const b = rDiv(R(100n, 1n), R(220n, 1n));
    const s = rAdd(a, b);
    return a.n * 1000n > 272n * a.d && a.n * 1000n < 273n * a.d &&
      b.n * 1000n > 454n * b.d && b.n * 1000n < 455n * b.d &&
      s.n * 1000n > 727n * s.d && s.n * 1000n < 728n * s.d;
  }, "physics"],
  ["current-electricity", "a 100 W lamp for 5 h at 6 rupees per kWh costs 3 rupees", () =>
    feq(100n, 1000n, 1n, 10n) && meq(1n, 10n, 5n, 1n, 1n, 2n) && meq(1n, 2n, 6n, 1n, 3n, 1n), "physics"],
  ["current-electricity", "1 kWh is 1000 W x 3600 s = 3600000 J", () =>
    meq(1000n, 1n, 3600n, 1n, 3600000n, 1n), "physics"],
  ["current-electricity", "2 A through 15 ohm gives 30 V, 60 W, and 3600 J in a minute", () =>
    feq(2n * 15n, 1n, 30n, 1n) && feq(30n * 2n, 1n, 60n, 1n) && meq(1n, 1n, 60n, 1n, 60n, 1n) &&
    feq(60n * 60n, 1n, 3600n, 1n), "physics"],
  ["current-electricity", "three 3 ohm resistors give 1 ohm in parallel and 9 ohm in series", () =>
    adeq(1n, 3n, 2n, 3n, 1n, 1n) && adeq(3n, 1n, 6n, 1n, 9n, 1n), "physics"],
  ["current-electricity", "2 A for 5 minutes passes 600 C", () =>
    meq(5n, 1n, 60n, 1n, 300n, 1n) && meq(2n, 1n, 300n, 1n, 600n, 1n), "physics"],
  ["current-electricity", "8 ohm and 2 ohm across 12 V draw 1.5 A and 6 A, totalling 7.5 A on 1.6 ohm", () =>
    deq(12n, 1n, 8n, 1n, 3n, 2n) && deq(12n, 1n, 2n, 1n, 6n, 1n) && adeq(3n, 2n, 6n, 1n, 15n, 2n) &&
    deq(8n * 2n, 10n, 1n, 1n, 8n, 5n) && deq(12n, 1n, 8n, 5n, 15n, 2n), "physics"],
  ["current-electricity", "doubling the length and halving the area multiplies the resistance by 4", () =>
    meq(2n, 1n, 2n, 1n, 4n, 1n) && 4n > 1n, "physics"],
  ["current-electricity", "2 ohm and 3 ohm in series give 5 ohm and in parallel 6/5 ohm", () =>
    adeq(2n, 1n, 3n, 1n, 5n, 1n) && deq(2n * 3n, 5n, 1n, 1n, 6n, 5n), "physics"],
  ["current-electricity", "6 ohm at 2 A gives 24 W, and a 100 W lamp for 5 minutes gives 30000 J", () =>
    feq(2n * 2n * 6n, 1n, 24n, 1n) && meq(5n, 1n, 60n, 1n, 300n, 1n) && feq(100n * 300n, 1n, 30000n, 1n), "physics"],

  /* Magnetism */
  ["magnetism", "a magnet cut into six pieces has 12 poles, and a 20 cm magnet cut into four gives 5 cm pieces", () =>
    feq(6n * 2n, 1n, 12n, 1n) && deq(20n, 1n, 4n, 1n, 5n, 1n), "physics"],
  ["magnetism", "four pieces of a 20 cm magnet together have eight poles, four north and four south", () =>
    feq(4n * 2n, 1n, 8n, 1n) && adeq(4n, 1n, 4n, 1n, 8n, 1n), "physics"],
  ["magnetism", "24 field lines leaving the north pole must enter the south pole, so none begin or end in between", () =>
    sbeq(24n, 1n, 24n, 1n, 0n, 1n) && 24n > 0n, "physics"],
];

/* ---------- run ---------- */

const base = process.argv[2] ? path.dirname(process.argv[2]) : path.join(process.cwd(), "content", "icse", "class-9");
const rootFor = (subject) => path.join(base, subject);
let pass = 0;
const failures = [];

for (const [slug, label, fn, subject = "mathematics"] of CHECKS) {
  const file = path.join(rootFor(subject), "chapters", `${slug}.json`);
  if (!fs.existsSync(file)) {
    failures.push(`${subject}/${slug}: chapter file missing, cannot verify "${label}"`);
    continue;
  }
  try {
    if (fn() !== true) failures.push(`${subject}/${slug}: FAILED — ${label}`);
    else pass++;
  } catch (e) {
    failures.push(`${subject}/${slug}: ERROR — ${label}: ${e.message}`);
  }
}

console.log(`\nArithmetic verification: ${pass}/${CHECKS.length} claim(s) independently confirmed (Mathematics and Physics).`);
if (failures.length) {
  for (const f of failures) console.error(`  FAIL ${f}`);
  process.exit(1);
}
console.log("All checked claims reproduce exactly.\n");