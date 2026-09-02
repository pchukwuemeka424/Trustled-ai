"use client";

import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/container";
import { isEditorAllowedAdminPath } from "@/lib/admin-roles";

function safeNextPath(value: string | null, fallback = "/admin") {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return fallback;
  }
  return value;
}

function resolvePostLoginPath(
  requested: string | null,
  role: string | undefined,
  fallback: string,
) {
  const next = safeNextPath(requested, fallback);
  if (role === "editor" && next.startsWith("/admin") && !isEditorAllowedAdminPath(next)) {
    return "/admin/blog";
  }
  return next;
}

export function AdminLoginForm() {
  const searchParams = useSearchParams();
  const requestedNext = searchParams.get("next");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("invalid");
      }

      const data = (await response.json().catch(() => ({}))) as {
        redirectTo?: string;
        role?: string;
      };

      const fallback =
        data.redirectTo ??
        (data.role === "editor" ? "/admin/blog" : "/admin");
      window.location.assign(
        resolvePostLoginPath(requestedNext, data.role, fallback),
      );
    } catch {
      setError("Invalid login details.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section style={{ padding: "clamp(3rem, 6vw, 5rem) 0" }}>
      <Container>
        <div style={{ maxWidth: "28rem", margin: "0 auto" }}>
          <div className="form-card">
            <p className="eyebrow">CMS</p>
            <h1 style={{ marginTop: "0.5rem", fontSize: "clamp(1.75rem, 2.5vw, 2.1rem)" }}>
              Sign in
            </h1>
            <p
              className="lede"
              style={{ marginTop: "0.75rem", fontSize: "1rem", marginBottom: "1.75rem" }}
            >
              Admins manage the full site. Editors create and edit blog articles.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="admin-username">Username</label>
                <input
                  id="admin-username"
                  required
                  type="email"
                  autoComplete="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </div>

              <div className="field">
                <label htmlFor="admin-password">Password</label>
                <input
                  id="admin-password"
                  required
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>

              {error ? <p className="form-error">{error}</p> : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn"
                style={{ width: "100%", justifyContent: "center", marginTop: "0.5rem" }}
              >
                {isSubmitting ? "Signing in…" : "Sign in"}
              </button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
