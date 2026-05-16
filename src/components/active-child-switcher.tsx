"use client";

import { children } from "@/lib/mock-data";
import { useAppStore } from "@/stores/app-store";

export function ActiveChildSwitcher() {
  const { activeChildId, setActiveChildId } = useAppStore();

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="text-xs font-semibold uppercase text-[#6B7280]">Profil anak aktif</div>
      <select
        value={activeChildId ?? ""}
        onChange={(e) => setActiveChildId(e.target.value || null)}
        className="mt-3 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#4F46E5]"
      >
        <option value="">Pilih Anak</option>
        {children.map((child) => (
          <option key={child.id} value={child.id}>
            {child.name}
          </option>
        ))}
      </select>
    </div>
  );
}
