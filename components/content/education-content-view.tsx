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
          <div className="split">
            <article className="programme reveal">
              <EditableText field="p1Tag" defaultValue={d.p1Tag} as="span" className="tag" />
              <EditableText field="p1Title" defaultValue={d.p1Title} as="h3" />
              <EditableText field="p1Strap" defaultValue={d.p1Strap} as="p" className="strap" />
              <EditableText field="p1Body1" defaultValue={d.p1Body1} as="p" multiline />
              <EditableText field="p1Body2" defaultValue={d.p1Body2} as="p" multiline />
            </article>
            <article className="programme reveal" data-delay="1">
              <EditableText field="p2Tag" defaultValue={d.p2Tag} as="span" className="tag" />
              <EditableText field="p2Title" defaultValue={d.p2Title} as="h3" />
              <EditableText field="p2Strap" defaultValue={d.p2Strap} as="p" className="strap" />
              <EditableText field="p2Body1" defaultValue={d.p2Body1} as="p" multiline />
              <EditableText field="p2Body2" defaultValue={d.p2Body2} as="p" multiline />
              <EditableText field="p2Body3" defaultValue={d.p2Body3} as="p" multiline />
            </article>
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
