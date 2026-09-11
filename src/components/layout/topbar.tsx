"use client";

import {
  Bell,
  CircleHelp,
  Menu,
  Plus,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { UserAvatar } from "@/components/common/user-avatar";
import { CommandPalette } from "@/components/layout/command-palette";
import { LeadFormDialog } from "@/components/leads/lead-form-dialog";
import { TaskFormDialog } from "@/components/tasks/task-form-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatRelative } from "@/lib/format";
import { useApp } from "@/store/app-store";
import { Sidebar } from "./sidebar";

export function Topbar({ onMenu }: { onMenu: () => void }) {
  const { currentUser, activities } = useApp();
  const router = useRouter();
  const [commandOpen, setCommandOpen] = useState(false);
  const [leadOpen, setLeadOpen] = useState(false);
  const [taskOpen, setTaskOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <>
      <header className="flex h-14 items-center gap-3 border-b bg-background/80 px-3 backdrop-blur-sm sm:px-5">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenu}
          aria-label="Open navigation"
        >
          <Menu />
        </Button>
        <button
          type="button"
          onClick={() => setCommandOpen(true)}
          className="flex h-8 min-w-0 flex-1 items-center gap-2 rounded-md border bg-card px-2.5 text-left text-sm text-muted-foreground transition-colors hover:bg-muted/60 sm:max-w-md"
        >
          <Search className="size-4 shrink-0" />
          <span className="truncate">Search clients, projects, invoices…</span>
          <kbd className="ml-auto hidden rounded border bg-background px-1.5 py-0.5 text-[10px] font-medium sm:inline">
            ⌘K
          </kbd>
        </button>
        <div className="ml-auto flex items-center gap-1">
          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger
                render={
                  <DropdownMenuTrigger
                    render={<Button variant="outline" size="sm" />}
                  />
                }
              >
                <Plus className="size-3.5" />
                <span className="hidden sm:inline">Create</span>
              </TooltipTrigger>
              <TooltipContent>Quick create</TooltipContent>
            </Tooltip>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLeadOpen(true)}>Lead</DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/clients")}>Client</DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/projects")}>Project</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTaskOpen(true)}>Task</DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/invoices")}>Invoice</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger
                render={
                  <DropdownMenuTrigger render={<Button variant="ghost" size="icon" />} />
                }
              >
                <Bell />
                <span className="sr-only">Notifications</span>
              </TooltipTrigger>
              <TooltipContent>Notifications</TooltipContent>
            </Tooltip>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {activities.slice(0, 5).map((activity) => (
                <DropdownMenuItem key={activity.id} className="flex-col items-start gap-0.5 py-2">
                  <span className="text-sm">{activity.title}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatRelative(activity.createdAt)}
                  </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Tooltip>
            <TooltipTrigger
              render={<Button variant="ghost" size="icon" onClick={() => setHelpOpen(true)} />}
            >
              <CircleHelp />
              <span className="sr-only">Help</span>
            </TooltipTrigger>
            <TooltipContent>Help</TooltipContent>
          </Tooltip>
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full">
              <UserAvatar member={currentUser} size="sm" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{currentUser.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem render={<Link href="/settings" />}>Settings</DropdownMenuItem>
              <DropdownMenuItem render={<Link href="/portal" />}>
                Open client portal
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  toast.message("Signed out of the demo");
                  router.push("/");
                }}
              >
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
      <LeadFormDialog open={leadOpen} onOpenChange={setLeadOpen} />
      <TaskFormDialog open={taskOpen} onOpenChange={setTaskOpen} />
      <Sheet open={helpOpen} onOpenChange={setHelpOpen}>
        <SheetContent side="right" className="sm:max-w-md">
          <SheetTitle className="p-4 pb-0">Help</SheetTitle>
          <div className="space-y-4 p-4 text-sm text-muted-foreground">
            <p>
              ClientFlow is a demo workspace. Create, edit, and move records in local
              state — nothing is sent to a server.
            </p>
            <p>
              Press <kbd className="rounded border px-1">⌘K</kbd> to search. Use Create
              to add a lead or task from anywhere.
            </p>
            <p>
              The client portal is a separate surface for Harbor & Pine. Open it from
              the user menu.
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export function MobileSidebar({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[240px] border-0 p-0 sm:max-w-[240px]" showCloseButton={false}>
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <Sidebar onNavigate={() => onOpenChange(false)} className="w-full" />
      </SheetContent>
    </Sheet>
  );
}
