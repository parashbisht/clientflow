"use client";

import { ArrowRight, CircleDollarSign, Target, Trophy, UsersRound } from "lucide-react";
import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/common/page-header";
import { KpiCard } from "@/components/common/kpi-card";
import { PageSkeleton } from "@/components/common/skeletons";
import { EmptyState } from "@/components/common/empty-state";
import { LeadStatusBadge } from "@/components/common/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCompactCurrency, formatRelative, greetingForHour } from "@/lib/format";
import { useApp } from "@/store/app-store";

function DashboardOverview() {
  const { loading, error, currentUser, leads } = useApp();

  if (loading) return <PageSkeleton className="pt-4" />;

  if (error) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center text-sm text-muted-foreground">{error}</CardContent>
        </Card>
      </div>
    );
  }

  const openLeads = leads.filter((lead) => lead.status !== "won" && lead.status !== "lost");
  const pipelineValue = openLeads.reduce((sum, lead) => sum + lead.value, 0);
  const wonLeads = leads.filter((lead) => lead.status === "won");
  const wonValue = wonLeads.reduce((sum, lead) => sum + lead.value, 0);
  const latestLeads = [...leads]
    .sort((a, b) => new Date(b.lastActivityAt).getTime() - new Date(a.lastActivityAt).getTime())
    .slice(0, 5);
  const highestValueLeads = [...openLeads].sort((a, b) => b.value - a.value).slice(0, 3);

  return (
    <div className="space-y-6">
      <PageHeader
        title={`${greetingForHour(new Date().getHours())}, ${currentUser.name.split(" ")[0]}`}
        description="A clear view of your open opportunities and recent lead activity."
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Open pipeline"
          value={formatCompactCurrency(pipelineValue)}
          hint="Across active leads"
          icon={<CircleDollarSign className="size-4" />}
        />
        <KpiCard
          label="Open leads"
          value={String(openLeads.length)}
          hint="Not yet closed"
          icon={<UsersRound className="size-4" />}
        />
        <KpiCard
          label="Won"
          value={String(wonLeads.length)}
          hint={formatCompactCurrency(wonValue) + " closed"}
          icon={<Trophy className="size-4" />}
        />
        <KpiCard
          label="Total leads"
          value={String(leads.length)}
          hint="All pipeline stages"
          icon={<Target className="size-4" />}
        />
      </div>

      {leads.length === 0 ? (
        <EmptyState
          title="No leads yet"
          description="Add your first lead to see pipeline value and activity here."
          action={
            <Button size="sm" nativeButton={false} render={<Link href="/leads" />}>
              Open leads
            </Button>
          }
        />
      ) : (
        <div className="grid min-w-0 gap-6 lg:grid-cols-2">
          <Card className="min-w-0">
            <CardHeader className="flex flex-row items-center justify-between gap-3">
              <div>
                <CardTitle>Recent leads</CardTitle>
                <CardDescription>Latest updates across your pipeline</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="gap-1.5" nativeButton={false} render={<Link href="/leads" />}>
                View all <ArrowRight className="size-3.5" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-1">
              {latestLeads.map((lead) => (
                <Link key={lead.id} href={`/leads/${lead.id}`} className="flex min-w-0 items-center justify-between gap-3 rounded-md px-2 py-3 hover:bg-muted/60">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{lead.company}</p>
                    <p className="truncate text-xs text-muted-foreground">{lead.contactName}</p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <LeadStatusBadge status={lead.status} />
                    <span className="text-xs text-muted-foreground">{formatRelative(lead.lastActivityAt)}</span>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>

          <Card className="min-w-0">
            <CardHeader>
              <CardTitle>Highest-value opportunities</CardTitle>
              <CardDescription>Open leads by estimated value</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {highestValueLeads.length === 0 ? (
                <p className="py-3 text-sm text-muted-foreground">No open opportunities right now.</p>
              ) : highestValueLeads.map((lead) => (
                <Link key={lead.id} href={`/leads/${lead.id}`} className="flex min-w-0 items-center justify-between gap-3 rounded-md border p-3 hover:bg-muted/40">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{lead.company}</p>
                    <p className="truncate text-xs text-muted-foreground">{lead.contactName} · {lead.source}</p>
                  </div>
                  <span className="shrink-0 text-sm font-medium tabular-nums">{formatCompactCurrency(lead.value)}</span>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <AppShell>
      <DashboardOverview />
    </AppShell>
  );
}
