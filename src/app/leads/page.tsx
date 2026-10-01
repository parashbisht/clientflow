"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/common/page-header";
import { EmptyState } from "@/components/common/empty-state";
import { BoardSkeleton } from "@/components/common/skeletons";
import { KanbanBoard, type KanbanColumn } from "@/components/common/kanban-board";
import { UserAvatar } from "@/components/common/user-avatar";
import { LeadFormDialog } from "@/components/leads/lead-form-dialog";
import { Button } from "@/components/ui/button";
import { SearchField } from "@/components/common/search-field";
import { SelectField } from "@/components/common/select-field";
import { LEAD_STATUSES, LEAD_STATUS_LABEL } from "@/lib/constants";
import { formatCompactCurrency, formatShortDate } from "@/lib/format";
import { useApp } from "@/store/app-store";
import type { Lead, LeadStatus } from "@/types";

const columns: KanbanColumn<LeadStatus>[] = LEAD_STATUSES.map((status) => ({
  id: status,
  label: LEAD_STATUS_LABEL[status],
}));

function LeadCard({ lead }: { lead: Lead }) {
  const { memberById } = useApp();
  const assignee = memberById(lead.assigneeId);
  return (
    <Link href={`/leads/${lead.id}`} className="block">
      <div className="rounded-lg border bg-card p-3 shadow-none transition-colors hover:border-foreground/20">
        <p className="truncate text-sm font-medium">{lead.company}</p>
        <p className="mt-0.5 truncate text-xs text-muted-foreground">{lead.contactName}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs font-medium tabular-nums">
            {formatCompactCurrency(lead.value)}
          </span>
          <UserAvatar member={assignee} size="sm" />
        </div>
        <p className="mt-2 text-[11px] text-muted-foreground">
          Updated {formatShortDate(lead.lastActivityAt)}
        </p>
      </div>
    </Link>
  );
}

function LeadsBoard() {
  const { loading, error, leads, moveLead } = useApp();
  const [createOpen, setCreateOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  const visibleLeads = useMemo(() => {
    const query = search.trim().toLowerCase();
    return leads
      .filter((lead) => statusFilter === "all" || lead.status === statusFilter)
      .filter((lead) => !query || [lead.company, lead.contactName, lead.email, lead.industry, lead.source]
        .some((value) => value.toLowerCase().includes(query)))
      .sort((a, b) => {
        if (sortBy === "company") return a.company.localeCompare(b.company);
        if (sortBy === "value-high") return b.value - a.value;
        if (sortBy === "value-low") return a.value - b.value;
        return new Date(b.lastActivityAt).getTime() - new Date(a.lastActivityAt).getTime();
      });
  }, [leads, search, sortBy, statusFilter]);

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader title="Leads" description="Track every opportunity from first contact to close." />
        <BoardSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-sm text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Leads"
        description={`${leads.length} leads in the pipeline`}
        actions={
          <Button size="sm" className="gap-1.5" onClick={() => setCreateOpen(true)}>
            <Plus className="size-3.5" />
            New lead
          </Button>
        }
      />

      {leads.length === 0 ? (
        <EmptyState
          title="No leads yet"
          description="Add your first lead to start tracking your pipeline."
          action={
            <Button size="sm" onClick={() => setCreateOpen(true)}>
              Add lead
            </Button>
          }
        />
      ) : (
        <>
          <div className="grid min-w-0 gap-2 sm:grid-cols-[minmax(0,1fr)_11rem_11rem]">
            <SearchField value={search} onChange={setSearch} placeholder="Search leads" />
            <SelectField
              value={statusFilter}
              onChange={setStatusFilter}
              placeholder="All statuses"
              options={[{ value: "all", label: "All statuses" }, ...columns.map((column) => ({ value: column.id, label: column.label }))]}
              className="w-full"
            />
            <SelectField
              value={sortBy}
              onChange={setSortBy}
              placeholder="Sort by"
              options={[
                { value: "recent", label: "Recently updated" },
                { value: "company", label: "Company name" },
                { value: "value-high", label: "Value: high to low" },
                { value: "value-low", label: "Value: low to high" },
              ]}
              className="w-full"
            />
          </div>
          {visibleLeads.length === 0 ? (
            <EmptyState
              icon="search"
              title="No matching leads"
              description="Try another search or clear the current filters."
              action={
                <Button size="sm" variant="outline" onClick={() => { setSearch(""); setStatusFilter("all"); }}>
                  Clear filters
                </Button>
              }
            />
          ) : (
            <KanbanBoard
              columns={statusFilter === "all" ? columns : columns.filter((column) => column.id === statusFilter)}
              items={visibleLeads}
              getStatus={(lead) => lead.status}
              onMove={(id, status) => moveLead(id, status)}
              renderCard={(lead) => <LeadCard lead={lead} />}
            />
          )}
        </>
      )}

      <LeadFormDialog open={createOpen} onOpenChange={setCreateOpen} />
    </div>
  );
}

export default function LeadsPage() {
  return (
    <AppShell>
      <LeadsBoard />
    </AppShell>
  );
}