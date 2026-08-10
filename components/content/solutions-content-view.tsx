"use client";

import Link from "next/link";
import { EditableBulletList } from "@/components/editable-bullet-list";
import { EditableImage } from "@/components/live-edit/editable-image";
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
        className="garil-section"
        id="garil"
        fields={[
          { key: "garilTag", label: "Tag", kind: "text" },
          { key: "garilHeadline", label: "Headline", kind: "html" },
          { key: "garilIntro", label: "Intro", kind: "html" },
          { key: "garilImageUrl", label: "Hero image URL", kind: "text" },
          { key: "garilImageAlt", label: "Hero image alt", kind: "text" },
          { key: "garilBodyP1", label: "Body paragraph 1", kind: "html" },
          { key: "garilBodyP2", label: "Body paragraph 2", kind: "html" },
          { key: "garilCapabilitiesIntro", label: "Capabilities heading", kind: "text" },
          { key: "garilCapabilitiesItems", label: "Capabilities list", kind: "lines" },
          { key: "garilAudienceIntro", label: "Audience heading", kind: "text" },
          { key: "garilAudienceItems", label: "Audience list", kind: "lines" },
          { key: "garilCtaButton", label: "CTA button", kind: "text" },
        ]}
      >
        <div className="wrap garil-inner">
          <div className="garil-hero reveal">
            <div className="garil-hero-copy">
              <EditableText
                field="garilTag"
                defaultValue={d.garilTag}
                as="p"
                className="garil-hero-brand"
              />
              <EditableText
                field="garilHeadline"
                defaultValue={d.garilHeadline}
                as="h2"
                multiline
                rich
              />
              <EditableText
                field="garilIntro"
                defaultValue={d.garilIntro}
                as="p"
                className="garil-lede"
                multiline
                rich
              />
              <div className="garil-hero-actions">
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
            <div className="garil-hero-visual">
              <figure className="garil-hero-media">
                <EditableImage
                  srcField="garilImageUrl"
                  altField="garilImageAlt"
                  defaultSrc={d.garilImageUrl}
                  defaultAlt={d.garilImageAlt}
                  fill
                  sizes="(max-width: 920px) 100vw, 55vw"
                  uploadScope="solutions"
                  priority
                />
              </figure>
            </div>
          </div>

          <div className="garil-body reveal">
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
          </div>

          <div className="garil-split reveal">
            <div className="garil-block">
              <EditableText
                field="garilCapabilitiesIntro"
                defaultValue={d.garilCapabilitiesIntro}
                as="h3"
              />
              <EditableBulletList
                field="garilCapabilitiesItems"
                defaultValue={d.garilCapabilitiesItems}
                className="garil-capabilities"
                splitLabels={false}
              />
            </div>
            <div className="garil-block">
              <EditableText
                field="garilAudienceIntro"
                defaultValue={d.garilAudienceIntro}
                as="h3"
              />
              <EditableBulletList
                field="garilAudienceItems"
                defaultValue={d.garilAudienceItems}
                className="garil-audience"
                splitLabels={false}
              />
            </div>
          </div>
        </div>
      </EditableSection>

      <EditableSection
        title="ASAT"
        className="asat-section solution-block section-paper-2"
        id="asat"
        fields={[
          { key: "asatTag", label: "Tag", kind: "text" },
          { key: "asatHeadline", label: "Headline", kind: "html" },
          { key: "asatIntro", label: "Intro", kind: "html" },
          { key: "asatImageUrl", label: "Hero image URL", kind: "text" },
          { key: "asatImageAlt", label: "Hero image alt", kind: "text" },
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
        <div className="wrap asat-inner">
          <div className="asat-hero reveal">
            <div className="asat-hero-copy">
              <EditableText
                field="asatTag"
                defaultValue={d.asatTag}
                as="p"
                className="asat-hero-brand"
              />
              <EditableText
                field="asatHeadline"
                defaultValue={d.asatHeadline}
                as="h2"
                multiline
                rich
              />
              <EditableText
                field="asatIntro"
                defaultValue={d.asatIntro}
                as="p"
                className="asat-lede"
                multiline
                rich
              />
              <EditableText
                field="asatBodyP1"
                defaultValue={d.asatBodyP1}
                as="p"
                className="asat-lede"
                multiline
                rich
              />
              <div className="asat-hero-actions">
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
            <div className="asat-hero-visual">
              <figure className="asat-hero-media">
                <EditableImage
                  srcField="asatImageUrl"
                  altField="asatImageAlt"
                  defaultSrc={d.asatImageUrl}
                  defaultAlt={d.asatImageAlt}
                  fill
                  sizes="(max-width: 920px) 100vw, 50vw"
                  uploadScope="solutions"
                />
              </figure>
            </div>
          </div>

          <div className="asat-split reveal">
            <div className="asat-block">
              <EditableText
                field="asatDetailTitle"
                defaultValue={d.asatDetailTitle}
                as="h3"
              />
              <EditableText
                field="asatDetailP1"
                defaultValue={d.asatDetailP1}
                as="p"
                multiline
                rich
              />
            </div>
            <div className="asat-block">
              <EditableText
                field="asatFeaturesIntro"
                defaultValue={d.asatFeaturesIntro}
                as="h3"
              />
              <EditableText
                field="asatFeaturesLead"
                defaultValue={d.asatFeaturesLead}
                as="p"
                className="asat-features-lead"
              />
              <EditableBulletList
                field="asatFeaturesItems"
                defaultValue={d.asatFeaturesItems}
                className="asat-features"
                splitLabels={false}
              />
            </div>
          </div>

          <div className="asat-split asat-split--support reveal">
            <div className="asat-block">
              <EditableText
                field="asatSupportTitle"
                defaultValue={d.asatSupportTitle}
                as="h3"
              />
              <EditableText
                field="asatSupportP1"
                defaultValue={d.asatSupportP1}
                as="p"
                multiline
                rich
              />
            </div>
            <div className="asat-block">
              <EditableText
                field="asatGrowthTitle"
                defaultValue={d.asatGrowthTitle}
                as="h3"
              />
              <EditableText
                field="asatGrowthP1"
                defaultValue={d.asatGrowthP1}
                as="p"
                multiline
                rich
              />
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
