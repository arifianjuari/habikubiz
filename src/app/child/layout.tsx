import type { ReactNode } from "react";

import { AppStateHydrator } from "@/components/app-state-hydrator";
import { ChildAppShell } from "@/components/layout/child-app-shell";
import { getAppSelectionBootstrap } from "@/server/repositories/profile.repository";

export default async function ChildLayout({ children }: { children: ReactNode }) {
  const serverBootstrap = await getAppSelectionBootstrap();

  return (
    <>
      <AppStateHydrator serverBootstrap={serverBootstrap} />
      <ChildAppShell>{children}</ChildAppShell>
    </>
  );
}
