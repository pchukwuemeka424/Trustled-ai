"use client";

import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/container";

function safeNextPath(value: string | null) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/admin";
  }
  return value;
}

export function AdminLoginForm() {
  const searchParams = useSearchParams();
  const nextPath = safeNextPath(searchParams.get("next"));
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

      window.location.assign(nextPath);
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
            <p className="eyebrow">Admin</p>
            <h1 style={{ marginTop: "0.5rem", fontSize: "clamp(1.75rem, 2.5vw, 2.1rem)" }}>
              Sign in
            </h1>
            <p
              className="lede"
              style={{ marginTop: "0.75rem", fontSize: "1rem", marginBottom: "1.75rem" }}
            >
              Sign in to manage site pages and blog articles.
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
