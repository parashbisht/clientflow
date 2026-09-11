"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";
import { clientsService, type ClientInput } from "@/services/clients";
import { filesService } from "@/services/files";
import { invoicesService } from "@/services/invoices";
import { leadsService, type LeadInput } from "@/services/leads";
import { projectsService, type ProjectInput } from "@/services/projects";
import { tasksService, type TaskInput } from "@/services/tasks";
import { activitiesService, analyticsService, teamService } from "@/services/files";
import type {
  Activity,
  Client,
  FileRecord,
  Invoice,
  InvoiceStatus,
  Lead,
  LeadStatus,
  Project,
  RevenuePoint,
  Task,
  TaskStatus,
  TeamMember,
} from "@/types";

interface AppState {
  loading: boolean;
  error: string | null;
  team: TeamMember[];
  leads: Lead[];
  clients: Client[];
  projects: Project[];
  tasks: Task[];
  invoices: Invoice[];
  files: FileRecord[];
  activities: Activity[];
  revenue: RevenuePoint[];
  currentUser: TeamMember;
}

interface AppActions {
  refresh: () => Promise<void>;
  createLead: (input: LeadInput) => Promise<Lead>;
  updateLead: (id: string, patch: Partial<Lead>) => Promise<void>;
  moveLead: (id: string, status: LeadStatus) => Promise<void>;
  deleteLead: (id: string) => Promise<void>;
  createClient: (input: ClientInput) => Promise<Client>;
  addClientNote: (id: string, body: string) => Promise<void>;
  createProject: (input: ProjectInput) => Promise<Project>;
  createTask: (input: TaskInput) => Promise<Task>;
  updateTask: (id: string, patch: Partial<Task>) => Promise<void>;
  moveTask: (id: string, status: TaskStatus) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  markInvoice: (id: string, status: InvoiceStatus) => Promise<void>;
  createInvoice: (input: Parameters<typeof invoicesService.create>[0]) => Promise<Invoice>;
  uploadFile: (input: Omit<FileRecord, "id" | "uploadedAt">) => Promise<void>;
  memberById: (id: string) => TeamMember | undefined;
  clientById: (id: string) => Client | undefined;
  projectById: (id: string) => Project | undefined;
}

type AppContextValue = AppState & AppActions;

const AppContext = createContext<AppContextValue | null>(null);

const fallbackUser: TeamMember = {
  id: "u_alex",
  name: "Alex Rivera",
  email: "alex@northline.studio",
  role: "Owner",
  title: "Founder",
  initials: "AR",
  color: "#3D5C4A",
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [files, setFiles] = useState<FileRecord[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [revenue, setRevenue] = useState<RevenuePoint[]>([]);

  const refresh = useCallback(async () => {
    try {
      setError(null);
      const [
        teamData,
        leadsData,
        clientsData,
        projectsData,
        tasksData,
        invoicesData,
        filesData,
        activitiesData,
        revenueData,
      ] = await Promise.all([
        teamService.list(),
        leadsService.list(),
        clientsService.list(),
        projectsService.list(),
        tasksService.list(),
        invoicesService.list(),
        filesService.list(),
        activitiesService.list(),
        analyticsService.revenue(),
      ]);
      setTeam([...teamData]);
      setLeads([...leadsData]);
      setClients([...clientsData]);
      setProjects([...projectsData]);
      setTasks([...tasksData]);
      setInvoices([...invoicesData]);
      setFiles([...filesData]);
      setActivities([...activitiesData]);
      setRevenue([...revenueData]);
    } catch {
      setError("We couldn’t load the workspace. Try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const currentUser = team.find((member) => member.id === "u_alex") ?? fallbackUser;

  const memberById = useCallback(
    (id: string) => team.find((member) => member.id === id),
    [team],
  );
  const clientById = useCallback(
    (id: string) => clients.find((client) => client.id === id),
    [clients],
  );
  const projectById = useCallback(
    (id: string) => projects.find((project) => project.id === id),
    [projects],
  );

  const createLead = useCallback(async (input: LeadInput) => {
    const lead = await leadsService.create(input);
    await activitiesService.add({
      type: "lead_created",
      title: `New lead: ${lead.company}`,
      detail: `${lead.contactName} added to the pipeline.`,
      actorId: currentUser.id,
      entityType: "lead",
      entityId: lead.id,
    });
    toast.success("Lead created", { description: lead.company });
    await refresh();
    return lead;
  }, [currentUser.id, refresh]);

  const updateLead = useCallback(async (id: string, patch: Partial<Lead>) => {
    await leadsService.update(id, patch);
    toast.success("Lead updated");
    await refresh();
  }, [refresh]);

  const moveLead = useCallback(async (id: string, status: LeadStatus) => {
    await leadsService.move(id, status);
    await refresh();
  }, [refresh]);

  const deleteLead = useCallback(async (id: string) => {
    await leadsService.remove(id);
    toast.success("Lead removed");
    await refresh();
  }, [refresh]);

  const createClient = useCallback(async (input: ClientInput) => {
    const client = await clientsService.create(input);
    toast.success("Client added", { description: client.company });
    await refresh();
    return client;
  }, [refresh]);

  const addClientNote = useCallback(async (id: string, body: string) => {
    await clientsService.addNote(id, body, currentUser.id);
    toast.success("Note saved");
    await refresh();
  }, [currentUser.id, refresh]);

  const createProject = useCallback(async (input: ProjectInput) => {
    const project = await projectsService.create(input);
    toast.success("Project created", { description: project.name });
    await refresh();
    return project;
  }, [refresh]);

  const createTask = useCallback(async (input: TaskInput) => {
    const task = await tasksService.create(input);
    toast.success("Task created", { description: task.title });
    await refresh();
    return task;
  }, [refresh]);

  const updateTask = useCallback(async (id: string, patch: Partial<Task>) => {
    await tasksService.update(id, patch);
    toast.success("Task updated");
    await refresh();
  }, [refresh]);

  const moveTask = useCallback(async (id: string, status: TaskStatus) => {
    await tasksService.move(id, status);
    await refresh();
  }, [refresh]);

  const deleteTask = useCallback(async (id: string) => {
    await tasksService.remove(id);
    toast.success("Task deleted");
    await refresh();
  }, [refresh]);

  const markInvoice = useCallback(async (id: string, status: InvoiceStatus) => {
    await invoicesService.updateStatus(id, status);
    toast.success(status === "paid" ? "Invoice marked as paid" : "Invoice updated");
    await refresh();
  }, [refresh]);

  const createInvoice = useCallback(async (input: Parameters<typeof invoicesService.create>[0]) => {
    const invoice = await invoicesService.create(input);
    toast.success("Invoice drafted", { description: invoice.number });
    await refresh();
    return invoice;
  }, [refresh]);

  const uploadFile = useCallback(async (input: Omit<FileRecord, "id" | "uploadedAt">) => {
    const file = await filesService.create(input);
    toast.success("File added", { description: file.name });
    await refresh();
  }, [refresh]);

  const value = useMemo<AppContextValue>(
    () => ({
      loading,
      error,
      team,
      leads,
      clients,
      projects,
      tasks,
      invoices,
      files,
      activities,
      revenue,
      currentUser,
      refresh,
      createLead,
      updateLead,
      moveLead,
      deleteLead,
      createClient,
      addClientNote,
      createProject,
      createTask,
      updateTask,
      moveTask,
      deleteTask,
      markInvoice,
      createInvoice,
      uploadFile,
      memberById,
      clientById,
      projectById,
    }),
    [
      loading,
      error,
      team,
      leads,
      clients,
      projects,
      tasks,
      invoices,
      files,
      activities,
      revenue,
      currentUser,
      refresh,
      createLead,
      updateLead,
      moveLead,
      deleteLead,
      createClient,
      addClientNote,
      createProject,
      createTask,
      updateTask,
      moveTask,
      deleteTask,
      markInvoice,
      createInvoice,
      uploadFile,
      memberById,
      clientById,
      projectById,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
