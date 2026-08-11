"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Arrow } from "./ui";

export function ContactForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);

    try {
      const form = event.currentTarget;
      const response = await fetch("/api/contact", {
        method: "POST",
        body: new FormData(form),
      });

      const data = (await response.json().catch(() => null)) as
        | { error?: string }
        | null;

      if (!response.ok) {
        setError(data?.error || "Unable to send your message. Please try again.");
        return;
      }

      router.push("/thank-you");
    } catch {
      setError("Unable to send your message. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="form-card reveal" data-delay="1">
      <form name="contact" method="POST" action="/api/contact" onSubmit={onSubmit}>
        <p className="visually-hidden" aria-hidden="true">
          <label>
            Do not fill this in if you are human:{" "}
            <input name="bot-field" tabIndex={-1} autoComplete="off" />
          </label>
        </p>
        <div className="field-row">
          <div className="field">
            <label htmlFor="name">Your name</label>
            <input type="text" id="name" name="name" required disabled={pending} />
          </div>
          <div className="field">
            <label htmlFor="organisation">Your organisation</label>
            <input
              type="text"
              id="organisation"
              name="organisation"
              disabled={pending}
            />
          </div>
        </div>
        <div className="field-row">
          <div className="field">
            <label htmlFor="sector">Sector</label>
            <select id="sector" name="sector" defaultValue="" disabled={pending}>
              <option value="" disabled>
                Select a sector
              </option>
              <option>Business</option>
              <option>University</option>
              <option>Public sector</option>
              <option>Financial services</option>
              <option>Healthcare</option>
              <option>Professional services</option>
              <option>SME</option>
              <option>Other</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="email">Your email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              disabled={pending}
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="interest">What you are interested in</label>
          <select
            id="interest"
            name="interest"
            defaultValue=""
            disabled={pending}
          >
            <option value="" disabled>
              Select an option
            </option>
            <option>AI Governance Advisory</option>
            <option>AI Solutions & Automation Services</option>
            <option>GARIL AI</option>
            <option>ASAT</option>
            <option>AI Literacy Workshops</option>
            <option>AI GRC Practitioner Programme</option>
            <option>Other</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="situation">A few lines about your situation</label>
          <textarea
            id="situation"
            name="situation"
            required
            disabled={pending}
          />
        </div>
        {error ? (
          <p className="form-note" role="alert" style={{ color: "var(--danger, #b42318)" }}>
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          className="btn"
          style={{ width: "100%", justifyContent: "center" }}
          disabled={pending}
        >
          {pending ? "Sending…" : "Send message"} {!pending ? <Arrow /> : null}
        </button>
        <p className="form-note">
          Submissions reach a person by email. We respond within two working
          days.
        </p>
      </form>
    </div>
  );
}
