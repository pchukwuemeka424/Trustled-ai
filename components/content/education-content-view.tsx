"use client";

import Link from "next/link";
import { useState } from "react";
import { EditableBulletList } from "@/components/editable-bullet-list";
import { EditableCtaBand } from "@/components/editable-cta-band";
import { EditableSection } from "@/components/live-edit/editable-section";
import { EditableText } from "@/components/live-edit/editable-text";
import { useOptionalLiveEdit } from "@/components/live-edit/live-edit-context";
import { HeroBackdrop } from "@/components/site-image";
import { Arrow } from "@/components/ui";
import { defaultPageContent } from "@/lib/page-content-schema";

const d = defaultPageContent.education;

const FAQ_FIELDS = [
  ["grcFaq1Q", "grcFaq1A"],
  ["grcFaq2Q", "grcFaq2A"],
  ["grcFaq3Q", "grcFaq3A"],
  ["grcFaq4Q", "grcFaq4A"],
  ["grcFaq5Q", "grcFaq5A"],
  ["grcFaq6Q", "grcFaq6A"],
] as const;

const TIER_FIELDS = [
  {
    name: "grcTier1Name",
    meta: "grcTier1Meta",
    body: "grcTier1Body",
    founding: "grcTier1PriceFounding",
    standard: "grcTier1PriceStandard",
    featured: false,
  },
  {
    name: "grcTier2Name",
    meta: "grcTier2Meta",
    body: "grcTier2Body",
    founding: "grcTier2PriceFounding",
    standard: "grcTier2PriceStandard",
    featured: true,
  },
  {
    name: "grcTier3Name",
    meta: "grcTier3Meta",
    body: "grcTier3Body",
    founding: "grcTier3PriceFounding",
    standard: "grcTier3PriceStandard",
    featured: false,
  },
] as const;

function AccordionList({
  items,
}: {
  items: { question: string; answer: string; qField: string; aField: string }[];
}) {
  const [open, setOpen] = useState<number | null>(0);
  const liveEdit = useOptionalLiveEdit();
  const editing = Boolean(liveEdit?.isAdmin && liveEdit?.isEditing);

  return (
    <div className="train-accordion">
      {items.map((item, index) => {
        const isOpen = editing || open === index;
        return (
          <div
            key={item.qField}
            className={`train-accordion-item${isOpen ? " open" : ""}`}
          >
            <button
              type="button"
              className="train-accordion-trigger"
              aria-expanded={isOpen}
              onClick={() => setOpen((current) => (current === index ? null : index))}
            >
              <EditableText
                field={item.qField}
                defaultValue={item.question}
                as="span"
              />
              <span className="train-accordion-caret" aria-hidden />
            </button>
            {isOpen ? (
              <div className="train-accordion-panel">
                <EditableText
                  field={item.aField}
                  defaultValue={item.answer}
                  as="p"
                  multiline
                  rich
                />
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function ModuleList() {
  const liveEdit = useOptionalLiveEdit();
  const editing = Boolean(liveEdit?.isAdmin && liveEdit?.isEditing);
  const text = liveEdit?.values.grcModulesItems ?? d.grcModulesItems;
  const [open, setOpen] = useState<number | null>(0);

  if (editing) {
    return (
      <EditableBulletList
        field="grcModulesItems"
        defaultValue={d.grcModulesItems}
        splitLabels={false}
      />
    );
  }

  const modules = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <div className="train-accordion">
      {modules.map((module, index) => {
        const isOpen = open === index;
        return (
          <div
            key={module}
            className={`train-accordion-item${isOpen ? " open" : ""}`}
          >
            <button
              type="button"
              className="train-accordion-trigger"
              aria-expanded={isOpen}
              onClick={() => setOpen((current) => (current === index ? null : index))}
            >
              <span>{module}</span>
              <span className="train-accordion-caret" aria-hidden />
            </button>
            {isOpen ? (
              <div className="train-accordion-panel">
                <p>
                  Practical, applied learning with real-world artefacts as part of
                  the AI GRC Practitioner Training Programme.
                </p>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export function EducationContentView() {
  return (
    <div className="education">
      <EditableSection
        title="Hero"
        className="hero hero--page hero--has-bg"
        fields={[
          { key: "heroTagline", label: "Tagline", kind: "text" },
          { key: "heroTitle", label: "Title", kind: "text" },
          { key: "heroLede", label: "Supporting text", kind: "html" },
        ]}
      >
        <HeroBackdrop src="/images/training-ai.jpg" />
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
        title="AI Literacy"
        className="train-section"
        id="literacy"
        fields={[
          { key: "litTag", label: "Tag", kind: "text" },
          { key: "litTitle", label: "Title", kind: "html" },
          { key: "litP1", label: "Paragraph 1", kind: "html" },
          { key: "litP2", label: "Paragraph 2", kind: "html" },
          { key: "litP3", label: "Paragraph 3", kind: "html" },
          { key: "litTopicsIntro", label: "Topics heading", kind: "text" },
          { key: "litTopicsItems", label: "Topics list", kind: "lines" },
          { key: "litAudienceIntro", label: "Audience heading", kind: "text" },
          { key: "litAudienceItems", label: "Audience list", kind: "lines" },
          { key: "litCta", label: "CTA link", kind: "text" },
        ]}
      >
        <div className="wrap">
          <div className="train-block reveal">
            <EditableText
              field="litTag"
              defaultValue={d.litTag}
              as="p"
              className="eyebrow"
            />
            <EditableText
              field="litTitle"
              defaultValue={d.litTitle}
              as="h2"
              multiline
              rich
            />
            <div className="train-block-body">
              <EditableText field="litP1" defaultValue={d.litP1} as="p" multiline rich />
              <EditableText field="litP2" defaultValue={d.litP2} as="p" multiline rich />
              <EditableText field="litP3" defaultValue={d.litP3} as="p" multiline rich />
              <EditableText
                field="litTopicsIntro"
                defaultValue={d.litTopicsIntro}
                as="h3"
                className="content-subhead"
              />
              <EditableBulletList
                field="litTopicsItems"
                defaultValue={d.litTopicsItems}
                splitLabels={false}
              />
              <EditableText
                field="litAudienceIntro"
                defaultValue={d.litAudienceIntro}
                as="h3"
                className="content-subhead"
              />
              <EditableBulletList
                field="litAudienceItems"
                defaultValue={d.litAudienceItems}
                splitLabels={false}
              />
              <Link className="text-link" href="/contact">
                <EditableText field="litCta" defaultValue={d.litCta} as="span" />{" "}
                <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </EditableSection>

      <EditableSection
        title="AI GRC Programme"
        className="train-section section-paper-2"
        id="grc"
        fields={[
          { key: "grcTag", label: "Tag", kind: "text" },
          { key: "grcTitle", label: "Title", kind: "html" },
          { key: "grcP1", label: "Paragraph 1", kind: "html" },
          { key: "grcP2", label: "Paragraph 2", kind: "html" },
          { key: "grcWhyTitle", label: "Why heading", kind: "text" },
          { key: "grcWhyBody", label: "Why body", kind: "html" },
          { key: "grcLearnTitle", label: "Learn heading", kind: "text" },
          { key: "grcLearnIntro", label: "Learn intro", kind: "html" },
          { key: "grcModulesItems", label: "Modules list", kind: "lines" },
          { key: "grcPortfolioTitle", label: "Portfolio heading", kind: "text" },
          { key: "grcPortfolioIntro", label: "Portfolio intro", kind: "html" },
          { key: "grcPortfolioItems", label: "Portfolio list", kind: "lines" },
          { key: "grcPortfolioProIntro", label: "Pro portfolio intro", kind: "html" },
          { key: "grcPortfolioProItems", label: "Pro portfolio list", kind: "lines" },
          { key: "grcPortfolioClosing", label: "Portfolio closing", kind: "html" },
          { key: "grcAudienceTitle", label: "Audience heading", kind: "text" },
          { key: "grcAudienceIntro", label: "Audience intro", kind: "html" },
          { key: "grcAudienceItems", label: "Audience list", kind: "lines" },
          { key: "grcAudienceNote", label: "Audience note", kind: "text" },
          { key: "grcStructureTitle", label: "Structure heading", kind: "text" },
          { key: "grcTier1Name", label: "Tier 1 name", kind: "text" },
          { key: "grcTier1Meta", label: "Tier 1 meta", kind: "text" },
          { key: "grcTier1Body", label: "Tier 1 body", kind: "html" },
          { key: "grcTier1PriceFounding", label: "Tier 1 founding price", kind: "text" },
          { key: "grcTier1PriceStandard", label: "Tier 1 standard price", kind: "text" },
          { key: "grcTier2Name", label: "Tier 2 name", kind: "text" },
          { key: "grcTier2Meta", label: "Tier 2 meta", kind: "text" },
          { key: "grcTier2Body", label: "Tier 2 body", kind: "html" },
          { key: "grcTier2PriceFounding", label: "Tier 2 founding price", kind: "text" },
          { key: "grcTier2PriceStandard", label: "Tier 2 standard price", kind: "text" },
          { key: "grcTier3Name", label: "Tier 3 name", kind: "text" },
          { key: "grcTier3Meta", label: "Tier 3 meta", kind: "text" },
          { key: "grcTier3Body", label: "Tier 3 body", kind: "html" },
          { key: "grcTier3PriceFounding", label: "Tier 3 founding price", kind: "text" },
          { key: "grcTier3PriceStandard", label: "Tier 3 standard price", kind: "text" },
          { key: "grcPricingNote", label: "Pricing note", kind: "html" },
          { key: "grcDeliveryTitle", label: "Delivery heading", kind: "text" },
          { key: "grcDeliveryItems", label: "Delivery list", kind: "lines" },
          { key: "grcFaqTitle", label: "FAQ heading", kind: "text" },
          { key: "grcFaq1Q", label: "FAQ 1 question", kind: "text" },
          { key: "grcFaq1A", label: "FAQ 1 answer", kind: "html" },
          { key: "grcFaq2Q", label: "FAQ 2 question", kind: "text" },
          { key: "grcFaq2A", label: "FAQ 2 answer", kind: "html" },
          { key: "grcFaq3Q", label: "FAQ 3 question", kind: "text" },
          { key: "grcFaq3A", label: "FAQ 3 answer", kind: "html" },
          { key: "grcFaq4Q", label: "FAQ 4 question", kind: "text" },
          { key: "grcFaq4A", label: "FAQ 4 answer", kind: "html" },
          { key: "grcFaq5Q", label: "FAQ 5 question", kind: "text" },
          { key: "grcFaq5A", label: "FAQ 5 answer", kind: "html" },
          { key: "grcFaq6Q", label: "FAQ 6 question", kind: "text" },
          { key: "grcFaq6A", label: "FAQ 6 answer", kind: "html" },
        ]}
      >
        <div className="wrap">
          <div className="train-block reveal">
            <EditableText
              field="grcTag"
              defaultValue={d.grcTag}
              as="p"
              className="eyebrow"
            />
            <EditableText
              field="grcTitle"
              defaultValue={d.grcTitle}
              as="h2"
              multiline
              rich
            />
            <div className="train-block-body">
              <EditableText field="grcP1" defaultValue={d.grcP1} as="p" multiline rich />
              <EditableText field="grcP2" defaultValue={d.grcP2} as="p" multiline rich />

              <EditableText
                field="grcWhyTitle"
                defaultValue={d.grcWhyTitle}
                as="h3"
                className="content-subhead"
              />
              <EditableText
                field="grcWhyBody"
                defaultValue={d.grcWhyBody}
                as="p"
                multiline
                rich
              />

              <EditableText
                field="grcLearnTitle"
                defaultValue={d.grcLearnTitle}
                as="h3"
                className="content-subhead"
              />
              <EditableText
                field="grcLearnIntro"
                defaultValue={d.grcLearnIntro}
                as="p"
                multiline
                rich
              />
              <ModuleList />

              <EditableText
                field="grcPortfolioTitle"
                defaultValue={d.grcPortfolioTitle}
                as="h3"
                className="content-subhead"
              />
              <EditableText
                field="grcPortfolioIntro"
                defaultValue={d.grcPortfolioIntro}
                as="p"
                multiline
                rich
              />
              <EditableBulletList
                field="grcPortfolioItems"
                defaultValue={d.grcPortfolioItems}
                splitLabels={false}
              />
              <EditableText
                field="grcPortfolioProIntro"
                defaultValue={d.grcPortfolioProIntro}
                as="p"
                className="content-list-intro"
                multiline
                rich
              />
              <EditableBulletList
                field="grcPortfolioProItems"
                defaultValue={d.grcPortfolioProItems}
                splitLabels={false}
              />
              <EditableText
                field="grcPortfolioClosing"
                defaultValue={d.grcPortfolioClosing}
                as="p"
                multiline
                rich
              />

              <EditableText
                field="grcAudienceTitle"
                defaultValue={d.grcAudienceTitle}
                as="h3"
                className="content-subhead"
              />
              <EditableText
                field="grcAudienceIntro"
                defaultValue={d.grcAudienceIntro}
                as="p"
                multiline
                rich
              />
              <EditableBulletList
                field="grcAudienceItems"
                defaultValue={d.grcAudienceItems}
                splitLabels={false}
              />
              <EditableText
                field="grcAudienceNote"
                defaultValue={d.grcAudienceNote}
                as="p"
                className="train-note"
              />

              <EditableText
                field="grcStructureTitle"
                defaultValue={d.grcStructureTitle}
                as="h3"
                className="content-subhead"
              />
              <div className="train-tier-grid">
                {TIER_FIELDS.map((tier) => (
                  <article
                    key={tier.name}
                    className={`train-tier${tier.featured ? " train-tier--featured" : ""}`}
                  >
                    <EditableText
                      field={tier.name}
                      defaultValue={d[tier.name]}
                      as="h4"
                    />
                    <EditableText
                      field={tier.meta}
                      defaultValue={d[tier.meta]}
                      as="p"
                      className="train-tier-meta"
                    />
                    <EditableText
                      field={tier.body}
                      defaultValue={d[tier.body]}
                      as="p"
                      className="train-tier-body"
                      multiline
                      rich
                    />
                    <div className="train-tier-pricing">
                      <div>
                        <span className="train-price-label">Founding cohort</span>
                        <EditableText
                          field={tier.founding}
                          defaultValue={d[tier.founding]}
                          as="strong"
                          className="train-price"
                        />
                      </div>
                      <div>
                        <span className="train-price-label">Standard</span>
                        <EditableText
                          field={tier.standard}
                          defaultValue={d[tier.standard]}
                          as="span"
                          className="train-price train-price--muted"
                        />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              <EditableText
                field="grcPricingNote"
                defaultValue={d.grcPricingNote}
                as="p"
                className="train-note"
                multiline
                rich
              />

              <EditableText
                field="grcDeliveryTitle"
                defaultValue={d.grcDeliveryTitle}
                as="h3"
                className="content-subhead"
              />
              <EditableBulletList
                field="grcDeliveryItems"
                defaultValue={d.grcDeliveryItems}
                splitLabels={false}
              />

              <EditableText
                field="grcFaqTitle"
                defaultValue={d.grcFaqTitle}
                as="h3"
                className="content-subhead"
              />
              <AccordionList
                items={FAQ_FIELDS.map(([qField, aField]) => ({
                  qField,
                  aField,
                  question: d[qField],
                  answer: d[aField],
                }))}
              />
            </div>
          </div>
        </div>
      </EditableSection>

      <EditableSection
        title="GRC CTA"
        className="train-cta-band section-ink"
        fields={[
          { key: "grcCtaTitle", label: "Title", kind: "text" },
          { key: "grcCtaBody", label: "Body", kind: "html" },
          { key: "grcCtaButton", label: "Button", kind: "text" },
        ]}
      >
        <div className="wrap">
          <div className="train-cta-inner reveal">
            <EditableText
              field="grcCtaTitle"
              defaultValue={d.grcCtaTitle}
              as="h2"
            />
            <EditableText
              field="grcCtaBody"
              defaultValue={d.grcCtaBody}
              as="p"
              multiline
              rich
            />
            <Link className="btn btn-on-ink" href="/contact">
              <EditableText
                field="grcCtaButton"
                defaultValue={d.grcCtaButton}
                as="span"
              />{" "}
              <Arrow />
            </Link>
          </div>
        </div>
      </EditableSection>

      <EditableCtaBand
        titleField="ctaTitle"
        descriptionField="ctaDescription"
        defaultTitle={d.ctaTitle}
        defaultDescription={d.ctaDescription}
      />
    </div>
  );
}
