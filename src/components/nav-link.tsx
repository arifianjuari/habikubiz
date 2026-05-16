"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

function navActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const pathname = usePathname();
  const active = navActive(pathname, href);

  return (
    <Link
      href={href}
      className={cn(className, active && "font-semibold underline underline-offset-4")}
      aria-current={active ? "page" : undefined}
    >
      {children}
    </Link>
  );
}
