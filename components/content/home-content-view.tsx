"use client";

import Link from "next/link";
import { Faq, homeFaqItems } from "@/components/Faq";
import { Arrow } from "@/components/ui";
import { HomeHero } from "@/components/hero-section";
import { EditableCtaBand } from "@/components/editable-cta-band";
import { EditableText } from "@/components/live-edit/editable-text";
import { defaultHomeContent } from "@/lib/home-content-schema";

export function HomeContentView() {
  const d = defaultHomeContent;

  return (
    <>
      <HomeHero
        defaultTagline={d.heroTagline}
        defaultHeadline={d.heroHeadline}
        defaultLede={d.heroLede}
        defaultPrimaryCta={d.heroPrimaryCta}
        defaultSecondaryCta={d.heroSecondaryCta}
        defaultBackgroundUrl={d.heroBackgroundUrl}
      />

      <section>
        <div className="wrap">
          <div className="prose reveal">
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
              className="closing"
            />
          </div>
        </div>
      </section>

      <section className="section-paper-2">
        <div className="wrap">
          <div className="section-head reveal">
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
          <div className="card-grid">
            <article className="card reveal">
              <span className="num">01</span>
              <EditableText field="card1Title" defaultValue={d.card1Title} as="h3" />
              <EditableText
                field="card1Body"
                defaultValue={d.card1Body}
                as="p"
                multiline
              />
              <Link className="text-link card-link" href="/services#advisory">
                Learn more <Arrow />
              </Link>
            </article>
            <article className="card reveal" data-delay="1">
              <span className="num">02</span>
              <EditableText field="card2Title" defaultValue={d.card2Title} as="h3" />
              <EditableText
                field="card2Body"
                defaultValue={d.card2Body}
                as="p"
                multiline
              />
              <Link className="text-link card-link" href="/services#shadow">
                Learn more <Arrow />
              </Link>
            </article>
            <article className="card reveal" data-delay="2">
              <span className="num">03</span>
              <EditableText field="card3Title" defaultValue={d.card3Title} as="h3" />
              <EditableText
                field="card3Body"
                defaultValue={d.card3Body}
                as="p"
                multiline
              />
              <Link className="text-link card-link" href="/education">
                Learn more <Arrow />
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="section-ink">
        <div className="wrap">
          <div className="section-head reveal">
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
          <div className="flow reveal">
            <div className="flow-col">
              <EditableText
                field="flowInputsTitle"
                defaultValue={d.flowInputsTitle}
                as="h4"
              />
              {(["flowInput1", "flowInput2", "flowInput3", "flowInput4"] as const).map(
                (field) => (
                  <EditableText
                    key={field}
                    field={field}
                    defaultValue={d[field]}
                    as="div"
                    className="flow-node"
                  />
                ),
              )}
            </div>
            <div className="flow-arrow" aria-hidden="true">
              &rarr;
            </div>
            <div className="flow-col">
              <div className="flow-core">
                <EditableText
                  field="flowCoreTitle"
                  defaultValue={d.flowCoreTitle}
                  as="span"
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
            <div className="flow-arrow" aria-hidden="true">
              &rarr;
            </div>
            <div className="flow-col">
              <EditableText
                field="flowOutputsTitle"
                defaultValue={d.flowOutputsTitle}
                as="h4"
              />
              {(
                ["flowOutput1", "flowOutput2", "flowOutput3", "flowOutput4"] as const
              ).map((field) => (
                <EditableText
                  key={field}
                  field={field}
                  defaultValue={d[field]}
                  as="div"
                  className="flow-node"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="section-head reveal">
            <EditableText
              field="statsEyebrow"
              defaultValue={d.statsEyebrow}
              as="p"
              className="eyebrow"
            />
            <EditableText field="statsTitle" defaultValue={d.statsTitle} as="h2" />
          </div>
          <div className="stat-row">
            {(
              [
                ["stat1Figure", "stat1Desc", "stat1Src"],
                ["stat2Figure", "stat2Desc", "stat2Src"],
                ["stat3Figure", "stat3Desc", "stat3Src"],
              ] as const
            ).map(([fig, desc, src], i) => (
              <div key={fig} className={`stat reveal${i ? ` reveal` : ""}`} data-delay={i || undefined}>
                <EditableText field={fig} defaultValue={d[fig]} as="span" className="figure" />
                <EditableText field={desc} defaultValue={d[desc]} as="p" className="desc" multiline />
                <EditableText field={src} defaultValue={d[src]} as="span" className="src" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-paper-2">
        <div className="wrap">
          <div className="section-head reveal">
            <EditableText
              field="problemEyebrow"
              defaultValue={d.problemEyebrow}
              as="p"
              className="eyebrow"
            />
            <EditableText field="problemTitle" defaultValue={d.problemTitle} as="h2" />
          </div>
          <div className="problem-grid">
            {(
              [
                ["problem1Title", "problem1Li1", "problem1Li2", "problem1Li3"],
                ["problem2Title", "problem2Li1", "problem2Li2", "problem2Li3"],
                ["problem3Title", "problem3Li1", "problem3Li2", "problem3Li3"],
              ] as const
            ).map(([title, ...items], i) => (
              <div key={title} className={`problem-col reveal${i ? ` reveal` : ""}`} data-delay={i || undefined}>
                <h3>
                  <span className="ic">!</span>{" "}
                  <EditableText field={title} defaultValue={d[title]} as="span" />
                </h3>
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

      <section className="section-ink">
        <div className="wrap pullquote reveal">
          <blockquote>
            <EditableText field="quoteText" defaultValue={d.quoteText} as="span" multiline />
          </blockquote>
          <EditableText field="quoteSrc" defaultValue={d.quoteSrc} as="p" className="src" />
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="section-head center">
            <EditableText
              field="faqEyebrow"
              defaultValue={d.faqEyebrow}
              as="p"
              className="eyebrow"
            />
            <EditableText field="faqTitle" defaultValue={d.faqTitle} as="h2" />
          </div>
          <Faq items={homeFaqItems} />
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
    </>
  );
}
