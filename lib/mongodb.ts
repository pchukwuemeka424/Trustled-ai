import "server-only";
import { MongoClient, type Db } from "mongodb";

const dbName = process.env.MONGODB_DB_NAME ?? "trustled_ai";

declare global {
  var __mongoClientPromise: Promise<MongoClient> | undefined;
}

export async function getDatabase(): Promise<Db> {
  const { assertProductionEnv } = await import("@/lib/env");
  assertProductionEnv();

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Missing MONGODB_URI environment variable");
  }

  if (!global.__mongoClientPromise) {
    global.__mongoClientPromise = new MongoClient(uri, {
      maxPoolSize: 10,
    }).connect();
  }

  const clientPromise = global.__mongoClientPromise;

  const client = await clientPromise;
  return client.db(dbName);
}
