"use client";

import type { ChildSummary } from "@/types/domain";
import { useAppStore } from "@/stores/app-store";

export function ActiveChildSwitcher({ childSummaries }: { childSummaries: readonly ChildSummary[] }) {
  const activeChildId = useAppStore((s) => s.activeChildId);
  const setActiveChildId = useAppStore((s) => s.setActiveChildId);

  return (
    <div className="rounded-2xl border border-border-subtle bg-background p-4 shadow-sm">
      <div className="text-xs font-semibold uppercase text-muted-foreground">Profil anak aktif</div>
      <select
        value={activeChildId ?? ""}
        onChange={(e) => setActiveChildId(e.target.value || null)}
        className="mt-3 w-full rounded-xl border border-border-subtle px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
        aria-label="Pilih profil anak"
      >
        <option value="">Pilih Anak</option>
        {childSummaries.map((child) => (
          <option key={child.id} value={child.id}>
            {child.name}
          </option>
        ))}
      </select>
    </div>
  );
}
