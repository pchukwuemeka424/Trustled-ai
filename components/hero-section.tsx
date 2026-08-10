"use client";

import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";
import { Arrow } from "@/components/ui";
import { EditableHeroBackground } from "@/components/live-edit/editable-hero-background";
import { EditableSection } from "@/components/live-edit/editable-section";
import { EditableText } from "@/components/live-edit/editable-text";
import { useLiveEdit } from "@/components/live-edit/live-edit-context";

const HERO_BG_VIDEO_SRC = "/videos/hero-bg.mp4";
const HERO_BG_POSTER_SRC = "/videos/hero-bg-poster.jpg";

type HomeHeroProps = {
  defaultTagline: string;
  defaultHeadline: string;
  defaultLede: string;
  defaultPrimaryCta: string;
  defaultSecondaryCta: string;
  defaultBackgroundUrl?: string;
};

function HeroBgVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPlayback = () => {
      if (mq.matches) {
        video.pause();
        video.currentTime = 0;
        return;
      }
      void video.play().catch(() => {
        /* Autoplay can be blocked; muted + playsInline covers most cases. */
      });
    };

    syncPlayback();
    mq.addEventListener("change", syncPlayback);
    return () => mq.removeEventListener("change", syncPlayback);
  }, []);

  return (
    <video
      ref={videoRef}
      className="hero-bg-video"
      src={HERO_BG_VIDEO_SRC}
      poster={HERO_BG_POSTER_SRC}
      muted
      loop
      playsInline
      autoPlay
      preload="metadata"
      aria-hidden
    />
  );
}

function PlayIcon() {
  return (
    <svg
      className="hero-play-icon"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      aria-hidden="true"
      fill="none"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 8.5v7l6-3.5-6-3.5z" fill="currentColor" />
    </svg>
  );
}

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
      className={`hero hero--home hero--has-video${hasBackground ? " hero--has-bg" : ""}`}
      fields={[
        { key: "heroTagline", label: "Tagline", kind: "text" },
        { key: "heroHeadline", label: "Headline", kind: "text" },
        { key: "heroLede", label: "Supporting text", kind: "html" },
        { key: "heroPrimaryCta", label: "Primary button", kind: "text" },
        { key: "heroSecondaryCta", label: "Secondary button", kind: "text" },
      ]}
    >
      <div className="hero-background" aria-hidden>
        <HeroBgVideo />
        <div
          className="hero-bg-poster"
          style={{ backgroundImage: `url("${HERO_BG_POSTER_SRC}")` }}
        />
        {hasBackground ? (
          <div
            className="hero-bg-image"
            style={{ backgroundImage: `url("${backgroundUrl}")` }}
          />
        ) : null}
      </div>

      <EditableHeroBackground
        field="heroBackgroundUrl"
        defaultValue={defaultBackgroundUrl}
      />

      <div className="wrap hero-inner">
        <div className="hero-layout">
          <div className="hero-content">
            <EditableText
              field="heroTagline"
              defaultValue={defaultTagline}
              as="p"
              className="hero-tagline"
              label="Tagline"
            />
            <EditableText
              field="heroHeadline"
              defaultValue={defaultHeadline}
              as="h1"
              className="hero-headline"
              label="Headline"
            />
            <EditableText
              field="heroLede"
              defaultValue={defaultLede}
              as="p"
              className="lede"
              multiline
              rich
              label="Supporting text"
            />
            <div className="hero-actions">
              <Link className="btn btn-on-ink" href="/contact">
                <EditableText
                  field="heroPrimaryCta"
                  defaultValue={defaultPrimaryCta}
                  as="span"
                  label="Primary button"
                />{" "}
                <Arrow />
              </Link>
              <Link className="hero-secondary-cta" href="/services">
                <PlayIcon />
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
