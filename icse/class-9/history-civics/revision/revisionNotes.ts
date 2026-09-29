import type { CivicsChapter, HistoryChapter } from "../types";
import { civicsModules } from "../civics";
import { historyModules } from "../history";

const allChapters: (CivicsChapter | HistoryChapter)[] = [...civicsModules, ...historyModules];

export const class9ChapterRevision: { chapterId: string; title: string; keyPoints: string[] }[] =
  allChapters.map((m) => ({
    chapterId: m.id,
    title: m.title,
    keyPoints: m.quickRevision.keyPoints,
  }));

export const class9MemoryTips: { chapterId: string; title: string; memoryTip: string; examTip: string }[] =
  allChapters.map((m) => ({
    chapterId: m.id,
    title: m.title,
    memoryTip: m.quickRevision.memoryTip,
    examTip: m.quickRevision.examTip,
  }));

export const class9ExamChecklist: string[] = [
  "Civics: remember the two Constitution dates (26-11-1949 adoption, 26-1-1950 enforcement).",
  "Civics: know the Election Commission's composition and the three types of elections with examples.",
  "Civics: be able to name the three tiers of Panchayati Raj and two functions of each body.",
  "History: keep the 'source lists' ready for Harappan, Vedic, Mauryan and Gupta chapters.",
  "History: practise paired-point comparison answers for Early vs Later Vedic society.",
  "History: memorise the five vows of Jainism and the Four Noble Truths of Buddhism.",
  "History: link Ashoka to the Kalinga War (261 BCE) and Dhamma in every answer.",
  "History: prepare one long answer each on Chola local administration and Akbar's administration.",
  "History: keep the Renaissance trio (Leonardo, Shakespeare, Copernicus) on your fingertips.",
  "Practise the Part I style short answers: they demand exact facts, not lengthy prose.",
];