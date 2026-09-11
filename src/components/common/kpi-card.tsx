"use client";

import { cn } from "cn";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

export function KpiCard({
  label,
  value,
  change,
  hint,
  icon,
}: {
  label: string;
  value: string;
  change: number;
  hint: string;
  icon?: ReactNode;
}) {
  const up = change >= 0;
  return (
    <Card size="sm" className="shadow-none">
      <CardContent className="pt-1">
        <div className="flex items-start justify-between gap-3">
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            {label}
          </p>
          {icon ? (
            <span className="text-muted-foreground">{icon}</span>
          ) : null}
        </div>
        <p className="mt-3 font-heading text-2xl tracking-tight tabular-nums">{value}</p>
        <div className="mt-2 flex items-center gap-2 text-xs">
          <span
            className={cn(
              "inline-flex items-center gap-0.5 font-medium",
              up ? "text-[oklch(0.42_0.08_155)]" : "text-destructive",
            )}
          >
            {up ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
            {up ? "+" : ""}
            {change.toFixed(1)}%
          </span>
          <span className="text-muted-foreground">{hint}</span>
        </div>
      </CardContent>
    </Card>
  );
}
