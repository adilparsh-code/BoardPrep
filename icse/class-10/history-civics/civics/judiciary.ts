import type { CivicsChapter } from "../types";

export const judiciary: CivicsChapter = {
  id: "icse-10-hc-civ-03",
  title: "The Judiciary",
  difficulty: "hard",
  learningObjective:
    "Understand the composition, appointment, independence and jurisdiction of the Supreme Court and High Courts, and the role of subordinate courts and Lok Adalats.",
  overview:
    "The judiciary interprets the Constitution and the laws, protects Fundamental Rights and settles disputes. India has a single integrated judiciary: the Supreme Court at the apex, High Courts in the states, and subordinate courts below. Judicial review and writs make the courts the guardian of the Constitution and of citizens' rights.",
  sections: [
    {
      id: "s1",
      title: "The Supreme Court: Composition and Appointment",
      explanation:
        "The Supreme Court consists of the Chief Justice of India and other judges (currently up to 33, making a total of 34). Judges are appointed by the President. A person qualifies if he/she is a citizen of India and has been a High Court judge for five years, or a High Court advocate for ten years, or is a distinguished jurist in the President's opinion. Judges hold office until 65 years of age.",
      keyPoints: [
        "Composition: Chief Justice of India + other judges (maximum total 34 at present).",
        "Qualifications: citizen; 5 years High Court judge or 10 years High Court advocate or distinguished jurist.",
        "Appointment: by the President (in practice, after consultation with the judiciary).",
        "Retirement: at 65 years of age.",
        "Security of tenure: removability only for proved misbehaviour or incapacity, by a special majority of both Houses of Parliament.",
      ],
      whyItMatters: "Composition, qualifications and removal form the standard first part of every judiciary question.",
    },
    {
      id: "s2",
      title: "Independence of the Judiciary",
      explanation:
        "The independence of judges from the executive and the legislature is ensured by several safeguards: a difficult removal procedure, salaries and allowances charged on the Consolidated Fund of India (not subject to Parliament's vote), no practice after retirement in the same court, and the courts' power to punish for contempt. Independent judges can protect citizens against misuse of power.",
      keyPoints: [
        "Removal only by impeachment-like process (special majority on proved misbehaviour).",
        "Salaries charged on the Consolidated Fund - cannot be reduced to pressure judges.",
        "Judges' conduct cannot be criticised in Parliament except on a removal motion.",
        "Contempt power shields the dignity of courts.",
        "Appointments insulated from politics in practice (collegium system).",
      ],
      whyItMatters: "Independence safeguards are asked as 'how is the independence of the judiciary ensured?'",
    },
    {
      id: "s3",
      title: "Jurisdiction and Functions of the Supreme Court",
      explanation:
        "The Supreme Court's jurisdiction is original (disputes between the Union and States, and enforcement of Fundamental Rights through writs), appellate (appeals in civil, criminal and constitutional matters), advisory (the President may seek its opinion), revisory (it may review its own judgments) and it is the Court of Record (its proceedings are evidence and it can punish for contempt). It also exercises judicial review over laws and executive actions.",
      keyPoints: [
        "Original: Union-State and inter-state disputes; writs for Fundamental Rights.",
        "Appellate: appeals from High Courts (civil, criminal, constitutional).",
        "Advisory: opinion on questions of law or fact referred by the President (Article 143).",
        "Revisory: reviews its own verdicts.",
        "Judicial Review: declares laws/actions unconstitutional if they violate the Constitution.",
        "Court of Record: records are permanent evidence; contempt power.",
        "Writs: habeas corpus, mandamus, prohibition, certiorari, quo warranto.",
      ],
      whyItMatters: "Naming the jurisdictions and the five writs is the most heavily tested part of the chapter.",
    },
    {
      id: "s4",
      title: "High Courts and Subordinate Courts",
      explanation:
        "There is a High Court for each state or a group of states, consisting of a Chief Justice and other judges, appointed by the President. Its jurisdiction resembles the Supreme Court's at the state level: original (writs), appellate, revisory, judicial review and court of record. Below it, District Judge courts try civil cases while Sessions Courts try criminal cases; Lok Adalats provide speedy, inexpensive, compromise-based justice.",
      keyPoints: [
        "High Court: Chief Justice + judges; appointed by the President; retirement at 62.",
        "Qualifications: 10 years judicial office or 10 years High Court advocate.",
        "Jurisdiction: original (writs), appellate, revisory, judicial review, court of record.",
        "Subordinate courts: District Judge court (civil) vs Sessions Court (criminal).",
        "Lok Adalats: people's courts; no court fee; quick, compromise-based settlements; advantages for the poor.",
      ],
      whyItMatters: "The District vs Sessions distinction and Lok Adalats are explicitly named in the syllabus.",
    },
  ],
  keyTerms: [
    { term: "Judicial Review", meaning: "The power of courts to declare laws and actions unconstitutional." },
    { term: "Court of Record", meaning: "A court whose records are permanent evidence; it can punish for contempt." },
    { term: "Original Jurisdiction", meaning: "The power to hear a case first, not on appeal." },
    { term: "Appellate Jurisdiction", meaning: "The power to hear appeals against lower courts' decisions." },
    { term: "Advisory Jurisdiction", meaning: "The Supreme Court's power to advise the President on referred questions." },
    { term: "Writ", meaning: "A written court order protecting rights (e.g. habeas corpus)." },
    { term: "Lok Adalat", meaning: "A people's court for quick, amicable settlement of disputes." },
    { term: "Sessions Court", meaning: "The court that tries serious criminal cases at the district level." },
  ],
  keyInstitutions: [
    {
      name: "Supreme Court of India",
      composition: "Chief Justice of India + other judges (maximum total 34 at present).",
      functions: ["Guardian of the Constitution; judicial review", "Protects Fundamental Rights through writs", "Final court of appeal", "Advises the President on referred questions"],
      powers: ["Original, appellate, advisory and revisory jurisdiction", "Court of record; contempt power", "Review of its own judgments"],
    },
    {
      name: "High Court",
      composition: "Chief Justice + such number of judges as the President determines.",
      functions: ["Supervises subordinate courts", "Issues writs in its territorial jurisdiction", "Hears appeals from district courts"],
      powers: ["Original, appellate, revisory jurisdiction", "Judicial review", "Court of record"],
    },
  ],
  constitutionalBasis: [
    "Articles 124-147 - The Supreme Court",
    "Articles 214-231 - The High Courts",
    "Article 32 - Right to Constitutional Remedies (writs)",
  ],
  practiceQuestions: [
    {
      question: "State the qualifications for appointment as a judge of the Supreme Court.",
      answer: "A citizen of India who has been a High Court judge for 5 years, or a High Court advocate for 10 years, or is, in the President's opinion, a distinguished jurist.",
      explanation: "Any one of the three routes qualifies.",
    },
    {
      question: "Name the five writs issued by the courts.",
      answer: "Habeas corpus, mandamus, prohibition, certiorari and quo warranto.",
      explanation: "Learn the spelling and one-line meaning of each.",
    },
    {
      question: "What is judicial review?",
      answer: "The power of the higher courts to examine laws and executive actions and declare them void if they violate the Constitution.",
      explanation: "Tool of constitutional supremacy.",
    },
    {
      question: "Distinguish between the Court of the District Judge and the Sessions Court.",
      answer: "The Court of the District Judge tries civil cases; the Sessions Court tries serious criminal cases. The same judge often presides over both courts.",
      explanation: "Civil vs criminal division.",
    },
    {
      question: "What are Lok Adalats? State two advantages.",
      answer: "People's courts that settle disputes amicably. Advantages: no court fee; quick disposal; compromise-based, poor-friendly justice (any two).",
      explanation: "Meaning + two advantages.",
    },
    {
      question: "How is the independence of the judiciary safeguarded?",
      answer: "Difficult removal procedure; salaries charged on the Consolidated Fund; contempt power; insulation of conduct from Parliament's criticism (any two or three).",
      explanation: "List the safeguards.",
    },
  ],
  examQuestions: [
    {
      type: "short",
      marks: 2,
      question: "Mention two jurisdictions of the High Court.",
      modelAnswerGuidance: ["Original (writs)", "Appellate (appeals from subordinate courts)"],
    },
    {
      type: "short",
      marks: 2,
      question: "What is meant by advisory jurisdiction?",
      modelAnswerGuidance: ["Supreme Court may advise the President", "On questions of law or fact referred to it (Article 143)"],
    },
    {
      type: "structured",
      marks: 4,
      question: "Describe the composition and qualifications of the Supreme Court of India.",
      modelAnswerGuidance: ["CJI + judges (max 34)", "Qualification routes: HC judge 5 yrs / HC advocate 10 yrs / distinguished jurist", "Appointment by President; retirement at 65"],
    },
    {
      type: "structured",
      marks: 4,
      question: "Explain how the writs protect Fundamental Rights.",
      modelAnswerGuidance: ["List the five writs", "One-line function of each", "Article 32: right to remedies"],
    },
    {
      type: "long",
      marks: 6,
      question: "Describe the jurisdiction and functions of the Supreme Court of India. How does it protect citizens' rights?",
      modelAnswerGuidance: ["Original, appellate, advisory, revisory", "Judicial review; court of record", "Writs; enforcement of FR", "Conclusion: guardian of the Constitution"],
    },
  ],
  commonMistakes: [
    "Mixing the retirement ages (Supreme Court 65; High Court 62).",
    "Confusing the District Judge court (civil) with the Sessions Court (criminal).",
    "Writing 'advice' given by the Supreme Court as binding - it is not.",
  ],
  quickRevision: {
    keyPoints: [
      "Supreme Court: CJI + 33; appointed by President; retire at 65; removable only for misbehaviour.",
      "Jurisdictions: original, appellate, advisory, revisory; court of record; judicial review.",
      "Writs: habeas corpus, mandamus, prohibition, certiorari, quo warranto.",
      "High Court: state level; retire at 62; similar jurisdictions.",
      "Subordinate courts: District Judge (civil) vs Sessions (criminal); Lok Adalats (quick, cheap).",
    ],
    memoryTip: "Writ rally: 'H-M-P-C-Q' - Habeas, Mandamus, Prohibition, Certiorari, Quo warranto.",
    examTip: "Ages: Supreme 65 / High 62; note them in one line at the top of a judiciary answer to secure easy marks.",
  },
};