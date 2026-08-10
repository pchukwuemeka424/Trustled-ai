import Link from "next/link";

export function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
        <path
          d="M16 2.5 L27.5 7.2 V16.2 C27.5 22.8 22.2 27.6 16 29.8 C9.8 27.6 4.5 22.8 4.5 16.2 V7.2 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M10.8 16.3 L14.4 19.9 L21.4 12.4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function BrandText() {
  return (
    <span className="brand-text">
      <span className="brand-name">TrustLed</span>
      <span className="brand-ai">AI</span>
    </span>
  );
}

export function Arrow() {
  return <span className="arrow">&rarr;</span>;
}

type CtaBandProps = {
  title: string;
  description: string;
  buttonText?: string;
  buttonHref?: string;
};

export function CtaBand({
  title,
  description,
  buttonText = "Talk to us about your situation",
  buttonHref = "/contact",
}: CtaBandProps) {
  return (
    <section className="cta-band">
      <div className="wrap">
        <h2>{title}</h2>
        <p>{description}</p>
        <Link className="btn btn-on-ink" href={buttonHref}>
          {buttonText} <Arrow />
        </Link>
      </div>
    </section>
  );
}
