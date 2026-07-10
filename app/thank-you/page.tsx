import Link from "next/link";
import type { Metadata } from "next";
import { Arrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Thank you",
  description: "Your message has been received by TrustLed AI.",
};

export default function ThankYouPage() {
  return (
    <section className="hero">
      <div className="wrap hero-inner" style={{ maxWidth: "720px" }}>
        <p className="hero-tagline reveal">Message received</p>
        <h1 className="reveal" data-delay="1">
          Thank you. Your message has reached a person.
        </h1>
        <p className="lede reveal" data-delay="2">
          There is no automated triage on our contact form. A member of the
          team will read what you have sent and respond within two working days.
        </p>
        <div className="hero-actions reveal" data-delay="3">
          <Link className="btn btn-on-ink" href="/">
            Back to home <Arrow />
          </Link>
          <Link
            className="btn btn-ghost"
            style={{ color: "#f6f3ec", borderColor: "rgba(255,255,255,.25)" }}
            href="/services"
          >
            Explore our services
          </Link>
        </div>
      </div>
    </section>
  );
}
