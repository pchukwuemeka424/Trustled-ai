"use client";

import { ContactForm } from "@/components/ContactForm";
import { EditableText } from "@/components/live-edit/editable-text";
import { defaultPageContent } from "@/lib/page-content-schema";

const d = defaultPageContent.contact;

export function ContactContentView() {
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
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="contact-layout">
            <div className="contact-aside reveal">
              <EditableText
                field="asideLede"
                defaultValue={d.asideLede}
                as="p"
                className="lede"
                multiline
              />
              <EditableText
                field="formNote"
                defaultValue={d.formNote}
                as="p"
                style={{ color: "var(--muted)" }}
                multiline
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
      </section>
    </>
  );
}
