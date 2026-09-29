import type { HistoryChapter } from "../types";

export const vedicPeriod: HistoryChapter = {
  id: "icse-9-hc-his-02",
  title: "The Vedic Period",
  difficulty: "medium",
  learningObjective:
    "Understand the sources of the Vedic period and make a comparative study of early and later Vedic society.",
  background: {
    period: "c. 1500 BCE to 600 BCE",
    context:
      "The Vedic period is named after the Vedas, the oldest religious texts of India. It followed the Harappan Civilisation and saw a shift from small tribal communities to settled agriculture and larger kingdoms.",
  },
  timeline: [
    { year: "c. 1500 BCE", event: "Early Vedic (Rigvedic) age begins; pastoral tribes settle in the north-west.", significance: "Vedic culture takes shape." },
    { year: "c. 1000 BCE", event: "Later Vedic age begins; Agriculture and larger settlements expand eastward.", significance: "Society grows more complex." },
    { year: "c. 600 BCE", event: "The Vedic age ends; the age of Mahajanapadas and the 6th-century religious movements begins.", significance: "Transition to a new historical phase." },
  ],
  overview:
    "The Vedas (Rigveda, Samaveda, Yajurveda and Atharvaveda) and the Epics (Ramayana and Mahabharata) are the main sources for this period. The two phases - Early Vedic and Later Vedic - differ significantly in society, economy, religion and the position of women, and this difference is the focus of the syllabus.",
  sections: [
    {
      id: "s1",
      title: "Sources: Vedas and Epics",
      explanation:
        "The four Vedas are the principal texts: the Rigveda (oldest, hymns), Samaveda (melodies), Yajurveda (rituals) and Atharvaveda (daily life, medicine). The Epics - the Ramayana and the Mahabharata - are later and describe heroic and social values. Together they tell us about religion, society and government.",
      keyPoints: [
        "Rigveda: the oldest Veda; collections of hymns.",
        "Samaveda, Yajurveda, Atharvaveda: the other three Vedas.",
        "Epics: Ramayana and Mahabharata (brief mention).",
        "Vedas were passed down orally as 'Shruti' before being written.",
        "They throw light on religion, society, economy and polity.",
      ],
      whyItMatters: "Naming the sources correctly is a regular 2-mark question.",
    },
    {
      id: "s2",
      title: "Early Vedic Society and Polity",
      explanation:
        "In the Early Vedic age the people were primarily pastoral, living in tribal settlements. The tribe was governed by a chief (Rajan) assisted by assemblies - the Sabha and Samiti. Society was relatively fluid; women could participate in public life, and varna distinctions were not rigid.",
      keyPoints: [
        "Pastoral economy; cattle was the main measure of wealth.",
        "Tribal polity: Rajan (chief) with Sabha and Samiti assemblies.",
        "Religion: worship of nature gods like Indra, Agni and Varuna, through yajnas.",
        "Society comparatively equal; caste (varna) system not rigid yet.",
        "Women could take part in assemblies and education.",
      ],
      whyItMatters: "Early Vedic features form the first half of the comparative study.",
    },
    {
      id: "s3",
      title: "Later Vedic Society and Polity",
      explanation:
        "In the Later Vedic age, settled agriculture and larger kingdoms replaced tribal life. Kings became powerful, rituals grew elaborate, the varna system became rigid, and the status of women declined. New political units (Janapadas) emerged.",
      keyPoints: [
        "Shift to settled agriculture; iron tools came into use.",
        "Larger kingdoms (Janapadas); kings performed grand yajnas.",
        "Assemblies (Sabha and Samiti) lost their importance.",
        "Varna system became rigid; birth-based social divisions hardened.",
        "Status of women declined; education and freedom were restricted.",
      ],
      whyItMatters: "The later Vedic changes set the scene for Buddhism and Jainism, which reacted against ritualism.",
    },
    {
      id: "s4",
      title: "Comparative Study: Early vs Later Vedic Society",
      explanation:
        "The comparison is best done point by point. Polity: tribal chief with strong assemblies in the early phase; powerful kings with weaker assemblies later. Economy: cattle-based pastoralism earlier; agriculture and trade later. Society: flexible and comparatively equal earlier; rigid varna divisions later. Women: honoured and educated earlier; restricted later. Religion: simple nature worship earlier; elaborate rituals and sacrifices later.",
      keyPoints: [
        "Polity: Rajan + active Sabha/Samiti vs. strong kings + weakened assemblies.",
        "Economy: pastoralism vs. agriculture and trading.",
        "Society: flexible varna vs. rigid, birth-based varna.",
        "Women: participation and education vs. declining status.",
        "Religion: simple yajnas vs. elaborate sacrifices controlled by priests.",
      ],
      whyItMatters: "Comparative questions ('how did society change from early to later Vedic times?') are asked repeatedly.",
    },
  ],
  keyTerms: [
    { term: "Vedas", meaning: "The four oldest sacred texts - Rigveda, Samaveda, Yajurveda, Atharvaveda." },
    { term: "Rigveda", meaning: "The oldest Veda, containing hymns to various gods." },
    { term: "Sabha and Samiti", meaning: "Assemblies that assisted the tribal chief in the Early Vedic age." },
    { term: "Rajan", meaning: "The tribal chief or king in the Vedic age." },
    { term: "Varna", meaning: "The four-fold social division - Brahmin, Kshatriya, Vaishya, Shudra." },
    { term: "Janapada", meaning: "A territorial kingdom that emerged in the Later Vedic period." },
    { term: "Yajna", meaning: "Sacrifice performed to please the gods." },
    { term: "Ashrama", meaning: "The four stages of life - Brahmacharya, Grihastha, Vanaprastha, Sannyasa." },
  ],
  practiceQuestions: [
    {
      question: "Name the four Vedas and the two Epics.",
      answer: "The four Vedas are the Rigveda, Samaveda, Yajurveda and Atharvaveda; the two Epics are the Ramayana and the Mahabharata.",
      explanation: "Direct recall - keep the names in order.",
    },
    {
      question: "Mention any two ways in which Later Vedic society differed from Early Vedic society.",
      answer: "Any two: polity became king-centred (assemblies weakened); agriculture replaced pastoralism as the mainstay; varna became rigid; women's status declined.",
      explanation: "Two contrasts, point by point.",
    },
    {
      question: "What were the Sabha and the Samiti?",
      answer: "The Sabha and Samiti were assemblies of tribesmen that assisted and advised the tribal chief (Rajan) in the Early Vedic period.",
      explanation: "They show that the early chief was not an absolute ruler.",
    },
    {
      question: "What is meant by Varna? Name the four varnas.",
      answer: "Varna refers to the four-fold social order: Brahmin (priests), Kshatriya (warriors/rulers), Vaishya (traders/farmers) and Shudra (labourers/servants).",
      explanation: "It was originally based on occupation, becoming birth-based later.",
    },
  ],
  examQuestions: [
    {
      type: "short",
      marks: 2,
      question: "Mention two features of the Early Vedic polity.",
      modelAnswerGuidance: ["Tribal chief (Rajan)", "Sabha and Samiti assemblies advised him"],
    },
    {
      type: "structured",
      marks: 4,
      question: "Describe any four changes in the position of women from Early to Later Vedic times.",
      modelAnswerGuidance: ["Early: took part in assemblies, received education", "Early: honoured; could choose partners in some cases", "Later: equality declined; restrictions grew", "Later: domestic sphere only; child marriage trend"],
    },
    {
      type: "long",
      marks: 6,
      question: "Make a comparative study of Early and Later Vedic society under the headings: economy, polity, society and religion.",
      modelAnswerGuidance: ["Four clear headings", "Contrast in each: pastoral vs. agricultural; tribal vs. king-centred; flexible vs. rigid varna; simple vs. elaborate ritualism", "Short conclusion on the transition"],
    },
  ],
  commonMistakes: [
    "Not contrasting the two phases point by point - the question demands comparison, not description.",
    "Confusing the Vedas with the Epics; mixing up Samaveda and Yajurveda.",
    "Forgetting that the caste system existed in early times too - it was just flexible then.",
  ],
  quickRevision: {
    keyPoints: [
      "Sources: 4 Vedas (Rig, Sama, Yajur, Atharva) + Epics (Ramayana, Mahabharata).",
      "Early Vedic: pastoral, tribal, Rajan + Sabha/Samiti, flexible society, women honoured.",
      "Later Vedic: agriculture, janapadas, powerful kings, rigid varna, women's status declined.",
      "Religion moved from simple nature worship to elaborate sacrifices.",
    ],
    memoryTip: "Early = 'E for Egalitarian and Everyone in assemblies'; Later = 'L for Land, kings and Limited rights'.",
    examTip: "For comparative questions, use a two-column mental table and write paired points (early X vs later Y).",
  },
};