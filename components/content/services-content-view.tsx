"use client";

import Link from "next/link";
import { EditableBulletList } from "@/components/editable-bullet-list";
import { EditableCtaBand } from "@/components/editable-cta-band";
import { EditableSection } from "@/components/live-edit/editable-section";
import { EditableText } from "@/components/live-edit/editable-text";
import { HeroBackdrop } from "@/components/site-image";
import { Arrow } from "@/components/ui";
import { defaultPageContent } from "@/lib/page-content-schema";

const d = defaultPageContent.services;

export function ServicesContentView() {
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
        title="AI Governance Advisory"
        className="service-block adv-section"
        id="advisory"
        fields={[
          { key: "advLabel", label: "Label", kind: "text" },
          { key: "advTitle", label: "Title", kind: "html" },
          { key: "advP1", label: "Paragraph 1", kind: "html" },
          { key: "advP2", label: "Paragraph 2", kind: "html" },
          { key: "advP3", label: "Paragraph 3", kind: "html" },
          { key: "advFrameworksIntro", label: "Frameworks intro", kind: "html" },
          { key: "advFrameworksItems", label: "Frameworks list", kind: "lines" },
          { key: "advServicesIntro", label: "Services heading", kind: "text" },
          { key: "advServicesItems", label: "Services list", kind: "lines" },
          { key: "advReceiveIntro", label: "Receive heading", kind: "text" },
          { key: "advReceiveItems", label: "Receive list", kind: "lines" },
        ]}
      >
        <div className="wrap">
          <div className="adv-layout reveal">
            <div className="adv-copy">
              <EditableText
                field="advLabel"
                defaultValue={d.advLabel}
                as="p"
                className="eyebrow"
              />
              <EditableText
                field="advTitle"
                defaultValue={d.advTitle}
                as="h2"
                multiline
                rich
              />
              <div className="adv-copy-body">
                <EditableText field="advP1" defaultValue={d.advP1} as="p" multiline rich />
                <EditableText field="advP2" defaultValue={d.advP2} as="p" multiline rich />
                <EditableText field="advP3" defaultValue={d.advP3} as="p" multiline rich />
                <EditableText
                  field="advFrameworksIntro"
                  defaultValue={d.advFrameworksIntro}
                  as="p"
                  className="content-list-intro"
                  multiline
                  rich
                />
                <EditableBulletList
                  field="advFrameworksItems"
                  defaultValue={d.advFrameworksItems}
                />
                <Link className="text-link" href="/contact">
                  Talk to us about your AI governance needs <Arrow />
                </Link>
              </div>
            </div>
            <div className="adv-details">
              <div className="adv-block">
                <EditableText
                  field="advServicesIntro"
                  defaultValue={d.advServicesIntro}
                  as="h3"
                  className="content-subhead"
                />
                <EditableBulletList
                  field="advServicesItems"
                  defaultValue={d.advServicesItems}
                  splitLabels={false}
                />
              </div>
              <div className="adv-block">
                <EditableText
                  field="advReceiveIntro"
                  defaultValue={d.advReceiveIntro}
                  as="h3"
                  className="content-subhead"
                />
                <EditableBulletList
                  field="advReceiveItems"
                  defaultValue={d.advReceiveItems}
                  splitLabels={false}
                />
              </div>
            </div>
          </div>
        </div>
      </EditableSection>

      <EditableSection
        title="AI Solutions & Automation"
        className="service-block auto-section section-paper-2"
        id="automation"
        fields={[
          { key: "autoLabel", label: "Label", kind: "text" },
          { key: "autoTitle", label: "Title", kind: "html" },
          { key: "autoP1", label: "Paragraph 1", kind: "html" },
          { key: "autoP2", label: "Paragraph 2", kind: "html" },
          { key: "autoP3", label: "Paragraph 3", kind: "html" },
          { key: "autoServicesIntro", label: "Services heading", kind: "text" },
          { key: "autoServicesItems", label: "Services list", kind: "lines" },
          { key: "autoReceiveIntro", label: "Receive heading", kind: "text" },
          { key: "autoReceiveItems", label: "Receive list", kind: "lines" },
        ]}
      >
        <div className="wrap">
          <div className="auto-layout reveal">
            <div className="auto-copy">
              <EditableText
                field="autoLabel"
                defaultValue={d.autoLabel}
                as="p"
                className="eyebrow"
              />
              <EditableText
                field="autoTitle"
                defaultValue={d.autoTitle}
                as="h2"
                multiline
                rich
              />
              <div className="auto-copy-body">
                <EditableText field="autoP1" defaultValue={d.autoP1} as="p" multiline rich />
                <EditableText field="autoP2" defaultValue={d.autoP2} as="p" multiline rich />
                <EditableText field="autoP3" defaultValue={d.autoP3} as="p" multiline rich />
                <Link className="text-link" href="/contact">
                  Let&apos;s build your next AI solution <Arrow />
                </Link>
              </div>
            </div>
            <div className="auto-details">
              <div className="auto-block">
                <EditableText
                  field="autoServicesIntro"
                  defaultValue={d.autoServicesIntro}
                  as="h3"
                  className="content-subhead"
                />
                <EditableBulletList
                  field="autoServicesItems"
                  defaultValue={d.autoServicesItems}
                  splitLabels={false}
                />
              </div>
              <div className="auto-block">
                <EditableText
                  field="autoReceiveIntro"
                  defaultValue={d.autoReceiveIntro}
                  as="h3"
                  className="content-subhead"
                />
                <EditableBulletList
                  field="autoReceiveItems"
                  defaultValue={d.autoReceiveItems}
                  splitLabels={false}
                />
              </div>
            </div>
          </div>
        </div>
      </EditableSection>

      <EditableCtaBand
        titleField="ctaTitle"
        descriptionField="ctaDescription"
        defaultTitle={d.ctaTitle}
        defaultDescription={d.ctaDescription}
      />
    </>
  );
}
