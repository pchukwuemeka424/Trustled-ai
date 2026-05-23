"use client";

import { useRouter } from "next/navigation";

export function AdminLogoutButton() {
  const router = useRouter();

  async function onLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={onLogout}
      className="btn btn-ghost"
      style={{ height: "2.5rem" }}
    >
      Logout
    </button>
  );
}
