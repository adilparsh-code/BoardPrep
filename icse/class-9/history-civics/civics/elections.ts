import type { CivicsChapter } from "../types";

export const elections: CivicsChapter = {
  id: "icse-9-hc-civ-02",
  title: "Elections",
  difficulty: "easy",
  learningObjective:
    "Understand why elections are held, how the Election Commission is composed, the difference between direct and indirect elections, and the main types of elections.",
  overview:
    "Elections are the process by which citizens choose their representatives. In a democracy like India, elections must be free, fair and held at regular intervals. The Election Commission of India conducts elections to Parliament, State Legislatures and the offices of the President and Vice-President. Elections may be direct or indirect, and include general, mid-term and by-elections.",
  sections: [
    {
      id: "s1",
      title: "Meaning and Importance of Elections",
      explanation:
        "An election is a formal method by which people choose their representatives to run the government. It gives citizens a voice, makes governments accountable, and allows for the peaceful transfer of power.",
      keyPoints: [
        "Election = process of choosing representatives by voting.",
        "Elections convert public opinion into political representation.",
        "Free and fair elections are the heart of democracy.",
        "They allow voters to change an unpopular government peacefully.",
        "Elections are normally held at fixed intervals.",
      ],
      whyItMatters: "Elections are the most important feature of representative democracy - the ICSE syllabus tests their meaning and types.",
    },
    {
      id: "s2",
      title: "The Election Commission",
      explanation:
        "The Election Commission is an independent constitutional body that conducts elections. It is a multi-member body consisting of the Chief Election Commissioner and two other Election Commissioners. Its main functions are to prepare electoral rolls, conduct elections, recognise political parties, advise on disqualification of candidates and supervise the whole election process.",
      keyPoints: [
        "Composition: Chief Election Commissioner + two other Election Commissioners (in brief).",
        "Prepares and updates electoral rolls (voter lists).",
        "Conducts elections to the Lok Sabha, Rajya Sabha, State Legislatures, and the offices of the President and Vice-President.",
        "Recognises political parties and allots symbols.",
        "An independent body - not under the direct control of the government.",
      ],
      whyItMatters: "The neutrality of the Election Commission is what makes Indian elections credible; a favourite short-answer topic.",
    },
    {
      id: "s3",
      title: "Direct and Indirect Election",
      explanation:
        "In a direct election, voters choose their representatives directly by voting. In an indirect election, voters do not choose the final holder of office; instead, an intermediate body of elected persons makes the choice. Lok Sabha, State Legislative Assemblies and Vidhan Sabha elections are direct. The President, the Vice-President and members of the Rajya Sabha (State quota) are chosen indirectly.",
      keyPoints: [
        "Direct election: citizens vote directly for the candidate. Examples: Lok Sabha, Vidhan Sabha.",
        "Indirect election: elected representatives choose the office-holder. Examples: President, Vice-President, Rajya Sabha (State quota).",
        "Direct elections are for the more numerous, representative posts.",
        "Indirect election requires an electoral college for the President.",
      ],
      whyItMatters: "The direct vs indirect distinction is a standard 2-mark question and must be stated with examples.",
    },
    {
      id: "s4",
      title: "Types of Elections",
      explanation:
        "A general election is held when the whole House is elected on the completion of its term (or after its dissolution). A mid-term election takes place before the normal term of a House is over, when the House is dissolved early. A by-election is held to fill a casual vacancy in a single constituency. India follows the first-past-the-post system, in which the candidate with the highest number of votes in a constituency wins.",
      keyPoints: [
        "General election: all or a large number of seats filled; normally every five years.",
        "Mid-term election: held when a House is dissolved before the end of its term.",
        "By-election: held in one constituency to fill a vacancy (due to death, resignation or disqualification).",
        "First-past-the-post: the candidate with the most votes wins each constituency.",
        "Elections are supervised and made fair by the Election Commission.",
      ],
      whyItMatters: "Distinguishing general, mid-term and by-elections is a frequent one-word or short-answer question.",
    },
  ],
  keyTerms: [
    { term: "Election", meaning: "The process by which citizens choose their representatives by voting." },
    { term: "Election Commission", meaning: "An independent constitutional body that conducts and supervises elections in India." },
    { term: "Direct Election", meaning: "An election where voters choose the candidate directly, e.g. Lok Sabha." },
    { term: "Indirect Election", meaning: "An election where representatives (not the people directly) choose the office-holder, e.g. the President." },
    { term: "General Election", meaning: "An election in which all or most seats of a House are filled on completion of its term." },
    { term: "Mid-term Election", meaning: "An election held when a House is dissolved before its term is completed." },
    { term: "By-election", meaning: "An election held to fill a casual vacancy in a single constituency." },
    { term: "Electoral Roll", meaning: "The official list of registered voters in a constituency." },
    { term: "Franchise", meaning: "The right to vote in elections." },
  ],
  constitutionalBasis: [
    "Article 324 - superintendence and conduct of elections vests in the Election Commission",
    "Article 326 - elections to the House of the People on the basis of adult suffrage",
  ],
  keyInstitutions: [
    {
      name: "Election Commission of India",
      composition: "Chief Election Commissioner and two other Election Commissioners.",
      functions: [
        "Prepares and updates electoral rolls.",
        "Conducts elections to Parliament, State Legislatures, and the offices of President and Vice-President.",
        "Recognises political parties and allots election symbols.",
        "Advises the President/Governor on disqualification of members.",
        "Supervises the entire election machinery to ensure free and fair polls.",
      ],
      powers: [
        "To postpone or countermand an election in case of irregularities.",
        "To enforce the Model Code of Conduct during elections.",
      ],
    },
  ],
  practiceQuestions: [
    {
      question: "What is an election?",
      answer: "An election is the process by which citizens choose their representatives by casting votes.",
      explanation: "Definition question - keep it direct.",
    },
    {
      question: "Mention the composition of the Election Commission of India.",
      answer: "The Chief Election Commissioner and two other Election Commissioners.",
      explanation: "It is a multi-member independent body.",
    },
    {
      question: "Distinguish between direct and indirect election with one example each.",
      answer: "Direct election: voters choose the representative directly, e.g. Lok Sabha elections. Indirect election: elected representatives choose the office-holder, e.g. election of the President.",
      explanation: "Examples are essential for full marks.",
    },
    {
      question: "When is a by-election held?",
      answer: "A by-election is held to fill a casual vacancy in a constituency caused by death, resignation or disqualification of a member.",
      explanation: "It concerns a single constituency, unlike a general election.",
    },
    {
      question: "What is a mid-term election?",
      answer: "A mid-term election is one held before the normal term of a House is over, because the House has been dissolved early.",
      explanation: "Link it to dissolution of the House.",
    },
  ],
  examQuestions: [
    {
      type: "short",
      marks: 2,
      question: "State any two functions of the Election Commission.",
      modelAnswerGuidance: ["Prepares electoral rolls", "Conducts elections / recognises parties and allots symbols"],
    },
    {
      type: "short",
      marks: 2,
      question: "Name two offices in India filled by indirect election.",
      modelAnswerGuidance: ["The President", "The Vice-President (or Rajya Sabha State-quota members)"],
    },
    {
      type: "structured",
      marks: 4,
      question: "Explain the terms general election, mid-term election and by-election.",
      modelAnswerGuidance: ["Define each term", "Add when each is held", "One example or condition for each"],
    },
  ],
  commonMistakes: [
    "Confusing mid-term election (whole House dissolved early) with by-election (single seat vacancy).",
    "Writing that the Election Commission is set up by the government of the day - it is a constitutional body.",
    "Forgetting examples in direct/indirect election answers.",
  ],
  quickRevision: {
    keyPoints: [
      "Election = choosing representatives by vote; foundation of democracy.",
      "Election Commission: CEC + two other Commissioners; conducts and supervises elections.",
      "Direct: Lok Sabha, Vidhan Sabha. Indirect: President, Vice-President.",
      "General (full House, five-yearly), Mid-term (early dissolution), By-election (single vacancy).",
      "First-past-the-post system decides winners in constituencies.",
    ],
    memoryTip: "Remember the trio: 'G-M-B' - General, Mid-term, By-election - and the EC trio: one CEC + two ECs.",
    examTip: "In 'distinguish' questions, write both sides in parallel (feature by feature), not two separate paragraphs.",
  },
};