"use client";

import Link from "next/link";
import { EditableBulletList } from "@/components/editable-bullet-list";
import { EditableSection } from "@/components/live-edit/editable-section";
import { EditableText } from "@/components/live-edit/editable-text";
import { Arrow } from "@/components/ui";
import { defaultPageContent } from "@/lib/page-content-schema";

const d = defaultPageContent.solutions;

export function SolutionsContentView() {
  return (
    <>
      <EditableSection
        title="Hero"
        className="hero"
        fields={[
          { key: "heroTagline", label: "Tagline", kind: "text" },
          { key: "heroTitle", label: "Title", kind: "text" },
          { key: "heroLede", label: "Supporting text", kind: "html" },
        ]}
      >
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
        title="GARIL"
        className="solution-block"
        id="garil"
        fields={[
          { key: "garilTag", label: "Tag", kind: "text" },
          { key: "garilHeadline", label: "Headline", kind: "html" },
          { key: "garilIntro", label: "Intro", kind: "html" },
          { key: "garilBodyP1", label: "Body paragraph 1", kind: "html" },
          { key: "garilBodyP2", label: "Body paragraph 2", kind: "html" },
          { key: "garilCapabilitiesIntro", label: "Capabilities heading", kind: "text" },
          { key: "garilCapabilitiesItems", label: "Capabilities list", kind: "lines" },
          { key: "garilAudienceIntro", label: "Audience heading", kind: "text" },
          { key: "garilAudienceItems", label: "Audience list", kind: "lines" },
          { key: "garilCtaButton", label: "CTA button", kind: "text" },
        ]}
      >
        <div className="wrap">
          <div className="solution-detail reveal">
            <EditableText
              field="garilTag"
              defaultValue={d.garilTag}
              as="p"
              className="eyebrow"
            />
            <EditableText
              field="garilHeadline"
              defaultValue={d.garilHeadline}
              as="h2"
              multiline
              rich
            />
            <div className="solution-detail-body">
              <EditableText
                field="garilIntro"
                defaultValue={d.garilIntro}
                as="p"
                multiline
                rich
              />
              <EditableText
                field="garilBodyP1"
                defaultValue={d.garilBodyP1}
                as="p"
                multiline
                rich
              />
              <EditableText
                field="garilBodyP2"
                defaultValue={d.garilBodyP2}
                as="p"
                multiline
                rich
              />
              <EditableText
                field="garilCapabilitiesIntro"
                defaultValue={d.garilCapabilitiesIntro}
                as="h3"
                className="content-subhead"
              />
              <EditableBulletList
                field="garilCapabilitiesItems"
                defaultValue={d.garilCapabilitiesItems}
                splitLabels={false}
              />
              <EditableText
                field="garilAudienceIntro"
                defaultValue={d.garilAudienceIntro}
                as="h3"
                className="content-subhead"
              />
              <EditableBulletList
                field="garilAudienceItems"
                defaultValue={d.garilAudienceItems}
                splitLabels={false}
              />
              <a
                className="btn"
                href="https://garilai.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <EditableText
                  field="garilCtaButton"
                  defaultValue={d.garilCtaButton}
                  as="span"
                />{" "}
                <Arrow />
              </a>
            </div>
          </div>
        </div>
      </EditableSection>

      <EditableSection
        title="ASAT"
        className="solution-block section-paper-2"
        id="asat"
        fields={[
          { key: "asatTag", label: "Tag", kind: "text" },
          { key: "asatHeadline", label: "Headline", kind: "html" },
          { key: "asatIntro", label: "Intro", kind: "html" },
          { key: "asatBodyP1", label: "Body paragraph", kind: "html" },
          { key: "asatDetailTitle", label: "Detail heading", kind: "text" },
          { key: "asatDetailP1", label: "Detail body", kind: "html" },
          { key: "asatFeaturesIntro", label: "Features heading", kind: "text" },
          { key: "asatFeaturesLead", label: "Features lead", kind: "text" },
          { key: "asatFeaturesItems", label: "Features list", kind: "lines" },
          { key: "asatSupportTitle", label: "Support heading", kind: "text" },
          { key: "asatSupportP1", label: "Support body", kind: "html" },
          { key: "asatGrowthTitle", label: "Growth heading", kind: "text" },
          { key: "asatGrowthP1", label: "Growth body", kind: "html" },
          { key: "asatCtaButton", label: "CTA button", kind: "text" },
        ]}
      >
        <div className="wrap">
          <div className="solution-detail reveal">
            <EditableText
              field="asatTag"
              defaultValue={d.asatTag}
              as="p"
              className="eyebrow"
            />
            <EditableText
              field="asatHeadline"
              defaultValue={d.asatHeadline}
              as="h2"
              multiline
              rich
            />
            <div className="solution-detail-body">
              <EditableText
                field="asatIntro"
                defaultValue={d.asatIntro}
                as="p"
                multiline
                rich
              />
              <EditableText
                field="asatBodyP1"
                defaultValue={d.asatBodyP1}
                as="p"
                multiline
                rich
              />
              <EditableText
                field="asatDetailTitle"
                defaultValue={d.asatDetailTitle}
                as="h3"
                className="content-subhead"
              />
              <EditableText
                field="asatDetailP1"
                defaultValue={d.asatDetailP1}
                as="p"
                multiline
                rich
              />
              <EditableText
                field="asatFeaturesIntro"
                defaultValue={d.asatFeaturesIntro}
                as="h3"
                className="content-subhead"
              />
              <EditableText
                field="asatFeaturesLead"
                defaultValue={d.asatFeaturesLead}
                as="p"
                className="content-list-intro"
              />
              <EditableBulletList
                field="asatFeaturesItems"
                defaultValue={d.asatFeaturesItems}
                splitLabels={false}
              />
              <EditableText
                field="asatSupportTitle"
                defaultValue={d.asatSupportTitle}
                as="h3"
                className="content-subhead"
              />
              <EditableText
                field="asatSupportP1"
                defaultValue={d.asatSupportP1}
                as="p"
                multiline
                rich
              />
              <EditableText
                field="asatGrowthTitle"
                defaultValue={d.asatGrowthTitle}
                as="h3"
                className="content-subhead"
              />
              <EditableText
                field="asatGrowthP1"
                defaultValue={d.asatGrowthP1}
                as="p"
                multiline
                rich
              />
              <Link className="btn" href="/contact">
                <EditableText
                  field="asatCtaButton"
                  defaultValue={d.asatCtaButton}
                  as="span"
                />{" "}
                <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </EditableSection>

      <EditableSection
        title="Why TrustLed"
        className="solution-why"
        fields={[
          { key: "whyTitle", label: "Title", kind: "text" },
          { key: "whyBody", label: "Body", kind: "html" },
        ]}
      >
        <div className="wrap">
          <div className="solution-why-inner reveal">
            <EditableText
              field="whyTitle"
              defaultValue={d.whyTitle}
              as="h2"
            />
            <EditableText
              field="whyBody"
              defaultValue={d.whyBody}
              as="p"
              multiline
              rich
            />
          </div>
        </div>
      </EditableSection>
    </>
  );
}
