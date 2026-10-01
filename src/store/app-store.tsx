"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";
import { leadsService, type LeadInput } from "@/services/leads";
import { seed } from "@/data/seed";
import type {
  Activity,
  Lead,
  LeadStatus,
  TeamMember,
} from "@/types";

interface AppState {
  loading: boolean;
  error: string | null;
  team: TeamMember[];
  leads: Lead[];
  activities: Activity[];
  currentUser: TeamMember;
}

interface AppActions {
  refresh: () => Promise<void>;
  createLead: (input: LeadInput) => Promise<Lead>;
  updateLead: (id: string, patch: Partial<Lead>) => Promise<void>;
  moveLead: (id: string, status: LeadStatus) => Promise<void>;
  deleteLead: (id: string) => Promise<void>;
  memberById: (id: string) => TeamMember | undefined;
}

type AppContextValue = AppState & AppActions;

const AppContext = createContext<AppContextValue | null>(null);

const fallbackUser: TeamMember = {
  id: "u_alex",
  name: "Alex Rivera",
  email: "alex@northline.studio",
  role: "Owner",
  title: "Founder",
  initials: "AR",
  color: "#3D5C4A",
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [activities, setActivities] = useState<Activity[]>(seed.activities);

  const refresh = useCallback(async () => {
    try {
      const [leadsData] = await Promise.all([leadsService.list()]);
      setError(null);
      setTeam([...seed.team]);
      setLeads([...leadsData]);
    } catch {
      setError("We couldn’t load the workspace. Try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;

    async function loadInitialData() {
      try {
        const leadsData = await leadsService.list();
        if (!active) return;
        setTeam([...seed.team]);
        setLeads([...leadsData]);
      } catch {
        if (active) setError("We couldn’t load the workspace. Try again.");
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadInitialData();
    return () => {
      active = false;
    };
  }, []);

  const currentUser = team.find((member) => member.id === "u_alex") ?? fallbackUser;

  const memberById = useCallback(
    (id: string) => team.find((member) => member.id === id),
    [team],
  );
  const createLead = useCallback(async (input: LeadInput) => {
    const lead = await leadsService.create(input);
    const activity: Activity = {
      id: `a_${Date.now()}`,
      type: "lead_created",
      title: `New lead: ${lead.company}`,
      detail: `${lead.contactName} added to the pipeline.`,
      createdAt: new Date().toISOString(),
      actorId: currentUser.id,
      entityType: "lead",
      entityId: lead.id,
    };
    setActivities((current) => [activity, ...current]);
    toast.success("Lead created", { description: lead.company });
    await refresh();
    return lead;
  }, [currentUser.id, refresh]);

  const updateLead = useCallback(async (id: string, patch: Partial<Lead>) => {
    await leadsService.update(id, patch);
    toast.success("Lead updated");
    await refresh();
  }, [refresh]);

  const moveLead = useCallback(async (id: string, status: LeadStatus) => {
    await leadsService.move(id, status);
    await refresh();
  }, [refresh]);

  const deleteLead = useCallback(async (id: string) => {
    await leadsService.remove(id);
    toast.success("Lead removed");
    await refresh();
  }, [refresh]);

  const value = useMemo<AppContextValue>(
    () => ({
      loading,
      error,
      team,
      leads,
      activities,
      currentUser,
      refresh,
      createLead,
      updateLead,
      moveLead,
      deleteLead,
      memberById,
    }),
    [
      loading,
      error,
      team,
      leads,
      activities,
      currentUser,
      refresh,
      createLead,
      updateLead,
      moveLead,
      deleteLead,
      memberById,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
