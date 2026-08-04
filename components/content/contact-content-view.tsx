"use client";

import { ContactForm } from "@/components/ContactForm";
import { EditableSection } from "@/components/live-edit/editable-section";
import { EditableText } from "@/components/live-edit/editable-text";
import { HeroBackdrop } from "@/components/site-image";
import { defaultPageContent } from "@/lib/page-content-schema";

const d = defaultPageContent.contact;

export function ContactContentView() {
  return (
    <>
      <EditableSection
        title="Hero"
        className="hero hero--page hero--has-bg"
        fields={[
          { key: "heroTagline", label: "Tagline", kind: "text" },
          { key: "heroTitle", label: "Title", kind: "text" },
        ]}
      >
        <HeroBackdrop src="/images/hero-ai.jpg" />
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
        </div>
      </EditableSection>

      <EditableSection
        title="Contact details"
        fields={[
          { key: "asideLede", label: "Intro", kind: "html" },
          { key: "formNote", label: "Form note", kind: "html" },
          { key: "directTitle", label: "Direct title", kind: "text" },
          { key: "directGeneral", label: "General label", kind: "text" },
          { key: "primaryEmail", label: "Primary email", kind: "text" },
          { key: "directPartnership", label: "Partnership label", kind: "text" },
          { key: "partnershipEmail", label: "Partnership email", kind: "text" },
          { key: "officeTitle", label: "Office title", kind: "text" },
          { key: "officeLine1", label: "Office line 1", kind: "text" },
          { key: "officeLine2", label: "Office line 2", kind: "text" },
        ]}
      >
        <div className="wrap">
          <div className="contact-layout">
            <div className="contact-aside reveal">
              <EditableText
                field="asideLede"
                defaultValue={d.asideLede}
                as="p"
                className="lede"
                multiline
                rich
              />
              <EditableText
                field="formNote"
                defaultValue={d.formNote}
                as="p"
                style={{ color: "var(--muted)" }}
                multiline
                rich
              />
              <div className="contact-detail">
                <EditableText
                  field="directTitle"
                  defaultValue={d.directTitle}
                  as="h4"
                />
                <p>
                  <EditableText
                    field="directGeneral"
                    defaultValue={d.directGeneral}
                    as="span"
                  />{" "}
                  <a href={`mailto:${d.primaryEmail}`}>
                    <EditableText
                      field="primaryEmail"
                      defaultValue={d.primaryEmail}
                      as="span"
                    />
                  </a>
                </p>
                <p>
                  <EditableText
                    field="directPartnership"
                    defaultValue={d.directPartnership}
                    as="span"
                  />{" "}
                  <a href={`mailto:${d.partnershipEmail}`}>
                    <EditableText
                      field="partnershipEmail"
                      defaultValue={d.partnershipEmail}
                      as="span"
                    />
                  </a>
                </p>
              </div>
              <div className="contact-detail">
                <EditableText field="officeTitle" defaultValue={d.officeTitle} as="h4" />
                <EditableText field="officeLine1" defaultValue={d.officeLine1} as="p" />
                <EditableText field="officeLine2" defaultValue={d.officeLine2} as="p" />
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </EditableSection>
    </>
  );
}
