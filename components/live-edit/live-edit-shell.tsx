"use client";

import type { ReactNode } from "react";
import { LiveEditProvider } from "./live-edit-provider";

type LiveEditShellProps = {
  page: string;
  isAdmin: boolean;
  initialContent: Record<string, string>;
  startEditing?: boolean;
  children: ReactNode;
};

export function LiveEditShell({
  page,
  isAdmin,
  initialContent,
  startEditing,
  children,
}: LiveEditShellProps) {
  return (
    <LiveEditProvider
      page={page}
      isAdmin={isAdmin}
      initialContent={initialContent}
      startEditing={startEditing}
    >
      {children}
    </LiveEditProvider>
  );
}
