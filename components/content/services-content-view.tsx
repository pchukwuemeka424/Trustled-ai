"use client";

import { EditableCtaBand } from "@/components/editable-cta-band";
import { EditableText } from "@/components/live-edit/editable-text";
import { defaultPageContent } from "@/lib/page-content-schema";

const d = defaultPageContent.services;

function ServiceBlock({
  id,
  sectionClass,
  indexField,
  titleField,
  paragraphs,
}: {
  id: string;
  sectionClass?: string;
  indexField: keyof typeof d;
  titleField: keyof typeof d;
  paragraphs: (keyof typeof d)[];
}) {
  return (
    <div className={`service-block${sectionClass ? ` ${sectionClass}` : ""}`} id={id}>
      <div className="wrap">
        <div className="service-grid">
          <div className="service-lead reveal">
            <EditableText
              field={indexField}
              defaultValue={d[indexField]}
              as="p"
              className="service-index"
            />
            <EditableText field={titleField} defaultValue={d[titleField]} as="h2" multiline />
          </div>
          <div className="service-body reveal" data-delay="1">
            {paragraphs.map((field) => (
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
      </div>
    </div>
  );
}

export function ServicesContentView() {
  return (
    <>
      <section className="hero">
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

      <ServiceBlock
        id="advisory"
        indexField="s1Index"
        titleField="s1Title"
        paragraphs={["s1P1", "s1P2", "s1P3", "s1P4"]}
      />
      <ServiceBlock
        id="shadow"
        sectionClass="section-paper-2"
        indexField="s2Index"
        titleField="s2Title"
        paragraphs={["s2P1", "s2P2", "s2P3", "s2P4"]}
      />
      <div className="service-block" id="automation">
        <div className="wrap">
          <div className="service-grid">
            <div className="service-lead reveal">
              <EditableText
                field="s3Index"
                defaultValue={d.s3Index}
                as="p"
                className="service-index"
              />
              <EditableText field="s3Title" defaultValue={d.s3Title} as="h2" />
            </div>
            <div className="service-body reveal" data-delay="1">
              <EditableText field="s3P1" defaultValue={d.s3P1} as="p" multiline />
              <EditableText field="s3P2" defaultValue={d.s3P2} as="p" multiline />
            </div>
          </div>
          <div className="bucket-grid">
            {(
              [
                ["bucket1Tag", "bucket1Title", "bucket1Body", "bucket--full"],
                ["bucket2Tag", "bucket2Title", "bucket2Body", "bucket--loop"],
                ["bucket3Tag", "bucket3Title", "bucket3Body", "bucket--only"],
              ] as const
            ).map(([tag, title, body, cls], i) => (
              <div
                key={tag}
                className={`bucket ${cls} reveal`}
                data-delay={i || undefined}
              >
                <EditableText field={tag} defaultValue={d[tag]} as="span" className="bucket-tag" />
                <EditableText field={title} defaultValue={d[title]} as="h3" />
                <EditableText field={body} defaultValue={d[body]} as="p" multiline />
              </div>
            ))}
          </div>
          <div
            className="service-body reveal"
            style={{ maxWidth: "760px", marginTop: "2.5rem" }}
          >
            <EditableText field="s3P3" defaultValue={d.s3P3} as="p" multiline />
          </div>
        </div>
      </div>

      <EditableCtaBand
        titleField="ctaTitle"
        descriptionField="ctaDescription"
        defaultTitle={d.ctaTitle}
        defaultDescription={d.ctaDescription}
      />
    </>
  );
}
