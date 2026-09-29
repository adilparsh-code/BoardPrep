import type { GrammarTopic } from "../../types";

export const tenses: GrammarTopic = {
  id: "icse-9-eng-lang-gram-02",
  title: "Tenses",
  difficulty: "medium",
  learningObjective: "Use the twelve tenses correctly based on time and aspect.",
  concept: "Tense tells WHEN an action happens (time) and HOW it is viewed (aspect). 3 times × 4 aspects = 12 tenses.",
  whyItMatters: "ICSE tests tenses via fill-in-the-blanks, error correction, and transformation.",
  rules: [
    "Simple Present: habits, facts. (She walks.)",
    "Present Continuous: now. (She is walking.)",
    "Present Perfect: completed but relevant now. (She has walked.)",
    "Present Perfect Continuous: started in past, still continuing. (She has been walking.)",
    "Simple Past: finished past action. (She walked.)",
    "Past Continuous: ongoing past action. (She was walking.)",
    "Past Perfect: earlier past action. (She had walked.)",
    "Past Perfect Continuous: ongoing up to a past point. (She had been walking.)",
    "Simple Future: prediction/intention. (She will walk.)",
    "Future Continuous: in progress at future time. (She will be walking.)",
    "Future Perfect: completed by future time. (She will have walked.)",
    "Future Perfect Continuous: duration up to future point. (She will have been walking.)",
  ],
  examples: {
    easy: [
      { text: "I drink tea every morning.", note: "Simple present" },
      { text: "He went to Delhi yesterday.", note: "Simple past" },
    ],
    medium: [
      { text: "She has lived here for ten years.", note: "Present perfect" },
      { text: "They were playing when I called.", note: "Past continuous + simple past" },
    ],
    hard: [
      { text: "By the time we arrived, the film had already started.", note: "Past perfect" },
    ],
  },
  incorrectExamples: ["I am knowing the answer.", "She has gone to Delhi yesterday."],
  correctedExamples: [
    { incorrect: "I am knowing the answer.", corrected: "I know the answer.", explanation: "Stative verbs not used in continuous." },
    { incorrect: "She has gone to Delhi yesterday.", corrected: "She went to Delhi yesterday.", explanation: "Definite past time marker needs simple past." },
    { incorrect: "When I reached, he already left.", corrected: "When I reached, he had already left.", explanation: "Earlier action takes past perfect." },
  ],
  commonMistakes: [
    "Present perfect with past time markers.",
    "Continuous form with stative verbs.",
    "Forgetting past perfect.",
    "Confusing since vs for.",
  ],
  guidedPractice: [
    { question: "Fill in: 'The train ______ (leave) before we ______ (reach) the station.'", hint: "Which action happened first?", answer: "had left; reached", explanation: "Earlier → past perfect; later → simple past." },
  ],
  independentPractice: [
    { question: "Fill in: 'By next December, I ______ (complete) my Class 10 syllabus.'", answer: "will have completed", explanation: "Future perfect." },
  ],
  examStyleQuestions: [
    { question: "Rewrite: 'I am living here since 2015.'", answer: "I have been living here since 2015.", explanation: "'Since' + continuing → present perfect continuous." },
  ],
  quickRevision: {
    keyPoints: ["3 times × 4 aspects = 12 tenses.", "Time markers decide tense."],
    memoryTip: "TIME + ASPECT.",
    examTip: "Signal words: since, for, already, yesterday, by the time.",
  },
};
