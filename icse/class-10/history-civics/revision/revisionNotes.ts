import type { CivicsChapter, HistoryChapter } from "../types";
import { civicsModules } from "../civics";
import { historyModules } from "../history";

const allChapters: (CivicsChapter | HistoryChapter)[] = [...civicsModules, ...historyModules];

export const class10ChapterRevision: { chapterId: string; title: string; keyPoints: string[] }[] =
  allChapters.map((m) => ({
    chapterId: m.id,
    title: m.title,
    keyPoints: m.quickRevision.keyPoints,
  }));

export const class10MemoryTips: { chapterId: string; title: string; memoryTip: string; examTip: string }[] =
  allChapters.map((m) => ({
    chapterId: m.id,
    title: m.title,
    memoryTip: m.quickRevision.memoryTip,
    examTip: m.quickRevision.examTip,
  }));

export const class10ExamChecklist: string[] = [
  "Civics: memorise the Numbers ladder - LS 550 / RS 250; ages 25 / 30 / 35; terms 5 / 6 years.",
  "Civics: keep the emergency articles ready - 352, 356, 360 - with two effects each.",
  "Civics: rehearse the writs (H-M-P-C-Q) and judiciary ages (Supreme 65, High Court 62).",
  "History: master the 1857 answer in four blocks - causes, administration, Proclamation, army.",
  "History: build the movement-trigger table - NCM (R-J-K), CDM (S-P), QIM (C-J).",
  "History: keep dates 1857-85-05-06-07-16 at your fingertips.",
  "History: for WWII, memorise six causes and the consequence trio (Axis defeat, UN, Cold War).",
  "History: agencies' cities - UNICEF New York, WHO Geneva, UNESCO Paris.",
  "History: NAM - meaning, objectives, Panchsheel, Nehru, Belgrade 1961.",
  "Attempt Section A and Section B in the same order as the paper; never leave Part I blanks.",
];