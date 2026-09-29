import type { GrammarTopic } from "../../types";
import { partsOfSpeech } from "./partsOfSpeech";
import { tenses } from "./tenses";
import { subjectVerbAgreement } from "./subjectVerbAgreement";
import { articles } from "./articles";
import { prepositions } from "./prepositions";
import { conjunctions } from "./conjunctions";
import { pronouns } from "./pronouns";
import { adjectives } from "./adjectives";
import { adverbs } from "./adverbs";
import { activePassiveVoice } from "./activePassiveVoice";
import { directIndirectSpeech } from "./directIndirectSpeech";
import { transformation } from "./transformation";
import { questionTags } from "./questionTags";
import { punctuation } from "./punctuation";
import { clauses } from "./clauses";
import { phrases } from "./phrases";
import { sentenceStructure } from "./sentenceStructure";

export const grammarTopics: GrammarTopic[] = [
  partsOfSpeech, tenses, subjectVerbAgreement, articles, prepositions,
  conjunctions, pronouns, adjectives, adverbs, activePassiveVoice,
  directIndirectSpeech, transformation, questionTags, punctuation,
  clauses, phrases, sentenceStructure,
];

export const grammarIndex: Record<string, GrammarTopic> = Object.fromEntries(
  grammarTopics.map((t) => [t.id, t])
);

export {
  partsOfSpeech, tenses, subjectVerbAgreement, articles, prepositions,
  conjunctions, pronouns, adjectives, adverbs, activePassiveVoice,
  directIndirectSpeech, transformation, questionTags, punctuation,
  clauses, phrases, sentenceStructure,
};
