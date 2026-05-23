"use client";

import { useState } from "react";
import { useLiveEdit } from "./live-edit-context";

export function LiveEditToolbar() {
  const {
    isAdmin,
    isEditing,
    isDirty,
    status,
    errorMessage,
    startEdit,
    cancelEdit,
    save,
  } = useLiveEdit();

  const [confirmCancel, setConfirmCancel] = useState(false);

  if (!isAdmin) return null;

  const isSaving = status === "saving";

  function onCancelClick() {
    if (isDirty && !confirmCancel) {
      setConfirmCancel(true);
      window.setTimeout(() => setConfirmCancel(false), 4000);
      return;
    }
    setConfirmCancel(false);
    cancelEdit();
  }

  return (
    <div className="live-edit-toolbar" role="region" aria-label="Page editor">
      <span className="live-edit-toolbar-label">Admin</span>
      <StatusPill status={status} dirty={isDirty} message={errorMessage} />
      {isEditing ? (
        <>
          <button
            type="button"
            onClick={onCancelClick}
            className="live-edit-btn live-edit-btn--ghost"
            disabled={isSaving}
          >
            {confirmCancel ? "Click again to discard" : "Cancel"}
          </button>
          <button
            type="button"
            onClick={save}
            disabled={isSaving || !isDirty}
            className="live-edit-btn live-edit-btn--primary"
          >
            {isSaving ? "Saving…" : "Save changes"}
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={startEdit}
          className="live-edit-btn live-edit-btn--dark"
        >
          Edit page
        </button>
      )}
    </div>
  );
}

function StatusPill({
  status,
  dirty,
  message,
}: {
  status: ReturnType<typeof useLiveEdit>["status"];
  dirty: boolean;
  message: string;
}) {
  if (status === "error") {
    return (
      <span className="live-edit-pill live-edit-pill--error">
        {message || "Save failed"}
      </span>
    );
  }
  if (status === "saved" && !dirty) {
    return <span className="live-edit-pill live-edit-pill--ok">Saved</span>;
  }
  if (dirty) {
    return <span className="live-edit-pill live-edit-pill--warn">Unsaved</span>;
  }
  return null;
}
