import type { CompositionTopic } from "../../types";
import { fundamentals } from "./fundamentals";
import { descriptive } from "./descriptive";
import { narrative } from "./narrative";
import { argumentative } from "./argumentative";
import { storyWriting } from "./storyWriting";
import { pictureComposition } from "./pictureComposition";
import { letterWriting } from "./letterWriting";
import { noticeEmail } from "./noticeEmail";

export const compositionTopics: CompositionTopic[] = [
  fundamentals, descriptive, narrative, argumentative,
  storyWriting, pictureComposition, letterWriting, noticeEmail,
];

export const compositionIndex: Record<string, CompositionTopic> = Object.fromEntries(
  compositionTopics.map((t) => [t.id, t])
);

export {
  fundamentals, descriptive, narrative, argumentative,
  storyWriting, pictureComposition, letterWriting, noticeEmail,
};
