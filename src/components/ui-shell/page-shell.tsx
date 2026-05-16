import type { ReactNode } from "react";

export function PageShell({ children }: { children: ReactNode }) {
  return <main className="space-y-6">{children}</main>;
}

export function PageCard({ children }: { children: ReactNode }) {
  return <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">{children}</section>;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        {eyebrow ? <div className="text-sm font-semibold text-[#4F46E5]">{eyebrow}</div> : null}
        <h1 className="mt-2 text-3xl font-semibold text-[#111827]">{title}</h1>
        {description ? <p className="mt-3 text-sm leading-7 text-[#6B7280]">{description}</p> : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}
