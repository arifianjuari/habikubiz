import { create } from "zustand";

export type AppMode = "parent" | "child";

interface AppState {
  mode: AppMode;
  activeChildId: string | null;
  activeBusinessId: string | null;

  // Actions
  setMode: (mode: AppMode) => void;
  setActiveChildId: (childId: string | null) => void;
  setActiveBusinessId: (businessId: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  mode: "parent",
  activeChildId: "child-naya", // Default for demo
  activeBusinessId: "stiker-keren", // Default for demo

  setMode: (mode) => set({ mode }),
  setActiveChildId: (childId) => set({ activeChildId: childId }),
  setActiveBusinessId: (businessId) => set({ activeBusinessId: businessId }),
}));
