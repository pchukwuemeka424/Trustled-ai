"use client";

import { EditableBulletList } from "@/components/editable-bullet-list";
import { EditableCtaBand } from "@/components/editable-cta-band";
import { EditableSection } from "@/components/live-edit/editable-section";
import { EditableText } from "@/components/live-edit/editable-text";
import { HeroBackdrop, SiteImage } from "@/components/site-image";
import { defaultPageContent } from "@/lib/page-content-schema";

const d = defaultPageContent.about;

export function AboutContentView() {
  return (
    <>
      <EditableSection
        title="Hero"
        className="hero hero--page hero--has-bg"
        fields={[
          { key: "heroTagline", label: "Tagline", kind: "text" },
          { key: "heroTitle", label: "Title", kind: "text" },
          { key: "heroLede", label: "Supporting text", kind: "html" },
        ]}
      >
        <HeroBackdrop src="/images/governance-ai.jpg" />
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
            rich
          />
        </div>
      </EditableSection>

      <EditableSection
        title="Our story"
        className="about-story"
        fields={[
          { key: "storyP1", label: "Paragraph 1", kind: "html" },
          { key: "storyP2", label: "Paragraph 2", kind: "html" },
          { key: "storyP3", label: "Paragraph 3", kind: "html" },
          { key: "storyP4", label: "Paragraph 4", kind: "html" },
        ]}
      >
        <div className="wrap">
          <div className="media-split reveal">
            <figure className="media-figure">
              <SiteImage
                src="/images/hero-ai.jpg"
                alt="Abstract visualisation of responsible AI systems and networks"
              />
            </figure>
            <div className="about-story-body">
              <EditableText field="storyP1" defaultValue={d.storyP1} as="p" multiline rich />
              <EditableText field="storyP2" defaultValue={d.storyP2} as="p" multiline rich />
              <EditableText field="storyP3" defaultValue={d.storyP3} as="p" multiline rich />
              <EditableText field="storyP4" defaultValue={d.storyP4} as="p" multiline rich />
            </div>
          </div>
        </div>
      </EditableSection>

      <EditableSection
        title="What we do"
        className="section-paper-2"
        fields={[
          { key: "whatWeDoEyebrow", label: "Eyebrow", kind: "text" },
          { key: "whatWeDoTitle", label: "Title", kind: "html" },
          { key: "about1Title", label: "Card 1 title", kind: "text" },
          { key: "about1Body", label: "Card 1 body", kind: "html" },
          { key: "about2Title", label: "Card 2 title", kind: "text" },
          { key: "about2Body", label: "Card 2 body", kind: "html" },
          { key: "about3Title", label: "Card 3 title", kind: "text" },
          { key: "about3Body", label: "Card 3 body", kind: "html" },
        ]}
      >
        <div className="wrap">
          <div className="section-head reveal">
            <EditableText
              field="whatWeDoEyebrow"
              defaultValue={d.whatWeDoEyebrow}
              as="p"
              className="eyebrow"
            />
            <EditableText
              field="whatWeDoTitle"
              defaultValue={d.whatWeDoTitle}
              as="h2"
              multiline
              rich
            />
          </div>
          <div className="about-grid about-grid--three">
            {(
              [
                ["about1Title", "about1Body"],
                ["about2Title", "about2Body"],
                ["about3Title", "about3Body"],
              ] as const
            ).map(([title, body], i) => (
              <article
                key={title}
                className="about-card reveal"
                data-delay={i || undefined}
              >
                <h3>
                  <span className="dot" />{" "}
                  <EditableText field={title} defaultValue={d[title]} as="span" />
                </h3>
                <EditableText field={body} defaultValue={d[body]} as="p" multiline rich />
              </article>
            ))}
          </div>
        </div>
      </EditableSection>

      <EditableSection
        title="Our approach"
        fields={[
          { key: "approachEyebrow", label: "Eyebrow", kind: "text" },
          { key: "approachTitle", label: "Title", kind: "html" },
          { key: "approachP1", label: "Paragraph 1", kind: "html" },
          { key: "approachP2", label: "Paragraph 2", kind: "html" },
        ]}
      >
        <div className="wrap">
          <div className="about-approach reveal">
            <EditableText
              field="approachEyebrow"
              defaultValue={d.approachEyebrow}
              as="p"
              className="eyebrow"
            />
            <EditableText
              field="approachTitle"
              defaultValue={d.approachTitle}
              as="h2"
              multiline
              rich
            />
            <EditableText
              field="approachP1"
              defaultValue={d.approachP1}
              as="p"
              multiline
              rich
            />
            <EditableText
              field="approachP2"
              defaultValue={d.approachP2}
              as="p"
              multiline
              rich
            />
          </div>
        </div>
      </EditableSection>

      <EditableSection
        title="Why TrustLed AI"
        className="section-paper-2"
        fields={[
          { key: "whyEyebrow", label: "Eyebrow", kind: "text" },
          { key: "whyTitle", label: "Title", kind: "html" },
          { key: "whyIntro", label: "Intro", kind: "html" },
          { key: "whyItems", label: "Points", kind: "lines" },
          { key: "whyClosing", label: "Closing", kind: "html" },
        ]}
      >
        <div className="wrap">
          <div className="about-approach reveal">
            <EditableText
              field="whyEyebrow"
              defaultValue={d.whyEyebrow}
              as="p"
              className="eyebrow"
            />
            <EditableText
              field="whyTitle"
              defaultValue={d.whyTitle}
              as="h2"
              multiline
              rich
            />
            <EditableText
              field="whyIntro"
              defaultValue={d.whyIntro}
              as="p"
              multiline
              rich
            />
            <EditableBulletList field="whyItems" defaultValue={d.whyItems} />
            <EditableText
              field="whyClosing"
              defaultValue={d.whyClosing}
              as="p"
              multiline
              rich
            />
          </div>
        </div>
      </EditableSection>

      <EditableSection
        title="Leadership"
        fields={[
          { key: "leadershipEyebrow", label: "Eyebrow", kind: "text" },
          { key: "leadershipTitle", label: "Title", kind: "text" },
          { key: "leadershipLede", label: "Intro", kind: "html" },
          { key: "team1Name", label: "Team 1 name", kind: "text" },
          { key: "team1Role", label: "Team 1 role", kind: "text" },
          { key: "team1Bio", label: "Team 1 bio", kind: "html" },
          { key: "team2Name", label: "Team 2 name", kind: "text" },
          { key: "team2Role", label: "Team 2 role", kind: "text" },
          { key: "team2Bio", label: "Team 2 bio", kind: "html" },
          { key: "team3Name", label: "Team 3 name", kind: "text" },
          { key: "team3Role", label: "Team 3 role", kind: "text" },
          { key: "team3Bio", label: "Team 3 bio", kind: "html" },
        ]}
      >
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
              rich
            />
          </div>
          <div className="team-grid">
            {(
              [
                ["team1Name", "team1Role", "team1Bio", "FO"],
                ["team2Name", "team2Role", "team2Bio", "PC"],
                ["team3Name", "team3Role", "team3Bio", "AO"],
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
                <EditableText field={bio} defaultValue={d[bio]} as="p" multiline rich />
              </article>
            ))}
          </div>
        </div>
      </EditableSection>

      <EditableSection
        title="Vision"
        className="about-vision section-ink"
        fields={[
          { key: "visionEyebrow", label: "Eyebrow", kind: "text" },
          { key: "visionTitle", label: "Title", kind: "html" },
          { key: "visionBody", label: "Body", kind: "html" },
        ]}
      >
        <div className="wrap">
          <div className="about-vision-inner reveal">
            <EditableText
              field="visionEyebrow"
              defaultValue={d.visionEyebrow}
              as="p"
              className="eyebrow"
            />
            <EditableText
              field="visionTitle"
              defaultValue={d.visionTitle}
              as="h2"
              multiline
              rich
            />
            <EditableText
              field="visionBody"
              defaultValue={d.visionBody}
              as="p"
              multiline
              rich
            />
          </div>
        </div>
      </EditableSection>

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
