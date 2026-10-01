"use client";

import { ArrowLeft, Mail, Phone, Trash2 } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { LeadStatusBadge } from "@/components/common/status-badge";
import { UserAvatar } from "@/components/common/user-avatar";
import { PageSkeleton } from "@/components/common/skeletons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { LEAD_STATUSES, LEAD_STATUS_LABEL } from "@/lib/constants";
import { formatCompactCurrency, formatDate, formatRelative } from "@/lib/format";
import { useApp } from "@/store/app-store";

function LeadDetail({ id }: { id: string }) {
  const router = useRouter();
  const { loading, leads, memberById, moveLead, deleteLead, updateLead, currentUser } = useApp();
  const [note, setNote] = useState("");
  const [savingNote, setSavingNote] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (loading) return <PageSkeleton />;

  const lead = leads.find((item) => item.id === id);
  if (!lead) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 text-center">
        <p className="text-sm font-medium">Lead not found</p>
        <Button variant="outline" size="sm" onClick={() => router.push("/leads")}>
          Back to leads
        </Button>
      </div>
    );
  }

  const currentLead = lead;
  const assignee = memberById(currentLead.assigneeId);

  async function handleAddNote() {
    if (!note.trim()) return;
    setSavingNote(true);
    try {
      await updateLead(currentLead.id, {
        notes: [
          { id: `n_${Date.now()}`, body: note.trim(), authorId: currentUser.id, createdAt: new Date().toISOString() },
          ...currentLead.notes,
        ],
      });
      setNote("");
    } finally {
      setSavingNote(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/leads"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          Back to leads
        </Link>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="font-heading text-2xl tracking-tight">{lead.company}</h1>
            <LeadStatusBadge status={lead.status} />
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {lead.contactName} • {lead.industry || "Unlisted industry"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={lead.status}
            onChange={(e) => moveLead(lead.id, e.target.value as (typeof LEAD_STATUSES)[number])}
            className="h-9 rounded-md border bg-background px-3 text-sm"
          >
            {LEAD_STATUSES.map((status) => (
              <option key={status} value={status}>
                {LEAD_STATUS_LABEL[status]}
              </option>
            ))}
          </select>
          <Button
            variant="outline"
            size="icon"
            className="text-destructive"
            onClick={() => setConfirmDelete(true)}
            aria-label="Delete lead"
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>

      <div className="grid min-w-0 gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="min-w-0 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Add a note about this lead..."
                  className="min-h-20"
                />
                <div className="flex justify-end">
                  <Button size="sm" disabled={!note.trim() || savingNote} onClick={handleAddNote}>
                    {savingNote ? "Saving..." : "Add note"}
                  </Button>
                </div>
              </div>
              {lead.notes.length === 0 ? (
                <p className="text-sm text-muted-foreground">No notes yet.</p>
              ) : (
                <div className="space-y-3">
                  {lead.notes.map((item) => {
                    const author = memberById(item.authorId);
                    return (
                      <div key={item.id} className="rounded-lg border bg-card/50 p-3">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-medium">{author?.name ?? "Team"}</p>
                          <p className="text-xs text-muted-foreground">{formatRelative(item.createdAt)}</p>
                        </div>
                        <p className="mt-1.5 text-sm text-muted-foreground">{item.body}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              {lead.timeline.length === 0 ? (
                <p className="text-sm text-muted-foreground">No activity yet.</p>
              ) : (
                <div className="space-y-4">
                  {lead.timeline.map((event) => (
                    <div key={event.id} className="flex gap-3">
                      <div className="mt-1.5 size-1.5 shrink-0 rounded-full bg-muted-foreground/40" />
                      <div>
                        <p className="text-sm font-medium">{event.title}</p>
                        <p className="text-sm text-muted-foreground">{event.detail}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">{formatRelative(event.createdAt)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="min-w-0 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Deal value</span>
                <span className="font-medium tabular-nums">{formatCompactCurrency(lead.value)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Source</span>
                <span className="font-medium">{lead.source}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Created</span>
                <span className="font-medium">{formatDate(lead.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <UserAvatar member={assignee} size="sm" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{assignee?.name ?? "Unassigned"}</p>
                  <p className="text-xs text-muted-foreground">Assignee</p>
                </div>
              </div>
              <div className="space-y-1.5 border-t pt-3">
                {lead.email ? (
                  <a href={`mailto:${lead.email}`} className="flex min-w-0 items-center gap-2 text-sm hover:underline">
                    <Mail className="size-3.5 shrink-0 text-muted-foreground" />
                    <span className="min-w-0 break-all">{lead.email}</span>
                  </a>
                ) : null}
                {lead.phone ? (
                  <a href={`tel:${lead.phone}`} className="flex min-w-0 items-center gap-2 text-sm hover:underline">
                    <Phone className="size-3.5 shrink-0 text-muted-foreground" />
                    <span className="min-w-0 break-all">{lead.phone}</span>
                  </a>
                ) : null}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Messages</CardTitle>
            </CardHeader>
            <CardContent>
              {lead.messages.length === 0 ? (
                <p className="text-sm text-muted-foreground">No messages yet.</p>
              ) : (
                <div className="space-y-3">
                  {lead.messages.map((message) => (
                    <div key={message.id} className="rounded-lg border bg-card/50 p-3">
                      <p className="text-sm font-medium">{message.subject}</p>
                      <p className="mt-1 truncate text-xs text-muted-foreground">{message.preview}</p>
                      <p className="mt-1.5 text-xs text-muted-foreground">{formatRelative(message.createdAt)}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <ConfirmDialog
        open={confirmDelete}
        onOpenChange={setConfirmDelete}
        title="Delete this lead?"
        description={`${lead.company} will be permanently removed from your pipeline.`}
        confirmLabel="Delete"
        destructive
        onConfirm={async () => {
          await deleteLead(lead.id);
          router.push("/leads");
        }}
      />
    </div>
  );
}

export default function LeadDetailPage() {
  const params = useParams<{ id: string }>();
  return (
    <AppShell>
      <LeadDetail id={params.id} />
    </AppShell>
  );
}