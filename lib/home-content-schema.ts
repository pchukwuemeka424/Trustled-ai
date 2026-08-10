export type HomeContent = Record<string, string>;

export const defaultHomeContent: HomeContent = {
  heroTagline: "Govern. Automate. Advance.",
  heroHeadline: "Helping Organisations Govern, Build and Scale AI",
  heroLede:
    "AI governance advisory, AI solutions and automation services, and professional training that help organisations harness AI securely, meet regulatory obligations and build lasting capability.",
  heroPrimaryCta: "Start a conversation",
  heroSecondaryCta: "Explore our services",
  heroBackgroundUrl: "",
  introEyebrow: "Why this matters now",
  introImageUrl: "/images/why-matters-now.png",
  introImageAlt:
    "Voxel-style human face assembling from blue and white digital cubes against a dark background",
  introP1:
    "AI is already reshaping how organisations work, make decisions and deliver services. The organisations that succeed are not the ones that adopt the most tools — they are the ones that govern AI properly, build solutions people trust, and equip their people with lasting capability.",
  introP2:
    "TrustLed AI brings governance advisory, AI solutions and automation, and professional training together so innovation and accountability move at the same pace.",
  introClosing: "Tell us where you are, and we will tell you what good looks like.",
  whatWeDoEyebrow: "What we do",
  whatWeDoTitle:
    "Governance, technology and capability that help organisations realise the full value of AI.",
  card1Title: "AI Governance Advisory",
  card1Intro:
    "Responsible AI adoption starts with effective governance. We help organisations establish the policies, frameworks and oversight needed to deploy AI with confidence. Whether you're developing AI systems or adopting third-party solutions, we provide expert advisory services covering AI governance, risk management, regulatory compliance and responsible AI.",
  card1ListIntro:
    "Our advisory services are aligned with leading international frameworks and regulations, including:",
  card1Items:
    "ISO/IEC 42001 – The international standard for implementing an Artificial Intelligence Management System (AIMS).\nNIST AI Risk Management Framework – A practical framework for identifying, assessing and managing AI risks throughout the AI lifecycle.\nEU AI Act – Compliance advisory for organisations developing, deploying or using AI systems subject to the European Union's risk-based AI regulation.\nUK Pro-Innovation AI Regulatory Principles – Guidance that supports compliance with the UK's evolving AI regulatory landscape across sector regulators.\nNigeria Data Protection Act (NDPA) and National AI Strategy – Governance, privacy and responsible AI guidance for organisations operating within Nigeria.",
  card1Closing:
    "We work with organisations across the UK, Nigeria and Europe to build practical AI governance programmes that enable innovation while strengthening accountability, regulatory compliance, security and stakeholder trust.",
  card2Title: "AI Solutions & Automation Services",
  card2Intro:
    "We design and develop AI-powered software and intelligent automation solutions that improve efficiency, reduce manual effort and solve real operational challenges. From custom AI applications and workflow automation to governed AI platforms like GARIL AI, every solution is built with governance, security and privacy embedded from the outset.",
  card2ListIntro:
    "Our approach begins with understanding how your organisation works, then designing solutions that integrate with your existing systems:",
  card2Items:
    "Custom AI application development\nWorkflow automation and business process optimisation\nInternal AI assistants and knowledge management\nRetrieval-Augmented Generation (RAG) solutions\nGoverned AI platforms like GARIL AI\nGovernance, security and privacy embedded by design",
  card2Closing:
    "Every solution is designed to remain transparent, secure and maintainable as your organisation grows.",
  card3Title: "Training & Capacity Building",
  card3Intro:
    "Building AI capability requires more than access to technology. It requires people who understand how to use AI effectively, govern it appropriately and apply it confidently in their day-to-day work. We deliver practical training programmes that help organisations improve AI adoption and equip professionals with the skills needed for careers in AI Governance, Risk and Compliance (AI GRC).",
  card3ListIntro: "Our programmes include:",
  card3Items:
    "AI Literacy Workshops – Practical foundations for universities and businesses adopting AI across everyday work.\nAI GRC Practitioner Programme – Hands-on training for governance, risk and compliance professionals building careers in AI GRC.\nIn-person workshops, virtual live training, private corporate programmes and university partnerships.",
  card3Closing:
    "Our training combines international frameworks, real-world implementation and hands-on learning to help individuals and organisations build lasting AI capability.",
  flowEyebrow: "Where we sit",
  flowTitle: "Between the AI you deploy and the trust you need to keep.",
  flowLede:
    "We help organisations govern AI, build governed solutions, and develop the capability to sustain both.",
  flowInputsTitle: "Inputs",
  flowInput1: "Your AI use cases",
  flowInput2: "Your systems & vendors",
  flowInput3: "Your regulatory context",
  flowInput4: "Your people & processes",
  flowCoreTitle: "Govern. Automate. Advance.",
  flowCoreSmall: "ISO 42001 · NIST AI RMF · EU AI Act · UK principles · NDPA",
  flowOutputsTitle: "Outputs",
  flowOutput1: "Practical AI governance",
  flowOutput2: "Governed AI solutions",
  flowOutput3: "Workforce AI capability",
  flowOutput4: "Lasting organisational trust",
  statsEyebrow: "The state of play",
  statsTitle: "Most organisations are adopting AI faster than they can govern it.",
  statsImageUrl: "/images/state-of-play.png",
  statsImageAlt:
    "Chrome humanoid robot in a thinking pose, representing strategic reflection on AI",
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
  problemTitle: "AI creates value only when governance, technology and people move together.",
  problem1Title: "Governance lag",
  problem1Li1: "Tools arrive faster than policies and oversight",
  problem1Li2: "Risk ownership stays unclear across teams",
  problem1Li3: "Leaders cannot demonstrate control when asked",
  problem2Title: "Disconnected delivery",
  problem2Li1: "Automation projects stall without clear ownership",
  problem2Li2: "Security and privacy are bolted on too late",
  problem2Li3: "Solutions fail to integrate with real workflows",
  problem3Title: "Capability gaps",
  problem3Li1: "Staff experiment without shared foundations",
  problem3Li2: "GRC teams lack practical AI skills",
  problem3Li3: "Training stays theoretical instead of applied",
  quoteText:
    "Organisations shouldn't have to choose between innovation and governance. The ones who embed both from the start will outpace the rest.",
  quoteSrc: "The view that shapes how we work",
  faqEyebrow: "Common questions",
  faqTitle: "What organisations ask before they engage us.",
  ctaTitle: "Start with a conversation.",
  ctaDescription:
    "A 30-minute conversation, no pitch deck. We will tell you whether we can help.",
  _sectionLayouts: "{}",
};

export function getHomeContentFieldKeys(): string[] {
  return Object.keys(defaultHomeContent);
}
