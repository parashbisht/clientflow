import type { LeadSource, LeadStatus } from "@/types";

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
