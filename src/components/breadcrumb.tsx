import Link from "next/link";
import { Fragment } from "react";

import {
  Breadcrumb as BreadcrumbNav,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

interface BreadcrumbItemData {
  label: string;
  href?: string;
}

/** Breadcrumb aplikasi memakai primitif shadcn + Next Link (halaman aktif: `aria-current="page"`). */
export function Breadcrumb({ items }: { items: BreadcrumbItemData[] }) {
  return (
    <BreadcrumbNav aria-label="Breadcrumb">
      <BreadcrumbList>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <Fragment key={`${item.label}-${index}`}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : item.href ? (
                  <BreadcrumbLink
                    className="font-medium text-primary hover:underline"
                    render={<Link href={item.href}>{item.label}</Link>}
                  />
                ) : (
                  <span className={cn("font-medium text-muted-foreground")}>{item.label}</span>
                )}
              </BreadcrumbItem>
              {!isLast ? <BreadcrumbSeparator /> : null}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </BreadcrumbNav>
  );
}
