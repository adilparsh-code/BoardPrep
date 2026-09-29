import type { CivicsChapter } from "../types";
import { unionLegislature } from "./unionLegislature";
import { unionExecutive } from "./unionExecutive";
import { judiciary } from "./judiciary";

export const civicsModules: CivicsChapter[] = [unionLegislature, unionExecutive, judiciary];

export const civicsIndex: Record<string, CivicsChapter> = Object.fromEntries(
  civicsModules.map((m) => [m.id, m])
);

export { unionLegislature, unionExecutive, judiciary };

export const civicsMeta = {
  component: "Civics" as const,
  section: "Section A" as const,
  note: "Civics forms Section A of the ICSE History & Civics paper.",
};