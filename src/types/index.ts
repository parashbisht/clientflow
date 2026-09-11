export type UserRole =
  | "Owner"
  | "Admin"
  | "Client Partner"
  | "Project Manager"
  | "Design Lead"
  | "Engineer"
  | "Client";

export type LeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "proposal"
  | "won"
  | "lost";

export type LeadSource =
  | "Referral"
  | "Website"
  | "LinkedIn"
  | "Conference"
  | "Inbound"
  | "Partner";

export type ClientStatus = "active" | "onboarding" | "paused" | "churned";

export type ProjectStatus =
  | "planning"
  | "active"
  | "review"
  | "completed"
  | "on_hold";

export type TaskStatus = "backlog" | "todo" | "in_progress" | "review" | "done";

export type TaskPriority = "low" | "medium" | "high" | "urgent";

export type InvoiceStatus = "draft" | "pending" | "paid" | "overdue";

export type FileKind = "pdf" | "figma" | "image" | "spreadsheet" | "doc" | "video";

export type ActivityType =
  | "invoice_paid"
  | "lead_created"
  | "task_completed"
  | "client_message"
  | "project_update"
  | "file_uploaded"
  | "note_added"
  | "status_change";

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  title: string;
  initials: string;
  color: string;
}

export interface Note {
  id: string;
  body: string;
  authorId: string;
  createdAt: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  detail: string;
  createdAt: string;
  authorId?: string;
}

export interface Lead {
  id: string;
  company: string;
  contactName: string;
  email: string;
  phone: string;
  source: LeadSource;
  status: LeadStatus;
  value: number;
  assigneeId: string;
  lastActivityAt: string;
  createdAt: string;
  website: string;
  industry: string;
  notes: Note[];
  timeline: TimelineEvent[];
  messages: { id: string; subject: string; preview: string; createdAt: string }[];
  taskTitles: string[];
}

export interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: ClientStatus;
  industry: string;
  website: string;
  location: string;
  since: string;
  lastActivityAt: string;
  ownerId: string;
  notes: Note[];
}

export interface Project {
  id: string;
  name: string;
  clientId: string;
  status: ProjectStatus;
  progress: number;
  deadline: string;
  startDate: string;
  budget: number;
  spent: number;
  teamIds: string[];
  description: string;
  milestones: { id: string; title: string; date: string; done: boolean }[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId: string;
  dueDate: string;
  projectId: string;
  clientId: string;
  tags: string[];
  createdAt: string;
}

export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

export interface Invoice {
  id: string;
  number: string;
  clientId: string;
  projectId?: string;
  amount: number;
  taxRate: number;
  issueDate: string;
  dueDate: string;
  status: InvoiceStatus;
  lineItems: InvoiceLineItem[];
  notes: string;
}

export interface FileRecord {
  id: string;
  name: string;
  type: FileKind;
  size: string;
  uploadedById: string;
  uploadedAt: string;
  clientId?: string;
  projectId?: string;
  folder: string;
}

export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  detail: string;
  createdAt: string;
  actorId: string;
  entityType?: "lead" | "client" | "project" | "invoice" | "task" | "file";
  entityId?: string;
}

export interface RevenuePoint {
  month: string;
  revenue: number;
  expenses: number;
}

export interface Workspace {
  id: string;
  name: string;
  plan: string;
  region: string;
}

export interface AppDatabase {
  currentUserId: string;
  workspaces: Workspace[];
  team: TeamMember[];
  leads: Lead[];
  clients: Client[];
  projects: Project[];
  tasks: Task[];
  invoices: Invoice[];
  files: FileRecord[];
  activities: Activity[];
  revenue: RevenuePoint[];
}
