"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useAppStore } from "@/stores/app-store";

/**
 * PRD §11.2: saat mode anak aktif, area orang tua tidak boleh diakses dari klien.
 * State `mode` persist ke localStorage; nanti diselaraskan dengan PIN / session server.
 */
export function ParentRouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname() ?? "";
  const mode = useAppStore((s) => s.mode);

  useEffect(() => {
    if (mode !== "child") return;
    if (!pathname.startsWith("/parent")) return;
    router.replace("/child/dashboard");
  }, [mode, pathname, router]);

  if (mode === "child" && pathname.startsWith("/parent")) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center px-6 text-center text-sm text-muted-foreground">
        Mengalihkan ke mode anak…
      </div>
    );
  }

  return children;
}
