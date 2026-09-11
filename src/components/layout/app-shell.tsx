"use client";

import { useEffect, useState } from "react";
import { MobileTabBar } from "@/components/layout/mobile-tab-bar";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileSidebar, Topbar } from "@/components/layout/topbar";
import { AppProvider } from "@/store/app-store";

function Shell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        document
          .querySelector<HTMLButtonElement>("header button, header [data-slot='button']")
          ?.blur();
        const search = document.querySelector<HTMLButtonElement>(
          "header button.flex.h-8, header button[type='button']",
        );
        search?.click();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="flex min-h-svh bg-background">
      <div className="hidden lg:block">
        <div className="sticky top-0 h-svh">
          <Sidebar />
        </div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onMenu={() => setMobileOpen(true)} />
        <MobileSidebar open={mobileOpen} onOpenChange={setMobileOpen} />
        <main className="flex-1 px-4 py-6 pb-24 sm:px-6 lg:px-8 lg:pb-8">{children}</main>
        <MobileTabBar />
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <Shell>{children}</Shell>
    </AppProvider>
  );
}
