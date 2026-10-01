"use client";

import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useApp } from "@/store/app-store";

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const { leads } = useApp();

  function go(href: string) {
    router.push(href);
    onOpenChange(false);
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search workspace…" />
      <CommandList>
        <CommandEmpty>No matches.</CommandEmpty>
        <CommandGroup heading="Pages">
          {[
            ["/dashboard", "Dashboard"],
            ["/leads", "Leads"],
          ].map(([href, label]) => (
            <CommandItem key={href} onSelect={() => go(href)}>
              {label}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Leads">
          {leads.map((lead) => (
            <CommandItem key={lead.id} onSelect={() => go(`/leads/${lead.id}`)}>
              {lead.company}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
