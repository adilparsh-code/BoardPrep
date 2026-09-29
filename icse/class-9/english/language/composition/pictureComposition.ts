import type { CompositionTopic } from "../../types";

export const pictureComposition: CompositionTopic = {
  id: "icse-9-eng-lang-comp-06",
  title: "Picture-Based Composition",
  difficulty: "medium",
  learningObjective: "Use a picture as a starting point for description, narration, or reflection.",
  whatItIs: "Composition inspired by an image. Picture is a prompt, not a subject for exhaustive description.",
  whyItMatters: "CISCE explicitly mentions picture-based stimuli in Q1.",
  thinkingFramework: [
    "What is the mood of the picture?",
    "Which 3-4 elements will I focus on?",
    "Will I describe, narrate, or reflect?",
    "What is my opening line?",
  ],
  structure: [
    { section: "Opening", purpose: "Set mood from image", wordCountGuide: "50-60 words" },
    { section: "Development", purpose: "Narrate/describe using image elements", wordCountGuide: "180-220 words" },
    { section: "Close", purpose: "Reflection or resolution", wordCountGuide: "40-50 words" },
  ],
  vocabularyBank: ["solitary", "golden light", "hushed", "sprawling", "drenched", "silhouetted"],
  paragraphDevelopment: [
    "Match tone to picture mood.",
    "Focus on 3-4 elements only.",
    "Use the picture as symbol if creative.",
  ],
  modelResponse: "The old banyan tree stands at the edge of the field like a sentinel. Its roots spill over the earth, gnarled and patient. The evening light turns the leaves to gold. The tree has been here longer than anyone remembers.",
  weakResponse: "There is a tree. It is big. There is a field. The sky is nice.",
  improvedResponse: "The tree had been there before the village, and it would be there after. Its trunk was a monument to stubbornness — battered by monsoons, bent by wind, still standing.",
  commonMistakes: [
    { incorrect: "Describing every detail", corrected: "Focus on 3-4 elements.", explanation: "Selection is the skill." },
    { incorrect: "No connection to picture", corrected: "Clearly anchor composition in image.", explanation: "The picture is the prompt." },
  ],
  examinerChecklist: [
    "Is the connection to the picture clear?",
    "Is the mood consistent?",
    "Did I avoid over-description?",
    "Does the composition have its own arc?",
  ],
  practiceQuestions: [
    { question: "Picture: A crowded bus stop in the rain. Write 300-350 words.", hint: "Focus on people and mood.", answer: "Structure: mood → characters → interaction → reflection.", explanation: "Image-anchored." },
    { question: "Picture: A child flying a kite on a rooftop. Write 300-350 words.", hint: "Choose descriptive, narrative, or reflective.", answer: "Any of the three approaches works.", explanation: "Flexibility allowed." },
  ],
  quickRevision: {
    keyPoints: ["Picture is a prompt, not a subject.", "Focus on 3-4 elements.", "Match tone to mood."],
    memoryTip: "3-4 elements, one mood.",
    examTip: "First line establishes mood.",
  },
};
