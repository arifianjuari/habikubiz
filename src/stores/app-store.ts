import { create } from "zustand";

import { SEED_CHILD_NAYA_ID, SEED_FIRST_BUSINESS_ID } from "@/lib/demo-context";

export type AppMode = "parent" | "child";

interface AppState {
  mode: AppMode;
  activeChildId: string | null;
  activeBusinessId: string | null;

  setMode: (mode: AppMode) => void;
  setActiveChildId: (childId: string | null) => void;
  setActiveBusinessId: (businessId: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  mode: "parent",
  activeChildId: SEED_CHILD_NAYA_ID,
  activeBusinessId: SEED_FIRST_BUSINESS_ID,

  setMode: (mode) => set({ mode }),
  setActiveChildId: (childId) => set({ activeChildId: childId }),
  setActiveBusinessId: (businessId) => set({ activeBusinessId: businessId }),
}));
