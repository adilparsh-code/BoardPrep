import type { ComprehensionSkill, ComprehensionPassage } from "../../types";
import { readingPassage } from "./skills_reading";
import { centralIdea } from "./skills_centralIdea";
import { locatingEvidence } from "./skills_evidence";
import { inference } from "./skills_inference";
import { vocabularyInContext } from "./skills_vocabulary";
import { toneAndPurpose } from "./skills_tone";
import { answeringPrecisely } from "./skills_precision";
import { passage1 } from "./passage1";
import { passage2 } from "./passage2";

export const comprehensionSkills: ComprehensionSkill[] = [
  readingPassage, centralIdea, locatingEvidence, inference,
  vocabularyInContext, toneAndPurpose, answeringPrecisely,
];

export const comprehensionPassages: ComprehensionPassage[] = [passage1, passage2];

export const comprehensionSkillIndex: Record<string, ComprehensionSkill> = Object.fromEntries(
  comprehensionSkills.map((s) => [s.id, s])
);

export {
  readingPassage, centralIdea, locatingEvidence, inference,
  vocabularyInContext, toneAndPurpose, answeringPrecisely,
  passage1, passage2,
};
