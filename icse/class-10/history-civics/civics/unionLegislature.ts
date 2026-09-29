import type { CivicsChapter } from "../types";

export const unionLegislature: CivicsChapter = {
  id: "icse-10-hc-civ-01",
  title: "The Union Legislature",
  difficulty: "hard",
  learningObjective:
    "Understand the federal setup in India, the composition and powers of the Lok Sabha, Rajya Sabha and the Union Parliament, and key parliamentary procedures.",
  overview:
    "India is a federation with a Union Parliament at the centre. The Parliament consists of the President, the Lok Sabha and the Rajya Sabha. The Lok Sabha is the House of the People, directly elected; the Rajya Sabha is the Council of States, indirectly elected. Together they make laws, control finance and the executive, and stand as the supreme legislative authority of the Union.",
  sections: [
    {
      id: "s1",
      title: "Meaning of the Federal Setup in India",
      explanation:
        "A federation is a system in which powers are divided between a central (Union) government and state governments, both deriving authority from a written constitution. In India, this division is given in the Constitution, and the Union Parliament legislates on Union List subjects while states legislate on State List subjects; the Concurrent List is shared.",
      keyPoints: [
        "Federal setup: division of powers between the Union and the States.",
        "Three lists: Union List, State List, Concurrent List.",
        "The Union Parliament is the legislature of the Union.",
        "Parliament = President + Lok Sabha + Rajya Sabha.",
        "Bicameral legislature: two Houses with different characters and roles.",
      ],
      whyItMatters: "Every question about Parliament begins with the correct understanding of the federal structure.",
    },
    {
      id: "s2",
      title: "The Lok Sabha: Composition, Qualifications and Term",
      explanation:
        "The Lok Sabha is the directly elected House of the People. Its maximum strength is 550 - up to 530 members from the States and 20 from Union Territories (the earlier provision to nominate two Anglo-Indians was discontinued by the 104th Amendment). Members are elected on the basis of universal adult franchise for a term of five years; it may meet for three sessions a year.",
      keyPoints: [
        "Direct election on the basis of universal adult franchise.",
        "Maximum strength: 550 (530 States + 20 UTs).",
        "Term: five years; may be dissolved earlier.",
        "Qualifications: citizen of India; at least 25 years of age; not holding an office of profit; etc.",
        "Sessions: normally three in a year - Budget, Monsoon and Winter sessions.",
        "Quorum: one-tenth of the total membership must be present for a sitting.",
      ],
      whyItMatters: "Numbers (550), the five-year term and qualifications are frequent one-mark and short-answer points.",
    },
    {
      id: "s3",
      title: "Parliamentary Procedures",
      explanation:
        "Business in the House is conducted through recognised procedures: the Question Hour (starred, unstarred and short-notice questions), Zero Hour, adjournment motions and the no-confidence motion. The Speaker presides, and the Anti-Defection Law disqualifies members who change parties. Bills must be passed before becoming law - ordinary bills by both Houses; money bills only in the Lok Sabha.",
      keyPoints: [
        "Question Hour: the first hour - members question ministers.",
        "Starred questions: require 10 days' notice; answered orally; marked with an asterisk.",
        "Unstarred questions: answered in writing; no oral supplementaries.",
        "Short-notice questions: less than 10 days' notice; answered orally if admitted.",
        "Zero Hour: the time just after Question Hour when members raise urgent matters without prior notice.",
        "Adjournment motion: to discuss an urgent matter of public importance; needs support; interrupts normal business.",
        "No-confidence motion: only in the Lok Sabha; if passed, the Council of Ministers resigns.",
        "Anti-Defection Law (Tenth Schedule): disqualifies defectors.",
        "Ordinary bill: passes both Houses; money bill: introduced only in the Lok Sabha with the President's recommendation; Rajya Sabha can hold it for 14 days but cannot amend or reject it.",
      ],
      whyItMatters: "Procedure questions (question types, zero hour, no-confidence) appear almost every year.",
    },
    {
      id: "s4",
      title: "The Speaker",
      explanation:
        "The Speaker is elected by the members of the Lok Sabha from among themselves. The Speaker presides over the House, maintains order, decides which bills are money bills, and exercises a casting vote in case of a tie. The Speaker can be removed by a resolution passed by a majority of all the then members of the House after 14 days' notice.",
      keyPoints: [
        "Election: from among the members of the Lok Sabha.",
        "Removal: resolution of the House (effective majority) after 14 days' notice.",
        "Functions: presides over sittings; maintains discipline; casting vote; certifies money bills.",
        "The Speaker's decisions on procedure are final.",
      ],
      whyItMatters: "The Speaker's election, removal and functions form a standard short-answer set.",
    },
    {
      id: "s5",
      title: "The Rajya Sabha",
      explanation:
        "The Rajya Sabha is the Council of States. Its maximum strength is 250 - up to 238 representatives of States and Union Territories elected indirectly by the elected members of State Legislative Assemblies, and 12 members nominated by the President for contributions to literature, science, art and social service. Members serve six years, with one-third retiring every two years.",
      keyPoints: [
        "Maximum strength: 250 (238 elected + 12 nominated).",
        "Election: indirectly, by MLAs through proportional representation (single transferable vote).",
        "Term: six years; one-third retires every two years; never dissolved.",
        "Qualifications: citizen of India; at least 30 years of age; etc.",
        "Presiding officer: the Vice-President of India is its ex-officio Chairman; a Deputy Chairman is elected from members.",
      ],
      whyItMatters: "The 'never dissolved / one-third retire' facts distinguish the Rajya Sabha in every comparison question.",
    },
    {
      id: "s6",
      title: "Powers and Functions of the Union Parliament",
      explanation:
        "The Union Parliament performs legislative, financial, judicial, electoral and amendment functions, and controls the executive. Some powers are exclusive: only the Lok Sabha can pass money bills and a no-confidence motion; the Rajya Sabha alone can authorise Parliament to make a law on a State List subject in the national interest and can create new All India Services.",
      keyPoints: [
        "Legislative: makes laws on Union and Concurrent List subjects.",
        "Financial: passes the budget; no money bill without the Lok Sabha's will.",
        "Judicial: can impeach the President; removes judges on proved misbehaviour.",
        "Electoral: elects the President and Vice-President; MLAs join in electing the President.",
        "Amendment: participates in constitutional amendments.",
        "Control over executive: questions, motions, no-confidence.",
        "Exclusive powers of the Lok Sabha: money bills; no-confidence motion.",
        "Exclusive powers of the Rajya Sabha: legislate on State List in the national interest (Article 249); create All India Services (Article 312).",
      ],
      whyItMatters: "The 'powers' list with exclusive powers of each House is a classic six-mark question.",
    },
  ],
  keyTerms: [
    { term: "Federation", meaning: "A union of states with division of powers between central and state governments." },
    { term: "Parliament", meaning: "The Union legislature: President + Lok Sabha + Rajya Sabha." },
    { term: "Lok Sabha", meaning: "The directly elected House of the People; maximum strength 550." },
    { term: "Rajya Sabha", meaning: "The indirectly elected Council of States; maximum strength 250; permanent House." },
    { term: "Quorum", meaning: "One-tenth of the total membership - the minimum needed to conduct a sitting." },
    { term: "Question Hour", meaning: "The hour when members question ministers." },
    { term: "Zero Hour", meaning: "Time immediately after Question Hour for urgent matters." },
    { term: "No-confidence Motion", meaning: "A motion in the Lok Sabha expressing lack of confidence in the Council of Ministers." },
    { term: "Money Bill", meaning: "A bill dealing with taxes and spending; introduced only in the Lok Sabha." },
    { term: "Anti-Defection Law", meaning: "Law disqualifying members who change parties." },
    { term: "Speaker", meaning: "Presiding officer of the Lok Sabha elected from its members." },
  ],
  keyInstitutions: [
    {
      name: "Lok Sabha",
      composition: "Up to 550 directly elected members (530 States + 20 UTs).",
      functions: ["Makes laws with the Rajya Sabha", "Controls finance; passes money bills", "Controls the executive through no-confidence", "Elects the President with the Rajya Sabha and MLAs"],
      powers: ["No-confidence motion", "Money bills", "Exclusive control over the Council of Ministers' survival"],
    },
    {
      name: "Rajya Sabha",
      composition: "Up to 250 members (238 elected by MLAs; 12 nominated by the President).",
      functions: ["Reviews and revises legislation", "Represents States' interests", "Elects the President and Vice-President"],
      powers: ["Article 249: legislate on State List in national interest", "Article 312: create All India Services", "Cannot be dissolved"],
    },
  ],
  practiceQuestions: [
    {
      question: "What is meant by the federal setup in India?",
      answer: "It is the division of powers between the Union and State governments under a written constitution, with Union, State and Concurrent lists distributing subjects.",
      explanation: "Definition + the three lists.",
    },
    {
      question: "State the composition and maximum strength of the Lok Sabha and Rajya Sabha.",
      answer: "Lok Sabha: maximum 550 members (530 States + 20 UTs), directly elected. Rajya Sabha: maximum 250 (238 elected + 12 nominated), indirectly elected.",
      explanation: "Accurate numbers are essential.",
    },
    {
      question: "Distinguish between a starred and an unstarred question.",
      answer: "A starred question needs 10 days' notice and is answered orally with supplementaries; an unstarred question is answered in writing.",
      explanation: "Focus on notice, manner of answer and supplementaries.",
    },
    {
      question: "What is the Anti-Defection Law?",
      answer: "Under the Tenth Schedule, members who voluntarily resign from their party or defy its whip are disqualified from membership.",
      explanation: "Purpose: to prevent floor-crossing.",
    },
    {
      question: "Explain the exclusive powers of the Rajya Sabha.",
      answer: "It can authorise Parliament to make a law on a State List subject in the national interest (Article 249) and can create new All India Services (Article 312). It is also a permanent House.",
      explanation: "Two specific exclusive powers + the permanence point.",
    },
    {
      question: "How is the Speaker of the Lok Sabha removed?",
      answer: "By a resolution of the House passed by an effective majority after at least 14 days' notice.",
      explanation: "Notice + the special majority requirement.",
    },
  ],
  examQuestions: [
    {
      type: "short",
      marks: 2,
      question: "Mention two qualifications for membership of the Lok Sabha.",
      modelAnswerGuidance: ["Citizen of India", "At least 25 years of age (not holding office of profit)"],
    },
    {
      type: "short",
      marks: 2,
      question: "What is Zero Hour?",
      modelAnswerGuidance: ["Time immediately after Question Hour", "Urgent matters raised without prior notice"],
    },
    {
      type: "structured",
      marks: 4,
      question: "Describe the composition and election of the Rajya Sabha.",
      modelAnswerGuidance: ["238 elected + 12 nominated", "Elected by MLAs - proportional representation", "Six-year term; one-third retire every two years"],
    },
    {
      type: "structured",
      marks: 4,
      question: "Explain the procedure for passing money bills.",
      modelAnswerGuidance: ["Introduced only in Lok Sabha; President's recommendation", "Rajya Sabha cannot amend or reject; 14-day limit", "President's assent"],
    },
    {
      type: "long",
      marks: 6,
      question: "Describe the powers and functions of the Union Parliament, mentioning the exclusive powers of each House.",
      modelAnswerGuidance: ["Legislative, financial, judicial, electoral, amendment, executive control", "Lok Sabha: money bills, no-confidence", "Rajya Sabha: Article 249, 312, permanence"],
    },
  ],
  commonMistakes: [
    "Writing that the Rajya Sabha can be dissolved - it is a permanent House.",
    "Confusing starred (oral) with unstarred (written) questions.",
    "Stating that money bills can be introduced in either House.",
  ],
  quickRevision: {
    keyPoints: [
      "Parliament = President + Lok Sabha + Rajya Sabha; India is a federation.",
      "Lok Sabha: direct election; max 550; 5 years; Speaker heads proceedings.",
      "Rajya Sabha: indirect election; max 250; 6 years; one-third retires biennially; VP is Chairman.",
      "Procedures: question hour (starred/unstarred/short notice), zero hour, adjournment, no-confidence, anti-defection.",
      "Powers: legislative, financial, judicial, electoral, amendment, control of executive; exclusive powers per House.",
    ],
    memoryTip: "Numbers ladder: LS 550 / RS 250; ages: LS 25 / RS 30; terms: LS 5 years / RS 6 years (1/3 retire in 2).",
    examTip: "In Institution answers, always give: composition, election, term, qualifications, powers - in that order.",
  },
};