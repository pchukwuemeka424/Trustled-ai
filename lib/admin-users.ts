import "server-only";
import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { ObjectId, type WithId } from "mongodb";
import { type AdminRole, isAdminRole } from "@/lib/admin-roles";
import { getDatabase } from "@/lib/mongodb";

export const ADMIN_USERS_COLLECTION = "admin_users";

export type AdminUserRecord = {
  username: string;
  passwordHash: string;
  role: AdminRole;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
};

export type AdminUserPublic = {
  id: string;
  username: string;
  role: AdminRole;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
};

type AdminUserDoc = WithId<AdminUserRecord>;

function normalizeUsername(username: string) {
  return username.trim().toLowerCase();
}

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `scrypt$${salt}$${hash}`;
}

export function verifyPassword(password: string, stored: string) {
  const [algo, salt, hash] = stored.split("$");
  if (algo !== "scrypt" || !salt || !hash) {
    return false;
  }

  try {
    const computed = scryptSync(password, salt, 64);
    const expected = Buffer.from(hash, "hex");
    if (expected.length !== computed.length) {
      return false;
    }
    return timingSafeEqual(computed, expected);
  } catch {
    return false;
  }
}

function toPublic(doc: AdminUserDoc): AdminUserPublic {
  return {
    id: doc._id.toHexString(),
    username: doc.username,
    role: doc.role,
    createdAt: doc.createdAt.toISOString(),
    updatedAt: doc.updatedAt.toISOString(),
    createdBy: doc.createdBy,
  };
}

async function usersCollection() {
  const db = await getDatabase();
  return db.collection<AdminUserRecord>(ADMIN_USERS_COLLECTION);
}

export async function findAdminUserByUsername(username: string) {
  try {
    const collection = await usersCollection();
    return await collection.findOne({ username: normalizeUsername(username) });
  } catch {
    return null;
  }
}

export async function listAdminUsers(): Promise<AdminUserPublic[]> {
  const collection = await usersCollection();
  const docs = await collection.find({}).sort({ createdAt: -1 }).toArray();
  return docs.map(toPublic);
}

export async function createAdminUser(input: {
  username: string;
  password: string;
  role: AdminRole;
  createdBy?: string;
}) {
  const username = normalizeUsername(input.username);
  const password = input.password;

  if (!username || !username.includes("@")) {
    throw new Error("Username must be a valid email");
  }

  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }

  if (!isAdminRole(input.role)) {
    throw new Error("Invalid role");
  }

  const collection = await usersCollection();
  const existing = await collection.findOne({ username });
  if (existing) {
    throw new Error("A user with this email already exists");
  }

  const now = new Date();
  const doc: AdminUserRecord = {
    username,
    passwordHash: hashPassword(password),
    role: input.role,
    createdAt: now,
    updatedAt: now,
    createdBy: input.createdBy,
  };

  const result = await collection.insertOne(doc);
  return {
    id: result.insertedId.toHexString(),
    username: doc.username,
    role: doc.role,
    createdAt: doc.createdAt.toISOString(),
    updatedAt: doc.updatedAt.toISOString(),
    createdBy: doc.createdBy,
  } satisfies AdminUserPublic;
}

export async function deleteAdminUser(id: string) {
  if (!ObjectId.isValid(id)) {
    return false;
  }

  const collection = await usersCollection();
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount === 1;
}

export async function updateAdminUserPassword(id: string, password: string) {
  if (!ObjectId.isValid(id)) {
    return false;
  }

  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }

  const collection = await usersCollection();
  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        passwordHash: hashPassword(password),
        updatedAt: new Date(),
      },
    },
  );

  return result.matchedCount === 1;
}
