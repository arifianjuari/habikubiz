import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex flex-wrap items-center gap-2 text-sm text-[#6B7280]">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={`${item.label}-${index}`} className="flex items-center gap-2">
            {item.href && !isLast ? (
              <Link href={item.href} className="font-medium text-[#4F46E5] hover:underline">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "font-medium text-[#111827]" : undefined}>{item.label}</span>
            )}
            {!isLast && <span>/</span>}
          </div>
        );
      })}
    </nav>
  );
}
