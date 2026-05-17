"use client";

import Link from "next/link";
import { Bell } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import type { InAppNotificationItem } from "@/types/notifications";

const DEMO_NOTIFICATIONS: InAppNotificationItem[] = [
  {
    id: "1",
    title: "Komentar baru dari Ayah",
    body: "Coba cek lagi biaya bahan baku stiker. Apakah lem sudah masuk HPP?",
    createdAtLabel: "2 jam lalu",
    read: false,
    href: "/child/dashboard",
  },
  {
    id: "2",
    title: "Badge terbuka!",
    body: "Kamu mendapat badge “Transaksi Perdana”.",
    createdAtLabel: "Kemarin",
    read: false,
    href: "/child/profile",
  },
  {
    id: "3",
    title: "Reminder",
    body: "Jangan lupa catat transaksi hari ini supaya streak tetap jalan.",
    createdAtLabel: "Pagi ini",
    read: true,
    href: "/child/businesses",
  },
];

export function NotificationBell({
  items = DEMO_NOTIFICATIONS,
  className,
}: {
  items?: InAppNotificationItem[];
  className?: string;
}) {
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const unreadCount = items.filter((n) => !n.read).length;

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    function onDocPointerDown(e: MouseEvent | TouchEvent) {
      const el = rootRef.current;
      if (!el?.contains(e.target as Node)) close();
    }
    document.addEventListener("mousedown", onDocPointerDown);
    document.addEventListener("touchstart", onDocPointerDown, { passive: true });
    return () => {
      document.removeEventListener("mousedown", onDocPointerDown);
      document.removeEventListener("touchstart", onDocPointerDown);
    };
  }, [open, close]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        className="relative inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-border-subtle bg-background text-foreground shadow-sm outline-none transition hover:bg-surface focus-visible:ring-2 focus-visible:ring-primary"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={unreadCount > 0 ? `Notifikasi, ${unreadCount} belum dibaca` : "Notifikasi"}
        onClick={() => setOpen((v) => !v)}
      >
        <Bell className="size-5" aria-hidden />
        {unreadCount > 0 ? (
          <span className="absolute -right-0.5 -top-0.5 flex size-5 items-center justify-center rounded-full bg-danger text-[10px] font-bold text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        ) : null}
      </button>

      {open ? (
        <div
          id={panelId}
          role="dialog"
          aria-label="Daftar notifikasi"
          className="absolute right-0 z-50 mt-2 w-[min(100vw-2rem,22rem)] rounded-2xl border border-border-subtle bg-background py-2 shadow-lg"
        >
          <div className="border-b border-border-subtle px-4 py-3">
            <div className="text-sm font-semibold text-foreground">Notifikasi</div>
            <div className="text-xs text-muted-foreground">Data demo — nanti dari Supabase.</div>
          </div>
          <ul className="max-h-[min(60vh,320px)] overflow-y-auto">
            {items.map((item) => (
              <li key={item.id} className="border-b border-border-subtle last:border-b-0">
                {item.href ? (
                  <Link
                    href={item.href}
                    className="block px-4 py-3 text-left transition hover:bg-surface"
                    onClick={close}
                  >
                    <NotificationRowContent item={item} />
                  </Link>
                ) : (
                  <div className="px-4 py-3">
                    <NotificationRowContent item={item} />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function NotificationRowContent({ item }: { item: InAppNotificationItem }) {
  return (
    <>
      <div className="flex items-start justify-between gap-2">
        <div className="text-sm font-semibold text-foreground">{item.title}</div>
        {!item.read ? (
          <span className="size-2 shrink-0 rounded-full bg-danger" aria-hidden />
        ) : null}
      </div>
      <p className="mt-1 text-xs leading-5 text-muted-foreground">{item.body}</p>
      <div className="mt-2 text-[11px] font-medium text-muted-foreground">{item.createdAtLabel}</div>
    </>
  );
}
