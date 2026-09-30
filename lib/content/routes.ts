/** Single source of truth for BoardPrep content URLs. */
export const BOARD = "cisce";

export const routes = {
  board: (board = BOARD) => `/${board}`,
  cls: (classSlug: string, board = BOARD) => `/${board}/${classSlug}`,
  subject: (classSlug: string, subject: string, board = BOARD) =>
    `/${board}/${classSlug}/${subject}`,
  chapter: (classSlug: string, subject: string, chapter: string, board = BOARD) =>
    `/${board}/${classSlug}/${subject}/${chapter}`,
  about: "/about",
  aboutDisclaimer: "/about#disclaimer",
} as const;
