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
    heroTitle: "A UK AI governance advisory firm that does the work properly.",
    heroLede:
      "We help schools, multi-academy trusts, universities, and regulated SMEs adopt AI responsibly by assessing the risk, surfacing the AI nobody formally approved, and producing the evidence that satisfies the inspectors, auditors, insurers, regulators, and enterprise customers who will ask.",
    about1Title: "Who we are",
    about1Body:
      "TrustLed AI brings together direct experience in IT compliance, cybersecurity, software development, and IT auditing, under the vision of helping individuals, education providers, and small to medium enterprises navigate the complexities of AI governance, risk, and compliance.",
    about2Title: "Our approach",
    about2Body:
      "We translate dense regulation into work that an SME, a school, or a university can actually do. ISO 42001, the EU AI Act, the NIST AI Risk Management Framework, DfE guidance, Keeping Children Safe in Education, sector-specific frameworks: we apply the parts that matter to your situation and leave the rest. Every engagement produces evidence an external party can read. Every recommendation is sized to your risk and your budget. We do not sell the same programme to a single-form-entry primary school that we would sell to a 4,000-pupil multi-academy trust or a 200-person SME.",
    about3Title: "What drives us",
    about3Body:
      "We have worked inside organisations being asked to adopt AI without proper support. We have seen the cost of governance done late, badly, or for show. We built TrustLed AI to do the work properly the first time, in simple language, with the people doing the work rather than around them. The aim is not to pass an audit. The aim is to use AI well, with controls that work because they were designed to.",
    about4Title: "Why partner with us",
    about4Body:
      "We do the work ourselves, and we do it properly. We are honest about what we do and do not know. We price proportionately. We say so when an engagement is not the right fit, and we recommend alternatives when we cannot help. The clients who stay with us across multiple engagements stay because of how the work feels, not because of how the proposal sounds.",
    leadershipEyebrow: "Leadership",
    leadershipTitle: "The people behind the work.",
    leadershipLede:
      "A human-factors specialism rare in UK AI governance consulting, paired with hands-on compliance and engineering experience.",
    team1Name: "Franklin Okeke",
    team1Role: "Co-founder & Chief Strategist",
    team1Bio:
      "CISA and ISO/IEC 42001 Lead Auditor. MSc in Cybersecurity and Human Factors. Technology writer with 400+ published articles across the trade press on AI governance and cybersecurity.",
    team2Name: "Prince Chukwuemeka",
    team2Role: "Co-founder & Technical Lead",
    team2Bio:
      "Engineering lead behind TrustLed AI's tooling and secure deployments, with a background building ISO 27001 and GDPR risk frameworks.",
    team3Name: "Our network",
    team3Role: "Practitioners on call",
    team3Bio:
      "We draw on a network of specialists across compliance, education leadership, data protection, and software engineering, brought in when an engagement needs depth in a specific area.",
    ctaTitle: "Talk to us about your situation.",
    ctaDescription:
      "A 30-minute conversation, no pitch deck. We will tell you whether we can help.",
    ctaButton: "Start a conversation",
  },
  services: {
    heroTagline: "Services",
    heroTitle: "Three engagements, scoped to your situation.",
    heroLede:
      "Each engagement is sized to your organisation rather than packaged into tiers. We work out what proportionate compliance looks like for you, then we build it.",
    s1Index: "01 — AI Governance Advisory",
    s1Title:
      "The governance work your auditor, your governing body, or your regulator wants to see, sized to your organisation.",
    s1P1:
      "31% of UK organisations have no AI governance policy in place (CyXcel/Censuswide, 2025). Only 3.5% of compliance professionals describe their firm as fully prepared for AI regulation (VinciWorks, 2026). In education, nearly half of UK teachers reported using generative AI in 2024, often in schools that have not formally implemented AI use, and may not have strong AI literacy or a policy in place. The questions are already arriving, from inspectors, auditors, insurers, enterprise customers, and regulators, and most organisations cannot answer them yet.",
    s1P2:
      "We help you change that. We work out which rules apply to your specific use of AI, what proportionate compliance looks like for an organisation your size, and what evidence you need to produce. Then we build it.",
    s1P3:
      "Most governance work fails in one of two directions. It is either too generic to be useful, a downloaded policy template that nobody reads and no auditor respects, or it is so heavy that the organisation abandons it halfway through. We aim for the middle. The governance we build is specific to the AI you actually run, proportionate to your size and risk, and written so the people responsible for it can understand and maintain it after we leave.",
    s1P4:
      "The engagement usually begins with discovery. We map your AI estate, including the systems you know about and the ones you do not, then classify each against the frameworks that apply to your sector. From there, we build the policies, controls, and documentation that turn a vague sense of exposure into a defensible position you can show to anyone who asks.",
    s2Index: "02 — Shadow AI Detection",
    s2Title: "Find the AI running in your organisation that nobody approved.",
    s2P1:
      "Most organisations are running far more AI than they have accounted for. Staff sign up for tools independently because they make the work easier. Departments adopt AI-enabled software without telling IT. Vendors quietly embed AI features into platforms you have licensed for years, switching them on by default. The result is a growing layer of AI that sits outside your governance entirely, processing your data and shaping your decisions without anyone having assessed the risk.",
    s2P2:
      "This is shadow AI, and it is where most of the real exposure lives. A governance policy that covers only the AI you formally approved is a policy with a hole in the middle of it. When an auditor, a regulator, or an enterprise customer asks what AI you operate, the honest answer for most organisations is that they do not fully know.",
    s2P3:
      "Shadow AI Detection closes that gap. We systematically uncover the AI operating across your organisation, the tools staff adopted on their own, the AI features embedded in your existing software, and the integrations quietly passing your data to third-party models. We tell you what is there, what data it touches, what risk it carries, and what to do about each finding.",
    s2P4:
      "The work is practical rather than intrusive. We combine a review of your software estate, your contracts, and your data flows with structured conversations across departments, because the people doing the work usually know exactly which tools they are using even when the organisation does not. The output is a complete and honest picture of your true AI footprint, and a clear plan to bring the parts that matter under proper control.",
    s3Index: "03 — AI Automation Services",
    s3Title: "Efficiency without exposure.",
    s3P1:
      "42% of UK companies abandoned AI initiatives in 2025, with 46% of proof-of-concept projects never reaching production (Resultsense, 2025). In education, schools and trusts are under pressure to deploy AI for marking, reporting, communications, and administrative workflows, often without the governance work to back it up. Most automation efforts fail not because the technology is wrong, but because the workflow, oversight, and accountability around it were not designed in from the start.",
    s3P2:
      "We believe a successful AI automation strategy starts with task mapping. We help you move beyond the hype by auditing your operations and sorting your tasks into three buckets.",
    bucket1Tag: "Full automation",
    bucket1Title: "Low-risk, high-frequency",
    bucket1Body:
      "AI handles the heavy lifting to deliver immediate time savings. For schools, this often looks like routine correspondence drafting, timetabling support, or data extraction from standard documents.",
    bucket2Tag: "Human-in-the-loop",
    bucket2Title: "AI assists, a human owns it",
    bucket2Body:
      "Complex processes where AI assists but a human maintains oversight and accountability. Marking and feedback workflows, report generation, financial workflow automation in academy trusts, and admissions support all sit here.",
    bucket3Tag: "Human-only",
    bucket3Title: "Judgement, not automation",
    bucket3Body:
      "Critical work where AI cannot, and should not, replace human judgement. Safeguarding decisions, pastoral conversations, formal assessment outcomes, and any decision with significant consequences for a pupil, student, or staff member.",
    s3P3:
      "We design and implement automation systems that reduce operational friction, improve consistency, and create space for higher-value work. Our focus is on systems that are integrated, maintainable, and aligned with how your organisation actually operates. Crucially, we build the governance in from the start rather than bolting it on later. Every automation we implement comes with clear accountability, documented decision points, and a record of what the system does and why, so the efficiency you gain does not come at the cost of a new compliance problem six months down the line.",
    ctaTitle: "Not sure which engagement fits?",
    ctaDescription:
      "A 30-minute conversation, no pitch deck. We will tell you whether we can help and which engagement makes sense.",
  },
  solutions: {
    heroTagline: "Solutions",
    heroTitle: "ASAT",
    heroLede:
      "An AI Self-Assessment Toolkit built for regulated SMEs and education providers.",
    asatTag: "AI Self-Assessment Toolkit",
    asatHeadline: "Compliance should not require a six-figure consultancy retainer.",
    asatIntro:
      "ASAT was developed to help SMEs, multi-academy trusts, and universities answer a fundamental governance question: what AI do you actually operate, which risk and legal tier does it fall into, and what compliance work does that trigger?",
    bodyP1:
      "ASAT replaces generic, manual checklists with an AI risk classification engine. It builds a complete register of your AI estate, including the shadow AI often embedded in common tools like Microsoft 365, Google Workspace for Education, or Salesforce, and maps it directly to the EU AI Act risk taxonomy, the NIST AI Risk Management Framework, and other recognised classification systems.",
    bodyP2:
      "Whether your system is flagged as high-risk under Annex III or triggers transparency obligations under Article 50, ASAT translates thousands of pages of regulation into a prioritised, actionable roadmap. It provides the precision needed to take a defensible position with your board, your governing body, and your customers.",
    card1Title: "Complete AI register",
    card1Body:
      "A full inventory of your AI estate, including the embedded and shadow AI that manual checklists miss in everyday tools.",
    card2Title: "Risk classification engine",
    card2Body:
      "Direct mapping to the EU AI Act taxonomy, the NIST AI Risk Management Framework, and other recognised classification systems.",
    card3Title: "Actionable roadmap",
    card3Body:
      "Thousands of pages of regulation translated into a prioritised plan you can defend to a board, a governing body, or a customer.",
    ctaButton: "Request early access to ASAT",
  },
  education: {
    heroTagline: "Education & Training",
    heroTitle: "Make your people effective with AI, fast.",
    heroLede:
      "Three short, applied programmes for organisations that need their people effective with AI quickly, and confident they are not introducing risk in the process. Designed for schools, multi-academy trusts, universities, public bodies, and the SMEs that work with them.",
    p1Tag: "Programme 01",
    p1Title: "Understanding AI",
    p1Strap: "Start with how it actually works.",
    p1Body1:
      "Most AI training jumps straight to tools and prompts, which leaves people repeating instructions they do not understand.",
    p1Body2:
      "We begin with the foundations, what these systems are, how they generate answers, why they get things wrong, and what that means for the work in front of you. Staff, learners, and members of the public leave able to explain AI in plain terms and judge for themselves when it can be trusted.",
    p2Tag: "Programme 02",
    p2Title: "Responsible and Critical Use",
    p2Strap: "Use AI well, and know when to push back.",
    p2Body1:
      "Real confidence with AI includes knowing what the technology should not be trusted with. This programme covers practical use across communication, analysis, planning, and reporting, alongside the critical skills that let people spot bias, recognise fabricated information, and challenge a result that looks wrong. For schools and trusts we ground this in DfE expectations and Keeping Children Safe in Education, and for public and private sector teams we connect it to UK GDPR and the obligations their regulators are beginning to enforce.",
    p2Body2: "",
    p2Body3: "",
    p3Tag: "Programme 03",
    p3Title: "Community Workshops and Curricula",
    p3Strap: "Bring AI knowledge to the people decisions are made about.",
    p3Body1:
      "Democratising AI means taking this knowledge beyond the staff room and the boardroom. We design workshops, short curricula, and public sessions for schools, community organisations, and local government, so that the people whose lives are shaped by these systems can take part in the conversation about them. Sessions can be tailored for students, parents, frontline staff, or residents, with the aim of giving each group enough understanding to ask sharper questions and hold the institutions using AI to account.",
    ctaTitle: "Bring AI confidence to your team.",
    ctaDescription:
      "Tell us about your staff, your classrooms, and where AI is creeping in. We will tell you which programme fits.",
  },
  contact: {
    heroTagline: "Contact",
    heroTitle: "Tell us what is on your desk.",
    asideLede:
      "If you are dealing with an inspection question, an audit, a governing body request, an insurance renewal, an enterprise procurement form, an internal AI policy that needs writing, or just the suspicion that your organisation is using more AI than it has accounted for, get in touch. A 30-minute conversation will usually tell us both whether we can help.",
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
  return Object.keys(defaultPageContent[page]);
}
