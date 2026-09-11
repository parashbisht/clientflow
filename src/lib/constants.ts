import type {
  ClientStatus,
  InvoiceStatus,
  LeadSource,
  LeadStatus,
  ProjectStatus,
  TaskPriority,
  TaskStatus,
} from "@/types";

export const LEAD_STATUSES: LeadStatus[] = [
  "new",
  "contacted",
  "qualified",
  "proposal",
  "won",
  "lost",
];

export const LEAD_STATUS_LABEL: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  proposal: "Proposal",
  won: "Won",
  lost: "Lost",
};

export const LEAD_SOURCES: LeadSource[] = [
  "Referral",
  "Website",
  "LinkedIn",
  "Conference",
  "Inbound",
  "Partner",
];

export const TASK_STATUSES: TaskStatus[] = [
  "backlog",
  "todo",
  "in_progress",
  "review",
  "done",
];

export const TASK_STATUS_LABEL: Record<TaskStatus, string> = {
  backlog: "Backlog",
  todo: "Todo",
  in_progress: "In Progress",
  review: "Review",
  done: "Done",
};

export const TASK_PRIORITIES: TaskPriority[] = ["low", "medium", "high", "urgent"];

export const TASK_PRIORITY_LABEL: Record<TaskPriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  urgent: "Urgent",
};

export const PROJECT_STATUS_LABEL: Record<ProjectStatus, string> = {
  planning: "Planning",
  active: "Active",
  review: "Review",
  completed: "Completed",
  on_hold: "On hold",
};

export const CLIENT_STATUS_LABEL: Record<ClientStatus, string> = {
  active: "Active",
  onboarding: "Onboarding",
  paused: "Paused",
  churned: "Churned",
};

export const INVOICE_STATUS_LABEL: Record<InvoiceStatus, string> = {
  draft: "Draft",
  pending: "Pending",
  paid: "Paid",
  overdue: "Overdue",
};
