import type { ComprehensionPassage } from "../../types";

export const passage1: ComprehensionPassage = {
  id: "icse-9-eng-lang-comp-02-p01",
  title: "The Vanishing Sparrows",
  difficulty: "medium",
  wordCount: 210,
  passage: `Not long ago, the sparrow was the most familiar bird in Indian cities. It nested under roof tiles, hopped about on window sills, and its chirping was the background music of urban mornings. Today, it has almost disappeared from many neighbourhoods.

Scientists point to several reasons. First, modern buildings leave no crevices for nesting. Second, the insects that sparrows feed on have reduced due to pesticide use. Third, electromagnetic radiation from mobile towers may confuse their navigation. Fourth, the rise in urban temperatures has disturbed their breeding cycles.

Some citizens have responded. In Bengaluru, residents have installed wooden nest boxes. In Kolkata, school children have planted native shrubs that attract insects. These small efforts, if multiplied, could bring the sparrow back.

The sparrow is not just a bird. It is a reminder that cities belong to all species — not just to humans.`,
  questions: [
    { question: "Why was the sparrow once considered the most familiar bird in Indian cities?", hint: "Look at first paragraph.", answer: "It nested under roof tiles, hopped on window sills, and its chirping was the background music of urban mornings.", explanation: "Direct evidence." },
    { question: "List two reasons for the decline of sparrows mentioned in the passage.", hint: "Look for 'First', 'Second'.", answer: "Modern buildings leave no crevices for nesting; pesticide use has reduced the insects sparrows feed on.", explanation: "Explicit information." },
    { question: "What does the writer mean by saying the sparrow is 'a reminder that cities belong to all species'?", hint: "Consider the deeper point.", answer: "The writer suggests that urban spaces must accommodate not only humans but also wildlife, and the sparrow's decline signals a failure to do so.", explanation: "Inference." },
    { question: "Find a word in the passage that means 'small openings or cracks'.", hint: "Look near 'nesting'.", answer: "Crevices.", explanation: "Context vocabulary." },
  ],
  summaryTask: "Write a summary of the passage in about 60 words.",
  modelSummary: "The sparrow, once common in Indian cities, has nearly vanished due to modern architecture, pesticide use, mobile radiation and rising temperatures. Citizens in some cities are attempting to reverse this through nest boxes and native plants. The sparrow's decline reminds us that cities must support all species, not only humans.",
};
