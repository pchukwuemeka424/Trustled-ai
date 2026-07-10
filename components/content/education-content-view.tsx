"use client";

import { EditableCtaBand } from "@/components/editable-cta-band";
import { EditableText } from "@/components/live-edit/editable-text";
import { defaultPageContent } from "@/lib/page-content-schema";

const heroStyle = {
  paddingTop: "clamp(3.5rem,7vw,5rem)",
  paddingBottom: "clamp(3rem,6vw,4.5rem)",
};

const d = defaultPageContent.education;

export function EducationContentView() {
  return (
    <>
      <section className="hero" style={heroStyle}>
        <div className="wrap hero-inner">
          <EditableText
            field="heroTagline"
            defaultValue={d.heroTagline}
            as="p"
            className="hero-tagline reveal"
          />
          <EditableText
            field="heroTitle"
            defaultValue={d.heroTitle}
            as="h1"
            className="reveal"
          />
          <EditableText
            field="heroLede"
            defaultValue={d.heroLede}
            as="p"
            className="lede reveal"
            multiline
          />
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="card-grid">
            {(
              [
                ["p1Tag", "p1Title", "p1Strap", "p1Body1", "p1Body2"],
                ["p2Tag", "p2Title", "p2Strap", "p2Body1"],
                ["p3Tag", "p3Title", "p3Strap", "p3Body1"],
              ] as const
            ).map(([tag, title, strap, ...bodies], index) => (
              <article
                key={tag}
                className="programme reveal"
                data-delay={index || undefined}
              >
                <EditableText
                  field={tag}
                  defaultValue={d[tag]}
                  as="span"
                  className="tag"
                />
                <EditableText field={title} defaultValue={d[title]} as="h3" />
                <EditableText
                  field={strap}
                  defaultValue={d[strap]}
                  as="p"
                  className="strap"
                />
                {bodies.map((field) => (
                  <EditableText
                    key={field}
                    field={field}
                    defaultValue={d[field]}
                    as="p"
                    multiline
                  />
                ))}
              </article>
            ))}
          </div>
        </div>
      </section>

      <EditableCtaBand
        titleField="ctaTitle"
        descriptionField="ctaDescription"
        defaultTitle={d.ctaTitle}
        defaultDescription={d.ctaDescription}
      />
    </>
  );
}
