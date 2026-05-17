import type { ReactNode } from "react";

import { AppStateHydrator } from "@/components/app-state-hydrator";
import { ParentAppShell } from "@/components/layout/parent-app-shell";
import { ParentRouteGuard } from "@/components/layout/parent-route-guard";
import { getAppSelectionBootstrap } from "@/server/repositories/profile.repository";

export default async function ParentLayout({ children }: { children: ReactNode }) {
  const serverBootstrap = await getAppSelectionBootstrap();

  return (
    <ParentRouteGuard>
      <AppStateHydrator serverBootstrap={serverBootstrap} />
      <ParentAppShell>{children}</ParentAppShell>
    </ParentRouteGuard>
  );
}
