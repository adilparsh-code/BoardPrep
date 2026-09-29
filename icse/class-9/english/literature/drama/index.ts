import type { LiteratureModule } from "../../types";
import { juliusCaesar } from "./juliusCaesar";

export const dramaModules: LiteratureModule[] = [juliusCaesar];
export const dramaIndex: Record<string, LiteratureModule> = Object.fromEntries(
  dramaModules.map((m) => [m.id, m])
);
export { juliusCaesar };
