import type { LiteratureModule } from "../../types";
import { nightMail } from "./nightMail";
import { skimbleshanks } from "./skimbleshanks";
import { iRemember } from "./iRemember";
import { doctorsJournal } from "./doctorsJournal";
import { workOfArtifice } from "./workOfArtifice";

export const poetryModules: LiteratureModule[] = [
  nightMail, skimbleshanks, iRemember, doctorsJournal, workOfArtifice,
];

export const poetryIndex: Record<string, LiteratureModule> = Object.fromEntries(
  poetryModules.map((m) => [m.id, m])
);

export { nightMail, skimbleshanks, iRemember, doctorsJournal, workOfArtifice };
