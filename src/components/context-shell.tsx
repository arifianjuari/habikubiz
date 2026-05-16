"use client";

import { ActiveBusinessSwitcher } from "@/components/active-business-switcher";
import { ActiveChildSwitcher } from "@/components/active-child-switcher";
import { getBusinessById, getChildById } from "@/lib/mock-data";
import { useAppStore } from "@/stores/app-store";

export function ContextShell({ mode }: { mode: "parent" | "child" }) {
  const { activeChildId, activeBusinessId } = useAppStore();
  const activeChild = getChildById(activeChildId ?? "");
  const activeBusiness = getBusinessById(activeBusinessId ?? "");

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="text-xs font-semibold uppercase text-[#6B7280]">Context saat ini</div>
        <div className="mt-3 space-y-2 text-sm text-[#111827]">
          <div><span className="font-semibold">Mode:</span> {mode === "parent" ? "Parent" : "Child"}</div>
          <div><span className="font-semibold">Anak aktif:</span> {activeChild?.name ?? "Belum ada"}</div>
          <div><span className="font-semibold">Usaha aktif:</span> {activeBusiness?.name ?? "Belum ada"}</div>
        </div>
      </div>

      <div className="grid gap-4">
        {mode === "parent" && <ActiveChildSwitcher />}
        <ActiveBusinessSwitcher />
      </div>
    </div>
  );
}
