"use client";

import { useMemo } from "react";

import { useAppStore } from "@/stores/app-store";

export interface BusinessPickerRow {
  id: string;
  name: string;
  childId: string;
}

export function ActiveBusinessSwitcher({ businesses }: { businesses: readonly BusinessPickerRow[] }) {
  const activeChildId = useAppStore((s) => s.activeChildId);
  const activeBusinessId = useAppStore((s) => s.activeBusinessId);
  const setActiveBusinessId = useAppStore((s) => s.setActiveBusinessId);

  const options = useMemo(() => {
    if (!activeChildId) return [...businesses];
    return businesses.filter((b) => b.childId === activeChildId);
  }, [activeChildId, businesses]);

  return (
    <div className="rounded-2xl border border-border-subtle bg-background p-4 shadow-sm">
      <div className="text-xs font-semibold uppercase text-muted-foreground">Usaha aktif</div>
      <select
        value={activeBusinessId ?? ""}
        onChange={(e) => setActiveBusinessId(e.target.value || null)}
        className="mt-3 w-full rounded-xl border border-border-subtle px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
        aria-label="Pilih usaha aktif"
      >
        <option value="">Pilih Usaha</option>
        {options.map((business) => (
          <option key={business.id} value={business.id}>
            {business.name}
          </option>
        ))}
      </select>
    </div>
  );
}
