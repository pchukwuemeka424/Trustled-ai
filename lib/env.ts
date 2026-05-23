import "server-only";

const PRODUCTION_REQUIRED = [
  "MONGODB_URI",
  "ADMIN_USERNAME",
  "ADMIN_PASSWORD",
] as const;

export function assertProductionEnv() {
  if (process.env.NODE_ENV !== "production") {
    return;
  }

  const missing = PRODUCTION_REQUIRED.filter((key) => !process.env[key]?.trim());

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables for production: ${missing.join(", ")}`,
    );
  }
}
