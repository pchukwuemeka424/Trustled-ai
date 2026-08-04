"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Arrow } from "@/components/ui";
import { EditableHeroBackground } from "@/components/live-edit/editable-hero-background";
import { EditableSection } from "@/components/live-edit/editable-section";
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
    <EditableSection
      title="Hero"
      className={`hero hero--home${hasBackground ? " hero--has-bg" : ""}`}
      fields={[
        { key: "heroTagline", label: "Tagline", kind: "text" },
        { key: "heroHeadline", label: "Headline", kind: "text" },
        { key: "heroLede", label: "Supporting text", kind: "html" },
        { key: "heroPrimaryCta", label: "Primary button", kind: "text" },
        { key: "heroSecondaryCta", label: "Secondary button", kind: "text" },
      ]}
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
            label="Tagline"
          />
          <EditableText
            field="heroHeadline"
            defaultValue={defaultHeadline}
            as="h1"
            className="reveal"
            label="Headline"
          />
          <EditableText
            field="heroLede"
            defaultValue={defaultLede}
            as="p"
            className="lede reveal"
            multiline
            rich
            label="Supporting text"
          />
          <div className="hero-actions reveal" data-delay="2">
            <Link className="btn btn-on-ink" href="/contact">
              <EditableText
                field="heroPrimaryCta"
                defaultValue={defaultPrimaryCta}
                as="span"
                label="Primary button"
              />{" "}
              <Arrow />
            </Link>
            <Link className="btn btn-ghost hero-btn-ghost" href="/services">
              <EditableText
                field="heroSecondaryCta"
                defaultValue={defaultSecondaryCta}
                as="span"
                label="Secondary button"
              />
            </Link>
          </div>
        </div>
      </div>
    </EditableSection>
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
    <EditableSection
      title="Hero"
      className="hero hero--page"
      fields={[
        { key: "heroTagline", label: "Tagline", kind: "text" },
        { key: "heroTitle", label: "Title", kind: "text" },
        { key: "heroLede", label: "Supporting text", kind: "html" },
      ]}
    >
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
          rich
        />
        {children}
      </div>
    </EditableSection>
  );
}
