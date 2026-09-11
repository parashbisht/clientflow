"use client";

import { cn } from "cn";
import {
  BarChart3,
  Briefcase,
  CheckSquare,
  FileText,
  FolderOpen,
  LayoutDashboard,
  Receipt,
  Settings,
  Users,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserAvatar } from "@/components/common/user-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useApp } from "@/store/app-store";

const primary = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/leads", label: "Leads", icon: UsersRound },
  { href: "/clients", label: "Clients", icon: Users },
  { href: "/projects", label: "Projects", icon: Briefcase },
  { href: "/tasks", label: "Tasks", icon: CheckSquare },
  { href: "/invoices", label: "Invoices", icon: Receipt },
  { href: "/files", label: "Files", icon: FolderOpen },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
];

const workspace = [
  { href: "/team", label: "Team", icon: Users },
  { href: "/settings", label: "Settings", icon: Settings },
];

function NavLink({
  href,
  label,
  icon: Icon,
  onNavigate,
}: {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(`${href}/`);
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm transition-colors",
        active
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-sidebar-foreground/70 hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground",
      )}
    >
      <Icon className="size-4 shrink-0" />
      {label}
    </Link>
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/dashboard" className="flex items-center gap-2.5 px-2 py-1">
      <span className="flex size-7 items-center justify-center rounded-md bg-[oklch(0.72_0.07_150)] text-[oklch(0.18_0.02_55)]">
        <svg viewBox="0 0 24 24" className="size-4" fill="none" aria-hidden>
          <path
            d="M5 16.5 12 5.5l7 11H5Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <path d="M8.5 16.5h7" stroke="currentColor" strokeWidth="1.7" />
        </svg>
      </span>
      {compact ? null : (
        <span className="font-serif text-lg tracking-tight text-sidebar-accent-foreground">
          ClientFlow
        </span>
      )}
    </Link>
  );
}

export function Sidebar({
  onNavigate,
  className,
}: {
  onNavigate?: () => void;
  className?: string;
}) {
  const { currentUser } = useApp();

  return (
    <aside
      className={cn(
        "flex h-full w-[240px] shrink-0 flex-col bg-sidebar text-sidebar-foreground",
        className,
      )}
    >
      <div className="px-3 py-4">
        <Logo />
      </div>
      <ScrollArea className="flex-1 px-3">
        <nav className="grid gap-0.5" aria-label="Primary">
          {primary.map((item) => (
            <NavLink key={item.href} {...item} onNavigate={onNavigate} />
          ))}
        </nav>
        <p className="mt-6 mb-2 px-2 text-[11px] font-medium tracking-[0.14em] text-sidebar-foreground/40 uppercase">
          Workspace
        </p>
        <nav className="grid gap-0.5" aria-label="Workspace">
          {workspace.map((item) => (
            <NavLink key={item.href} {...item} onNavigate={onNavigate} />
          ))}
        </nav>
      </ScrollArea>
      <div className="border-t border-sidebar-border p-3">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex w-full items-center gap-2.5 rounded-md px-1 py-1 text-left hover:bg-sidebar-accent">
            <UserAvatar member={currentUser} size="sm" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm text-sidebar-accent-foreground">
                {currentUser.name}
              </p>
              <p className="truncate text-xs text-sidebar-foreground/55">{currentUser.role}</p>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" side="top" className="w-56">
            <DropdownMenuLabel>Workspace</DropdownMenuLabel>
            <DropdownMenuItem>Northline Studio</DropdownMenuItem>
            <DropdownMenuItem>Atelier Collective</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem render={<Link href="/settings" />}>
              Profile & settings
            </DropdownMenuItem>
            <DropdownMenuItem render={<Link href="/" />}>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
}

export const mobileNavItems = primary.slice(0, 5);
export const allNavItems = [...primary, ...workspace];
