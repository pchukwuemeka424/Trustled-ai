export type TeamMember = {
  initials: string;
  name: string;
  role: string;
  bio?: string;
};

/**
 * Leadership team used for on-page content defaults and SEO structured data.
 */
export const teamMembers: TeamMember[] = [
  {
    initials: "FO",
    name: "Franklin Okeke",
    role: "Consultant - AI Governance",
    bio: "CISA and ISO/IEC 42001 Lead Auditor. MSc in Cybersecurity and Human Factors. Technology writer with 400+ published articles across the trade press on AI governance and cybersecurity.",
  },
  {
    initials: "PC",
    name: "Prince Chukwuemeka",
    role: "AI Engineering Lead",
    bio: "Engineering lead behind TrustLed AI's tooling and secure deployments, with a background building ISO 27001 and GDPR risk frameworks.",
  },
  {
    initials: "AO",
    name: "Dr Arome Solomon Odiba",
    role: "Research & Scientific Advisory Partner",
    bio: "Research and scientific advisory partner supporting TrustLed AI's evidence-led approach to responsible AI.",
  },
];

export function teamMemberNamesForSeo(): string {
  return teamMembers.map((member) => member.name).join(", ");
}
