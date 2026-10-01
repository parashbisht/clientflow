import { getDb, nextId, wait } from "@/data/db";
import type { Lead, LeadStatus } from "@/types";

export type LeadInput = Omit<Lead, "id" | "createdAt" | "lastActivityAt" | "notes" | "timeline" | "messages"> & {
  notes?: Lead["notes"];
};

export const leadsService = {
  async list(): Promise<Lead[]> {
    await wait();
    return getDb().leads;
  },
  async get(id: string): Promise<Lead | undefined> {
    await wait(120);
    return getDb().leads.find((lead) => lead.id === id);
  },
  async create(input: LeadInput): Promise<Lead> {
    await wait(180);
    const now = new Date().toISOString();
    const lead: Lead = {
      ...input,
      id: nextId("ld"),
      createdAt: now,
      lastActivityAt: now,
      notes: input.notes ?? [],
      timeline: [
        {
          id: nextId("lt"),
          title: "Lead created",
          detail: `${input.company} added to the pipeline.`,
          createdAt: now,
        },
      ],
      messages: [],
    };
    getDb().leads.unshift(lead);
    return lead;
  },
  async update(id: string, patch: Partial<Lead>): Promise<Lead> {
    await wait(120);
    const leads = getDb().leads;
    const index = leads.findIndex((lead) => lead.id === id);
    if (index === -1) throw new Error("Lead not found");
    leads[index] = { ...leads[index], ...patch, lastActivityAt: new Date().toISOString() };
    return leads[index];
  },
  async move(id: string, status: LeadStatus): Promise<Lead> {
    return this.update(id, { status });
  },
  async remove(id: string): Promise<void> {
    await wait(120);
    const db = getDb();
    db.leads = db.leads.filter((lead) => lead.id !== id);
  },
};
