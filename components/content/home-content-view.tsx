"use client";

import Link from "next/link";
import { Faq, homeFaqItems } from "@/components/Faq";
import { Arrow } from "@/components/ui";
import { HomeHero } from "@/components/hero-section";
import { EditableCtaBand } from "@/components/editable-cta-band";
import { EditableImage } from "@/components/live-edit/editable-image";
import { EditableSection } from "@/components/live-edit/editable-section";
import { EditableText } from "@/components/live-edit/editable-text";
import { useOptionalLiveEdit } from "@/components/live-edit/live-edit-context";
import { defaultHomeContent } from "@/lib/home-content-schema";

const OFFERINGS = [
  {
    href: "/services#advisory",
    title: "card1Title",
    intro: "card1Intro",
    listIntro: "card1ListIntro",
    items: "card1Items",
    closing: "card1Closing",
  },
  {
    href: "/services#automation",
    title: "card2Title",
    intro: "card2Intro",
    listIntro: "card2ListIntro",
    items: "card2Items",
    closing: "card2Closing",
  },
  {
    href: "/education",
    title: "card3Title",
    intro: "card3Intro",
    listIntro: "card3ListIntro",
    items: "card3Items",
    closing: "card3Closing",
  },
] as const;

function splitBulletLabel(item: string) {
  const separators = [" – ", " — ", " - "];
  for (const separator of separators) {
    const index = item.indexOf(separator);
    if (index > 0) {
      return {
        label: item.slice(0, index),
        detail: item.slice(index + separator.length),
      };
    }
  }
  return { label: item, detail: "" };
}

function WhatWeDoBullets({
  field,
  defaultValue,
}: {
  field: string;
  defaultValue: string;
}) {
  const liveEdit = useOptionalLiveEdit();
  const editable = Boolean(liveEdit?.isAdmin && liveEdit?.isEditing);
  const text = liveEdit?.values[field] ?? defaultValue;

  if (editable) {
    return (
      <EditableText
        field={field}
        defaultValue={defaultValue}
        as="div"
        multiline
        rich
        className="what-we-do-bullets-edit"
        placeholder="One bullet point per line"
      />
    );
  }

  const items = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  if (!items.length) return null;

  return (
    <ul className="what-we-do-bullets">
      {items.map((item) => {
        const { label, detail } = splitBulletLabel(item);
        return (
          <li key={item}>
            {detail ? (
              <>
                <strong>{label}</strong>
                <span>{detail}</span>
              </>
            ) : (
              <span>{label}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function HomeContentView() {
  const d = defaultHomeContent;

  return (
    <div className="home">
      <HomeHero
        defaultTagline={d.heroTagline}
        defaultHeadline={d.heroHeadline}
        defaultLede={d.heroLede}
        defaultPrimaryCta={d.heroPrimaryCta}
        defaultSecondaryCta={d.heroSecondaryCta}
        defaultBackgroundUrl={d.heroBackgroundUrl}
      />

      <EditableSection
        title="Intro"
        className="home-intro"
        fields={[
          { key: "introEyebrow", label: "Eyebrow", kind: "text" },
          { key: "introP1", label: "Paragraph 1", kind: "html" },
          { key: "introP2", label: "Paragraph 2", kind: "html" },
          { key: "introClosing", label: "Closing", kind: "text" },
        ]}
      >
        <div className="wrap">
          <div className="media-split home-intro-split reveal">
            <figure className="media-figure">
              <EditableImage
                srcField="introImageUrl"
                altField="introImageAlt"
                defaultSrc={d.introImageUrl}
                defaultAlt={d.introImageAlt}
                fill
                sizes="(max-width: 920px) 100vw, 45vw"
                uploadScope="home"
              />
            </figure>
            <div className="home-intro-body">
              <EditableText
                field="introEyebrow"
                defaultValue={d.introEyebrow}
                as="p"
                className="eyebrow"
              />
              <EditableText
                field="introP1"
                defaultValue={d.introP1}
                as="p"
                className="home-intro-lead"
                multiline
                rich
              />
              <EditableText
                field="introP2"
                defaultValue={d.introP2}
                as="p"
                multiline
                rich
              />
              <EditableText
                field="introClosing"
                defaultValue={d.introClosing}
                as="p"
                className="home-intro-closing"
              />
            </div>
          </div>
        </div>
      </EditableSection>

      <EditableSection
        title="What we do"
        className="what-we-do section-paper-2"
        fields={[
          { key: "whatWeDoEyebrow", label: "Eyebrow", kind: "text" },
          { key: "whatWeDoTitle", label: "Title", kind: "text" },
          { key: "card1Title", label: "Card 1 title", kind: "text" },
          { key: "card1Intro", label: "Card 1 intro", kind: "html" },
          { key: "card1ListIntro", label: "Card 1 list intro", kind: "html" },
          { key: "card1Items", label: "Card 1 bullets", kind: "lines" },
          { key: "card1Closing", label: "Card 1 closing", kind: "html" },
          { key: "card2Title", label: "Card 2 title", kind: "text" },
          { key: "card2Intro", label: "Card 2 intro", kind: "html" },
          { key: "card2ListIntro", label: "Card 2 list intro", kind: "html" },
          { key: "card2Items", label: "Card 2 bullets", kind: "lines" },
          { key: "card2Closing", label: "Card 2 closing", kind: "html" },
          { key: "card3Title", label: "Card 3 title", kind: "text" },
          { key: "card3Intro", label: "Card 3 intro", kind: "html" },
          { key: "card3ListIntro", label: "Card 3 list intro", kind: "html" },
          { key: "card3Items", label: "Card 3 bullets", kind: "lines" },
          { key: "card3Closing", label: "Card 3 closing", kind: "html" },
        ]}
      >
        <div className="wrap">
          <div className="home-section-head reveal">
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
            />
          </div>

          <div className="what-we-do-grid">
            {OFFERINGS.map((offering, index) => (
              <article
                key={offering.title}
                className="what-we-do-item reveal"
                data-delay={index || undefined}
              >
                <div className="what-we-do-content">
                  <EditableText
                    field={offering.title}
                    defaultValue={d[offering.title]}
                    as="h3"
                  />
                  <EditableText
                    field={offering.intro}
                    defaultValue={d[offering.intro]}
                    as="p"
                    className="what-we-do-intro"
                    multiline
                    rich
                  />
                  <EditableText
                    field={offering.listIntro}
                    defaultValue={d[offering.listIntro]}
                    as="p"
                    className="what-we-do-list-intro"
                    multiline
                    rich
                  />
                  <WhatWeDoBullets
                    field={offering.items}
                    defaultValue={d[offering.items]}
                  />
                  <EditableText
                    field={offering.closing}
                    defaultValue={d[offering.closing]}
                    as="p"
                    className="what-we-do-closing"
                    multiline
                    rich
                  />
                  <Link className="text-link what-we-do-link" href={offering.href}>
                    Learn more <Arrow />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </EditableSection>

      <EditableSection
        title="How it works"
        className="home-flow section-ink"
        fields={[
          { key: "flowEyebrow", label: "Eyebrow", kind: "text" },
          { key: "flowTitle", label: "Title", kind: "text" },
          { key: "flowLede", label: "Supporting text", kind: "html" },
          { key: "flowInputsTitle", label: "Inputs title", kind: "text" },
          { key: "flowInput1", label: "Input 1", kind: "text" },
          { key: "flowInput2", label: "Input 2", kind: "text" },
          { key: "flowInput3", label: "Input 3", kind: "text" },
          { key: "flowInput4", label: "Input 4", kind: "text" },
          { key: "flowCoreTitle", label: "Core title", kind: "text" },
          { key: "flowCoreSmall", label: "Core subtitle", kind: "text" },
          { key: "flowOutputsTitle", label: "Outputs title", kind: "text" },
          { key: "flowOutput1", label: "Output 1", kind: "text" },
          { key: "flowOutput2", label: "Output 2", kind: "text" },
          { key: "flowOutput3", label: "Output 3", kind: "text" },
          { key: "flowOutput4", label: "Output 4", kind: "text" },
        ]}
      >
        <div className="wrap">
          <div className="home-section-head reveal">
            <EditableText
              field="flowEyebrow"
              defaultValue={d.flowEyebrow}
              as="p"
              className="eyebrow"
            />
            <EditableText field="flowTitle" defaultValue={d.flowTitle} as="h2" />
            <EditableText
              field="flowLede"
              defaultValue={d.flowLede}
              as="p"
              className="lede"
              multiline
              rich
            />
          </div>
          <div className="home-pipeline reveal">
            <div className="home-pipeline-col">
              <EditableText
                field="flowInputsTitle"
                defaultValue={d.flowInputsTitle}
                as="h4"
              />
              <div className="home-pipeline-nodes">
                {(["flowInput1", "flowInput2", "flowInput3", "flowInput4"] as const).map(
                  (field) => (
                    <EditableText
                      key={field}
                      field={field}
                      defaultValue={d[field]}
                      as="div"
                      className="home-pipeline-node"
                    />
                  ),
                )}
              </div>
            </div>

            <div className="home-pipeline-bridge" aria-hidden>
              <span className="home-pipeline-line" />
              <span className="home-pipeline-arrow">→</span>
            </div>

            <div className="home-pipeline-core">
              <div className="home-pipeline-hub">
                <EditableText
                  field="flowCoreTitle"
                  defaultValue={d.flowCoreTitle}
                  as="span"
                  className="home-pipeline-hub-title"
                />
                <small>
                  <EditableText
                    field="flowCoreSmall"
                    defaultValue={d.flowCoreSmall}
                    as="span"
                  />
                </small>
              </div>
            </div>

            <div className="home-pipeline-bridge" aria-hidden>
              <span className="home-pipeline-line" />
              <span className="home-pipeline-arrow">→</span>
            </div>

            <div className="home-pipeline-col">
              <EditableText
                field="flowOutputsTitle"
                defaultValue={d.flowOutputsTitle}
                as="h4"
              />
              <div className="home-pipeline-nodes">
                {(
                  ["flowOutput1", "flowOutput2", "flowOutput3", "flowOutput4"] as const
                ).map((field) => (
                  <EditableText
                    key={field}
                    field={field}
                    defaultValue={d[field]}
                    as="div"
                    className="home-pipeline-node home-pipeline-node--out"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </EditableSection>

      <EditableSection
        title="Stats"
        className="home-stats"
        fields={[
          { key: "statsEyebrow", label: "Eyebrow", kind: "text" },
          { key: "statsTitle", label: "Title", kind: "text" },
          { key: "stat1Figure", label: "Stat 1 figure", kind: "text" },
          { key: "stat1Desc", label: "Stat 1 description", kind: "html" },
          { key: "stat1Src", label: "Stat 1 source", kind: "text" },
          { key: "stat2Figure", label: "Stat 2 figure", kind: "text" },
          { key: "stat2Desc", label: "Stat 2 description", kind: "html" },
          { key: "stat2Src", label: "Stat 2 source", kind: "text" },
          { key: "stat3Figure", label: "Stat 3 figure", kind: "text" },
          { key: "stat3Desc", label: "Stat 3 description", kind: "html" },
          { key: "stat3Src", label: "Stat 3 source", kind: "text" },
        ]}
      >
        <div className="wrap home-stats-inner">
          <div className="home-stats-content">
            <div className="home-stats-intro reveal">
              <EditableText
                field="statsEyebrow"
                defaultValue={d.statsEyebrow}
                as="p"
                className="eyebrow"
              />
              <EditableText field="statsTitle" defaultValue={d.statsTitle} as="h2" />
            </div>
            <div className="home-stat-grid" role="list">
              {(
                [
                  ["stat1Figure", "stat1Desc", "stat1Src"],
                  ["stat2Figure", "stat2Desc", "stat2Src"],
                  ["stat3Figure", "stat3Desc", "stat3Src"],
                ] as const
              ).map(([fig, desc, src], i) => (
                <div
                  key={fig}
                  className="home-stat-card reveal"
                  data-delay={i || undefined}
                  role="listitem"
                >
                  <EditableText
                    field={fig}
                    defaultValue={d[fig]}
                    as="span"
                    className="home-stat-figure"
                  />
                  <div className="home-stat-copy">
                    <EditableText
                      field={desc}
                      defaultValue={d[desc]}
                      as="p"
                      className="home-stat-desc"
                      multiline
                      rich
                    />
                    <EditableText
                      field={src}
                      defaultValue={d[src]}
                      as="span"
                      className="home-stat-src"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <figure className="home-stats-visual reveal">
            <EditableImage
              srcField="statsImageUrl"
              altField="statsImageAlt"
              defaultSrc={d.statsImageUrl}
              defaultAlt={d.statsImageAlt}
              fill
              sizes="(max-width: 920px) 100vw, 42vw"
              uploadScope="home"
            />
          </figure>
        </div>
      </EditableSection>

      <EditableSection
        title="Problems we solve"
        className="home-problems section-paper-2"
        fields={[
          { key: "problemEyebrow", label: "Eyebrow", kind: "text" },
          { key: "problemTitle", label: "Title", kind: "text" },
          { key: "problem1Title", label: "Problem 1 title", kind: "text" },
          { key: "problem1Li1", label: "Problem 1 item 1", kind: "text" },
          { key: "problem1Li2", label: "Problem 1 item 2", kind: "text" },
          { key: "problem1Li3", label: "Problem 1 item 3", kind: "text" },
          { key: "problem2Title", label: "Problem 2 title", kind: "text" },
          { key: "problem2Li1", label: "Problem 2 item 1", kind: "text" },
          { key: "problem2Li2", label: "Problem 2 item 2", kind: "text" },
          { key: "problem2Li3", label: "Problem 2 item 3", kind: "text" },
          { key: "problem3Title", label: "Problem 3 title", kind: "text" },
          { key: "problem3Li1", label: "Problem 3 item 1", kind: "text" },
          { key: "problem3Li2", label: "Problem 3 item 2", kind: "text" },
          { key: "problem3Li3", label: "Problem 3 item 3", kind: "text" },
        ]}
      >
        <div className="wrap">
          <div className="home-section-head reveal">
            <EditableText
              field="problemEyebrow"
              defaultValue={d.problemEyebrow}
              as="p"
              className="eyebrow"
            />
            <EditableText field="problemTitle" defaultValue={d.problemTitle} as="h2" />
          </div>
          <div className="home-problem-grid">
            {(
              [
                ["problem1Title", "problem1Li1", "problem1Li2", "problem1Li3"],
                ["problem2Title", "problem2Li1", "problem2Li2", "problem2Li3"],
                ["problem3Title", "problem3Li1", "problem3Li2", "problem3Li3"],
              ] as const
            ).map(([title, ...items], i) => (
              <div
                key={title}
                className="home-problem-card reveal"
                data-delay={i || undefined}
              >
                <div className="home-problem-header">
                  <h3>
                    <EditableText field={title} defaultValue={d[title]} as="span" />
                  </h3>
                </div>
                <ul>
                  {items.map((field) => (
                    <li key={field}>
                      <EditableText field={field} defaultValue={d[field]} as="span" />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </EditableSection>

      <EditableSection
        title="Quote"
        className="home-quote section-ink"
        fields={[
          { key: "quoteText", label: "Quote", kind: "html" },
          { key: "quoteSrc", label: "Source", kind: "text" },
        ]}
      >
        <div className="wrap">
          <div className="home-quote-inner reveal">
            <span className="home-quote-mark" aria-hidden>&ldquo;</span>
            <blockquote>
              <EditableText
                field="quoteText"
                defaultValue={d.quoteText}
                as="span"
                multiline
                rich
              />
            </blockquote>
            <EditableText
              field="quoteSrc"
              defaultValue={d.quoteSrc}
              as="p"
              className="home-quote-src"
            />
          </div>
        </div>
      </EditableSection>

      <EditableSection
        title="FAQ"
        className="home-faq"
        fields={[
          { key: "faqEyebrow", label: "Eyebrow", kind: "text" },
          { key: "faqTitle", label: "Title", kind: "text" },
        ]}
      >
        <div className="wrap">
          <div className="home-faq-layout">
            <div className="home-faq-head reveal">
              <EditableText
                field="faqEyebrow"
                defaultValue={d.faqEyebrow}
                as="p"
                className="eyebrow"
              />
              <EditableText field="faqTitle" defaultValue={d.faqTitle} as="h2" />
            </div>
            <div className="home-faq-list reveal" data-delay="1">
              <Faq items={homeFaqItems} />
            </div>
          </div>
        </div>
      </EditableSection>

      <EditableCtaBand
        titleField="ctaTitle"
        descriptionField="ctaDescription"
        defaultTitle={d.ctaTitle}
        defaultDescription={d.ctaDescription}
        buttonText="Start a conversation"
        buttonHref="/contact"
      />
    </div>
  );
}
