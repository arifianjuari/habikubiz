import { Suspense } from "react";

import { listBusinessOverviews } from "@/server/repositories/business.repository";
import { listChildSummaries } from "@/server/repositories/child.repository";
import { getParentDashboardRows } from "@/server/repositories/parent-dashboard.repository";

import { ParentDashboardClient } from "./parent-dashboard-client";
import ParentDashboardLoading from "./loading";

const recentComments = [
  "Coba cek lagi biaya bahan baku stiker. Apakah lem sudah masuk HPP?",
  "Bagus, pemasukan sudah dicatat rapi. Sekarang cek stok produk.",
] as const;

async function ParentDashboardBody() {
  const [rows, childSummaries, businesses] = await Promise.all([
    getParentDashboardRows(),
    listChildSummaries(),
    listBusinessOverviews(),
  ]);

  const businessPickerRows = businesses.map((b) => ({
    id: b.id,
    name: b.name,
    childId: b.childId,
  }));

  return (
    <ParentDashboardClient
      initialRows={rows}
      recentComments={recentComments}
      childSummaries={childSummaries}
      businessPickerRows={businessPickerRows}
    />
  );
}

export default function ParentDashboardPage() {
  return (
    <Suspense fallback={<ParentDashboardLoading />}>
      <ParentDashboardBody />
    </Suspense>
  );
}
