import { getDb, nextId, wait } from "@/data/db";
import type { Project } from "@/types";

export type ProjectInput = Omit<Project, "id" | "progress" | "spent" | "milestones">;

export const projectsService = {
  async list(): Promise<Project[]> {
    await wait();
    return getDb().projects;
  },
  async get(id: string): Promise<Project | undefined> {
    await wait(120);
    return getDb().projects.find((project) => project.id === id);
  },
  async create(input: ProjectInput): Promise<Project> {
    await wait(180);
    const project: Project = {
      ...input,
      id: nextId("p"),
      progress: 0,
      spent: 0,
      milestones: [],
    };
    getDb().projects.unshift(project);
    return project;
  },
  async update(id: string, patch: Partial<Project>): Promise<Project> {
    await wait(120);
    const projects = getDb().projects;
    const index = projects.findIndex((project) => project.id === id);
    if (index === -1) throw new Error("Project not found");
    projects[index] = { ...projects[index], ...patch };
    return projects[index];
  },
};
