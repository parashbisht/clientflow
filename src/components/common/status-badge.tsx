"use client";

import { cn } from "cn";
import { Badge } from "@/components/ui/badge";
import {
  CLIENT_STATUS_LABEL,
  INVOICE_STATUS_LABEL,
  LEAD_STATUS_LABEL,
  PROJECT_STATUS_LABEL,
  TASK_PRIORITY_LABEL,
  TASK_STATUS_LABEL,
} from "@/lib/constants";
import type {
  ClientStatus,
  InvoiceStatus,
  LeadStatus,
  ProjectStatus,
  TaskPriority,
  TaskStatus,
} from "@/types";

const tone: Record<string, string> = {
  sage: "border-transparent bg-[oklch(0.93_0.03_155)] text-[oklch(0.32_0.06_155)]",
  gold: "border-transparent bg-[oklch(0.94_0.04_80)] text-[oklch(0.4_0.08_55)]",
  sky: "border-transparent bg-[oklch(0.93_0.03_240)] text-[oklch(0.35_0.06_240)]",
  rose: "border-transparent bg-[oklch(0.94_0.03_20)] text-[oklch(0.45_0.12_20)]",
  slate: "border-transparent bg-muted text-muted-foreground",
  ink: "border-transparent bg-foreground/90 text-background",
};

export function StatusBadge({
  label,
  toneName = "slate",
  className,
}: {
  label: string;
  toneName?: keyof typeof tone;
  className?: string;
}) {
  return (
    <Badge variant="outline" className={cn("font-medium capitalize", tone[toneName], className)}>
      {label}
    </Badge>
  );
}

export function LeadStatusBadge({ status }: { status: LeadStatus }) {
  const map: Record<LeadStatus, keyof typeof tone> = {
    new: "sky",
    contacted: "gold",
    qualified: "sage",
    proposal: "ink",
    won: "sage",
    lost: "slate",
  };
  return <StatusBadge label={LEAD_STATUS_LABEL[status]} toneName={map[status]} />;
}

export function ClientStatusBadge({ status }: { status: ClientStatus }) {
  const map: Record<ClientStatus, keyof typeof tone> = {
    active: "sage",
    onboarding: "gold",
    paused: "slate",
    churned: "rose",
  };
  return <StatusBadge label={CLIENT_STATUS_LABEL[status]} toneName={map[status]} />;
}

export function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
  const map: Record<ProjectStatus, keyof typeof tone> = {
    planning: "gold",
    active: "sage",
    review: "sky",
    completed: "ink",
    on_hold: "slate",
  };
  return <StatusBadge label={PROJECT_STATUS_LABEL[status]} toneName={map[status]} />;
}

export function TaskStatusBadge({ status }: { status: TaskStatus }) {
  return <StatusBadge label={TASK_STATUS_LABEL[status]} />;
}

export function PriorityBadge({ priority }: { priority: TaskPriority }) {
  const map: Record<TaskPriority, keyof typeof tone> = {
    low: "slate",
    medium: "sky",
    high: "gold",
    urgent: "rose",
  };
  return <StatusBadge label={TASK_PRIORITY_LABEL[priority]} toneName={map[priority]} />;
}

export function InvoiceStatusBadge({ status }: { status: InvoiceStatus }) {
  const map: Record<InvoiceStatus, keyof typeof tone> = {
    draft: "slate",
    pending: "gold",
    paid: "sage",
    overdue: "rose",
  };
  return <StatusBadge label={INVOICE_STATUS_LABEL[status]} toneName={map[status]} />;
}
