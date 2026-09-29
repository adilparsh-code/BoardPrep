import type { LiteratureModule } from "../../types";
import { bonkuBabu } from "./bonkuBabu";
import { oliverAsksForMore } from "./oliverAsksForMore";
import { modelMillionaire } from "./modelMillionaire";
import { homeComing } from "./homeComing";
import { boyWhoBrokeBank } from "./boyWhoBrokeBank";

export const proseModules: LiteratureModule[] = [
  bonkuBabu, oliverAsksForMore, modelMillionaire, homeComing, boyWhoBrokeBank,
];

export const proseIndex: Record<string, LiteratureModule> = Object.fromEntries(
  proseModules.map((m) => [m.id, m])
);

export { bonkuBabu, oliverAsksForMore, modelMillionaire, homeComing, boyWhoBrokeBank };
