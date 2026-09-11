"use client";

import { ArrowRight, Briefcase, CheckSquare, CircleDollarSign, Sparkles, TrendingUp } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/common/page-header";
import { KpiCard } from "@/components/common/kpi-card";
import { PageSkeleton } from "@/components/common/skeletons";
import { LeadStatusBadge, ProjectStatusBadge } from "@/components/common/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCompactCurrency, formatCurrency, formatDate, greetingForHour } from "@/lib/format";
import { useApp } from "@/store/app-store";

function DashboardOverview() {
  const { loading, error, currentUser, leads, clients, projects, tasks, invoices } = useApp();

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

  const activeProjects = projects.filter(
    (project) =>
      project.status === "planning" ||
      project.status === "active" ||
      project.status === "review",
  );

  const pipelineValue = leads
    .filter((lead) => lead.status !== "lost")
    .reduce((sum, lead) => sum + lead.value, 0);

  const bookedRevenue = projects.reduce((sum, project) => sum + project.budget, 0);
  const paidInvoices = invoices.filter((invoice) => invoice.status === "paid");
  const invoiceVolume = paidInvoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const deliveryHealth = tasks.length
    ? Math.round((tasks.filter((task) => task.status === "done").length / tasks.length) * 100)
    : 0;

  const upcomingProjects = [...projects]
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
    .slice(0, 3);

  const priorityLeads = [...leads]
    .sort((a, b) => b.value - a.value)
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <PageHeader
        title={`${greetingForHour(new Date().getHours())}, ${currentUser.name.split(" ")[0]}`}
        description="Here’s the current studio snapshot, including active projects, pipeline value, and delivery health."
        actions={
          <Button variant="outline" size="sm" className="gap-2">
            <Sparkles className="size-3.5" />
            Export report
          </Button>
        }
      />

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Pipeline"
          value={formatCompactCurrency(pipelineValue)}
          change={18.4}
          hint="Across active leads"
          icon={<TrendingUp className="size-4" />}
        />
        <KpiCard
          label="Bookings"
          value={formatCompactCurrency(bookedRevenue)}
          change={11.2}
          hint="Current project value"
          icon={<Briefcase className="size-4" />}
        />
        <KpiCard
          label="Paid invoices"
          value={formatCompactCurrency(invoiceVolume)}
          change={7.8}
          hint="This year"
          icon={<CircleDollarSign className="size-4" />}
        />
        <KpiCard
          label="Delivery health"
          value={`${deliveryHealth}%`}
          change={4.6}
          hint="Task completion"
          icon={<CheckSquare className="size-4" />}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <div>
                <CardTitle>Active projects</CardTitle>
                <CardDescription>{activeProjects.length} projects in flight</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="gap-1.5">
                View all <ArrowRight className="size-3.5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingProjects.map((project) => {
              const client = clients.find((item) => item.id === project.clientId);
              return (
                <div key={project.id} className="rounded-xl border bg-card/50 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-medium text-foreground">{project.name}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {client?.company ?? "Client"} • Due {formatDate(project.deadline)}
                      </p>
                    </div>
                    <ProjectStatusBadge status={project.status} />
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{project.progress}% complete</span>
                    <span>{formatCurrency(project.spent)} / {formatCurrency(project.budget)}</span>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <div>
                <CardTitle>Pipeline</CardTitle>
                <CardDescription>Highest-value opportunities</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {priorityLeads.map((lead) => (
              <div key={lead.id} className="rounded-xl border bg-card/50 p-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate font-medium text-foreground">{lead.company}</p>
                    <p className="text-xs text-muted-foreground">{lead.contactName}</p>
                  </div>
                  <LeadStatusBadge status={lead.status} />
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{formatCompactCurrency(lead.value)}</span>
                  <span>{lead.source}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming work</CardTitle>
            <CardDescription>{tasks.length} tracked tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {tasks.slice(0, 4).map((task) => (
              <div key={task.id} className="rounded-xl border bg-card/50 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-foreground">{task.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {task.tags[0] ?? "General"} • Due {formatDate(task.dueDate)}
                    </p>
                  </div>
                  <span className="rounded-full border bg-muted px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                    {task.status}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Studio summary</CardTitle>
            <CardDescription>Key operating metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>Active clients</span>
              <span className="font-medium text-foreground">{clients.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Open leads</span>
              <span className="font-medium text-foreground">{leads.filter((lead) => lead.status !== "lost").length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Invoices paid</span>
              <span className="font-medium text-foreground">{paidInvoices.length}</span>
            </div>
          </CardContent>
        </Card>
      </div>
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
