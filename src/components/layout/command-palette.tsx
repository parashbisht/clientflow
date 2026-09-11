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
  const { clients, projects, invoices, leads } = useApp();

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
            ["/clients", "Clients"],
            ["/projects", "Projects"],
            ["/tasks", "Tasks"],
            ["/invoices", "Invoices"],
            ["/files", "Files"],
            ["/analytics", "Analytics"],
            ["/settings", "Settings"],
          ].map(([href, label]) => (
            <CommandItem key={href} onSelect={() => go(href)}>
              {label}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Clients">
          {clients.map((client) => (
            <CommandItem key={client.id} onSelect={() => go(`/clients/${client.id}`)}>
              {client.company}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Projects">
          {projects.map((project) => (
            <CommandItem key={project.id} onSelect={() => go(`/projects/${project.id}`)}>
              {project.name}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Leads">
          {leads.map((lead) => (
            <CommandItem key={lead.id} onSelect={() => go("/leads")}>
              {lead.company}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Invoices">
          {invoices.map((invoice) => (
            <CommandItem key={invoice.id} onSelect={() => go(`/invoices/${invoice.id}`)}>
              {invoice.number}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
