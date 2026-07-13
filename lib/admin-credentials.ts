export const ADMIN_COOKIE_NAME = "admin_session";
export const ADMIN_CREDENTIALS_DOC_ID = "admin_credentials";

export type AdminCredentials = {
  username: string;
  password: string;
  sessionHash: string;
};

function readEnvValue(key: string, fallback: string): string {
  const raw = process.env[key] ?? fallback;
  return raw.trim().replace(/^["']|["']$/g, "");
}

export function getEnvAdminUsername(): string {
  return readEnvValue("ADMIN_USERNAME", "admin@trustled.com");
}

export function getEnvAdminPassword(): string {
  return readEnvValue("ADMIN_PASSWORD", "admin123");
}

export function getEnvAdminSessionSeed(): string {
  return `${getEnvAdminUsername()}:${getEnvAdminPassword()}`;
}

export function getConfiguredSessionHashOverrides(): string[] {
  const configured = process.env.ADMIN_SESSION_HASH?.trim();
  return configured ? [configured] : [];
}
