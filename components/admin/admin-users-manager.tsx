"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import type { AdminRole } from "@/lib/admin-roles";

type ManagedUser = {
  id: string;
  username: string;
  role: AdminRole;
  createdAt: string;
  createdBy?: string;
};

type UsersResponse = {
  users: ManagedUser[];
  bootstrapAdmin: { username: string; role: "admin" };
};

export function AdminUsersManager() {
  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [bootstrapAdmin, setBootstrapAdmin] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<AdminRole>("editor");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const loadUsers = useCallback(async () => {
    setError(null);
    const response = await fetch("/api/admin/users");
    if (!response.ok) {
      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
      };
      throw new Error(data.error ?? "Failed to load users");
    }

    const data = (await response.json()) as UsersResponse;
    setUsers(data.users);
    setBootstrapAdmin(data.bootstrapAdmin.username);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await loadUsers();
      } catch (loadError) {
        if (!cancelled) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Failed to load users",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [loadUsers]);

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role }),
      });

      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error ?? "Failed to create user");
      }

      setUsername("");
      setPassword("");
      setRole("editor");
      setMessage(
        role === "editor"
          ? "Editor created. They can sign in and manage blog articles."
          : "Admin user created.",
      );
      await loadUsers();
    } catch (createError) {
      setError(
        createError instanceof Error
          ? createError.message
          : "Failed to create user",
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(user: ManagedUser) {
    if (
      !window.confirm(
        `Remove access for ${user.username}? They will no longer be able to sign in.`,
      )
    ) {
      return;
    }

    setDeletingId(user.id);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch(
        `/api/admin/users/${encodeURIComponent(user.id)}`,
        { method: "DELETE" },
      );
      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
      };
      if (!response.ok) {
        throw new Error(data.error ?? "Failed to delete user");
      }
      setMessage(`Removed ${user.username}.`);
      await loadUsers();
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Failed to delete user",
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="admin-users">
      <section className="admin-panel">
        <div className="admin-panel-header">
          <div>
            <h2 className="eyebrow">Create user</h2>
            <p className="admin-help">
              Editors can create, edit, and read blog posts. Admins get full site
              access.
            </p>
          </div>
        </div>

        <form className="admin-users-form" onSubmit={handleCreate}>
          <div className="field">
            <label htmlFor="user-email">Email</label>
            <input
              id="user-email"
              type="email"
              required
              autoComplete="off"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="user-password">Temporary password</label>
            <input
              id="user-password"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="user-role">Role</label>
            <select
              id="user-role"
              value={role}
              onChange={(event) => setRole(event.target.value as AdminRole)}
            >
              <option value="editor">Editor — blog create, edit, read</option>
              <option value="admin">Admin — full access</option>
            </select>
          </div>
          <div className="admin-form-footer">
            <button type="submit" className="btn" disabled={saving}>
              {saving ? "Creating…" : "Create user"}
            </button>
          </div>
        </form>
      </section>

      <section className="admin-panel" style={{ marginTop: "1.25rem" }}>
        <div className="admin-panel-header">
          <div>
            <h2 className="eyebrow">Users</h2>
            <p className="admin-help">
              Main admin ({bootstrapAdmin ?? "env account"}) always signs in with
              the configured admin credentials.
            </p>
          </div>
        </div>

        {loading ? <p className="lede">Loading users…</p> : null}
        {error ? <p className="form-error">{error}</p> : null}
        {message ? <p className="site-settings-saved">{message}</p> : null}

        {!loading && users.length === 0 ? (
          <p className="admin-empty">
            No managed users yet. Create an editor so they can manage the blog.
          </p>
        ) : null}

        {users.length > 0 ? (
          <ul className="admin-users-list">
            {users.map((user) => (
              <li key={user.id} className="admin-users-list-item">
                <div>
                  <strong>{user.username}</strong>
                  <p className="admin-link-meta">
                    {user.role === "editor" ? "Editor" : "Admin"}
                    {user.createdBy ? ` · added by ${user.createdBy}` : ""}
                  </p>
                </div>
                <button
                  type="button"
                  className="blog-admin-delete"
                  disabled={deletingId === user.id}
                  onClick={() => handleDelete(user)}
                >
                  {deletingId === user.id ? "Removing…" : "Remove"}
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </section>
    </div>
  );
}
