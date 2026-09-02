"use client";

import { useRouter } from "next/navigation";

type AdminLogoutButtonProps = {
  className?: string;
};

export function AdminLogoutButton({
  className = "btn btn-ghost",
}: AdminLogoutButtonProps) {
  const router = useRouter();

  async function onLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <button type="button" onClick={onLogout} className={className}>
      Logout
    </button>
  );
}
