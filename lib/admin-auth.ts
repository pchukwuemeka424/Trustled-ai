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
import { getDatabase } from "@/lib/mongodb";

export { ADMIN_COOKIE_NAME } from "@/lib/admin-credentials";

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

function normalizeDoc(content?: AdminCredentialsDoc["content"]): AdminCredentials | null {
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

async function getAdminCredentials(): Promise<AdminCredentials> {
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
    maxAge: 60 * 60 * 8,
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

export async function validateAdminCredentials(username: string, password: string) {
  const credentials = await getAdminCredentials();
  const normalizedUsername = username.trim().toLowerCase();

  return (
    normalizedUsername === credentials.username.toLowerCase() &&
    password === credentials.password
  );
}

export async function createAdminSessionToken() {
  const credentials = await getAdminCredentials();
  return credentials.sessionHash;
}

export async function setAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(
    ADMIN_COOKIE_NAME,
    await createAdminSessionToken(),
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

async function getValidSessionTokens() {
  const tokens = new Set<string>([
    getEnvSessionHash(),
    ...getConfiguredSessionHashOverrides(),
    (await getAdminCredentials()).sessionHash,
  ]);

  return [...tokens];
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const current = cookieStore.get(ADMIN_COOKIE_NAME)?.value ?? "";

  for (const token of await getValidSessionTokens()) {
    if (matchesSessionToken(current, token)) {
      return true;
    }
  }

  return false;
}

export { getEnvAdminSessionSeed };
