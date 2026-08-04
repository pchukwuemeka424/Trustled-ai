export const managedPages = [
  "about",
  "services",
  "solutions",
  "education",
  "contact",
] as const;

export type ManagedPage = (typeof managedPages)[number];
export type PageContent = Record<string, string>;

export const defaultPageContent: Record<ManagedPage, PageContent> = {
  about: {
    heroTagline: "About",
    heroTitle: "Governing AI. Building What's Next.",
    heroLede:
      "TrustLed AI was founded on a simple belief: organisations shouldn't have to choose between innovation and governance.",
    storyP1:
      "Too often, governance is treated as something that's added after AI has been deployed. We believe it should be embedded from the beginning, shaping how AI is designed, implemented and managed throughout the AI lifecycle.",
    storyP2:
      "That's why TrustLed AI is more than an advisory firm. We combine AI governance expertise, AI engineering and professional training to help organisations build, deploy and govern AI responsibly and at scale.",
    storyP3:
      "Our work spans three core areas: AI Governance Advisory, AI-Powered Software & Automation Solutions, and Professional Training. Together, they help organisations establish effective governance, develop AI solutions that deliver measurable business value, and build the skills needed to support responsible AI adoption.",
    storyP4:
      "As AI continues to evolve, so will the challenges organisations face. Our role is to help organisations stay ahead by turning governance into a strategic advantage and ensuring AI is deployed with accountability, security and long-term success in mind.",
    whatWeDoEyebrow: "What we do",
    whatWeDoTitle:
      "TrustLed AI brings together governance, technology and capability development to help organisations realise the full value of artificial intelligence.",
    about1Title: "AI Governance Advisory",
    about1Body:
      "We help organisations establish governance frameworks, assess AI risks, develop policies, navigate emerging regulations and implement practical governance programmes aligned with recognised standards and industry best practices.",
    about2Title: "AI-Powered Software & Automation Solutions",
    about2Body:
      "We design and develop AI-powered software, automation solutions and governed AI platforms that improve productivity while embedding governance, security and transparency into everyday AI use.",
    about3Title: "Professional Training",
    about3Body:
      "We deliver practical learning experiences that help organisations and professionals build the knowledge and skills required to adopt, govern and manage AI effectively through our AI Literacy Workshops and AI GRC Practitioner Training Programme.",
    approachEyebrow: "Our approach",
    approachTitle:
      "Every engagement is guided by a simple principle: governance should enable innovation, not slow it down.",
    approachP1:
      "We work closely with our clients to understand their objectives, identify practical opportunities for AI and implement governance that supports long-term success. Rather than applying one-size-fits-all frameworks, we build solutions that reflect each organisation's industry, regulatory environment and level of AI maturity.",
    approachP2:
      "Our approach combines internationally recognised standards, practical implementation and modern engineering to help organisations move beyond compliance and build AI systems they can trust.",
    whyEyebrow: "Why TrustLed AI?",
    whyTitle:
      "AI adoption is no longer just a technology initiative. It is a governance, operational and organisational challenge.",
    whyIntro:
      "What makes TrustLed AI different is our ability to bring together three disciplines that are often delivered separately.",
    whyItems:
      "Governance – Establish the policies, frameworks and oversight needed for responsible AI.\nTechnology – Build AI solutions that are secure, scalable and aligned with governance requirements.\nCapability Building – Equip leaders, employees and governance professionals with the skills needed to use and manage AI effectively.",
    whyClosing:
      "By combining these capabilities, we help organisations move from experimentation to sustainable AI adoption.",
    leadershipEyebrow: "Meet the founders",
    leadershipTitle: "The people behind the work.",
    leadershipLede:
      "Practitioners actively working in AI governance and AI engineering.",
    team1Name: "Franklin Okeke",
    team1Role: "Founder & AI Governance Lead",
    team1Bio:
      "CISA and ISO/IEC 42001 Lead Auditor. MSc in Cybersecurity and Human Factors. Technology writer with 400+ published articles across the trade press on AI governance and cybersecurity.",
    team2Name: "Prince C.",
    team2Role: "Co-founder & Engineering Lead",
    team2Bio:
      "Engineering lead behind TrustLed AI's tooling and secure deployments, with a background building ISO 27001 and GDPR risk frameworks.",
    team3Name: "Dr Arome Solomon Odiba",
    team3Role: "Research & Scientific Partner",
    team3Bio:
      "Research and scientific partner supporting TrustLed AI's evidence-led approach to responsible AI.",
    visionEyebrow: "Our vision",
    visionTitle:
      "We believe the future of AI belongs to organisations that embed governance into the way AI is designed, deployed and managed—not as an afterthought, but as a foundation for innovation.",
    visionBody:
      "TrustLed AI exists to help build that future by creating the governance, technology and capability organisations need to adopt AI responsibly, securely and at scale.",
    ctaTitle: "Talk to us about your situation.",
    ctaDescription:
      "A 30-minute conversation, no pitch deck. We will tell you whether we can help.",
    ctaButton: "Start a conversation",
  },
  services: {
    heroTagline: "Services",
    heroTitle: "AI built for the real world needs more than good technology.",
    heroLede:
      "Artificial intelligence is changing how organisations work, make decisions and deliver services. But successful AI initiatives don't happen by chance. They require governance that keeps pace with innovation, technology that solves real problems, and people with the skills to make AI part of everyday work.\n\nAt TrustLed AI, we bring those three elements together. We advise organisations on AI governance, design AI-powered software and automation solutions, and develop AI capability through practical training. Our approach is grounded in recognised frameworks, real business challenges and outcomes that last beyond implementation.",
    advLabel: "AI Governance Advisory",
    advTitle: "Put governance at the centre of your AI strategy.",
    advP1:
      "AI is becoming part of everyday business, but many organisations are adopting it faster than they can govern it. New tools appear across departments, employees experiment with generative AI, and software vendors continue embedding AI into products organisations already rely on. Before long, AI is influencing business processes without clear oversight or accountability.",
    advP2:
      "Good governance creates the structure that allows organisations to adopt AI with clarity. It helps leadership understand where AI is being used, what risks it introduces, which regulations apply and what controls should be in place as adoption grows.",
    advP3:
      "At TrustLed AI, we work with organisations to design practical governance programmes that reflect how they actually operate. Instead of delivering generic policy templates, we build governance around your objectives, your AI use cases and the regulatory landscape that applies to your organisation.",
    advFrameworksIntro:
      "Our advisory services are aligned with leading international frameworks and regulations, including:",
    advFrameworksItems:
      "ISO/IEC 42001 – The international standard for implementing an Artificial Intelligence Management System (AIMS).\nNIST AI Risk Management Framework – A practical framework for identifying, assessing and managing AI risks throughout the AI lifecycle.\nEU AI Act – Compliance guidance for organisations developing, deploying or using AI systems subject to the European Union's risk-based AI regulation.\nUK Pro-Innovation AI Regulatory Principles – Guidance supporting compliance with the UK's evolving AI regulatory landscape.\nNigeria Data Protection Act (NDPA) and National AI Strategy – Governance, privacy and AI guidance for organisations operating within Nigeria.",
    advServicesIntro: "Our advisory services include",
    advServicesItems:
      "AI governance strategy and implementation\nAI governance maturity assessments\nAI inventories and AI register development\nAI risk assessments\nAI policy and standards development\nAI governance operating models\nAI lifecycle governance\nThird-party AI risk assessments\nAI compliance readiness assessments\nGovernance documentation and reporting\nExecutive advisory",
    advReceiveIntro: "What you'll receive",
    advReceiveItems:
      "An AI governance roadmap tailored to your organisation\nA comprehensive inventory of AI systems and use cases\nAI governance policies and supporting documentation\nRisk assessments aligned with recognised frameworks\nPractical recommendations prioritised by business impact\nGovernance documentation to support audits, procurement and regulatory enquiries",
    autoLabel: "AI Solutions & Automation Services",
    autoTitle: "AI should make work simpler.",
    autoP1:
      "Every organisation has work that slows people down. Routine tasks consume valuable time, information is scattered across different systems, and teams often spend more time managing processes than delivering value.\n\nAI creates an opportunity to redesign the way work gets done.",
    autoP2:
      "TrustLed AI develops AI-powered software and intelligent automation solutions that remove repetitive work, improve operational efficiency and support better decision-making. Every solution is designed around your workflows, integrates with your existing systems and incorporates governance, security and privacy from the beginning.",
    autoP3:
      "Whether we're building a custom AI application, automating business processes or developing governed platforms like GARIL AI, our focus remains the same: creating solutions that people trust, adopt and continue using long after deployment.",
    autoServicesIntro: "Our software and automation services include",
    autoServicesItems:
      "Custom AI application development\nAI workflow automation\nAI-powered business process optimisation\nInternal AI assistants\nRetrieval-Augmented Generation (RAG) solutions\nKnowledge management systems\nAI integration with existing business applications\nAI solution architecture\nDeployment and implementation support\nOngoing optimisation and enhancement",
    autoReceiveIntro: "What you'll receive",
    autoReceiveItems:
      "AI solutions tailored to your organisation\nAutomated workflows that reduce manual effort\nTechnical documentation and implementation support\nGovernance and security embedded into every solution\nScalable systems designed for future growth",
    ctaTitle: "Not sure where to start?",
    ctaDescription:
      "A 30-minute conversation, no pitch deck. We will tell you whether we can help and which engagement makes sense.",
  },
  solutions: {
    heroTagline: "Solutions",
    heroTitle: "Technology built on the principles we recommend.",
    heroLede:
      "Good governance shouldn't stop at advice. It should be reflected in the technology organisations use every day.\n\nOur solutions are designed to solve practical challenges while embedding governance, security and transparency from the start. From higher education to enterprise environments, every platform we build is guided by the same principles we recommend to our clients: accountability, privacy, security and responsible AI.",
    garilTag: "GARIL AI",
    garilHeadline: "Governed AI for Research, Instruction and Learning",
    garilIntro:
      "Universities are embracing AI at an unprecedented pace. Students use generative AI for assignments, researchers rely on AI to analyse information and generate content, while lecturers incorporate AI into teaching and assessment. Yet most institutions still lack a single environment where AI can be used with the governance, oversight and transparency expected in higher education.",
    garilBodyP1:
      "GARIL AI changes that.\n\nGARIL AI is a governed AI workspace designed specifically for universities. It gives institutions a secure environment where staff and students can use AI for research, teaching and learning while supporting institutional governance, academic integrity and responsible AI practices.",
    garilBodyP2:
      "Unlike public AI platforms designed for general use, GARIL AI enables universities to maintain visibility over AI usage, establish institutional guardrails and support emerging governance requirements without limiting innovation.",
    garilCapabilitiesIntro: "Key capabilities",
    garilCapabilitiesItems:
      "Governed AI workspace for research, teaching and learning\nInstitution-managed access and permissions\nAI usage monitoring and reporting\nAI contribution statements\nResearch provenance and transparency\nAudit logging\nPrivacy and security controls\nInstitutional knowledge integration\nSupport for multiple AI models\nGovernance reporting",
    garilAudienceIntro: "Designed for",
    garilAudienceItems:
      "Universities\nColleges\nResearch institutions\nAcademic libraries",
    garilCtaButton: "Discover GARIL AI",
    asatTag: "ASAT",
    asatHeadline: "Your AI Governance Control Centre",
    asatIntro:
      "AI is becoming part of every organisation, but governance is often scattered across spreadsheets, policies, emails and disconnected processes.\n\nASAT brings it all together.",
    asatBodyP1:
      "Built for organisations adopting AI, ASAT provides a central place to understand AI use, strengthen governance, manage documentation and maintain oversight as AI adoption grows.\n\nWhether you're introducing your first AI system or governing AI across multiple business functions, ASAT helps you establish the structure needed to support responsible AI adoption.",
    asatDetailTitle: "One Platform. Complete AI Governance.",
    asatDetailP1:
      "Managing AI requires more than policies.\n\nIt requires visibility into how AI is being used, governance processes that scale with adoption, documentation that supports accountability and the ability to demonstrate oversight when it matters most.\n\nASAT brings these capabilities together in a single platform, helping organisations build a more structured approach to AI governance.",
    asatFeaturesIntro: "Everything You Need to Govern AI",
    asatFeaturesLead: "ASAT helps organisations:",
    asatFeaturesItems:
      "Understand AI use across the organisation\nManage AI governance activities from one place\nMaintain governance documentation\nAssess governance readiness\nIdentify governance gaps\nTrack governance progress\nSupport regulatory and standards alignment\nPrepare for internal reviews and external audits",
    asatSupportTitle: "Supporting Trusted AI Governance",
    asatSupportP1:
      "Good AI governance shouldn't require months of interpreting regulations or building governance processes from scratch.\n\nASAT gives organisations a practical way to establish governance, improve oversight and build governance maturity as AI adoption evolves.\n\nWhether you're in financial services, education, healthcare, professional services or the public sector, ASAT helps you create a stronger foundation for responsible AI.",
    asatGrowthTitle: "Governance That Grows With You",
    asatGrowthP1:
      "AI adoption doesn't stand still.\n\nNeither should governance.\n\nASAT is designed to grow with your organisation, providing the visibility, structure and oversight needed to support AI today and as your organisation's AI ambitions evolve.",
    asatCtaButton: "Request a Demo",
    whyTitle: "Why organisations choose our solutions",
    whyBody:
      "Our products are built from practical experience supporting organisations as they introduce AI into everyday operations. Every solution combines governance, usability and technical capability, helping organisations move beyond experimentation and build AI systems they can manage with confidence.",
  },
  education: {
    heroTagline: "Training",
    heroTitle: "Build the knowledge to use AI with confidence.",
    heroLede:
      "Technology alone doesn't transform organisations. People do.\n\nOur programmes combine internationally recognised frameworks, real-world implementation and hands-on learning to help organisations and professionals develop skills they can apply immediately.",
    litTag: "AI Literacy Workshops",
    litTitle: "Helping organisations build AI-ready teams.",
    litP1:
      "AI is changing how people research, communicate, analyse information and make decisions. Yet many organisations still struggle to move beyond occasional experimentation because employees lack the confidence or knowledge to use AI effectively.",
    litP2:
      "Our AI Literacy Workshops help universities and businesses build a shared understanding of AI across their workforce. Rather than focusing on technical theory, we show participants how AI can improve day-to-day work while highlighting the governance, privacy and security considerations that support effective organisational use.",
    litP3:
      "Each workshop is tailored to the organisation's objectives, helping teams understand both the opportunities AI creates and the responsibilities that come with its use.",
    litTopicsIntro: "Topics include",
    litTopicsItems:
      "Understanding AI and Generative AI\nPractical AI use cases for everyday work\nPrompt writing fundamentals\nAI productivity techniques\nAI risks and limitations\nData privacy and information security\nResponsible AI practices\nOrganisational AI policies\nAI adoption best practices",
    litAudienceIntro: "Designed for",
    litAudienceItems:
      "Universities\nBusinesses\nPublic sector organisations\nLeadership teams\nProfessional services teams\nAcademic staff",
    litCta: "Enquire about AI Literacy Workshops",
    grcTag: "AI GRC Practitioner Training Programme",
    grcTitle: "Build Practical AI Governance Skills for the Next Generation of GRC",
    grcP1:
      "The AI GRC Practitioner Training Programme was created to prepare professionals for the new reality of AI governance.\n\nBuilt around practical implementation rather than theory, the programme combines AI governance, international standards, emerging regulations and hands-on projects that reflect the work organisations are doing today.",
    grcP2:
      "You'll leave with more than knowledge. You'll graduate with a portfolio of governance artefacts that demonstrate your ability to apply AI Governance, Risk and Compliance in real-world environments.",
    grcWhyTitle: "Why This Programme?",
    grcWhyBody:
      "Throughout this programme you'll create governance frameworks, AI inventories, risk registers, impact assessments and governance documentation that organisations use every day. Professional and Private participants also learn AI GRC Engineering, applying AI-assisted scripting and workflow automation to automate governance activities and reduce manual effort.",
    grcLearnTitle: "What You'll Learn",
    grcLearnIntro:
      "The programme is organised into seven practical modules that take you from AI fundamentals through to implementing a complete AI governance programme.",
    grcModulesItems:
      "AI Foundations & AI Governance\nStandards, Frameworks & Regulations\nAI Risk Management\nData Governance for AI\nBuilding an AI Governance Programme\nAI GRC Engineering (Professional & Private)\nCareer Accelerator (Professional & Private)",
    grcPortfolioTitle: "Build a Portfolio That Sets You Apart",
    grcPortfolioIntro:
      "Throughout the programme you'll build a professional portfolio that demonstrates your ability to design governance frameworks, assess AI risks and implement governance processes.\n\nYour portfolio includes practical deliverables such as:",
    grcPortfolioItems:
      "AI Governance Framework\nAI Governance Policy Pack\nAI Inventory\nAI Risk Register\nAI Risk Assessment\nAI Impact Assessment\nData Governance Framework\nAI Governance Control Crosswalk",
    grcPortfolioProIntro: "Professional and Private participants also complete:",
    grcPortfolioProItems: "AI Governance Dashboard\nAI GRC Automation Project",
    grcPortfolioClosing:
      "By the end of the programme, you'll have work you can confidently discuss during interviews and showcase as part of your professional portfolio.",
    grcAudienceTitle: "Who Should Attend?",
    grcAudienceIntro:
      "This programme is designed for professionals who want practical AI Governance, Risk and Compliance skills.\n\nIdeal for:",
    grcAudienceItems:
      "Governance, Risk & Compliance professionals\nCybersecurity professionals\nInternal auditors\nPrivacy and data protection professionals\nCompliance professionals\nRisk managers\nData governance professionals\nIT professionals\nProfessionals transitioning into AI Governance",
    grcAudienceNote: "No previous AI experience or coding background is required.",
    grcStructureTitle: "Programme Structure",
    grcTier1Name: "Foundation Practitioner",
    grcTier1Meta: "5 Weeks · 25 Live Sessions",
    grcTier1Body:
      "Perfect for professionals who want a practical introduction to AI Governance, Risk and Compliance.\n\nIncludes:\nModules 1–5\nPractical assignments\nPortfolio projects\nTemplates\nCertificate of Completion\nThree months' access to recordings",
    grcTier1PriceFounding: "$195",
    grcTier1PriceStandard: "$295",
    grcTier2Name: "Professional Practitioner",
    grcTier2Meta: "6 Weeks · 30 Live Sessions",
    grcTier2Body:
      "Our flagship programme for professionals preparing for AI GRC roles.\n\nEverything in Foundation, plus:\nAI GRC Engineering\nCareer Accelerator\nAI automation projects\nTwo CV reviews\nLinkedIn optimisation\nMock interviews\nCareer mentoring\nJob Hunter access\nTwelve months' access",
    grcTier2PriceFounding: "$250",
    grcTier2PriceStandard: "$395",
    grcTier3Name: "Private Practitioner",
    grcTier3Meta: "One-to-One",
    grcTier3Body:
      "Designed for professionals who prefer personalised learning.\n\nIncludes the complete curriculum delivered privately around your schedule, together with mentoring and the full career support package.",
    grcTier3PriceFounding: "$350",
    grcTier3PriceStandard: "$450",
    grcPricingNote:
      "Payment plans are available.\n\nRegional pricing is available for participants in Nigeria, Ghana and Kenya.",
    grcDeliveryTitle: "Delivery Format",
    grcDeliveryItems:
      "Live online sessions\nOne hour each evening\nMonday to Friday\nDesigned around full-time work\nCohort-based learning\nPractical assignments\nTemplates and downloadable resources\nCertificate of Completion",
    grcFaqTitle: "Frequently Asked Questions",
    grcFaq1Q: "Do I need previous AI experience?",
    grcFaq1A:
      "No. The programme starts with AI fundamentals before progressing into governance and implementation.",
    grcFaq2Q: "Do I need to know how to code?",
    grcFaq2A:
      "No. The AI GRC Engineering module includes a technical primer and uses AI coding assistants throughout.",
    grcFaq3Q: "Will I receive a certificate?",
    grcFaq3A: "Yes. Participants receive a TrustLed AI Certificate of Completion.",
    grcFaq4Q: "Is this programme delivered online?",
    grcFaq4A: "Yes. All sessions are delivered live online.",
    grcFaq5Q: "How long do I keep access?",
    grcFaq5A:
      "Foundation participants receive three months' access. Professional and Private participants receive twelve months' access together with alumni community access.",
    grcFaq6Q: "Can I pay in instalments?",
    grcFaq6A: "Yes. Payment plans are available across all programme tiers.",
    grcCtaTitle: "Ready to Build Your AI GRC Career?",
    grcCtaBody:
      "The demand for professionals who can govern AI is growing across industries.\n\nIf you're ready to develop practical AI Governance, Risk and Compliance skills, applications for the next cohort are now open.",
    grcCtaButton: "Apply for the Next Cohort",
    ctaTitle: "Bring AI confidence to your team.",
    ctaDescription:
      "Tell us about your organisation and where AI capability needs to grow. We will tell you which programme fits.",
  },
  contact: {
    heroTagline: "Contact",
    heroTitle: "Tell us what is on your desk.",
    asideLede:
      "Whether you need AI governance advisory, AI solutions and automation, professional training, or want to learn more about GARIL AI or ASAT, get in touch. A 30-minute conversation will usually tell us both whether we can help.",
    formNote:
      "There is no automated triage on this form. The email reaches a person, and we respond within two working days.",
    directTitle: "Direct contact",
    directGeneral: "General enquiries",
    primaryEmail: "hello@trustledai.com",
    directPartnership: "Media or partnership",
    partnershipEmail: "partner@trustledai.com",
    officeTitle: "Office",
    officeLine1: "TrustLed AI Ltd is registered in England and Wales.",
    officeLine2: "Liverpool, United Kingdom.",
  },
};

export function isManagedPage(value: string): value is ManagedPage {
  return managedPages.includes(value as ManagedPage);
}

export function getPageContentFieldKeys(page: ManagedPage): string[] {
  const keys = Object.keys(defaultPageContent[page]);
  if (!keys.includes("_sectionLayouts")) {
    return [...keys, "_sectionLayouts"];
  }
  return keys;
}
