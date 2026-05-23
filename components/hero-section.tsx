"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Arrow } from "@/components/ui";
import { EditableHeroBackground } from "@/components/live-edit/editable-hero-background";
import { EditableText } from "@/components/live-edit/editable-text";
import { useLiveEdit } from "@/components/live-edit/live-edit-context";

type HomeHeroProps = {
  defaultTagline: string;
  defaultHeadline: string;
  defaultLede: string;
  defaultPrimaryCta: string;
  defaultSecondaryCta: string;
  defaultBackgroundUrl?: string;
};

export function HomeHero({
  defaultTagline,
  defaultHeadline,
  defaultLede,
  defaultPrimaryCta,
  defaultSecondaryCta,
  defaultBackgroundUrl = "",
}: HomeHeroProps) {
  const { values } = useLiveEdit();
  const backgroundUrl = values.heroBackgroundUrl || defaultBackgroundUrl;
  const hasBackground = Boolean(backgroundUrl);

  return (
    <section
      className={`hero hero--home${hasBackground ? " hero--has-bg" : ""}`}
    >
      <div className="hero-background" aria-hidden>
        {hasBackground ? (
          <div
            className="hero-bg-image"
            style={{ backgroundImage: `url("${backgroundUrl}")` }}
          />
        ) : null}
        <div className="hero-overlay" />
      </div>

      <EditableHeroBackground
        field="heroBackgroundUrl"
        defaultValue={defaultBackgroundUrl}
      />

      <div className="wrap hero-inner">
        <div className="hero-content">
          <EditableText
            field="heroTagline"
            defaultValue={defaultTagline}
            as="p"
            className="hero-tagline reveal"
          />
          <EditableText
            field="heroHeadline"
            defaultValue={defaultHeadline}
            as="h1"
            className="reveal"
          />
          <EditableText
            field="heroLede"
            defaultValue={defaultLede}
            as="p"
            className="lede reveal"
            multiline
          />
          <div className="hero-actions reveal" data-delay="3">
            <Link className="btn btn-on-ink" href="/contact">
              <EditableText
                field="heroPrimaryCta"
                defaultValue={defaultPrimaryCta}
                as="span"
              />{" "}
              <Arrow />
            </Link>
            <Link
              className="btn btn-ghost hero-btn-ghost"
              href="/services"
            >
              <EditableText
                field="heroSecondaryCta"
                defaultValue={defaultSecondaryCta}
                as="span"
              />
            </Link>
          </div>
        </div>

        <div className="hero-accent" aria-hidden>
          <span className="hero-accent-line" />
          <span className="hero-accent-label">Governance · Risk · Evidence</span>
        </div>
      </div>
    </section>
  );
}

type PageHeroProps = {
  defaultTagline: string;
  defaultTitle: string;
  defaultLede: string;
  children?: ReactNode;
};

export function PageHero({
  defaultTagline,
  defaultTitle,
  defaultLede,
  children,
}: PageHeroProps) {
  return (
    <section className="hero hero--page">
      <div className="hero-overlay" aria-hidden />
      <div className="wrap hero-inner">
        <EditableText
          field="heroTagline"
          defaultValue={defaultTagline}
          as="p"
          className="hero-tagline reveal"
        />
        <EditableText
          field="heroTitle"
          defaultValue={defaultTitle}
          as="h1"
          className="reveal"
        />
        <EditableText
          field="heroLede"
          defaultValue={defaultLede}
          as="p"
          className="lede reveal"
          multiline
        />
        {children}
      </div>
    </section>
  );
}
