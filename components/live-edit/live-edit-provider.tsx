"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { LiveEditContext, type LiveEditStatus } from "./live-edit-context";
import { LiveEditToolbar } from "./live-edit-toolbar";

type LiveEditProviderProps = {
  page: string;
  isAdmin: boolean;
  initialContent: Record<string, string>;
  startEditing?: boolean;
  children: ReactNode;
};

function isShallowEqual(a: Record<string, string>, b: Record<string, string>) {
  const ak = Object.keys(a);
  const bk = Object.keys(b);
  if (ak.length !== bk.length) return false;
  for (const key of ak) {
    if (a[key] !== b[key]) return false;
  }
  return true;
}

function endpointForPage(page: string) {
  if (page === "home") {
    return "/api/admin/home-content";
  }
  return `/api/admin/page-content/${page}`;
}

export function LiveEditProvider({
  page,
  isAdmin,
  initialContent,
  startEditing = false,
  children,
}: LiveEditProviderProps) {
  const router = useRouter();

  const [savedContent, setSavedContent] =
    useState<Record<string, string>>(initialContent);
  const [values, setValues] = useState<Record<string, string>>(initialContent);
  const [isEditing, setIsEditing] = useState<boolean>(
    () => isAdmin && startEditing,
  );
  const [status, setStatus] = useState<LiveEditStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const lastInitialRef = useRef(initialContent);
  useEffect(() => {
    if (isShallowEqual(lastInitialRef.current, initialContent)) return;
    lastInitialRef.current = initialContent;
    setSavedContent(initialContent);
    setValues((prev) => (isEditing ? prev : initialContent));
  }, [initialContent, isEditing]);

  const isDirty = useMemo(
    () => !isShallowEqual(values, savedContent),
    [values, savedContent],
  );

  useEffect(() => {
    if (!isDirty || !isEditing) return;
    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [isDirty, isEditing]);

  const startEdit = useCallback(() => {
    setIsEditing(true);
    setStatus("idle");
    setErrorMessage("");
  }, []);

  const cancelEdit = useCallback(() => {
    setValues(savedContent);
    setIsEditing(false);
    setStatus("idle");
    setErrorMessage("");
  }, [savedContent]);

  const setField = useCallback((field: string, value: string) => {
    setValues((prev) =>
      prev[field] === value ? prev : { ...prev, [field]: value },
    );
    setStatus("idle");
    setErrorMessage("");
  }, []);

  const save = useCallback(async () => {
    setStatus("saving");
    setErrorMessage("");
    try {
      const response = await fetch(endpointForPage(page), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as {
          error?: string;
        };
        throw new Error(data.error ?? "Save failed");
      }
      const data = (await response.json()) as {
        ok?: boolean;
        content?: Record<string, string>;
      };
      const next = data.content ?? values;
      setSavedContent(next);
      setValues(next);
      setStatus("saved");
      setIsEditing(false);
      router.refresh();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Save failed. Please retry.",
      );
    }
  }, [page, values, router]);

  const contextValue = useMemo(
    () => ({
      isAdmin,
      isEditing,
      isDirty,
      status,
      errorMessage,
      values,
      startEdit,
      cancelEdit,
      save,
      setField,
    }),
    [
      isAdmin,
      isEditing,
      isDirty,
      status,
      errorMessage,
      values,
      startEdit,
      cancelEdit,
      save,
      setField,
    ],
  );

  return (
    <LiveEditContext.Provider value={contextValue}>
      {children}
      {isAdmin ? <LiveEditToolbar /> : null}
    </LiveEditContext.Provider>
  );
}
