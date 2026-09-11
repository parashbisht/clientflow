import { seed } from "@/data/seed";
import type { AppDatabase } from "@/types";

function clone<T>(value: T): T {
  return structuredClone(value);
}

let db: AppDatabase = clone(seed);

export function getDb(): AppDatabase {
  return db;
}

export function resetDb(): void {
  db = clone(seed);
}

export function wait(ms = 220): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function nextId(prefix: string): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 8)}`;
}
