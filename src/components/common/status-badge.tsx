"use client";

import { cn } from "cn";
import { Badge } from "@/components/ui/badge";
import {
  LEAD_STATUS_LABEL,
} from "@/lib/constants";
import type { LeadStatus } from "@/types";

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
