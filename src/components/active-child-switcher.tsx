"use client";

import type { BusinessPickerRow } from "@/components/active-business-switcher";
import { updateLastActiveSelection } from "@/server/actions/profile-preferences.actions";
import type { ChildSummary } from "@/types/domain";
import { useAppStore } from "@/stores/app-store";

export function ActiveChildSwitcher({
  childSummaries,
  businesses,
}: {
  childSummaries: readonly ChildSummary[];
  businesses: readonly BusinessPickerRow[];
}) {
  const activeChildId = useAppStore((s) => s.activeChildId);
  const setActiveChildId = useAppStore((s) => s.setActiveChildId);
  const setActiveBusinessId = useAppStore((s) => s.setActiveBusinessId);

  return (
    <div className="rounded-2xl border border-border-subtle bg-background p-4 shadow-sm">
      <div className="text-xs font-semibold uppercase text-muted-foreground">Profil anak aktif</div>
      <select
        value={activeChildId ?? ""}
        onChange={(e) => {
          const v = e.target.value || null;
          setActiveChildId(v);
          const firstBiz = v ? (businesses.find((b) => b.childId === v)?.id ?? null) : null;
          setActiveBusinessId(firstBiz);
          void updateLastActiveSelection(v, firstBiz);
        }}
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
