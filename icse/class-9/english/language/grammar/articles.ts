import type { GrammarTopic } from "../../types";

export const articles: GrammarTopic = {
  id: "icse-9-eng-lang-gram-04",
  title: "Articles (a, an, the)",
  difficulty: "easy",
  learningObjective: "Choose between a, an, and the correctly, including zero article cases.",
  concept: "Articles come before nouns. 'A'/'an' = indefinite. 'The' = definite. Sometimes no article.",
  whyItMatters: "ICSE error-correction and fill-in-the-blank questions target articles.",
  rules: [
    "'A' before consonant sounds. (a book, a university)",
    "'An' before vowel sounds. (an apple, an hour)",
    "'The' for specific/unique/superlative. (the sun, the best)",
    "No article before proper nouns, abstract nouns generally, meals, languages.",
  ],
  examples: {
    easy: [
      { text: "I saw a dog.", note: "Indefinite" },
      { text: "The dog was barking.", note: "Specific" },
    ],
    medium: [
      { text: "He is an honest man.", note: "Silent h" },
      { text: "She is a university student.", note: "'Yoo' sound" },
    ],
    hard: [
      { text: "The Ganga is the longest river in India.", note: "Rivers + superlative take 'the'" },
    ],
  },
  incorrectExamples: ["He is a honest man.", "She plays the cricket."],
  correctedExamples: [
    { incorrect: "He is a honest man.", corrected: "He is an honest man.", explanation: "Vowel sound." },
    { incorrect: "She plays the cricket.", corrected: "She plays cricket.", explanation: "Games no article." },
    { incorrect: "The Mount Everest is the highest peak.", corrected: "Mount Everest is the highest peak.", explanation: "Most mountain peaks no 'the'." },
  ],
  commonMistakes: [
    "'A' before vowel sound.",
    "'The' before games.",
    "Omitting 'the' with superlatives.",
  ],
  guidedPractice: [
    { question: "Fill in: 'She waited for ______ hour.'", hint: "Vowel sound?", answer: "an", explanation: "Silent h." },
  ],
  independentPractice: [
    { question: "Fill in: 'He is ______ MBA and works at ______ European bank.'", answer: "an; a", explanation: "'MBA' → vowel sound; 'European' → 'yoo' sound." },
  ],
  examStyleQuestions: [
    { question: "Correct: 'The honesty is a best policy.'", answer: "Honesty is the best policy.", explanation: "Abstract noun generally no article; superlative 'the'." },
  ],
  quickRevision: {
    keyPoints: ["a/an = sound-based.", "the = specific/unique/superlative."],
    memoryTip: "Sound first, spelling second.",
    examTip: "Read aloud to check.",
  },
};
