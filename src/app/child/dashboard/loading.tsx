import { Skeleton } from "@/components/ui/skeleton";

export default function ChildDashboardLoading() {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton className="min-h-[260px] w-full rounded-3xl" />
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Skeleton className="min-h-[280px] rounded-3xl" />
        <Skeleton className="min-h-[280px] rounded-3xl" />
      </div>
      <Skeleton className="min-h-[200px] rounded-3xl" />
    </div>
  );
}
