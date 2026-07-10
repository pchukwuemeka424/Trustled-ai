"use client";

import { EditableCtaBand } from "@/components/editable-cta-band";
import { EditableText } from "@/components/live-edit/editable-text";
import { defaultPageContent } from "@/lib/page-content-schema";

const d = defaultPageContent.education;

const PROGRAMMES = [
  {
    title: "p1Title",
    strap: "p1Strap",
    bodies: ["p1Body1"] as const,
    featured: true,
  },
  {
    title: "p2Title",
    strap: "p2Strap",
    bodies: ["p2Body1"] as const,
    featured: false,
  },
  {
    title: "p3Title",
    strap: "p3Strap",
    bodies: ["p3Body1"] as const,
    featured: false,
  },
] as const;

function ProgrammeCard({
  programme,
  num,
  heading: Heading,
  delay,
}: {
  programme: (typeof PROGRAMMES)[number];
  num: string;
  heading: "h2" | "h3";
  delay?: number;
}) {
  const featured = programme.featured;

  return (
    <article
      className={`edu-programme${featured ? " edu-programme--featured" : ""} reveal`}
      data-delay={delay || undefined}
    >
      <div className="edu-programme-side">
        <span className="edu-programme-num">{num}</span>
      </div>
      <div className="edu-programme-main">
        <EditableText
          field={programme.title}
          defaultValue={d[programme.title]}
          as={Heading}
        />
        <EditableText
          field={programme.strap}
          defaultValue={d[programme.strap]}
          as="p"
          className="edu-programme-strap"
        />
        <div className="edu-programme-body">
          {programme.bodies.map((field) => (
            <EditableText
              key={field}
              field={field}
              defaultValue={d[field]}
              as="p"
              multiline
            />
          ))}
        </div>
      </div>
    </article>
  );
}

export function EducationContentView() {
  const [featured, ...rest] = PROGRAMMES;

  return (
    <div className="education">
      <section className="hero hero--page">
        <div className="hero-overlay" aria-hidden />
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

      <section className="edu-programmes">
        <div className="wrap">
          <ProgrammeCard programme={featured} num="01" heading="h2" />

          <div className="edu-programme-grid">
            {rest.map((programme, index) => (
              <ProgrammeCard
                key={programme.title}
                programme={programme}
                num={String(index + 2).padStart(2, "0")}
                heading="h3"
                delay={index + 1}
              />
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
    </div>
  );
}
