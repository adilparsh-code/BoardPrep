import type { HistoryChapter } from "../types";
import { harappanCivilisation } from "./harappanCivilisation";
import { vedicPeriod } from "./vedicPeriod";
import { jainismAndBuddhism } from "./jainismAndBuddhism";
import { mauryanEmpire } from "./mauryanEmpire";
import { sangamAge } from "./sangamAge";
import { ageOfGuptas } from "./ageOfGuptas";
import { medievalIndia } from "./medievalIndia";
import { modernAgeInEurope } from "./modernAgeInEurope";

export const historyModules: HistoryChapter[] = [
  harappanCivilisation,
  vedicPeriod,
  jainismAndBuddhism,
  mauryanEmpire,
  sangamAge,
  ageOfGuptas,
  medievalIndia,
  modernAgeInEurope,
];

export const historyIndex: Record<string, HistoryChapter> = Object.fromEntries(
  historyModules.map((m) => [m.id, m])
);

export {
  harappanCivilisation,
  vedicPeriod,
  jainismAndBuddhism,
  mauryanEmpire,
  sangamAge,
  ageOfGuptas,
  medievalIndia,
  modernAgeInEurope,
};

export const historyMeta = {
  component: "History" as const,
  section: "Section B" as const,
  note: "History forms Section B of the ICSE History & Civics paper.",
};