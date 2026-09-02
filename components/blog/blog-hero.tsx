import Link from "next/link";
import { HeroBackdrop } from "@/components/site-image";

const TOPICS = [
  "Shadow AI",
  "Regulatory readiness",
  "Governance in practice",
] as const;

type BlogHeroProps = {
  isManaging?: boolean;
  postCount?: number;
};

export function BlogHero({ isManaging = false, postCount = 0 }: BlogHeroProps) {
  if (isManaging) {
    return (
      <section className="hero hero--page hero--blog hero--blog-manage">
        <div className="wrap hero-inner blog-hero-inner">
          <p className="hero-tagline">Blog</p>
          <h1>Manage blog articles</h1>
          <p className="lede">
            Create, edit, publish, or delete articles shown on the public blog.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="hero hero--page hero--has-bg hero--blog"
      aria-labelledby="blog-hero-heading"
    >
      <HeroBackdrop src="/images/governance-ai.jpg" alt="" />
      <div className="wrap hero-inner blog-hero-inner">
        <div className="blog-hero-layout">
          <div className="blog-hero-copy">
            <p className="hero-tagline reveal">Insight</p>
            <h1 id="blog-hero-heading" className="reveal">
              Practical AI governance{" "}
              <span className="blog-hero-accent">insight.</span>
            </h1>
            <p className="lede reveal">
              Short articles on shadow AI, regulatory readiness, and building
              governance that works in real organisations.
            </p>
            <ul className="blog-hero-topics reveal" aria-label="Topics covered">
              {TOPICS.map((topic) => (
                <li key={topic}>
                  <span className="blog-hero-topic">{topic}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="blog-hero-panel reveal" aria-label="About this blog">
            <p className="blog-hero-panel-label">From the TrustLed team</p>
            <p className="blog-hero-panel-lede">
              Clear guidance for schools, universities, and regulated SMEs
              navigating AI responsibly — without the jargon.
            </p>
            {postCount > 0 ? (
              <p className="blog-hero-stat">
                <span className="blog-hero-stat-value">{postCount}</span>
                <span className="blog-hero-stat-label">
                  article{postCount === 1 ? "" : "s"} published
                </span>
              </p>
            ) : null}
            <Link className="btn btn-sm hero-btn-ghost" href="/contact">
              Start a conversation
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
