import Link from "next/link";
import type { CustomPage } from "@/lib/custom-pages-schema";

type CustomPageViewProps = {
  page: CustomPage;
};

export function CustomPageView({ page }: CustomPageViewProps) {
  const hasCards = page.cards.length > 0;

  return (
    <>
      <section className="hero hero--page">
        <div className="wrap hero-inner">
          {page.heroTagline ? (
            <p className="hero-tagline reveal">{page.heroTagline}</p>
          ) : null}
          <h1 className="reveal">{page.heroTitle || page.title}</h1>
          {page.heroLede ? (
            <p className="lede reveal" style={{ whiteSpace: "pre-wrap" }}>
              {page.heroLede}
            </p>
          ) : null}
        </div>
      </section>

      {hasCards ? (
        <section className="section-paper-2">
          <div className="wrap">
            <div className="section-head reveal">
              {page.cardsSectionEyebrow ? (
                <p className="eyebrow">{page.cardsSectionEyebrow}</p>
              ) : null}
              {page.cardsSectionTitle ? (
                <h2>{page.cardsSectionTitle}</h2>
              ) : null}
            </div>
            <div
              className={`card-grid${page.cards.length === 2 ? " two" : ""}`}
            >
              {page.cards.map((card, index) => (
                <article
                  key={card.id}
                  className="card reveal"
                  data-delay={index || undefined}
                >
                  <p className="num">{String(index + 1).padStart(2, "0")}</p>
                  <h3>{card.title}</h3>
                  <p style={{ whiteSpace: "pre-wrap" }}>{card.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {(page.ctaTitle || page.ctaButton) && (
        <section className="cta-band">
          <div className="wrap cta-band-inner reveal">
            <div>
              {page.ctaTitle ? <h2>{page.ctaTitle}</h2> : null}
              {page.ctaDescription ? <p>{page.ctaDescription}</p> : null}
            </div>
            {page.ctaButton ? (
              <Link href="/contact" className="btn btn-on-ink">
                {page.ctaButton}
              </Link>
            ) : null}
          </div>
        </section>
      )}
    </>
  );
}
