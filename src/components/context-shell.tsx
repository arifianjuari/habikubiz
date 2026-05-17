"use client";

import { ActiveBusinessSwitcher, type BusinessPickerRow } from "@/components/active-business-switcher";
import { ActiveChildSwitcher } from "@/components/active-child-switcher";
import type { ChildSummary } from "@/types/domain";
import { useAppStore } from "@/stores/app-store";

export function ContextShell({
  mode,
  childSummaries,
  businesses,
}: {
  mode: "parent" | "child";
  childSummaries: readonly ChildSummary[];
  businesses: readonly BusinessPickerRow[];
}) {
  const activeChildId = useAppStore((s) => s.activeChildId);
  const activeBusinessId = useAppStore((s) => s.activeBusinessId);
  const activeChild = childSummaries.find((c) => c.id === activeChildId);
  const activeBusiness = businesses.find((b) => b.id === activeBusinessId);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-2xl border border-border-subtle bg-background p-4 shadow-sm">
        <div className="text-xs font-semibold uppercase text-muted-foreground">Context saat ini</div>
        <div className="mt-3 flex flex-col gap-2 text-sm text-foreground">
          <div>
            <span className="font-semibold">Mode:</span> {mode === "parent" ? "Parent" : "Child"}
          </div>
          <div>
            <span className="font-semibold">Anak aktif:</span> {activeChild?.name ?? "Belum ada"}
          </div>
          <div>
            <span className="font-semibold">Usaha aktif:</span> {activeBusiness?.name ?? "Belum ada"}
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {mode === "parent" && <ActiveChildSwitcher childSummaries={childSummaries} businesses={businesses} />}
        <ActiveBusinessSwitcher businesses={businesses} />
      </div>
    </div>
  );
}
