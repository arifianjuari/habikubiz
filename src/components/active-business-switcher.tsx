"use client";

import { businesses } from "@/lib/mock-data";
import { useAppStore } from "@/stores/app-store";

export function ActiveBusinessSwitcher() {
  const { activeBusinessId, setActiveBusinessId } = useAppStore();

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="text-xs font-semibold uppercase text-[#6B7280]">Usaha aktif</div>
      <select
        value={activeBusinessId ?? ""}
        onChange={(e) => setActiveBusinessId(e.target.value || null)}
        className="mt-3 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#4F46E5]"
      >
        <option value="">Pilih Usaha</option>
        {businesses.map((business) => (
          <option key={business.id} value={business.id}>
            {business.name}
          </option>
        ))}
      </select>
    </div>
  );
}
