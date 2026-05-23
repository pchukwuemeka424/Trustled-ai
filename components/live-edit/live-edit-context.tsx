"use client";

import { createContext, useContext } from "react";

export type LiveEditStatus = "idle" | "saving" | "saved" | "error";

export type LiveEditContextValue = {
  isAdmin: boolean;
  isEditing: boolean;
  isDirty: boolean;
  status: LiveEditStatus;
  errorMessage: string;
  values: Record<string, string>;
  startEdit: () => void;
  cancelEdit: () => void;
  save: () => Promise<void>;
  setField: (field: string, value: string) => void;
};

export const LiveEditContext = createContext<LiveEditContextValue | null>(null);

export function useLiveEdit() {
  const ctx = useContext(LiveEditContext);
  if (!ctx) {
    throw new Error("useLiveEdit must be used within a LiveEditProvider");
  }
  return ctx;
}

export function useOptionalLiveEdit() {
  return useContext(LiveEditContext);
}
