"use client";

import { useEffect, useRef } from "react";

import type { AppSelectionBootstrap } from "@/server/repositories/profile.repository";
import { useAppStore } from "@/stores/app-store";

export function AppStateHydrator({ serverBootstrap }: { serverBootstrap: AppSelectionBootstrap | null }) {
  const applied = useRef(false);
  const setActiveChildId = useAppStore((s) => s.setActiveChildId);
  const setActiveBusinessId = useAppStore((s) => s.setActiveBusinessId);

  useEffect(() => {
    if (applied.current || serverBootstrap === null) {
      return;
    }
    applied.current = true;
    setActiveChildId(serverBootstrap.childId);
    setActiveBusinessId(serverBootstrap.businessId);
  }, [serverBootstrap, setActiveChildId, setActiveBusinessId]);

  return null;
}
