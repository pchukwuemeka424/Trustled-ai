export type HomeContent = Record<string, string>;

export const defaultHomeContent: HomeContent = {
  heroTagline: "Assess. Automate. Advance.",
  heroHeadline: "AI is moving fast. We help you keep up and prove you have.",
  heroLede:
    "AI governance assessment, shadow AI detection, and training for schools, universities, and regulated SMEs that need to adopt AI responsibly and prove they have.",
  heroPrimaryCta: "Start a conversation",
  heroSecondaryCta: "Explore our services",
  heroBackgroundUrl: "",
  introEyebrow: "Why this matters now",
  introP1:
    "AI is already in your organisation. In the tools your teachers and staff use, in the platforms your IT team deployed for other reasons, in the questions your auditors, governors, regulators, and enterprise customers will ask before the year is out. We help you find it, assess the risk it creates, surface the AI nobody formally approved, and produce the evidence that satisfies the people who ask.",
  introP2:
    "The organisations who handle this well are not the ones with the biggest budgets. They are the ones who scoped the work properly, did it once, and have something to show for it.",
  introClosing: "Tell us where you are, and we will tell you what good looks like.",
  whatWeDoEyebrow: "What we do",
  whatWeDoTitle: "Three engagements, each scoped to your situation.",
  card1Title: "Governance Assessment",
  card1Body:
    "We find every AI system in your organisation, including the embedded AI in tools you did not classify as AI, classify the risk against the EU AI Act, the DfE's product safety expectations, and other relevant frameworks, and produce the governance and documentation that stand up to an auditor's questions.",
  card2Title: "Shadow AI Detection",
  card2Body:
    "We uncover the AI running in your organisation that no one formally approved, from the tools staff signed up for independently to the AI quietly embedded in software you already license. We tell you what is there, what risk it carries, and what to do about it.",
  card3Title: "Training",
  card3Body:
    "Two short, applied programmes for organisations that need their people effective with AI quickly, and confident they are not introducing risk in the process. AI for Work Skills for the day job, the AI Governance Workshop for the leaders and governors setting policy.",
  flowEyebrow: "Where we sit",
  flowTitle: "Between the AI you deploy and everyone asking how you govern it.",
  flowLede:
    "We map your inputs, apply proportionate governance, and produce outputs that satisfy auditors, inspectors, insurers, and enterprise buyers.",
  flowInputsTitle: "Inputs",
  flowInput1: "Your AI tools",
  flowInput2: "Your vendors",
  flowInput3: "Your data flows",
  flowInput4: "Your decisions",
  flowCoreTitle: "Governance, applied",
  flowCoreSmall: "EU AI Act · ISO 42001 · NIST AI RMF · DfE · KCSIE",
  flowOutputsTitle: "Outputs",
  flowOutput1: "Audit-ready evidence",
  flowOutput2: "Defensible risk position",
  flowOutput3: "Board & governor confidence",
  flowOutput4: "Insurable, governed AI",
  statsEyebrow: "The state of play",
  statsTitle: "Most organisations cannot yet answer the questions already arriving.",
  stat1Figure: "31%",
  stat1Desc: "of UK organisations have no AI governance policy in place.",
  stat1Src: "CyXcel / Censuswide, 2025",
  stat2Figure: "3.5%",
  stat2Desc:
    "of compliance professionals describe their firm as fully prepared for AI regulation.",
  stat2Src: "VinciWorks, 2026",
  stat3Figure: "42%",
  stat3Desc:
    "of UK companies abandoned AI initiatives in 2025, with 46% of proofs-of-concept never reaching production.",
  stat3Src: "Resultsense, 2025",
  problemEyebrow: "The reality",
  problemTitle: "Your compliance tools were not built for AI.",
  problem1Title: "Static policies",
  problem1Li1: "Built for yesterday's systems",
  problem1Li2: "Cannot keep pace with how fast AI is adopted",
  problem1Li3: "Checkbox compliance no auditor respects",
  problem2Title: "Audit theatre",
  problem2Li1: "Point-in-time snapshots that age instantly",
  problem2Li2: "Does not cover the decisions AI now makes",
  problem2Li3: "Inspectors asking questions you cannot answer",
  problem3Title: "The gap",
  problem3Li1: "Data governance does not cover AI",
  problem3Li2: "AI governance does not understand your data",
  problem3Li3: "Nobody owns the intersection",
  quoteText:
    "By 2027, a majority of organisations will fail to realise the value of their AI because governance was treated as an afterthought. The ones who build it in now will outpace the rest.",
  quoteSrc: "The view that shapes how we work",
  faqEyebrow: "Common questions",
  faqTitle: "What organisations ask before they engage us.",
  ctaTitle: "Start with a conversation.",
  ctaDescription:
    "A 30-minute conversation, no pitch deck. We will tell you whether we can help.",
};

export function getHomeContentFieldKeys(): string[] {
  return Object.keys(defaultHomeContent);
}
