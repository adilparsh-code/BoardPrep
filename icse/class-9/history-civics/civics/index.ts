import type { CivicsChapter } from "../types";
import { ourConstitution } from "./ourConstitution";
import { elections } from "./elections";
import { localSelfGovernment } from "./localSelfGovernment";

export const civicsModules: CivicsChapter[] = [ourConstitution, elections, localSelfGovernment];

export const civicsIndex: Record<string, CivicsChapter> = Object.fromEntries(
  civicsModules.map((m) => [m.id, m])
);

export { ourConstitution, elections, localSelfGovernment };

export const civicsMeta = {
  component: "Civics" as const,
  section: "Section A" as const,
  note: "Civics forms Section A of the ICSE History & Civics paper.",
};