import Link from "next/link";

export function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true">
        <path
          d="M16 2 L28 7 V16 C28 23 22.5 28 16 30.5 C9.5 28 4 23 4 16 V7 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M10.5 16.2 L14.3 20 L21.5 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
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
      TrustLed<span className="brand-ai">AI</span>
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
