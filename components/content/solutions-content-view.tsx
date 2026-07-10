"use client";

import Link from "next/link";
import { Arrow } from "@/components/ui";
import { EditableText } from "@/components/live-edit/editable-text";
import { defaultPageContent } from "@/lib/page-content-schema";

const d = defaultPageContent.solutions;

export function SolutionsContentView() {
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

      <section>
        <div className="wrap">
          <div className="asat-hero reveal">
            <EditableText
              field="asatTag"
              defaultValue={d.asatTag}
              as="p"
              className="asat-tag"
            />
            <EditableText
              field="asatHeadline"
              defaultValue={d.asatHeadline}
              as="h2"
            />
            <EditableText
              field="asatIntro"
              defaultValue={d.asatIntro}
              as="p"
              multiline
            />
          </div>
          <div
            className="prose reveal"
            style={{ marginTop: "clamp(2.5rem,5vw,3.5rem)" }}
          >
            <EditableText field="bodyP1" defaultValue={d.bodyP1} as="p" multiline />
            <EditableText field="bodyP2" defaultValue={d.bodyP2} as="p" multiline />
          </div>
          <div
            className="card-grid"
            style={{ marginTop: "clamp(2.5rem,5vw,3.5rem)" }}
          >
            {(
              [
                ["card1Title", "card1Body"],
                ["card2Title", "card2Body"],
                ["card3Title", "card3Body"],
              ] as const
            ).map(([title, body], i) => (
              <article key={title} className="card reveal" data-delay={i || undefined}>
                <span className="num">&#9670;</span>
                <EditableText field={title} defaultValue={d[title]} as="h3" />
                <EditableText field={body} defaultValue={d[body]} as="p" multiline />
              </article>
            ))}
          </div>
          <div
            style={{
              textAlign: "center",
              marginTop: "clamp(2.5rem,5vw,3.5rem)",
            }}
            className="reveal"
          >
            <Link className="btn" href="/contact">
              <EditableText
                field="ctaButton"
                defaultValue={d.ctaButton}
                as="span"
              />{" "}
              <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
