"use client";

import { EditableCtaBand } from "@/components/editable-cta-band";
import { EditableText } from "@/components/live-edit/editable-text";
import { defaultPageContent } from "@/lib/page-content-schema";

const heroStyle = {
  paddingTop: "clamp(3.5rem,7vw,5rem)",
  paddingBottom: "clamp(3rem,6vw,4.5rem)",
};

const d = defaultPageContent.about;

export function AboutContentView() {
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
          <div className="about-grid">
            {(
              [
                ["about1Title", "about1Body"],
                ["about2Title", "about2Body"],
                ["about3Title", "about3Body"],
                ["about4Title", "about4Body"],
              ] as const
            ).map(([title, body], i) => (
              <article
                key={title}
                className={`about-card reveal${i % 2 === 1 ? "" : ""}`}
                data-delay={i % 2 === 1 ? 1 : undefined}
              >
                <h3>
                  <span className="dot" />{" "}
                  <EditableText field={title} defaultValue={d[title]} as="span" />
                </h3>
                <EditableText field={body} defaultValue={d[body]} as="p" multiline />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-paper-2">
        <div className="wrap">
          <div className="section-head reveal">
            <EditableText
              field="leadershipEyebrow"
              defaultValue={d.leadershipEyebrow}
              as="p"
              className="eyebrow"
            />
            <EditableText
              field="leadershipTitle"
              defaultValue={d.leadershipTitle}
              as="h2"
            />
            <EditableText
              field="leadershipLede"
              defaultValue={d.leadershipLede}
              as="p"
              className="lede"
              multiline
            />
          </div>
          <div className="team-grid">
            {(
              [
                ["team1Name", "team1Role", "team1Bio", "FO"],
                ["team2Name", "team2Role", "team2Bio", "PC"],
                ["team3Name", "team3Role", "team3Bio", "+"],
              ] as const
            ).map(([name, role, bio, initials], i) => (
              <article
                key={name}
                className="team-card reveal"
                data-delay={i || undefined}
              >
                <div className="team-photo">{initials}</div>
                <EditableText field={name} defaultValue={d[name]} as="h3" />
                <EditableText
                  field={role}
                  defaultValue={d[role]}
                  as="p"
                  className="team-role"
                />
                <EditableText field={bio} defaultValue={d[bio]} as="p" multiline />
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
        buttonText={d.ctaButton}
      />
    </>
  );
}
