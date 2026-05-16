import type { ParentDashboardChildRow } from "@/types/dashboard";

import { cache } from "react";

import { listBusinessOverviewsByChildId } from "./business.repository";
import { listChildSummaries } from "./child.repository";

export const getParentDashboardRows = cache(async function getParentDashboardRows(): Promise<ParentDashboardChildRow[]> {
  const children = await listChildSummaries();
  return Promise.all(
    children.map(async (child) => {
      const biz = await listBusinessOverviewsByChildId(child.id);
      return {
        id: child.id,
        name: child.name,
        initials: child.initials,
        businessCount: biz.length,
        activeBusinessNames: biz.map((b) => b.name).join(", "),
      };
    }),
  );
});
