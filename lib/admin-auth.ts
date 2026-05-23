import "server-only";
import { cookies } from "next/headers";
import { createHash, timingSafeEqual } from "node:crypto";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME ?? "admin@trustled.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "admin123";
const ADMIN_COOKIE_NAME = "admin_session";

function sha256(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function sessionValue() {
  const seed = `${ADMIN_USERNAME}:${ADMIN_PASSWORD}`;
  return sha256(seed);
}

export function validateAdminCredentials(username: string, password: string) {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export async function setAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, sessionValue(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const current = cookieStore.get(ADMIN_COOKIE_NAME)?.value ?? "";
  const expected = sessionValue();

  const currentBuffer = Buffer.from(current);
  const expectedBuffer = Buffer.from(expected);

  if (currentBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(currentBuffer, expectedBuffer);
}
