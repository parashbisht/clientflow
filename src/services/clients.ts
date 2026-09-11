import { getDb, nextId, wait } from "@/data/db";
import type { Client } from "@/types";

export type ClientInput = Omit<Client, "id" | "lastActivityAt" | "notes" | "since">;

export const clientsService = {
  async list(): Promise<Client[]> {
    await wait();
    return getDb().clients;
  },
  async get(id: string): Promise<Client | undefined> {
    await wait(120);
    return getDb().clients.find((client) => client.id === id);
  },
  async create(input: ClientInput): Promise<Client> {
    await wait(180);
    const now = new Date().toISOString();
    const client: Client = {
      ...input,
      id: nextId("c"),
      since: now.slice(0, 10),
      lastActivityAt: now,
      notes: [],
    };
    getDb().clients.unshift(client);
    return client;
  },
  async update(id: string, patch: Partial<Client>): Promise<Client> {
    await wait(120);
    const clients = getDb().clients;
    const index = clients.findIndex((client) => client.id === id);
    if (index === -1) throw new Error("Client not found");
    clients[index] = { ...clients[index], ...patch, lastActivityAt: new Date().toISOString() };
    return clients[index];
  },
  async addNote(id: string, body: string, authorId: string): Promise<Client> {
    const client = await this.get(id);
    if (!client) throw new Error("Client not found");
    client.notes.unshift({
      id: nextId("n"),
      body,
      authorId,
      createdAt: new Date().toISOString(),
    });
    return this.update(id, { notes: client.notes });
  },
};
