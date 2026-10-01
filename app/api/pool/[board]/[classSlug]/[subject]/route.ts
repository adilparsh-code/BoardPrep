import { NextResponse } from "next/server";
import { buildSubjectPool } from "@/lib/content/exam";
import { getBoard, getClass, getSubject } from "@/lib/content/loader";

/**
 * Read-only question pool for one subject.
 *
 * It exists so the practice/test/PYQ panels can load questions lazily instead of
 * inlining every chapter body into the subject page. Every path segment is
 * resolved through the content loader, which validates slugs and refuses to read
 * outside the content root, so this cannot be used to fetch arbitrary files.
 * There is no mutation here and no per-student data is read or written.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ board: string; classSlug: string; subject: string }> },
) {
  const { board, classSlug, subject } = await params;

  if (!getBoard(board) || !getClass(board, classSlug) || !getSubject(board, classSlug, subject)) {
    return NextResponse.json({ error: "unknown board, class or subject" }, { status: 404 });
  }

  const pool = buildSubjectPool(board, classSlug, subject);
  return NextResponse.json(pool, {
    headers: {
      // Content is static per deploy; the client store is versioned instead.
      "cache-control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}