import { neon } from "@neondatabase/serverless";
import { drizzle, NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// Lazy-loaded database instance to avoid build-time errors when DATABASE_URL is not set
let _db: NeonHttpDatabase<typeof schema> | null = null;

export function getDb() {
  if (!_db) {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL environment variable is not set");
    }
    const sql = neon(process.env.DATABASE_URL);
    _db = drizzle(sql, { schema });
  }
  return _db;
}

// For backwards compatibility - lazy getter
export const db = new Proxy({} as NeonHttpDatabase<typeof schema>, {
  get(_, prop) {
    return (getDb() as unknown as Record<string | symbol, unknown>)[prop];
  },
});

// Export all schema items for convenient access
export * from "./schema";

// Re-export drizzle-orm utilities for convenience
export {
  eq,
  and,
  or,
  desc,
  asc,
  gt,
  gte,
  lt,
  lte,
  ne,
  sql as sqlExpr,
  count,
  sum,
  avg,
  min,
  max,
  ilike,
  like,
  inArray,
  notInArray,
  isNull,
  isNotNull,
} from "drizzle-orm";
