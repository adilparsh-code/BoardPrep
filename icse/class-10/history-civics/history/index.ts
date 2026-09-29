import type { HistoryChapter } from "../types";
import { indianNationalMovement } from "./indianNationalMovement";
import { massPhaseMovement } from "./massPhaseMovement";
import { contemporaryWorld } from "./contemporaryWorld";

export const historyModules: HistoryChapter[] = [
  indianNationalMovement,
  massPhaseMovement,
  contemporaryWorld,
];

export const historyIndex: Record<string, HistoryChapter> = Object.fromEntries(
  historyModules.map((m) => [m.id, m])
);

export { indianNationalMovement, massPhaseMovement, contemporaryWorld };

export const historyMeta = {
  component: "History" as const,
  section: "Section B" as const,
  note: "History forms Section B of the ICSE History & Civics paper.",
};