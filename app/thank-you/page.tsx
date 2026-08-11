import Link from "next/link";
import type { Metadata } from "next";
import { Arrow } from "@/components/ui";
import { HeroBackdrop } from "@/components/site-image";

export const metadata: Metadata = {
  title: "Thank you",
  description: "Your message has been received by TrustLed AI.",
  robots: {
    index: false,
    follow: false,
  },
};

const nextSteps = [
  {
    title: "We review your enquiry",
    body: "A member of the TrustLed AI team reads every submission personally.",
  },
  {
    title: "We respond within two working days",
    body: "You will hear from us by email, usually from hello@trustledai.com.",
  },
  {
    title: "We arrange a conversation if helpful",
    body: "Where appropriate, we will suggest a short call to understand whether we can assist.",
  },
];

export default function ThankYouPage() {
  return (
    <>
      <section
        className="hero hero--page hero--has-bg thank-you-hero"
        aria-labelledby="thank-you-heading"
      >
        <HeroBackdrop src="/images/hero-ai.jpg" />
        <div className="wrap hero-inner thank-you-hero-inner">
          <div className="thank-you-status reveal" aria-hidden="true">
            <svg viewBox="0 0 48 48" width="48" height="48" fill="none">
              <circle
                cx="24"
                cy="24"
                r="22"
                stroke="currentColor"
                strokeWidth="1.5"
                opacity="0.45"
              />
              <path
                d="M14.5 24.5 L21 31 L33.5 17.5"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className="hero-tagline reveal">Enquiry received</p>
          <h1 id="thank-you-heading" className="reveal" data-delay="1">
            Thank you for getting in touch.
          </h1>
          <p className="lede reveal" data-delay="2">
            Your message has been received by our team. We review every enquiry
            personally and aim to respond within two working days.
          </p>
          <div className="hero-actions reveal" data-delay="3">
            <Link className="btn btn-on-ink" href="/">
              Return home <Arrow />
            </Link>
            <Link className="btn hero-btn-ghost" href="/services">
              Explore our services
            </Link>
          </div>
        </div>
      </section>

      <section className="thank-you-next" aria-labelledby="thank-you-next-heading">
        <div className="wrap thank-you-next-inner">
          <div className="thank-you-next-intro reveal">
            <p className="eyebrow">Next steps</p>
            <h2 id="thank-you-next-heading">What to expect</h2>
            <p className="lede">
              No further action is required from you. For urgent matters, please
              email{" "}
              <a href="mailto:hello@trustledai.com">hello@trustledai.com</a>.
            </p>
          </div>
          <ol className="thank-you-steps">
            {nextSteps.map((step, index) => (
              <li
                key={step.title}
                className="thank-you-step reveal"
                data-delay={String(Math.min(index + 1, 3))}
              >
                <span className="thank-you-step-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
