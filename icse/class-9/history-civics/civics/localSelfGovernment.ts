import type { CivicsChapter } from "../types";

export const localSelfGovernment: CivicsChapter = {
  id: "icse-9-hc-civ-03",
  title: "Local Self Government",
  difficulty: "medium",
  learningObjective:
    "Understand how local bodies govern villages and towns, the three-tier structure of Panchayati Raj, and the functions of rural and urban local bodies.",
  overview:
    "Local self-government means the management of local affairs by local bodies whose members are elected by the local people. In rural areas, the three-tier Panchayati Raj system consists of the Gram Panchayat, Panchayat Samiti and Zila Parishad. In urban areas, Municipal Committees and Municipal Corporations are responsible for local administration. The 73rd and 74th Constitutional Amendments (1992) gave constitutional status to these bodies.",
  sections: [
    {
      id: "s1",
      title: "Meaning and Importance of Local Self Government",
      explanation:
        "Local self-government is the management of local affairs by local bodies elected by the people of that area. It brings governance to the doorstep of citizens, solves local problems quickly, and acts as a training ground for democracy.",
      keyPoints: [
        "Local bodies are elected by the local people and handle local matters.",
        "It is the foundation of grassroots democracy in India.",
        "Solves local problems like water, roads, sanitation and schools.",
        "Provides political education and experience to ordinary citizens.",
        "Encourages people's participation in administration.",
      ],
      whyItMatters: "Local government connects citizens directly with administration - a democratic right and responsibility.",
    },
    {
      id: "s2",
      title: "Rural Local Self Government: The Three-Tier Panchayati Raj",
      explanation:
        "In rural areas, local government works through a three-tier system called Panchayati Raj: (1) Gram Panchayat at the village level, (2) Panchayat Samiti at the block level, and (3) Zila Parishad at the district level. Each tier performs and coordinates a range of functions and passes plans upwards to the next tier.",
      keyPoints: [
        "Gram Panchayat (village level): elected body; functions include supplying water, street lighting, sanitation, maintaining village roads and records.",
        "Panchayat Samiti (block level): coordinates the work of village panchayats; looks after block-level development like schools, health centres and rural roads.",
        "Zila Parishad (district level): the apex rural body; coordinates and supervises all panchayats in the district; prepares district development plans and distributes funds.",
        "Members are elected by the local people; officers assist the elected members technically.",
        "Functions typically include water, roads, education, health, agriculture and sanitation.",
      ],
      whyItMatters: "The three tiers, their names and two functions each are the most commonly asked factual points.",
    },
    {
      id: "s3",
      title: "Urban Local Self Government: Committees and Corporations",
      explanation:
        "In towns and cities, urban local bodies look after civic services. Smaller or transitional towns have a Municipal Committee (headed by a Chairman), while large cities have a Municipal Corporation (headed by a Mayor). Both perform similar civic functions according to the size and needs of the city.",
      keyPoints: [
        "Municipal Committee: for smaller towns and cities; headed by a Chairman.",
        "Municipal Corporation: for large cities; headed by a Mayor.",
        "Functions (any four): water supply, drainage and sanitation, roads and lighting, hospitals and dispensaries, schools and libraries, fire services and town planning.",
        "Members are elected from wards of the city.",
        "Funds come from local taxes, grants from the state government and fees.",
      ],
      whyItMatters: "A frequent question: distinguish or list functions of Municipal Committees and Corporations.",
    },
  ],
  keyTerms: [
    { term: "Local Self Government", meaning: "Management of local affairs by locally elected bodies." },
    { term: "Panchayati Raj", meaning: "The three-tier system of rural local government in India." },
    { term: "Gram Panchayat", meaning: "The village-level elected body of the Panchayati Raj system." },
    { term: "Panchayat Samiti", meaning: "The block-level body that coordinates village panchayats." },
    { term: "Zila Parishad", meaning: "The district-level apex body of the rural local government." },
    { term: "Municipal Committee", meaning: "The urban local body for smaller towns, headed by a Chairman." },
    { term: "Municipal Corporation", meaning: "The urban local body for large cities, headed by a Mayor." },
    { term: "Ward", meaning: "A small division of a city or town for election of municipal members." },
  ],
  constitutionalBasis: [
    "73rd Constitutional Amendment (1992) - gave constitutional status to rural local bodies (Panchayati Raj)",
    "74th Constitutional Amendment (1992) - gave constitutional status to urban local bodies (Municipalities)",
  ],
  keyInstitutions: [
    {
      name: "Gram Panchayat",
      composition: "Elected members from village wards, headed by a Sarpanch/Pradhan.",
      functions: [
        "Supply of drinking water and maintenance of wells and ponds.",
        "Street lighting and sanitation.",
        "Maintenance of village roads and drainage.",
        "Maintenance of records of births, deaths and marriages.",
      ],
      powers: ["Levies local taxes and fees", "Implements village-level development schemes"],
    },
    {
      name: "Municipal Corporation",
      composition: "Elected councillors from city wards; presided over by the Mayor; supported by officials.",
      functions: [
        "Water supply and drainage.",
        "Roads, streets and lighting.",
        "Public health: hospitals, dispensaries, sanitation.",
        "Education: schools and libraries (partly).",
        "Fire services and town planning.",
      ],
      powers: ["Levy and collect taxes such as property tax", "Make bye-laws for city administration"],
    },
  ],
  practiceQuestions: [
    {
      question: "Name the three tiers of the Panchayati Raj system.",
      answer: "Gram Panchayat (village), Panchayat Samiti (block) and Zila Parishad (district).",
      explanation: "Order from bottom to top is important.",
    },
    {
      question: "State any four functions of a Municipal Corporation.",
      answer: "Any four: water supply; roads and lighting; public health and sanitation; fire services; town planning; schools and libraries.",
      explanation: "Answers should be civic functions, not state subjects.",
    },
    {
      question: "Who heads a Municipal Committee and who heads a Municipal Corporation?",
      answer: "A Municipal Committee is headed by a Chairman; a Municipal Corporation is headed by a Mayor.",
      explanation: "Common one-word question.",
    },
    {
      question: "State any four functions of a Gram Panchayat.",
      answer: "Any four: drinking water supply; street lighting; sanitation; maintenance of village roads; keeping birth and death records.",
      explanation: "Stick to village-level functions.",
    },
    {
      question: "Why is local self-government important?",
      answer: "It solves local problems quickly through local bodies, trains people in democracy and increases their participation in administration.",
      explanation: "Importance = participation, quick solutions, training in democracy.",
    },
  ],
  examQuestions: [
    {
      type: "short",
      marks: 2,
      question: "Mention any two functions of the Zila Parishad.",
      modelAnswerGuidance: ["Coordinates and supervises panchayats in the district", "Prepares district development plans / distributes funds"],
    },
    {
      type: "structured",
      marks: 4,
      question: "Explain the three-tier structure of the Panchayati Raj system in rural India.",
      modelAnswerGuidance: ["Gram Panchayat - village level", "Panchayat Samiti - block level", "Zila Parishad - district level", "One function of each to complete the answer"],
    },
    {
      type: "long",
      marks: 6,
      question: "Describe the composition and any four functions of urban local bodies.",
      modelAnswerGuidance: ["Municipal Committee and Municipal Corporation", "Heads: Chairman and Mayor", "Functions: water, roads, health, fire, planning", "Source of funds"],
    },
  ],
  commonMistakes: [
    "Mixing up the three tiers of Panchayati Raj or their levels (village/block/district).",
    "Writing Municipal Corporation for villages - municipalities are urban bodies only.",
    "Forgetting that these bodies were given constitutional status by the 73rd and 74th Amendments (1992).",
  ],
  quickRevision: {
    keyPoints: [
      "Local self-government = local affairs managed by locally elected bodies.",
      "Rural: Gram Panchayat (village), Panchayat Samiti (block), Zila Parishad (district).",
      "Urban: Municipal Committee (Chairman) for smaller towns; Municipal Corporation (Mayor) for big cities.",
      "Functions: water, roads, sanitation, health, education, fire services, town planning.",
      "73rd and 74th Amendments (1992) gave them constitutional status.",
    ],
    memoryTip: "V-B-D for rural (Village-Block-District) and 'Chair smaller, Mayor bigger' for urban heads.",
    examTip: "When asked for 'any four functions', give exactly four short, distinct civic functions - no explanations needed.",
  },
};