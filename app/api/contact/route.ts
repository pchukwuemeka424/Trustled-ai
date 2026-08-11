import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asString(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY?.trim();
    if (!apiKey) {
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 500 },
      );
    }

    const formData = await request.formData();

    // Honeypot — ignore spam silently
    if (asString(formData.get("bot-field"))) {
      return NextResponse.json({ ok: true });
    }

    const name = asString(formData.get("name"));
    const organisation = asString(formData.get("organisation"));
    const sector = asString(formData.get("sector"));
    const email = asString(formData.get("email"));
    const interest = asString(formData.get("interest"));
    const situation = asString(formData.get("situation"));

    if (!name || !email || !situation) {
      return NextResponse.json(
        { error: "Name, email, and situation are required." },
        { status: 400 },
      );
    }

    if (!emailPattern.test(email)) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    }

    const to = process.env.CONTACT_TO_EMAIL?.trim() || "hello@trustledai.com";
    const from =
      process.env.CONTACT_FROM_EMAIL?.trim() ||
      "TrustLed AI <onboarding@resend.dev>";

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `Contact form: ${name}${organisation ? ` (${organisation})` : ""}`,
      text: [
        `Name: ${name}`,
        `Organisation: ${organisation || "—"}`,
        `Sector: ${sector || "—"}`,
        `Email: ${email}`,
        `Interest: ${interest || "—"}`,
        "",
        "Situation:",
        situation,
      ].join("\n"),
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Organisation:</strong> ${escapeHtml(organisation || "—")}</p>
        <p><strong>Sector:</strong> ${escapeHtml(sector || "—")}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Interest:</strong> ${escapeHtml(interest || "—")}</p>
        <p><strong>Situation:</strong></p>
        <p>${escapeHtml(situation).replaceAll("\n", "<br />")}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Unable to send your message. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Unable to send your message. Please try again." },
      { status: 500 },
    );
  }
}
