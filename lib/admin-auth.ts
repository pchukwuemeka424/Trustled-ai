import "server-only";
import { createHash, timingSafeEqual } from "node:crypto";
import type { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  ADMIN_COOKIE_NAME,
  ADMIN_CREDENTIALS_DOC_ID,
  type AdminCredentials,
  getConfiguredSessionHashOverrides,
  getEnvAdminPassword,
  getEnvAdminSessionSeed,
  getEnvAdminUsername,
} from "@/lib/admin-credentials";
import {
  type AdminRole,
  type AdminSession,
  canManageBlog,
  canManageSite,
} from "@/lib/admin-roles";
import {
  SESSION_TTL_SECONDS,
  createSignedAdminSessionToken,
  verifySignedAdminSessionToken,
} from "@/lib/admin-session";
import {
  findAdminUserByUsername,
  verifyPassword,
} from "@/lib/admin-users";
import { getDatabase } from "@/lib/mongodb";

export { ADMIN_COOKIE_NAME } from "@/lib/admin-credentials";
export type { AdminRole, AdminSession } from "@/lib/admin-roles";

type AdminCredentialsDoc = {
  _id: typeof ADMIN_CREDENTIALS_DOC_ID;
  content: {
    username?: string;
    password?: string;
    sessionHash?: string;
  };
};

function getAdminSessionHash(username: string, password: string): string {
  return createHash("sha256").update(`${username}:${password}`).digest("hex");
}

function getEnvAdminCredentialsWithHash(): AdminCredentials {
  const username = getEnvAdminUsername();
  const password = getEnvAdminPassword();

  return {
    username,
    password,
    sessionHash: getAdminSessionHash(username, password),
  };
}

function normalizeDoc(
  content?: AdminCredentialsDoc["content"],
): AdminCredentials | null {
  const username = content?.username?.trim();
  const password = content?.password;

  if (!username || typeof password !== "string" || !password) {
    return null;
  }

  return {
    username,
    password,
    sessionHash:
      content.sessionHash?.trim() || getAdminSessionHash(username, password),
  };
}

async function getLegacyAdminCredentials(): Promise<AdminCredentials> {
  try {
    const db = await getDatabase();
    const doc = await db
      .collection<AdminCredentialsDoc>("site_content")
      .findOne({ _id: ADMIN_CREDENTIALS_DOC_ID });

    return normalizeDoc(doc?.content) ?? getEnvAdminCredentialsWithHash();
  } catch {
    return getEnvAdminCredentialsWithHash();
  }
}

export function getEnvSessionHash(): string {
  return getAdminSessionHash(getEnvAdminUsername(), getEnvAdminPassword());
}

export function getAdminSessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  };
}

export function applyAdminSessionCookie(response: NextResponse, token: string) {
  response.cookies.set(ADMIN_COOKIE_NAME, token, getAdminSessionCookieOptions());
}

export function clearAdminSessionCookie(response: NextResponse) {
  response.cookies.set(ADMIN_COOKIE_NAME, "", {
    ...getAdminSessionCookieOptions(),
    maxAge: 0,
  });
}

function passwordsMatch(provided: string, expected: string) {
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) {
    return false;
  }
  return timingSafeEqual(a, b);
}

export type ValidatedAdminUser = {
  username: string;
  role: AdminRole;
};

export async function validateAdminCredentials(
  username: string,
  password: string,
): Promise<ValidatedAdminUser | null> {
  const normalizedUsername = username.trim().toLowerCase();
  if (!normalizedUsername || !password) {
    return null;
  }

  const envUsername = getEnvAdminUsername().toLowerCase();
  const envPassword = getEnvAdminPassword();
  if (
    normalizedUsername === envUsername &&
    passwordsMatch(password, envPassword)
  ) {
    return { username: envUsername, role: "admin" };
  }

  const legacy = await getLegacyAdminCredentials();
  if (
    normalizedUsername === legacy.username.toLowerCase() &&
    passwordsMatch(password, legacy.password)
  ) {
    return { username: legacy.username.toLowerCase(), role: "admin" };
  }

  const managed = await findAdminUserByUsername(normalizedUsername);
  if (!managed) {
    return null;
  }

  if (!verifyPassword(password, managed.passwordHash)) {
    return null;
  }

  return {
    username: managed.username,
    role: managed.role,
  };
}

export async function createAdminSessionToken(user: ValidatedAdminUser) {
  return createSignedAdminSessionToken({
    username: user.username,
    role: user.role,
  });
}

export async function setAdminSession(user: ValidatedAdminUser) {
  const cookieStore = await cookies();
  cookieStore.set(
    ADMIN_COOKIE_NAME,
    await createAdminSessionToken(user),
    getAdminSessionCookieOptions(),
  );
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}

function matchesSessionToken(current: string, expected: string) {
  const currentBuffer = Buffer.from(current);
  const expectedBuffer = Buffer.from(expected);

  if (currentBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(currentBuffer, expectedBuffer);
}

async function getLegacyValidSessionTokens() {
  const tokens = new Set<string>([
    getEnvSessionHash(),
    ...getConfiguredSessionHashOverrides(),
    (await getLegacyAdminCredentials()).sessionHash,
  ]);

  return [...tokens];
}

async function resolveLegacySession(
  token: string,
): Promise<AdminSession | null> {
  for (const expected of await getLegacyValidSessionTokens()) {
    if (matchesSessionToken(token, expected)) {
      return {
        username: getEnvAdminUsername().toLowerCase(),
        role: "admin",
        exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
      };
    }
  }
  return null;
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value ?? "";
  if (!token) {
    return null;
  }

  const signed = await verifySignedAdminSessionToken(token);
  if (signed) {
    return signed;
  }

  return resolveLegacySession(token);
}

/** Any signed-in CMS user (admin or editor). */
export async function isAdminAuthenticated() {
  return (await getAdminSession()) !== null;
}

/** Main admin only — site CMS and user management. */
export async function isSiteAdminAuthenticated() {
  const session = await getAdminSession();
  return canManageSite(session?.role);
}

/** Admin or editor — blog create / edit / read. */
export async function isBlogEditorAuthenticated() {
  const session = await getAdminSession();
  return canManageBlog(session?.role);
}

export { getEnvAdminSessionSeed };
