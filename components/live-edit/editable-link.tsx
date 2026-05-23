"use client";

import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { EditableText } from "./editable-text";
import { useLiveEdit } from "./live-edit-context";

type EditableLinkProps = {
  field: string;
  defaultValue?: string;
  href: string;
  className?: string;
  style?: CSSProperties;
  trailing?: ReactNode;
};

export function EditableLink({
  field,
  defaultValue = "",
  href,
  className,
  style,
  trailing,
}: EditableLinkProps) {
  const { isAdmin, isEditing } = useLiveEdit();
  const editable = isAdmin && isEditing;

  if (editable) {
    return (
      <span
        className={className}
        style={style}
        title="Editing — links are inactive while editing"
      >
        <EditableText field={field} defaultValue={defaultValue} as="span" />
        {trailing ? <span aria-hidden>{trailing}</span> : null}
      </span>
    );
  }

  return (
    <Link href={href} className={className} style={style}>
      <EditableText field={field} defaultValue={defaultValue} as="span" />
      {trailing ? <span aria-hidden>{trailing}</span> : null}
    </Link>
  );
}
