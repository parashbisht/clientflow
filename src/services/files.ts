import { getDb, nextId, wait } from "@/data/db";
import type { FileRecord, TeamMember, Activity, RevenuePoint } from "@/types";

export const filesService = {
  async list(): Promise<FileRecord[]> {
    await wait();
    return getDb().files;
  },
  async create(input: Omit<FileRecord, "id" | "uploadedAt">): Promise<FileRecord> {
    await wait(160);
    const file: FileRecord = {
      ...input,
      id: nextId("f"),
      uploadedAt: new Date().toISOString(),
    };
    getDb().files.unshift(file);
    return file;
  },
};

export const teamService = {
  async list(): Promise<TeamMember[]> {
    await wait(80);
    return getDb().team;
  },
};

export const analyticsService = {
  async revenue(): Promise<RevenuePoint[]> {
    await wait(80);
    return getDb().revenue;
  },
  async activities(): Promise<Activity[]> {
    await wait(80);
    return getDb().activities;
  },
};

export const activitiesService = {
  async list(): Promise<Activity[]> {
    await wait(80);
    return getDb().activities;
  },
  async add(input: Omit<Activity, "id" | "createdAt">): Promise<Activity> {
    const activity: Activity = {
      ...input,
      id: nextId("a"),
      createdAt: new Date().toISOString(),
    };
    getDb().activities.unshift(activity);
    return activity;
  },
};
