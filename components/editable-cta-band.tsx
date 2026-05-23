"use client";

import Link from "next/link";
import { Arrow } from "@/components/ui";
import { EditableText } from "@/components/live-edit/editable-text";

type EditableCtaBandProps = {
  titleField: string;
  descriptionField: string;
  defaultTitle: string;
  defaultDescription: string;
  buttonText?: string;
  buttonHref?: string;
};

export function EditableCtaBand({
  titleField,
  descriptionField,
  defaultTitle,
  defaultDescription,
  buttonText = "Talk to us about your situation",
  buttonHref = "/contact",
}: EditableCtaBandProps) {
  return (
    <section className="cta-band">
      <div className="wrap">
        <EditableText
          field={titleField}
          defaultValue={defaultTitle}
          as="h2"
        />
        <EditableText
          field={descriptionField}
          defaultValue={defaultDescription}
          as="p"
          multiline
        />
        <Link className="btn btn-on-ink" href={buttonHref}>
          {buttonText} <Arrow />
        </Link>
      </div>
    </section>
  );
}
