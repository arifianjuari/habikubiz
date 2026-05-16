import { Suspense } from "react";

import { listBusinessOverviews } from "@/server/repositories/business.repository";
import { listChildSummaries } from "@/server/repositories/child.repository";

import { ChildDashboardClient } from "./child-dashboard-client";
import ChildDashboardLoading from "./loading";

async function ChildDashboardBody() {
  const [businesses, childSummaries] = await Promise.all([
    listBusinessOverviews(),
    listChildSummaries(),
  ]);

  const businessPickerRows = businesses.map((b) => ({
    id: b.id,
    name: b.name,
    childId: b.childId,
  }));

  return (
    <ChildDashboardClient businesses={businesses} childSummaries={childSummaries} businessPickerRows={businessPickerRows} />
  );
}

export default function ChildDashboardPage() {
  return (
    <Suspense fallback={<ChildDashboardLoading />}>
      <ChildDashboardBody />
    </Suspense>
  );
}
