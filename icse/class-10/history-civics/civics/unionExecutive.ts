import type { CivicsChapter } from "../types";

export const unionExecutive: CivicsChapter = {
  id: "icse-10-hc-civ-02",
  title: "The Union Executive",
  difficulty: "hard",
  learningObjective:
    "Understand the President, the Vice-President, and the Prime Minister and Council of Ministers - their election, powers and responsibilities.",
  overview:
    "The Union Executive consists of the President, the Vice-President, the Prime Minister and the Council of Ministers. The President is the constitutional head of state, elected indirectly; the Prime Minister and the Council of Ministers exercise the real executive power and are responsible to the Lok Sabha.",
  sections: [
    {
      id: "s1",
      title: "The President: Election and Term",
      explanation:
        "The President is elected indirectly by an Electoral College consisting of the elected members of both Houses of Parliament and the elected members of the State Legislative Assemblies (including those of Delhi and Puducherry). Indirect election keeps the office above party politics and preserves the dignity of the head of state. The President holds office for five years and may be re-elected.",
      keyPoints: [
        "Qualifications: citizen of India; at least 35 years of age; qualified to be a member of the Lok Sabha.",
        "Electoral College: elected MPs + elected MLAs of States (and Delhi, Puducherry).",
        "Reason for indirect election: dignity, impartiality, avoidance of direct political contest.",
        "Term: five years; eligible for re-election.",
        "Election disputes decided by the Supreme Court.",
      ],
      whyItMatters: "The electoral college and the reason for indirect election are frequently asked.",
    },
    {
      id: "s2",
      title: "Impeachment and Powers of the President",
      explanation:
        "The President can be removed only for violation of the Constitution, through impeachment: a chargesheet signed by one-fourth of the members of a House, 14 days' notice, and passage by a two-thirds majority of the total membership of both Houses. The President's powers cover executive, legislative, financial, judicial, discretionary and emergency matters.",
      keyPoints: [
        "Impeachment: violation of the Constitution; initiated in either House; two-thirds of total membership of both Houses needed.",
        "Executive: all executive action in the President's name; appoints PM, ministers, judges, governors; supreme command of defence forces.",
        "Legislative: summons and dissolves the Lok Sabha; assent to bills; ordinance-making power (when Parliament is not in session).",
        "Financial: money bills need the President's recommendation; control of the Contingency Fund of India.",
        "Judicial: pardons, reprieves, respites (Article 72).",
        "Discretionary: appointment of PM in unclear situations, etc.",
        "Emergency powers: National (352), State (356), Financial (360) - each with effects such as curbing rights, dissolving state governments, cutting salaries.",
      ],
      whyItMatters: "Emergency powers with 'any two effects of each' are explicitly in the syllabus - prepare a ready table.",
    },
    {
      id: "s3",
      title: "The Vice-President",
      explanation:
        "The Vice-President is elected by an electoral college of the members of both Houses of Parliament (elected + nominated). The office combines two roles: the ex-officio Chairman of the Rajya Sabha, and the acting President when that office falls vacant or the President is temporarily unable to act.",
      keyPoints: [
        "Qualifications: citizen of India; at least 35 years; qualified for Rajya Sabha membership.",
        "Election: by members of both Houses of Parliament (unlike the President, MLAs do not vote).",
        "Term: five years; removal by a resolution of the Rajya Sabha agreed to by the Lok Sabha (14 days' notice).",
        "Powers: presides over the Rajya Sabha; acts as President when needed.",
      ],
      whyItMatters: "Distinguish the VP's electoral college from the President's - a classic comparison question.",
    },
    {
      id: "s4",
      title: "Prime Minister and Council of Ministers",
      explanation:
        "The President appoints the leader of the majority party in the Lok Sabha as Prime Minister, and other ministers on the PM's advice. The Council of Ministers is collectively responsible to the Lok Sabha; individual ministers serve at the President's pleasure. The PM is the keystone of the government - policy maker, head of administration, chief spokesman in Parliament and crisis manager.",
      keyPoints: [
        "Appointment: PM by the President (majority leader); ministers on PM's advice.",
        "Tenure: pleasure of the President; the CoM must retain the Lok Sabha's confidence.",
        "Functions: policy making, administrative, legislative, financial, emergency coordination.",
        "Position of the PM: primus inter pares - first among equals; coordinates, communicates, recommends dissolution, advice on appointments.",
        "Collective responsibility: the whole Council answers to the Lok Sabha.",
        "Individual responsibility: the President may dismiss a minister; ministers must not disagree publicly with government policy.",
        "Council of Ministers vs Cabinet: the CoM includes all ministers; the Cabinet is the smaller inner group that actually decides policy.",
      ],
      whyItMatters: "PM's position, collective vs individual responsibility and CoM vs Cabinet are core examinable points.",
    },
  ],
  keyTerms: [
    { term: "Electoral College", meaning: "The body of elected members that elects the President." },
    { term: "Impeachment", meaning: "The special procedure for removing the President for violation of the Constitution." },
    { term: "Ordinance", meaning: "A temporary law issued by the President when Parliament is not in session." },
    { term: "Emergency Powers", meaning: "Special powers - National, State and Financial - to meet extraordinary situations." },
    { term: "Collective Responsibility", meaning: "The Council of Ministers answers as a body to the Lok Sabha." },
    { term: "Individual Responsibility", meaning: "Each minister is individually answerable; the President may dismiss one." },
    { term: "Cabinet", meaning: "The small core group of senior ministers that decides policy." },
    { term: "Primus Inter Pares", meaning: "'First among equals' - the PM's position in the Council of Ministers." },
  ],
  keyInstitutions: [
    {
      name: "President of India",
      composition: "Elected indirectly by the Electoral College (elected MPs + elected MLAs).",
      functions: ["Appoints PM, ministers, judges and governors", "Assents to bills; issues ordinances", "Supreme command of the armed forces", "Declares emergencies"],
      powers: ["Executive, legislative, financial, judicial, discretionary and emergency powers"],
    },
    {
      name: "Council of Ministers",
      composition: "Prime Minister, Cabinet Ministers, Ministers of State and Deputy Ministers.",
      functions: ["Frames policy", "Introduces and defends legislation", "Manages administration and finance", "Coordinates emergency response"],
      powers: ["Real executive power; remains in office so long as it holds the Lok Sabha's confidence"],
    },
  ],
  constitutionalBasis: [
    "Articles 52-62 - The President of India",
    "Articles 63-71 - The Vice-President",
    "Articles 74-75 - Council of Ministers and the Prime Minister",
  ],
  practiceQuestions: [
    {
      question: "State the qualifications for election to the office of the President of India.",
      answer: "Citizen of India; at least 35 years of age; qualified to be a member of the Lok Sabha.",
      explanation: "Three clear conditions.",
    },
    {
      question: "How is the President of India elected? Why is the election indirect?",
      answer: "Elected by an Electoral College of elected MPs and elected MLAs (Delhi and Puducherry included). Indirect election preserves dignity and keeps the office above direct party contests.",
      explanation: "Composition + reason.",
    },
    {
      question: "What is the procedure for impeachment of the President?",
      answer: "Either House may frame charges for violation of the Constitution; 14 days' notice; the resolution must pass both Houses by a two-thirds majority of their total membership.",
      explanation: "Ground + notice + special majority.",
    },
    {
      question: "Mention any two effects of each emergency.",
      answer: "National emergency: fundamental rights curbed; Union can direct states. State emergency: state government dissolved; Parliament legislates for the state. Financial emergency: salaries cut; budget control.",
      explanation: "Two effects per emergency as the syllabus demands.",
    },
    {
      question: "Distinguish between the Council of Ministers and the Cabinet.",
      answer: "The Council of Ministers includes all categories of ministers; the Cabinet is the smaller inner circle of senior ministers that makes key policy decisions.",
      explanation: "Criterion: size and function.",
    },
    {
      question: "State two differences between the election of the President and the Vice-President.",
      answer: "MLAs vote in the President's election but not in the VP's; the VP is elected only by members of both Houses of Parliament.",
      explanation: "Focus on the electoral colleges.",
    },
  ],
  examQuestions: [
    {
      type: "short",
      marks: 2,
      question: "Mention two discretionary powers of the President.",
      modelAnswerGuidance: ["Appointment of PM in a hung House", "Dismissal of a government that has lost confidence / dissolution decisions"],
    },
    {
      type: "structured",
      marks: 4,
      question: "Describe the position and powers of the Prime Minister of India.",
      modelAnswerGuidance: ["Leader of the majority; head of government", "Policy making and coordination", "Advises President on appointments and dissolution", "Spokesman in Parliament; crisis manager"],
    },
    {
      type: "structured",
      marks: 4,
      question: "Explain collective and individual responsibility of the Council of Ministers.",
      modelAnswerGuidance: ["Collective: whole council answers to Lok Sabha; a loss of confidence brings all down", "Individual: each minister responsible for own department; may be dismissed", "Both are conventions of parliamentary government"],
    },
    {
      type: "long",
      marks: 6,
      question: "Describe the powers of the President under the three types of emergency with two effects of each.",
      modelAnswerGuidance: ["National (352): rights curbed; Union directs states", "State (356): state govt dissolved; President's rule", "Financial (360): salary cuts; finance control", "Conclusion: exceptional powers with parliamentary safeguards"],
    },
  ],
  commonMistakes: [
    "Saying the Vice-President is elected by the same college as the President (MLAs do not vote for the VP).",
    "Confusing collective responsibility (to the Lok Sabha) with individual responsibility (to the President).",
    "Forgetting that the Council of Ministers is the larger body and the Cabinet the smaller powerful core.",
  ],
  quickRevision: {
    keyPoints: [
      "President: indirect election; Electoral College = elected MPs + elected MLAs; 5-year term; impeachment for constitutional violation.",
      "Powers: executive, legislative, financial, judicial, discretionary, emergency (352/356/360 with effects).",
      "Vice-President: elected by both Houses' members; Chairman of Rajya Sabha; acting President.",
      "PM: leader of majority; 'first among equals'; collective and individual responsibility of CoM.",
      "CoM (all ministers) vs Cabinet (core decision makers).",
    ],
    memoryTip: "Emergency ladder 3-5-6: Article 352 National, 356 State, 360 Financial.",
    examTip: "For impeachment questions: ground, notice (14 days), majority (2/3 of total membership, both Houses).",
  },
};