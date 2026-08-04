"use client";

import Link from "next/link";
import { Arrow } from "@/components/ui";
import { EditableSection } from "@/components/live-edit/editable-section";
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
    <EditableSection
      title="Call to action"
      className="cta-band"
      fields={[
        { key: titleField, label: "Title", kind: "text" },
        { key: descriptionField, label: "Description", kind: "html" },
      ]}
    >
      <div className="wrap">
        <EditableText
          field={titleField}
          defaultValue={defaultTitle}
          as="h2"
          label="Title"
        />
        <EditableText
          field={descriptionField}
          defaultValue={defaultDescription}
          as="p"
          multiline
          rich
          label="Description"
        />
        <Link className="btn btn-on-ink" href={buttonHref}>
          {buttonText} <Arrow />
        </Link>
      </div>
    </EditableSection>
  );
}
