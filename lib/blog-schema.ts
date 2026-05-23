export type BlogPostStatus = "draft" | "published";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  author: string;
  publishedAt: string;
  status: BlogPostStatus;
};

export type BlogPostRecord = BlogPost & {
  createdAt: Date;
  updatedAt: Date;
};

export const defaultBlogPosts: BlogPost[] = [
  {
    slug: "what-is-shadow-ai",
    title: "What is shadow AI, and why should schools care?",
    excerpt:
      "Staff are adopting AI tools faster than governance teams can track them. Here is how shadow AI shows up in education settings, and what to do about it.",
    author: "Franklin Okeke",
    publishedAt: "2026-02-12T09:00:00.000Z",
    status: "published",
    imageUrl: "",
    content: `<p>Most schools and trusts have an AI policy on paper. Far fewer have an accurate picture of the AI actually running across their organisation.</p>
<p>Shadow AI is the gap between those two things: tools, features, and integrations that process school data or shape decisions without formal approval, risk assessment, or oversight.</p>
<h2>Where shadow AI appears in schools</h2>
<p>It rarely arrives as a dramatic procurement decision. More often, a teacher signs up for a lesson-planning assistant, a department adopts a marking tool, or a vendor switches on AI features inside software the school already uses.</p>
<ul>
<li>Generative AI tools used for planning, feedback, or admin tasks</li>
<li>AI features embedded in productivity suites and learning platforms</li>
<li>Third-party integrations passing pupil or staff data to external models</li>
</ul>
<h2>Why it matters now</h2>
<p>Inspectors, insurers, governors, and parents are starting to ask clearer questions about AI use, data handling, and accountability. A policy that only covers formally approved systems leaves a hole in the middle of your governance model.</p>
<p>The first step is not banning tools. It is building an honest register of what is in use, classifying the risk, and deciding what proportionate controls look like for your setting.</p>`,
  },
  {
    slug: "eu-ai-act-readiness-for-uk-smes",
    title: "EU AI Act readiness for UK SMEs",
    excerpt:
      "You do not need a six-figure compliance programme to take a defensible position. Start with classification, evidence, and controls sized to your actual AI use.",
    author: "Franklin Okeke",
    publishedAt: "2026-01-28T09:00:00.000Z",
    status: "published",
    imageUrl: "",
    content: `<p>For many UK SMEs, the EU AI Act feels distant until a customer, partner, or procurement form makes it immediate.</p>
<p>The useful question is not whether every line of the regulation applies to you today. It is whether you can explain what AI you operate, how you classify it, and what evidence you can produce when someone asks.</p>
<h2>Start with your AI register</h2>
<p>List the systems you know about, then look for the ones you do not: embedded features, staff-adopted tools, and vendor integrations. Without that register, every other governance task is guesswork.</p>
<h2>Classify before you document</h2>
<p>Not every AI system triggers the same obligations. Classification turns a vague sense of exposure into a prioritised plan: what needs stronger controls now, what can wait, and what should be retired.</p>
<h2>Build evidence, not theatre</h2>
<p>Policies matter, but auditors and enterprise buyers usually want records: who approved a system, what data it touches, how outputs are reviewed, and how incidents would be handled. Proportionate documentation beats a generic template every time.</p>`,
  },
  {
    slug: "proportionate-ai-governance-policy",
    title: "How to build a proportionate AI governance policy",
    excerpt:
      "A useful AI policy names the AI you actually run, assigns accountability, and gives staff practical guidance — not boilerplate nobody reads.",
    author: "Franklin Okeke",
    publishedAt: "2026-01-10T09:00:00.000Z",
    status: "published",
    imageUrl: "",
    content: `<p>Most AI governance policies fail in one of two directions. They are either so generic that no auditor respects them, or so heavy that the organisation abandons them halfway through.</p>
<p>A proportionate policy sits in the middle: specific to your AI estate, sized to your risk, and written so the people responsible for it can maintain it after external support ends.</p>
<h2>What a good policy covers</h2>
<ul>
<li>Scope: which systems, teams, and use cases are in scope</li>
<li>Accountability: who approves new AI, who owns ongoing oversight</li>
<li>Data rules: what can and cannot be submitted to external models</li>
<li>Human review: where AI assists but a person remains accountable</li>
<li>Records: what evidence you keep and for how long</li>
</ul>
<h2>Make it usable</h2>
<p>Staff will not read a 40-page PDF. Translate the policy into short guidance for common tasks: drafting communications, analysing spreadsheets, supporting lesson planning, or handling customer enquiries.</p>
<p>Governance works when it matches how the organisation actually operates — not when it exists only for audit season.</p>`,
  },
];

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatBlogDate(iso: string | Date): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function isValidBlogStatus(value: unknown): value is BlogPostStatus {
  return value === "draft" || value === "published";
}

export function isValidBlogPostPayload(body: unknown): body is BlogPost {
  if (!body || typeof body !== "object") return false;

  const candidate = body as Partial<BlogPost>;

  return (
    typeof candidate.slug === "string" &&
    candidate.slug.trim().length > 0 &&
    typeof candidate.title === "string" &&
    candidate.title.trim().length > 0 &&
    typeof candidate.excerpt === "string" &&
    typeof candidate.content === "string" &&
    (typeof candidate.imageUrl === "string" || candidate.imageUrl === undefined) &&
    typeof candidate.author === "string" &&
    candidate.author.trim().length > 0 &&
    typeof candidate.publishedAt === "string" &&
    !Number.isNaN(Date.parse(candidate.publishedAt)) &&
    isValidBlogStatus(candidate.status)
  );
}

export function normalizeBlogPost(body: BlogPost): BlogPost {
  return {
    ...body,
    imageUrl: body.imageUrl?.trim() ?? "",
  };
}
