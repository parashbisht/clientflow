import { getDb, nextId, wait } from "@/data/db";
import type { Task, TaskStatus } from "@/types";

export type TaskInput = Omit<Task, "id" | "createdAt">;

export const tasksService = {
  async list(): Promise<Task[]> {
    await wait();
    return getDb().tasks;
  },
  async create(input: TaskInput): Promise<Task> {
    await wait(180);
    const task: Task = {
      ...input,
      id: nextId("t"),
      createdAt: new Date().toISOString(),
    };
    getDb().tasks.unshift(task);
    return task;
  },
  async update(id: string, patch: Partial<Task>): Promise<Task> {
    await wait(100);
    const tasks = getDb().tasks;
    const index = tasks.findIndex((task) => task.id === id);
    if (index === -1) throw new Error("Task not found");
    tasks[index] = { ...tasks[index], ...patch };
    return tasks[index];
  },
  async move(id: string, status: TaskStatus): Promise<Task> {
    return this.update(id, { status });
  },
  async remove(id: string): Promise<void> {
    await wait(100);
    const db = getDb();
    db.tasks = db.tasks.filter((task) => task.id !== id);
  },
};
