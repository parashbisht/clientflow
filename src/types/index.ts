export type UserRole =
  | "Owner"
  | "Client Partner"
  | "Project Manager"
  | "Design Lead"
  | "Engineer";

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

export type ActivityType = "lead_created";

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
}

export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  detail: string;
  createdAt: string;
  actorId: string;
  entityType?: "lead";
  entityId?: string;
}

export interface AppDatabase {
  currentUserId: string;
  team: TeamMember[];
  leads: Lead[];
  activities: Activity[];
}
