import {
  type AdminRole,
  type AdminSession,
  isAdminRole,
} from "@/lib/admin-roles";

const SESSION_TTL_SECONDS = 60 * 60 * 8;
const textEncoder = new TextEncoder();

function bytesToHex(bytes: Uint8Array) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join(
    "",
  );
}

function bytesToBase64Url(bytes: Uint8Array) {
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  const base64 =
    typeof btoa === "function"
      ? btoa(binary)
      : Buffer.from(bytes).toString("base64");

  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlToBytes(value: string) {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const padLength = (4 - (padded.length % 4)) % 4;
  const base64 = padded + "=".repeat(padLength);

  if (typeof atob === "function") {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  }

  return new Uint8Array(Buffer.from(base64, "base64"));
}

function readEnvValue(key: string, fallback = "") {
  const raw = process.env[key] ?? fallback;
  return raw.trim().replace(/^["']|["']$/g, "");
}

export function getAdminSessionSecret() {
  const explicit = readEnvValue("ADMIN_SESSION_SECRET");
  if (explicit) return explicit;

  const password = readEnvValue("ADMIN_PASSWORD", "admin123");
  return `trustled-session:${password}`;
}

async function importHmacKey(secret: string) {
  return crypto.subtle.importKey(
    "raw",
    textEncoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
}

async function signPayload(payload: string, secret: string) {
  const key = await importHmacKey(secret);
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    textEncoder.encode(payload),
  );
  return bytesToBase64Url(new Uint8Array(signature));
}

function timingSafeEqualString(a: string, b: string) {
  if (a.length !== b.length) return false;

  let mismatch = 0;
  for (let i = 0; i < a.length; i += 1) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

export async function createSignedAdminSessionToken(input: {
  username: string;
  role: AdminRole;
  ttlSeconds?: number;
}) {
  const exp =
    Math.floor(Date.now() / 1000) + (input.ttlSeconds ?? SESSION_TTL_SECONDS);
  const body = {
    u: input.username.trim().toLowerCase(),
    r: input.role,
    e: exp,
  };
  const payload = bytesToBase64Url(textEncoder.encode(JSON.stringify(body)));
  const signature = await signPayload(payload, getAdminSessionSecret());
  return `v1.${payload}.${signature}`;
}

export async function verifySignedAdminSessionToken(
  token: string,
): Promise<AdminSession | null> {
  const parts = token.split(".");
  if (parts.length !== 3 || parts[0] !== "v1") {
    return null;
  }

  const [, payload, signature] = parts;
  if (!payload || !signature) {
    return null;
  }

  const expected = await signPayload(payload, getAdminSessionSecret());
  if (!timingSafeEqualString(signature, expected)) {
    return null;
  }

  try {
    const json = new TextDecoder().decode(base64UrlToBytes(payload));
    const parsed = JSON.parse(json) as {
      u?: unknown;
      r?: unknown;
      e?: unknown;
    };

    if (
      typeof parsed.u !== "string" ||
      !parsed.u.trim() ||
      !isAdminRole(parsed.r) ||
      typeof parsed.e !== "number"
    ) {
      return null;
    }

    if (parsed.e * 1000 < Date.now()) {
      return null;
    }

    return {
      username: parsed.u.trim().toLowerCase(),
      role: parsed.r,
      exp: parsed.e,
    };
  } catch {
    return null;
  }
}

export async function sha256Hex(value: string) {
  const hashBuffer = await crypto.subtle.digest(
    "SHA-256",
    textEncoder.encode(value),
  );
  return bytesToHex(new Uint8Array(hashBuffer));
}

export { SESSION_TTL_SECONDS };
