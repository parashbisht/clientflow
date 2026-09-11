"use client";

import { cn } from "cn";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { TeamMember } from "@/types";

export function UserAvatar({
  member,
  size = "default",
  className,
}: {
  member?: Pick<TeamMember, "name" | "initials" | "color">;
  size?: "default" | "sm" | "lg";
  className?: string;
}) {
  if (!member) {
    return (
      <Avatar size={size} className={className}>
        <AvatarFallback>?</AvatarFallback>
      </Avatar>
    );
  }
  return (
    <Avatar size={size} className={className}>
      <AvatarFallback
        className="text-white"
        style={{ backgroundColor: member.color }}
      >
        {member.initials}
      </AvatarFallback>
    </Avatar>
  );
}

export function PersonCell({
  member,
  subtitle,
  className,
}: {
  member?: TeamMember;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2.5 min-w-0", className)}>
      <UserAvatar member={member} size="sm" />
      <div className="min-w-0">
        <p className="truncate text-sm font-medium">{member?.name ?? "Unassigned"}</p>
        {subtitle ? (
          <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
        ) : null}
      </div>
    </div>
  );
}
