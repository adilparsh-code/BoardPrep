/**
 * Single source of truth for BoardPrep content URLs.
 * Board-aware: every route takes a board slug (first path segment).
 * Boards are discovered from the content tree, never hardcoded here.
 */
export const DEFAULT_BOARD = "icse";

export const routes = {
  board: (board: string) => `/${board}`,
  cls: (board: string, classSlug: string) => `/${board}/${classSlug}`,
  subject: (board: string, classSlug: string, subject: string) =>
    `/${board}/${classSlug}/${subject}`,
  chapter: (board: string, classSlug: string, subject: string, chapter: string) =>
    `/${board}/${classSlug}/${subject}/${chapter}`,
  boardsIndex: "/boards",
  search: "/search",
  dashboard: "/dashboard",
  about: "/about",
  aboutDisclaimer: "/about#disclaimer",
} as const;
