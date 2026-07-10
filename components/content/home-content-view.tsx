"use client";

import Link from "next/link";
import { Faq, homeFaqItems } from "@/components/Faq";
import { Arrow } from "@/components/ui";
import { HomeHero } from "@/components/hero-section";
import { EditableCtaBand } from "@/components/editable-cta-band";
import { EditableText } from "@/components/live-edit/editable-text";
import { defaultHomeContent } from "@/lib/home-content-schema";

const SERVICE_LINKS = [
  { href: "/services#advisory", icon: "01" },
  { href: "/services#shadow", icon: "02" },
  { href: "/education", icon: "03" },
] as const;

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

      <section className="home-intro">
        <div className="wrap">
          <div className="home-intro-grid reveal">
            <div className="home-intro-aside">
              <EditableText
                field="introEyebrow"
                defaultValue={d.introEyebrow}
                as="p"
                className="eyebrow"
              />
              <div className="home-intro-rule" aria-hidden />
            </div>
            <div className="home-intro-body">
              <EditableText
                field="introP1"
                defaultValue={d.introP1}
                as="p"
                className="home-intro-lead"
                multiline
              />
              <EditableText
                field="introP2"
                defaultValue={d.introP2}
                as="p"
                multiline
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
      </section>

      <section className="home-services section-paper-2">
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
          <div className="home-bento">
            {(
              [
                ["card1Title", "card1Body"],
                ["card2Title", "card2Body"],
                ["card3Title", "card3Body"],
              ] as const
            ).map(([title, body], i) => (
              <article
                key={title}
                className={`home-bento-card reveal${i === 0 ? " home-bento-card--featured" : ""}`}
                data-delay={i || undefined}
              >
                <div className="home-bento-top">
                  <span className="home-bento-num">{SERVICE_LINKS[i].icon}</span>
                  <span className="home-bento-icon" aria-hidden>
                    {i === 0 ? "◎" : i === 1 ? "◈" : "◇"}
                  </span>
                </div>
                <EditableText field={title} defaultValue={d[title]} as="h3" />
                <EditableText
                  field={body}
                  defaultValue={d[body]}
                  as="p"
                  multiline
                />
                <Link
                  className="text-link home-bento-link"
                  href={SERVICE_LINKS[i].href}
                >
                  Learn more <Arrow />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-flow section-ink">
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
      </section>

      <section className="home-stats">
        <div className="wrap">
          <div className="home-section-head reveal">
            <EditableText
              field="statsEyebrow"
              defaultValue={d.statsEyebrow}
              as="p"
              className="eyebrow"
            />
            <EditableText field="statsTitle" defaultValue={d.statsTitle} as="h2" />
          </div>
          <div className="home-stat-grid">
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
              >
                <EditableText
                  field={fig}
                  defaultValue={d[fig]}
                  as="span"
                  className="home-stat-figure"
                />
                <EditableText
                  field={desc}
                  defaultValue={d[desc]}
                  as="p"
                  className="home-stat-desc"
                  multiline
                />
                <EditableText
                  field={src}
                  defaultValue={d[src]}
                  as="span"
                  className="home-stat-src"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-problems section-paper-2">
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
                  <span className="home-problem-badge" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
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
      </section>

      <section className="home-quote section-ink">
        <div className="wrap">
          <div className="home-quote-inner reveal">
            <span className="home-quote-mark" aria-hidden>&ldquo;</span>
            <blockquote>
              <EditableText
                field="quoteText"
                defaultValue={d.quoteText}
                as="span"
                multiline
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
      </section>

      <section className="home-faq">
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
      </section>

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
